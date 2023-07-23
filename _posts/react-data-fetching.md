---
title: "Fetching dogs in React"
date: "2023-07-16T16:09:19.545Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

Let's build a simple React app that displays a random dog image on page load. For that we will be using [Dog API](https://dog.ceo/api) – a free API without authentication.

We are interested in this endpoint that returns a random image:

```
https://dog.ceo/api/breeds/image/random
```

It returns a JSON object that looks like this:

```JSON
{
  "message": "https://images.dog.ceo/breeds/spaniel-welsh/n02102177_2148.jpg",
  "status": "success"
}
```

We want to send a single request when the page loads, which is a perfect job for `useEffect` with an empty dependency array.

```
const RANDOM_DOG_URL = 'https://dog.ceo/api/breeds/image/random';

export default function App() {
  const [dogImage, setDogImage] = useState<string | null>(null);

  useEffect(() => {
    fetch(RANDOM_DOG_URL)
      .then((res) => res.json())
      .then((json) => setDogImage(json.message));
  }, []);

  return (
    <div>
      <img src={dogImage} />
    </div>
  );
}
```

Great! We send a request and pass the image URL to `img` element. A new dog photo is displayed each time we refresh the page.

Are we done here? Well, not quite. If you inspect your network traffic with your browser's developer tools, you might notice that two requests are sent instead of one. If that's the case, your `index.tsx` probably contains this:

```
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

`StrictMode` makes your renders and effects run twice
in development mode. It has no effect in production.
Basically, it's a way of stress testing your app to find bugs before you ship them.

Some of you might be thinking:

> But our effect would never run twice in production. Aren't we trying to solve a problem brought upon us by `StrictMode`? Let's just remove it.
