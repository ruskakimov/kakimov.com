---
title: "Don't do this in React Effects"
date: "2023-08-07T18:56:56.373Z"
excerpt: "Understanding and fixing a subtle bug."
---

If you ever had to fetch data in React without importing an additional dependency,
you probably have written something similar to this:

```tsx
function BadComponent() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setImageUrl(null);
    setLoading(true);
    setError(null);

    fetch(ENDPOINT_URL, { signal: controller.signal })
      .then((res) => res.json())
      .then((json) => setImageUrl(json.message))
      .catch((e) => {
        if (e.name === "AbortError") return;
        setError(e.name);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  if (error) return <h1 style={{ color: "red" }}>{error}</h1>;
  return <div>{loading ? <h1>Loading...</h1> : <img src={imageUrl} />}</div>;
}
```

Can you spot the bug?

At first glance everything is taken care of:

- Show loading state while the request is pending.
- Show data on success (an image in this case).
- Show error message on failure.
- Cancel the request on component unmount.

But if you run the app with `StrictMode` enabled,
you can notice that the loading indicator is missing and `<img src={null} />` is rendered instead.

This only occurs with `StrictMode` though, and the app works
as expected without it. This should tell us that the bug has something to do
with multiple effects running back-to-back, as `StrictMode` will run the effects twice.
And it does that for the exact purpose of discovering such bugs.

## How does it happen?

So, this is what happens:

1. First effect runs.
2. Clean up of the first effect is called immediately.
3. Second effect runs.

The key is the second "clean up" step, which calls the `.abort()` on controller
and cancels the first request. And if you look at our snippet above, this is the
relevant code for handling request aborts:

```jsx
.catch((e) => {
  if (e.name === "AbortError") return;
  setError(e.name);
})
.finally(() => {
  setLoading(false);
});
```

If the request is still pending, the promise will be rejected and catch will ignore it.
Callback passed to `.finally` will still execute, since we don't want to continue showing
loading state after the request had failed.

The problem is that the above code won't be called synchronously after the effect clean up.
Instead these callbacks will be added to the [microtask queue](https://javascript.info/microtask-queue).
Thus this code will execute **AFTER** the second effect.

Hence this is the lifecycle of our `loading` state:

1. First effect's `setLoading(true)`.
2. Second effect's `setLoading(true)`.
3. First effect's `setLoading(false)`. _Mamma mia! 🤌_
4. Second effect's `setLoading(false)`.

After the third step our state is `loading: false` and `imageUrl: null`,
as the second request hasn't completed yet.
That's the reason we don't see the loading indicator.

## The solution(s)

There a couple of ways to fix our code, but first let's start with...

### The wrong solution

You might be tempted to delay the second effect's initial state update:

```jsx
useEffect(() => {
  const controller = new AbortController();

  // Wrap state update in a scheduled macrotask.
  setTimeout(() => {
    setImageUrl(null);
    setLoading(true);
    setError(null);
  });

  /* ... */
}, []);
```

> Note, `queueMicrotask` would not change the order, as it would append to the end of the microtask queue, and our callbacks from the first effect are already there by that point.

This feels icky, but it does the job.
The second effect's state updates are no longer intermingled with the first effect's updates:

1. First effect's `setLoading(false)`.
2. First effect's `setLoading(true)`.
3. Second effect's `setLoading(true)`.
4. Second effect's `setLoading(false)`.

But we have inadvertently introduced another problem.

Let's say we decided to cache requests,
so we created a wrapper around fetch that takes care of it:

```jsx
const cache = {};

async function cachedFetch(resource, options) {
  const key = resource.toString();
  if (!cache.hasOwnProperty(key)) {
    cache[key] = await fetch(resource, options);
  }
  return cache[key];
}
```

Now, if the component would render and the request turns out to be cached,
then all of our scheduled microtasks would execute before the next macrotask,
as that's how [JS event loop](https://javascript.info/event-loop#summary) works.
And since `setTimeout` schedules a macrotask, the order will become the following:

1. First effect's `setLoading(false)`.
2. Second effect's `setLoading(false)`.
3. First effect's `setLoading(true)`.
4. Second effect's `setLoading(true)`.

Meet the never ending loading indicator.

### The right solution (1)

You can realize that setting state after the request has been canceled is actually pointless.
The effect is only cleaned up if component has unmounted or another effect will run.
In either of those cases mutating state isn't useful.
If there is another effect queued up, then it will be the one responsible for state updates.
And if our component has unmounted, well, then it isn't rendered.

The solution is to simply check if the request has been canceled
and prevent state updates in this scenario:

```jsx
.finally(() => {
  if (!controller.signal.aborted) {
    setLoading(false);
  }
});
```

As a result we got rid of the first effect's `setLoading(false)` without losing any useful behavior.
The loading state lifecycle is now in the right order:

1. First effect's `setLoading(true)`.
2. Second effect's `setLoading(true)`.
3. Second effect's `setLoading(false)`.

### The right solution (2)

If we were to include the `setLoading(false)` call in both `.then` and `.catch`
callbacks, then we wouldn't have encountered this bug in the first place.

```jsx
.then((json) => {
  setImageUrl(json.message);
  setLoading(false); // Here
})
.catch((e) => {
  if (e.name === "AbortError") return;
  setError(e.name);
  setLoading(false); // And here
});
```

Catch callback is the only code that can potentially run after the cleanup
and since it already checks for `AbortError`, we are safe.

Looks like the lesson is to remember **NOT** to mutate state after the effect has been cleaned up.
