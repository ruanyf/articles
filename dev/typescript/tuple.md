# TypeScript 的元组类型

## 简介

元组（tuple）是 TypeScript 独有的数据类型，代表了成员类型不同的 JavaScript 数组。

元组必须明确声明每个成员的类型，以及包含多少个成员。

```typescript
const s:[string, string, boolean]
  = ['a', 'b', true];
```

元组的声明正好与数组相反，数组是类型写在方括号外面（`number[]`），元组是类型写在方括号里面（`[number]`）。

```typescript
let a:[number] = [1];
```

上面示例中，变量`a`是一个元组，只有一个成员，类型是`number`。

元组也可以有可选成员。

```typescript
let a:[number, number?] = [1];
```

上面示例中，元组`a`的第二个成员就是可选的。

元组也可以使用扩展运算符（`...`），包含不定数量的成员。

```typescript
type NamedNums = [
  string,
  ...number[]
];

const a:NamedNums = ['A', 1, 2];
const b:NamedNums = ['B', 1, 2, 3];
```

上面示例中，元组类型`NamedNums`的第一个成员是字符串，后面的成员使用扩展运算符展开一个数组，从而实现了不定数量的成员。

如果不确定元组成员的类型和数量，可以写成下面这样。

```typescript
type Tuple = [...any[]];
```

上面示例中，元组`Tuple`可以放置任意数量和类型的成员。但是这样写，也就失去了使用元组和 TypeScript 的意义。

元组也可以是只读的，不允许修改，有两种写法。

```typescript
// 写法一
type t = readonly [number, string]

// 写法二
type t = Readonly<[number, string]>
```

上面示例中，两种写法都可以得到只读元组，其中写法二是一个泛型，用到了工具类型`Readonly<T>`。

元组类型也可以通过`interface`命令定义。

```typescript
interface Tuple {
 0: number;
 1: number;
 length: 2;
}
const t:Tuple = [10, 20]; // 正确
```

上面示例中，`interface`命令定义了一个元组，成员包括从`0`开始的每个数字键，以及`length`属性。但是，这样会丢失所有数组方法（比如`concat()`），所以不建议这样使用。

元组成员的读取跟数组是一样的，也是通过方括号读取。

```typescript
type Tuple = [string, number]
type Age = Tuple[1]
```

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

由于元组也是 JavaScript 的数组，所以它也可以数值键读取。

```typescript
type Tuple = [string, number, Date];
type TupleEl = Tuple[number];  // 类型是 string|number|Date
```

上面示例中，`Tuple[number]`表示元组`Tuple`的每个数字键的类型，所以返回`string|number|Date`。

元祖也可以声明成只读元组。

```typescript
// 写法一
const p1:readonly [number, number] = [0, 0];

// 写法二
const p2:Readonly<[number, number]> = [0, 0];
```

上面两种写法都声明了只读元组，修改元组成员就会报错。

只读元组可以用 `as const`替代`readonly`。另外,只读的元组不能替代普通元组

```typescript
let point = [3, 4] as const;
 
function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}
 
// 报错
distanceFromOrigin(point);
```

元祖成员后面可以加号，表示这个成员是可选的。注意，问号只能用于元祖的尾部成员，也就是说，所有可选成员必须在必选成员之后。

```typescript
type myTuple = [number, number, number?, string?];
```

上面示例中，元组`myTuple`的最后两个成员是可选的。也就是说，两个成员、三个成员、四个成员都有可能。

元组的成员其实也可以写成不定数量，那就是使用 扩展运算符（`...`），将不定数量的成员都用一个数组表示。

```typescript
[...T[]]
```

下面是一个例子。

```typescript
const myTuple:[number, ...string[]]
  = [0, 'a', 'b'];
```

上面示例中，元组的第一个成员是数值，后面有多少个成员都可以，只要都是字符串。

扩展运算符用在元组的任意位置都可以。

```typescript
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
```

上面示例中，扩展运算符分别在元组的尾部、中部和头部。

函数的 rest 参数，就常常用这种语法来表示类型。

```typescript
function readButtonInput(
  ...args:[string, number, ...boolean[]]
) {
  const [name, version, ...input] = args;
  // ...
}

// 等同于
function readButtonInput(
  name: string,
  version: number,
  ...input: boolean[]
) {
  // ...
}
```

上面示例中，函数`readButtonInput()`的参数类型完全可以用元组表示，哪怕参数数量是不确定的。

如果没有可选成员和扩展运算符，TypeScript 会推断出元组的成员数量。

```typescript
function f(point: [number, number]) {
  if (point.length === 3) {  // 报错
    // ...
  }
}
```

上面示例会报错，原因是 TypeScript 发现元组`point`的长度是`2`，不可能等于`3`。

如果包含了可选参数，TypeScript 会推断出可能的成员数量。

```typescript
const myTuple:[...string[]] = ['a', 'b', 'c'];
console.log(typeof myTuple.length) // number
```

上面示例会报错，原因是 TypeScript 发现`myTuple.length`的类型是`1|2|3`，不可能等于`4`。

如果使用了扩展运算符，TypeScript 只会推断出元组的成员数量是一个数值（number）。

```typescript
const myTuple = [...string[]];
console.log(typeof myTuple.length) // number
```

TypeScript 数组是元组的子类型，所以后者可以赋值给前者，反之则不行。

```typescript
const point: [number, number] = [0, 0];
const nums: number[] = point; // 正确
```

只读元组是元组的子类型，只读数组是只读数组的子类型。

```typescript
const t: [number, number] = [0, 0];
const rt: readonly [number, number] = t; 
const rar:readonly number[] = rt;
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
