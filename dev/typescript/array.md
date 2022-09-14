# TypeScript 数组

## 简介

TypeScript 将 JavaScript 的数组分成两种类型：一种叫做“数组” （array），另一种叫做“元组”（tuple）。

TypeScript 的数组指的是相同类型数据的列表，即所有成员都是相同类型的数据，但是成员数量不限。

TypeScript 的元组指的是不同类型数据的列表，即成员的类型可以不同，但是成员数量是固定的，需要事先指定。

下面先介绍数组，后面再介绍元组。

TypeScript 数组有两种类型写法。

第一种写法是在数组成员类型的后面，加上一对方括号。

```typescript
let arr:number[] = [1, 2, 3];
```

如果数组成员的类型比较复杂，写起来就是下面这样。

```typescript
let a1:(number|string)[];
let a2:(() => boolean)[];
```

上面示例中，数组`a1`的成员类型是数值或字符串，数组`a2`的成员类型是函数，该函数没有参数，返回一个布尔值。

如果数组可以放任意类型的数据，则可以写成`any[]`。

```typescript
let arr:any[];
```

第二种写法是使用 TypeScipt 内置的 Array 接口，这个接口是一个泛型，使用时需要给出成员的类型作为泛型变量。

```typescript
let arr:Array<number> = [1, 2, 3];
```

这种写法对于成员类型比较复杂的数组，代码可读性会稍微好一些。

```typescript
let a1:Array<number|string>;
let a2:Array<() => boolean>;
```

第三种写法是使用`interface`声明类型，这种就很少用。

```typescript
interface StringArray {
  [index: number]: string;
}
const strArr:StringArray = ['a', 'b', 'c'];
```

本质上，这种写法是声明一个对象，数组正好是一种特殊对象，键名等于数值，所以可以这样声明。

这种写法也可以用来声明，除了数值键名，还有非数值键名的对象。

```typescript
interface FirstNamesAndLastName {
  [index: number]: string;
  lastName: string;
}

const ducks: FirstNamesAndLastName = {
  0: 'Huey',
  1: 'Dewey',
  2: 'Louie',
  lastName: 'Duck',
};
```

通过索引值访问数组元素时，TypeScript 总是假定索引在范围内，因为数组的成员数量是不限定的。

```typescript
const messages: string[] = ['Hello'];

// 推断 message 类型是 string,而不是 undefined
const message = messages[3];
```

数组类型使用方括号读取成员的类型。

```typescript
type Names = string[];
type Name = Names[number];

let arr:Names = ['张三', '李四'];
let member:Name = arr[0];
```

上面示例中，类型`Name`是字符串类型。

注意，TypeScript 不会对数组的越界引用报错。

```typescript
const arr:number[] = [1, 2, 3];
const ele = arr[10]; // 不报错
```

上面示例中，读取数组`arr`不存在的成员并不报错。这是因为 TypeScript 认为数组的成员数量是动态的，可以随时新增和减少。

## 类型推断

TypeScript 会自动推断数组成员的类型。

如果一个变量的初始值是空数组，那么  TypeScript 会推断成员类型是`any[]`。

```typescript
// 推断为 any[]
const arr = [];
```

后面为这个数组赋值时，TypeScript 会自动更新类型推断。

```typescript
// 推断为 any[]
const arr = [];

// 推断类型为 number[]
arr.push(123);

// 推断类型为 (string | number)[]
arr.push('abc');
```

注意，类型推断的自动更新只发生初始值为空数组的情况。如果初始值不是空数组，类型推断就不会更新。

```typescript
// 推断类型为 number[]
const arr = [123];

// 报错
arr.push('abc');
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

## 只读数组，const 断言

只读数组的成员不能改变，可以在声明数组时，加上`readonly`关键字。

```typescript
let arr:readonly number[] = [0, 1];

delete arr[0]; // 报错
arr[1] = 2; // 报错
arr.push(3); // 报错

arr = [1,2]; // 不报错
```

上面示例中，`arr`是一个只读数组，删除、修改、新增数组成员都会报错。但是，变量`arr`赋值为另一个数组并不报错。

如果要禁止修改变量`arr`赋值为另一个数组，可以从`const`声明。

```typescript
const arr:readonly number[] = [0, 1];
arr = [1,2]; // 报错
```

上面示例中，`const`声明的变量是不能重新赋值的，所以变量`arr`赋值为另一个数组就会报错。

注意，`readonly`关键字不能与数组的泛型声明法一起使用。

```typescript
const arr:readonly Array<number> = [0, 1]; // 报错
```

上面示例中，`readonly`与泛型声明法一起使用，就会报错。

`readonly`关键字会生成一种单独的类型，比如`readonly number[]`跟`number[]`是不一样的类型，前者是后者的子类型。

由于子类型继承了父类型的所有特征，并加上了自己的特性，所以父类型可以赋值给子类型，反过来就不行。

```typescript
const a1:number[] = [0, 1];
const a2:readonly number[] = a1; // 正确

const a3:readonly number[] = [0, 1];
const a4:number[] = a3; // 报错
```

上面示例中，父类型`number[]`可以赋值给子类型`readonly number[]`，但是反过来就不行。

除了使用`readonly`关键字，只读数组的声明还可以使用工具类型`Readonly<T>`和`ReadonlyArray<T>`。

```typescript
const arr:Readonly<number[]> = [0, 1];
// 或者
const arr:ReadonlyArray<number> = [0, 1];
```

上面两种写法都可以声明只读数组。注意，两者尖括号里面的写法不一样，`Readonly<T>`的尖括号里面是整个数组（`number[]`），而`ReadonlyArray<T>`的尖括号里面是数组成员（`number`）。

const 断言用来声明数组成员不会改变。

```typescript
// %inferred-type: readonly ["igneous", "metamorphic", "sedimentary"]
const rockCategories =
  ['igneous', 'metamorphic', 'sedimentary'] as const;

// 报错
rockCategories.push('sand');

// 报错
rockCategories[0] = 'sand';
```

这种情况下，TypeScript 会推断出一个固定值的元组。由于元组的成员数量是固定的，所以添加或修改成员会报错。

请看下面的例子。

```typescript
// %inferred-type: readonly [1, 2, 3, 4]
const numbers1 = [1, 2, 3, 4] as const;
// %inferred-type: number[]
const numbers2 = [1, 2, 3, 4];

// %inferred-type: readonly [true, "abc"]
const booleanAndString1 = [true, 'abc'] as const;
// %inferred-type: (string | boolean)[]
const booleanAndString2 = [true, 'abc'];
```

## Tuple

元组（tuple）是 TypeScript 独有的数据类型，代表了成员类型不同的 JavaScript 数组。

元组必须明确声明每个成员的类型，以及包含多少个成员。

```typescript
const s:[string, string, boolean]
  = ['a', 'b', true];
```

元组的声明正好与数组相反，数组是类型写在方括号外面（`number[]`），元组是类型写在方括号里面（`[number]`）。

下面的例子是数组的成员是一个元组。

```typescript
// entries 的类型推断为 [string, number][]
// entries 的值为  [[ 'a', 1 ], [ 'b', 2 ]]
const entries = Object.entries({ a: 1, b: 2 });
```

一般来说，元组成员的类型不同，但是也允许所有成员的类型的类型相同。

```typescript
let point:[number, number] = [7, 5];
```

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

## 多维数组

TypeScript 允许`T[][]`的形式，表示二维数组，`T`是最底层数组成员的类型。

```typescript
var multi: number[][]=[[1,2,3],[23,24,25]]
```

```typescript
var trilogies: string[][] = [
["An Unexpected Journey", "The Desolation of Smaug", "There and Back Again"],
["The Fellowship Of the Ring", "The Two Towers", "The Return Of The King"]
];
```

下面是一个多重数组的例子。

```typescript
const fields:Fields = [
  ['first', 'string', true],
  ['last', 'string', true],
  ['age', 'number', false],
];
```

上面例子是一个数组，内部有三个成员，每个成员是一个元组。内部元组的第一个成员是一个字符串，第二个成员是一个固定值（字符串`string`或`number`），第三个成员是布尔值。

上面这个多重数组的类型，有多种写法。下面的写法都是对的。

```typescript
type Fields = Array<[string, string, boolean]>;

type Fields = Array<[string, ('string'|'number'), boolean]>;

type Fields = Array<Array<string|boolean>>;

type Fields = [
  [string, string, boolean],
  [string, string, boolean],
  [string, string, boolean],
];

type Fields = [
  [string, 'string', boolean],
  [string, 'string', boolean],
  [string, 'number', boolean],
];

type Fields = [
  Array<string|boolean>,
  Array<string|boolean>,
  Array<string|boolean>,
];
```