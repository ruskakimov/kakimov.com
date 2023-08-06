---
title: "Fetching dogs in React"
date: "2023-07-16T16:09:19.545Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

## A subtle bug

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

1. First effect: `setLoading(true)`.
2. Second effect: `setLoading(true)`.
3. First effect: `setLoading(false)`. _Mamma mia! 🤌_

## The solution(s)

Why did we want to `setLoading(false)` in the first place?
To stop rendering the loading indicator when our request fails.
This is an intentional behavior and we want to preserve it.

There a couple of ways to fix our code, but first let's start with...

### The wrong solution

```jsx
useEffect(() => {
  const controller = new AbortController();

  setTimeout(() => {
    setImageUrl(null);
    setLoading(true);
    setError(null);
  });

  /* ... */
}, []);
```

### The right solution (1)

```jsx
.finally(() => {
  if (!controller.signal.aborted) {
    setLoading(false);
  }
});
```

### The right solution (2)

```jsx
.then((json) => {
  setImageUrl(json.message);
  setLoading(false);
})
.catch((e) => {
  if (e.name === "AbortError") return;
  setError(e.name);
  setLoading(false);
});
```

<!--
Add finally, it will run after clean up function.
It will run after the next hooks setState. -> Chaos ensues.
Let's play a game of delaying -> setTimeout
cached request -> Chaos ensues!
It's a trap!

Lesson: Don't call setState after cleanup function. -->
