# 模块

TypeScript 模块允许输出类型。

```typescript
export type SomeType = {
  foo: string;
};

export type Cat = { breed: string; yearOfBirth: number };
 
export interface Dog {
  breeds: string[];
  yearOfBirth: number;
}
```

类型可以跟正常变量一起输出。

```typescript
let someVar = 123;
type SomeType = {
  foo: string;
};
export {
  someVar,
  SomeType
};
```

`import`命令可以用来输入类型。

```typescript
import { someVar, SomeType } from './foo.ts';

import { Cat, Dog } from "./animal.ts";
```

TypeScript 还允许使用 `import type`，指明输入的是类型。

```typescript
export type Cat = { breed: string; yearOfBirth: number };
export type Dog = { breeds: string[]; yearOfBirth: number };

import type { Cat, Dog } from "./animal.ts";
```

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

