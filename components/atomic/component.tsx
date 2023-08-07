import { useEffect, useState } from "react";

const ENDPOINT_URL = "";

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

function FixedComponent() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(ENDPOINT_URL, { signal: controller.signal })
      // .then(async (res) => {
      //   await wait(1000);
      //   return res;
      // })
      .then((res) => res.json())
      .then((json) => setImageUrl(json.message))
      .catch((e) => {
        if (e.name === "AbortError") return;
        setError(e.name);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  if (error) return <h1 style={{ color: "red" }}>{error}</h1>;
  return <div>{loading ? <h1>Loading...</h1> : <img src={imageUrl} />}</div>;
}

const cache = {};

async function cachedFetch(resource, options) {
  const key = resource.toString();
  if (!cache.hasOwnProperty(key)) {
    cache[key] = await fetch(resource, options);
  }
  return cache[key];
}
