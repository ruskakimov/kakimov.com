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

```json
{
  "message": "https://images.dog.ceo/breeds/spaniel-welsh/n02102177_2148.jpg",
  "status": "success"
}
```

We want to send a single request when the page loads, which is a perfect job for `useEffect` with an empty dependency array.

```tsx
const RANDOM_DOG_URL = "https://dog.ceo/api/breeds/image/random";

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

Are we done here? Well, not quite. You might notice some weird behavior if your internet is slow enough or you've enabled network throttling. An image of a dog is loaded and is quickly replaced by another one. And if you inspect network traffic with the browser's developer tools, you might notice that two requests are sent instead of one. If that's the case, your `index.tsx` probably contains this:

```tsx
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

`StrictMode` makes your renders and effects run twice
in development mode. It has no effect in production.
Basically, it's a way of stress testing your app to find bugs before you ship them.

> But our effect would never run twice in production. Let's just remove `StrictMode` to get rid of this weird behavior.

I would advice you against that. React app not working as expected with strict mode turned on is an indicator of lack of robustness. To prove my point, here are the potential bugs you will face in **production** with the current implementation:
