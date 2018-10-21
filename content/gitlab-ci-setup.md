---
title: "Gitlab CI 搭建指引"
cover: ""
date: "2018-10-21"
category: "软件工程"
tags:
  - Gitlab
  - CI
  - CD
  - 构建
  - 部署
  - 自动化
---

如今，不少中小公司都采用开源的 Gitlab 来管理公司的源码了，但是并没有充分利用 Gitlab 提供的功能。比如 Gitlab CI，不少公司没有使用或者不是所有的开发者都了解并使用了，而且也没有使用其他的 CI/CD 平台。其构建和部署流程比较原始，比如前端代码，开发者首先需要在本地构建打包，然后推送到对应的源码仓库，这导致了开发者经常需要等待构建完成，而且源码仓库的体积越来越大。又比如，前端代码的部署流程，或者采用手动`git pull`代码方式，或者使用`cron`来定时执行`git pull`，前者需要登录到服务器手动执行，后者不断`git pull`造成很多资源浪费。另外，这些手动的方式也不能很好地与其他流程继承，不利于流程自动化。而采用易搭建的 Gitlab CI 可以解决这些问题，另外也可以提供一些其他的优势。

## Gitlab CI 流程图

![Gitlab CI 流程图](/images/gitlab-ci-setup/gitlab-ci-workflow.jpg)


## 优势

- 通过`commit`/`tag`等方式自动触发测试、构建或部署。
- 远程服务器执行测试与构建，节省本地计算资源。
- Gitlab 仓库不再管理打包后文件，避免仓库过大问题。
- 可以方便地进行代码规范检测、单元测试等，使代码更可靠。

## 风险控制

主要是部署的权限控制方面，通过分支管理可以避免：

- 假设`release`分支为生产版本，`test`为测试版本；
- 只有`git push`到`release`分支的才会触发部署到线上，且这个操作只能**指定人**来做，这个通过 Gitlab 的成员权限管理与`Protected branches`来完成；`test`分支每个人都可以进行`git push`；

## 搭建流程

- 登录远程服务器。
- 安装 [Docker](https://www.docker.com/)，根据服务器操作系统查看相应[安装文档](https://docs.docker.com/engine/installation/)，选择 Docker CE 版本，而非 Docker EE 版本。
- 选择 [Image](https://docs.docker.com/glossary/?term=image)，前端构建工具通常都是基于 Nodejs，所以选择[node image](https://store.docker.com/images/node)，版本目前可选择`6.10.3`。
- 安装 [gitlab-ci-multi-runner](https://gitlab.com/gitlab-org/gitlab-ci-multi-runner)，这个就是 Gitlab Runner。需要注意版本问题，通过公司 Gitlab 网站页面【左侧菜单】-【Help】可以查看到当前使用的 Gitlab 版本，而 Gitlab Runner >= 9.0 需要 Gitlab CE/EE 9.0，所以只能安装以前的版本。通过 [gitlab-ci-multi-runner tags](https://gitlab.com/gitlab-org/gitlab-ci-multi-runner/tags) 查看到当前 9.0 之前最新的版本（文档写时为`v1.11.4`），可以参考[相应安装文档](https://docs.gitlab.com/runner/install/)安装，也可以[下载现成的包](https://docs.gitlab.com/runner/install/bleeding-edge.html#download-any-other-tagged-release)，注意版本问题。
- Gitlab Runner 配置请查看[文档](https://docs.gitlab.com/runner/configuration/advanced-configuration.html)
- 注册项目，运行命令`gitlab-runner register`，根据提示填写相关信息，这些信息位于 Gitlab 项目的【设置菜单】-【Runners】页面。
- 运行`gitlab-runner run`启动，如果要开机启动可以查看 [service-related-commands](https://docs.gitlab.com/runner/commands/README.html#service-related-commands) 页面，或使用其他 service 管理工具，`gitlab-runner`命令文档请查看 [GitLab Runer Commands](https://docs.gitlab.com/runner/commands/README.html)。
- 项目配置，通过 [.gitlab-ci.yml](https://docs.gitlab.com/ee/ci/yaml/README.html) 文件配置 CI 要执行的任务等，其中`image`推荐配置成`image: node:6.10.3`，如果你清楚这个配置项，可自行选择，另外可以通过 [CI Lint](https://gitlab-wenba.xueba100.com:2443/ci/lint) 页面校验`.gitlab-ci.yml`文件。
- 有时需要建立构建环境（这里是 Docker 容器）与其他服务器的 SSH 认证，比如编译后代码`git push`到 Gitlab，又或者打包后文件复制到服务器上面，可以查看 [Using SSH keys](https://gitlab.com/help/ci/ssh_keys/README.md)，来进行配置。

## 部署

部署需求：

- 将文件部署到目标机器，目标机器列表可方便配置
- 回滚
- 操作日志

一种简单但是简陋的方案是通过`scp`或`rsync`复制到服务器，这种方式不能直接回滚。另外，目标机器列表不可以方便配置与更新。

目前已经有很多成熟的开源部署方案，比如 Puppet 或 Ansible（具体使用个人不了解）。可以通过 Gitlab CI 的 [artifacts](https://docs.gitlab.com/ee/user/project/pipelines/job_artifacts.html) 功能，将构建打包后的文件存储到 Gitlab，然后有了打包后文件的下载链接，则可以方便地与其他部署平台集成。而且代码的部署经常也是运维负责的，具体部署方案经常是运维选择的。另外，一些公司会自建部署平台，会集成流程审核，更规范一些。

## 相关链接

- [Docker Installation](https://docs.docker.com/engine/installation/)
- [Docker Store](https://store.docker.com/)
- [Gitlab CI Docs](https://docs.gitlab.com/ee/ci/)
- [Gitlab Runner Install](https://docs.gitlab.com/runner/install/index.html)
- [Gitlab Runner Configuration](https://docs.gitlab.com/runner/configuration/advanced-configuration.html)
- [.gitlab-ci.yml](https://docs.gitlab.com/ee/ci/yaml/README.html)
- [Gitlab Runner](https://docs.gitlab.com/ee/ci/runners/README.html)
- [Gitlab CI SSH Keys](https://gitlab.com/help/ci/ssh_keys/README.md)
- [Gitlab Runner Commands](https://docs.gitlab.com/runner/commands/README.html)
- [Gitlab Runner Executors](https://docs.gitlab.com/runner/executors/README.html)
- [Checking of Gitlab Version](https://stackoverflow.com/questions/21068773/checking-of-gitlab-version)
- [Gitlab SSH Docs](https://docs.gitlab.com/ee/ssh/README.html)
- [.gitlab-ci.yml 校验](https://gitlab-wenba.xueba100.com:2443/ci/lint)
- [Introduction to job artifacts](https://docs.gitlab.com/ee/user/project/pipelines/job_artifacts.html)
