# TypeScript 的类型系统

## 基本类型

### 概述

JavaScript 语言（注意，不是 TypeScript）将数据分成8种类型。

- Boolean
- String
- Number
- BigInt
- Symbol
- Object
- Undefined
- Null

TypeScript 延续了 JavaScript 的类型设计，以上8种类型可以看作 TypeScript 的基本类型。

注意，上面所有类型的名称都是小写字母，首字母大写的`Number`、`String`、`Boolean`都是语言内置的对象，而不是类型名称。

注意，undefined 和 null 既可以作为值，也可以作为类型，取决于在哪里使用它们。

上面的基本类型，还可以组合成复杂类型。


针对JavaScript中的每一种原始数据类型，TypeScript都提供了对应的类型：

- boolean
- string
- number
- bigint
- symbol
- undefined
- null

String 类型指的是字符串的包装对象，`string`代表字符串原始值。

```typescript
const s1:String = new String('hello');
const s2:string = 'hello';
```

由于 JavaScript 字符串可以自动转为对象，所以字面量直接赋值给 String 类型是可以的。

```typescript
const s1:String = 'hello';
```

但是反过来就不行，字符串对象不能赋值给 string 类型。

```typescript
// 报错
const s2:string = new String('hello');
```

注意，直接调用`String()`，返回值是一个字符串，可以赋值给`string`类型。

```typescript
const s2:string = String('hello');
```

由于大多数使用原始值的场合，都不是使用原始值的包装对象，因此平时主要使用的是`string`类型。

### boolean 类型

`boolean`类型只有`true`和`false`两个值。

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

注意，bigint 类型是 ES2020 标准引入的。如果使用这个类型，TypeScript 编译的目标语法版本不能低于 ES2020。

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

undefined 类型只有一个值`undefined`，表示未定义（即还来不及定义，以后可能会有定义）。

```typescript
let x:undefined = undefined;
```

上面示例中，变量`x`就属于 undefined 类型。

### null 类型

null 类型只有一个值`null`，表示为空（即此处没有值）。

```typescript
const x:null = null;
```

上面示例中，变量`x`就属于 null 类型。

## 值类型

TypeScript 规定，单个值也是一种类型，称为“值类型”。

```typescript
let x:'hello';

x = 'hello'; // 正确
x = 'world'; // 报错
```

上面示例中，变量`x`的类型是字符串`hello`，导致它只能赋值为这个字符串，赋值为其他字符串就会报错。

`const`命令用来声明常量，TypeScript 遇到`const`命令声明的常量，如果代码没有注明类型，就会推断该变量的类型是一个值。

```typescript
// 推断 x 的类型是 “https”，不是 string
const x = 'https';

// 推断 y 的类型是 42，不是 number
const y = 42;

// 推断 z 的类型是 true,不是 boolean
const z = true;
```

上面代码中，TypeScript 推断变量`x`、`y`、`z`的类型，都是它们所被赋予的值，而不是这些变量的基本类型。

由于值类型（比如`hello`）同时也是它的基础类型（比如`string`）的子类型，所以值类型可以赋值给对应的基础类型。

```typescript
const x:'hello' = 'hello';
let y:string = x;
```

上面示例中，变量`y`的类型是 string，但可以赋值为值类型的变量`x`，原因就是`hello`是 string 的子类型。

值类型在变量只能取若干个特定值时很有用。

```typescript
function printText(
  s: string,
  alignment: 'left'|'right'|'center'
) {
  // ...
}
```

上面示例中，函数参数`alignment`的取值只能是 left、right、center 这三个字符串中的一个。它们之间竖线`|`表示联合类型，详见下文的介绍。

下面是另一个例子。

```typescript
function getPort(
  scheme: 'http'|'https'
): 80|443 {
  switch (scheme) {
    case 'http':
      return 80;
    case 'https':
      return 443;
  }
}
```

上面示例中，函数的参数`scheme`和返回值，都是值类型。

## undefined 和 null 的特殊性

TypeScript 规定，任何其他类型的变量都可以赋值为`undefind`或`null`。

```typescript
let age:number = 24;
age = null;      // 正确
age = undefined; // 正确
```

上面代码中，变量`age`的类型是数值，但是赋值为`null`或`undefined`并不报错。

这样设计的原因是，JavaScript 语言的设计是，如果等于`undefined`就表示还没有赋值，如果等于`null`就表示值为空。为了符合 JavaScript 的这种行为，TypeScript 允许`null`或`undefined`这两个值，总是可以赋值给其他类型的变量。

但是有时候，这并不是开发者想要的行为，也不利于发挥类型系统的优势。

```typescript
const obj:object = undefined;
obj.toString() // 错误，但能通过编译
```

上面示例中，变量`obj`等于`undefined`，实际执行时，调用`obj.toString()`会报错，因为`undefined`上面没有这个方法。但是，这段代码可以通过编译，TypeScript 不会检查出错误，原因就在于它允许 object 类型等于 undefined。

为了避免这种情况，TypeScript 提供了一种严格模式。只要打开编译器的`--strictNullChecks`选项，其他类型的变量（除了`any`类型和`unknown`类型）就不能赋值为`null`或`undefined`。

```typescript
// --strictNullChecks=true

let age:number = 24;
age = null;      // 报错
age = undefined; // 报错
```

配置文件`tsconfig.json`打开`strictNullChecks`的写法如下。

```json
{
  "compilerOptions": {
    "strictNullChecks": true
    // ...
  }
}
```

打开`--strictNullChecks`以后，undefined 和 null 这两种值也不能混用。

```typescript
// --strictNullChecks=true

let x:undefined = null; // 报错
let y:null = undefined; // 报错
```

上面示例中，`undefined`类型的变量赋值为`null`，或者`null`类型的变量赋值为`undefind`，都会报错。

总之，开启严格模式后，除了`any`类型、`unknown`类型和自身，`undefined`或`null`赋值给其他类型就会报错。

```typescript
// --strictNullChecks=true

let x:any     = undefined; // 正确
let y:unknown = null; // 正确
```

上面示例中，严格模式下，any 类型和 unknown 类型的变量，可以赋值为`undefined`和`null`。

## 联合类型（Union）

TypeScript 允许多种类型的联合，可以使用`|`运算符将这些类型组成一个并集（union）。联合类型表示一个值的类型可以为若干种类型之一。

```typescript
let x:string|number;
x = 123; // 正确
x = 'abc'; // 正确
```

上面示例中，变量`x`可以是字符串，也可以是数值，只要赋值为这两个类型，都不会报错。

类型并集对于一个变量有多种类型的情况，非常有用。比如，布尔值变量就可以写成下面的形式，非常简洁明了。

```typescript
let setting:true|false;
```

性别变量则可以写成下面这样。

```typescript
let gender:'male'|'female';
```

彩虹色可以写成七种颜色的并集。

```typescript
let rainbowColor:'赤'|'橙'|'黄'|'绿'|'青'|'蓝'|'紫';
```

上一节说过，开启严格模式后，其他类型的变量不能赋值为`undefined`或`null`。这时，如果某个变量需要包含空值，就可以使用联合类型的写法。

```typescript
let name: string | null;
name = "Marius";  // OK
name = null;      // OK
```

上面示例中，变量`name`的值可以是字符串，也可以是`null`。

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

改变成员类型的顺序不影响联合类型的结果类型。

```typescript
type T0 = string | number;
type T1 = number | string;
```

对部分类型成员使用分组运算符不影响联合类型的结果类型。

```typescript
type T0 = (boolean | string) | number;
type T1 = boolean | (string | number);
```

联合类型的成员类型可以进行化简。假设有联合类型“U = T0 | T1”，如果T1是T0的子类型，那么可以将类型成员T1从联合类型U中消去。最后，联合类型U的结果类型为“U = T0”。例如，有联合类型“boolean | true | false”。其中，true类型和false类型是boolean类型的子类型，因此可以将true类型和false类型从联合类型中消去。最终，联合类型“boolean | true | false”的结果类型为boolean类型。

```typescript
type T0 = boolean | true | false;

// 所以T0等同于 T1
type T1 = boolean;
```

如果一个变量有多种类型，处理该变量时，往往需要进行类型缩小，逐一区分该值属于哪一种类型，再进行处理。

```typescript
function printId(id:number|string) {
  // 报错
  console.log(id.toUpperCase());
}
```

上面示例中，函数参数`id`可能是数值，也可能是字符串，这时直接对这个变量调用`toUpperCase()`方法会报错，因为这个方法只存在于字符串，不存在于数值。

解决方法就是对参数`id`做一下类型判断，确定它的类型以后再进行处理。这在 TypeScript 里面叫做“类型缩小”（type narrowing）。

```typescript
function printId(id:number|string) {
  if (typeof id === "string") {
    // 只对字符串，执行 toUpperCase() 方法
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```

上面示例中，函数体内部会判断一下变量`id`的类型，如果是字符串，就对其执行`toUpperCase()`方法。

“类型缩小”是 TypeScript 处理类型并集的标准方法，凡是遇到可能为多种类型的场合，都需要逐一缩小类型进行处理。实际上，可以把并集看成是一种“类型放大”（type widening），处理时就需要“类型缩小”（type narrowing）。

下面是另一个例子。

```typescript
interface Circle {
    area: number;
    radius: number;
}

interface Rectangle {
    area: number;
    width: number;
    height: number;
}

type Shape = Circle | Rectangle;
declare const s: Shape;

s.area; // number
s.radius; // 错误
s.width;  // 错误
s.height; // 错误
```

联合类型如果存在同名属性，则该属性的类型也是联合类型。

```typescript
interface Circle {
    area: bigint;
}

interface Rectangle {
    area: number;
}

declare const s: Circle | Rectangle;

s.area;   // bigint | number
```

如果同名属性是可选的，那么该属性的类型也是可选的。

```typescript
interface Circle {
    area: bigint;
}

interface Rectangle {
    area?: number;
}

declare const s: Circle | Rectangle;

s.area; // bigint | number | undefined
```

## 交叉类型

交叉类型表示一个值同时具有多种类型。

```typescript
interface Clickable {
    click(): void;
}
interface Focusable {
    focus(): void;
}

type T = Clickable & Focusable;
```

上面示例中，类型`T`表示即可以点击，也可以获得焦点的对象。

交叉类型通常与对象类型一起使用。虽然在交叉类型中也允许使用原始类型成员，但结果类型将成为never类型，因此在实际代码中并不常见。

```typescript
type T = boolean & number & string;
```

上面示例中，类型`T`为 never。

如果交叉类型中存在多个相同的成员类型，那么相同的成员类型将被合并为单一成员类型。

```typescript
type T0 = boolean;
type T1 = boolean & boolean;
type T2 = boolean & boolean & boolean;
```

上面示例中，T0、T1和T2都表示同一种类型boolean。

改变成员类型的顺序不影响交叉类型的结果类型。

```typescript
interface Clickable {
    click(): void;
}
interface Focusable {
    focus(): void;
}

type T0 = Clickable & Focusable;
type T1 = Focusable & Clickable;
```

注意，当交叉类型涉及调用签名重载或构造签名重载时便失去了“加法交换律”的性质。因为交叉类型中成员类型的顺序将决定重载签名的顺序，进而将影响重载签名的解析顺序。

```typescript
interface Clickable {
    register(x: any): void;
}
interface Focusable {
    register(x: string): boolean;
}

type ClickableAndFocusable = Clickable & Focusable;
type FocusableAndFocusable = Focusable & Clickable;

function foo(
    clickFocus: ClickableAndFocusable,
    focusClick: FocusableAndFocusable
) {
    let a: void = clickFocus.register('foo');
    let b: boolean = focusClick.register('foo');
}
```

此例第8行和第9行使用不同的成员类型顺序定义了两个交叉类型。第15行，调用“register()”方法的返回值类型为void，说明在ClickableAndFocusable类型中，Clickable接口中定义的“register()”方法具有更高的优先级。第16行，调用“register()”方法的返回值类型为boolean，说明FocusableAndFocusable类型中Focusable接口中定义的“register()”方法具有更高的优先级。此例也说明了调用签名重载的顺序与交叉类型中成员类型的定义顺序是一致的。

对部分类型成员使用分组运算符不影响交叉类型的结果类型。

```typescript
interface Clickable {
  click(): void;
}
interface Focusable {
  focus(): void;
}
interface Scrollable {
  scroll(): void;
}

type T0 = (Clickable & Focusable) & Scrollable;
type T1 = Clickable & (Focusable & Scrollable);
```

上面示例的T0和T1类型是同一种类型。

```typescript
type Combined = { a: number } & { b: string };
type Conflicting = { a: number } & { a: string };
```

只要交叉类型I中任意一个成员类型包含了属性签名M，那么交叉类型I也包含属性签名M。

```typescript
interface A {
    a: boolean;
}

interface B {
    b: string;
}

// 交叉类型如下
{
    a: boolean;
    b: string;
}
```

若交叉类型的属性签名M在所有成员类型中都是可选属性，那么该属性签名在交叉类型中也是可选属性。否则，属性签名M是一个必选属性。

```typescript
interface A {
    x: boolean;
    y?: string;
}
interface B {
    x?: boolean;
    y?: string;
}

// 交叉类型如下
{
    x: boolean;
    y?: string;
}
```

`&`的优先级高于`|`。

```typescript
A & B | C & D
// 该类型等同于如下类型：
(A & B) | (C & D)
```

分配律

```typescript
A & (B | C) 
// 等同于
(A & B) | (A & C)
```

一个稍微复杂的类型等式。

```typescript
(A | B) & (C | D) ≡ A & C | A & D | B & C | B & D
```

```typescript
T = (string | 0) & (number | 'a');
T = (string & number) | (string & 'a') | (0 & number) | (0 & 'a');

T = never | 'a' | 0 | never;
T = 'a' | 0;
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

## Object 类型

Object 类型有一个特点，那就是除了undefined值和 null值外，其他任何值都可以赋值给Object类型。

```typescript
let obj: Object;
 
// 正确
obj = { x: 0 };
obj = true;
obj = 'hi';
obj = 1;
 
// 编译错误
obj = undefined;
obj = null;
```

字符串之所以可以赋值给`Object`类型，是因为字符串可以自动转为对象。

```typescript
'str'.valueOf()
```

## Object 与 object 的区别

```typescript
let x:Object;
let y:object;
```

类型声明为`Object`（大写），表示`x`是`Object`的实例。

`Object`是一个接口。

```typescript
interface ObjectConstructor {
  new(value?: any): Object;
  readonly prototype: Object;
  // ...
}

declare var Object: ObjectConstructor;
```

Object 对应 JavaScript 语言视为对象的值，这包括字符串、数值、布尔值等原始类型，也被认为符合 Object 类型。

这显然很容易混淆，TypeScript 2.2版本就新增了一个新的`object`类型表示非原始类型，即对应那些狭义的真正为对象的值。

```typescript
// 正确
const a:Object = 1;

// 报错
const b:object = 1;
```

Object 类型和 object 类型都只能表示原生提供的属性，用户自定义的属性都不存在于这两个类型。

```typescript
const o1:Object = { foo: 0 };
const o2:object = { foo: 0 };

// 报错
o1.foo
// 正确
o1.toString()

// 报错
o2.foo
// 正确
o2.toString()
```

上面示例中，`foo`是自定义属性，访问就会报错。`toString()`是对象的原生方法，可以正确访问。

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

有了`object`以后，有些场合就能精确表示类型了。比如，`Object.create()`方法的参数不能是原始类型值，只能是对象或`null`。

```typescript
Object.create(123) // 报错
```

如果没有`object`，就没办法精确表示参数类型，只能写成`any`。现在，参数类型就可以写成下面这样。

```typescript
interface ObjectConstructor {
  create(o: object|null, ...):any;
}
```

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