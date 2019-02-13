---
title: "React 事件系统解析"
cover: ""
date: "2019-02-12"
category: "前端"
tags:
  - "React"
  - "事件系统"
---

## 准备工作

### 如何阅读源码

如果之前没有读过类似框架（代码规模、技术栈等方面相似）的源码，第一次阅读难免不知所措，毕竟代码量不小，几个小时或一天只能了解大概有哪些东西。我第一次尝试阅读 React 源码就是懵逼的，第二次还是懵逼，所以放弃了好多次，直到第三次有了一些阅读源码的经验积累才突然感觉有所顿悟。当然，之前的放弃也不是无用之功，起码熟悉了哪些包，一些包大概哪些文件，另外还阅读了一些 React Fiber 之类的讲解文章。

我目前感悟的阅读源码方法是：

* **熟悉相关技术栈与依赖**：当然，并非需要全部熟悉，看需要研究源码哪些方面以及研究深度而定。仅对于 React 事件相关的源码来说，可能需要熟悉 DOM 事件相关规范与接口、事件兼容性处理、[flow](https://flow.org/)，另外对于移动端原生应用及 React Native 事件相关熟悉更好，这一方面我也不熟悉，所以有一点儿相关的代码暂时略过。如果需要看测试代码，就需要对测试以及 Jest 有一定了解了。
* **通读相关源码**：就是熟悉源码文件组织结构，相关模块与函数，关键的数据结构等，通读一两遍相关源码，不需要关注细节实现，实际上裸读代码，有些逻辑与细节就是很难理解。
* **构建最简可运行示例与断点调试**：经过简单了解源码之后，还是感觉云里雾里，由于写代码伴随着抽象思考的过程，所以直接阅读抽象之后的代码不容易理解。这时候就需要一个或多个简单具体的示例来帮助理解代码的运行过程，熟悉代码的**调用栈**、**变量（数据）的含义**等。这时候使用浏览器开发者工具的断点调试工具就非常方便，可以查看 [Chrome 开发者调试入门](https://developers.google.com/web/tools/chrome-devtools/javascript/)，其他浏览器开发者工具调试功能大同小异。我是逐行代码阅读，搞不明白的可能需要反复运行与阅读才行。
* **总结核心要点**：经过前面几步对于代码的实现细节已经熟悉，这时候可以通过抽象与归类来将源码划分几个核心要点，然后总结，流程图之类可能有助于此。

另外，在阅读源码时，编辑器的搜索功能经常使用，尤其是指定目录下高性能搜索。

### DOM 事件

React 事件系统是对 DOM 事件的抽象与封装，不过核心还是一样，比如事件流（捕获与冒泡）、事件对象接口等类似。完整的 DOM 事件有非常多，React 只是支持了部分常用的，另外，说是 DOM 事件，其实是个模糊的统称，很多事件并不归属于 DOM，可以参考 [MDN Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)。React 主要支持的事件类型有：

* [HTML Standard - events](https://html.spec.whatwg.org/multipage/indices.html#events-2)：主要是文档与元素相关事件，比如表单元素相关事件`submit`、`reset`。
* [UI Events](https://www.w3.org/TR/DOM-Level-3-Events/)：常用的鼠标事件、键盘事件、输入事件等都在该规范中定义。
* [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/)：粘贴板相关事件。
* [Touch Events](https://www.w3.org/TR/touch-events/)：触摸事件。
* [Pointer Events](https://www.w3.org/TR/pointerevents)：指针事件。
* [CSS Animations](https://www.w3.org/TR/css-animations-1/#events)：CSS 动画事件。
* [CSS Transitions](https://drafts.csswg.org/css-transitions/#transition-events)：CSS 过渡事件。
* [Drag and Drop](https://html.spec.whatwg.org/multipage/dnd.html)：拖动事件。
* [Media elements](https://html.spec.whatwg.org/multipage/media.html)：媒体元素（`video`/`audio`)相关事件。

上面规范定义了相关事件类型接口，事件对象基础属性（是否可冒泡，是否可以被取消等），所有的事件类型接口都直接或间接扩展自`Event`接口。

### DOM 事件兼容性处理

作为浏览器当中的框架，对于跨浏览器处理是重要的一部分，DOM 事件兼容性处理主要有：

* 事件对象属性：比如键盘事件的`keyCode`。
* 事件类型：比如`mouseenter`和`mouseleave`事件。
* 事件代理：比如`blur`/`focus`事件，因为不冒泡，所以采用了捕获和`focusin`/`focusout`事件来实现事件代理，参见 [Delegating the focus and blur events](https://www.quirksmode.org/blog/archives/2008/04/delegating_the.html)。

关于 DOM 事件兼容性的处理已经比较成熟，有很多资源参考：

* jQuery 处理；
* 《JavaScript 忍者秘籍》：jQuery 作者写的书，里面有事件处理相关内容；
* [quirksmode](www.quirksmode.org)：
* [Dottoro Web Reference](http://help.dottoro.com/ljtdqwlx.php)
* [MDN Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)

上面一些资源包含了不少 IE8/9 相关兼容性处理，而现在 IE8/9 也几乎退出历史舞台了。但是，无论参考哪些，最终都需要在实际的运行环境当中测试兼容性方案才行。

### Flow

[Flow](https://flow.org/) 是使得 JavaScript 可以使用静态类型，便于写接口，与 TypeScript 类似。具有静态语言学习背景的话，很容易理解，即使不懂 flow 也不太影响阅读 React 源码。

## React 事件系统

**下面均以 react@v16.7.0 版本源码为基准**。

### 源码文件结构

React 源码采用了一种称为 [monorepo](http://danluu.com/monorepo/) 的组织方式，通过 yarn 的 [workspaces](https://yarnpkg.com/en/docs/workspaces) 功能来实现。简单来说就是一个代码仓库里面包含多个 npm 包，可以查看 [react/packages](https://github.com/facebook/react/tree/master/packages) 目录，React 事件相关的主要有 [packages/events](https://github.com/facebook/react/tree/v16.7.0/packages/events) 和 [packages/react-dom](https://github.com/facebook/react/tree/v16.7.0/packages/react-dom)。

**[packages/events](https://github.com/facebook/react/tree/v16.7.0/packages/events)**

该模块主要包含：

* 相关类型定义
  + `PluginModuleType.js`：事件模块类型；
  + `ReactSyntheticEventType.js`：合成事件（`SyntheticEvent`）相关类型；
  + `ResponderTopLevelEventTypes.js`：Responder 相关事件类型；
  + `TopLevelEventTypes.js`：事件类型的静态类型；
* 事件插件机制
  + `EventPluginHub.js`：事件插件注入、事件对象提取与派发等；
  + `EventPluginRegistry.js`：事件插件注册、已注册 React 事件名称列表等；
  + `EventPluginUtils.js`：事件派发及一些辅助函数；
* 事件流
  + `EventPropagators.js`：事件（派发）流相关；
* 辅助函数：下面三个文件各定义了一个函数，兼顾了数据为单个对象和数组情况。
  + `accumulate.js`：合并两个数据成为一个数组；
  + `accumulateInto.js`：将一个数据合并到另一个数组数据当中;
  + `forEachAccumulated.js`：对一组数据遍历执行指定回调函数；
* React Native Responder System 相关：对 React Native 不熟悉，暂不考虑这部分代码。
  + `ResponderEventPlugin.js`
  + `ResponderSyntheticEvent.js`
  + `ResponderTopLevelEventTypes.js`
  + `ResponderTouchHistoryStore.js`

react-dom 模块当中与事件系统相关的代码主要有`react-dom/src/events`目录和`react-dom/src/client`目录当中的部分文件。

**[packages/react-dom/src/events](https://github.com/facebook/react/tree/v16.7.0/packages/react-dom/src/events)**

* 不同类型的合成事件接口
  + `SyntheticAnimationEvent.js`
  + `SyntheticClipboardEvent.js`
  + `SyntheticCompositionEvent.js`
  + `SyntheticDragEvent.js`
  + `SyntheticFocusEvent.js`
  + `SyntheticInputEvent.js`
  + `SyntheticKeyboardEvent.js`
  + `SyntheticMouseEvent.js`
  + `SyntheticPointerEvent.js`
  + `SyntheticTouchEvent.js`
  + `SyntheticTransitionEvent.js`
  + `SyntheticUIEvent.js`
  + `SyntheticWheelEvent.js`
* 事件插件：每一个事件插件都包含支持的事件类型列表`eventTypes`和提取合成事件对象的方法`extractEvents`。
  + `BeforeInputEventPlugin.js`：输入相关事件；
  + `ChangeEventPlugin.js`：表单元素`onChange`事件；
  + `DOMEventPluginOrder.js`：事件插件排序列表，用于控制不同类型事件触发顺序；
  + `EnterLeaveEventPlugin.js`：`mouseenter`/`mouseleave`事件；
  + `SelectEventPlugin.js`：选区相关事件；
  + `SimpleEventPlugin.js`：大部分的事件类型都位于这里，比如键盘事件、鼠标事件、触摸事件、媒体事件等；
* 事件兼容性处理：兼容性处理代码不限于下面代码，实际上事件插件包含不少兼容性相关处理。
  + `FallbackCompositionState.js`
  + `getEventCharCode.js`
  + `getEventKey.js`
  + `getEventModifierState.js`
  + `getEventTarget.js`
  + `getVendorPrefixedEventName.js`
  + `isEventSupported.js`
* 事件绑定与触发
  + `EventListener.js`
  + `ReactBrowserEventEmitter.js`
  + `ReactDOMEventListener.js`

**[packages/react-dom/src/client](https://github.com/facebook/react/tree/v16.7.0/packages/react-dom/src/client)**

* `ReactDOMClientInjection.js`：事件注入及一些辅助方法注入。
* `ReactDOMComponent.js`：事件绑定。
* `ReactDOMComponentTree.js`：一些相关方法定义。

### 事件流程

React 整个事件流程按时间顺序可以分为三个环节：

#### 事件系统初始化

该环节主要是注入事件插件与辅助函数。

应用开始执行时，首先加载`react-dom/src/client/ReactDOM.js`里面的代码，其执行过程中执行`react-dom/src/client/ReactDOMClientInjection.js`文件，该文件调用事件插件注入代码和辅助函数注入代码。

* **事件插件类型**

  可以查看`events/PluginModuleType.js`来了解事件插件类型定义，主要包括一个`eventTypes`列表和`extractEvents`方法。

  ```js
  export type PluginModule<NativeEvent> = {
    eventTypes: EventTypes,
    extractEvents: (
      topLevelType: TopLevelType,
      targetInst: null | Fiber,
      nativeTarget: NativeEvent,
      nativeEventTarget: EventTarget,
    ) => ?ReactSyntheticEvent,
    tapMoveThreshold?: number,
  };
  ```

  然后，`react-dom/src/events`目录下的`*Plugin.js`类文件是具体的插件实现，比如`SimpleEventPlugin.js`。

* **事件插件注入**：通过引入，最终是调用`events/EventPluginRegistry.js`文件里面的`injectEventPluginOrder`与`injectEventPluginsByName`两个函数完成的。这两个函数执行完成之后，主要处理了事件插件数据（可以把事件插件当做数据），初始化了下面几个对外变量，用于后面的事件派发：

  + `eventPluginOrder`：事件插件顺序定义；
  + `plugins`：事件插件；
  + `eventNameDispatchConfigs`：React 事件名称（比如`click`）到 React 事件派发配置映射；
  + `registrationNameModules`：React 事件注册名称（比如`onClick`/`onClickCapture`）到事件插件映射；
  + `registrationNameDependencies`：React 事件注册名称到依赖的原生 DOM 事件名称映射。

* **辅助函数注入**：主要定义了三个事件处理过程当中使用的三个辅助函数。
  + `getFiberCurrentPropsFromNode`：获取指定 DOM 节点对应的事件监听器数据；
  + `getInstanceFromNode`：获取指定 DOM 节点对应 Virtual DOM 当中的节点；
  + `getNodeFromInstance`：获取指定 Virtual DOM 节点对应的 DOM 节点。

#### 事件监听器处理

应用初始化时，调用`ReactDOM.render`方法，然后会经过`react-reconciler`（React Fiber）里面的一系列函数调用，创建 Virtual DOM 节点（FiberNode），处理对应的节点属性（React props），也包括事件监听器的处理：存储事件监听器与绑定事件。

* **事件监听器存储**

  通过调用`react-dom/src/client/ReactDOMComponentTree.js`的`updateFiberProps`函数将事件监听器存储到节点的某个属性当中：

  ```js
  const randomKey = Math.random()
    .toString(36)
    .slice(2);
  const internalEventHandlersKey = '__reactEventHandlers$' + randomKey;

  export function updateFiberProps(node, props) {
    node[internalEventHandlersKey] = props;
  }
  ```

* **事件绑定**

  事件绑定处理通过`react-dom/src/client/ReactDOMComponent.js`的`setInitialProperties`方法来完成。对于不可冒泡的事件（比如`img`标签的`load`事件，`video`元素的媒体事件），React 会直接绑定到对应的 DOM 节点上；对于可冒泡的事件，React 会通过事件代理来处理，会监听`rootContainerElement`上面的事件，目前是`document`，以后可能会变成 React 应用挂载的根节点。

  事件绑定涉及到`react-dom/src/events/ReactDOMEventListener.js`文件里面的`trapBubbledEvent`/`trapCapturedEvent`以及`react-dom/src/events/ReactBrowserEventEmitter.js`里面的`listenTo`等函数。最终是通过`react-dom/src/events/EventListener.js`里面的两个函数，实际上就是调用 DOM 的`addEventListener`方法。但是第二个参数`listener`并不是 React props 的值，而是`react-dom/src/events/ReactDOMEventListener.js`里面的`dispatchInteractiveEvent`或`dispatchEvent`函数。

#### 事件派发

下面以简单的一个按钮元素`<button>`的`click`事件为例。

* **合成事件创建**

当`click`事件触发时，会冒泡到`document`，从而触发绑定在其上的监听器，就是`react-dom/src/client/ReactDOMEventListener.js`文件当中的`dispatchInteractiveEvent`函数，然后经过几个函数处理会依次调用该文件当中的`dispatchEvent`和`handleTopLevel`函数。

紧接着依次调用`events/EventPluginHub.js`文件里面的`runExtractEventsInBatch`、`extractEvents`方法。在`extractEvents`方法当中，依次调用已注入插件的`extractEvents`方法，当然，对于`click`事件真正起作用的只有`SimpleEventPlugin`插件。在该插件当中会通过合成事件（SyntheticEvent）的相应构造器来创建合成事件，`click`事件对应`SyntheticMouseEvent`构造器。

`SimpleEventPlugin`插件包含 React 事件与 DOM 事件一一对应。而 React 事件与 DOM 事件不止一一对应关系，可以阅读其他事件插件代码了解更多。

* **事件派发预处理**

创建合成事件之后，大部分事件插件都会调用`events/EventPropagators.js`文件的`accumulateTwoPhaseDispatches`函数。调用该函数的作用是为了收集合成事件传播过程当中涉及到的节点和监听器，存放于合成事件对象的`event._dispatchListeners`和`event._dispatchInstances`属性当中。注意，该处理过程是按照事件流顺序来处理的，首先是捕获阶段（从应用的根节点到目标节点），然后是冒泡阶段（从目标节点到应用的根节点）。可以查看`shared/ReactTreeTraversal.js`的`traverseTwoPhase`方法。

* **派发事件**

经过上面的处理之后，会调用`events/EventPluginHub.js`文件中的`runEventsInBatch`函数，然后对事件队列当中的每个事件调用`events/EventPluginUtils.js`文件中的`executeDispatchesInOrder`函数来按照事件流顺序执行事件对应的监听器。

### 开发者模式代码

React 当中包含了大量的提升开发者体验的代码，比如输出在控制台的警告信息。这些代码大部分只在开发环境有效，打包到生产环境会被删除，是通过 Webpack 和 Uglify 来实现的。

一些警告信息还会带网页地址，可以查看最新的更详细的说明，这种方式很不错，既不会太占源码体积，又可以查看到更详细的说明。

### 合成事件

合成事件（Synthetic events）对象通过一系列定义的合成事件类来创建，类比于 DOM 事件规范中定义的接口。最顶部是`SyntheticEvent`类，然后是其他子类，一直继承下来，比如`SyntheticUIEvent`继承自`SyntheticEvent`，`SyntheticMouseEvent`继承自`SyntheticUIEvent`。继承是通过类的静态方法`extend`来显示的，下面为`extend`方法定义：

```js
SyntheticEvent.extend = function(Interface) {
  const Super = this;

  const E = function() {};
  E.prototype = Super.prototype;
  const prototype = new E();

  function Class() {
    return Super.apply(this, arguments);
  }
  Object.assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  Class.Interface = Object.assign({}, Super.Interface, Interface);
  Class.extend = Super.extend;
  addEventPoolingTo(Class);

  return Class;
};
```

上面的代码还实现了类的静态属性`Interface`的继承，通过类似于`mixins`的机制。`Interface`属性是个对象，包含了该类实例包含哪些属性和方法。

## 后记

在一开始阅读代码时，我试图搜索过一些相关的源码解读文章，发现要么是简单地通过注释形式说明一下每行代码做什么的，要么就是画个流程图，然后说明下每个核心部分如何工作的，有些文章会加上几张图片。但是，我总觉得单纯的文本和图片形式不能很好地传递源码运行信息，我这篇文章同样如此，毕竟我们都是通过阅读代码、调试工具等结合理解代码的运行。假如有一种可以**交互式**展现代码运行过程的工具可能有助于更好地理解，次一点儿动画也可以。

PS. 写完此文发现一篇不错的文章[REACT事件系统和源码浅析](https://www.lzane.com/tech/react-event-system-and-source-code/)

### 实例代码运行过程录制工具

通过构建最简化可运行示例，并结合浏览器开发者工具的断点调试来理解代码运行过程是一个最实用有效的方法。其中关键的信息有：函数调用栈、参数值、变量值、代码具体逻辑等，但是文本与图片形式并不适合展现该过程。另外，目前的浏览器调试工具，假如选择逐行运行，会不断在源文件里面跳来跳去，并不是按顺序一样连贯的。

Chrome 开发者工具是根据 [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/tot/Debugger) 来开发的，我们可以通过 [puppeteer](https://github.com/GoogleChrome/puppeteer) 和该协议规范做一些有用的工具。自动化逐行运行代码，并把调用栈与变量值等信息保存下来，然后在写一个工具播放这些信息。这个我还没有尝试过，但是大致看了一下，可行性很大。

### 模块及模块依赖关系可视化工具

React 包含了几十上百个模块（文件），之间的依赖关系需要花一段时间才能理清。可以通过 [@babel/parser](https://babeljs.io/docs/en/next/babel-parser.html) 工具来静态将源码解析为 AST（抽象语法树），然后通过处理分析该 AST 获取各模块的依赖关系、每个模块定义的函数等信息，并通过可视化工具（如 D3.js）来可视化展示。依赖关系是一个网络，从可视化的网络图可以直观地看出哪些是关键模块（依赖或被依赖关系最多）、哪些是最底层的模块（不依赖任何其他模块）等信息。

## 更多资源

* [React events in depth w/ Kent C. Dodds, Ben Alpert, & Dan Abramov](https://www.youtube.com/watch?v=dRo_egw7tBc&t=8s)
