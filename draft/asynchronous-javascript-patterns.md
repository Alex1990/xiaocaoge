---
title: "异步 Javascript 模式"
cover: ""
date: "2018-10-31"
category: "Javascript"
tags:
  - "异步"
  - "Asynchronous"
  - "Callback"
  - "Promise"
  - "Generator"
  - "async"
  - "await"
---

- 任务状态
- 任务组
- 中止/取消/恢复一个任务或一个任务组
- 串行执行一组任务
- 并行执行一组任务，所有任务完成才结束
- 并行执行一组任务，有一个任务完成即结束该组任务执行
- 错误处理
- 异步 reduce/map/forEach/filter
- 延迟执行
- 限流执行：控制一组并行任务的最大并行执行数量

```js
execute(task1, (err1, result1) => {
  execute(task2, (err2, result2) => {
    // All tasks completed
  });
});
```

```js
const taskCount = taskGroup.count();
const results = [];
let completedCount = 0;
let task;
const callback = (err, results) => {};

while (task = taskGroup.get()) {
  execute(task, (err, result) => {
    if (err) {
      callback(err);
      taskGroup.stop();
    }
    results[task.index()] = result;
    completedCount++;
    if (completedCount === taskCount) {
      callback(null, results);
    }
  });
}
```

```js
```
