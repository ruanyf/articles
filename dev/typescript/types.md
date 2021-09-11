# TypeScript 的数据类型

TypeScript 提供的数据类型，可以分成两大类。

一类是 JavaScript 原有的类型。

- undefined, null
- boolean, number,string
- symbol
- object

另一类是 TypeScript 特有的类型。

- Array (not technically a type in JS)
- any (the type of all values)
- Etc.

注意，undefined 既可以作为值，也可以作为类型，取决于在哪里使用它。对于 null 也是如此。

上面的基本类型，还可以组合成复杂类型。

## 类型别名

`type`命令可以用来为现有类型指定别名。

```typescript
type Age = number;
const age: Age = 82;
```

上面示例中，`Age`就是类型`number`的别名。

## 数组

TypeScript 的数组包含两种类型的数据。

- 列表（list）：所有成员都是同一种类型，数组的长度可以变化。
- 元组（tuple）：成员可以是不同类型，数组的长度是固定。

### 列表

列表有两种方法表示类型。

```typescript
// 方法一
let arr: number[] = [];

// 方法二
let arr: Array<number> = [];
```

上面两种写法，都表示变量`arr`是一个数组，而且所有成员都是数值。

### 元组

元组的表示方法如下。

```typescript
let point: [number, number] = [7, 5];
```

上面示例中，变量`point`必须使用类型注释，否则根据类型推断，TS 会把变量`point`当作数值的列表。

## 函数

描述函数的类型，需要给出参数类型和返回值类型。

下面是一个简单函数。

```typescript
const func = (num) => String(num);
```

上面示例中，`num`是参数，`func`是一个函数，为它们添加类型注释，写法如下。

```typescript
const func: (num: number) => string =
  (num: number) => String(num);
```

可以看到，函数本身的类型采用下面的写法表示。

```typescript
(num: number) => string
```

就这个例子而言，函数本身不需要加上类型注释，因为 TS 可以推断出来。

```typescript
const func = (num: number) => String(num);
```

如果参数还是一个函数，类型注释写法如下。

```typescript
function stringify(callback: (num: number) => string): string {
  return callback(123);
}
```

上面示例中，`stringify()`的返回值可以推断出来，所以返回值类型可以省略。

```typescript
function stringify(callback: (num: number) => string) {
  return callback(123);
}
```

如果函数没有返回值，则写为 void。

```typescript
function f1(): void { return undefined } // explicit return
function f2(): void { } // implicit return
function f3(): void { return 'abc' } // error
```

参数后面的问号，表示该参数是可选的。

```typescript
function stringify123(callback?: (num: number) => string) {
  if (callback === undefined) {
    callback = String;
  }
  return callback(123);
}
```

参数默认值的类型注释，写法如下。

```typescript
function createPoint(x:number = 0, y:number = 0): [number, number] {
  return [x, y];
}
```

rest 参数的类型注释，必须是一个数组，写法如下。

```typescript
function joinNumbers(...nums: number[]): string {
  return nums.join('-');
}
```

## Union 类型

Union 类型用来表示，一个变量可以是多种类型的情况。

```typescript
function getScore(numberOrString: number|string): number {
  // ...
}
```

TypeScript 里面，null 和 undefined 是单独的类型。如果一个变量有可能是 null，必须单独把它列出。

```typescript
let maybeNumber: null|number = null;
maybeNumber = 123;
```

有些函数的参数不是可选的，如果不传入值，就必须显式传入 null，类型注释写法如下。

```typescript
function stringify123(
  callback: null | ((num: number) => string)
) {
  const num = 123;
  if (callback) {
    return callback(123); 
  }
  return String(num);
}
```

## 对象

对象的类型描述，可以使用接口（interface）。

```typescript
interface Point {
  x: number;
  y: number;
}
```

属性也可以使用分号结尾。

```typescript
interface Point {
  x: number,
  y: number,
}
```

下面是对象使用接口定义类型的例子。

```typescript
interface Point {
  x: number;
  y: number;
}
function pointToString(pt: Point) {
  return `(${pt.x}, ${pt.y})`;
}
```

方法也可以在接口中描述。

```typescript
interface Point {
  x: number;
  y: number;
  distance(other: Point): number;
}
```

类型系统不区分方法和属性。

```typescript
interface Num1 {
  value: number;
  square(): number;
}
interface Num2 {
  value: number;
  square: () => number;
}

const num1 = {
  value: 3,
  square() {
    return this.value ** 2;
  }
};
const num2 = {
  value: 4,
  square: () => {
    return num2.value ** 2;
  }
};

const n11: Num1 = num1;
const n21: Num2 = num1;
const n12: Num1 = num2;
const n22: Num2 = num2;
```

对象也可以使用字面量描述类型。

```typescript
function pointToString(pt: {x: number, y: number}) {
  return `(${pt.x}, ${pt.y})`;
}
```

如果某个属性是可选属性，属性名后面可以加一个问号表示。

```type
interface Person {
  name: string;
  company?: string;
}
···