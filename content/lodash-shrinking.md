---
title: "更小体积的 Lodash"
cover: ""
date: "2017-03-11"
category: "前端"
tags:
  - Lodash
  - Babel
  - Webpack
---

## 前言

大约一两年前，浏览器端使用 Lodash 还是 Underscore，我还是认为 Underscore 有些自己的优势的：前端大都熟悉、体积小。但是随着自己做的前端应用越来越复杂，随便一个 UI 库，甚至一个复杂的组件，如表格、曲线图，其大小都比 Lodash 还要大，所有 JS 压缩加 gzip 之后大小几百 KB，甚至超过 1M。而且随着 Lodash 这的快速发展，越来越丰富而实用的方法，用着是越来顺手了。

但是，真正常用的 Lodash 方法实际上只占所有方法的一小部分，所以还是会想着怎么才能只打包自己用到的方法。

当然，也有多种方法可以做到的，比如使用[自定义构建](https://lodash.com/custom-builds)、直接引入具体方法（`import map from 'lodash/map'`）。但是这些方法都有各自的缺点：

- **自定义构建**：假如用到一开始自定义构建没有的方法，则需要修改自定义配置。且做到方法级别的按需打包依赖，一来繁琐，二来团队成员还得查看到底配置了哪些方法，不能随心所欲地用。另外，[Lodash v5.0.0](https://github.com/lodash/lodash/wiki/Roadmap) 将要放弃自定义构建工具 lodash-cli 的维护。
- **直接引入具体方法**：虽然这个可以避免上面的方法的缺点，但是使用起来变得繁琐了，不能直接使用`_`。

## 正篇

说了这么多，进入正篇环节。

就是通过 [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash) 和 [lodash-webpack-plugin](https://www.npmjs.com/package/lodash-webpack-plugin) 两个插件来实现。看插件源码记录，原来早就有了，只是我现在才知道。

### babel-plugin-lodash

用于实现方法级别的按需打包，官方称为 cherry-picked builds，就是下面的效果：

源代码：

```
import _ from 'lodash';
import { add } from 'lodash/fp';

const addOne = add(1);
_.map([1, 2, 3], addOne);
```

打包后：

```js
import _add from 'lodash/fp/add';
import _map from 'lodash/map';

const addOne = _add(1);
_map([1, 2, 3], addOne);
```

关于配置可以参考 babel-plugin-lodash 的文档，只是需要注意该插件的限制：

- 只支持 ES2015 imports 也就是 ES6 modules 方式引入 Lodash
- Babel < 6，Node.js < 4 都不支持
- 链式写法也不支持

### lodash-webpack-plugin

这个插件的功能就是把 Feature sets 使用 [noop](https://lodash.com/docs#noop)、[identity](https://lodash.com/docs#identity) 或者其他形式替代了。

具体使用以及 Feature Sets 可查看插件官方文档。

## 示例配置

下面是一个简单的结合两个插件的配置示例，来对比一下效果。

**entry.js**

```js
import _ from 'lodash';

const users = [
  {
    name: {
      first: 'Alex',
      last: 'Chao',
    },
    age: 27,
    address: {
      province: 'Beijing',
      city: 'Beijing',
      county: 'Haidian',
    },
  },
];

_.sortBy(users, 'age');

const beijingUsers = _.filter(users, ({ address: { province }}) => province === 'Beijing');
console.log(beijingUsers);

const fullNames = _.map(users, ({ name: { first, last }}) => {
  return `${first} ${last}`;
});
console.log(fullNames);

console.log(_.get(users, '0.name.first', ''));
```

**webpack.config.babel.js**

```js
import webpack from 'webpack';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

const NODE_ENV = process.env.NODE_ENV;

const plugins = [];

if (NODE_ENV === 'production') {
  plugins.push(new LodashModuleReplacementPlugin);
}

const config = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: NODE_ENV === 'production' ? ['lodash'] : [],
          presets: ['es2015'],
        },
      }
    ],
  },
  plugins,
};

module.exports = config;
```

**npm scripts**

```json
{
  // ...
  "scripts": {
    "build-all": "rimraf bundle* && npm run build && npm run build-shrinking",
    "build": "npm run bundle && npm run uglify && npm run uglify-gzip",
    "build-shrinking": "npm run bundle-shrinking && npm run uglify-shrinking && npm run uglify-gzip-shrinking",
    "bundle": "webpack entry.js bundle.js",
    "bundle-shrinking": "NODE_ENV=production webpack entry.js bundle-shrinking.js",
    "uglify": "uglifyjs bundle.js --compress=warnings=false --mangle --output bundle.min.js",
    "uglify-shrinking": "uglifyjs bundle-shrinking.js --compress=warnings=false --mangle --output bundle-shrinking.min.js",
    "uglify-gzip": "gzip --keep bundle.min.js",
    "uglify-gzip-shrinking": "gzip --keep bundle-shrinking.min.js",
    "clean": "rimraf bundle*",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
}
```

运行`npm run build-all`之后，查看 bundle 文件大小`ll -h bundle*`如下：

```txt
-rw-r--r--  1 chaoalex  staff    19K Mar 11 23:13 bundle-shrinking.js
-rw-r--r--  1 chaoalex  staff   3.6K Mar 11 23:13 bundle-shrinking.min.js
-rw-r--r--  1 chaoalex  staff   1.3K Mar 11 23:13 bundle-shrinking.min.js.gz
-rw-r--r--  1 chaoalex  staff   532K Mar 11 23:13 bundle.js
-rw-r--r--  1 chaoalex  staff    71K Mar 11 23:13 bundle.min.js
-rw-r--r--  1 chaoalex  staff    25K Mar 11 23:13 bundle.min.js.gz
```

从上面可以看到使用插件，并且经过 UglifyJS + gzip 之后，大小差了 20 多 KB，当然随着使用的 Lodash 方法增多，这个值会变小，不过实际项目中很少能用到超过一半的方法，所以效果还是很明显的。

完整的示例代码请查看 [lodash-shrinking-demo](https://github.com/Alex1990/lodash-shrinking-demo)。

### 链式写法与`_.flow()`

babel-plugin-lodash 不支持使用`_.chain()`方法形式的链式写法，但是利用`_.flow()`方法可以实现相同效果：

```js
import _ from 'lodash';
import sortBy from 'lodash/fp/sortBy';
import map from 'lodash/fp/map';

const data = [
  {
    name: 'A',
    level: 0,
  },
  {
    name: 'B',
    level: 2,
  },
  {
    name: 'C',
    level: 1,
  },
];

const getNames = _.flow([
  sortBy(v => v.level),
  map(v => v.name)
]);
const names = getNames(data);
```
