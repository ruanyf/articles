## KubeSphere

过去十年，软件开发的最大变化是什么？

答案大概就是 Docker 容器的出现。以前的软件都部署在物理机，现在部署在一个个容器，可以快速扩展和缩容，几乎没有操作成本。

![](https://cdn.beekka.com/blogimg/asset/202109/bg2021092101.jpg)

你可能听说过 k8s，它是谷歌公司的开源软件 Kubernetes（K 和 s 之间有8个字母），作用就是管理 Docker 容器。

Docker 的标志是一艘集装箱船，k8s 则是一个控制轮船的舵盘，这说明了两者的关系。想象一下，成百上千个 Docker 容器分布在不同的公有云和私有云（称为“混合多云”），如何将它们整合成一个云原生应用，在一个界面进行管理。这就是 k8s 的作用。

![](https://cdn.beekka.com/blogimg/asset/202109/bg2021092103.jpg)

k8s 的最大问题就是太复杂，它现在是一个独立工种。个人和小企业如果不是这方面的专业，自己搭建 k8s 环境，是不容易搞定的。

为了解决 k8s 的“难装难用”，业界有很多基于 k8s 的管理系统。它们把 k8s 作为内核，在外层提供了好用的界面，并集成了很多周边工具，大大降低了难度系数。

![](https://cdn.beekka.com/blogimg/asset/202109/bg2021092104.jpg)

本周向大家介绍一个开源的国产 k8s 管理系统：[KubeSphere](https://kubesphere.io/zh/)。

它的最大特点就是易用，提供了一个体验非常优秀的控制台，让不熟悉容器的用户以非常低的成本上手，使用各种高级功能。整个操作过程都是向导式图形化的 UI。

![](https://cdn.beekka.com/blogimg/asset/202109/bg2021092312.jpg)

在功能上，KubeSphere 完全针对企业级应用，注重安全性和稳定性，提供秒级监控。同时，它通过强大的可视化，实现自动化的运维，降低了对使用者的技术水平要求。

此外，它充分考虑了国情，兼容各种既有的企业 IT 管理流程，可平滑整合到现有 IT 体系，让企业不用改原来的代码，就能把应用直接部署到容器平台。

![](https://cdn.beekka.com/blogimg/asset/202109/bg2021092311.jpg)

理想情况下，它可以做到不同项目、不同环境、不同部署，都只用一个描述文件进行管理，这个描述文件还可以放进代码仓库，从而实现多集群、多租户、多网络的容器环境的全自动化运维。

它从2018年提交第一行代码开始，就是一个开源产品，而且会一直保持开源。目前，它在 [GitHub](https://github.com/kubesphere/kubesphere) 已经有6000多个 Star，超过一半的用户来自海外。

它在国内的客户有新浪、微众银行、中国人保寿险等众多著名企业。这里有一篇问答社区 SegmentFault 的[使用体会](https://mp.weixin.qq.com/s/NiatJMfRBvNrcvd2f0TwMg)，大家可以参考。

![](https://cdn.beekka.com/blogimg/asset/202109/bg2021092313.jpg)

如果你们公司想尝试 k8s，或者你个人想学习 k8s，建议可以试试 KubeSphere，这里是 [Demo](https://demo.kubesphere.io/login)（账号：demo1 / Demo123）。它容易[安装](https://github.com/kubesphere/kubekey/blob/master/README_zh-CN.md)，还有很友好的[中文文档](https://kubesphere.io/zh/docs/)和[开发者社区](https://kubesphere.com.cn/forum/)。
