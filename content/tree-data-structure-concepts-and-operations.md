---
title: "【树】数据结构的基本概念和操作"
cover: ""
date: "2018-05-14"
category: "数据结构"
tags:
  - 树
  - 树的遍历
---

树的递归定义：一棵树是一些节点的集合。这个集合可以是空集，此时称为**空树（empty tree）**；若非空，则一棵树由**根节点（root）**以及 0 或多个非空的**子树**组成，每一颗子树的根都被一条从根节点出发的有向边所连接。

## 基本概念

- **根（Root）**：树最顶部节点。
- **父节点（Parent）**：树的根节点是其子树根节点的父节点。
- **子节点（Child）**：反之，子树的根节点是树的根节点的子节点。
- **叶子节点（Leaf）**：没有子节点的节点。
- **兄弟/相邻节点（Siblings）**：一组具有相同父节点的节点。
- **后代节点（Descendant）**：节点 N 的所有子节点，所有子节点的子节点，直到叶子节点，均为节点 N 的后代节点。
- **祖先节点（Ancestor）**：节点 N 的父节点，父节点的父节点，直到树的根节点，均为节点 N 的祖先节点。
- **度（Degree）**：一个节点的子树的数量。
- **边（Edge）**：两个节点之间的连接。
- **路径（Path）**：连接一个节点和其后代节点的一组节点和边。
- **层级（Level）**：一个节点的层级指从该节点到根节点所有边的数量加上 1。
- **节点的高（Height of node）**：一个节点的高是节点到叶子节点的最长路径所包含的边的数量。
- **树的高（Height of tree）**：根节点的高。
- **深度（Depth）**：一个节点的深度是从根节点到该节点的边的数量。

## 树的遍历

树的遍历是指通过某种方式对树当中的每个节点进行一次处理（展示、更新等）。按照访问节点的顺序可分为：**深度优先（depth-first）**和**广度优先（breadth-first）**。其中，深度优先有三种常见的方式：先序（pre-order）、中序（in-order）和后序（post-order）。

因为一个节点的子节点可能有不止一个，所以某些节点需要延后访问，通过某种方式存起来。通常可以使用**栈**或**队列**存起来，如果是通过递归的方式来遍历，则存储在**调用栈（call stack）**当中。而调用栈的层数通常是有最大限制的，因此如果树的层级非常大，使用迭代的方式遍历更好。

下面的示例代码由 C 语言书写。其中`Node`定义如下：

```c
typedef struct NodeStruct Node;

struct NodeStruct {
  int value;
  Node* parent;
  Node* childNodes;
  Node* firstChild;
  Node* lastChild;
  Node* left;
  Node* right;
  Node* prevNode;
  Node* nextNode;
};
```

### 深度优先

深度优先，顾名思义，在选择下一个遍历节点时，优先选择深度大的。

#### 前序

前序遍历，指先处理当前节点，然后对子树执行遍历操作。

**递归**

```c
void traversal_dfs_preorder_recursive(Node* node, void (*iteratee)(Node*)) {
  if (node != NULL) {
    iteratee(node);
    Node* child = node->childNodes;

    while (child != NULL) {
      traversal_dfs_preorder_recursive(child, iteratee);
      child = child->nextNode;
    }
  }
}
```

**迭代**

```c
void traversal_dfs_preorder_iterative(Node* node, void (*iteratee)(Node*)) {
  Stack* stack = stack_make(8);
  Node* current;

  if (node != NULL) stack_push(stack, node);

  while (!stack_is_empty(stack)) {
    Node* current = stack_pop_and_top(stack);
    iteratee(current);

    Node* child = current->lastChild;

    while (child != NULL) {
      stack_push(stack, child);
      child = child->prevNode;
    }
  }
}
```

#### 中序

中序遍历，在二叉树当中，指先遍历左子树，然后处理当前节点，再然后遍历右子树。不一定用于二叉树当中，对于普通的树，可以是先遍历左边部分的子树，然后处理当前节点，再然后遍历右边的子树，关键在于左右如何定义。

**递归**

```c
void traversal_dfs_inorder_recursive(Node* node, void (*iteratee)(Node*)) {
  if (node != NULL) {
    traversal_dfs_inorder_recursive(node->left, iteratee);
    iteratee(node);
    traversal_dfs_inorder_recursive(node->right, iteratee);
  }
}
```

**迭代**

```c
void traversal_dfs_inorder_iterative(Node* node, void (*iteratee)(Node*)) {
  Stack* stack = stack_make(8);
  bool detect_left;

  if (node != NULL) {
    stack_push(stack, node);
    detect_left = true;
  }

  while (!stack_is_empty(stack)) {
    Node* current;

    if (detect_left) {
      current = stack_pop_and_top(stack);

      while (current != NULL) {
        stack_push(stack, current);
        current = current->left;
      }
    }

    current = stack_pop_and_top(stack);

    iteratee(current);

    if (current->right != NULL) {
      stack_push(stack, current->right);
      detect_left = true;
    } else {
      detect_left = false;
    }
  }
}
```

#### 后序

后序遍历，指先对子树执行遍历操作，然后再处理当前节点。

**递归**

```c
void traversal_dfs_postorder_recursive(Node* node, void (*iteratee)(Node*)) {
  if (node != NULL) {
    Node* child = node->childNodes;

    while (child != NULL) {
      traversal_dfs_postorder_recursive(child, iteratee);
      child = child->nextNode;
    }
    iteratee(node);
  }
}
```

**迭代**

```c
void traversal_dfs_postorder_iterative(Node* node, void (*iteratee)(Node*)) {
  Stack* stack1 = stack_make(8);
  Stack* stack2 = stack_make(8);
  Node* current;

  if (node != NULL) stack_push(stack1, node);

  while (!stack_is_empty(stack1)) {
    Node* current = stack_pop_and_top(stack1);
    stack_push(stack2, current);
    Node* child = current->firstChild;

    while (child != NULL) {
      stack_push(stack1, child);
      child = child->nextNode;
    }
  }

  stack_free(stack1);

  while(!stack_is_empty(stack2)) {
    Node* current = stack_pop_and_top(stack2);
    iteratee(current);
  }

  stack_free(stack2);
}
```

### 广度优先

广度优先，按照层级，一层一层遍历。

**递归**

```c
void bfs_recur(Queue* queue, void (*iteratee)(Node*)) {
  if (!queue_is_empty(queue)) {
    Node* node = queue_dequeue(queue);
    iteratee(node);

    Node* child = node->firstChild;

    while (child != NULL) {
      queue_enqueue(queue, child);
      child = child->nextNode;
    }
    bfs_recur(queue, iteratee);
  }
}

void traversal_bfs_recursive(Node* node, void (*iteratee)(Node*)) {
  Queue* queue = queue_make();
  if (node != NULL) queue_enqueue(queue, node);
  bfs_recur(queue, iteratee);
}
```

**迭代**

```c
void traversal_bfs_iterative(Node* node, void (*iteratee)(Node*)) {
  Queue* queue = queue_make();
  Node* current;

  if (node != NULL) queue_enqueue(queue, node);

  while (!queue_is_empty(queue)) {
    current = queue_dequeue(queue);
    iteratee(current);

    Node* child = current->childNodes;

    while (child != NULL) {
      queue_enqueue(queue, child);
      child = child->nextNode;
    }
  }

  queue_free(queue);
}
```

## 基本操作

### 查找节点的根节点

```c
Node* get_root(Node* node) {
  while (node != NULL && node->parent != NULL) {
    node = node->parent;
  }
  return node;
}
```

### 获取节点的高度

```c
int get_node_height_recur(Node* node, int parent_height) {
  int height = parent_height;
  if (node != NULL) {
    Node* child = node->childNodes;
    if (child != NULL) height += 1;
    while (child != NULL) {
      int next_height = get_node_height_recur(child, height);
      if (next_height > height) height = next_height;
      child = child->nextNode;
    }
  }
  return height;
}

int get_node_height(Node* node) {
  return get_node_height_recur(node, 0);
}
```

### 获取节点的层级

```c
int get_node_level(Node* node) {
  int level = 0;

  while (node != NULL) {
    level++;
    node = node.parent;
  }

  return level;
}
```

### 插入子节点

```c
void append_child(Node* parent, Node* child) {
  if (parent != NULL && child != NULL) {
    Node* lastChild = parent->lastChild;
    lastChild->nextNode = child;
    child->prevNode = lastChild;
    parent->lastChild = child;
    cihld->parent = parent;
  }
}
```

### 指定节点前面插入节点

```c
void insert_before(Node* node1, Node* node2) {
  if (node1 != NULL && node2 != NULL) {
    Node* parent = node1->parent;
    if (parent != NULL) {
      Node* prevNode = node1->prevNode;

      node1->prevNode = node2;
      node2->parent = parent;
      node2->nextNode = node1;
      node2->prevNode = prevNode;

      if (prevNode != NULL) {
        prevNode->nextNode = node2;
      } else {
        parent->firstChild = node2;
        parent->childNodes = node2;
      }
    }
  }
}
```

### 指定节点后面插入节点

```c
void insert_after(Node* node1, Node* node2) {
  if (node1 != NULL && node2 != NULL) {
    Node* parent = node1->parent;
    if (parent != NULL) {
      Node* nextNode = node1->nextNode;

      if (nextNode != NULL) {
        nextNode->prevNode = node2;
      } else {
        parent->lastChild = node2;
      }

      node1->nextNode = node2;
      node2->prevNode = node1;
      node2->nextNode = nextNode;
      node2->parent = parent;
    }
  }
}
```

### 删除节点

删除节点，就是删除一整个子树。

**（待补充）**

### 克隆节点

克隆节点，可分为只是克隆指定的一个节点，还是克隆指定节点及其所有后代节点，即深度克隆。

**（待补充）**

### 查找两个节点的最近相同祖先节点

```c
Node* get_common_ancestor(Node* node1, Node* node2) {
  if (node1 == NULL || node2 == NULL) return NULL;
  int level1 = get_node_level(node1);
  int level2 = get_node_level(node2);

  while (true) {
    while (level1 < level2 && node2 != NULL) {
      node2 = node2->parent;
      level2--;
    }
    while (level2 < level1 && node1 != NULL) {
      node1 = node1->parent;
      level1--;
    }
    if (node1 == node2) break;

    node1 = node1->parent;
    node2 = node2->parent;
    level1--;
    level2--;
  }

  return node1;
}
```

## 参考

- [Tree\_(data\_structure)](https://en.wikipedia.org/wiki/Tree_(data_structure))
- [Tree traversal](https://en.wikipedia.org/wiki/Tree_traversal)
- 《数据结构与算法分析：C语言描述》
