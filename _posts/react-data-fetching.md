---
title: "Fetching dogs in React"
date: "2023-07-16T16:09:19.545Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

Data fetching is an essential aspect of modern web development, particularly when building dynamic and interactive applications. In React, a popular JavaScript library for building user interfaces, there are several approaches and techniques available for fetching data. In this article, we will explore various methods of data fetching in React, discuss their advantages and use cases, and provide examples to help you understand how to implement them effectively.

## Table of Contents

- Introduction
- Fetching Data with fetch()
- Using Axios for Data Fetching
- Fetching Data with GraphQL
- Using Libraries like React Query and SWR
- Conclusion

## Introduction

Before diving into the specifics, let's first understand the significance of data fetching in React applications. In many cases, React applications need to retrieve data from external sources, such as APIs, databases, or even other services. This data is then used to update the application's state, render dynamic content, or trigger certain actions.

In React, data fetching typically occurs in the component's lifecycle methods or through hooks. The choice of data fetching method depends on various factors, including the complexity of the application, the desired level of control, and the specific requirements of the project.

## Fetching Data with `fetch()`

The built-in `fetch()` function in modern browsers provides a simple yet powerful way to fetch data from APIs. It returns a Promise that resolves to the response of the request. Here's an example of how to use `fetch()` for data fetching in a React component:

```
import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Render data */}
    </div>
  );
};
```

In this example, we use the useEffect hook to perform the data fetching when the component mounts. The fetched data is stored in the component's state using the useState hook, and then rendered accordingly.

## Using Axios for Data Fetching

Axios is a popular third-party library for making HTTP requests in JavaScript. It provides a more feature-rich alternative to the built-in fetch() function, with added support for request cancellation, interceptors, and more. Here's an example of using Axios for data fetching in React:

```
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Render data */}
    </div>
  );
};
```

In this example, we import Axios and use its get() method to fetch data from the specified URL. The retrieved data is then stored in the component's state for rendering.

## Fetching Data with GraphQL

GraphQL is a query language for APIs that allows you to declaratively specify the data requirements of your application. It provides a flexible and efficient way to fetch data by allowing clients to request exactly what they need. Several GraphQL client libraries are available for React applications, such as Apollo Client and Relay.

Here's an example using Apollo Client for GraphQL data fetching in React:

```
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_DATA } from './queries';

const MyComponent = () => {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div>
      {/* Render data */}
    </div>
  );
};
```

In this example, we use the useQuery hook from Apollo Client to fetch data based on the specified GraphQL query defined in the GET_DATA constant.

## Using Libraries like React Query and SWR React

React Query and SWR are popular libraries that provide powerful data fetching and caching capabilities specifically designed for React applications. They simplify the process of managing data, caching, and handling common scenarios like pagination and real-time updates.

Here's an example of using React Query for data fetching in React:

```
import React from 'react';
import { useQuery } from 'react-query';

const MyComponent = () => {
  const { isLoading, isError, data, error } = useQuery('data', () =>
    fetch('https://api.example.com/data').then((res) => res.json())
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div>
      {/* Render data */}
    </div>
  );
};
```

In this example, we use the useQuery hook from React Query to fetch data. The first argument is a unique key for the query, and the second argument is a function that performs the data fetching and returns the result.

## Conclusion

Data fetching is a crucial aspect of building robust and interactive React applications. In this article, we explored various methods for fetching data in React, including using the built-in fetch() function, Axios for HTTP requests, GraphQL for declarative data querying, and libraries like React Query and SWR for advanced data management.

Remember to consider the specific requirements and complexity of your project when choosing a data fetching approach. Each method has its own strengths and use cases, so pick the one that best fits your application's needs. With these tools and techniques, you'll be well-equipped to handle data fetching in your React projects effectively. Happy coding!

Topics to cover:

- Loading state
- Error toast
- Error state
- Abort fetch

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
