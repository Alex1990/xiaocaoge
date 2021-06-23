---
title: "国际化与本地化"
cover: ""
date: "2021-06-23"
category: "软件"
tags:
  - 国际化
  - 本地化
  - i18n
  - l10n
---

未来的世界，人与人的连接一定更加紧密，无论通过物质世界，还是互联网的虚拟世界。而各地区的语言、度量衡、法律在可见的未来几乎不可能统一，所以面向全球的软件或网站都必须考虑国际化和本地化问题。当然，不止软件系统要考虑，生产全球化商品的公司也需要考虑，比如产品说明书、营销广告等。

> 本文主要指软件系统的国际化和本地化。

## 定义

* **国际化**：英文“internationalization”，简称“i18n”（根据单词长度），通常是指对软件系统的界面、算法、数据、服务架构等的改造过程，以便可以支持多种区域（locale）。
* **本地化**：英文“localization”，简称“L10n”（第一个字母大写为了方便区分），在支持国际化的软件系统基础上，针对某一个或多个区域做适应改造的过程。

## 区域 Locale

维基百科定义：

> In computing, a locale is a set of parameters that defines the user's language, region and any special variant preferences that the user wants to see in their user interface. Usually a locale identifier consists of at least a language code and a country/region code.

**翻译**：在计算机领域，区域（locale）是指一组参数，用于定义用户语言、地区和其他用户期望用户界面出现的偏好设置。通常**区域标识符（locale identifier）**至少由一个语言代号和国家/地区代号组成。

比如下面区域标识符示例：

* `zh-CN`：中文-中国大陆。
* `zh-Hans-CN`：中文-简体-中国大陆。
* `zh-Hant-CN`：中文-繁体-中国大陆。

## 涉及范围

软件系统的国际化和本地化根据目标和项目涉及范围不同，主要包括下面部分：

* **语言**：这是基本的，也是工作量占比比较大的部分。
* **排版**：不同语言字体、书写方向、单位空间信息密度都不相同。
* **文本编码**：得益于 Unicode 的普及，这个问题越来越少遇见了，否则不同语言可能有各自独立的文本编码格式。
* **日期与时间**：时区、显示格式、历法、节假日。
* **数字**：分隔符、读法。
* **货币**：货币符号，汇率。
* **电话或手机号码**：不同国家地区格式不同。
* **银行卡或信用卡**：不同银行格式不同。
* **邮编**：不同国家地区格式不同，不过现在比较少使用了。
* **度量单位**：比如美国温度常用华氏温度，长度使用英寸、英里等，而非国际单位。
* **法律**：各个国家和地区可能对于数据安全性和隐私性法律法规不同，比如欧盟对隐私的 GDPR 要求、中国大陆对于软件服务数据存放的要求、域名备案要求等。
* **文化**：信仰、保守与开放、颜色、意识形态等等都可能不同。

## 编程语言标准库

如今很多主流语言的标准库或第三方库都提供了对国际化和本地化的支持，比如：

* JavaScript：[Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
* PHP: [intl](https://www.php.net/manual/en/book.intl.php)
* C：[GNU gettext](https://www.gnu.org/software/gettext/)
* Go：[go-i18n](https://github.com/nicksnyder/go-i18n)

## 本地化服务 L10n Services

如今有很多协助软件系统本地化的服务，主要是翻译，比如：

* [crowdin](https://crowdin.com/)
* [phrase](https://phrase.com/)
* [lokalise](https://lokalise.com/)
* [transifex](https://www.transifex.com/)

不过这些都是国外的服务，不知为何国内没有相似公司，或者我不知道吧。

## 用户参与

如果只靠公司员工来进行本地化工作，则成本高昂、质量通常不高，而且本地化工作伴随整个产品开发周期。除非公司财大气粗，否则可以充分让用户参与。只需要简化本地化工作流程、写明本地化教程、开发好相应工具，然后引导有兴趣有能力的用户参与进来即可。

## 参考

* [Internationalization and localization](https://en.wikipedia.org/wiki/Internationalization_and_localization)
* [Localization vs. Internationalization](https://www.w3.org/International/questions/qa-i18n)
* [Localization and internationalization, what's the difference?](https://stackoverflow.com/questions/506743/localization-and-internationalization-whats-the-difference)
* [Locale](https://en.wikipedia.org/wiki/Locale_(computer_software))
* [Unicode CLDR](http://cldr.unicode.org/)