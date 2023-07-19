---
title: "Fetching dogs in React"
date: "2023-07-16T16:09:19.545Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

TODO:
Loading state.
Error toast.
Error state.
Abort fetch.

```
import * as React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

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
