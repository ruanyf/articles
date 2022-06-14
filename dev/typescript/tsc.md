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

使用选项--allowJs，TypeScript 编译器将输入目录中的 JavaScript 文件复制到输出目录。

## checkJs

参数`--checkJs`可以让编译器对 JavaScript 文件进行类型检查，前提是必须同时使用参数`--allowJs`。它等同于在 JS 脚本头部加上`// @ts-check`的指令。

使用`--checkJS`时，如果 JS 脚本头部有`// @ts-nocheck`指令，则不会对该文件进行类型检查。

`--checkJs`，tsc 编译器还会对 JavaScript 文件进行类型检查（--allowJs必须启用，此选项才能正常工作）。鉴于可用信息有限，它尽其所能。检查哪些文件可以通过其中的注释进行配置：

- 显式排除：如果 JavaScript 文件包含注释// @ts-nocheck，则不会对其进行类型检查。
- 显式包括：如果没有--checkJs，注释`// @ts-check`可用于对单个 JavaScript 文件进行类型检查。

## importHelpers

使用`--importHelpers`编译器选项和tslib npm 包。指定时，--importHelpers将导致 TypeScript 编译器从tslib. 然后像 webpack 这样的打包器可以只内联该 npm 包一次，避免代码重复。

## init

`--init`会生成一个默认的配置文件`tsconfig.json`。

```bash
$ tsc --init
```

## noEmit

参数`--noEmit`表示编译器不会产生任何输出，也就是不会有编译结果，只用来对文件进行类型检查。

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

## resolveJsonModule

`--resolveJsonModule`允许 TypeScript 导入 JSON 模块。

在 tsconfig.json 打开这个选项。

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "strict": true,
    "moduleResolution": "node",
    "resolveJsonModule": true
  }
}
```

然后，import 命令就可以导入 json 模块了。

```typescript
import * as config from "./config.json";
```

## showConfig

`--showConfig`检验tsconfig.json文件的有效性，并将其打印到控制台。这对于调试配置问题很有用，尤其是与tsconfig.json文件extends中的属性一起使用时。

举例来说，下面是一个 tsconfig.json 文件。

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "es2015",
    "moduleResolution": "node",
    "strict": true,
    "importHelpers": true
  },
  "include": ["**/*.ts"]
}
```

运行`tsc --showConfig`命令。

```bash
$ tsc --showConfig
```

控制台会显示下面的内容。

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "es6",
    "moduleResolution": "node",
    "strict": true,
    "importHelpers": true
  },
  "files": ["./main.ts", "./utils/crypto.ts"],
  "include": ["**/*.ts"]
}
```

上面是 TypeScript 实际上会运行的配置。

注意，上面添加了`files`属性，tsconfig.json 并没有这个属性。这是 TypeScript 根据`include`属性，计算出来这个配置文件所针对的 TypeScript 脚本。

注意，`--showConfig`在 tsconfig.json 文件里面设置无效，只能用于命令行。

## strict

`--strict`参数会打开严格模式。它会启用下面八个编译器选项。

- --alwaysStrict：Use JavaScript’s strict mode whenever possible.
- --strictBindCallApply
- --strictFunctionTypes: enables stronger checks for function types.
- --strictNullChecks: null is not part of any type (other than its own type, null) and must be explicitly mentioned if it is a acceptable value.
- --strictPropertyInitialization: Properties in class definitions must be initialized, unless they can have the value undefined.
- --noImplicitAny：如果 TypeScript 无法自己推导出类型，开发者必须注明类型。如果设为 false，推断不出，就一律设为 any。
- --noImplicitThis：Complain if the type of this isn’t clear.
- --useUnknownInCatchVariables

在打开`--strict`的同时，上面这些属性也可以关闭其中一项或几项。

```json
{
  "strict": true,
  "alwaysStrict": false
}
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
