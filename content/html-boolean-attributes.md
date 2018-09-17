---
title: "HTML Boolean Attributes"
cover: ""
date: "2016-05-18"
category: "前端"
tags:
  - React
  - 代码风格
  - Boolean Attributes
---

有时在阅读别人的 HTML 代码时，会发现在写`<input type="radio">`/`<input type="checkbox">`/`<option>`时经常将“选中”状态属性写成`checked="checked"`/`selected="selected"`。而我了解到`checked`/`selected`属性属于布尔属性（Boolean attributes）：即该属性出现表示**真值**，不出现表示**假值**，所以完全没必要多敲几个字符。

前几天，我突然发现我没有搞清楚 HTML 布尔属性假如有值的话，哪些是合法值，我竟然认为**空字符串**和`"false"`表示**假值**，然后看规范才明白不是这样。

## HTML 布尔属性（Boolean attributes）

[HTML5 规范](https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes)说：

> ... A number of attributes are boolean attributes. The presence of a boolean attribute on an element represents the true value, and the absence of the attribute represents the false value.
>
> If the attribute is present, its value must either be the empty string or a value that is an ASCII case-insensitive match for the attribute's canonical name, with no leading or trailing whitespace.

以及：

> The values "true" and "false" are not allowed on boolean attributes. To represent a false value, the attribute has to be omitted altogether.

所以，如果要表示`<input type="checkbox">`选中的写法有：

```html
<input type="checkbox" checked>
<input type="checkbox" checked="checked">
<input type="checkbox" checked="">
```

如果表示不选中，则不能出现`checked`属性：

```html
<input type="checkbox">
```

个人对于空字符串可作为合法值不太赞同，感觉会给人一种不选中的误导。

## `checked`与`checked="checked"`区别

在 W3C 的 [HTML 4.01 规范](https://www.w3.org/TR/html401/intro/sgmltut.html#h-3.3.4.2)中已经有 Boolean attributes 的说明，里面提到了：

> Authors should be aware that many user agents only recognize the minimized form of boolean attributes and not the full form.

当然，现在主流的浏览器都支持`checked="checked"`这种写法的，所以实际使用效果没有区别。

其区别主要在于：`checked`字符少，简洁直观；而使用`checked="checked"`的理由主要是在 XHTML 中，只写`checked`不合法，但是我们通常是在写 HTML5，所以没什么理由写`checked="checked"`。

## 布尔属性（Boolean attributes）列表

截止该文章书写时有 39 个：

```text
allowFullscreen
async
autofocus
autoplay
checked
compact
controls
declare
default
defaultChecked
defaultMuted
defaultSelected
defer
disabled
draggable
enabled
formNoValidate
hidden
imageSmoothingEnabled
indeterminate
isMap
loop
multiple
muted
noHref
noResize
noShade
noValidate
noWrap
open
pauseOnExit
readOnly
required
reversed
selected
spellcheck
translate
trueSpeed
typeMustMatch
```

上面列表获取方法：WHATWG HTML 规范在 Github 上面的仓库（[https://github.com/whatwg/html](https://github.com/whatwg/html)）

```shell
git clone https://github.com/whatwg/html
cd html
# cat source | grep "attribute boolean" 之后手工处理，或执行下面代码
cat source | grep "attribute boolean" | grep -v "readonly attribute boolean" | grep -oE "\">[A-Za-z]{1,}</span>" | awk -F'>|<' '{print $2}' | sort | uniq
```

## Boolean attributes in React

[React](https://facebook.github.io/react/index.html) 的 JSX 语法与 HTML 有所不同，在 JSX 中，可以传入`true`表示设置该布尔属性，传入`false`表示不设置该属性，如：

表示选中复选框：

```jsx
<input type="checkbox" checked />
<input type="checkbox" checked={true} />
```

表示不选中复选框：

```jsx
<input type="checkbox" />
<input type="checkbox" checked={false} />
```

## 参考

- [Boolean attributes](https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes) in WHATWG HTML Specification.
- [Boolean attributes](https://www.w3.org/TR/html401/intro/sgmltut.html#h-3.3.4.2) in W3C HTML 4.01.
- WHATWG HTML Specification Source: [https://github.com/whatwg/html](https://github.com/whatwg/html)
- @mdo's [code guide](http://codeguide.co/#html-boolean-attributes)

