---
title: "On reactive programming"
date: "2023-07-16T16:09:19.545Z"
---

GOAL:
Understand what is reactive programming and what isn't.

METHOD:
Read material from reputable sources.
Write statements and questions that come to your mind.
Later, meticulously go through each of the statements and confirm/debunk them.
Collect and organize the best material and tell a story.

Is it relationships between data?

React isn't purely declarative because you have to trigger changes?

Is Assembly imperative programming?

Then essentially any other paradigm is built on top of imperative programming.
Well it compiles to machine code that is imperative, right?

So, imperative programming is like coding without protection?

In imperative programming you write statements/instructions to change program's state.
State is basically memory. Direct memory manipulation equals imperative programming.

State is a unique snapshot of memory during runtime. Kinda, but that begs the question if all of the memory is indeed state. Loaded machine code is not really state.

State is program's "memory". Distinct from the actual physical memory used, as any program needs RAM. State is essentially stored data. Does it mean that programs have no state (initial state) when they launch? (TV volume is an example of state)

Program must have a finite number of states?

When you read an imperative program you need to read it top to bottom and piece together the final result in your head, while declarative programming describes the final result directly.

Describe results without explicitly listing commands or steps that must be performed.

Declarative burger (top-to-bottom):

- top bun
- patty
- cheese
- bottom bun

Imperative burger:

1. Put bottom bun
2. Put cheese on top
3. Put patty on top
4. Put top bun on top

Perhaps we should write about data fetching in React after all.
It is a more concrete problem, a solution to which would be immediately useful.
