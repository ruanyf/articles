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