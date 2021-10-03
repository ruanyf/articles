## KubeSphere

过去十年，软件开发的最大变化是什么？

答案大概就是 Docker 容器的出现。以前的软件都直接部署在物理机或虚拟机，现在部署在一个个容器，可以快速扩缩容。

![](https://cdn.beekka.com/blogimg/asset/202109/bg2021092101.jpg)

你可能听说过 K8s，它是谷歌公司的开源软件 Kubernetes（K 和 s 之间有8个字母），作用就是调度和管理容器。

Docker 的标志非常像一艘集装箱船，K8s 则像是一个控制轮船的舵盘，这说明了两者的关系。想象一下，成百上千个 Docker 容器分布在不同的公有云、私有云以及边缘节点，如何将它们整合成云原生应用，在一个平台进行统一调度和运维管理。这就是 K8s 的作用。

![](https://cdn.beekka.com/blogimg/asset/202109/bg2021092103.jpg)

K8s 的最大问题就是太复杂，它的开发、管理和运维都有多个专门的工种。个人和中小企业如果缺少这方面的专家，是不容易搞定的。

如果把 K8s 比作当年的 Linux 内核，为了解决 K8s 的“复杂难用”，业界有很多基于 K8s 的发行版。它们把 K8s 作为内核，好比 Ubuntu 和 Linux 内核的关系，面向用户和系统管理员提供了易用的交互界面，并集成了很多周边工具和应用，大大降低了 K8s 上手门槛。

![](https://cdn.beekka.com/blogimg/asset/202109/bg2021092104.jpg)

本周向大家介绍一个开源的国产 K8s 管理平台：[KubeSphere](https://github.com/kubesphere/kubesphere)。

它的最大特点就是易用，提供了一个用户体验非常优秀的控制台，让不熟悉容器的用户以非常低的成本上手，快速使用各种高级功能。整个操作过程都是向导式图形化的 UI。

![](https://cdn.beekka.com/blogimg/asset/202109/bg2021092312.jpg)

在定位上，KubeSphere 完全针对企业级应用设计，注重安全性和稳定性，提供秒级监控与告警通知，内置日志、审计和事件检索，还提供计量计费实现基础设施可运营，它通过强大的可视化能力，实现自动化运维。

它也充分考虑了国情，兼容各种既有的企业 IT 管理流程，可平滑整合到现有 IT 体系，让企业不用改原来的代码，就能把应用直接部署到容器平台。

![](https://cdn.beekka.com/blogimg/asset/202109/bg2021092311.jpg)

面向开发者和运维开发人员，提供 DevOps、微服务灰度发布与链路追踪、应用生命周期管理等功能，可以实现从代码提交、应用发布到应用运维的一站式端到端管理。

从 2018 年 4 月提交第一行代码开始，它就是一个开源产品，而且会一直保持开源。目前，主仓库在 [GitHub](https://github.com/kubesphere/kubesphere) 已经有 7000 多个 Star，超过 200 位贡献者，在全球被下载 70w 次，超过一半的用户来自海外，国内用户有新浪、微众银行、中通、中国银行等著名企业。这里有一篇来自国内问答社区 SegmentFault 用户的[使用经验分享](https://mp.weixin.qq.com/s/NiatJMfRBvNrcvd2f0TwMg)，大家可以参考。

![](https://cdn.beekka.com/blogimg/asset/202109/bg2021092313.jpg)

如果你们公司想尝试 K8s，或者你个人想学习 K8s，建议可以试试 KubeSphere，这里是 [Demo](https://demo.kubesphere.io/login)（账号：demo1 / Demo123）。它只需要一条命令[安装](https://kubesphere.com.cn/docs/quick-start/all-in-one-on-linux/)，也可以两条命令[安装在 K8s 之上](https://kubesphere.com.cn/docs/quick-start/minimal-kubesphere-on-k8s/)。同时，还有很友好的[中文文档](https://kubesphere.com.cn/docs/)、[完整的视频教程](https://www.bilibili.com/video/BV15g411F7pj) 和[开发者社区](https://kubesphere.com.cn/forum/) 。
