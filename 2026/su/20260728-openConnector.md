## [本周软件] OpenConnector

今天介绍一款开源的密码连接网关 [OpenConnector](https://github.com/oomol-lab/open-connector)。

![](https://cdn.beekka.com/blogimg/asset/202607/bg2026072801.webp)

它跟 AI Agent 配套使用，主要解决 AI 自动化工具（比如 OpenClaw）的授权问题。

举例来说，邮箱密码交给 AI 工具，你放心吗，谁能保证它不会把密码泄漏到上下文？OpenConnector 就解决这个问题。

它严格保存密码/授权凭证，统一负责与各种外部应用的连接，Agent 只能拿到账号标签、元数据和执行结果，不会发生密码泄漏，而且方便统一管理。

![](https://cdn.beekka.com/blogimg/asset/202607/bg2026072802.webp)

用户只需通过它连接一次外部应用，它就会自动保存连接信息，目前已经支持1000多个身份提供商和10000多个应用服务。

它可以部署在 Cloudflare Workers 或者 Fly.io + SQLite，也支持本地 Node.js / Docker 部署。如果觉得麻烦，可以直接用它的 SaaS 云服务 [OOMOL](https://oomol.com/apps)。

它提供 Web 管理后台，可以查看实时运行状态和调用记录。团队版还带有权限管理，支持团队使用，一个团队成员建立连接，可共享给其他成员。

## 社交媒体的文案

最近看到一款开源的密码连接网关 OpenConnector，能够防止 AI Agent 泄漏密码到上下文，统一管理连接授权。 https://github.com/oomol-lab/open-connector

![](https://cdn.beekka.com/blogimg/asset/202607/bg2026072801.webp)

它可以严格保存密码/授权凭证，统一负责与各种外部应用的连接，Agent 只能拿到账号标签、元数据和执行结果，不会发生密码泄漏。

![](https://cdn.beekka.com/blogimg/asset/202607/bg2026072802.webp)

用户只需通过它连接一次外部应用，它就会自动保存连接信息，目前已经支持1000多个身份提供商和10000多个应用服务。

它还自带 Web 管理后台，可以查看实时运行状态和调用记录。

部署方面，可以放在 Cloudflare Workers 或者 Fly.io + SQLite，也支持本地 Node.js / Docker 部署。如果觉得麻烦，它还有 SaaS 云服务 OOMOL。https://oomol.com/apps
