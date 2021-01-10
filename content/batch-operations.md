---
title: "批量功能设计"
cover: ""
date: "2017-02-08"
category: "前端"
tags:
  - 批量
  - 批量操作
  - API
  - UI
---

**批量功能**：这里指需要对全部数据当中的一组数据进行查询、选择、修改、删除等操作的功能，也包括添加一组数据，即批量添加，这些操作统称**批量操作**。批量操作在软件系统当中应用很普遍，比如删除一组文件、删除符合特定条件的邮件、删除购物车里面选择的商品等等。而批量操作在后台管理系统当中尤其常见，比如博客管理后台、电商网站商家管理后台。

下面以**用户管理**功能为例，从两个方面谈下批量功能设计。

- HTTP API 设计
- 界面交互设计

## HTTP API 设计

一个典型的非批量操作 RESTful API 设计如下：

```sh
# 获取用户列表
GET /api/v1/users

# 获取单个用户信息
GET /api/v1/users/:id

# 创建一个用户
POST /api/v1/users

# 更新一个用户信息
PATCH /api/v1/users/:id

# 替换一个用户信息
PUT /api/v1/users/:id

# 删除一个用户
DELETE /api/v1/users/:id
```

然后分别实现对应的批量操作 API。

### 批量创建用户

这个与创建单个用户一样，不同的是发送的数据是一组数据，比如 JSON 数组。

```
POST /api/v1/users
```

### 获取多个指定用户信息

比如根据用户ID来查询，假如只有几个或几十个，那把要查询的用户ID放到查询字符串里面到也没有技术上的问题。

```
GET /api/v1/users?ids=001,002,003
```

但是如果 ID 数比较多或者 ID 比较长时，URL 长度会太长，然后浏览器或者服务器可能无法正常处理。这个时候简单直接，但是不符合 REST 规范的方式是使用 POST：

```
POST /api/v1/userlists
["001","002","003"]
```

如果要符合 REST 规范来实现，需要两个请求，一个是和上面一样：

```
POST /api/v1/userlists
["001","002","003"]
```

然后返回创建的资源`userlist`的 ID：

```
{
  "id": "0001"
}
```

然后利用该 ID 发送第二个请求：

```
GET /api/v1/userlists/0001
```

通常这些查询是临时性的，所以查过之后就可以从数据库删除了，或者说只用在内存中存一下。

### 更新多个用户信息

下面的方式不符合 REST 方式，如果要符合可以参考上面的 GET 实现方式，创建一个临时的`userlist`，只不过实现麻烦，过程复杂化了。

```
PATCH /api/v1/users
[
  {
    "id": "001",
    "name": "zhangsan"
  },
  {
    "id": "002",
    "name": "lisi"
  }
]

PUT /api/v1/users
[
  {
    "id": "001",
    "name": "zhangsan",
    "gender": "male",
    "birthday": "2012-1-1"
  },
  {
    "id": "002",
    "name": "lisi",
    "gender": "male",
    "birthday": "2013-11-2"
  }
]
```

### 删除多个用户信息

同样的，下面实现方式不符合 REST 方式。

```
DELETE /api/v1/users
["001","002"]
```

### 返回值

有时一次批量操作请求执行后，多个资源的操作结果不一样，这时返回的结果就要包含多个资源的操作结果。下面以同时创建多个用户为例：

发送创建请求：

```
POST /api/v1/users
[
  {
    "name": "user1",
  },
  {
    "name": "user2",
  }
]
```

其返回值是：

```json
{
  "success": false,
  "message": "",
  "data": [
    {
      "name": "user1",
      "success": false,
      "message": "用户已存在"
    },
    {
      "name": "user2",
      "success": true,
      "message": ""
    }
  ]
}
```

如果只关心失败的结果，返回结果可以只包含创建失败的信息。

### 其他注意事项

- **最多操作数据条数**：即使接口可以支持批量操作，也应该有个最大限制，同时用户输入端也要有限制，API 文档也应说明。
- **进度**：如果批量操作过程过长，比如几分钟，这时可以提供执行进度信息。
- **权限**：在涉及到重要价值的资源时，批量操作可能需要慎重执行，需要合理设计好执行人的权限。

## 界面交互设计

### 选择

**全选功能**几乎是必需的，通过点击复选框来选择时，可以适当考虑点击的范围，便于用户点选。除了点选，还有其他选择方式，比如拖动方式、键盘结合方式。桌面操作系统经常利用`Ctrl`和`Shift`键与鼠标结合操作，`Ctrl + 点击`增量选择一个，`Shift + 点击`选择连续的几个，不过键盘方式只适合高级用户使用，方式比较隐晦。

### 排序与搜索

有时数据比较多，又或者只是想加快选择的速度，这时候需要结合排序和搜索功能，快速缩减数据范围。

- **排序**

常见的一种展现多条数据的方式是列表，表格也可以看成是列表，在展现数据时，数据的默认排序很重要。既可以把用户关心的数据排到前面，也可以给出一种数据的规律，便于用户浏览。有时还需要用户可以选择排序方式和排序的数据列。

- **搜索**

简单的只是一个搜索框来搜索所有数据列。如果要实现更精确的搜索，就需要实现单独列以及列的组合搜索。正则搜索功能是否实现，要看用户的属性，对于程序员可能比较熟悉易用，但普通用户还是慎用。

### 文本框和文件

即使通过排序或搜索缩减了数据范围，可能仍然不能满足某些用户或特定场景的需求。比如我已经获取到了一组数据的 IDs，这些 IDs 就是我想删除的用户。当然可以通过直接操作数据库来快速完成，但是操作数据库只是临时方案，不能作为长久之计。这时候可以提供一个文本输入框来让用户粘贴数据或者通过上传一个文件方式来完成，毕竟我们让用户选择只是为了得到一组**输入**数据。

另外通过文本框或文件方式，也可以快速实现添加或更新大量数据。

### 其他注意事项

- **单条数据操作**：常见的一个误区是，很多产品有了批量操作功能之后，快捷的单条数据操作功能却没有，除非绝大部分操作肯定都是多条数据操作，否则应该提供一些单条数据操作功能。
- **批量操作结果**：正如前文 HTTP API 设计中提到的多条数据的操作结果可能不同，这个时候操作结果展现方式会和单条数据操作结果不同。