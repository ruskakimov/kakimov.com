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

We want to send a single request when the page loads, a perfect job for `useEffect` with an empty dependency array.

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

Why does effect run twice?

But an empty dependency array means that it will run only on mount.
