---
title: "JavaScript 异步模式"
cover: ""
date: "2019-01-17"
category: "Javascript"
tags:
  - "异步"
  - "Asynchronous"
  - "Callback"
  - "Promise"
  - "Generator"
  - "async"
  - "await"
---

无论是开发前端应用还是 Node 应用，都会涉及到很多异步操作，常见的异步操作有：

* 网络操作：Ajax、fetch、Node HTTP 请求、WebSocket、TCP/UDP 等
* 文件操作：读取、写入等
* Timers：setTimeout、setInterval、setImmediate
* process.nextTick
* 等等

JavaScript 处理异步操作的语法也在逐步发展，从最初的**回调（Callbacks）**到**Promise**，再到**生成器（Generators）**，最后到**异步函数（async functions）**。

先不考虑不同的写法，从更抽象层次分析一下异步操作。

* **任务**：每个异步操作都是在执行一个异步任务。
* **状态**：异步任务涉及到一些状态：**未执行**、**执行中**、**执行成功**、**执行失败**，其中**执行成功**和**执行失败**都是**执行完成**状态。可能还涉及到**执行进度信息**，异步操作可以处于**暂停**状态，也可以处于**被取消**状态。
* **常见异步任务流程**
  + 执行一个异步任务，执行完成之后，使用其处理后的数据执行其他任务，或执行失败之后，使用其错误信息执行其他任务
  + 按顺序执行一组任务，前一个任务完成之后执行下一个任务，如果有任何一个任务报错，在中止执行后面的任务
  + 并发执行一组任务，所有任务执行完成之后执行其他任务
  + 并发执行一组任务，有任何一个任务完成，则执行其他任务
  + 并发执行一组任务，所有任务执行完成之后执行其他任务，但是限制同时执行的任务数量上限
  + 取消执行
  + 暂停执行
  + 恢复执行
  + 获取任务执行进度信息

## 常见异步任务示例

下面使用不同的语法来完成常见异步任务

### 执行一个异步任务，执行完成之后，使用其处理后的数据执行其他任务，或执行失败之后，使用其错误信息执行其他任务

**回调**

```js
const fs = require('fs');

fs.readFile('./data/item.json', (err, data) => {
  if (err) {
    throw err;
  } else {
    console.log(data.toString('utf8'));
  }
});
```

Node.js 使用 [CPS](https://en.wikipedia.org/wiki/Continuation-passing_style) 风格回调，回调的第一个参数为异常信息，之后的参数为返回值。

**Promise**

```js
const fs = require('fs');

// 从 Node v10.0.0 开始支持
// v10.0.0 之前版本可以使用 util.promisify() 或方法来将回调接口转换成 Promise 接口
const filehandle = fs.promises;

filehandle.readFile('./data/item.json')
  .then(data => {
    console.log(data.toString('utf8'));
  })
  .catch(err => {
    console.log(err);
  });
```

Promise 使用`catch`来捕获异常。

**生成器**

```js
const fs = require('fs');
const filehandle = fs.promises;

function readFile(file) {
  return filehandle.readFile(file);
}

function runGen(genFn) {
  const iterator = genFn();
  return new Promise((resolve, reject) => {
    const parse = (result) => {
      const item = iterator.next(result);
      if (item.done) {
        resolve(result);
      } else {
        Promise.resolve(item.value).then(parse, reject);
      }
    };
    parse();
  });
}

runGen(function* gen() {
  try {
    const data = yield readFile('./data/item.json');
    console.log(data.toString('utf8'));
  } catch (err) {
    console.log(err);
  }
});
```

单纯使用 Generator 来写异步代码并不友好，类似于上面基于 Promise 的`runGen`辅助函数可以让写法更类似于我们写同步代码一样。这里的`runGen`只是示例性质，实际上可以使用 [co](https://github.com/tj/co)，co 也支持更多功能，具体使用可以查看文档。

**异步函数**

```js
const fs = require('fs');
const filehandle = fs.promises;

(async function () {
  try {
    const data = await filehandle.readFile('./data/item.json')
    console.log(data.toString('utf8'));
  } catch (err) {
    console.log(err);
  }
})();
```

异步函数也是基于 Promise，就像我们写同步代码一样，可以直接使用`try...catch`捕获异常。可以发现异步函数写法与上面的生成器写法很类似，可以认为异步函数是上面生成器写法的语法糖。

### 按顺序执行一组任务，前一个任务完成之后执行下一个任务，如果有任何一个任务报错，在中止执行后面的任务

假设`./data/item.json`文件内容如下：

```json
{
  "count": 1
}
```

现在我们首先检查`./data/item.json`是否可以读取；然后，读取文件内容；然后增加`count`值，并写入到`./data/item.json`文件。

**回调**

```js
const fs = require('fs');

function increment(file, callback) {
  fs.access(file, (err) => {
    if (err) {
      callback(err);
    } else {
      fs.readFile(file, 'utf8', (err1, data) => {
        if (err1) {
          callback(err1);
        } else {
          try {
            const json = JSON.parse(data);
            json.count++;
            fs.writeFile(file, JSON.stringify(json), callback);
          } catch (err2) {
            callback(err2);
          }
        }
      });
    }
  });
}

increment('./data/item.json', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('incremented');
  }
});
```

上面是比较直观的写法，但是存在**回调地狱（callback hell）**问题，层层嵌套回调不利于理解代码逻辑，另外回调第一个参数变量命名也是问题。当然可以通过 Promise、生成器或异步函数来解决。不过即使只使用回调方法也是可以避免回调地狱的，比如使用 [Async](http://caolan.github.io/async/index.html) 函数库当中的`series`或`waterfall`方法，这里使用 [waterfall](http://caolan.github.io/async/docs.html#waterfall) 方法。

```js
const fs = require('fs');
const waterfall = require('async/waterfall');

function increment(file, callback) {
  waterfall([
    (cb) => {
      fs.access(file, cb);
    },
    (cb) => {
      fs.readFile(file, 'utf8', cb);
    },
    (data, cb) => {
      try {
        const json = JSON.parse(data);
        json.count++;
        fs.writeFile(file, JSON.stringify(json), cb);
      } catch (err) {
        cb(err);
      }
    }
  ], callback);
}

increment('./data/item.json', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('incremented');
  }
});
```

**Promise**

```js
const fs = require('fs');
const filehandle = fs.promises;

function increment(file) {
  return filehandle.access(file)
    .then(() => {
      return filehandle.readFile(file, 'utf8');
    })
    .then(data => {
      const json = JSON.parse(data);
      json.count++;
      return filehandle.writeFile(file, JSON.stringify(json));
    });
}

increment('./data/item.json')
  .then(() => {
    console.log('incremented');
  })
  .catch(err => {
    console.log(err);
  });
```

**生成器**

```js
const fs = require('fs');
const co = require('co');
const filehandle = fs.promises;

function increment(file) {
  return co(function* () {
    yield filehandle.access(file);
    const data = yield filehandle.readFile(file, 'utf8');
    const json = JSON.parse(data);
    json.count++;
    yield filehandle.writeFile(file, JSON.stringify(json));
  });
}

increment('./data/item.json')
  .then(() => {
    console.log('incremented');
  })
  .catch(err => {
    console.log(err);
  });
```

**异步函数**

```js
const fs = require('fs');
const filehandle = fs.promises;

async function increment(file) {
  await filehandle.access(file);
  const data = await filehandle.readFile(file, 'utf8');
  const json = JSON.parse(data);
  json.count++;
  await filehandle.writeFile(file, JSON.stringify(json));
}

increment('./data/item.json')
  .then(() => {
    console.log('incremented');
  })
  .catch(err => {
    console.log(err);
  });
```
### 并发执行一组任务，所有任务执行完成之后执行其他任务

假设`./data`目录下所有的 json 文件都是类似于之前`./data/item.json`数据结构，我们要读取所有的 json 文件，并使字段`count`增加 1。

**回调函数**

```js
const fs = require('fs');
const path = require('path');
const waterfall = require('async/waterfall');
const parallel = require('async/parallel');

waterfall([
  (callback) => {
    fs.readdir('./data', callback);
  },
  (files, callback) => {
    const jsonFiles = files.map(file => path.join('./data', file));
    const tasks = jsonFiles.map(jsonFile => {
      return (callback) => {
        // increment 为上一节回调函数当中定义的 increment 函数
        increment(jsonFile, callback);
      };
    });
    parallel(tasks, callback);

  }
], (err, results) => {
  if (err) {
    console.log(err);
  } else {
    console.log('incremented');
  }
});
```

**Promise**

```js
const fs = require('fs');
const path = require('path');
const filehandle = fs.promises;

filehandle.readdir('./data')
  .then(files => {
    const jsonFiles = files.map(file => path.join('./data', file));
    // increment 为上一节 Promise 当中定义的 increment 函数
    const tasks = jsonFiles.map(jsonFile => increment(jsonFile));
    return Promise.all(tasks);
  })
  .then(() => {
    console.log('incremented');
  })
  .catch(err => {
    console.log(err);
  });
```

**生成器**

```js
const fs = require('fs');
const path = require('path');
const co = require('co');
const filehandle = fs.promises;

co(function* () {
  const files = yield filehandle.readdir('./data');
  const jsonFiles = files.map(file => path.join('./data', file));
  // increment 为上一节生成器当中定义的 increment 函数
  const tasks = jsonFiles.map(jsonFile => increment(jsonFile));
  yield tasks;
}).then(() => {
  console.log('incremented');
}).catch(err => {
  console.log(err);
});
```

**异步函数**

```js
const fs = require('fs');
const path = require('path');
const co = require('co');
const filehandle = fs.promises;

(async function () {
  try {
    const files = await filehandle.readdir('./data');
    const jsonFiles = files.map(file => path.join('./data', file));
    // increment 为上一节异步函数当中定义的 increment 函数
    const tasks = jsonFiles.map(jsonFile => increment(jsonFile));
    await tasks;
    console.log('incremented');
  } catch (err) {
    console.log(err);
  }
})();
```
### 并发执行一组任务，有任何一个任务完成，则执行其他任务

假设`./data`目录下面有一组 json 文件，现在读取这些文件，只要有一个文件读取完成，就打印出该文件内容。

**回调函数**

```js
const fs = require('fs');
const path = require('path');
const waterfall = require('async/waterfall');
const race = require('async/race');

waterfall([
  (callback) => {
    fs.readdir('./data', callback);
  },
  (files, callback) => {
    const jsonFiles = files.map(file => path.join('./data', file));
    const tasks = jsonFiles.map(jsonFile => {
      return (cb) => {
        fs.readFile(jsonFile, 'utf8', cb);
      };
    });
    race(tasks, callback);
  }
], (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
```

**Promise**

```js
const fs = require('fs');
const path = require('path');
const filehandle = fs.promises;

filehandle.readdir('./data')
  .then(files => {
    const jsonFiles = files.map(file => path.join('./data', file));
    const tasks = jsonFiles.map(jsonFile => {
      return filehandle.readFile(jsonFile, 'utf8');
    });
    return Promise.race(tasks);
  })
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
```

**生成器**

```js
const fs = require('fs');
const path = require('path');
const co = require('co');
const filehandle = fs.promises;

co(function* () {
  const files = yield filehandle.readdir('./data')
  const jsonFiles = files.map(file => path.join('./data', file));
  const tasks = jsonFiles.map(jsonFile => {
    return filehandle.readFile(jsonFile, 'utf8');
  });
  return yield Promise.race(tasks);
})
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
```

**异步函数**

```js
const fs = require('fs');
const path = require('path');
const filehandle = fs.promises;

(async function () {
  const files = await filehandle.readdir('./data')
  const jsonFiles = files.map(file => path.join('./data', file));
  const tasks = jsonFiles.map(jsonFile => {
    return filehandle.readFile(jsonFile, 'utf8');
  });
  return await Promise.race(tasks);
})()
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
```

### 并发执行一组任务，所有任务执行完成之后执行其他任务，但是限制同时执行的任务数量上限

假设`./data`目录下有一组 json 文件，现在并发读取所有文件，读取完所有文件之后则该任务完成，但是限制同时读取的文件数量为 5。

如何实现同时执行任务数量上限？假定上限为 N，所有待执行任务位于一个队列 Q 当中，初始化执行时，从队列 Q 当中取出 N 个任务执行，当且只当一个任务完成之后从队列 Q 当中取出新的任务执行。下面是一种实现，其中`taskQueue`是一个数组，其元素均为一个函数，表示一个任务，函数返回一个 Promise 对象。

```js
function limit(taskQueue, number) {
  return new Promise((resolve, reject) => {
    const queueLength = taskQueue.length;
    const results = Array(queueLength).fill(null);
    let initNumber = Math.min(queueLength, number);
    let runningNumber = 0;
    let isResolved = false;
    let isRejected = false;

    function runNext() {
      runningNumber++;

      const id = queueLength - taskQueue.length;
      const task = taskQueue.shift();
      task()
        .then((...args) => {
          runningNumber--;
          results[id] = args;
          if (taskQueue.length > 0) {
            runNext();
          }
          if (runningNumber === 0 && !isResolved && !isRejected) {
            resolve(results);
            isResolved = true;
          }
        })
        .catch(err => {
          runningNumber--;
          if (runningNumber === 0 && !isResolved && !isRejected) {
            reject(err);
            isRejected = true;
          }
        });
    }
    while (initNumber--) {
      runNext();
    }
  });
}
```

**回调函数**

这里不使用上面的`limit`函数，而是使用 Async 的`parallelLimit`函数。

```js
const fs = require('fs');
const path = require('path');
const waterfall = require('async/waterfall');
const parallelLimit = require('async/parallelLimit');

waterfall([
  (callback) => {
    fs.readdir('./data', callback);
  },
  (files, callback) => {
    const jsonFiles = files.map(file => path.join('./data', file));
    const tasks = jsonFiles.map(jsonFile => cb => fs.readFile(jsonFile, 'utf8', cb));
    parallelLimit(tasks, 5, callback);
  },
], (err, results) => {
  if (err) {
    console.log(err);
  } else {
    console.log(results);
  }
});
```

**Promise**

```js
const fs = require('fs');
const path = require('path');
const filehandle = fs.promises;

filehandle.readdir('./data')
  .then(files => {
    const jsonFiles = files.map(file => path.join('./data', file));
    const tasks = jsonFiles.map(jsonFile => () => filehandle.readFile(jsonFile, 'utf8'));
    return limit(tasks, 5);
  })
  .then(results => {
    console.log(results);
  })
  .catch(err => {
    console.log(err);
  });
```

**生成器**

```js
const fs = require('fs');
const path = require('path');
const co = require('co');
const filehandle = fs.promises;

co(function* () {
  const files = yield filehandle.readdir('./data');
  const jsonFiles = files.map(file => path.join('./data', file));
  const tasks = jsonFiles.map(jsonFile => () => filehandle.readFile(jsonFile, 'utf8'));
  return yield limit(tasks, 5);
})
  .then(results => {
    console.log(results);
  })
  .catch(err => {
    console.log(err);
  });
```

**异步函数**

```js
const fs = require('fs');
const path = require('path');
const filehandle = fs.promises;

(async function () {
  const files = await filehandle.readdir('./data');
  const jsonFiles = files.map(file => path.join('./data', file));
  const tasks = jsonFiles.map(jsonFile => () => filehandle.readFile(jsonFile, 'utf8'));
  return await limit(tasks, 5);
})()
  .then(results => {
    console.log(results);
  })
  .catch(err => {
    console.log(err);
  });
```

Todo: 取消执行、暂停执行、恢复执行、获取执行进度信息

## 相关连接

* [async](http://caolan.github.io/async/index.html)
* [bluebird](http://bluebirdjs.com/docs/getting-started.html)
* [co](https://github.com/tj/co)
* [Async functions - making promises friendly](https://developers.google.com/web/fundamentals/primers/async-functions)
* [Understanding JavaScript’s async await](https://ponyfoo.com/articles/understanding-javascript-async-await)
