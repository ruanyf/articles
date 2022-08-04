# TypeScript 的数据类型

## any 类型

any 类型是 TypeScript 提供的一种基本类型，表示这个值可能是任意类型。

```typescript
let x:any;

x = 1;
x = 'foo';

let value: any;

value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = Math.random; // OK
value = null; // OK
value = undefined; // OK
value = new TypeError(); // OK
value = Symbol("type"); // OK
```

上面示例中，变量`x`的类型是`any`，表示它的值可以是任意类型，赋值为数值或字符串，都不会报错。

`any`类型的变量，不仅可以接受任何类型的值，也可以赋值给其他任何类型的变量。

```typescript
let x:any = 'hello';

let y:number;
y = x; // 不会报错
```

上面示例中，变量`x`是`any`类型，赋值给数值类型的`y`并不会报错，哪怕`x`的值是一个字符串。

`any`类型的值可以赋值给其他类型的变量，也就是说，其他所有类型实际上都包含了 any 类型。它可以看作是 TypeScript 其他所有类型的父类型，或者其他所有类型都是`any`的子类型。

如果变量的类型是`any`，该变量可以作为对象使用，访问它的任意属性，也可以作为函数使用，直接调用它。

```typescript
let x:any = 'hello';

x.foo(); // 不会报错 
x(); // 不会报错
x.bar = 100; // 不会报错
```

上面代码不会报错的原因是，将变量类型设为`any`，实际上会关闭对它的类型检查。只要没有句法错误，无论代码怎么写，TypeScript 都不会出现编译错误。

TypeScript 假设，开发者自己知道怎么使用`any`类型的值，所以不对`any`类型进行任何限制，怎么使用都可以。

```typescript
let value: any;

value.foo.bar; // OK
value.trim(); // OK
value(); // OK
new value(); // OK
value[0][1]; // OK
```

`any`的其他使用注意点如下。

（1）类型设为`any`等于不设类型，失去了使用 TypeScript 的意义，完全不建议使用，除非是为以前的复杂 JavaScript 代码做类型适配。

（2）如果开发者不指定变量类型，并且 TypeScript 不能从上下文推断出变量类型时，编译器就会默认该变量类型为`any`。

```typescript
// 等同于 y:any;  
var y;

// 等同于 z:{ a:any; b:any; };
var z: { a; b; };

// 等同于 f(x:any):void
function f(x) {   
  console.log(x);  
}
```

## unknown

`unknown`可以看作是更安全的`any`，它也表示任何类型，但是有着更多的限制。

一般来说，可以设为`any`的地方，都应该优先考虑设为`unknown`。

所有类型的值都可以分配给 unknown 类型的变量。

```typescript
let value: unknown;

value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = Math.random; // OK
value = null; // OK
value = undefined; // OK
value = new TypeError(); // OK
value = Symbol("type"); // OK
```

但是，unknown 类型不能赋值给其他类型，只有`unknown`本身和`any`类型除外。

```typescript
let value: unknown;

let value1: unknown = value; // OK
let value2: any = value; // OK
let value3: boolean = value; // Error
let value4: number = value; // Error
let value5: string = value; // Error
let value6: object = value; // Error
let value7: any[] = value; // Error
let value8: Function = value; // Error
```

与`any`相比，这样就保证了不确定类型的值，只会局限在`unknown`类型的变量，不会扩散到其他类型的变量。

TypeScript 对`unknown`类型非常严格，假设它不存在任何属性和方法，也不能调用。这导致下面的操作都会报错。

```typescript
let value: unknown;

value.foo.bar; // Error
value.trim(); // Error
value(); // Error
new value(); // Error
value[0][1]; // Error
```

这导致使用 unknown 类型之前，开发者必须手动检查它的值是什么类型，然后才能用。

```typescript
function isString(v:unknown):string {
  if (typeof v === 'string') {
    return v;
  }
  return 'not string';
}
```

也就是说，必须先进行类型检查，然后再使用`unknown`。

```typescript
function func(value: unknown) {
  // 报错
  value.toFixed(2);

  // 正确
  (value as number).toFixed(2); // OK
}

function func(value: unknown) {
  // 报错
  value * 5;

  if (value === 123) { // 正确
    value * 5; // OK
  }
}

function func(value: unknown) {
  // 报错
  value.length;

  if (typeof value === 'string') { 
    // 正确
    value.length; // OK
  }
}
```

上面示例中，如果直接使用`unknown`类型的变量就会报错，进行类型检查以后再使用，就不会报错。

在联合类型中，unknown吸收所有类型。这意味着如果任何组成类型是unknown，则联合类型的计算结果为unknown。

```typescript
type UnionType1 = unknown | null; // unknown
type UnionType2 = unknown | undefined; // unknown
type UnionType3 = unknown | string; // unknown
type UnionType4 = unknown | number[]; // unknown
```

该规则的一个例外是any。如果至少有一种构成类型是any，则联合类型的计算结果为any：

```typescript
type UnionType5 = unknown | any; // any
```

在交叉类型中，每种类型都吸收unknown. 这意味着与任何类型相交unknown不会改变结果类型：

```typescript
type IntersectionType1 = unknown & null; // null
type IntersectionType2 = unknown & undefined; // undefined
type IntersectionType3 = unknown & string; // string
type IntersectionType4 = unknown & number[]; // number[]
type IntersectionType5 = unknown & any; // any
```

`unknown`类型不能用作大多数运算符的操作数，因为如果不知道值的类型，大多数运算符不太可能产生有意义的结果。`unknows`类型值唯一可以使用的运算符是四个相等和不相等运算符。

```typescript
===
==
!==
!=
```

除非使用`as`断言，首先缩小类型`unknows`类型的范围，然后才可以用于其他类型。

```typescript
const value: unknown = "Hello World";
const someString: string = value as string;
const otherString = someString.toUpperCase(); // "HELLO WORLD"
```

## TypeScript 的类型系统

JavaScript 语言（注意，不是 TypeScript）将数据分成8种类型。

- Undefined: the set with the only element undefined
- Null: the set with the only element null
- Boolean: the set with the two elements false and true
- Number: the set of all numbers
- BigInt: the set of all arbitrary-precision integers
- String: the set of all strings
- Symbol: the set of all symbols
- Object: the set of all objects (which includes functions and arrays)

TypeScript 在 JavaScript 之上又加了一层“静态类型”，在编译时（或类型检查时）对所有数据和存储位置进行分类。所以，TypeScript 的类型系统不同于 JavaScript 的类型系统。

- primitive types
- object types：包括 class、interface、array、tuple、function、构造函数。
- union types：值可能是多种类型中的一种。
- intersection types：值可能同时有一种以上的类型。
- type parameters

原始类型有以下几种。

- Number
- Boolean
- String
- Symbol
- Void：表示没有值，比如没有返回值的函数。
- Null
- Undefined

## 基本类型

TypeScript 提供的数据类型，可以分成两大类。

一类是 JavaScript 原有的类型。TypeScript 提供了8个内置的基本类型，基本上与 JavaScript 的数据类型一致。

- number：数值，包括整数和浮点数。
- string：字符串
- boolean：布尔值，包括`true`和`false`两个值
- bigint
- symbol
- null
- undefined
- object

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

## 值类型

单个值也视为一种类型。

```typescript
let x: "hello" = "hello";
// 正确
x = "hello";
// 报错
x = "howdy";
```

`const`命令声明的变量，TypeScript 推断出来的类型就是一个值。

```typescript
// 推断类型是 “https”，不是 string
const stringLiteral = "https"; // Type "https"

// 推断类型是 42，不是 number
const numericLiteral = 42; // Type 42

// 推断类型是 true,不是 boolean
const booleanLiteral = true; // Type true
```

它在某个变量只能取若干个特定值时很有用。

```typescript
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
```

单个数值也是类型。

```typescript
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

下面是用数值类型限定端口的例子。

```typescript
function getPort(scheme: "http" | "https"): 80 | 443 {
  switch (scheme) {
    case "http":
      return 80;
    case "https":
      return 443;
  }
}
```



值类型可以与 interface 结合使用。

```typescript
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");

// 报错
configure("automatic");
```

最后，布尔值类型 boolean 本身就是两个布尔值 union 类型`true | false`的别名。

## Object 与 object 的区别

```typescript
let x:Object;
let y:object;
```

类型声明为`Object`（大写），表示`x`是`Object`的实例。

JavaScript 存在一些对象，不属于`Object`的实例。

```javascript
const obj = Object.create(null);
Object.getPrototypeOf(obj2) // null

typeof obj2 // object
obj2 instanceof Object // false
```

上面示例中，对象`object`的类型是对象，但不是`Object`的实例，因为它的原型对象不是`Object.prototype`。

类型设为`Object`的一个问题是，原始类型也符合`Object`类型。

```typescript
function func1(x: Object) { }
func1('abc');  // 正确
```

上面示例不报错，这是因为字符串、数值、布尔值都会自动转为对象，成为 Object 的实例。

```typescript
'abc'.hasOwnProperty === Object.prototype.hasOwnProperty
// true
```

类型设为`object`（小写）则表示一切`typeof`运算符返回值为`object`的值，也就是所有非原始类型的值（undefined, null, booleans, numbers, bigints, strings）。

而且，原始类型也不符合`object`。

```typescript
function func1(x:object) { }
func1('abc');  // 报错
```

第三个问题是，类型设为`Object`（大写）时，不方便自定义原生方法。

```typescript
// 报错
const obj1: Object = { toString() { return 123 } };
```

上面代码报错是因为`toString()`是一个原生方法，它已经有类型定义了，必须返回一个字符串，而不能返回数值。

但是，类型设为`object`就没有这个问题。

```typescript
// 正确
const obj2: object = { toString() { return 123 } };
```

由于`object`的适用范围大于`Object`，所以建议总是使用`object`（小写），而不是`Object`（大写）。

## 特殊类型

### unknown 

unknown 类似于 any，表示无法确定变量类型。区别是不能对该值进行任何操作。

```typescript
function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  a.b(); // 报错
}
```

## never

`never`类型表示肯定不会出现的值，主要用在从不执行 return（返回）的函数。

从不执行 return 的函数，有以下几种情况。

（1）抛出错误的函数。

```typescript
function fail(msg: string): never {
  throw new Error(msg);
}
```

注意，只有抛出错误，才是 never 类型。如果显式返回一个 Error 对象，则不是。

```typescript
function fail():Error {
  return new Error("Something failed");
}
```

（2）无限执行的函数。

```typescript
const sing = function():never {
  while (true) {
    console.log('sing');
};
```

`never`类型不同于`void`类型。前者表示不可能执行返回，后者表示不返回值，即返回`undefined`。

```typescript
// 正确
function sing():void {
  console.log('sing');
}

// 报错
function sing():never {
  console.log('sing');
}
```

## null，undefined

null 和 undefined 是 JavaScript 的两个特殊值，`null`表示空，`undefined`表示未定义。

如果变量类型设为`null`，就只能赋值为`null`。如果变量类型设为`undefined`，就只能赋值为`undefined`。

```typescript
let foo:null;

foo = null; // 正确
foo = undefined; // 报错
foo = 123; // 报错

let bar:undefined;

bar = undefined; // 正确
bar = null; // 报错
bar = 123; // 报错
```

上面示例中，`null`类型只能赋值为`null`，`undefined`只能赋值为`undefined`，否则就会报错。

TypeScript 约定，`null`和`undefined`可以赋值给它们之外的任意其他类型。也就是说，TypeScript 的所有其他类型除了本类型的值以外，总是包括`null`和`undefined`这两个值。

```typescript
let age: number;
age = 24;        // OK
age = null;      // OK
age = undefined; // OK
```

上面代码中，变量`age`的类型是数值，但是可以赋值为`null`和`undefined`。

这通常不是开发者想要的行为，因此 TypeScript 提供了一个`strictNullChecks`设置，只要打开就不允许变量设为`null`或`undefined`。

下面在配置文件`tsconfig.json`打开这个设置。

```json
{
  "compilerOptions": {
    "strictNullChecks": true
    // ...
  }
}
```

这时，`null`或`undefined`赋值给其他类型就会报错。

```typescript
let age: number;
age = 24;        // OK
age = null;      // 报错
age = undefined; // 报错
```

这种情况下，如果某个类型需要包括空值，可以使用联合类型的写法。

```typescript
let name: string | null;
name = "Marius";  // OK
name = null;      // OK
```

上面示例中，变量`name`的值可以是字符串，也可以是`null`。

对于对象的属性，如果可以等于`undefined`（即可省略），可以在属性名后面加一个问号（`?`）表示。

```typescript
type User = {
  firstName: string;
  lastName: string | undefined;
};
// 等同于
type User = {
  firstName: string;
  lastName?: string;
};
```

上面示例中，类型`User`是一个对象，它的属性`firstName`为一个字符串，属性`lastName`可以是字符串，也可以是`undefined`，即可以省略。

如果函数的参数可以等于`undefined`，就表示该参数可以省略，可以在参数名后面加一个问号表示。

```typescript
function doSomething(callback: () => void|undefined) {
  // ...
}
// 等同于
function doSomething(callback?: () => void) {
  // ...
}
```

上面示例中，函数`doSomething()`的参数`callback`，可以是一个函数，也可以为`undefined`，即可以省略。

### :void

`:void`类型只用来表示函数没有返回值。

```typescript
function log(message): void {
  console.log(message);
}
```

## type 命令

类型定义时支持模板字符串。

```typescript
type World = "world";

// 等同于 type Greeting = "hello world"
type Greeting = `hello ${World}`;
```

如果类型是多个值的联合，甚至可以产生插值的效果。

```typescript
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

// 等同于 type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
```

## typeof 运算符

typeof 运算符是一个 JavaScript 运算符，返回一个字符串，代表参数值的类型。

JavaScript 的`typeof`运算符，可能返回八种值。

```javascript
typeof undefined; // "undefined"
typeof true; // "boolean"
typeof 1337; // "number"
typeof "foo"; // "string"
typeof {}; // "object"
typeof parseInt; // "function"
typeof Symbol(); // "symbol"
typeof 127n // "bigint"
```

如果没有明确标注类型，typeof 会返回一个具体的值作为类型。

```typescript
const str:string = 'abc';

// %inferred-type: "string"
type Result = typeof str;

const x:Result = "bc";

const str = 'abc';

// %inferred-type: "abc"
type Result = typeof str;
```

在 TypeScript 中，如果`typeof`运算符出现在值的位置（比如等号的右边），那么用法与 JavaScript 的用法完全一样。

```typescript
// 编译前
var numberType: string = typeof 1337;

// 编译后
var numberType = typeof 1337;
```

上面示例中，编译后就是把类型删掉了，`typeof`运算符没有任何变化。

但是，`typeof`运算符也可以用在 TypeScript 类型注释里面。这时，它返回的不是字符串，而是参数值对应的 TypeScript 类型。

```typescript
let r1 = { width: 100, height: 200 };
let r2: typeof r1;

// 等同于
let r1 = { width: 100, height: 200 };
type R = typeof r1;
let r2: R;
```

上面示例中，`typeof`返回的是变量`r1`的 TypeScript 类型，即一个对象，该对象包含属性`width`和属性`height`。

## readonly 修饰符

readonly 修饰符表示一个变量不可以修改。

```typescript
let x: readonly string[] = [];
let y: string[] = [];
 
x = y; 
y = x; // 报错

const values: readonly string[] = ["a", "b", "c"];
```

只读数组不能赋值给普通数组。

readonly 也可以用来定义元组。

```typscript
const point: readonly [number, number] = [0, 0];

point[0] = 1; // Type error
point.push(0); // Type error
point.pop(); // Type error
point.splice(1, 1); // Type error
```

## 非空断言运算符

后缀`!`是非空断言运算符，即保证该值不是nullor undefined：

```typescript
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

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

`type`命令可以用来为现有类型指定别名，使用`type SomeName = someValidTypeAnnotation`的形式。

```typescript
type Age = number;
const age: Age = 82;
```

上面示例中，`Age`就是类型`number`的别名。

type 命令可以为任何类型起别名。

```typescript
type ID = number | string;
type Text = string | { text: string };
type Coordinates = [number, number];
type Callback = (data: string) => void;
```

## 类型联合

如果一个变量可能有多种类型，可以使用`|`运算符进行类型描述，这称为类型联合（union）。

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

Never 类型表示类型联合里面，缩小类型时，已经穷尽所有可能，不可能存在的类型。

## 类型交集

除了类型联合，TypeScript 还有类型交集：

```typescript
type Combined = { a: number } & { b: string };
type Conflicting = { a: number } & { a: string };
```

```typescript
function extend<T extends object, U extends object>(first: T, second: U): T & U {
  const result = <T & U>{};
  for (let id in first) {
    (<T>result)[id] = first[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<U>result)[id] = second[id];
    }
  }

  return result;
}

const x = extend({ a: 'hello' }, { b: 42 });
```

## 缩小类型

如果一个变量属于联合类型，所以使用时一般需要缩小类型。

第一种方法是使用`if`判断。

```typescript
function getScore(value: number|string): number {
  if (typeof value === 'number') { // (A)
    // %inferred-type: number
    value;
    return value;
  }
  if (typeof value === 'string') { // (B)
    // %inferred-type: string
    value;
    return value.length;
  }
  throw new Error('Unsupported value: ' + value);
}
```

下面是另一个例子。

```typescript
interface Book {
  title: null | string;
  isbn: string;
}

function getTitle(book: Book) {
  if (book.title === null) {
    // %inferred-type: null
    book.title;
    return '(Untitled)';
  } else {
    // %inferred-type: string
    book.title;
    return book.title;
  }
}
```

第二种方法是使用`switch`缩小类型。

```typescript
function getScore(value: number|string): number {
  switch (typeof value) {
    case 'number':
      // %inferred-type: number
      value;
      return value;
    case 'string':
      // %inferred-type: string
      value;
      return value.length;
    default:
      throw new Error('Unsupported value: ' + value);
  }
}
```

缩小类型的前提是，需要先获取类型。获取类型的几种方法如下。

```typescript
function func(value: Function|Date|number[]) {
  if (typeof value === 'function') {
    // %inferred-type: Function
    value;
  }

  if (value instanceof Date) {
    // %inferred-type: Date
    value;
  }

  if (Array.isArray(value)) {
    // %inferred-type: number[]
    value;
  }
}
```

如果一个值是`any`或`unknown`，你又想对它进行处理，就必须先缩小类型。

```typescript
function parseStringLiteral(stringLiteral: string): string {
  const result: unknown = JSON.parse(stringLiteral);
  if (typeof result === 'string') { // (A)
    return result;
  }
  throw new Error('Not a string literal: ' + stringLiteral);
}
```

缩小对象的属性，要用`in`运算符。

```typescript
type FirstOrSecond =
  | {first: string}
  | {second: string};

function func(firstOrSecond: FirstOrSecond) {
  if ('second' in firstOrSecond) {
    // %inferred-type: { second: string; }
    firstOrSecond;
  }
}

// 错误
function func(firstOrSecond: FirstOrSecond) {
  // @ts-expect-error: Property 'second' does not exist on
  // type 'FirstOrSecond'. [...]
  if (firstOrSecond.second !== undefined) {
    // ···
  }
}
```

`in`运算符只能用于联合类型，不能用于检查一个属性是否存在。

```typescript
function func(obj: object) {
  if ('name' in obj) {
    // %inferred-type: object
    obj;

    // 报错
    obj.name;
  }
}
```

## 数组

数组的类型注释，是在类型名后面加上数组符号`[]`。

```typescript
var boolArray: boolean[];
```

也可以逐一注明数组成员。

```typescript
let nameNumber: [string, number];
```

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

声明函数类型的两种方法。

```typescript
type LongHand = {
    (a: number): number;
};

type ShortHand = (a: number) => number;
```

如果存在参数重载，那就只有使用第一种写法。

```typescript
type LongHandAllowsOverloadDeclarations = {
    (a: number): number;
    (a: string): string;
};
```

另一种使用 interface 的写法。

```typescript
interface ReturnString {
  (): string
}

declare const foo: ReturnString;
const bar = foo(); // bar is inferred as a string
```

如果是构造函数，调用的时候要使用 new 命令，它的类型要写成下面这样。

```typescript
interface CallMeWithNewToGetString {
  new(): string
}
// Usage
declare const Foo: CallMeWithNewToGetString;
const bar = new Foo(); // bar is inferred to be of type string
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

对象可以直接描述类型，即在声明对象变量的时候，用`:{ /*Structure*/ }`在变量名后面声明类型。写法如下。

```typescript
var sampleVariable: { bar: number }

function foo(sampleParameter: { bar: number }) { }

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

如果要复用某个对象的类型，可以使用`interface`描述。可以将`interface`看作多个类型注释的一个容器，这个容器可以有自己的名字，因此可以引用。

```typescript
interface Name {
    first: string;
    second: string;
}

var name: Name;
name = {
    first: 'John',
    second: 'Doe'
};
```

上面示例中，interface 建立了一个容器，名称为`Name`，里面包括两个类型注释，一个是`first`，另一个是`second`，它们的类型都是字符串。

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

泛型（Generics）为类型提供变量。一个常见的例子是数组。没有泛型的数组可以包含任何东西。带有泛型的数组可以描述数组包含的值。

```typescript
function reverse<T>(items: T[]): T[] {
    var toreturn = [];
    for (let i = items.length - 1; i >= 0; i--) {
        toreturn.push(items[i]);
    }
    return toreturn;
}
```

上面示例中，函数 reverse 的参数 items 是一个数组，数组成员的类型是 T（即`items: T[]`），这里的 T 代表 Type，你也可以使用其他字符代替。它的返回值也是一个数组，该数组的成员类型也是 T（即 reverse: T[]）。也就是说，参数收到什么类型的数组，就返回什么类型的字符，比如收到字符串数组，就返回字符串数组，收到数值数组，就返回数值数组。



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

## 参考链接

- [The unknown Type in TypeScript](https://mariusschulz.com/blog/the-unknown-type-in-typescript), Marius Schulz