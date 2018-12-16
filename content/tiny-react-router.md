---
title: "一个极简 React 路由实现"
cover: ""
date: "2018-12-16"
category: "Javascript"
tags:
  - "路由"
  - "React"
  - "Router"
---

在 Web 前端开发领域内，路由是指通过 URL 来控制视图（View）的显示，可以看做是 URL 到 View 的映射。而 URL 可以认为
是状态（State），因此路由可以认为是`(URL) State => View`的映射，这也符合 React 的理念，即应用看做是
`Application State => View`的映射。在浏览器当中 [window.location](https://developer.mozilla.org/en-US/docs/Web/API/Location)
接口包含当前 URL 信息。（浏览器地址栏显示的 URL 是一个字符串，而`window.location`是一个对象，两者包含相同的信息，
只是编码不同）。

因此，我们要实现一个 React 路由的路径是：`URL => React (URL) State => View`，即 URL 更新导致 React State
更新，然后 View 更新。具体步骤如下：

1. URL 需要实现三个功能
    * 获取当前 URL 的状态
    * URL 的更新
    * 发送更新通知
2. URL 发送更新通知后，获取当前 URL 的状态，并通过 React 实例的`setState`方法来更新 React State;
3. 根据当前的 React State 以及路由映射关系配置来决定视图（View）的显示，React 当中视图就是不同的 React 组件。

## 简单 React 路由实现

下面来根据上面的步骤实现一个简单的 React 路由。

### URL 功能模块

浏览器提供了`window.history`接口用来控制 URL，而`react-router`组件也是用一个称为`history`的模块来实现 URL 模块的功能，因此我们这里就以`tinyHistory`命名。

**tiny-react-router/js/tiny-history.js**

```js
/**
 * 获取当前 URL，此处只考虑 pathname，先不考虑 search，hash 等信息
 */
function getLocation() {
  let pathname =  window.location.pathname;
  if (pathname === '') pathname = '/';
  return { pathname };
}

/**
 * 更新 URL，并通知更新
 */
function push(path, callback) {
  window.history.pushState(null, null, path);
  if (callback) callback();
}

window.tinyHistory = {
  getLocation,
  push,
};
```

可以看到上面使用了回调方式来发送通知更新，现在先不管其他的观察者模式或发布订阅模式实现。

### React Router 组件

**tiny-react-router/js/tiny-react-router.js**

```js
const React = window.React;

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 获取初始 URL 信息
      location: props.history.getLocation(),
    };
  }

  changeLocation = () => {
    // 更新 React State
    this.setState({ location: this.props.history.getLocation() });
  }

  render() {
    // routerMap 为 URL => View 映射关系配置
    const { routerMap } = this.props;
    const currentComponent = routerMap[location.pathname] || null;

    return React.createElement(currentComponent, {
      history: this.props.history,
      location: this.state.location,
      changeLocation: this.changeLocation,
    });
  }
}

window.tinyReactRouter = { Router };
```

至此，一个简单的 React Router 组件已经实现。

## 应用示例

现在，我们构建一个简单的应用示例。

### 浏览器端

**projectRoot/index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>A Tiny React Router</title>
</head>
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
  <script type="text/babel" src="js/tiny-history.js"></script>
  <script type="text/babel" src="js/tiny-react-router.js"></script>
  <script type="text/babel" src="js/app.js"></script>
</body>
</html>
```

**projectRoot/js/app.js**

```js
const React = window.React;
const ReactDOM = window.ReactDOM;
const tinyHistory = window.tinyHistory;
const { Router } = window.tinyReactRouter;

// 首页

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.linkRef = React.createRef();
    console.log('home page location', props.location);
  }

  handleClick = (e) => {
    e.preventDefault();
    // 更新 URL
    this.props.history.push(
      this.linkRef.current.getAttribute('href'),
      this.props.changeLocation(),
    );
  }

  render() {
    return (
      <div>
        <h1>Home page</h1>
        <p>
          <a ref={this.linkRef} href="/about" onClick={this.handleClick}>About</a>
        </p>
      </div>
    );
  }
}

// 关于页

class About extends React.Component {
  constructor(props) {
    super(props);
    console.log('about page location', props.location);
  }

  handleClick = () => {
    // 更新 URL
    this.props.history.push('/', this.props.changeLocation());
  }

  render() {
    return (
      <div>
        <h1>About page</h1>
        <p>
          <button onClick={this.handleClick}>Return home</button>
        </p>
      </div>
    );
  }
}

// URL => View 映射关系配置
const routerMap = {
  '/': Home,
  '/about': About,
};

class App extends React.Component {
  render() {
    return (
      <Router
        history={tinyHistory}
        routerMap={routerMap}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### 服务端

我们的路由使用 History Api，因此需要所有页面请求 URL 都返回首页。我们通过 express 实现服务端。

**projectRoot/server.js**

```js
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

app.use('/js', express.static('js'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./index.html'), err => {
    if (err) {
      next(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
```

**一个完成的实现及实例可以查看 [alex1990/tiny-react-router](https://github.com/Alex1990/tiny-react-router/tree/tiny)**。

## 功能迭代

上面我们仅仅是路由的概念实现，不能应用于实际的代码，还有很多不足

* 代码实现不精简
* 不易用
* search、hash、state 等不支持
* 没有考虑浏览器前进与后退按钮
* 浏览器兼容性
* React 版本兼容性
* 嵌套路由
* 服务端渲染
* 测试
* 等等

当然，我们这里也不打算一一实现上面的所有功能，那样就是另一个 react-router 了。我们在上面的核心实现上面进行以下迭代：

### URL 发送更新通知改善

上面的实现当中，每次更新 URL 时，都需要手动传入一个`this.props.changeLocation`回调，代码冗余，不易用。我们可以通过观察者模式来实现发送更新通知功能（通过发布订阅模式，或者说自定义事件，也可以实现）。

传统的设计模式是针对面向对象方式的，方法的调用都是作为对象的成员的来调用，
代码稍显冗余，我们可以直接把一个函数作为观察者，更新时直接调用，而非间接调用观察者的`update`之类的方法。代码实现可以查看 [alex1990/tiny-react-router observer 分支](https://github.com/Alex1990/tiny-react-router/compare/tiny...observer)。
或许，有些人第一次就会写出类似的实现，但脑子里面从来都没有想过观察者模式，实际上我就是这样的人。我见过类似的代码，然后就记住了，会很自然而然地实现。

### 更多 URL 更新来源

我们的路由还不能正确地响应浏览器的前进与后退按钮，在点击浏览器前进或后退按钮时，
会在`window`上面触发 [popstate](https://developer.mozilla.org/en-US/docs/Web/Events/popstate) 事件，我们可以监听该事件，然后该事件触发时,
发送 URL 更新通知。代码实现可以查看 [alex1990/tiny-react-router popstate 分支](https://github.com/Alex1990/tiny-react-router/compare/observer...popstate)。

### 路由组件组合（Composition）

现在我们的路由映射关系是通过一个 JS 对象来配置的，我们可以更符合 React 的写法，
使用声明式的`<Route>`组件来书写。另外，react-router 从 4.x 版本开始，
`<Route>`组件可以写在`<Router>`下面的任一组件当中，也即"Route as a component"，
从而像其他 React 组件一样组合。该功能是基于 [React Context](https://reactjs.org/docs/context.html) 来实现的，代码实现可以查看
[alex1990/tiny-react-router composition 分支](https://github.com/Alex1990/tiny-react-router/compare/popstate...composition)。

### 参考

* [react-router](https://github.com/ReactTraining/react-router)
* [history](https://github.com/ReactTraining/history/blob/master/modules/createBrowserHistory.js)
