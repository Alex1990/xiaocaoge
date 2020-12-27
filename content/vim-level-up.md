---
title: "Vim 自我进阶学习"
cover: ""
date: "2020-12-27"
category: "编辑器"
tags:
  - Vim
  - VSCode Vim
---

自从六七年前看过 [Practical Vim](https://www.amazon.com/Practical-Vim-Thought-Pragmatic-Programmers/dp/1934356980) 的前面几章之后，就很少花整块时间去更新自己的 Vim 使用知识了，只是遇到什么问题就谷歌搜索一下。所以，只是掌握基本的模式切换、光标移动、搜索、删除、复制、粘贴、配置、主题、插件这些。像快捷键设置、宏录制、高效移动光标等知识就从来不懂了，另外，对于插件的使用也只限于语法高亮类型的。

## 众人拾柴火焰高

在前端时间与同事讨论 [VSCode Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) 使用时，有个使用 [WebStorm](https://www.jetbrains.com/webstorm/) 的同事推荐了一个 [ACE Jump](https://plugins.jetbrains.com/plugin/7086-acejump) 插件，顿感眼前一亮，这才是最高效的光标移动到任意位置的方式，与 Chrome 上面的 Vimium 扩展思路有类似之处。于是，到 VSCode Marketplace 搜索一番，发现没有类似的，就在绝望的时候，翻看了 VSCode Vim 扩展的文档，发现提到了 [vim-easymotion](https://github.com/easymotion/vim-easymotion) 这款神级扩展，比 ACE Jump 更加强大。当然，VSCode Vim 扩展已经集成了[easymotion](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim#vim-easymotion)，但是需要手动开启，可以查看前面链接文档。

我与右边同事讨论火热之时，左边同事向我推荐了一篇非常简单实用的 Vim 学习教程——[Learn Vim Progressively](https://yannesposito.com/Scratch/en/blog/Learn-Vim-Progressively/)。里面将 Vim 使用能力分成了四个等级：第一级，生存（Survive）；第二级，感觉舒适（Feel Comfortable）；第三级，更好，更强，更快（Better, Stronger, Faster）；第四级，Vim 超能力（Vim Superpowers）。我处于第三级刚刚入门水平，这一等级主要是光标移动更快更简单，我只懂部分，当然第四级也懂一点。

种种迹象表明，我确实应该提升下自己的 Vim 使用技能了。

## 光标移动

### Vim 自身快捷键

* `H`/`M`/`L`：可视区域顶部、中间、底部
* `%`：移动到匹配的括号，比如`()`/`[]`/`{}`

#### 行内移动

* `^`：移动到当前行的第一个非空白字符
* `g_`：移动到当前行的最后一个非空白字符
* `f`：向后移动到指定字符
* `F`：向前移动到指定字符
* `t`：向后移动到指定字符的前一个字符
* `T`：向前移动到指定字符的后一个字符

#### 重复光标移动

上面的`f`/`F`/`t`/`T`四个快捷键可以与快捷键`;`/`,`结合使用

* `;`：表示重复执行上一次光标移动
* `,`：表示反方向重复执行上一次光标移动

### Vim EasyMotion

使用前面提到的 vim-easymotion 插件用于快速移动到可视区域的任意位置，EasyMotion 插件的功能很强大可以查看其文档，不过我懒得记忆复杂的规则，所以只是用了最常用的一个命令：**按照 2 个字符搜索**。默认的快捷键比较复杂，使用了 [Leader key](https://stackoverflow.com/questions/1764263/what-is-the-leader-in-a-vimrc-file)，于是我将快捷键设置为了空格键，这样，通常只需要四次按键就可以准确地跳转到任意字符位置。

## 光标移动与其他操作结合

### 光标移动与选择结合

* `Vj`/`Vk`：向下选择行，向上选择行
* `v0`：选择当前光标至行首
* `v$`：选择当前光标至行尾
* `vw`：选择下一个单词
* `vb`：选择上一个单词
* `vf"`：选择当前光标至当前行向后第一个`"`
* `vF"`：选择当前光标至当前行向前第一个`"`
* `vt"`：选择当前光标至当前行向后第一个`"`的前一个字符
* `vT"`：选择当前光标至当前行向前第一个`"`的后一个字符

### 光标与复制结合

上面的`v`命令可以换成复制命令`y`，实现选择复制。

### 光标与删除结合

上面的`v`命令可以换成删除命令`d`，实现选择删除。如果想要删除之后可以进入输入模式，则将`v`命令换成`c`。

## 多光标操作

自 Sublime Text 编辑器以多光标操作惊艳众人之后，众多后来者都推出了多光标操作功能，而 Vim 同样也有一款插件 [vim-multiple-cursors](https://github.com/terryma/vim-multiple-cursors) 用于让 Vim 也具有多光标操作能力。

> 注：多光标操作，又称[**同时编辑（Simultaneous editing）**](https://en.wikipedia.org/wiki/Simultaneous_editing)，最早的多光标操作非 Sublime Text，可能是 [Lapis](https://en.wikipedia.org/wiki/Lapis_(text_editor))。

## 重复执行

`N<command>`可以重复执行某个命令，比如`10j`向下移动 10 行，这也就是我常用的，虽然一直知道这个，但是从来没有发掘出强大的用途，比如

* `3p`：粘贴 3 次
* `10iabc [ESC]`：插入`abc `10次

## 快捷键设置

```
# 将 H 键映射到 0
map H 0

# 将 L 键映射到 $
map L $

# 将 <Space> 键映射到插件命令
map <Space> <Plug>(easymotion-overwin-f2)
```

另外，设置快捷键的命令有好几个：`nmap`、`remap`、`noremap`、`nnoremap`、`vnoremap`、`inoremap`，可以查看下面链接

[What is the difference between the remap, noremap, nnoremap and vnoremap mapping commands in Vim?](https://stackoverflow.com/questions/3776117/what-is-the-difference-between-the-remap-noremap-nnoremap-and-vnoremap-mapping)

## 宏

就是可以录制一段动作命令，之后可以播放，主要用于一些复杂的组合命令。

* `qa`：记录命令到寄存器`a`，当然也可以是其他字母。
* `@a`：播放寄存器`a`当中的命令

下面写一个实用的例子：

* 首先在一个空行输入字符`1`
* 然后依次输入`qaYp<C-a>q`
  + `qa`开始录制
  + `Yp`重复当前行
  + `<C-a>`即`Ctrl`+`a`，当前数字加 1
  + `q`停止录制
* `@a` 1 的下面写入 2
* `@@` 2 的下面写入 3
* `10@a`/`10@@`重复执行上面命令 10 次

## 总结

上面介绍的都是日常使用的，且不需要太多记忆就可以提升很大效率，当然，不用一两天就学完，可以每天学几个命令，最重要的是多练，形成肌肉记忆。另外，我对于工具的使用理念是**尽量花少的学习成本只学习工具最常使用的功能**。

## 参考

* [Learn Vim Progressively](https://yannesposito.com/Scratch/en/blog/Learn-Vim-Progressively/)
* [VSCode Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim#vim-easymotion)
* [vim-easymotion](https://github.com/easymotion/vim-easymotion)
* [vim-multiple-cursors](https://github.com/terryma/vim-multiple-cursors)