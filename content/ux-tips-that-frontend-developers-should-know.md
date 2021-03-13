---
title: "前端应该知道的用户体验小知识"
cover: ""
date: "2021-03-13"
category: "前端"
tags:
  - UX
  - 用户体验
---

在以往的开发经历当中，发现合作的人，包括产品、开发等人员，往往忽略一些很有用的能增强用户体验的知识，而这些知识往往是十分零碎的。典型的产品和开发人员成长路径当中是不会包括这些小知识的，面试的时候也是不会考的，甚至大部分最终用户也不会意识到这些东西。这些关于用户体验的小知识是需要日积月累，需要用心体验所用到的产品，需要阅读用户体验和交互相关的数据和文章才能了解到。

本文就是自己关于用户体验小知识的总结，这些都是容易被忽略的。

## 进度指示

在应用当中某些操作可能耗时较长，可能是因为网络速度，也可能是因为操作需要进行的计算量较大，如果没有响应或者显示空白，则用户可能认为应用有问题，也会造成用户的流失。这种情况，简单的可以显示一个“加载中”动画，复杂的可以显示进度条。

**使用建议**

* 如果操作耗时 3 秒以上则必须显示进度指示。
* 如果操作耗时 10 秒以上则最好使用进度条方式或者想办法优化性能。
* 上面 3 秒或 10 秒并不是一定的，根据实际情况可以调整。

## 弹层 VS 新页面

内容应该使用弹层还是新页面是一个经典的用户体验问题，因为没有特别精准的界限，所以在使用时往往造成选择困扰。对于这个问题的分析也有很多：

* [Modal vs Page: A Decision Making Framework](https://uxplanet.org/modal-vs-page-a-decision-making-framework-34453e911129)
* [Modality Is the One UX Concept That Most Designers Don’t Fully Understand](https://uxplanet.org/modality-the-one-ux-concept-you-need-to-understand-when-designing-intuitive-user-interfaces-e5e941c7acb1)

**使用建议**

* 无论使用哪种方式，尽量整个应用保持一致。
* 如果用户还需要使用当前内容，则推荐使用弹层方式，否则使用新页面。

## 超链接打开方式：当前标签页 VS 新标签页

超链接默认打开方式有两种：当前标签页和新标签页。具体选择哪种需要根据链接的类型，同时也要注意各地区用户使用习惯，比如国内往往习惯新标签页，国外往往选择当前标签页。这也算一个经典的用户体验问题，有很多这方面的分析：

* [Why External Links Should Open in New Tabs](https://uxmovement.com/navigation/why-external-links-should-open-in-new-tabs/)
* [When to Open Links in a New Tab](https://meiert.com/en/blog/links-in-new-tabs/)
* [G200: Opening new windows and tabs from a link only when necessary](https://www.w3.org/TR/WCAG20-TECHS/G200.html)
* [Links and Hypertext](https://webaim.org/techniques/hypertext/hypertext_links)

用户也可以自己选择打开方式，当然仅仅对于默认当前标签页打开方式的超链接，比如使用鼠标右键菜单或者鼠标中键点击。

**使用建议**

* 对于非本站链接使用新标签页打开。
* 对于非网页类型资源使用新标签页打开，比如一个 PDF 文件。
* 对于影响用户正常使用流程的链接使用新标签页打开，比如文章列表的某个文章链接，用户可能还需要浏览列表信息。

## 页面跳转使用`<a>`标签

浏览器提供了手动跳转的功能，这导致一些应用开发时使用非`<a>`标签用来触发跳转，这会导致两个问题：一是 SEO 不友好；二是用户针对超链接的快捷键无法使用，比如鼠标中键新标签页打开。

## Title/Tooltip 提示文字

HTML 的 [title](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title) 属性用于在鼠标悬浮时显示额外的提示信息，对于概念的解释或图标按钮的说明是很有必要的。弹出式的交互展示方式可以不干扰正常流程的用户，对于那些有疑惑的用户也可以进一步说明。

默认的`title`属性动画或样式往往不符合需求，这时候可以使用单独的 UI 组件，很多 UI 组件库都提供了对应的组件，名称往往是 "Tooltip"。

**使用建议**

* 对于纯图标按钮几乎是必须的，用于显示按钮名称、作用、快捷键等。
* 即使不使用单独的 tooltip 组件，也可以退而求其次，使用 HTML 的`title`属性。

## ESC 键

ESC 键用于取消某些操作，比如用于退出（关闭）弹层。**键盘友好性应当是桌面端应用的衡量指标之一**，不仅仅是 ESC 键，还包括应用的快捷键，这不仅可以提升操作效率，对于不便于操作鼠标的人士也是十分有用的。

**使用建议**

* 弹层或下拉菜单支持 ESC 键退出（关闭）。

## 清空按钮

清空按钮常见于输入框，清空输入框的方式有：

* 长按退格键直到清空所有内容，耗时较长；
* 全选内容，然后退格键或删除键一次清除，对于电脑小白来说不友好；
* 提供一个清空按钮，快速且对电脑小白友好。

**使用建议**

* 对于那些追求输入效率的地方，最好能提供清空按钮。
* 清空按钮最好在有实际输入内容且获取焦点时才显示。

## 自动获取焦点

某些情况下输入框或其他表单组件自动获取焦点会使操作更顺畅，比如下面情形：

* 搜索页面通常进入后就是在搜索框输入关键词，因此可以在页面进入后使得搜索框自动获取焦点。
* 弹层形式表单，弹层显示后下一步操作就是填写表单，因此可以在弹层显示后第一个表单组件自动获取焦点。
* 确认框，可以使确认按钮自动获取焦点，并且支持快捷键`Enter`/`Return`。

## 单选框或复选框文字可点击选择/取消

比如我们经常遇到的一个场景，注册用户时往往需要勾选同意使用协议，勾选使用一个复选框组件，有些网站必须点击这个复选框才行，点击复选框旁边的文字就不行，这对于用户操作不太便利。

HTML 的 [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) 标签可以与表单组件进行关联，比如下面：

**嵌套使用 label 标签（推荐）**

```html
<label>
    <input type="checkbox" name="approved">
    勾选同意《本网站使用协议》
</label>
```

**使用 label 的 for 属性**

```html
<input type="checkbox" name="approved" id="approved">
<label for="approved">勾选同意《本网站使用协议》</label>
```

**使用建议**

* 尽量使用`<label>`标签包裹表单标签。
* 开发表单组件时可以利用上面或者自己单独处理事件达到同样效果。

## radio 还是 select

`<radio>`的选项直接显示，占用面积较大，但也因为直接显示所以可以直接选择；`<select>`的选项列表弹层方式展示，不占用主内容空间，但是多一步点击操作。这里`<radio>`/`<select>`表示此种交互方式，不限于 HTML 标签，也包括用户自己写的 UI 组件。

**使用建议**

* 选项比较少，且占用面积无关紧要时，优先使用`<radio>`标签，否则使用`<select>`。

## 表单验证

表单验证涉及到交互细节比较多，很多人往往会忽略，产品原型图或 UI 设计稿往往缺少很多细节或无法一次做完善，在涉及表单验证时需要考虑以下几点：

* 正常的输入提示性问题；
* 何时进行输入验证，输入过程还是输入完成，又或者表单提交时；
* 字段是否可选，其结果对验证规则的影响；
* 验证结果反馈，通过颜色和文字等方式，验证不通过时提示信息尽量对用户有用、易理解；
* 异步验证时显示验证中状态，比如显示加载中图标。

## 支持 Enter/Return 按键提交表单

正常的 HTML [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) 和`<input>`标签使用时，在`<input>`标签正在输入时，按`Enter`/`Return`键会提交表单。现在应用往往会阻止表单默认提交事件，为了进行额外数据处理或校验，但是往往就丢失了这个小的交互方式。

## 打印样式

现如今，需要打印的场景已经很少了，以至于在很多需要打印的场景其样式也没有针对性优化，比如超链接不显示 URL，内容页打印无用的导航等额外信息等。打印样式本来也属于响应式设计范畴，纸张当然也属于一种显示终端，对于文字内容型应用需要考虑打印样式，少量的优化能提升很明显，可以参考：[A Guide To The State Of Print Stylesheets In 2018](https://www.smashingmagazine.com/2018/05/print-stylesheets-in-2018/)。

## 是否自动播放音频或视频

应该慎用自动播放功能，因为播放内容可能未知、用户所处环境不适合播放声音或者默认音量比较大，还是应该把播放控制交给用户来触发。当然，也有例外情况，就是本身应用就是播放音频或视频的，此时用户已经预知播放的后果。

## 总结

上面只是列出了在开发当中经常遇到的，在开发 UI 组件或者说开发任何东西时，包括很多用户体验原则或小知识，这需要体验感悟一个良好的应用应该是什么样的。另外，用户体验是一个很大的范畴，设计知识很多，下面列举一些相关书籍和网站供参考。

另外，上面有一半左右都是表单相关的，基本上用户使用表单都是为了完成某项任务，因此表单的最终设计目标就是：**让用户高效率完成任务**，为了达到这个目标，需要遵循下面几个原则：

* 减少操作次数
* 即时反馈
* 充分利用各种交互方式

## 相关书籍

这里仅列举自己读过的书籍，都是入门书籍，但对于完全不了解的人提升很明显，其他交互和用户体验相关书籍可自行搜索。

* [《用户体验的要素》](https://book.douban.com/subject/2297549/)
* [《写给大家看的设计书》](https://book.douban.com/subject/3323633/)
* [《简约至上》](https://book.douban.com/subject/5394309/)
* [《认知与设计》](https://book.douban.com/subject/6792322/)
* [《设计心理学》](https://book.douban.com/subject/1288844/)

## 相关链接

* [Google Web Fundamentals: Design & User Experience](https://developers.google.com/web/fundamentals/design-and-ux/ux-basics)
* [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
* [Material Guidelines](https://material.io/design/guidelines-overview)