# TypeScript 的类型系统

TypeScript 首先继承了 JavaScript 的类型，在这个基础上，发展出自己的类型系统。

## 基本类型

### 概述

JavaScript 语言（注意，不是 TypeScript）将值分成8种类型。

- boolean
- string
- number
- bigint
- symbol
- object
- undefined
- null

TypeScript 继承了 JavaScript 的类型设计，以上8种类型可以看作 TypeScript 的基本类型。

注意，上面所有类型的名称都是小写字母，首字母大写的`Number`、`String`、`Boolean`等都是 JavaScript 语言内置的对象，而不是类型名称。

另外，undefined 和 null 既可以作为值，也可以作为类型，取决于在哪里使用它们。

这8种基本类型作为 TypeScript 类型系统的基础，组合起来就可以形成复杂类型。

以下是它们的简单介绍。

### boolean 类型

`boolean`类型只有`true`和`false`两个布尔值。

```typescript
const x:boolean = true;
const y:boolean = false;
```

上面示例中，变量`x`和`y`就属于 boolean 类型。

### string 类型

`string`类型包含所有字符串。

```typescript
const x:string = 'hello';
const y:string = `${x} world`;
```

上面示例中，普通字符串和模板字符串都属于 string 类型。

### number 类型

`number`类型包含所有整数和浮点数。

```typescript
const x:number = 123;
const y:number = 3.14;
const z:number = 0xffff;
```

上面示例中，整数、浮点数和非十进制数都属于 number 类型。

### bigint 类型

bigint 类型包含所有的大整数。

```typescript
const x:bigint = 123n;
const y:bigint = 0xffffn;
```

上面示例中，变量`x`和`y`就属于 bigint 类型。

bigint 与 number 类型不兼容。

```typescript
const x:bigint = 123; // 报错
const y:bigint = 3.14; // 报错
```

上面示例中，`bigint`类型赋值为整数和小数，都会报错。

注意，bigint 类型是 ES2020 标准引入的。如果使用这个类型，TypeScript 编译的目标 JavaScript 版本不能低于 ES2020（编译参数`--target`不低于`es2020`）。

### symbol 类型

symbol 类型包含所有的 Symbol 值。

```typescript
const x:symbol = Symbol();
```

上面示例中，`Symbol()`函数的返回值就是 symbol 类型。

symbol 类型的详细介绍，参见《Symbol》一章。

### object 类型

根据 JavaScript 的设计，object 类型包含了所有对象、数组和函数。

```typescript
const x:object = { foo: 123 };
const y:object = [1, 2, 3];
const z:object = (n:number) => n + 1;
```

上面示例中，对象、数组、函数都属于 object 类型。

### undefined 类型

undefined 类型只有一个值`undefined`，表示未定义（即还给出定义，以后可能会有定义）。

```typescript
let x:undefined = undefined;
```

上面示例中，变量`x`就属于 undefined 类型。两个`undefined`里面，第一个是类型，第二个是值。

### null 类型

null 类型只有一个值`null`，表示为空（即此处没有值）。

```typescript
const x:null = null;
```

上面示例中，变量`x`就属于 null 类型。

## 包装对象类型

### 包装对象的概念

JavaScript 的8种类型之中，`undefined`和`null`其实是两个特殊值，`object`属于复合类型，剩下的五种属于原始类型（primitive value），代表最基本的、不可再分的值。

- boolean
- string
- number
- bigint
- symbol

上面这五种原始类型的值，都有对应的包装对象（wrapper object）。所谓“包装对象”，指的是这些值在需要时，会自动产生的对象。

```javascript
'hello'.charAt(1) // 'e'
```

上面示例中，字符串`hello`执行了`charAt()`方法。但是，在 JavaScript 语言中，只有对象才有方法，原始类型的值本身没有方法。这行代码之所以可以运行，就是因为在调用方法时，字符串会自动转为包装对象，`charAt()`方法其实是定义在包装对象上。

这样的设计大大方便了字符串处理，省去了将原始类型的值手动转成对象实例的麻烦。

五种包装对象之中，symbol 类型和 bigint 类型无法直接获取它们的包装对象（即`Symbol()`和`BigInt()`不能作为构造函数使用），但是剩下三种可以。

- `Boolean()`
- `String()`
- `Number()`

以上三个构造函数，执行后可以直接获取某个原始类型值的包装对象。

```javascript
const s = new String('hello');
typeof s // 'object'
s.charAt(1) // 'e'
```

上面示例中，`s`就是字符串`hello`的包装对象，`typeof`运算符返回`object`，不是`string`，但是本质上它还是字符串，可以使用所有的字符串方法。

注意，`String()`只有当作构造函数使用时（即带有`new`命令调用），才会返回包装对象。如果当作普通函数使用（不带有`new`命令），返回就是一个普通字符串。其他两个构造函数`Number()`和`Boolean()`也是如此。

### 包装对象类型与字面量类型

由于包装对象的存在，导致每一种原始类型都有包装对象和字面量两种情况。

```javascript
'hello' // 字面量
new String('hello') // 包装对象
```

上面示例中，第一行是字面量，第二行是包装对象，它们都是字符串。

为了区分这两种情况，TypeScript 对五种原始类型分别提供了大写和小写两种类型。

- Boolean 和 boolean
- String 和 string
- Number 和 number
- BigInt 和 bigint
- Symbol 和 symbol

其中，大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象。

```typescript
const s1:String = 'hello'; // 正确
const s2:String = new String('hello'); // 正确

const s3:string = 'hello'; // 正确
const s4:string = new String('hello'); // 报错
```

上面示例中，`String`类型可以赋值为字符串的字面量，也可以赋值为包装对象。但是，`string`类型只能赋值为字面量，赋值为包装对象就会报错。

建议只使用小写类型，不使用大写类型。因为绝大部分使用原始类型的场合，都是使用字面量，不使用包装对象。而且，TypeScript 把很多内置方法的参数，定义成小写类型，使用大写类型会报错。

```typescript
const n1:number = 1;
const n2:Number = 1;

Math.abs(n1) // 1
Math.abs(n2) // 报错
```

上面示例中，`Math.abs()`方法的参数类型被定义成小写的`number`，传入大写的`Number`类型就会报错。

上一小节说过，`Symbol()`和`BigInt()`这两个函数不能当作构造函数使用，所以没有办法直接获得 symbol 类型和 bigint 类型的包装对象，因此`Symbol`和`BigInt`这两个类型虽然存在，但是完全没有使用的理由。

## Object 类型与 object 类型

TypeScript 的对象类型也有大写`Object`和小写`object`两种。

### Object 类型

大写的`Object`类型代表 JavaScript 语言里面的广义对象。所有可以转成对象的值，都是`Object`类型，这囊括了几乎所有的值。

```typescript
let obj:Object;
 
obj = true;
obj = 'hi';
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;
```

上面示例中，原始类型值、对象、数组、函数都是合法的`Object`类型。

事实上，除了`undefined`和`null`这两个值不能转为对象，其他任何值都可以赋值给`Object`类型。

```typescript
let obj:Object;

obj = undefined; // 报错
obj = null; // 报错
```

上面示例中，`undefined`和`null`赋值给`Object`类型，就会报错。

另外，空对象`{}`是`Object`类型的简写形式，所以使用`Object`时常常用空对象代替。

```typescript
let obj:{};
 
obj = true;
obj = 'hi';
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;
```

上面示例中，变量`obj`的类型是空对象`{}`，就代表`Object`类型。

显然，无所不包的`Object`类型既不符合直觉，也不方便使用。

### object 类型

小写的`object`类型代表 JavaScript 里面的狭义对象，即可以用字面量表示的对象，只包含对象、数组和函数，不包括原始类型的值。

```typescript
let obj:object;
 
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;
obj = true; // 报错
obj = 'hi'; // 报错
obj = 1; // 报错
```

上面示例中，`object`类型不包含原始类型值，只包含对象、数组和函数。

大多数时候，我们使用对象类型，只希望包含对象字面量，不希望包含原始类型。所以，建议总是使用小写类型`object`，不使用大写类型`Object`。

注意，无论是大写的`Object`类型，还是小写的`object`类型，都只能表示 JavaScript 内置的原型对象（即`Object.prototype`），用户自定义的属性都不存在于这两个类型之中。

```typescript
const o1:Object = { foo: 0 };
const o2:object = { foo: 0 };

o1.toString() // 正确
o1.foo // 报错

o2.toString() // 正确
o2.foo // 报错
```

上面示例中，`toString()`是对象的原生方法，可以正确访问。`foo`是自定义属性，访问就会报错。如何描述对象的自定义属性，详见《对象类型》一章。

## undefined 和 null 的特殊性

`undefined`和`null`既是值，又是类型。

作为值，它们有一个特殊的地方：任何其他类型的变量都可以赋值为`undefined`或`null`。

```typescript
let age:number = 24;

age = null;      // 正确
age = undefined; // 正确
```

上面代码中，变量`age`的类型是`number`，但是赋值为`null`或`undefined`并不报错。

这并不是因为`undefined`和`null`包含在`number`类型里面，而是故意这样设计，任何类型的变量都可以赋值为`undefined`和`null`，以便跟 JavaScript 的行为保持一致。

JavaScript 的行为是，变量如果等于`undefined`就表示还没有赋值，如果等于`null`就表示值为空。所以，TypeScript 就允许了任何类型的变量都可以赋值为这两个值。

但是有时候，这并不是开发者想要的行为，也不利于发挥类型系统的优势。

```typescript
const obj:object = undefined;
obj.toString() // 错误，但能通过编译
```

上面示例中，变量`obj`等于`undefined`，编译不会报错。但是，实际执行时，调用`obj.toString()`就报错了，因为`undefined`不是对象，没有这个方法。

为了避免这种情况，及早发现错误，TypeScript 提供了一个编译选项`--strictNullChecks`。只要打开这个选项，`undefined`和`null`就不能赋值给其他类型的变量（除了`any`类型和`unknown`类型）。

下面是 tsc 命令打开这个编译选项的例子。

```typescript
// tsc --strictNullChecks app.ts

let age:number = 24;

age = null;      // 报错
age = undefined; // 报错
```

上面示例中，打开`--strictNullChecks`以后，`number`类型的变量`age`就不能赋值为`undefined`和`null`。

这个选项在配置文件`tsconfig.json`的写法如下。

```json
{
  "compilerOptions": {
    "strictNullChecks": true
    // ...
  }
}
```

打开`--strictNullChecks`以后，`undefined`和`null`这两种值也不能互相赋值了。

```typescript
// 打开 --strictNullChecks

let x:undefined = null; // 报错
let y:null = undefined; // 报错
```

上面示例中，`undefined`类型的变量赋值为`null`，或者`null`类型的变量赋值为`undefind`，都会报错。

总之，打开`--strictNullChecks`以后，`undefined`和`null`只能赋值给自身，或者`any`类型和`unknown`类型的变量。

```typescript
let x:any     = undefined;
let y:unknown = null;
```

## 值类型

TypeScript 规定，单个值也是一种类型，称为“值类型”。

```typescript
let x:'hello';

x = 'hello'; // 正确
x = 'world'; // 报错
```

上面示例中，变量`x`的类型是字符串`hello`，导致它只能赋值为这个字符串，赋值为其他字符串就会报错。

TypeScript 推断类型时，遇到`const`命令声明的变量，如果代码里面没有注明类型，就会推断该变量是值类型。

```typescript
// x 的类型是 “https”
const x = 'https';

// y 的类型是 string
const y:string = 'https';
```

上面示例中，变量`x`是`const`命令声明的，TypeScript 就会推断它的类型是值`https`，而不是`string`类型。

这样推断是合理的，因为`const`命令声明的变量，一旦声明就不能改变，相当于常量。值类型就意味着不能赋为其他值。

注意，`const`命令声明的变量，如果赋值为对象，并不会推断为值类型。

```typescript
// x 的类型是 { foo: number }
const x = { foo: 1 };
```

上面示例中，变量`x`没有被推断为值类型，而是推断属性`foo`的类型是`number`。这是因为 JavaScript 里面，`const`变量赋值为对象时，属性值是可以改变的。

值类型可能会出现一些很奇怪的报错。

```typescript
const x:5 = 4 + 1; // 报错
```

上面示例中，等号左侧的类型是数值`5`，等号右侧`4 + 1`的类型，TypeScript 推测为`number`。由于`5`是`number`的子类型，子类型不能赋值为父类型的值，所以报错了。

但是，反过来是可以的，父类型可以赋值为子类型的值。

```typescript
let x:5 = 5;
let y:number = 4 + 1;

x = y; // 报错
y = x; // 正确
```

上面示例中，子类型`x`不能赋值为父类型`y`，但是反过来是可以的。

如果一定要让子类型可以赋值为父类型的值，就要用到类型断言（详见《类型断言》一章）。

```typescript
const x:5 = (4 + 1) as 5; // 正确
```

上面示例中，在`4 + 1`后面加上`as 5`，就是告诉编译器，可以把`4 + 1`的类型视为值类型`5`，这样就不会报错了。

只包含单个值的值类型，用处不大。实际开发中，往往将多个值结合，作为联合类型使用。

## 联合类型

联合类型（union types）指的是多个类型组成的并集，某个值只要属于其中一个基础类型，就同时属于这些基础类型的联合类型。

举例来说，类型`A`与类型`B`可以组成一个联合类型，用`A|B`表示。任何一个类型`A`的值或类型`B`的值，都同时属于联合类型`A|B`。

```typescript
let x:string|number;

x = 123; // 正确
x = 'abc'; // 正确
```

上面示例中，变量`x`就是联合类型`string|number`，表示它的值既可以是字符串，也可以是数值。

联合类型可以与值类型相结合，表示一个变量的值有若干种可能。

```typescript
let setting:true|false;

let gender:'male'|'female';

let rainbowColor:'赤'|'橙'|'黄'|'绿'|'青'|'蓝'|'紫';
```

上面的示例都是由值类型组成的联合类型，非常清晰地表达了变量的取值范围。其中，`true|false`其实就是布尔类型`boolean`。

前面提到，打开编译选项`--strictNullChecks`后，其他类型的变量不能赋值为`undefined`或`null`。这时，如果某个变量确实可能包含空值，就可以采用联合类型的写法。

```typescript
let name:string|null;

name = 'John';
name = null;
```

上面示例中，变量`name`的值可以是字符串，也可以是`null`。

联合类型的第一个成员前面，也可以加上竖杠`|`，这样便于多行书写。

```typescript
let x:
  | 'one'
  | 'two'
  | 'three'
  | 'four';
```

上面示例中，联合类型的第一个成员`one`前面，也可以加上竖杠。

如果一个变量有多种类型，读取该变量时，往往需要进行“类型缩小”（type narrowing），区分该值到底属于哪一种类型，然后再进一步理。

```typescript
function printId(
  id:number|string
) {
    console.log(id.toUpperCase()); // 报错
}
```

上面示例中，参数变量`id`可能是数值，也可能是字符串，这时直接对这个变量调用`toUpperCase()`方法会报错，因为这个方法只存在于字符串，不存在于数值。

解决方法就是对参数`id`做一下类型缩小，确定它的类型以后再进行处理。这在 TypeScript 里面叫做“类型缩小”。

```typescript
function printId(
  id:number|string
) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```

上面示例中，函数体内部会判断一下变量`id`的类型，如果是字符串，就对其执行`toUpperCase()`方法。

“类型缩小”是 TypeScript 处理联合类型的标准方法，凡是遇到可能为多种类型的场合，都需要先缩小类型，再进行处理。实际上，联合类型本身可以看成是一种“类型放大”（type widening），处理时就需要“类型缩小”（type narrowing）。

下面是“类型缩小”的另一个例子。

```typescript
function getPort(
  scheme: 'http'|'https'
) {
  switch (scheme) {
    case 'http':
      return 80;
    case 'https':
      return 443;
  }
}
```

上面示例中，函数体内部对参数变量`scheme`进行类型缩小，根据不同的值类型，返回不同的结果。

## 交叉类型

交叉类型（intersection types）指的是多个类型的交集。某个值只有同时属于所有基础类型，才会属于这些基础类型的交叉类型。

举例来说，类型`A`与类型`B`组成一个交叉类型，用`A&B`表示。

```typescript
let x:number&string;
```

上面示例中，变量`x`同时是数值和字符串，这当然是不可能的，所以 TypeScript 会认为`x`的类型实际是`never`。

交叉类型的主要用途是表示对象的合成。

```typescript
let obj:
  { foo: string } &
  { bar: string };

obj = {
  foo: 'hello',
  bar: 'world'
};
```

上面示例中，变量`obj`同时具有属性`foo`和属性`bar`。

## type 命令

`type`命令用来定义一个类型的别名。

```typescript
type Age = number;

let age:Age = 55;
```

上面示例中，`type`命令为`number`类型生成一个别名`Age`。这样就能像使用`number`一样，使用`Age`当作类型。

别名可以让一些复杂类型用起来更方便，也能增加代码的可读性。

别名不允许有重名。

```typescript
type Color = 'red';
type Color = 'blue'; // 报错
```

上面示例中，同一个别名`Color`声明了两次，就报错了。

别名的作用域是块级作用域。这意味着，代码块内部定义的别名，影响不到外部。

```typescript
type Color = 'red';

if (Math.random() < 0.5) {
  type Color = 'blue';
}
```

上面示例中，`if`代码块内部的类型别名`Color`，跟外部的`Color`是不一样的。

别名支持使用表达式，也可以在定义一个别名时，使用另一个别名。

```typescript
type World = "world";
type Greeting = `hello ${World}`;
```

上面示例中，别名`Greeting`使用了模板字符串，需要读取另一个别名`World`。

`type`命令属于类型相关的代码，编译成 JavaScript 的时候，会被全部删除。

## typeof 运算符

typeof 运算符是 JavaScript 语言的一元运算符，返回一个字符串，代表操作数的类型。

```javascript
typeof 'foo'; // 'string'
```

上面示例中，`typeof`运算符返回字符串`foo`的类型是`string`。

JavaScript 里面，`typeof`运算符只可能返回八种值，而且都是字符串。

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

上面示例是`typeof`运算符在 JavaScript 语言里面，可能返回的八种值。

TypeScript 对`typeof`运算符进行了扩展，使其能够返回某个值的 TypeScript 类型。

```typescript
const a = { x: 0 };

type T0 = typeof a;   // { x: number }
type T1 = typeof a.x; // number
```

上面示例中，`typeof a`表示返回变量`a`的 TypeScript 类型。注意，这时返回的不是字符串，而是只有 TypeScript 才能识别的类型（`{ x: number }`）。同理，`typeof a.x`返回的是属性`x`的类型（`number`）。

如果`typeof`返回的是 TypeScript 类型，就只能用在代码的类型声明部分里面。

也就是说，`typeof`运算符既可以用在值相关的代码里面，也可以用在类型声明相关的代码里面。它在两种代码的行为规则是不一样的，前者遵守 JavaScript 规则，后者遵守 TypeScript 规则。编译后，前者会保留，后者会被全部删除。

```typescript
// 编译前
let a = { x: 0 };
let b:typeof a.x | string
  = 'hello';

if (typeof b === 'string') {
  console.log(b);
}
```

上面示例中，`typeof a.x | string`是类型声明相关的代码，编译后被删除；`typeof b === 'string'`是值相关的代码，编译后被保留。下面就是编译后的结果。

```javascript
// 编译后
let a = { x: 0 };
let b = 'hello';
if (typeof b === 'string') {
    console.log(b);
}
```

上面示例中，编译后会保留原始代码的第二个`typeof`，因此这个`typeof`遵守 JavaScript 的语法。原始代码的第一个`typeof`，遵守的是 TypeScript 类型语法。

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
