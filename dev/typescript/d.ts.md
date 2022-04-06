# d.ts 文件

TypeScript 项目免不了引入第三方库，有些第三方库没有类型注释，是单纯的 JavaScript 库。这时就需要声明一个`vendor.d.ts`文件，声明第三方库的类型。这里的 d 表示 declaration（声明）。比如，加载 jQuery，可以新建一个`jquery.d.ts`文件。

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


