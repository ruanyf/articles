# TypeScript 的对象类型

## 简介

除了原始类型，对象是 JavaScript 最基本的数据结构。TypeScript 对于对象类型有很多规则。

对象类型的最简单声明方法，就是使用大括号表示对象，在大括号内部声明每个属性和方法的类型。

```typescript
const obj:{  
  x:number;
  y:number;  
} = { x: 1, y: 1 };
```

上面示例中，对象`obj`的类型就写在变量名后面，使用大括号描述，内部声明每个属性的属性名和类型。

属性的类型可以用分号结尾，也可以用逗号结尾。

```typescript
// 属性类型以分号结尾
type MyObj = {
  x:number;
  y:number;
};

// 属性类型以逗号结尾
type MyObj = {
  x:number,
  y:number,
};
```

最后一个属性后面，可以写分号或逗号，也可以不写。

一旦声明了类型，对象赋值时，就不能有多余的属性。

```typescript
const obj:{  
  x:number;
  y:number;  
} = { x: 1, y: 1, z: 1 }; // 报错
```

上面示例中，变量`obj`的类型声明里面，只有`x`和`y`两个属性。如果赋值时有多余的属性（比如属性`z`），就会报错。

读写不存在的属性也会报错。

```typescript
const obj:{  
  x:number;
  y:number;  
} = { x: 1, y: 1 };

console.log(obj.z); // 报错
obj.z = 1; // 报错
```

上面示例中，读写不存在的属性`z`都会报错。

同样地，也不能删除类型声明中存在的属性，修改属性值是可以的。

```typescript
const myUser = {
  name: "Sabrina",
};

delete myUser.name // 报错
myUser.name = "Cynthia"; // 正确
```

上面声明中，删除类型声明中存在的属性`name`会报错，但是可以修改它的值。

`type`命令可以为对象类型声明一个别名，这样更简洁，也方便复用。

```typescript
type MyObj = {  
  x:number;
  y:number;  
};

const obj:MyObj = { x: 1, y: 1 };
```

TypeScript 还提供了`interface`命令，可以把对象类型提炼为一个接口。

```typescript
interface MyObj {
  x: number;
  y: number;
}

const obj:MyObj = { x: 1, y: 1 }; 
```

上面示例中，`interface`关键字定义了一个类型接口`myObj`，变量就可以直接指定为该类型。

`interface`命令的详细解释，以及与`type`命令的区别，详见《Interface》一章。

## 可选属性

如果某个属性是可选的（即可以忽略），需要在属性名后面加一个问号。

```typescript
const obj: {  
  x: number;
  y?: number;  
} = { x: 1 };
```

上面示例中，属性`y`是可选的。

可选属性等同于允许赋值为`undefined`，下面两种写法是等效的。

```typescript
type User = {
  firstName: string;
  lastName?: string;
};

// 等同于
type User = {
  firstName: string;
  lastName: string|undefined;
};
```

上面示例中，类型`User`的属性`lastName`可以是字符串，也可以是`undefined`，就表示该属性可以省略不写。

## 只读属性

属性名前面加上`readonly`关键字，表示这个属性是只读属性，不能修改。

```typescript
interface MyInterface {
  readonly prop: number;
}
```

上面示例中，`prop`属性是只读属性，不能修改它的值。

```typescript
const person:{
  readonly age: number
} = { age: 20 };

person.age = 21; // 报错
```

上面示例中，最后一行修改了只读属性`age`，就报错了。

前面说过，对象类型一旦声明，增删属性都是不可以的。

```typescript
const person = {
  age: 20;
}

person.name = '张三'; // 报错
delete person.age // 报错
```

上面示例中，TypeScript 推断变量`person`只有一个属性`age`，增加新属性`name`或者删除`age`属性都会报错。这意味着，TypeScript 的对象类型的结构是固定的，不会改变，但是属性值默认是可以修改的。

```typescript
const person = {
  age: 20;
}

person.age = 21;  // 正确
```

上面示例中，修改对象类型现有属性`age`的值是可以的。

如果希望属性值是只读的，除了声明时加上`readonly`关键字，还有一种方法。可以在赋值时，在对象后面加上只读断言`as const`。

```typescript
const myUser = {
  name: "Sabrina",
} as const;

myUser.name = "Cynthia"; // 报错
```

上面示例中，对象后面加了只读断言`as const`，就变成只读对象了，不能修改属性了。

注意，上面的`as const`属于 TypeScript 的类型推断，如果变量明确地声明了类型，那么 TypeScript 会以声明的类型为准。

```typescript
const myUser:{ name: string } = {
  name: "Sabrina",
} as const;

myUser.name = "Cynthia"; // 正确
```

上面示例中，根据变量`myUser`的类型声明，`name`不是只读属性，但是赋值时又使用只读断言`as const`。这时会以声明的类型为准，因为`name`属性可以修改。

## 字符串索引属性名

如果对象的属性非常多，一个个声明类型就很麻烦，而且有些时候，无法事前知道对象会有多少属性，比如外部 API 返回的对象。这时 TypeScript 允许采用属性名表达式的写法来描述类型，称为“字符串索引属性名”。

```typescript
type MyObj = {
  [property: string]: string
};

const obj:MyObj = {
  foo: 'a',
  bar: 'b',
  baz: 'c',
}; 
```

上面示例中，类型`MyObj`的属性名类型就采用了属性名表达式，写在方括号里面。`[property: string]`的`property`表示属性名，这个是可以随便起的，它的类型是`string`，后面第二个`string`是属性值的类型。也就是说，不管这个对象有多少属性，只要属性名为字符串，且属性值也是字符串，都是合法的。

但是，这种字符串索引属性名，类型的声明太宽泛，约束太少，建议谨慎使用。正常情况下，使用可选属性或者其他写法会更好。

```typescript
type MyObj = {
  foo: string,
  bar?: string,
  baz?: string,
};

const obj:MyObj = {
  foo: 'a',
  bar: 'b',
  baz: 'c',
}; 
```

上面示例中，类型`MyObj`的`foo`属性是必选的，`bar`属性和`baz`属性都是可有可无，这就比字符串索引的约束强了很多。

### 数值索引属性名

JavaScript 数组是一种特殊的对象，可以用数值作为属性名，取出对应位置上的属性值。比如，`arr[0]`表示数组`arr`在0号位置上的属性值，但是实质上`arr`是对象，`0`是属性名。

既然数组是对象，就可以用对象的类型写法描述数组类型。

```typescript
type MyArr = {
  [n:number]: number;
};

const arr:MyArr = [1, 2, 3];
// 等同于
const arr:MyArr = {
  0: 1,
  1: 2,
  2: 3,
};
```

上面示例中，对象类型`MyArr`的属性名是数值，就表示这是数组。`[n:number]`的这种写法就叫做数值索引属性名。

但是，这样写的话，就不能使用各种数组方法，因为类型里面没有定义方法，所以完全不建议这样描述数组类型。

### 解构赋值

解构赋值用于直接从对象中提取属性。

```typescript
const {id, name, price} = product;
```

上面语句从对象`product`提取了三个属性，并声明属性名的同名变量。

解构赋值的类型写法，等同于为对象声明类型。

```typescript
const {id, name, price}:{
  id: string;
  name: string;
  price: number 
} = product;
```

### 其他

注意，TypeScript 不区分对象自身的属性和继承的属性，一律视为对象的属性。

```typescript
interface MyInterface {
  toString(): string; // inherited property
  prop: number; // own property
}

const obj: MyInterface = { // 正确
  prop: 123,
};
```

上面示例中，`obj`只写了`prop`属性，但是不报错。

对象的方法使用函数类型描述。

```typescript
interface myObj {
  x: number;
  y: number;
  add(x:number, y:number): number;
  // 或者写成
  // add: (x:number, y:number) => number;
}

const obj:myObj = { 
  x: 1, 
  y: 1, 
  add(x, y) {
    return x + y;
  } 
}; 
```

上面示例中，类型`myObj`有一个方法`add()`，需要定义它的参数类型和返回值类型。

JavaScript 有这样一种情况，函数除了直接调用，还可以作为对象使用，添加属性。

```javascript
function fn() {
  return 'hello';
}
fn.foo = 'bar';
```

上面示例中，`fn()`是一个函数，也是一个对象，可以添加属性`fn.foo`。它的类型写成下面这样。

```typescript
interface myFn {
  foo: string;
  (): string;
}

const fn:myFn = function () {
  return 'hello';
}
fn.foo = 'bar';
```

上面示例中，接口`myFn`里面的`(): string;`，就表示这个接口可以直接当作函数调用。圆括号表示执行该类型（即调用函数），返回值的类型是`string`。

由于任何函数都可以看作是可以执行的对象，这意味着函数的类型有两种写法，一种是函数的写法，一种是对象的写法。

```typescript
// 写法一
function myfn():string {
  return 'hello world';
}

// 写法二
var myfn: { (): string; } = 
  () => 'hello world';
```

上面示例定义函数类型时，采用了两种写法。写法一是把类型写成函数，写法二是把类型写成对象，两者是等价的。

对象类型也使用方括号读取属性。

```typescript
type User = {name: string, age: number}
type Name = User['name']
```

如果一个属性是可选的，属性名后面可以加问号（？）。

```typescript
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}
```

当一个属性是可选的，并且 strictNullChecks 设置打开以后，直接读取可选属性会报错。

```typescript
function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos; // 报错
  let yPos = opts.yPos; // 报错
  // ...
}
```

如果要使用，必须要检查一下是否为 undefined。

```typescript
function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;

  let yPos = opts.yPos === undefined ? 0 : opts.yPos;

  // ...
}
```

注意，目前没法为对象解构的参数指定类型，因为 JavaScript 为对象解构里面的冒号指定了用途。

```typescript
let { a: newName1, b: newName2 } = o;

// 等同于
let newName1 = o.a;
let newName2 = o.b;
```

上面示例中，冒号不是表示属性`a`和`b`的类型，而是指定新的变量名。如果要为`a`和`b`指定类型，不得不写成下面这样。

```typescript
let { a: newName1, b: newName2 }
  : { a: string; b: number } = o;
```

```typescript
function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
  render(shape); // 报错
  render(xPos); // 报错
}
```

上面示例中，参数解构里面的冒号，作用不是指定类型，而是为对应的参数名指定变量。所以，不存在 shape 变量，而是 shape 属性的值被赋值给了变量 Shape。

## 结构类型原则，子类型

只要对象 B 满足 对象 A 的结构，TypeScript 就认为对象 B 兼容对象 A 的类型，这称为“结构类型”原则（structual typing）。

```typescript
const A = {
  x: number;
};

const B = {
  x: number;
  y: number;
};
```

上面示例中，对象`A`只有一个属性`x`，类型为`number`。对象`B`满足这个特征，因此兼容对象`A`，只要可以使用`A`的地方，就可以使用`B`。

```typescript
const B = {
  x: 1,
  y: 1
};

const A:{ x:number } = B; // 正确
```

上面示例中，`A`和`B`并不是同一个类型，但是`B`可以赋值给`A`，因为`B`满足`A`的结构特征。

根据“结构类型”原则，TypeScript 检查某个值是否符合指定类型时，并不是检查这个值所属的类型，而是检查这个值的结构是否符合要求。

TypeScript 之所以这样设计，是为了符合 JavaScript 的行为。JavaScript 并不关心对象是否严格相似，只要某个对象具有所要求的属性，就可以正确运行。

如果类型 B 可以赋值给类型 A，TypeScript 就认为 B 是 A 的子类型（subtyping），A 是 B 的父类型。子类型满足父类型的所有结构特征，同时还具有自己的特征。凡是可以使用父类型的地方，都可以使用子类型，即子类型兼容父类型。

这种设计有时会导致令人惊讶的结果。

```typescript
type myObj = {
  x: number,
  y: number,
};

function getSum(obj:myObj) {
  let sum = 0;

  for (const n of Object.keys(obj)) {
    const v = obj[n]; // 报错
    sum += Math.abs(v);
  }

  return sum;
}
```

上面示例中，`const v = obj[n]`这一行会报错，原因是 TypeScript 认为`v`的类型是`any`，而不是`number`。虽然函数`getSum()`要求传入参数的类型是`myObj`，但是实际上所有与`myObj`兼容的对象都可以传入，这会导致`obj[n]`取出的属性值不一定是数值，从而`v`的类型只能是`any`。如果写成下面这样，就不会报错。

```typescript
type myObj = {
  x: number,
  y: number,
};

function getSum(obj:myObj) {
  return Math.abs(obj.x) + Math.abs(obj.y); // 正确
}
```

上面示例就不会报错，原因是不管传入什么对象，只要与`myObj`兼容，就能保证`obj.x`和`obj.y`肯定是数值。

## 严格字面量检查

如果对象使用字面量表示，会触发 TypeScript 的严格字面量检查（strict object literal checking）。

它的目的是防止拼写错误，如果字面量的属性名称跟类型定义的不一样，或者多出了未定义的属性，就会报错。

```typescript
const point:{
  x:number;
  y:number;
} = {
  x: 1,
  y: 1,
  z: 1 // 报错
}
```

上面示例中，TypeScript 会对赋值号右边的对象字面量，进行多余属性检查，发现一个多余的属性`z`导致报错。

参数如果不是字面量，就不会触发严格字面量检查，因此就不会报错。这个检查只针对字面量的原因是，函数调用时，参数写成字面量，多出来的属性几乎都是用不到的，或者拼写错误，或者误用了 API。

这条规则可以防止手写对象字面量时，出现拼写错误。

```typescript
type Options = {
  title:string;
  darkMode?:boolean;
};

const Obj:Options = {
  title: '我的网页',
  darkmode: true, // 报错
};
```

上面示例中，属性`darkMode`拼写错了，成了`darkmode`。如果没有严格字面量规则，就不会报错，只要有`title`属性，不管有没有其他属性，都认为符合`Options`类型。

但是，只要使用一个中间变量，就可以规避这条规则。

```typescript
let myOptions = {
  title: '我的网页',
  darkmode: true,
};

const Obj:Options = myOptions;
```

上面示例中，创建了一个中间变量`myOptions`，就不会触发严格字面量规则，因为这时变量`obj`的赋值，不属于直接字面量赋值。

如果你确认字面量没有错误，可以使用类型断言规避这条规则。

```typescript
const Obj:Options = {
  title: '我的网页',
  darkmode: true, 
} as Options;
```

上面示例使用类型断言`as Options`，告诉编译器，字面量符合 Options 类型，就能规避这条规则。

可以使用编译设置`--suppressExcessPropertyErrors`在`tsconfig.json`文件里面关闭多余属性检查。

```typescript
{
  "compilerOptions": {
    "suppressExcessPropertyErrors": true
  }
}
```

如果允许字面量有多余属性，可以像下面这样在类型里面定义一个通用属性。

```typescript
let x: { foo: number, [x: string]: any };
x = { foo: 1, baz: 2 };  // Ok
```

## 最小可选属性规则

如果一个对象的所有属性都是可选的，会触发最小可选属性规则。

```typescript
type Options = {
  a?:number;
  b?:number;
  c?:number;
};

const obj:Options = {
  d: 123 // 报错
};
```

上面示例中，类型`Options`是一个对象，它的所有属性都是可选的，这导致任何对象实际都符合`Options`类型。

为了避免这种情况，TypeScript 添加了最小可选属性规则，规定这时属于`Options`类型的对象，必须至少存在一个可选属性，不能所有可选属性都不存在。这就是为什么上例的`myObj`对象会报错的原因。

这条规则无法通过中间变量规避。

```typescript
const myOptions = { d: 123 };

const obj:Options = myOptions; // 报错
```

上面示例中，即使使用了中间变量`myOptions`，由于存在最小可选属性规则，依然会报错。

## 空对象

空对象是 TypeScript 的一种特殊值，也是一种特殊类型。

```typescript
const obj = {};
obj.prop = 123; // 报错
```

上面示例中，变量`obj`的值是一个空对象，然后对`obj.prop`赋值就会报错。

原因是这时 TypeScript 会推断变量`obj`的类型为空对象，实际执行的是下面的代码。

```typescript
const obj:{} = {};
```

空对象没有自定义属性，所以对自定义属性赋值就会报错。空对象只能使用继承的属性，即继承自原型对象`Object.prototype`的属性。

```typescript
obj.toString() // 正确
```

上面示例中，`toString()`方法是一个继承自原型对象的方法，TypeScript 允许在空对象上使用。

回到本节开始的例子，这种写法其实在 JavaScript 很常见：先声明一个空对象，然后向空对象添加属性。但是，TypeScript 不允许动态添加属性，所以对象不能分步生成，必须生成时一次性声明所有属性。

```typescript
// 错误
const pt = {};
pt.x = 3;
pt.y = 4;

// 正确
const pt = {
  x: 3,
  y: 4
};
```

如果确实需要分步声明，一个比较好的方法是，使用扩展运算符（`...`）合成一个新对象。

```typescript
const pt0 = {};
const pt1 = { x: 3 };
const pt2 = { y: 4 };

const pt = {
  ...pt0, ...pt1, ...pt2
};
```

上面示例中，对象`pt`是三个部分合成的，这样既可以分步声明，也符合 TypeScript 静态声明的要求。

空对象有一个很重要的特性：空对象没有严格字面量检查，任何对象（包括原始类型的值，除了`null`和`undefined`）都兼容空对象的结构，符合空对象类型。

```typescript
let d: {};

d = {};
d = { x: 1 };
d = 'hello';
d = 2;
```

上面示例中，各类类型的值都可以赋值给空对象类型。

但是，反过来不行，空对象不能赋值给其他对象类型，因为不具备其他类型的自定义属性。

```typescript
interface Point { 
  x: number;
  y: number;
}

const pt:Point = {}; // 报错
```

上面示例中，变量`pt`是`Point`类型，被赋值为空对象，就会报错，因为空对象没有`x`属性和`y`属性。

空对象类型没有自定义属性。

```typescript
const obj:{} = { foo: 123 };
obj.foo // 报错
```

上面示例中，第二行代码报错，因为空对象类型没有自定义属性。

可以看到，空对象类型与`Object`类型很像，比如包含原始类型的值，不包含`null`和`undefined`，没有自定义属性等等。实际上，任何属于`Object`类型的值，都可以赋值给空对象类型。

实际编程中，很多开发者把`{}`视为`Object`的一种简写形式。不过，因为不建议使用`Object`类型，所以也不建议使用空对象类型。

```typescript
const obj:Object;
// 等同于
const obj:{};
```

## type 命令

type 命令为类型起别名，使得类型名变得更有意义。

```typescript
type Age = number;
type Weight = number;
```

上面示例中，`type`命令为数值类型起了两个别名`Age`（年龄）和`Weight`（体重）。虽然实际使用时，变量类型指定为`Age`或`Weight`，跟指定为`number`效果完全一样，但是代码的含义更清晰了，而且以后如果要修改类型，也会更方便。

type 别名可以嵌套。

```typescript
type Person = {
  name: string,
  age: Age,
  weight: Weight,
};

// 等同于
type Person = {
  name: string;
  age: Age;
  weight: Weight;
};
```

上面示例中，`type`命令定义了一个对象类型`Person`，里面使用了前面定义的类型别名`Age`和`Weight`。

注意，在对象类型内部，属性的分隔符既可以是逗号，也可以是分号。

使用时变量的类型就能了解它们的含义。

```typescript
type Point = {
  x: number;
  y: number;
};
 
// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

上面示例中，对象的类型被起了一个别名 Point。

任何类型都可以起别名。

```typescript
type ID = number | string;
```

## interface 命令

interface 命令定义类型接口。

```typescript
interface Point {
  x: number;
  y: number;
}

const point: Point = {x: 1, y: 2};

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

interface 的完整用法如下。

```typescript
interface ExampleInterface {
  // Property signature
  myProperty: boolean;

  // Method signature
  myMethod(str: string): number;

  // Index signature
  [key: string]: any;

  // Call signature
  (num: number): string;

  // Construct signature
  new(str: string): ExampleInstance; 
}
```

下面是 interface 定义对象的方法。

```typescript
interface HasMethodDef {
  simpleMethod(flag: boolean): void;
}
interface HasFuncProp {
  simpleMethod: (flag: boolean) => void;
}

const objWithMethod: HasMethodDef = {
  simpleMethod(flag: boolean): void {},
};
const objWithMethod2: HasFuncProp = objWithMethod;
```

interface 也可以表示字典（dictionary）类型的对象。

```typescript
interface TranslationDict {
  [key:string]: string; // (A)
}
const dict = {
  'yes': 'sí',
  'no': 'no',
  'maybe': 'tal vez',
};
```

注意，键名的类型只能是`string`或`number`，不能是其他类型（比如`symbol`），也不能是联合类型`string|number`。

由于 JavaScript 对象的数字键，内部会自动转成字符串键名。所以，数字键对应的值，应该符合字符串键值的类型。

```typescript
interface StringAndNumberKeys {
  [key: string]: Object;
  [key: number]: RegExp;
}
```

上面的定义是正确的，因为数字键的值类型是`RegExp`是字符串键的值类型`Object`的子集。

由于对象的所有键名都是字符串（除了 Symbol 键名），所以一旦定义了序列的字符串属性，其他的属性和方法不能跟字符串序列属性冲突。

```typescript
interface I1 {
  [key: string]: boolean;

  // 报错
  myProp: number;
  
  // 报错
  myMethod(): string;
}
```

下面的类型定义就不会报错。

```typescript
interface I2 {
  [key: string]: number;
  myProp: number;
}

interface I3 {
  [key: string]: () => string;
  myMethod(): string;
}
```


interface 可以使用 extends 关键字继承其他接口。

```typescript
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
 
interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

extends 关键字会从继承的接口里面拷贝属性类型，这样就不必重复书写。

extends 关键字还可以继承多个接口。

```typescript
interface Colorful {
  color: string;
}
 
interface Circle {
  radius: number;
}
 
interface ColorfulCircle extends Colorful, Circle {}
 
const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```

上面示例中，ColorfulCircle 就相当于 Colorful 和 Circle 两个接口合并了。

`&`运算符可以起到两个对象接口合并的作用。

```typescript
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
 
type ColorfulCircle = Colorful & Circle;

function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}
```

extends 还可以当作运算符，起到判断作用，这称为条件类型（conditional type）。

```typescript
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
 
// 等同于 type Example1 = number
type Example1 = Dog extends Animal ? number : string;

// 等同于 type Example2 = string
type Example2 = RegExp extends Animal ? number : string;
```

上面示例中，extends 判断左侧的类型是否继承自右侧的类型。如果是的，返回 true，否则返回 false。

## type 命令与 interface 命令的区别

对象类型有`type`和`interface`两种定义方法。

```typescript
// Object type literal
type ObjType1 = {
  a: boolean,
  b: number;
  c: string,
};

// Interface
interface ObjType2 {
  a: boolean,
  b: number;
  c: string,
}
```

它们都可以使用分号或逗号，作为分隔符。最后一个成员的分隔符是可选的，可以加上，也可以省略。

两者作用类似，几乎所有的 interface 命令都可以改写为 type 命令。

它们有几个区别。

第一个区别，`type`类型可以嵌入行内，但是`interface`不可以。

```typescript
// Inlined object type literal:
function f1(x: {prop: number}) {}

// Referenced interface:
function f2(x: ObjectInterface) {} 
interface ObjectInterface {
  prop: number;
}
```

第二个区别，`type`类型不能有重名。

```typescript
// 报错
type PersonAlias = {first: string};
// 报错
type PersonAlias = {last: string};
```

`interface`可以重名，TypeScript 会将它们自动合并成一个定义。

```typescript
interface PersonInterface {
  first: string;
}
interface PersonInterface {
  last: string;
}
const jane: PersonInterface = {
  first: 'Jane',
  last: 'Doe',
};
```

第三个区别是，`interface`不能包含属性映射（mapping），`type`可以。

```typescript
interface Point {
  x: number;
  y: number;
}

// 正确
type PointCopy1 = {
  [Key in keyof Point]: Point[Key]; // (A)
};

// 报错
interface PointCopy2 {
   [Key in keyof Point]: Point[Key];
};
```

第四个区别是，`this`只能用于`interface`。

```typescript
// 正确
interface AddsStrings {
  add(str: string): this;
};

// 报错
type AddsStrings = {
  add(str: string): this;
};

class StringBuilder implements AddsStrings {
  result = '';
  add(str: string) {
    this.result += str;
    return this;
  }
}
```


它们的区别主要是可扩展性。type 定义的类型别名，无法加新属性。

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

上面代码中，如果要为类型别名`Animal`添加一个属性，只能重新定义一个别名，并使用`&`运算符合并原来的别名。

interface 命令则是总是可以扩展。

```typescript
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}
```

上面示例中，如果要扩展接口，只要再用 interface 命令定义一次同名接口就可以了，它会自动跟原来的接口合并。

如果要为扩展后的接口起一个新的名字，则可以使用 extends 关键字。

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

上面示例中，只要使用`extends`关键字，就能基于原来的接口进行扩展。

因为 inteface 的灵活性更高，所以建议优先使用 inteface，代替 type 命令。

## 多余的属性

TypeScript 允许对象具有多余的属性。

```typescript
interface Point {
  x: number;
  y: number;
}

function computeDistance(point: Point) { /*...*/ }

const obj = { x: 1, y: 2, z: 3 };
computeDistance(obj); // 正确
```

但是，直接传入对象的字面量时，不能有多余的属性。

```typescript
computeDistance({ x: 1, y: 2, z: 3 }); // 报错
computeDistance({x: 1, y: 2}); // 正确
```

这是为了防止直接在代码里面写入对象字面量时，出现打字错误。

如果对象来自代码的其他地方，一般认为就不会包含打字错误。允许多余的属性，就可以极大提高代码的灵活性。

但是有一个例外，空对象总是允许多余的属性。

```typescript
interface Empty { }
const b: Empty = {myProp: 1, anotherProp: 2}; // 正确
```

如果想强制让对象字面量有多余的属性，可以采用下面的断言写法。

```typescript
computeDistance1({ x: 1, y: 2, z: 3 } as Point); 
```

```typescript
interface HasYear {
  year: number;
}

function getAge(obj: HasYear) {
  const yearNow = new Date().getFullYear();
  return yearNow - obj.year;
}
```

上面示例中，函数`getAge()`内部如果引用了对象`obj`除了`year`以外的属性，就会报错。

如果想强制使用没有属性的对象，可以采用下面的写法。

```typescript
interface WithoutProperties {
  [key: string]: never;
}

// 报错
const a: WithoutProperties = { prop: 1 };
```

## 类型断言

类型断言用于在一个大类型之中，指定更具体的类型。

它有两种写法。一种是使用 as 命令。

```typescript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

另一种是使用尖括号。

```typescript
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

注意，类型断言只能用于将大类型断言为其内部更小的类型，不能将小类型断言为更大的类型，或者更改大类型。

```typescript
const x = "hello" as number;
```

如果要更改大类型，可以使用两次 as 命令。

```typescript
const a = (expr as any) as T;
```

上面示例中， 变量 expr 先断言为 any 类型（即取消原有的类型），然后再断言为类型 T。

## readonly 修饰符

`readonly`是对象类型的属性修饰符。标记为`readonly`的属性只能在对象初始化期间赋值，此后就不能修改该属性。

```typescript
type Point = {
  readonly x: number;
  readonly y: number;
};

const p:Point = { x: 0, y: 0 };

p.x = 100; // 报错
```

上面示例中，类型`Point`的属性`x`和`y`都带有修饰符`readonly`，表示这两个属性只能在初始化期间，后面再修改就会报错。

## unknown 类型

`unknown`类型表示对象可以有未知属性。

```typescript
interface PrettierConfig {
  [prop: string]: unknown;
  printWidth?: number;
  tabWidth?: number;
  semi?: boolean;
}

// 不加 unknown 类型
const prettierConfig: PrettierConfig = {
  semicolons: true, // Error
};

// 添加 unknown 类型
const prettierConfig: PrettierConfig = {
  semicolons: true, // 正确
};
```

注意，一旦对象包含了指定属性，再指定其他属性，传入函数就不会报错。

```typescript
interface PrettierConfig {
  printWidth?: number;
  tabWidth?: number;
  semi?: boolean;
}

function createFormatter(config: PrettierConfig) {
  // ...
}

const prettierConfig = {
  printWidth: 100,
  semicolons: true,
};

const formatter = createFormatter(prettierConfig);
```
