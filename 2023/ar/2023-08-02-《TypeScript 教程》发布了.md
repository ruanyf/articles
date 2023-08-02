# TypeScript 教程发布了

长话短说，我写了一本[《TypeScript 教程》](https://wangdoc.com/typescript/)，已经发布到[网道](https://wangdoc.com/)了，欢迎大家访问。

我以前写过[《JavaScript 教程》](https://wangdoc.com/javascript/)和[《ES6 教程》](https://wangdoc.com/es6/)，很自然地，一直有人问，有没有《TypeScript 教程》？

说实话，我一开始不想写。

主要原因是，TypeScript 是为 JS 语言添加类型系统，我的想法是，如果你真需要静态类型，那就使用其他更成熟的语言（比如 Rust 和 Java），再编译成 JS（wasm 模块），省得新学一门语言。

但是，形势比人强。TypeScript 越来越流行，成为前端开发的主流，各大项目纷纷移植，有些大框架默认就使用它。我就逐渐改变了想法。

2021年底，我开始写，没想到断断续续花了一年多。

写作过程挺痛苦的，没想到 TypeScript 的内容这么多、这么杂。由于需要适配 JavaScript，而后者以怪异行为著称，导致 TypeScript 也有很多奇怪的语法规则。

加上我平时使用 TypeScript 的场合并不多，对很多地方不够熟悉，边写边查资料，也导致写作进度慢。

今年年初，这个教程已经快写完了，但是 [TypeScript 5.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html) 在3月份发布了，引入了装饰器（Decorators）的全新语法。我不得不重写[《装饰器》](https://wangdoc.com/typescript/decorator.html)这一章，现在就有了新语法和[旧语法](https://wangdoc.com/typescript/decorator-legacy.html)两章，因为 TypeScript 同时支持这两者。

好在如今终于完稿发布了，如释重负，欢迎大家访问。

这个教程采用创意共享许可证，可以**免费使用，但是需要保留署名**。

它的源码是开放的，就放在 [GitHub](https://github.com/wangdoc/typescript-tutorial)，欢迎大家多[提供反馈](https://github.com/wangdoc/typescript-tutorial/issues)，提交 Issue 和 PR。

（完）