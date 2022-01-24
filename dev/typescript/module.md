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

import 加载接口时，还可以使用`type`前缀，区分加载的是变量，还是类型。

```typescript
import { createCatName, type Cat, type Dog } from "./animal.js";
```

这种写法有一个好处，就是使得外部的编译器（比如 Babel、swc、esbuild）可以简单地区分，哪些接口是变量，哪些接口是类型。