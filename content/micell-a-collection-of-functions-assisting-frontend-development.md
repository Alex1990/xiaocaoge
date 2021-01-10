---
title: "Micell - A collection of functions assisting frontend development"
cover: ""
date: "2021-01-10"
category: "JavaScript"
tags:
  - micell
  - utility
---

You maybe always need to write some utility or helper functions in your projects,
regardless of the size of the project. These functions are consist of many
categories. Some can be **shared across the projects**, such as:

* Cookie manipulation
* Parse or format the date
* Format the number
* Detect the type of browser
* Base64 conversion
* Common regular expressions
* And so on.

These are the functions we care about. These are the functions
[Micell](https://micell.org) cares about.

## So, what is Micell?

[Micell](https://micell.org/) (pronounced /maɪˈsel/, like my-cell) is a collection of functions which
is used with web development daily. Micell only includes the common functions
in the most projects. Also, for integrity, it will include some uncommon
functions.

### What is not Micell?

* It is not a replace to Lodash, Momentjs or Dayjs.
* It is not to include all utility functions in your application.

## Why Micell?

* **Shared in community**: You don't need to write the common utility functions
    repeatedly. Micell make reusing across all projects.
* **Typescript support**: Source code is written with TypeScript. And type
    declaration files is bundled in npm package.
* **High reliability**: Test in all modern browsers, even in IE 11. Up to 96%
    test coverage.
* **Import as need**: Use [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash) to import the used modules.

## Install

**Npm**

```shell
npm i --save micell
```

**Yarn**

```shell
yarn add micell
```

**CDN**

If you want to use micell with `<script>` directly, you can use
[jsDelivr](https://www.jsdelivr.com/package/npm/micell).

```html
<script src="https://cdn.jsdelivr.net/npm/micell"></script>
```

## Usage

```js
import micell from 'micell'

// Generate a random string
micell.randomString();

// Get a cookie value
micell.cookie.get('name')
```

More functions see the [Docs](https://micell.org/docs/).

> Tip: In the micell website, you can try micell in the console of browser which
> is exported as the global micell object.

## Conclusion

While micell has been intermittently developed for more than one year and
includes more than 100 functions, but there are many things you could contribute
to make. For example:

* Use it in your project
* Improve the document
* Make the Feedback of bug
* Request the new feature
* And many other things you think micell should do

All contributions are welcome.

* Official website: [https://micell.org](https://micell.org)
* Github repository: [micell](https://github.com/micell/micell)