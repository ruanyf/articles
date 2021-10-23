## KubeSphere 介绍

过去十年，软件开发的最大变化是什么？

答案大概就是 Docker 容器的出现。以前的软件都部署在物理机或虚拟机，现在部署在一个个容器，可以快速扩缩容。

![](https://cdn.beekka.com/blogimg/asset/202109/bg2021092101.jpg)

你可能听说过 K8s，它是谷歌公司的开源软件 Kubernetes（K 和 s 之间有8个字母），作用就是调度和管理容器。

Docker 的标志非常像一艘集装箱船，K8s 则像是一个控制轮船的舵盘，这就是两者的关系。想象一下，成百上千个 Docker 容器分布在不同的公有云、私有云以及边缘节点，整合成一个云原生应用，在同一个平台进行统一调度和运维，这就是 K8s 的作用。

![](https://cdn.beekka.com/blogimg/asset/202110/bg2021102301.webp)

K8s 的最大问题就是太复杂，云生态技术栈和工具集十分庞大，它的开发、管理和运维都是专门工种。个人和中小企业如果缺少这方面的专家，是不容易搞定的。

为了解决这个问题，业界有很多基于 K8s 的发行版。它们把 K8s 作为内核，在外层封装一个易用的交互界面，集成了很多周边工具，大大降低了上手门槛，就好像 Ubuntu 和 Linux 内核的关系。

![](https://cdn.beekka.com/blogimg/asset/202110/bg2021102302.webp)

本周向大家介绍一个开源的国产 K8s 管理平台：[KubeSphere](https://github.com/kubesphere/kubesphere)。

它的最大特点就是易用和高度产品化，有一个体验非常优秀的控制台，让不熟悉容器的用户以非常低的成本上手，快速使用各种高级功能。整个操作过程都是向导式图形化的 UI。

下面是一段 2 分钟的演示视频，大家可以感受一下 KubeSphere 容器平台丰富的功能，以及通过 KubeSphere 操作 K8s 的简单便捷。

<iframe frameborder="0"
src="https://v.qq.com/txp/iframe/player.html?vid=h3303juxyex"
allowFullScreen="true" width="600" height="400"></iframe>

在定位上，KubeSphere 针对企业级应用设计，注重安全性和稳定性，提供秒级监控与告警通知，内置日志、审计、事件检索，还提供计量计费，可实现 K8s 基础设施的可度量运营。它还提供多集群和多云管理，帮助企业实现业务高可用，做到自动化运维。

它也充分考虑了国情，兼容各种既有的企业 IT 管理流程，可平滑整合到现有 IT 体系，让企业不用改原来的代码，就能把应用直接部署到容器平台。

![](https://cdn.beekka.com/blogimg/asset/202110/bg2021102304.webp)

对于软件开发者和运维人员，KubeSphere 内置了 Java、Nodejs 等常用语言模板，集成了常见的开源项目，提供了 DevOps、微服务灰度发布、链路追踪、应用生命周期管理、边缘节点管理等功能，实现了代码提交、应用发布、应用运维的一站式管理。你只需提交代码，后面的流程 KubeSphere 都会自动帮你搞定。

在安装上，KubeSphere 可以快速[从零搭建 K8s 集群](https://github.com/kubesphere/kubekey#quick-start)，也可以只用两条命令，就部署到现有的 K8s 之上。

目前，KubeSphere 的主仓库在 [GitHub](https://github.com/kubesphere/kubesphere) 已经有 7000 多个 Star，社区有超过 250 位贡献者，全球下载超过 70w 次，近一半以上的用户来自海外，国内用户有新浪、微众银行、中通、中国银行等著名企业。这里有一篇来自问答社区 SegmentFault 的[用户使用经验分享](https://mp.weixin.qq.com/s/NiatJMfRBvNrcvd2f0TwMg)，大家可以参考。

![](https://cdn.beekka.com/blogimg/asset/202110/bg2021102303.webp)

如果你们公司想尝试 K8s，或者你个人想学习 K8s，建议可以从 KubeSphere 入手。官方有[线上 Demo](https://demo.kubesphere.io/login)（账号：demo1 / Demo123），以及友好的[中文文档](https://kubesphere.com.cn/docs/)、[云原生视频教程](https://www.bilibili.com/video/BV15g411F7pj) 和[开发者社区](https://kubesphere.com.cn/forum/)。

