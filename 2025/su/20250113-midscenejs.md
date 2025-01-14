## Midscene.js：浏览器自动化利器

本周介绍一个很特别的浏览器自动化工具：[Midscene.js](https://github.com/web-infra-dev/midscene)。

![](https://cdn.beekka.com/blogimg/asset/202501/bg2025011306.webp)

它的最大特点，就是**使用自然语言操纵浏览器**（需要自行[接入 AI 模型](https://midscenejs.com/zh/model-provider.html)），并返回 JSON 数据。

大家可以安装它的[浏览器插件](https://chromewebstore.google.com/detail/midscene/gbldofcpkknbggpkmbdaefngejllnief)，直接输入自然语言指令，进行体验。

![](https://cdn.beekka.com/blogimg/asset/202501/bg2025011305.webp)

比如，交互指令（点击搜索按钮）、查询指令（返回所有商品的链接）、断言指令（页面是否有三个按钮）。

有了它，你可以编写 [YAML 脚本](https://midscenejs.com/zh/automate-with-scripts-in-yaml.html)，完成浏览器自动化；也可以将它接入 Puppeteer 和 Playwright，让后两者接受自然语言指令。

使用自然语言驱动之后，自动化脚本变得容易维护、效果更稳定。

总之，如果你需要浏览器 UI 测试，或者抓取网页数据，就不要错过 [Midscene.js](https://midscenejs.com/zh/)。它在 GitHub 已经获得2700颗星。
