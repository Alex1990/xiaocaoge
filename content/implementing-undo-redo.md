---
title: "实现撤销与恢复"
cover: ""
date: "2021-02-05"
category: "编程"
tags:
  - 编辑器
  - 撤销
  - 恢复
  - undo
  - redo
  - command pattern
---

在编辑器应用开发当中，撤销（undo）和恢复（redo）功能是一个必备的基础功能。**撤销（undo）**是指撤销最近的一个文档编辑动作或命令（action/command），使文档恢复到动作/命令执行之前的状态。**恢复（redo）**是指撤销的逆向操作，重新执行最近撤销的动作或命令。这两个功能通常是出现在菜单栏的【编辑】子菜单里面，另外根据操作系统绑定不同的快捷键。

通常的 Web 前端开发当中不会涉及到此功能，但是有一个很类似的领域，就是**浏览器历史和路由**，浏览器的后退和前进功能类似于撤销和恢复。另外，某些编辑器（比如 Photoshop）不仅支持撤销和恢复命令，也可以显示文档编辑历史记录，并且可以跳转到之前的任一文档历史状态。

## 文档状态历史 Document State History

a. 对文档的每次编辑都会产生一个新的文档状态，然后这些文档状态构成了文档状态历史，其结构是一个如下图一样的列表结构。其中，S0、S1、S2 表示文档状态（Document State），A1、A2 表示对文档进行的一系列编辑动作（Action），当前文档状态是 S2。此时只能对文档执行撤销操作，无法执行恢复操作。

```txt
                             Current
                                +
                                |
                                v
+------+  A1  +------+  A2  +---+--+
|  S0  +----->+  S1  +----->+  S2  |
+------+      +------+      +------+
```

b. 对文档状态执行撤销后文档状态历史变成下图。此时，文档状态历史仍然都在，只是当前文档状态变成了 S1，可以对文档执行撤销和恢复操作。

```txt
               Current
                  +
                  |
                  v
+------+  A1  +---+--+  A2  +------+
|  S0  +----->+  S1  +----->+  S2  |
+------+      +------+      +------+
```

c1. 如果执行恢复操作，则文档状态历史变成下图，当前文档状态是 S2，即变成了执行撤销动作之前的状态。

```txt
                             Current
                                +
                                |
                                v
+------+  A1  +------+  A2  +---+--+
|  S0  +----->+  S1  +----->+  S2  |
+------+      +------+      +------+
```

c2. 如果执行其他编辑动作，则当前文档状态之后的文档状态历史会丢失，文档状态历史变成下图。

```txt
                             Current
                                +
                                |
                                v
+------+  A1  +------+  A3  +---+--+
|  S0  +----->+  S1  +----->+  S3  |
+------+      +------+      +------+
```

## 实现方案

这里介绍两种基本的实现方案：一是保存每次编辑后的文档状态，如同本文开头文档状态历史部分；二是对于每个编辑动作都生成对应的**逆动作（reverse action）**。

### 方案一：保存文档状态历史

如上文所述，该方案是指保存每次编辑后的文档状态，撤销与恢复只是当前文档状态的指向不同。该方案实现相对简单，对所有编辑动作都适用，不足之处是保存每次编辑后的文档状态可能占用内存比较大。之所以这里说“可能”是因为跟实现和是否优化有关，如果采用 [ImmutableJS](https://immutable-js.github.io/immutable-js/) 之类的技术，则内存占用会大幅降低，并且保存状态的开销很小。又或者采用保存部分关键编辑文档状态（比如编辑动作耗时长的或每个五次编辑保存一次文档状态），然后恢复时先跳转到最近的文件状态，然后重新执行相关编辑动作即可，也可以一定程度上降低内存占用。

### 方案二：保存编辑动作的逆动作

该方案是指每次编辑动作都生成对应的逆动作，然后执行撤销时就是执行逆动作，但是因为不是每一个编辑动作都是可逆的，比如涉及到随机生成的。而且扩展性差、实现复杂，需要针对每个动作都实现其逆动作，因此很少使用该方案。

## 简单实现

这里是方案一的实现。

```ts
interface State {
    [key: string]: any;
}

interface StateHistoryOptions {
    max?: number;
}

class StateHistory {
    static defaults: StateHistoryOptions = {
        max: 20
    }

    constructor(initialState: State, options?: StateHistoryOptions = {}) {
        this.opts = Object.assign({}, StateHistory.defaults, options)
        this.stateHistory = [initialState]
        this.currentIndex = 0
    }

    get size(): number {
        return this.stateHistory.length
    }

    get current(): State {
        return this.stateHistory[this.currentIndex]
    }

    get canUndo(): boolean {
        return this.currentIndex > 0
    }

    get canRedo(): boolean {
        return this.currentIndex < this.size - 1
    }

    insert(state: State): void {
        if (this.currentIndex < this.size - 1) {
            this.stateHistory.splice(this.currentIndex + 1, this.size - 1 - this.currentIndex)
        }
        if (this.size >= this.opts.max) {
            this.stateHistory.unshift()
        }
        this.stateHistory.push(state)
        this.currentIndex++
    }

    undo(): void {
        if (this.canUndo) {
            this.currentIndex--
        }
    }

    redo(): void {
        if (this.canRedo) {
            this.currentIndex++
        }
    }
}
```

### 历史记录列表

一些编辑器支持显示最近编辑动作列表，以及直接跳转到某个历史记录功能，需要增加如下代码：

```ts
class StateHistory {
    // 当前文档状态之前的所有文档状态
    get past(): State[] {
        return this.stateHistory.slice(0, this.currentIndex)
    }

    // 当前文档状态之后的所有文档状态
    get future(): State[]) {
        return this.stateHistory.slice(this.currentIndex + 1)
    }

    jump(index: number) {
        if (index > -1 && index < this.size - 1) {
            this.currentIndex = index
        }
    }
}
```

## 状态历史树 State History Tree

上面的实现存在一个问题：**当撤销一个编辑动作，然后进行了一个新的编辑动作之后，无法进行恢复操作了，也就是说新的编辑动作导致之前的文档编辑状态全部丢失了**。造成这个问题的原因是因为使用了一个线性结构来保存文档编辑状态历史，如果使用一个树结构，则可以避免此问题。不过因为线性结构通常满足大部分需求，这里不深入讨论树结构的实现了，只提供两个相似的机制参考：

* [Vim undo branches](https://vim.fandom.com/wiki/Using_undo_branches)
* [Git branch](https://git-scm.com/docs/git-branch)


## 相关链接

* [Undo wiki](https://en.wikipedia.org/wiki/Undo)
* [Implementing undo/redo with the Command Pattern](http://gernotklingler.com/blog/implementing-undoredo-with-the-command-pattern/)
* [Design Pattern for Undo Engine](https://stackoverflow.com/questions/49755/design-pattern-for-undo-engine)
* [redux-undo](https://github.com/omnidan/redux-undo)
* [Undo/Redo implementation](https://stackoverflow.com/questions/3541383/undo-redo-implementation)
