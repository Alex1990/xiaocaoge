---
title: "JavaScript编程风格"
cover: ""
date: "2013-04-22"
category: "代码风格"
tags:
  - Javascript
  - programming-style
  - 编程风格
---

最近在看《编写可维护的JavaScript》，主要是觉得前4章关于编程风格，也就是代码书写细节方面的东西，越早读越好，免得养成一些不好的习惯了，以后想改也难改了。料不是很多，有些风格就是自己现在正用的，现在列出来前四章的tips，也好系统地过一遍。

1. 缩进：用Tab键控制缩进，4个空格，赋值语句保持在赋值符号后对齐

2. 语句结尾：一律加分号

3. 行长：80个字符

4. 换行：两个缩进，在运算符号、分隔符号等后换行

5. 空行：方法之间，局部变量和第一条语句之间，注释之前，逻辑片段之间

6. 命名方法：变量或函数名采用小驼峰命名法

7. 变量和函数命名：变量用名词前缀，函数用动词前缀，jQuery中有些方法例外

8. 常量：全部大写且下划线连接

9. 构造函数：常是名词，首字母大写

10. 直接量语法：

  *   字符串：单引号或双引号保持一致性，可结合在使用其他语言选择，多行字符串应用连接符(+)连接，即行尾连接符
  *   数字：不可用类似 10. 或 .1 这种省略写法，禁用八进制字面量
  *   null：不用null和为初始化变量比较，不用来检测是否传入了参数
  *   undefined：可能赋值为对象的变量，应该将其赋值为null
  *   对象直接量：第一行左花括号，每个属性名值对单独一行，一个缩进，最后右花括号独占一行
  *   数组直接量：方括号括起来元素的形式

11. 单行注释：用双斜杠"//"，前面空一行，独占一行，行尾不加分号

12. 多行注释：("/*"..."*/"),前面空一行，每行左侧加对齐的星号

13. 浏览器特性hack：可能会被误认为为错误的代码应该加注释

14. 文档注释：以"/**"和"**/"包裹

  *   所有的方法：方法、期望的参数和可能的返回值添加注释
  *   所有的构造函数：自定义类型和期望的参数添加注释
  *   所有包含文档化方法的对象：若对象包含附带文档注释的方法，针对文档生成工具加注释

15. 所有if/for/while/do...while/try...catch...finally等中的块语句都用花括号包裹

16. 花括号对齐方式：左花括号首行末尾，右花括号与首行开头对齐

17. 块语句首行间隔：语句名（if/while/for等）、圆括号和左花括号之前加一个空格，如

18. switch语句：

  *   缩进：case保持一个缩进
  *   “连续执行”：连续执行case语句，可接受
  *   default: 是否可省略（加注释情况下），待议

19. with语句：禁用

20. for循环中的break与continue语句：break可用，continue根据代码可读性决定

21. for...in：循环体中总是用hasOwnProperty()，除非查找原型链

22. 函数开头是用单var语句，即只用一个var关键字，保持一个缩进，关联变量可合占一行

23. 函数：先声明，后使用，且不可在条件语句中声明函数

24. 函数调用：函数名与左括号没有空格

25. 函数的立即调用：应当将函数用圆括号包裹，一眼看出，以区别通常情况

26. 严格模式："use strict";出现在全局作用域会使所有代码以严格模式执行

27. 相等：使用 === 或 !==

28. eval()：尽量别用

29. setTimeout()与setInterval()：第一个参数不用以字符串形式传递，应调用函数

30. 原始包装类型：禁止使用String、Number或Boolean创建对象
