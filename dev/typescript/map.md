# Map 结构

TypeScript 使用 Map 类型，描述 Map 结构。

```typescript
const myMap: Map<boolean,string> = new Map([
  [false, 'no'],
  [true, 'yes'],
]);
```

Map 是一个泛型，使用时，比如给出类型变量。

由于存在类型推断，也可以省略类型参数。

```typescript
const myMap = new Map([
  [false, 'no'],
  [true, 'yes'],
]);
```