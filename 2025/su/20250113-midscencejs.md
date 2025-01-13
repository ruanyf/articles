## Midscene.js：浏览器自动化利器

本周介绍一个很特别的浏览器自动化工具：[Midscene.js](https://github.com/web-infra-dev/midscene)。

![](https://cdn.beekka.com/blogimg/asset/202501/bg2025011306.webp)

说它特别，因为它既是浏览器插件，又是命令行工具，还是一个 JS 库。

（1）作为[浏览器插件](https://chromewebstore.google.com/detail/midscene/gbldofcpkknbggpkmbdaefngejllnief)（下图），**你可以用自然语言，向当前页面下指令**（需要自行[接入 AI 模型](https://midscenejs.com/zh/model-provider.html)），相当于一个无代码的控制台。

![](https://cdn.beekka.com/blogimg/asset/202501/bg2025011305.webp)

指令分成三种：交互（action，比如“点击搜索按钮”）、查询（query，比如“返回所有商品的链接”）、断言（assert，比如“页面是否有三个按钮”）。

（2）作为命令行工具时，它执行易读易写的 [YAML 脚本](https://midscenejs.com/zh/automate-with-scripts-in-yaml.html)，类似于`$ midscene test.yaml`。

（3）作为 JS 库，它可以接入Puppeteer 和 Playwright，让它们接受自然语言指令。

总之，如果你想试试自然语言的浏览器自动化，就不要错过 [Midscene.js](https://github.com/web-infra-dev/midscene)。它能满足你能想到的各种用途，在 GitHub 已经获得2700颗星。