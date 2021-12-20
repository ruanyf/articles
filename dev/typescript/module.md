# 模块

模块里面可以输出类型。

```typescript
export type SomeType = {
  foo: string;
};
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
```