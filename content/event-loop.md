---
title: "Event Loop 及相关概念"
cover: ""
date: "2018-12-30"
category: "JavaScript"
tags:
  - "Event Loop"
  - "Microtask"
  - "Macrotask"
---


本文主要参考了下面文章或视频：

* [Philip Roberts: What the heck is the event loop anyway? | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
* [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
* [Microtask and Macrotask: A Hands-on Approach](https://blog.bitsrc.io/microtask-and-macrotask-a-hands-on-approach-5d77050e2168)
* [The Node.js Event Loop, Timers, and process.nextTick()](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

我目前也写不出更好的关于这方面的文章，所以仅仅记录下阅读其他文章的笔记，如果要学习这方面可以直接阅读上面的文章。上面这些文章讲解比较详细，借助图形、动画等演示非常有助于理解。

另外，规范（HTML5，ECMAScript）等有相关介绍，但是比较晦涩难读，也需要系统阅读，可以作为深入了解的地方。还有浏览器引擎的实现源码，也许可靠，但是更加读不懂了。

JS 是单线程，使用 Event Loop 来实现多任务异步运行。主要涉及到的概念有：

* Call Stack（调用栈）
* Heap（堆）
* Task Queue（任务队列）
* Macrotask（宏任务）
* Microtask（微任务）

**Call Stack**：JS 代码执行是函数的层层调用，最里层的函数执行完成之后，将控制权转交给调用者。这些函数的调用使用一个调用栈（Call Stack）来管理，全局的 JS 代码会被包裹在一个回调函数当中。

**Heap**：JS 代码执行过程中创建的对象，都分配在 heap 里面，或者说创建的对象都分配在内存中，特定的内存区域称为 heap。内存管理与此相关。

**Task Queue**：将要执行的任务使用一个队列（Queue）来管理，先进先出，被称为任务队列（Task Queue）。

**Event Loop**：是一个持续执行的进程，首先检测当前调用栈（Call Stack）是否为空，当前调用栈为空后，会进入下一个循环（Loop），从任务队列（Task Queue）里面取出下一个执行的任务，如果任务队列为空，则 Event Loop 处于悬停状态。

可以使用下面代码简单表示：

```js
while (eventLoop.waitForTask()) {
  eventLoop.processNextTask();
}
```

任务队列的任务又分为**宏任务（Macrotask）**与**微任务（Microtask）**，两者使用独立的队列来管理。Event Loop 每次从宏任务队列（又是简称为任务队列）获取一个宏任务，然后处理，待处理当前宏任务后，处理下一个宏任务之前，会把当前微任务队列里面的所有微任务都处理完，而且微任务又可以派发新的微任务。

```js
while (eventLoop.waitForTask()) {
  const taskQueue = eventLoop.selectTaskQueue()
  if (taskQueue.hasNextTask()) {
    taskQueue.processNextTask()
  }
  const microtaskQueue = eventLoop.microTaskQueue
  while (microtaskQueue.hasNextMicrotask()) {
    microtaskQueue.processNextMicrotask()
  }
}
```

处理完当前宏任务及所有微任务之后，会进行 UI 的响应，DOM 渲染等，所以如果宏任务或者微任务执行时间过长，将会造成 UI 不响应、卡顿。

宏任务有：`setTimeout`、`setInterval`、`setImmediate`、异步`Ajax`响应、UI 事件等。

微任务有：`Promise`、`process.nextTick`、`MutationObserver`等。

另外，记住`setTimeout`与`setInterval`的第二时间参数`time`，是指经过`time`时间之后，把第一个参数接受的回调函数安排到任务队列里面，假如此时正有任务被处理，则会延后执行。

Node.js 使用 libuv 实现的 Event Loop，将不用类别任务分成了几个阶段来执行，每一个阶段都有自己的任务队列。
