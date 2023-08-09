# 《TypeScript 教程》发布了

长话短说，我写了一本[《TypeScript 教程》](https://wangdoc.com/typescript/)，已经发布在[网道](https://wangdoc.com/)，欢迎大家访问。

[![](https://cdn.beekka.com/blogimg/asset/202308/bg2023080705.webp)](https://wangdoc.com/typescript/)

我以前写过[《JavaScript 教程》](https://wangdoc.com/javascript/)和[《ES6 教程》](https://wangdoc.com/es6/)，很自然地，一直有人问，有没有[《TypeScript 教程》](https://wangdoc.com/typescript/)？

嗯……说实话，我一开始不想写。

![](https://cdn.beekka.com/blogimg/asset/202308/bg2023080706.webp)

我那时的想法是，TypeScript 就是为 JS 语言添加静态类型系统。如果你真需要静态类型，可以考虑使用其他更成熟的语言（比如 Rust 和 Java），再编译成 JS（wasm 模块），何必新学一门语言呢。

但是，形势比人强。TypeScript 越来越流行，成为前端开发的主流工具，各种项目纷纷移植过去。我就逐渐改变了想法，觉得还是应该上车。

![](https://cdn.beekka.com/blogimg/asset/202308/bg2023080707.webp)

2021年底，我开始动笔，没想到一写，就是断断续续一年多。

写作过程很痛苦，我低估了 TypeScript 的难度。它为了适配 JavaScript，有很多不符合直觉的规则，内容又多又杂。

加之我对很多地方不够熟悉，边写边查资料，更加拖延了写作进度。

今年3月份，我已经快写完了，[TypeScript 5.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html) 突然发布了，装饰器（Decorators）改用全新语法。我不得不重写这一章，于是装饰器现在就有[新语法](https://wangdoc.com/typescript/decorator.html)和[旧语法](https://wangdoc.com/typescript/decorator-legacy.html)两章，因为 TypeScript 同时支持这两者。

![](https://cdn.beekka.com/blogimg/asset/202308/bg2023080708.webp)

如今终于完稿，如释重负，欢迎大家多[提供反馈](https://github.com/wangdoc/typescript-tutorial/issues)。

这个教程采用创意共享许可证，**免费使用，但需要保留署名**，也就是保留出处。源码放在 [GitHub](https://github.com/wangdoc/typescript-tutorial)，大家发现任何问题，欢迎提交 Issue 和 PR。

（完）
