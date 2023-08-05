---
title: "Fetching dogs in React"
date: "2023-07-16T16:09:19.545Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

If you ever had to fetch data in React without importing an additional dependency,
you probably have written something like this:

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

- ✅ Show loading state while the request is pending
- ✅ Show data on success (an image in this case)
- ✅ Show error message on failure
- ✅ Cancel the request on component unmount

But if you run the app with `StrictMode` enabled,
you can notice that the component renders `<img src={null} />` before the image URL is fetched.

On the other hand, the component works as expected without the `StrictMode`.
This means that the bug only occurs if multiple effects run back-to-back.

<!--
Add finally, it will run after clean up function.
It will run after the next hooks setState. -> Chaos ensues.
Let's play a game of delaying -> setTimeout
cached request -> Chaos ensues!
It's a trap!

Lesson: Don't call setState after cleanup function. -->
