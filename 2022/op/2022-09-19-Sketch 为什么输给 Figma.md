## 本周话题：Figma 为什么赢了 Sketch

上周，Adobe 公司[宣布](https://36kr.com/p/1917326805803014)，200亿美元收购设计软件 Figma。

![](https://cdn.beekka.com/blogimg/asset/202209/bg2022092001.webp)

这个收购价高得吓人。Figma 去年的[收入](https://www.cbinsights.com/company/figma/financials)是5000万美元，今年据说可以到4亿美元。就算这个预测是可靠的，收购价也达到了收入的50倍！

作为比较，微软2018年收购 GitHub 的价格是75亿美元，那一年 GitHub 的收入约为3亿美元。

**为什么一个面向专业用户、2016年才问世的设计软件，能值这么多钱？**

![](https://cdn.beekka.com/blogimg/asset/202209/bg2022092002.webp)

Figma 有一个竞争对手 [Sketch](https://www.sketch.com/)，功能差不多。直到2019年，Sketch 的估值还超过 Figma。当时，网上还有猜测，Sketch 什么时候会收购 Figma，但是没想到后来就被 Figma 甩开差距了。

今天就想谈谈 Figma 的高估值，以及为什么 Sketch 输给了它？

我不是设计师用户，无法全面分析，只想指出在技术上，它们有一个重大差异。

Sketch 是一个原生 MacOS 应用，只能在苹果电脑上安装运行，没有免费版。**Figma 则是一个 Web 应用，只要有浏览器就能用，而且有免费版。** 下图是浏览器打开 Figma 的样子。

![](https://cdn.beekka.com/blogimg/asset/202209/bg2022092004.webp)

你想想看，一个要用 Mac 电脑下载安装，付费才能用，另一个只要打开浏览器就能用，谁占优势不言而喻。

但是，事情没这么简单。原生应用则可以调用底层的系统 API，网页应用受限于浏览器，很多功能实现不了。所以，Sketch 功能和性能肯定强于 Figma。

Figma 怎么解决这个问题呢？答案就是 [Rust 语言](https://www.figma.com/blog/rust-in-production-at-figma/)。虽然 Figma 是网页应用，但它不是用 JavaScript 写的，而是用 Rust 写的，再编译成浏览器能理解的 WebAssembly 字节码格式，从而达到接近原生应用的性能。

![](https://cdn.beekka.com/blogimg/asset/202209/bg2022092006.webp)

事实上，**Figma 是业内 WebAssembly 最强的公司之一。** 它的 CTO 埃文·华莱士（Evan Wallace）实在忍受不了 JavaScript 的慢速度，就动手写了新一代的 JavaScript 打包器 [ESbuild](https://esbuild.github.io/faq/#benchmark-details)，结果竟比传统的打包器 Webpack 快了100多倍（0.33s vs 41.53s）！

![](https://cdn.beekka.com/blogimg/asset/202209/bg2022092007.webp)

（图片说明：Figma 的两位创始人，左为 CTO 埃文·华莱士。）

一旦解决了浏览器的性能瓶颈，能够接近原生应用的体验，Figma 赢出就毫无悬念了。

**近年来，大家好像有一个观念：原生应用是标配，Web 应用是选配。** 很多软件明明有非常好用的 Web 版，还一定要用 Electron 去包一个桌面版，让用户下载安装。仿佛只有存在一个可以安装的桌面客户端，才感到安心。

这一次，Figma 以200亿美元被收购，证明 Web 应用并没有过时。**即使不走原生应用那条路，依然有机会成功。**

另一方面，**Adobe 是一家靠原生应用起家的公司，这几年一直在转向云端**，推出了 [Adobe Creative Cloud](https://creativecloud.adobe.com/zh-Hans)，把自家的软件向浏览器迁移，希望用户打开浏览器就能用，收费方式也从买断变成了订阅制。

![](https://cdn.beekka.com/blogimg/asset/202209/bg2022092201.webp)

今年6月，Adobe 将王牌产品 PhotoShop 的网页版向所有人[免费提供](https://finance.sina.com.cn/tech/2022-06-15/doc-imizmscu6902624.shtml)。我觉得，这跟收购 Figma 是有关系的。Adobe 愿意花这么大的代价买下 Figma，不仅仅是为了产品本身，也是为了获得背后的技术，帮助开发自己的 Web 应用，彻底走向云端化。
