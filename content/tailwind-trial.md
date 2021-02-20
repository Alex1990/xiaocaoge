---
title: "Tailwind CSS 尝试"
cover: ""
date: "2021-02-20"
category: "CSS"
tags:
  - CSS
  - CSS Framework
---

几个月前从知乎、公众号等多个地方陆续接触到 [Tailwind CSS](https://tailwindcss.com/) 这款 CSS 框架，当时的印象大概就是“人气很高，比 bootstrap 好用，与原子类（atom css）类似，但要强大的多”。于是，最近抽空学习了一下，并实际做了一个官方首页，得出下面评价：

**Tailwind CSS 是一套几乎不写 CSS 的样式解决方案，定义了一套完整的基于 class 的 DSL，包含布局、响应式、主题、开发效率、部署等解决方法。对于无 CSS 背景的人，在快速开发产品比较适用，对于完全熟悉 Tailwind CSS 的也能带来一定价值。除此之外，不推荐适用，下面会详细分析原因。**

## Tailwind CSS 真得可以精简样式书写吗？

比如下面设置一个导航链接的样式，

**原生 CSS**

```html
<a class="nav-link">Home</a>
```

```css
.nav-link {
  display: block;
  padding: 1.5rem 1rem;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  border-color: #fff;
}

@media (prefers-color-scheme: dark) {
  .nav-link:hover {
    border-color: #fff;
  }
}
```

**Tailwind CSS**

```html
<a class="block px-6 py-4 border-b-2 border-transparent hover:border-black dark:hover:border-white">Home</a>
```

仅仅对比这个示例，会发现 Tailwind CSS 确实精简一些，并不是特别明显，而且降低了代码可读性。如果有多个导航链接时就需要重复写了，如下所示。

```html
<ul>
  <li><a class="block px-6 py-4 border-b-2 border-transparent hover:border-black dark:hover:border-white">Home</a><li>
  <li><a class="block px-6 py-4 border-b-2 border-transparent hover:border-black dark:hover:border-white">Home</a><li>
  <li><a class="block px-6 py-4 border-b-2 border-transparent hover:border-black dark:hover:border-white">Home</a><li>
</ul>
```

**这是因为 Tailwind 在消解 CSS 选择器的概念时，也同样失去了 CSS 选择器的功能，从而导致实际代码并不一定精简**。

当然，你可以使用 Tailwind CSS 的`@apply`或者 [components](https://tailwindcss.com/docs/extracting-components) 功能。但是这就会使 Tailwind CSS 失去一个好处：**降低 class 命名的心智负担**。另外，组件颗粒度太细会导致命名负担加重，且现代前端框架都已内置组件概念。

而且，在带来并不是特别重要也不是特别精简的作用时引入了其他很多复杂性与缺陷。

## 与现代工作流程的冲突

现代的工作流程通常是设计师给出的设计稿单位是`px`，这导致前端在还原设计稿时要不断在大脑当中转换设计稿的单位和 Tailwind 的原子类。而且，Tailwind 的原子类完全可以使用自己命名的一套原子类或 CSS 变量替代，会更便利更实用。

## CSS 常见解决方案

### 布局

Tailwind CSS 并没有抽象出布局，只是 flex 和 grid 的简写，而 flex 和 grid 布局对于无 CSS 背景开发者来说也并不熟悉和直观，对于前端来说则可以直接书写 CSS，无需记忆 Tailwind 的简写形式。

### 伪类和响应式

这里放在一起说，是因为在 Tailwind 当中，两者写法类似，比如`hover:border-black`和`lg:px-6`，这就导致每一个样式都需要添加`hover:`或`lg:`这样的前缀，如果书写多了则变得繁琐。

### 分割线、固定宽高比、表单

这些都是抽象成一个 class 名称，但是基于现代框架开发的 UI 组件库都抽象成组件形式了，也提供了默认样式。即使不使用 UI 组件库，前端也很容易写出自己的 CSS 解决方法。所以这些对于一个熟练的前端来说都是作用不大的功能。

## 示例

一个基于 Next.js 的首页：[https://tailwind-and-nextjs.vercel.app/](https://tailwind-and-nextjs.vercel.app/)。

源码如下：

```js
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const [theme, setTheme] = useState('light')
  const onToggleTheme = e => {
    if (e.target.checked) {
      setTheme('dark')
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      setTheme('light')
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
    const initialTheme = localStorage.theme || (mediaQueryList.matches ? 'dark' : 'light')
    setTheme(initialTheme)
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  })

  return (
    <div className="dark:bg-black">
      <Head>
        <title>XProject</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-gray-100 dark:bg-gray-900 dark:text-white">
        <div className="container mx-auto px-4 max-w-screen-xl flex justify-between items-center">
          <h1>
            <Link href="/">
              <a>XProject</a>
            </Link>
          </h1>
          <div className="flex justify-between items-center">
            <nav>
              <ul className="flex items-center">
                <li>
                  <Link href="/">
                    <a className="block px-6 py-4 border-b-2 border-transparent hover:border-black dark:hover:border-white transition-colors">Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/pricing">
                    <a className="block px-6 py-4 border-b-2 border-transparent hover:border-black dark:hover:border-white transition-colors">Pricing</a>
                  </Link>
                </li>
                <li>
                  <Link href="/download">
                    <a className="block px-6 py-4 border-b-2 border-transparent hover:border-black dark:hover:border-white transition-colors">Download</a>
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
              <label>
                <input type="checkbox" checked={theme === 'dark'} onChange={e => onToggleTheme(e)} />
                {' '}{theme === 'light' ? '🌞' : '🌑'}
              </label>
            </div>
          </div>
        </div>
      </header>
      <div className="my-4 py-8">
        <h2 className="my-4 text-4xl text-center dark:text-white">XProject</h2>
        <p className="my-2 text-lg text-center text-gray-500 dark:text-gray-300">A demo of TailwindCSS and Next.js</p>
        <div className="my-8 flex justify-center">
          <button className="mx-4 px-8 py-3 text-xl border border-black border-solid rounded hover:bg-gray-100 transition-colors dark:border-white dark:text-white dark:hover:bg-gray-900">Download</button>
          <button className="mx-4 px-8 py-3 text-xl bg-black text-white border border-black border-solid rounded hover:bg-gray-700 transition-colors dark:bg-white dark:border-white dark:text-black dark:hover:bg-gray-100">Buy Now</button>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-screen-xl flex flex-col">
        <div className="my-10 lg:w-4/5">
          <h2 className="my-2 text-red-500">CONSTRAINT-BASED</h2>
          <p className="my-4 text-5xl dark:text-white">An API for your design system.</p>
          <p className="my-6 text-lg text-gray-500 dark:text-gray-300">Utility classes help you work within the constraints of a system instead of littering your stylesheets with arbitrary values. They make it easy to be consistent with color choices, spacing, typography, shadows, and everything else that makes up a well-engineered design system.</p>
        </div>
        <div className="my-10 lg:w-4/5 lg:self-end lg:text-right">
          <h2 className="my-2 text-yellow-500">BUILD ANYTHING</h2>
          <p className="my-4 text-5xl dark:text-white">Build whatever you want, seriously.</p>
          <p className="my-6 text-lg text-gray-500 dark:text-gray-300">Because Tailwind is so low-level, it never encourages you to design the same site twice. Even with the same color palette and sizing scale, it's easy to build the same component with a completely different look in the next project.</p>
        </div>
        <div className="my-10 lg:w-4/5">
          <h2 className="my-2 text-green-500">PERFORMANCE</h2>
          <p className="my-4 text-5xl dark:text-white">It’s tiny in production.</p>
          <p className="my-6 text-lg text-gray-500 dark:text-gray-300">Tailwind automatically removes all unused CSS when building for production, which means your final CSS bundle is the smallest it could possibly be. In fact, most Tailwind projects ship less than 10KB of CSS to the client.</p>
        </div>
        <div className="my-10 lg:w-4/5 lg:self-end lg:text-right">
          <h2 className="my-2 text-blue-500">MOBILE-FIRST</h2>
          <p className="my-4 text-5xl dark:text-white">Responsive everything.</p>
          <p className="my-6 text-lg text-gray-500 dark:text-gray-300">Wrestling with a bunch of complex media queries in your CSS sucks, so Tailwind lets you build responsive designs right in your HTML instead.</p>
          <p className="text-lg text-gray-500 dark:text-gray-300">Throw a screen size in front of literally any utility class and watch it magically apply at a specific breakpoint.</p>
        </div>
        <div className="my-10 lg:w-4/5">
          <h2 className="my-2 text-indigo-500">STATE VARIANTS</h2>
          <p className="my-4 text-5xl dark:text-white">Hover and focus states? We got ’em.</p>
          <p className="my-6 text-lg text-gray-500 dark:text-gray-300">Want to style something on hover? Stick hover: at the beginning of the class you want to add. Works for focus, active, disabled, focus-within, focus-visible, and even fancy states we invented ourselves like group-hover.</p>
        </div>
        <div className="my-10 lg:w-4/5 lg:self-end lg:text-right">
          <h2 className="my-2 text-purple-500">COMPONENT-DRIVEN</h2>
          <p className="my-4 text-5xl dark:text-white">Worried about duplication? Don’t be.</p>
          <p className="my-6 text-lg text-gray-500 dark:text-gray-300">If you're repeating the same utilities over and over and over again, all you have to do is extract them into a component or template partial and boom — you've got a single source of truth so you can make changes in one place.</p>
        </div>
        <div className="my-10 lg:w-4/5">
          <h2 className="my-2 text-pink-500">DARK MODE</h2>
          <p className="my-4 text-5xl dark:text-white">Now with Dark Mode.</p>
          <p className="my-6 text-lg text-gray-500 dark:text-gray-300">Don’t want to be one of those websites that blinds people when they open it on their phone at 2am? Enable dark mode in your configuration file then throw dark: in front of any color utility to apply it when dark mode is active. Works for background colors, text colors, border colors, and even gradients.</p>
        </div>
        <div className="my-10 lg:w-4/5 lg:self-end lg:text-right">
          <h2 className="my-2 text-red-500">CUSTOMIZATION</h2>
          <p className="my-4 text-5xl dark:text-white">Extend it, tweak it, change it.</p>
          <p className="my-6 text-lg text-gray-500 dark:text-gray-300">Tailwind includes an expertly crafted set of defaults out-of-the-box, but literally everything can be customized — from the color palette to the spacing scale to the box shadows to the mouse cursor.</p>
          <p className="text-lg text-gray-500 dark:text-gray-300">Use the tailwind.config.js file to craft your own design system, then let Tailwind transform it into your own custom CSS framework.</p>
        </div>
        <div className="my-10 lg:w-4/5">
          <h2 className="my-2 text-yellow-500">MODERN FEATURES</h2>
          <p className="my-4 text-5xl dark:text-white">Cutting-edge is our comfort zone.</p>
          <p className="my-6 text-lg text-gray-500 dark:text-gray-300">Tailwind is unapologetically modern, and takes advantage of all the latest and greatest CSS features to make the developer experience as enjoyable as possible.</p>
          <p className="text-lg text-gray-500 dark:text-gray-300">We've got first-class CSS grid support, composable transforms and gradients powered by CSS variables, support for modern state selectors like :focus-visible, and tons more.</p>
        </div>
        <div className="my-10 lg:w-4/5 lg:self-end lg:text-right">
          <h2 className="my-2 text-green-500">EDITOR TOOLS</h2>
          <p className="my-4 text-5xl dark:text-white">World-class IDE integration.</p>
          <p className="my-6 text-lg text-gray-500 dark:text-gray-300">Worried about remembering all of these class names? The Tailwind CSS IntelliSense extension for VS Code has you covered.</p>
          <p className="text-lg text-gray-500 dark:text-gray-300">Get intelligent autocomplete suggestions, linting, class definitions and more, all within your editor and with no configuration required.</p>
        </div>
        <div className="my-10 lg:w-4/5">
          <h2 className="my-2 text-blue-500">READY-MADE COMPONENTS</h2>
          <p className="my-4 text-5xl dark:text-white">Move even faster with Tailwind UI.</p>
          <p className="my-6 text-lg text-gray-500 dark:text-gray-300">Tailwind UI is a collection of beautiful, fully responsive UI components, designed and developed by us, the creators of Tailwind CSS. It's got hundreds of ready-to-use examples to choose from, and is guaranteed to help you find the perfect starting point for what you want to build.</p>
        </div>
      </div>
      <footer className="py-8 bg-gray-100 dark:bg-black">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <ul className="flex justify-between flex-wrap">
            <li className="my-4 w-full sm:w-1/2 lg:w-1/4">
              <h2 className="text-sm dark:text-white">GETTING STARTED</h2>
              <ul className="text-gray-500">
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Installation</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Release Notes</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Upgrade Guide</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Using with Preprocessors</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Optimizing for Production</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Browser Support</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">IntelliSense</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="my-4 w-full sm:w-1/2 lg:w-1/4">
              <h2 className="text-sm dark:text-white">CORE CONCEPTS</h2>
              <ul className="text-gray-500">
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Utility-First</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Responsive Design</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Hover, Focus, & Other States</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Dark Mode</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Adding Base Styles</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Extracting Components</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Adding New Utilities</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Functions & Directives</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="my-4 w-full sm:w-1/2 lg:w-1/4">
              <h2 className="text-sm dark:text-white">CUSTOMIZATION</h2>
              <ul className="text-gray-500">
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Configuration</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Theme Configuration</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Breakpoints</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Customizing Colors</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Customizing Spacing</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Configuring Variants</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Plugins</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Presets</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="my-4 w-full sm:w-1/2 lg:w-1/4">
              <h2 className="text-sm dark:text-white">COMMUNITY</h2>
              <ul className="text-gray-500">
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Github</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Discord</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Twitter</a>
                  </Link>
                </li>
                <li className="my-3">
                  <Link href="/">
                    <a className="hover:text-gray-700 dark:hover:text-gray-300">Youtube</a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
```

## 总结

因为开发人员知识背景不同，框架对其优劣也会不同，Tailwind CSS 消解了选择器和优先级这些繁琐复杂的概念，并内置了 CSS 常用解决方案，这些对于无 CSS 背景人士比较友好。但是，对于熟悉 CSS 的前端开发人员来说，没有带来明显的优势，却需要一定的学习和记忆成本，显得比较鸡肋，所以不推荐使用。

另外，CSS 在使用方面确实有一些劣势，比如选择器和布局等知识对于后端开发人员不友好，也没有那种大而全的常见问题直接解决方案。在解决这些问题时也要注意 UI 组件库与设计师与此密切相关。

## 相关链接

* [Tailwind CSS](https://tailwindcss.com/)
* [如何评价 CSS 框架 Tailwind CSS](https://www.zhihu.com/question/337939566)
* [Tailwind CSS （可能）是名过其实的](https://juejin.cn/post/6930196913119576077)
* [Why Tailand Isn’t for Me](https://dev.to/jaredcwhite/why-tailwind-isn-t-for-me-5c90)