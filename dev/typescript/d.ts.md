# d.ts 类型声明文件

## 简介

项目的类型定义可以写在一个单独的文件，这个文件就叫类型声明文件（declaration file），里面只有类型代码，没有具体的代码实现。

它的文件名固定为`[文件名].d.ts`的形式，其中的`d`表示 declaration（声明）。

类型声明文件一般有两个作用。

（1）正确处理 JavaScript 项目的类型。这对于导入 npm 模块很重要，因为 npm 模块都是 JavaScript 代码。

（2）正确使用 JavaScript 语言接口和外部环境 API（比如浏览器环境和 Node.js 环境）。

下面是一个简单例子，有一个类型声明文件`types.d.ts`。

```typescript
// types.d.ts
export interface Character {
  catchphrase?: string;
  name: string;
}
```

然后，就可以在 TypeScript 脚本里面导入该文件声明的类型。

```typescript
// index.ts
import { Character } from "./types.d.ts";

export const character:Character = {
  catchphrase: "Yee-haw!",
  name: "Sandy Cheeks",
};
```

类型声明文件主要有以下三种来源。

- TypeScript 语言内置的类型声明文件。
- 第三方类型声明文件，需要自己安装。
- 自己编写的类型声明文件。

### 内置声明文件

安装 TypeScript 语言时，会同时安装一些内置声明文件，主要是 JavaScript 语言接口和运行环境 API 的类型声明。

这些内置声明文件位于 TypeScript 语言安装目录的`lib`文件夹内，数量大概有几十个，下面是其中一些主要文件。

- lib.d.ts
- lib.dom.d.ts
- lib.es2015.d.ts
- lib.es2016.d.ts
- lib.es2017.d.ts
- lib.es2018.d.ts
- lib.es2019.d.ts
- lib.es2020.d.ts
- lib.es5.d.ts
- lib.es6.d.ts

这些内置声明文件的文件名统一为“lib.[description].d.ts”的形式，其中`description`部分描述了文件内容。比如，`lib.dom.d.ts`这个文件就描述了 DOM 结构的类型。

TypeScript 编译器会自动加载这些内置声明文件，所以不需要特别的配置。

### 第三方声明文件

如果项目中使用了外部的某个第三方代码库，那么就需要这个库的类型声明文件。

这时又分成三种情况。

（1）这个库自带了类型声明文件。

（2）这个库没有自带，但是可以找到社区制作的类型声明文件。

（3）找不到类型声明文件，需要自己写。

一般来说，如果这个库的源码包含了`[vendor].d.ts`文件，那么就自带了类型声明文件。其中的`vendor`表示这个库的名字，比如`moment`这个库就自带`moment.d.ts`。

### DefinitelyTyped 社区

第三方库如果没有提供类型声明文件，社区往往会提供。TypeScript 社区主要使用 [DefinitelyTyped 仓库](https://github.com/DefinitelyTyped/DefinitelyTyped)，各种类型声明文件都会提交到那里，已经包含了几千个第三方库。

TypeScript 官网有 DefinitelyTyped 的搜索入口，需要第三方声明文件的时候，就可以去 [www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) 搜搜看。

这些声明文件都会发布到 npm 的`@types`名称空间之下。比如，jQuery 的类型声明文件就放在`@types/jquery`这个库，安装这个库就可以了。

```bash
$ npm install @types/jquery --save-dev
```

执行上面的命令，`@types/jquery`这个库就安装到项目的`node_modules/@types/jquery`目录，里面的`index.d.ts`文件就是 jQuery 的类型声明文件。

然后，在`tsconfig.json`文件里面加上类型声明文件的位置。

```javascript
{
  "compilerOptions": {
    "types" : ["jquery"]
  }
}
```

上面设置中，`types`属性是一个数组，成员是所要加载的类型声明文件，要加载几个文件，就有几个成员，每个成员在子目录`node_modules/@types`下面都有一个自己的目录。

这样的话，你的项目加载 jQuery 时，编译器就会正确加载它的类型声明文件。

## declare 命令

`declare`为已经存在的变量声明类型，不能用来声明新的变量。declare 语句不会出现在编译后的文件里面。

`declare`命令用来声明类型。因为有些情况下，TypeScript 不能单独声明类型。

```typescript
declare let foo:string; 
```

上面语句声明`foo`变量的类型是字符串。

`declare`只能用来声明类型，不能有具体的实现，也不能有赋值。

```typescript
// 报错
declare let foo:string = 'hello'; 
```

上面的`declare`语句有具体的赋值，就会报错。

类型声明文件里面，变量的类型声明语句必须使用`declare`命令，否则会报错。

而且，类型声明文件声明的变量是全局的。

interface 类型有没有`declare`都可以。

```typescript
interface Foo {} // 正确
declare interface Foo {} // 正确
```

declare 文件里面可以声明全局作用域。

```typescript
declare global {
// (global context)
}
```

类型声明文件里面，可以使用`export`命令。

```typescript
export interface Data {
  version: string;
}
```

有了类型声明文件，可以使用三斜杠语法进行加载。

## 自定义类型声明文件

有时实在没有第三方库的类型声明文件，你可以告诉 TypeScript 相关对象的类型是`any`。比如，使用 jQuery 的脚本可以写成下面这样。

```typescript
declare var $: any 
```

上面代码表示，jQuery 的`$`对象是外部引入的，类型是`any`，也就是 TypeScript 不用对它进行类型检查。



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

## package.json

TypeScript扩展了“package.json”文件，增加了typings属性和types属性。虽然两者的名字不同，但是作用相同，它们都用于指定当前npm包提供的声明文件。

```typescript
{
    "name": "my-package",
    "version": "1.0.0",
    "main": "index.js",
    "typings": "index.d.ts"
}
```

此例中，使用typings属性定义了“my-package”包的声明文件为“index.d.ts”文件。当TypeScript编译器进行模块解析时，将会读取该属性的值并使用指定的“index.d.ts”文件作为声明文件。这里我们也可以将typings属性替换为types属性，两者是等效的。

如果一个npm包的声明文件为“index.d.ts”且位于npm包的根目录下，那么在“package.json”文件中也可以省略typings属性和types属性，因为编译器在进行模块解析时，若在“package.json”文件中没有找到typings属性和types属性，则将默认使用名为“index.d.ts”的文件作为声明文件。

在TypeScript 3.1版本中，编译器能够根据当前安装的TypeScript版本来决定使用的声明文件，该功能是通过“package.json”文件中的typesVersions属性来实现的。

```javascript
{
    "name": "my-package",
    "version": "1.0.0",
    "main": "index.js",
    "typings": "index.d.ts",
    "typesVersions": {
        ">=3.7": {
            "*": ["ts3.7/*"]
        },
        ">=3.1": {
            "*": ["ts3.1/*"]
        }
    }
}
```

此例中，我们定义了两个声明文件匹配规则：

▪第7行，当安装了TypeScript 3.7及以上版本时，将使用“ts3.7”目录下的声明文件。

▪第10行，当安装了TypeScript 3.1及以上版本时，将使用“ts3.1”目录下的声明文件。

需要注意的是，typesVersions中的声明顺序很关键，编译器将从第一个声明（此例中为">=3.7"）开始尝试匹配，若匹配成功，则应用匹配到的值并退出。因此，若将此例中的两个声明调换位置，则会产生不同的结果。

此外，如果typesVersions中不存在匹配的版本，如当前安装的是TypeScript 2.0版本，那么编译器将使用typings属性和types属性中定义的声明文件。

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

## 自定义声明文件

如果使用的第三方代码库没有提供内置的声明文件，而且在DefinitelyTyped仓库中也没有对应的声明文件，那么就需要开发者自己编写一个声明文件。

如果我们不想编写一个详尽的声明文件，而只是想要跳过对某个第三方代码库的类型检查，则可以使用下面介绍的方法。

如果为 jQuery 创建一个“.d.ts”声明文件，例如“jquery.d.ts”。“jquery.d.ts”声明文件的内容如下：

```typescript
declare module 'jquery';
```

此例中的代码是外部模块声明，该声明会将jquery模块的类型设置为any类型。jquery模块中所有成员的类型都成了any类型，这等同于不对jQuery进行类型检查。

“typings.d.ts”文件的内容如下：

```typescript   
declare module 'mod' {
  export function add(x: number, y: number): number;
}
```

在“a.ts”文件中，可以使用非相对模块导入语句来导入外部模块“mod”。示例如下：

```typescript
import * as Mod from 'mod';

Mod.add(1, 2);
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
