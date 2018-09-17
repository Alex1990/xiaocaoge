---
title: "表单验证（Form Validation）"
cover: ""
date: "2013-06-05"
category: "前端"
tags:
  - form validation
---

表单验证最常见的就是注册和登录表单，客户端与服务端都需要验证，客户端验证可以即时反馈，服务端用来防止恶意人员绕开客户端验证或JavaScript不起作用时提供验证。

表单验证包括规则集合、验证引擎、反馈信息。

### 规则集合：

主要利用正则表达式来验证字符串是否符合特定格式，比如邮箱、URL、IP、日期、电话号码、特定长度范围等。邮箱与URL的正则表达式可以非常复杂，不过一般用不到，而且可以利用插件代替或搜索到规则即可。规则集合是一个对象，包含各种特定格式对象，可以添加扩展规则函数。

### 验证引擎：

验证主要是用事件来驱动的，主要有focus、blur、keypress、change等。而与HTML代码的接口通过特定的类来实现，比如邮箱地址的输入框的class为email，对应的规则集合中邮箱的规则对象名也是email。在即时验证某个用户名或邮箱是否存在时，结合keypress事件与Ajax来实现。

### 反馈信息：

反馈信息包括输入提示和错误提示，可以包含在规则集合对象中，并且可以定制。

附：

**正则表达式各符号含义：**

* [http://www.cnblogs.com/xybs/archive/2012/10/23/2735969.html](http://www.cnblogs.com/xybs/archive/2012/10/23/2735969.html)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

**在线正则验证器：**

* [http://tools.netshiftmedia.com/regexlibrary/](http://tools.netshiftmedia.com/regexlibrary/)
* [http://regexp.duttke.de/](http://regexp.duttke.de/)

**jQuery validation插件**

* [http://jqueryvalidation.org/](http://jqueryvalidation.org/)
* [https://github.com/posabsolute/jQuery-Validation-Engine](https://github.com/posabsolute/jQuery-Validation-Engine)

**原生JS表单验证DEMO**

* [Register-Classic.html](/demo/form-validation/Register-Classic.html)
* [Simple-Form.html](/demo/form-validation/Simple-Form.html)
