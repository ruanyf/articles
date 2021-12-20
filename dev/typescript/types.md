# TypeScript 的数据类型

## 类型描述

TypeScript 提供的数据类型，可以分成两大类。

一类是 JavaScript 原有的类型。TypeScript 为内置类型提供了相应的原始类型：

- number：数值，包括整数和浮点数。
- string：字符串
- boolean：布尔值，包括`true`和`false`两个值
- bigint
symbol
null
undefined
object

注意，上面所有类型的名称都是小写字母，首字母大写的`Number`、`String`、`Boolean`都是语言内置的对象，而不是类型名称。

另一类是 TypeScript 特有的类型。

- Array (not technically a type in JS)
- any (the type of all values)
- unknown（确保有人使用这种类型声明类型是什么）
- never（这种类型不可能发生）
- void：函数返回 undefined 或者没有返回值

unknown	顶级类型。
never	底部类型。
对象字面量	例如 { property: Type }
void	undefined打算用作返回类型的子类型。
T[]	可变数组，也写成 Array<T>
[T, T]	元组，它们是固定长度但可变的
(t: T) => U	函数

注意，undefined 既可以作为值，也可以作为类型，取决于在哪里使用它。对于 null 也是如此。

上面的基本类型，还可以组合成复杂类型。

对于复合数据结构的类型描述，TypeScript 提供了两种语法：interface 和 type。

## any

`any`表示这个值可以是任意类型。

如果一个变量的类型是`any`，表示可以访问它的任意属性，或者像函数一样调用它，或者将它分配给（或从）任何类型的值。

```typescript
let obj: any = { x: 0 };

// 下面行都不会报错
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

如果开发者不指定变量类型，并且 TypeScript 不能从上下文推断出变量类型时，编译器就会默认该变量类型为`any`。

将一个变量的类型设为`any`，实际上关闭了对它的类型检查。

## 类型声明

脚本的头部，声明类型定义。

```typescript
class Foo {};
interface Bar {};
type Bas = {};
```

声明了类型以后，就可以在类型注释中，使用该类型。

```typescript
var foo: Foo;
var bar: Bar;
var bas: Bas;
```



## 类型别名

`type`命令可以用来为现有类型指定别名。

```typescript
type Age = number;
const age: Age = 82;
```

上面示例中，`Age`就是类型`number`的别名。

type 命令可以为任何类型起别名。

```typescript
type ID = number | string;
```

## 类型联合

如果一个值可能有多种类型，可以使用`|`运算符进行类型描述。

```typescript
function getLength(obj: string | string[]) {
  return obj.length;
}
```

下面示例中，`toUpperCase()`是字符串才有的方法，数值类型没有这个方法，所以会报错。

```typescript
function printId(id: number | string) {
  console.log(id.toUpperCase()); // 报错
}
```

解决方法是对参数做一下类型判断。

```typescript
function printId(id: number | string) {
  if (typeof id === "string") {
    // 只对字符串，执行 toUpperCase() 方法
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```

函数的返回值也可以是类型联合。

```typescript
function getFirstThree(x: number[] | string): number[] | string {
  return x.slice(0, 3);
}
```

上面示例中，函数体内的`slice()`方法是数组与字符串共有的，所以返回值也是`number[] | string`类型。

除了联合，TypeScript 还有交集：

```typescript
type Combined = { a: number } & { b: string };
type Conflicting = { a: number } & { a: string };
```

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

注意，函数类型描述必须包含参数。

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

对象的类型注释，写法如下。

```typescript
let o: { n: number; xs: object[] } = { n: 1, xs: [] };

function pointToString(pt: {x: number, y: number}) {
  return `(${pt.x}, ${pt.y})`;
}
```

可选属性可以在属性名后加一个问号`?`。

```typescript
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

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

interface User {
  name: string;
  id: number;
}

const user: User = {
  name: "Hayes",
  id: 0,
};
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

如果某个属性是可选属性，属性名后面可以加一个问号表示。

```type
interface Person {
  name: string;
  company?: string;
}
```

还可以使用 type 关键字为对象起别名。

```typescript
type Point = {
  x: number;
  y: number;
};
 
function printCoord(pt: Point) {
  console.log(pt.x);
  console.log(pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

### interface 与 type 的区别

interface 与 type 很大程度上，作用是相同的，可以换用。唯一的区别是， type 定义的类型别名，无法添加属性，而 interface 可以扩展。

（1）扩展新类型

interface 扩展的例子。

```typescript
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear() 
bear.name
bear.honey
```

type 定义的类型别名想要扩展，只能重新定义一个新的别名。

```typescript
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}

const bear = getBear();
bear.name;
bear.honey;
```

## 类

类的类型可以在类的内部描述。

```typescript
class UserAccount {
  name: string;
  id: number;
 
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

interface User {
  name: string;
  id: number;
}

const user: User = new UserAccount("Murphy", 1);
```

类除了内部的类型描述，通常还需要使用 interface，定义一个返回值的类型。

由于类包含了类型描述，因此直接当作一种类型。

```typescript
class Empty {}
 
function fn(arg: Empty) {
  // do something?
}
```

## 命名类型

命名类型用来给类型起名字。

有三种方法可以为类型起名字。

- interface
- type
- class

```typescript
type One = { p: string };
interface Two {
  p: string;
}
class Three {
  p = "Hello";
}
 
let x: One = { p: "hi" };
let two: Two = x;
two = new Three();
```

### type

type 关键字可以定义一个类型，包含多种类型。

```typescript
type MyBool = true | false;
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
```

`type`可以用来描述数组。

```typescript
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```

## 泛型

泛型为类型提供变量。一个常见的例子是数组。没有泛型的数组可以包含任何东西。带有泛型的数组可以描述数组包含的值。

可以自己定义泛型。

```typescript
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
```

## 类型匹配

只要对象具有相同的属性，TypeScript 就会认为它们属于相同的类型。

```typescript
interface Point {
  x: number;
  y: number;
}
 
function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
 
// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);

const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"
 
const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"
```

## 类型断言

有时，可以指定为浏览器已经提供的类型。

```typescript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// 或者
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

类型可以是具体的字符串。

```typescript
let x: "hello" = "hello";
// OK
x = "hello";
// 报错
x = "howdy";
```

上面示例中，类型是字符串“hello”。

字符串或数字的联合也是一种类型。

```typescript
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}

function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

类型注释中，字符串也可以与其他类型混用。

```javascript
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
```

## 类型修饰

```typescript
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

