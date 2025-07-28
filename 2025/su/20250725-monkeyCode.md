## AI 编程助手缺什么

大家使用 AI 编程助手，有没有感到，缺少一样东西？

它们只有系统设置，没有管理后台，无法查看仪表盘和使用统计。

现在出来一个新的开源项目 [MonkeyCode](https://github.com/chaitin/MonkeyCode)，就是**带有管理后台的 AI 编程助手**（下图）。

![](https://cdn.beekka.com/blogimg/asset/202507/bg2025072501.webp)

它有独立的服务端，以及自己的 VS Code 插件。**插件的 AI 操作都会经过服务端**，因此可以控制和统计。

它可以私有化部署，支持纯离线使用。后台配置 AI 模型以后，除了代码补全和生成，还能进行代码安全扫描。

![](https://cdn.beekka.com/blogimg/asset/202507/bg2025072502.webp)

用户使用时必须登录（上图），所有操作记录都会保存，很适合公司和团队了解每个成员怎么使用 AI。此外，

它的代码在 [GitHub](https://github.com/chaitin/MonkeyCode)，具体的安装/使用方法看[官网文档](https://monkeycode.docs.baizhi.cloud/welcome)。
