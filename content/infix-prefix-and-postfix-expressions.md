---
title: "中缀、前缀和后缀表达式"
cover: ""
date: "2017-06-07"
category: "算法"
tags:
  - 前缀
  - 中缀
  - 后缀
  - 栈
---

## 概念

通常，我们从小学开始接触到最常见的数学表达式，都是形如`A * B`或`A + B * C`之类的，即**运算符/操作符**在两个**操作数**的中间，这被称为**中缀表达式（infix expression）**。中缀表达式在处理`A + B * C`之类的表达式时，需要知道操作符`+`/`*`的**优先级（precedence）**，然后才能根据优先级高低确定计算顺序。另外，括号也会影响计算顺序，计算机程序在解析中缀表达式时，确定计算顺序比较复杂，可以通过加括号来使得不需要知道各操作符的优先级就可以确定计算顺序。比如，有表达式`A + B * C + D`，可以被写成`((A + (B * C)) + D)`。

**前缀表达式（prefix expression）**，又被称为**波兰表达式（Polish expression）**，是因为它是波兰逻辑学家发明的一种记法。顾名思义，前缀表达式是把操作符放到操作数的前面，比如`+ A B`，意思是`A`与`B`进行`+`操作，也可以使用多个操作数，比如`+ A B C`，意思是`A`、`B`和`C`进行`+`操作。假如固定有且只有两个操作数，则括号省略时不影响计算顺序的判断，比如中缀表达式`(A + B) * C`可写成前缀表达式`* (+ A B) C`，因为操作符只能对两个操作数计算，所以括号是可以省略的，即`* + A B C`。

**后缀表达式（postfix expression）**，又被称为**逆波兰表达式（Reverse Polish expression）**，是为了与波兰表达式的叫法对应。后缀表达式是把操作符放到操作数的后面，比如`A B +`。

**如无特殊说明，下面前缀与后缀表达式当中一个操作符的操作数均限制为两个**

## 计算表达式

前缀与中缀表达式计算实现比后缀要复杂些。

下面的计算只针对加减乘除四个操作。

### 计算前缀表达式

使用栈来计算：

1. 结构体`EvalTuple`，其有三个属性：`char operator`、`double operand`、`int count`，分别用来存储操作符、操作符作用的第一个操作数、操作数作用的操作数个数。
2. 栈`EvalTupleStack`用来存储结构体`EvalTuple`。
3. 合法的前缀表达式`prefix_exp`，其为字符串。
4. 从左至右遍历`prefix_exp`，`ch`为遍历的当前字符串。
  1. 如果`ch`为空白字符串，则处理下一个字符。
  2. 如果`ch`为操作符（加减乘除），则创建一个`EvalTuple`类型结构体`tuple`。然后，`tuple.operator`值为`ch`，`tuple->count`值为`0`，并将`tuple`推入栈`EvalTupleStack`当中，然后处理下一个字符。
5. 如果`ch`为其他，则从字符串`prefix_exp`当前索引开始往后匹配最长的合法数值,设其为`num`，设`nextIndex`为该数值后面字符的索引。对`EvalTupleStack`进行遍历：
  1. 如果为空，则中止遍历；
  2. 设`top_tuple`为`EvalTupleStack`最顶部的元素，如果`top_tuple.count`值为`0`，则`top_tuple.operand`值为`num`，`top.count`值为`1`，并中止遍历；如果`top_tuple.count`值不为`0`，则`num`值为`top_tuple.operand`与`num`进行`top_tuple.operator`计算后的结果，然后将`top_tuple`出栈，如果`EvalTupleStack`为空，则前缀表达式的计算结果`result`为`num`。
6. 从`nextIndex`索引位置开始遍历`prefix_exp`。
7. 遍历完成`prefix_exp`后，返回`result`。

下面使用 C 代码过程：

```c
struct EvalTuple {
  char operator;
  double operand;
  int count;
};

double
prefix_eval(char *str) {
  char *cp = str;
  double result;
  Stack s = create_stack();

  while (*cp != '\0') {
    if (*cp == ' ') {
      cp++;
    } else if (*cp == '+' || *cp == '-' || *cp == '*' || *cp == '/') {
      EvalTupleType tuple;

      tuple = malloc(sizeof(struct EvalTuple));

      if (tuple == NULL) {
        perror("Out of memory!");
        exit(1);
      }

      tuple->operator = *cp;
      tuple->count = 0;
      push(s, tuple);
      cp++;
    } else {
      char *nextIndex;
      EvalTupleType top_tuple;
      double num = strtod(cp, &nextIndex);

      while(!is_empty(s)) {
        top_tuple = top(s);
        if (top_tuple->count == 1) {
          switch (top_tuple->operator) {
            case '+':
              num = top_tuple->operand + num;
              break;
            case '-':
              num = top_tuple->operand - num;
              break;
            case '*':
              num = top_tuple->operand * num;
              break;
            case '/':
              num = top_tuple->operand / num;
              break;
          }
          pop(s);
          if (is_empty(s)) {
            result = num;
          }
        } else {
          top_tuple->operand = num;
          top_tuple->count = 1;
          break;
        }
      }

      cp = nextIndex;
    }
  }

  return result;
}
```

### 计算后缀表达式

后缀表达式的计算很简单：

1. 栈`S`，其元素为数值类型。
2. 数值变量`a`、`b`，用于求值过程中。
3. 将要求值的后缀表达式为`postfix_exp`，类型为字符串。
4. 对`postfix_exp`从左至右进行遍历，当前遍历字符为`ch`:
  1. 如果`ch`为空白字符串，则直接遍历下一个字符；
  2. 如果`ch`为操作符（加减乘除），则对`S`进行出栈操作两次，取出的元素分别赋值给`a`和`b`。然后，根据`ch`对`a`和`b`进行运算，其计算结果推入栈`S`中，然后遍历下一个字符；
  3. 如果为其他，则从当前索引位置向后匹配最长的合法数值`num`，数值后面一位字符索引为`nextIndex`，将`num`推入栈`S`中，然后从索引`nextIndex`位置开始遍历。
5. 遍历结束之后，返回`S`顶部的元素，即为最终计算结果。

下面是 C 代码过程：

```c
double
postfix_eval(char *postfix_exp) {
  char *cp = postfix_exp;
  double a, b;
  double result;
  Stack s = create_stack();

  while (*cp != '\0') {
    if (*cp == ' ') {
      cp++;
    } else if (*cp == '+' || *cp == '-' || *cp == '*' || *cp == '/') {
      b = pop(s);
      a = pop(s);
      switch (*cp) {
        case '+':
          push(s, a + b);
          break;
        case '-':
          push(s, a - b);
          break;
        case '*':
          push(s, a * b);
          break;
        case '/':
          push(s, a / b);
          break;
      }
      cp++;
    } else {
      char *endp;
      push(s, strtod(cp, &endp));
      cp = endp;
    }
  }
  return pop(s);
}
```

## 参考

- [Infix notation](https://en.wikipedia.org/wiki/Infix_notation)
- [Polish notation](https://en.wikipedia.org/wiki/Polish_notation)
- [Reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation)
- [Infix, Prefix and Postfix Expressions](http://interactivepython.org/runestone/static/pythonds/BasicDS/InfixPrefixandPostfixExpressions.html)
