# 数组的类型

如果数组可以放各种类型的数据，则可以使用`any`表示成员的类型。

```typescript
arr: any[]
```

## 扩展运算符

扩展运算符（`...`）只能用于元组和 rest 数组，用于普通数组会报错。

```typescript
const args = [8, 5];

// 报错
const angle = Math.atan2(...args);
```

最简单的解决方法如下。

```typescript
// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);
```

## Tuple

Tuple（元组）是一种特殊类型的数组，明确定义了包含了多少个成员，以及每个成员的类型。

```typescript
// 例一
type StringNumberPair = [string, number];

// 例二
function doSomething(pair: [string, number]) {
  const a = pair[0];    
  const b = pair[1];

}
 
doSomething(["hello", 42]);
```

元祖也可以使用 readonly 修饰符。

```typescript
function doSomething(pair: readonly [string, number]) {
  // ...
}

function doSomething(pair: readonly [string, number]) {
  // 报错
  pair[0] = "hello!";
}
```

只读元组可以用 `as const`替代`readonly`。另外,只读的元组不能替代普通元组

```typescript
let point = [3, 4] as const;
 
function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}
 
// 报错
distanceFromOrigin(point);
```

元祖成员后面可以加号，表示这个成员是可选的。注意，问号只能用于元祖的尾部成员。

```typescript
type Either2dOr3d = [number, number, number?];
 
function setCoordinate(coord: Either2dOr3d) {

// const z: number | undefined
  const [x, y, z] = coord;
              
// (property) length: 2 | 3
 
console.log(`Provided coordinates had ${coord.length} dimensions`);
}
```

元组内部的成员，也能使用扩展运算符。但是，扩展运算符作用的成员类型，只能是数组或另一个元组。

```typescript
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

const a: StringNumberBooleans = ["hello", 1];
const b: StringNumberBooleans = ["beautiful", 2, true];
const c: StringNumberBooleans = ["world", 3, true, false, true, false, true];
```

这种语法的一个作用是描述 rest 参数。

```typescript
function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  // ...
}

// 等同于
function readButtonInput(name: string, version: number, ...input: boolean[]) {
  // ...
}
```