# tsc 命令和 TypeScript 配置

tsc 可以使用配置文件`tsconfig.json`，自动读取当前目录下的这个配置文件。

## --all

输出所有可用的参数。

## allowJs

编译时处理 JS 文件。

```bash
$ tsc --allowJs
```

## --build

TypeScript提供了一种新的构建模式来配合工程引用的使用，它就是“--build”模式（简写为“-b”）。在该模式下，编译器能够进行增量构建。

当使用该命令构建TypeScript工程时，编译器会执行如下操作：

▪查找当前工程所引用的工程。

▪检查当前工程和引用的工程是否有更新。

▪若工程有更新，则根据依赖顺序重新构建它们；若没有更新，则不进行重新构建。

```bash
$ tsc --build
```

在“C:\app\src”工程中还生成了“tsconfig.tsbuildinfo”文件，它保存了该工程本次构建的详细信息，编译器正是通过查看该文件来判断当前工程是否需要重新编译。

## checkJs

checkJs 对 JS 脚本文件进行类型检查。

- Defaulting allowJs to true if it wasn’t already
- Enabling the type checker on .js and .jsx files

```bash
$ tsc --checkJs
```

## --declaration

生成一个`.d.ts`类型声明文件。

## -declarationMap

为类型声明文件`.d.ts`生成 sourcemap 文件。

## --help

显示帮助信息。

## --init

`--init`创建一个全新的`tsconfig.json`文件。

```bash
$ tsc --init
```

## --lib

指定使用何种运行环境的类型声明文件。

```bash
$ tsc --lib es2020
$ tsc --lib dom,es2021
```

## --module

`--module`参数指定编译的输出格式。

```bash
$ tsc --module commonjs Test.ts
```

它可以接受以下值。

- commonjs：默认值，供 Node.js 使用
- amd：供 require.js 使用
- system
- umd
- es2015
- es2020
- esnext

## --moduleResolution

决定模块解析策略。

## --noEmit

不生成新文件，只用来进行类型检查。

## --out

将多个原始脚本编译成单个文件。

## -p，--project

`-p`指定配置文件。如果配置文件不是当前目录的`tsconfig.json`文件，那么就需要使用`-p`参数指定配置文件。

```bash
$ tsc -p src/client/tsconfig.client.json
$ tsc -p src/server/tsconfig.server.json
```

## --preserveWatchOutput

在观察模式（watch）下，编译器每次编译文件之前都会清空命令行窗口中的历史输出信息。如果我们想保留每一次编译的输出信息，则可以使用“--preserveWatchOutput”编译选项。

需要打开 watch 选项。

```typescript
$ tsc index.ts --watch --preserveWatchOutput
```

## --pretty

tsc 默认就是`--pretty`模式输出（带有颜色和格式），但是可以把`--pretty`关闭。

```bash
$ tsc index.ts --pretty false
```

## --removeComments

在输出文件中移除代码注释。

## --skipLibCheck

跳过`.d.ts`类型声明文件的类型检查。一个原因是项目可能安装了同一个依赖的两个版本，两个版本的类型声明文件会造成冲突。

关闭类型声明文件的检查，可以加快编译速度。

```bash
$ tsc --skipLibCheck
```

## --sourcemap

生成一个 sourcemap 文件(.map 文件)。

## --strict

`--strict`参数会打开严格模式。它会启用下面八个编译器选项。

```bash
$ tsc --strict
```

- `--noImplicitAny`
- `--strictNullChecks`
- `--strictFunctionTypes`
- `--strictBindCallApply`
- `--strictPropertyInitialization`
- `--noImplicitThis`
- `--alwaysStrict`

- --alwaysStrict：Use JavaScript’s strict mode whenever possible.
- --strictBindCallApply
- --strictFunctionTypes: enables stronger checks for function types.
- --strictNullChecks: null is not part of any type (other than its own type, null) and must be explicitly mentioned if it is a acceptable value.
- --strictPropertyInitialization: Properties in class definitions must be initialized, unless they can have the value undefined.
- --noImplicitAny：如果 TypeScript 无法自己推导出类型，开发者必须注明类型。如果设为 false，推断不出，就一律设为 any。
- --noImplicitThis：Complain if the type of this isn’t clear.
- --useUnknownInCatchVariables

在打开`--strict`的同时，上面这些属性也可以关闭其中一项或几项。

```bash
$ tsc --strict --noImplicitAny false
```

在实际工程中，我们可以先启用“--strict”编译选项，然后再根据需求禁用不需要的某些严格类型检查编译选项。这样做有一个优点，那就是在TypeScript语言发布新版本时可能会引入新的严格类型检查编译选项，如果启用了“--strict”编译选项，那么就会自动应用新引入的严格类型检查编译选项。

```bash
$ tsc --strict
```

## --target

指定编译后输出代码的 JavaScript 版本。

可选择的值为：

▪ES3（默认值）

▪ES5

▪ES6 / ES2015

▪ES2016

▪ES2017

▪ES2018

▪ES2019

▪ES2020

▪ESNext

如果我们将“--target”编译选项设置为“ES5”，那么编译器会自动将适用于“ES5”的内置声明文件添加到编译文件列表。示例如下：

- lib.d.ts
- lib.es5.d.ts
- lib.dom.d.ts
- lib.webworker.importscripts.d.ts
- lib.scripthost.d.ts

## -w, --watch

TypeScript编译器提供了一种特殊的编译模式，即观察模式。在观察模式下，编译器会监视文件的修改并自动重新编译文件。观察模式通过“--watch”（简写为“-w”）编译选项来启用。

文件如果修改后再保存，就会自动重新编译。

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

启用编译选项`--strictNullChecks`，或者在`tsconfig.json`中打开。

```javascript
{
    "compilerOptions": {
        "strictNullChecks": false
    }
}
```

没有打开时，`undefined`类型和`null`类型会被放宽为any类型。

```typescript
let a = undefined;   // any
const b = undefined; // any

let c = null;        // any
const d = null;      // any
```

打开以后，编译器不再放宽undefined类型和null类型，它们将保持各自的类型。

```typescript
let a = undefined;   // undefined
const b = undefined; // undefined

let c = null;        // null
const d = null;      // null
```

--noImplicitAny：当无法推断一个变量时发出一个错误（或者只能推断为一个隐式的 any 类型），你可以通过显式添加 :any 的类型注解，来让它成为一个 any 类型。

## strictPropertyInitialization

--strictPropertyInitialization 实例的属性必须有初始值，可以在声明时赋值，也可以在构造函数里面赋值。

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

如果打开该设置，需要同时打开`--strictNullChecks`。

如果确实打算在其他地方初始化，可以使用赋值断言运算符（`!`）。属性名后面加上感叹号，表示该属性非空。

```typescript
class OKGreeter {
  name!: string;
}
```

这个设置有时很烦人，因为有时不一定需要初始值，也不一定会在构造函数里面赋值。所以，如果必要的话，可以把它关掉。

```javascript
"strictPropertyInitialization": false
```

## --allowJs

在一个工程中可能既存在TypeScript代码也存在JavaScript代码。例如，一个Type-Script工程依赖于某个JavaScript代码库，又或者一个工程正在从JavaScript向TypeScript进行迁移。如果TypeScript工程中的JavaScript程序也是工程的一部分，那么就需要使用“--allowJs”编译选项来配置TypeScript编译器。

在默认情况下，编译器只会将“.ts”和“.tsx”文件添加到编译文件列表，而不会将“.js”和“.jsx”文件添加到编译文件列表。如果想要让编译器去编译JavaScript文件，那么就需要启用“--allowJs”编译选项。在启用了“--allowJs”编译选项后，工程中的“.js”和“.jsx”文件也会被添加到编译文件列表。

参数`--allowJs`允许 TS 脚本加载 JS 脚本。同时，编译器会将源码里面的 JS 文件，拷贝到编译结果的目录。

使用选项--allowJs，TypeScript 编译器将输入目录中的 JavaScript 文件复制到输出目录。

```bash
$ tsc src/index.js --allowJs --outDir dist
```

在启用了“--allowJs”编译选项后，编译器能够像编译TypeScript文件一样去编译JavaScript文件。此例中，我们还必须指定一个除“C:\app\src”之外的目录作为输出文件目录，否则编译器将报错。因为如果在“C:\app\src”目录下生成编译后的“index.js”文件，那么它将会覆盖源“index.js”文件，这是不允许的。

如果 target 指定为 es5，`--allowJs`还能起到转译 JavaScript 代码版本。

```bash
$ tsc index.js --target ES5 --allowJs --outFile index.out.js
```

## --checkJs

在默认情况下，TypeScript编译器不会对JavaScript文件进行类型检查。就算启用了“--allowJs”编译选项，编译器依然不会对JavaScript代码进行类型检查。

TypeScript 2.3提供了一个“--checkJs”编译选项。当启用了该编译选项时，编译器能够对“.js”和“.jsx”文件进行类型检查。“--checkJs”编译选项必须与“--allowJs”编译选项一起使用。

```typescript
$ tsc src/index.js --allowJs --checkJs --outDir dist
```

参数`--checkJs`可以让编译器对 JavaScript 文件进行类型检查，前提是必须同时使用参数`--allowJs`。它等同于在 JS 脚本头部加上`// @ts-check`的指令。

使用`--checkJS`时，如果 JS 脚本头部有`// @ts-nocheck`指令，则不会对该文件进行类型检查。

`--checkJs`，tsc 编译器还会对 JavaScript 文件进行类型检查（--allowJs必须启用，此选项才能正常工作）。鉴于可用信息有限，它尽其所能。检查哪些文件可以通过其中的注释进行配置：

- 显式排除：如果 JavaScript 文件包含注释// @ts-nocheck，则不会对其进行类型检查。
- 显式包括：如果没有--checkJs，注释`// @ts-check`可用于对单个 JavaScript 文件进行类型检查。

## importHelpers

使用`--importHelpers`编译器选项和tslib npm 包。指定时，--importHelpers将导致 TypeScript 编译器从tslib. 然后像 webpack 这样的打包器可以只内联该 npm 包一次，避免代码重复。

## init

`--init`参数会在当前目录生成一个全新的配置文件`tsconfig.json`。

```bash
$ tsc --init
```

这个配置文件里面的大多数配置都被注释掉了，需要什么参数，可以取消注释。

另外，目前默认的编译目标是`es2016`。

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

先介绍一下“--showConfig”编译选项。在使用该编译选项后，编译器将显示出编译工程时使用的所有配置信息。当我们在调试工程配置的时候，该编译选项是非常有帮助的。

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
