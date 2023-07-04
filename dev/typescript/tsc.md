# tsc 命令行编译器

## 简介

tsc 是 TypeScript 官方的命令行编译器，用来检查代码，并将其编译成 JavaScript 代码。

tsc 默认使用当前目录下的配置文件`tsconfig.json`，但也可以接受独立的命令行参数。

如果命令行指定了所要编译的文件，那么 tsc 会忽略`tsconfig.json`的`files`属性。

它的基本用法如下。

```bash
# 按照 tsconfig.json 编译
$ tsc

# 只编译 index.ts 
$ tsc index.ts

# 编译 src 目录的所有 .ts 文件
$ tsc src/*.ts

# 指定编译配置文件
$ tsc --project tsconfig.production.json

# 只类型生明文件，不编译出 JS 文件
$ tsc index.js --declaration --emitDeclarationOnly

# 多个 TS 文件编译成单个 JS 文件
$ tsc app.ts util.ts --target esnext --outfile index.js
```

## 命令行参数

tsc 的命令行参数，大部分与 tsconfig.json 的属性一一对应。

下面只是简单罗列主要的一些参数，详细解释可以参考《tsconfig.json 配置文件》一章。

`--all`：输出所有可用的参数。

`--allowJs`：允许 TS 脚本加载 JS 模块，编译时将 JS 一起拷贝到输出目录。

`--allowUnreachableCode`：如果 TS 脚本有不可能运行到的代码，不报错。

`--allowUnusedLabels`：如果 TS 脚本有没有用到的标签，不报错。

`--alwaysStrict`：总是在编译产物的头部添加`use strict`。

`--baseUrl`：指定非相对的模块的基准 URL。

`--build`：启用增量编译。

`--checkJs`：对 JS 脚本进行类型检查。

`--declaration`：为 TS 脚本生成一个类型生成文件。

`--declarationDir`：指定生成的类型声明文件的目录。

`--declarationMap`：为`.d.ts`文件生成 SourceMap 文件。

`--diagnostics`：构建后输出编译性能信息。

`--emitBOM`：在编译输出的 UTF-8 文件头部加上 BOM 标志。

`--emitDeclarationOnly`：只编译输出类型声明文件，不输出 JS 文件。

`--esModuleInterop`：更容易使用 import 命令加载 CommonJS 模块。

`--exactOptionalPropertyTypes`：不允许将可选属性设置为`undefined`。

`--experimentalDecorators`：支持早期的装饰器语法。

`--explainFiles`：输出进行编译的文件信息。

`--forceConsistentCasingInFileNames`：文件名大小写敏感，默认打开。

`--help`：输出帮助信息。

`--importHelpers`：从外部库（比如 tslib）输入辅助函数。

`--incremental`：启用增量构建。

`--init`：在当前目录创建一个全新的`tsconfig.json`文件，里面是预设的设置。

`--inlineSourceMap`：SourceMap 信息嵌入 JS 文件，而不是生成独立的`.js.map`文件。

`--inlineSources`：将 TypeScript 源码作为 SourceMap 嵌入编译出来的 JS 文件。

`--isolatedModules`：确保每个模块能够独立编译，不依赖其他输入的模块。

`--jsx`：设置如何处理 JSX 文件。

`--lib`：设置目标环境需要哪些内置库的类型描述。

`--listEmittedFiles`：编译后输出编译产物的文件名。

`--listFiles`：编译过程中，列出读取的文件名。

`--listFilesOnly`：列出编译所要处理的文件，然后停止编译。

`--locale`：指定编译时输出的语言，不影响编译结果。

`--mapRoot`：指定 SourceMap 文件的位置。

`--module`：指定编译生成的模块格式。

`--moduleResolution`：指定如何根据模块名找到模块的位置。

`--moduleSuffixes`：指定模块文件的后缀名。

`--newLine`：指定编译产物的换行符，可以设为`crlf`或者`lf`。

`--noEmit`：不生成编译产物，只进行类型检查。

`--noEmitHelpers`：不在编译产物中加入辅助函数。

`--project`（或者`-p`）：指定编译配置文件，或者该文件所在的目录。

`--showConfig`：终端输出编译配置信息，而不进行配置。

`--version`：终端输出 tsc 的版本号。

`--watch`（或者`-w`）：进入观察模式，只要文件有修改，就会自动重新编译。

## --out

将多个原始脚本编译成单个文件。

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

## --rootDir

`--rootDir`指定输入文件的根目录，该目录里面的目录结构会被复制到输出目录。

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

## importHelpers

使用`--importHelpers`编译器选项和tslib npm 包。指定时，--importHelpers将导致 TypeScript 编译器从tslib. 然后像 webpack 这样的打包器可以只内联该 npm 包一次，避免代码重复。

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
