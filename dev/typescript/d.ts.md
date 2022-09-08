# d.ts 类型声明文件

TypeScript 项目有时需要引入第三方的 JavaScript 库，这些库很可能没有类型注释，是单纯的 JavaScript 库。这时就需要一个类型声明文件（type definition file）。

类型声明文件的作用是，给出当前库的 API 的类型描述。

根据约定，类型声明文件的文件名为`[vendor].d.ts`的形式。这里的`vendor`表示第三方库的名称，`d`表示 declaration（声明）。比如，jQuery 的类型声明文件就是`jQuery.d.ts`。

第三方库如果没有提供原生的类型描述文件，可以去 [DefinitelyTyped 仓库](https://github.com/DefinitelyTyped/DefinitelyTyped)找找看。这个仓库是 TypeScript 社区维护的类型描述文件仓库。

TypeScript 社区在 `@types`名称空间下，发布类型声明文件的 NPM 软件包。只要安装软件包，就可以加载某个库的类型声明文件，比如 jquery 的类型软件包就是`@types/jquery`，它的安装命令如下。

```bash
$ npm install @types/jquery -D
```

同时，在`tsconfig.json`文件里面加上类型声明文件的位置。

```javascript
{
  "compilerOptions": {
    "types" : ["jquery"]
  }
}
```

上面代码中，`compilerOptions.types`属性是一个数组，成员是所要加载的类型声明文件，要加载几个文件，就有几个成员。它们的默认位置是子目录`node_modules/@types`。

有时实在没有第三方库的类型声明文件，你可以告诉 TypeScript 相关对象的类型是`any`。比如，使用 jQuery 的脚本可以写成下面这样。

```typescript
declare var $: any 
```

上面代码表示，jQuery 的`$`对象是外部引入的，类型是`any`，也就是 TypeScript 不用对它进行类型检查。

有些库自带类型声明文件，比如`moment`自带`moment.d.ts`。

为了描述不是用 TypeScript 编写的库的形状，我们需要声明库公开的 API。通常，这些是在.d.ts文件中定义的。如果您熟悉 C/C++，您可以将这些视为.h文件。

在 Node.js 中，大多数任务都是通过加载一个或多个模块来完成的。我们可以为每个模块，定义一个自己的 .d.ts 文件，但是把所有模块的类型定义放在一个大的 .d.ts 文件更方便。



开源库 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 提供大部分常用第三方库的类型，在写自己的`[vendor.d.ts]`之前，可以先到这个库查看，它有没有提供。下面是 node.d.ts 的简化的样子。

```typescript
declare module "url" {
  export interface Url {
    protocol?: string;
    hostname?: string;
    pathname?: string;
  }
  export function parse(
    urlStr: string,
    parseQueryString?,
    slashesDenoteHost?
  ): Url;
}
declare module "path" {
  export function normalize(p: string): string;
  export function join(...paths: any[]): string;
  export var sep: string;
}
```

后面就可以在脚本里面，使用`/// <reference> node.d.ts`给出类型定义。

```typescript
/// <reference path="lib\jquery-1.8.d.ts" />
```

```typescript
/// <reference path="node.d.ts"/>
import * as URL from "url";
let myUrl = URL.parse("https://www.typescriptlang.org");
```

有时候，很难为别人的模块写出完整的 .d.ts 类型定义文件。TypeScript 这时允许在 .d.ts 里面只写模块名，不写具体的类型定义。

```typescript
declare module "hot-new-module";
```

脚本加载这个模块以后，所有引入的接口都是 any 类型。

```typescript
import x, { y } from "hot-new-module";
x(y);
```

d.ts 文件里面，需要声明引入变量的类型。比如，jQuery 可以这样声明。

```typescript
declare var $: any;
```

上面示例表示变量`$`可以是任意类型。

也可以像下面这样，自定义一个 JQuery 类型。

```typescript
declare type JQuery = any;
declare var $: JQuery;
```

另一个方法是声明一个模块 jquery。

```typescript
declare module "jquery";
```

然后在脚本里面加载这个模块。

```typescript
import * as $ from "jquery";
```

下面是 Node.js 的 Process 模块的例子。

```typescript
interface Process {
    exit(code?: number): void;
}
declare var process: Process;
```

如果你要自己为 Process 对象添加一个方法`exitWithLogging()`，就需要自己补上该方法的类型注释。

```typescript
interface Process {
    exitWithLogging(code?: number): void;
}
process.exitWithLogging = function() {
    console.log("exiting");
    process.exit.apply(process, arguments);
};
```

## declare

`declare`命令用于声明当前文件使用的某个变量的类型是由其它文件定义的。

```typescript
declare var foo: any;
foo = 123; // allowed
```

你可以把这些定义放在一个单独的 ts 文件里面，后缀名一般使用 d.ts。

## @types

TypeScript 官方提供了加载许多常用模块的类型注释，都放在 NPM 仓库的 @types 名称空间下面。

你可以像安装 npm 模块一样，安装外部库的类型注释。

```bash
$ npm install @types/jquery --save-dev
```

`@types/jquery`里面包括了模块类型和全局变量的类型。

你可以直接使用下面的语句。

```typescript
import * as $ from "jquery";
```

## es6-shim.d.ts 

如果代码编译成 ES5（`tsconfig.json`设成`"target": ES5`），但是代码会用到 ES6 的 API，并且希望 IDE 能够正确识别，可以引入`es6-shim.d.ts`。

```bash
$ npm install @types/es6-shim -D
```

`tsconfig.json`加入下面的设置。

```javascript
"types" : ["jquery", "es6-shim"]
```

另外一个新的垫片库是`core-js`。

## reference 命令

自己以前的项目可以自定义一个类型声明文件，比如`typings.d.ts`。

比如，你以前写过一个函数。

```typescript
function greeting(name) {
  console.log("hello " + name);
}
```

新项目要用到这个函数，你可以为这个函数单独写一个类型文件`src/typings.d.ts`。

```typescript
export function greeting(name: string): void;
```

然后，需要在用到这个库的脚本头部加上一行，用三斜杠语法告诉 TypeScript 类型声明文件的位置。

```typescript
/// <reference path="src/typings.d.ts" />
```

如果类型声明文件是随 NPM 安装的，那么`reference`语句的属性需要从`path`改成`type`。

```typescript
/// <reference types="some-library" />
```

## JavaScript 项目加入 TypeScript

如果现有的 JavaScript 项目需要加入 TypeScript，可以在`tsconfig.json`文件加入`"allowJs": true`设置，表示将 JS 文件一起复制到编译产物目录。

这时，TypeScript 不会对 JavaScript 脚本进行类型检查。如果你希望也进行类型检查，可以设置`"checkJs": true`。

另一种方法是在 JavaScript 脚本的第一行，加上注释`//@ts-check`，这时 TypeScript 也会对这个脚本进行检查。

打开`"checkJs": true`以后，如果不希望对有的 JavaScript 脚本进行类型检查，可以在该脚本头部加上`//@ts-ignore`。

You can also help tsc with type inference by adding the JSDoc annotations (such as
@param and @return) to your JavaScript code.
