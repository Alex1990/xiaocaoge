---
title: "日志管理"
cover: ""
date: "2021-09-07"
category: "软件工程"
tags:
  - 日志
  - Syslog
  - 调试
---

对于大型、复杂的软件系统来说，日志是必备的，日志可以用来记录系统随时间运行的事件信息，这些信息有助于调试、优化性能、发现安全隐患、日志审计等。本文只是简单记录一些入门知识。

## 日志管理包括哪些内容？

* **日志收集**
* **日志聚合**
* **日志存储**
* **日志分析**
* **日志搜索**
* **日志报告**

## Syslog 协议

Syslog 协议是伴随 Unix 系统发展起来的日志标准，主要包括：

* **层次架构（Layered Architecture）**：日志内容、日志应用层、日志传输层，层次架构便于解耦与各层独立扩展。
* **传输层协议（Transport Layer Protocol）**：并没有规定传输层协议，但是有其他要求，日志传输过程不能修改内容（压缩、加密除外）。另外，必须（MUST）支持 TLS 传输，应该（SHOULD）支持 UDP 传输，推荐使用基于 TLS 的传输。
* **消息格式（Message Format）**：包括头部（header）与结构数据（structured data），头部包括优先级、版本号、主机名、进程 ID、消息 ID、时间戳等信息。
* **消息长度（Message Length）**：最短 480 octets，应该（SHOULD） 2048 octets。
* **Facility 和 Severity**：整个计算机系统不同的子系统使用特定的 Facility，消息的严重性分为 0-7 共 8 个级别。

**Facilities**

| Numerical Code | Facility |
| --------------- | ------- |
| 0             | kernel messages |
| 1             | user-level messages |
| 2             | mail system |
| 3             | system daemons |
| 4             | security/authorization messages |
| 5             | messages generated internally by syslogd |
| 6             | line printer subsystem |
| 7             | network news subsystem |
| 8             | UUCP subsystem |
| 9             | clock daemon |
| 10             | security/authorization messages |
| 11             | FTP daemon |
| 12             | NTP subsystem |
| 13             | log audit |
| 14             | log alert |
| 15             | clock daemon (note 2) |
| 16             | local use 0  (local0) |
| 17             | local use 1  (local1) |
| 18             | local use 2  (local2) |
| 19             | local use 3  (local3) |
| 20             | local use 4  (local4) |
| 21             | local use 5  (local5) |
| 22             | local use 6  (local6) |
| 23             | local use 7  (local7) |

**Severities**

| Numerical Code | Severity |
| -------------- | -------- |
|    0           | Emergency: system is unusable |
|    1           | Alert: action must be taken immediately |
|    2           | Critical: critical conditions |
|    3           | Error: error conditions |
|    4           | Warning: warning conditions |
|    5           | Notice: normal but significant condition |
|    6           | Informational: informational messages |
|    7           | Debug: debug-level messages |

## 操作系统日志

不同的操作系统有自己日志管理工具和日志服务，不同操作系统的日志文件位置：

**Linux 或 macOS**

通常位于`/var/log`目录内，当然是可以配置的。

> **小技巧**：通过`man -k syslog`可以搜索和 syslog 相关的命令。

**Windows**

通常位于`%SystemRoot%\Windows32\Config`目录内，可以通过注册表配置。

## 日志工具或服务

现在有很多开源的日志工具或商业服务。

* **日志模块/包**：主流语言都有包，比如 Node.js 的 [winston](https://github.com/winstonjs/winston)、Java 的 [Log4j](https://logging.apache.org/log4j/2.x/)，当然 Log4j 也有其他语言实现。
* **日志收集与分析**：
  * [Logstash](https://github.com/elastic/logstash)
  * [Grafana loki](https://github.com/grafana/loki)
  * [Apache Kafka](https://kafka.apache.org/)
  * [loggly](https://www.loggly.com/)
  * [DataDog](https://www.datadoghq.com/)
  * 各种综合云计算厂商：AWS、谷歌、微软、阿里云、腾讯等都有相关服务

### 相似服务

* 数据统计：比如谷歌统计、百度、神策
* 性能统计：比如前端性能统计
* 错误统计：比如 Sentry
* 监控：比如 Grafana 及其他各种运维监控系统

**这些服务的架构和技术栈很类似**。

## 参考

* [Log management wiki](https://en.wikipedia.org/wiki/Log_management)
* [Syslog wiki](https://en.wikipedia.org/wiki/Syslog)
* [Syslog rfc](https://datatracker.ietf.org/doc/html/rfc5424)
* [How to move Event Viewer log files to another location](https://docs.microsoft.com/en-us/troubleshoot/windows-server/application-management/move-event-viewer-log-files)