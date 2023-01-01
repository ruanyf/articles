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

TypeScript 模块的基本用法，与 ES6 模块是一样的，这部分就不详细介绍了，可以参考 ES6 教程。

TypeScript 模块的特别之处在于，允许输出和输入类型。

```typescript
export type Bool = true | false;
```

上面示例输入一个类型别名`Bool`，也可以拆成两行。

```typescript
type Bool = true | false;

export { Bool };
```

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

## importsNotUsedAsValues

输入类型的 import 语句，编译时怎么处理？

TypeScript 提供了`importsNotUsedAsValues`编译设置项，有三个可能的值。

（1）`remove`：这是默认值，自动删除输入类型的 import 语句。

（2）`preserve`：保留输入类型的 import 语句。

（3）`error`：保留输入类型的 import 语句（与`preserve`相同），但是必须写成 import type 的形式，否则报错。

请看示例，下面是一个输入类型的 import 语句。

```typescript
import { TypeA } from './a.js';
```

上面示例中，`TypeA`是一个类型。

`remove`的编译结果会将该语句删掉。

`preserve`的编译结果会保留该语句，但会把删掉类型的部分。

```typescript
import './a.js';
```

上面示例中，编译后的 import 语句不从`a.js`输入任何接口，但是会引发`a.js`的执行，因此会保留`a.js`里面的副作用。

`error`的结果与`preserve`相同，但是编译过程会报错，因为输入类型的 import 语句必须写成 import type 的形式。原始语句改成下面的形式，就不会报错。

```typescript
import type { TypeA } from './a.js';
```

## CommonJS 模块

CommonJS 是 Node.js 的专用模块格式，与 ES 模块格式不兼容。

### import = 语句

TypeScript 使用 import = 语句输入 CommonJS 模块。

```typescript
import fs = require('fs');
const code = fs.readFileSync('hello.ts', 'utf8');
```

上面示例中，使用 import = 语句和`require()`命令输入了一个 CommonJS 模块。模块本身的用法跟 Node.js 是一样的。

### export = 语句

TypeScript 使用 export = 语句，输出 CommonJS 模块的对象，等同于 CommonJS 的`module.exports`对象。

```typescript
let obj = { foo: 123 };

export = obj;
```

export = 语句输出的对象，只能使用 import = 语句加载。

```typescript
import obj = require('./a');

console.log(obj.foo); // 123
```

## 模块定位

模块定位（module resolution）指的是确定 import 语句和 export 语句里面的模块文件位置。

模块定位有两种方法，一种称为经典方法（classic），另一种称为 Node 方法。如果编译设置的参数`module`没有设为`commonjs`（即设成 amd、system、umd、es2015、esnext 等值），则采用经典方法，否则采用 Node 方法（复制 Node.js 的模块定位方法，并加入了`.ts`文件和`.d.ts`文件）。

```bash
$ tsc demo.ts

# 或者
$ tsc --module commonjs demo.ts
```

上面命令在编译时，没有给出`module`参数，或者指定`--module commonjs`，这时就会采用 Node 方法进行模块定位。

模块导入分为相对导入和非相对导入。

相对导入指的是给出路径信息的模块，即以`/`、`./`、`../`开头的路径。

- import Entry from "./components/Entry";
- import { DefaultHeaders } from "../constants/http";
- import "/mod";

非相对导入指的是不带有路径信息的模块。

- import * as $ from "jquery";
- import { Component } from "@angular/core";

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

### Node 策略

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

## 参考链接

- [tsconfig 之 importsNotUsedAsValues 属性](https://blog.51cto.com/u_13028258/5754309)
