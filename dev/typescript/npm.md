# 使用外部模块

有些 npm 模块本身可能包含`.d.ts`文件甚至完整的 TypeScript 代码。

如果某个模块没有`.d.ts`文件，TypeScript 官方和社区就自发为常用模块添加类型描述，可以去[官方网站](https://www.typescriptlang.org/dt/search)搜索，然后安装网站给出的 npm 类型模块，通常是`@types/[模块名]`。

```bash
$ npm install --save lodash
$ npm install --save @types/lodash
```

lodash 的类型描述就是`@types/lodash`的文件`index.d.ts`。

## TS 模块转 npm 模块

TS 代码放在`ts`子目录，编译出来的 CommonJS 代码放在`dist`子目录。