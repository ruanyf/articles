# tsc 命令和 TypeScript 配置

## module

`module`参数指定编译的输出格式。

```bash
$ tsc --module commonjs Test.ts
```

它可以接受以下值。

- commonjs：默认值，供 Node.js 使用
- amd：供 require.js 使用
- system
- umd
- es2015
- esnext

## strictNullChecks

如果 strictNullChecks 设为 off，那些等于null或undefined的值仍然可以正常访问，并且null或undefined可以分配给任何类型的属性。推荐总是打开该设置。

如果 strictNullChecks on，如果值为null 或undefined 时，您需要在对该值使用方法或属性之前测试这些值。

```typescript
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

--noImplicitAny：当无法推断一个变量时发出一个错误（或者只能推断为一个隐式的 any 类型），你可以通过显式添加 :any 的类型注解，来让它成为一个 any 类型。

--strictPropertyInitialization 实例的属性都需要在构造函数里面初始化。

```typescript
// 报错
class BadGreeter {
  name: string;
}

// 正确
class GoodGreeter {
  name: string; 
  constructor() {
    this.name = "hello";
  }
}
```

如果确实打算在其他地方初始化，可以使用赋值断言运算符。

```typescript
class OKGreeter {
  name!: string;
}
```

## allowJs

参数`--allowJs`允许 TS 脚本加载 JS 脚本。同时，编译器会将源码里面的 JS 文件，拷贝到编译结果的目录。

## checkJs

参数`--checkJs`可以让编译器对 JavaScript 文件进行类型检查，前提是必须同时使用参数`--allowJs`。它等同于在 JS 脚本头部加上`// @ts-check`的指令。

使用`--checkJS`时，如果 JS 脚本头部有`// @ts-nocheck`指令，则不会对该文件进行类型检查。

## noEmit

参数`--noEmit`表示编译器不会产生任何输出，只用来对文件进行类型检查。

## noResolve

参数`--noResolve`表示不进行模块定位，除非该模块是由命令行传入。

```bash
$ tsc app.ts moduleA.ts --noResolve
```

上面的命令指定编译`app.ts`和`moduleA.ts`，等于从命令行传入`moduelA.ts`。`--noResolve`则是指定不进行模块定位，除了命令行传入的`moduleA.ts`。

如果`app.ts`里面加载了`moduleA`和`moduleB`，就会有下面的结果。

```typescript
import * as A from "moduleA"; // 正确，moduleA 从命令传入
import * as B from "moduleB"; // 报错，找不到 moduleB
```

## traceResolution

参数`--traceResolution`会在编译时，输出查找模块的详细过程。

下面是一个演示，源文件`src/app.ts`有一行`import * as ts from "typescript"`，TypeScript 尝试加载模块`typescript`。

```bash
$ tsc --traceResolution

======== Resolving module 'typescript' from 'src/app.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'typescript' from 'node_modules' folder.
File 'src/node_modules/typescript.ts' does not exist.
File 'src/node_modules/typescript.tsx' does not exist.
File 'src/node_modules/typescript.d.ts' does not exist.
File 'src/node_modules/typescript/package.json' does not exist.
File 'node_modules/typescript.ts' does not exist.
File 'node_modules/typescript.tsx' does not exist.
File 'node_modules/typescript.d.ts' does not exist.
Found 'package.json' at 'node_modules/typescript/package.json'.
'package.json' has 'types' field './lib/typescript.d.ts' that references 'node_modules/typescript/lib/typescript.d.ts'.
File 'node_modules/typescript/lib/typescript.d.ts' exist - use it as a module resolution result.
======== Module name 'typescript' was successfully resolved to 'node_modules/typescript/lib/typescript.d.ts'. ========
```
