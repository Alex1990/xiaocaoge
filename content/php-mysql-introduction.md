---
title: "PHP与MySQL入门"
cover: ""
date: "2013-04-27"
category: "后端"
tags:
  - MySQL
  - PHP
  - PHP入门
---

一直想了解网站的后台技术，直到最近才花了20天左右学完了《PHP6和MySQL5基础教程》。之所以看这本书，只是因为图书馆借不到号称“圣经”的那本书，然后这本书综合来看，入门靠谱。不过读完之后，觉得关于前端方面的过时了，毕竟是五六年前的书了，但是PHP6又超前了，到现在迟迟未出，总体感觉，入门尚可。当然只是入门，学好基础还是得读一本知识点全面的书，比如那本号称“圣经”的书，还要经常翻阅手册才行。想到这里，觉得学某项计算机或互联网技术的读书顺序就是“入门”——“基础”——“进阶”。入门指那些只包含部分常用知识点的书，市面上其实最不缺这方面的垃圾书籍了，所以得慎重选择，一般读一本或者能力高点的跳过直接读基础类书籍。基础类指那些知识点全面的书籍，通常很厚，比入门厚一倍或更多，写这类书籍需要深厚的积淀，所以市面上属于此类的书不多，也读一本即可。进阶类重点写技术某个分支或从某方面剖析，这类书籍国外作者出版的居多，此阶段也需要更多的结合实践。

不扯了，还是总结下学到了哪些知识点吧！

### 1. 运行平台的安装与配置

此书选择的是XAMPP，其他Windows平台还有WAMP、AppServ，傻瓜式安装，百度更有一大片教程。安装好之后是设置MySQL的root密码，通常还会为每个数据库创建具有限制权限的用户。

### 2. PHP基础

4种标签：&lt;?php … ?&gt;、&lt;? … ?&gt;、&lt;script language=”php”&gt;&lt;/script&gt;、&lt;% … %&gt;

**单引号与双引号区别**：单引号除了\’与\\转义之外，其他字符直接打印；双引号会用变量值替换变量名称，转义字符均有效

**函数名**：不区分大小写

**注释**：单行#（shell风格，头部信息常用）或//，多行/* … */

**变量命名**：必须以美元符号$开头紧接字母或下划线，只能包含字母、数组或下划线，无需声明

**String**：连接字符串用点号“.”，不过“.=”这种写法点容易忽略，不如其他语言中的“+=”；相关函数有strlen()，strtolower()，strtoupper()，ucfirst()，ucwords()

**Number**：复杂运算可用圆括号明确运算符优先级，处理小数精度不高，可换成整数；相关函数有number_format(num, decimal_digits)

**Constant**：不加美元符号，通常全部大写，不能放在引号中

**表单验证**：isset()检测某个变量是否存在；empty()若传入的值为空字符串、0、false、NULL就会返回true；is_numeric()检测值是否为数字

**数组**：索引数组和关联数组，其中包含在双引号中的关联数组项应该用花括号包住

**循环与遍历**：for，while，do…while三种循环，foreach遍历数组

**获取表单值**：$_GET[‘name’]获取以GET方式传递的值，$_POST[‘name’]获取以POST方式传递的值

**包含文件**：requirce()关键性的包含文件，如数据库访问；include()一般包含文件，如header.html；*_once()会检测文件是否已存在

**数组与字符串转换**：

$array = explode(separator, $string);

$string = implode(glue, $array);

**处理表单**：使用隐藏的输入框来测试表单是否提交，从而执行不同的代码

### 3. MySQL和数据库基础

**管理数据库方式**：MySQL控制台或phpmyadmin

**关键字**：CREATE DATABASE|TABLE，USE，SHOW，INSERT，SELECT，UPDATE，DELETE，WHERE，ORDER BY，LIMIT，DROP，LIKE，TRUNCATE，GROUP BY，ALTER

**MySQL函数：**NOW()，SHA1()，CONCAT()，TRIM()，DATE_FORMAT()，SUBSTRING()，RAND()，ROUND()等

**执行联结**：内联结（INNER JOIN … ON …）；外联结（LEFT/RIGHT JOIN … ON …）

**存储引擎**：也是表的类型，常见有MyISAM（Linux/Max默认）、InnoDB（Windows默认）

**FULLTEXT查找**：基本的字符串匹配

**执行事务**：可以设置起点和终点，从而可以回滚，即取消会话期间的一系列操作，语句有START TRANSACTION，ROLLBACK，COMMIT（一旦提交，事务会话期间操作不能回滚了）

### **4\. 错误处理与调试**

**确定技术领域**：可能有HTML，PHP，SQL，CSS，JavaScript，甚至服务器

**PHP常见错误**：

*   空白页面：HTML问题或PHP错误，并关闭了display_errors
*   解析错误：分号、括号不对称，字符串使用未转义的引号
*   空变量值：忘记开头$，变量名拼写错误
*   调用未定义的函数：函数名拼写错误，PHP未配置正确
*   不能重新生命函数：包含文件中已定义函数
*   附一些错误报告关键字及错误原因：
*   unexpected end file: 少花括号
*   upexpected 'echo', 'if': 少分号";"
*   网页头部空白：是因为以utf-8 BOM编码的php文件，应改为utf-8无BOM编码
*   找不到mysqli 说明数据库无法连接
*   同一个页面先连接然后关闭，再连接（两次用require_once(MYSQL))似乎有问题
*   mysqli_num_rows()和mysqli_affected_array()等expects parameter 1 to be
*   mysqli_result，可能就是查询未成功，语法可能有错误
*   对于代码中用到的查询语句应该在控制台或其他界面中执行查询，看是否能成功

**错误处理与调试相关函数**：

*   error_reporting()：设置错误报告级别
*   set_error_handler()：指定出现错误时调用的函数，从而可以自定义错误处理程序
*   define(‘LIVE’, FALSE)：LIVE用来指示站点是否上线运行&lt;?&gt;
*   mysqli_error($dbc)：报告数据库查询方面的错误

### 5. PHP技术

**日期**：设置默认时区，时区与本地化，各类日期函数，日期格式化输出

**上传文件**：文件上传配置，上传目录通常在Web目录之外，$_FILES超全局变量，要注意上传文件的表单应当包括enctype属性

**Cookie**：setcookie()设置或清除cookie，$_COOKIE取得cookie的值

**SESSION**：开始会话session_start()，会话变量$_SESSION，终结会话使用unset()或session_destroy()函数

**Email**：这个目前还没试验成功，安装了个hmailserver邮件服务器，却没配置成功，还导致MySQL根密码不能用，弄了几个小时才发现的。

**标页码**：分页技术很常见，就是利用URL传递数值和LIMIT x,y 语句

**表格数据排序**：ORDER BY语句

**多语言版本**：网站关键位置的各语言版本存储在数据库中，通过自动检测或用户选择使用何种语言，涉及到字符集、时区、编码、日期显示、排序等基础

**输出缓冲**：为了一次把解析好的页面发送给用户代理，ob_start()、ob_end_flush()、ob_end_clear()

### 6. Web安全

**基本原则**：

*   不要把用户ID存储在cookie中
*   不要显示详细的出错消息
*   使用加密技术
*   保护所有目录和文件
*   不要存储信用卡号、银行业务、身份证号等信息
*   若需要，可使用SSL

**常见攻击**：垃圾邮件，XSS，SQL注入攻击，蛮力攻击，DDoS攻击

看完之后才觉得刚刚开始，手册里好多函数见都没见过，面向对象开发还是搞不懂怎么回事，正则方面一直是弱点，Ajax方面需要学习与实践，数据库设计得看一两本书，PHP与HTML的分离设计，研究一两个开源PHP系统哦，还有最近打算学的一个伪静态技术。
