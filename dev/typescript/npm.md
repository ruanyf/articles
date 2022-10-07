# TypeScript 项目使用 npm 模块

## 简介

npm 模块都是 JavaScript 代码。即使模块是用 TypeScript 写的，还是必须编译成 JavaScript 再发布，保证模块可以在没有 TypeScript 的环境运行。

问题就来了，TypeScript 项目开发时，加载外部 npm 模块，如果拿不到该模块的类型信息，就会导致无法开发。所以，必须有一个方法，可以拿到模块的类型信息。

有些 npm 模块本身可能包含`.d.ts`文件甚至完整的 TypeScript 代码。它的`package.json`文件里面有一个`types`字段，指向一个`.d.ts`文件，这就是它的类型声明文件。

```javascript
{
 "name": "left-pad",
 "version": "1.3.0",
 "description": "String left pad",
 "main": "index.js",
 "types": "index.d.ts",
 // ...
}
```

如果某个模块没有`.d.ts`文件，TypeScript 官方和社区就自发为常用模块添加类型描述，可以去[官方网站](https://www.typescriptlang.org/dt/search)搜索，然后安装网站给出的 npm 类型模块，通常是`@types/[模块名]`。

```bash
$ npm install --save lodash
$ npm install --save @types/lodash
```

lodash 的类型描述就是`@types/lodash`的文件`index.d.ts`。

## TS 模块转 npm 模块

TS 代码放在`ts`子目录，编译出来的 CommonJS 代码放在`dist`子目录。