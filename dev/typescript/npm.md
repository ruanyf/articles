# 使用外部模块

有些外部模块不带有类型描述。TypeScript 官方和社区就自发为常用模块添加类型描述，可以去[官方网站](https://www.typescriptlang.org/dt/search)搜索，然后安装网站给出的类型模块，通常是`@types/[模块名]`。

```bash
$ npm install --save lodash
$ npm install --save @types/lodash
```

lodash 的类型描述就是`@types/lodash`的文件`index.d.ts`。
