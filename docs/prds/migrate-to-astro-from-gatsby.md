# 从 Gatsby 迁移到 Astro

## 目标

- 保留现有内容与静态资源（content / data / static）
- 重构前端源码为 Astro（并保留 React 组件能力）
- 依赖整体升级到较新版本，简化构建与规范工具链
- 不做单元测试与端到端测试（以页面功能验收为准）

## 迁移计划

- Node 版本最低 22
- 使用 pnpm 包管理工具
- 使用 TypeScript 作为主要开发语言
- 使用 Astro + React，构建工具链使用 Vite（Astro 默认）
- 使用 Oxlint + Oxfmt 作为代码规范检测与格式化工具，替代 ESLint 和 Stylelint
- 第三方依赖升级到较新版本（以兼容 Node 22 为前提）

### 当前目录结构

以下数据和配置文件需要迁移，src源码需要重构为 Astro 框架的代码。

- content：Markdown 文章目录
- data：数据和配置目录
  - SiteConfig.js：站点配置文件
- static：静态资源目录
  - demo：前端 demo 目录
  - favicon：favicon 目录
  - images：图片目录
  - uploads：上传目录
  - CNAME：CNAME 文件
  - favicon.ico：favicon.ico 文件
  - google59cc8d3a14190429.html：Google Analytics 文件
  - robots.txt：robots.txt 文件
- src：前端代码目录
  - components：组件目录
  - layout：布局目录
  - pages：页面目录
  - templates：模板目录

## 迁移产物（建议目标结构）

- public：静态资源（从 static 迁移而来）
- src
  - pages：Astro 页面与路由
  - layouts：Astro Layout（可组合 React 组件）
  - components：通用组件（Astro / React）
  - content：内容集合（若采用 Astro Content Collections）
  - lib：工具函数与数据读取
- data：保留站点配置（后续可逐步迁到 src/lib）

## 目录映射（Gatsby → Astro）

- static/* → public/*
- src/pages/* → src/pages/*（文件路由，但需重写为 .astro / .tsx）
- src/components/* → src/components/*（可继续保留 React 组件）
- src/layout/* → src/layouts/*（Astro 更常用 layouts 命名）
- src/templates/* → 通常改为：
  - src/pages/[...slug].astro（动态路由 + 内容渲染）
  - 或 src/layouts + src/lib 渲染逻辑

## 迁移步骤（精简版）

### 1) 初始化 Astro 项目

- 使用 pnpm 初始化 Astro 项目并启用 TypeScript
- 增加 React 集成（用于复用原有 React 组件）
- 接入 Oxlint + Oxfmt，移除 ESLint / Stylelint（若已有）

### 2) 迁移静态资源

- 将 static 下的目录与文件整体迁到 public
- 检查引用路径：Astro 中 public 资源以 / 开头直接访问（例如 /images/a.png）

### 3) 迁移内容（Markdown）

- 将 content 迁移到 Astro 可访问的位置：
  - 方案 A：仍作为普通文件读取（自行解析 Frontmatter）
  - 方案 B：使用 Content Collections（推荐，约束更清晰）
- 梳理文章 Frontmatter 字段：标题、日期、slug、分类/标签、摘要、封面等

### 4) 站点配置迁移

- 保留 data/SiteConfig.js，新增一层适配（例如转为 TS 类型或统一导出）
- 统一 Astro/React 的配置读取方式，避免多处散落引用

### 5) 页面与路由重写

- 先完成核心页面：
  - 首页
  - 文章列表页
  - 文章详情页
  - 关于/项目等静态页
- 再补齐次要页面与边角逻辑（分页、标签页、分类页、搜索等）

### 6) SEO 与统计

- 确认 robots.txt、favicon、CNAME 等在 public 下生效
- Google Analytics 迁移到 Astro 的 layout/head 统一注入（避免每页重复）

## 验收清单

- 本地开发可运行（dev server 正常启动）
- 构建产物可产出（build 成功，静态资源路径正确）
- 关键页面可访问：首页 / 列表 / 详情 / 404
- Markdown 内容渲染正确（Frontmatter、代码高亮、图片链接）
- SEO 基础项生效（title/description、favicon、robots.txt、CNAME）
