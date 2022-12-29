# TypeScript 模块

## 简介

任何包含 import 或 export 语句的文件，就是一个模块（module）。另一方面，如果文件不包含 export 语句，就是一个全局的脚本文件。

模块本身就是一个作用域，不属于全局作用域。模块内部的变量、函数、类，都在模块内部可见，对于模块外部是不可见的。

import 语句用于从外部输入其他模块的接口，export 语句用于给出当前模块的外部接口。

如果一个文件不包含 export 语句，但是你希望它当作一个模块，可以在文件中添加一行语句。

```typescript
export {};
```

上面这行语句不产生任何实际作用，但会让当前文件被当作模块处理。

TypeScript 模块的用法，与 ES6 模块是一样的，这部分就不详细介绍了，可以参考 ES6 教程。

TypeScript 模块的一个特别之处在于，允许输出和输入类型。

```typescript
export type Bool = true | false;
```

上面示例输入一个类型别名`Bool`。

假定上面的模块文件为`a.ts`，另一个文件`b.ts`就可以使用 import 语句，输入这个类型。

```typescript
import { Bool } from './a.js';

let foo:Bool = true;
```

上面示例中，import 语句加载的是一个类型。注意，它是从文件`a.js`加载，而不是从`a.ts`加载，因为在代码运行环境是 JS 环境，所以要写成从 JS 文件加载，否则报错。

编译时，可以两个脚本同时编译。

```bash
$ tsc a.ts b.ts
```

上面命令会将`a.ts`和`b.ts`分别编译成`a.js`和`b.js`。

也可以只编译`b.ts`，因为它是入口脚本，tsc 会自动编译它依赖的所有脚本。

```bash
$ tsc b.ts
```

上面命令发现`b.ts`依赖`a.js`，就会自动寻找`a.ts`，也将其同时编译，因此编译产物还是`a.js`和`b.js`两个文件。

## import type 语句

import 在一条语句中，可以同时输入类型和正常接口。

```typescript
// a.ts
export interface A {
  foo: string;
}

export let a = 123;

// b.ts
import { A, a } from './a.js';
```

上面示例中，文件`a.ts`的 export 语句输出了一个类型`A`和一个正常接口`a`，另一个文件`b.ts`则在同一条语句中输入了类型和正常接口。

这样很不利于区分类型和正常接口，容易造成混淆。为了解决这个问题，TypeScript 引入了两个解决方法。

第一个方法是在 import 语句输入的类型前面加上`type`关键字。

```typescript
import { type A, a } from './a.js';
```

上面示例中，import 语句输入的类型`A`前面有`type`关键字，表示这是一个类型。     

第二个方法是使用 import type 语句，这个语句只能输入类型，不能输入正常接口。

```typescript
// 正确
import type { A } from './a.js';

// 报错
import type { a } from './a.js';
```

上面示例中，import type 输入类型`A`是正确的，但是输入正常接口`a`就会报错。

import type 语句也可以输入默认类型。

```typescript
import type DefaultType from 'moduleA';
```

import type 在一个名称空间下，输入所有类型的写法如下。

```typescript
import type * as TypeNS from 'moduleA';
```

同样的，export 语句也有两种方法，表示输出的是类型。

```typescript
type A = 'a';
type B = 'b';

// 方法一
export {type A, type B};

// 方法二
export type {A, B};
```

上面示例中，方法一是使用`type`关键字作为前缀，表示输出的是类型；方法二是使用 export type 语句，表示整行输出的都是类型。

下面是 export type 将一个类作为类型输出的例子。

```typescript
class Point {
  x: number;
  y: number;
}

export type { Point };
```

上面示例中，由于使用了 export type 语句，输出的并不是 Point 这个类，而是 Point 代表的实例类型。输入时，只能作为类型输入。

```typescript
import type { Point } from './module.js';

const p:Point = { x: 0, y: 0 };
```

上面示例中，`Point`只能作为类型输入，不能当作正常接口使用。



对于常规的import语句，编译器提供了`--importsNotUsedAsValues`编译选项来精确控制在编译时如何处理import type 语句。该编译选项接受以下三个可能的值：

- "remove"（默认值）。该选项是编译器的默认行为，它自动删除只和类型相关的import语句。
- "preserve"。该选项会保留所有import语句。
- "error"。该选项会保留所有import语句，发现可以改写为“import type”的import语句时会报错。

import 加载接口时，接口还可以使用`type`前缀，区分加载的是变量，还是类型。

```typescript
import { createCatName, type Cat, type Dog } from "./animal.js";
```

这种写法有一个好处，就是使得外部的编译器（比如 Babel、swc、esbuild）可以简单地区分，哪些接口是变量，哪些接口是类型。

## export =，import = require()

为了兼容 CommonJS 模块格式，TypeScript 提供了两种特殊语法。

`export =`用来输出一个对象，等同于 CommonJS 里面的`exports`对象。

```typescript
let numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
export = ZipCodeValidator;
```

`export =`输出的对象，只能使用`import = require()`语法加载。

```typescript
import zip = require("./ZipCodeValidator");
```

## 模块定位

模块导入分为相对导入和非相对导入。

相对导入指的是给出路径信息的模块，即以`/`、`./`、`../`开头的路径。

- import Entry from "./components/Entry";
- import { DefaultHeaders } from "../constants/http";
- import "/mod";

非相对导入指的是不带有路径信息的模块。

- import * as $ from "jquery";
- import { Component } from "@angular/core";

模块定位有两种策略。一种是经典策略（classic），另一种是 Node.js 策略（node.js）。默认采用 Node.js 策略，编译时不给出 module 参数，或者指定`--module commonjs`。如果要使用经典策略，则编译时`module`参数需要指定为其他值（amd、system、umd、es2015、esnext 等）。

### 经典策略

相对导入中，模块位置根据当前脚本文件的位置进行计算。比如，源文件`/root/src/folder/A.ts`有一行代码`import { b } from "./moduleB"`，这时 TypeScript 会从以下位置获取 moduleB。

- /root/src/folder/moduleB.ts
- /root/src/folder/moduleB.d.ts

非相对导入则是从源文件所在目录一层层向上查找模块。还是以上面的`import { b } from "./moduleB"`为例，TypeScript 会按照以下顺序查找 moduleB。

- /root/src/folder/moduleB.ts
- /root/src/folder/moduleB.d.ts
- /root/src/moduleB.ts
- /root/src/moduleB.d.ts
- /root/moduleB.ts
- /root/moduleB.d.ts
- /moduleB.ts
- /moduleB.d.ts

### Node.js 策略

Node.js 策略就是使用 Node.js 的模块加载策略。

相对导入依然是参考源文件所在目录，进行计算。比如，源文件`/root/src/moduleA.js`有一行`var x = require("./moduleB");`，Node.js 按以下顺序导入模块 moduleB。

1. 文件 /root/src/moduleB.js 是否存在。
1. 文件`/root/src/moduleB/package.json`里面，`main`属性是否指定了入口文件（比如`{ "main": "lib/mainModule.js" }`。
1. 文件`/root/src/moduleB/`是否存在。

非相对导入则是从当前目录开始，逐级向上寻找是否存在子目录`node_modules`。比如，源文件`/root/src/moduleA.js`有一行`var x = require("moduleB");`，Node.js 会按以下顺序导入模块 moduleB。

1. /root/src/node_modules/moduleB.js
1. /root/src/node_modules/moduleB/package.json（查找是否有属性 main）
1. /root/src/node_modules/moduleB/index.js
1. /root/node_modules/moduleB.js
1. /root/node_modules/moduleB/package.json（查找是否有属性 main）
1. /root/node_modules/moduleB/index.js
1. /node_modules/moduleB.js
1. /node_modules/moduleB/package.json（查找是否有属性 main）
1. /node_modules/moduleB/index.js

上面顺序中，第4步和第7步都是进入了上一级目录。

TypeScript 则是这样加载模块，比如源文件`/root/src/moduleA.ts`有一行`import { b } from "./moduleB"`。TypeScript 会按照下面顺序加载模块 moduleB。

1. /root/src/moduleB.ts
1. /root/src/moduleB.tsx
1. /root/src/moduleB.d.ts
1. /root/src/moduleB/package.json（查找是否有 types 属性）
1. /root/src/moduleB/index.ts
1. /root/src/moduleB/index.tsx
1. /root/src/moduleB/index.d.ts

非相对导入的加载顺序如下，。将遵循 Node.js 解析逻辑，首先查找文件，然后查找适用的文件夹。源文件`/root/src/moduleA.ts`有一行`import { b } from "moduleB";`，会按照如下顺序加载模块 moduleB。

1. /root/src/node_modules/moduleB.ts
1. /root/src/node_modules/moduleB.tsx
1. /root/src/node_modules/moduleB.d.ts
1. /root/src/node_modules/moduleB/package.json（查找是否有 types 属性）
1. /root/src/node_modules/@types/moduleB.d.ts
1. /root/src/node_modules/moduleB/index.ts
1. /root/src/node_modules/moduleB/index.tsx
1. /root/src/node_modules/moduleB/index.d.ts
1. /root/node_modules/moduleB.ts
1. /root/node_modules/moduleB.tsx
1. /root/node_modules/moduleB.d.ts
1. /root/node_modules/moduleB/package.json（查找是否有 types 属性）
1. /root/node_modules/@types/moduleB.d.ts
1. /root/node_modules/moduleB/index.ts
1. /root/node_modules/moduleB/index.tsx
1. /root/node_modules/moduleB/index.d.ts
1. /node_modules/moduleB.ts
1. /node_modules/moduleB.tsx
1. /node_modules/moduleB.d.ts
1. /node_modules/moduleB/package.json（如果它指定了一个types属性）
1. /node_modules/@types/moduleB.d.ts
1. /node_modules/moduleB/index.ts
1. /node_modules/moduleB/index.tsx
1. /node_modules/moduleB/index.d.ts

上面的步骤虽然数量很多，但只是每一个子目录要检查的文件多了，只在第9步和第17步进入上一级子目录。

