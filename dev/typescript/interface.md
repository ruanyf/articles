# TypeScript 的 interface 接口

## 简介

interface 是一种类型约定，中文译为“接口”。变量指定为某个接口，就表示遵守约定。

很多面向对象的编程语言都有 interface 语法结构，用来表示对象必须实现的属性和方法。TypeScript 也提供了 interface 命令。

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}
```

上面的示例定义了一个接口`Person`，它相当于对象的模板。任何实现这个接口的对象，都必须部署接口定义的属性`firstName`、`lastName`和`age`，并且必须符合规定的类型。

对象实现这个接口就很简单，只要指定对象的类型为该接口即可。

```typescript
const p:Persion = {
  firstName: 'John',
  lastName: 'Smith',
  age: 25
};
```

interface 是一种表达能力很强的语法，它的成员可以有5种形式。

- 属性签名
- 调用签名
- 构造签名
- 方法签名
- 索引签名

属性签名。

```typescript
interface Point {
  x: number;
  y: number;
}
```

如果属性是可选的，就在属性名后面加一个问号。

```typescript
interface Foo {
  x?: string;
  y?(): number;
}
```

如果属性是只读的，需要加上`readonly`修饰符。

```typescript
interface A {
  readonly a: string;
}
```

字符串索性签名。

```typescript
interface A {
  [prop: string]: number;
}
```

一个接口中最多只能定义一个字符串索引签名。字符串索引签名会约束该对象类型中所有属性的类型。例如，下例中的字符串索引签名定义了索引值的类型为number类型。那么，该接口中所有属性的类型必须能够赋值给number类型。

```typescript
interface B {
  [prop: string]: number;
 
  a: boolean;      // 编译错误
  b: () => number; // 编译错误
  c(): number;     // 编译错误
}
```

数值索引签名，也就是数组。

```typescript
interface A {
  [prop: number]: string;
}
 
const obj: A = ['a', 'b', 'c'];
```

一个接口中最多只能定义一个数值索引签名。数值索引签名约束了数值属性名对应的属性值的类型。

若接口中同时存在字符串索引签名和数值索引签名，那么数值索引签名的类型必须能够赋值给字符串索引签名的类型。因为在JavaScript中，对象的属性名只能为字符串（或Symbol）。虽然JavaScript也允许使用数字等其他值作为对象的索引，但最终它们都会被转换为字符串类型。因此，数值索引签名能够表示的属性集合是字符串索引签名能够表示的属性集合的子集。

```typescript
interface A {
    [prop: string]: number;
    [prop: number]: string; // 编译错误
}
```

方法签名。

```typescript
// 写法一
interface A {
  f(x: boolean): string;       // 方法签名
}

// 写法二
interface C {
  f: (x: boolean) => string;   // 属性签名和函数类型字面量
}

// 写法三
interface B {
  f: { (x: boolean): string }; // 属性签名和对象类型字面量
}
```

属性表达式。

```typescript
const f = 'f';
 
interface A {
  [f](x: boolean): string;
}
```

类型方法可以重载。

```typescript
interface A {
  f(): number;
  f(x: boolean): boolean;
  f(x: string, y: string): string;
}
```

调用签名

```typescript
interface ErrorConstructor {     
  (message?: string): Error;
}
```

构造签名

```typescript
interface ErrorConstructor {
  new (message?: string): Error;
}
```

## 数组接口

接口也可以表示数组。

```typescript
interface namelist {
  [index:number]:string
}

var list2: namelist =["John",1,"Bran"] //Error. 1 is not type string 

interface ages {
  [index:string]: number
}

var agelist: ages;
agelist["John"]=15 // Ok
agelist[2]="nine" // Error
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

## 元组的写法

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

## interface 的继承

接口可以继承其他类型，能够继承的其他类型有下面这些。

- 接口。
- 对象类型的类型别名。
- 类。
- 对象类型的交叉类型。

### interface 继承 interface

子接口使用`extends`关键字继承父接口。

```typescript
interface Shape {
   name: string;
}
 
interface Circle extends Shape {
  radius: number;
}
```

接口允许多重继承。

```typescript
interface Style {
  color: string;
}
 
interface Shape {
   name: string;
}
 
interface Circle extends Style, Shape {
  radius: number;
}
```

如果子接口与父接口之间存在同名的类型成员，那么子接口中的类型成员具有更高的优先级。同时，子接口与父接口中的同名类型成员必须是类型兼容的。也就是说，子接口中同名类型成员的类型需要能够赋值给父接口中同名类型成员的类型，否则将产生编译错误。

```typescript
interface Style {
  color: string;
}
 
interface Shape {
    name: string;
}
 
interface Circle extends Style, Shape {
    name: 'circle';

    color: number;
//  ~~~~~~~~~~~~~
//  编译错误：'color' 类型不兼容，
//  'number' 类型不能赋值给 'string' 类型
}
```

如果仅是多个父接口之间存在同名的类型成员，而子接口本身没有该同名类型成员，那么父接口中同名类型成员的类型必须是完全相同的，否则将产生编译错误。

```typescript
interface Style {
  draw(): { color: string };
}

interface Shape {
    draw(): { x: number; y: number };
}
 
interface Circle extends Style, Shape {}
//        ~~~~~~
//        编译错误
```

解决这个问题的一个办法是，在Circle接口中定义一个同名的draw方法。这样Circle接口中的draw方法会拥有更高的优先级，从而取代父接口中的draw方法。这时编译器将不再进行类型合并操作，因此也就不会发生合并冲突。但是要注意，Circle接口中定义的draw方法一定要与所有父接口中的draw方法是类型兼容的。

```typescript
interface Style {
  draw(): { color: string };
}
 
interface Shape {
  draw(): { x: number; y: number };
}
 
interface Circle extends Style, Shape {
  draw(): { color: string; x: number; y: number };
}
```

```typescript
interface Person{age: number}

interface Musician extends Person{
  instrument:string
}

var drummer =<Musician>{};

drummer.age =27;
drummer.instrument="Drums";
```

多重继承的例子。

```typescript
interface IParent1{
  v1: number
}
interface IParent2{
  v2: number
}
interface Child extends IParent1,IParent2 {}

var Iobj:Child={
  v1:12,
  v2:23
}

console.log("value 1: "+ Iobj.v1 +" value 2: " + Iobj.v2)
```

### interface 继承 class

inteface 除了继承另一个 interface,还可以继承 class，继承该类中所有成员。

```typescript
class A {
    x: string = '';

    y(): boolean {
        return true;
    }
}

interface B extends A {}

declare const b: B;

b.x;   // 类型为string
b.y(); // 类型为boolean
```

在接口继承类时，接口不但会继承基类的公有成员类型，还会继承基类的受保护成员类型和私有成员类型。如果接口从基类继承了非公有成员，那么该接口只能由基类的子类来实现。

```typescript
class A {
    private x: string = '';
    protected y: string = '';
}

// 接口 I 能够继承 A 的私有属性和受保护属性
interface I extends A {}

// 正确，B 可以实现接口 I，因为私有属性和受保护属性源自同一个类 A
class B extends A implements I {}
 
// 错误！C 不是 A 的子类，无法实现 A 的有属性和受保护属性
class C implements I {}
```

### interface 继承 type

interface 可以继承`type`命令定义的对象类型。

```typescript
type Country = {
 name: string;
 capital: string;
}

interface CountryWithPop extends Country {
  population: number;
}
```

上面示例中，`CountryWithPop`继承了`type`命令定义的`Country`对象，并且新增了一个`Country`属性。

注意，如果`type`命令定义的类型不是对象，interface 就无法继承。

## 子接口引用

如果子接口不是扩充父接口，而是引用父接口。也就是说，子接口是父接口的一部分，那么有一种简便写法。

```typescript
interface State {
  userId:string;
  pageTitle:string;
  recentFiles:string[];
  pageContents:string;
}

interface SubState {
  userId:string;
  pageTitle:string;
  recentFiles:string[];
}
```

上面示例中，`SubState`是`State`的子接口，除了少了一个`pageContents`属性，其他都一样。

这时，如果两个接口像上面这样声明，除了重复声明，还会丢失两者之间的联系。更好的写法是像下面这样。

```typescript
type SubState = {
  userId:State['userId'];
  pageTitle:State['pageTitle'];
  recentFiles:State['recentFiles'];
};
```

上面示例中，`SubState`的每个属性值的类型，都是引用`State`的同名属性，这样就明确表示了两者之间的联系。

上面的写法还可以进一步简化。

```typescript
type TopNavState = {
  [k in 'userId'|'pageTitle'|'recentFiles']: State[k]
};
```

上面示例中，属性名表达式是一个映射，`in`运算符表示属性名依次等于后面三个值之一，详见《映射》一章。

如果结合联合类型，子接口可以引用多个父接口。

```typescript
interface SaveAction {
  type: 'save';
}
interface LoadAction {
  type: 'load';
}

type Action = SaveAction|LoadAction;

// 类型为 "save"|"load"
type ActionType = Action['type']; 
```

上面示例中，`ActionType`同时是`SaveAction`和`LoadAction`的子接口，这时可以使用联合类型写一个中间类型`Action`，简化`ActionType`的写法。

## 接口合并

多个同名接口会合并成一个接口。

```typescript
interface Box {
  height: number;
  width: number;
}
interface Box {
  scale: number;
}
let box: Box = { height: 5, width: 6, scale: 10 };
```

这样的设计主要是为了方便 JavaScript 开发者扩充外部函数库。在外部库的基础上，添加自己的方法是通行的做法，有了 interface 自动合并，扩展外部类型就会非常方便。

网页编程经常会在`windows`对象和`document`对象添加自定义属性，但是 TypeScript 会报错。解决方法就是把自定义属性，用 interface 合并的形式，添加到原始定义里面。

```typescript
interface Document {
  foo: string;
}

document.foo = 'hello'; 
```

上面示例中，接口`Document`增加了一个自定义属性`foo`，从而就可以在`document`对象上使用自定义属性。

每个接口的非函数成员应该是唯一的。如果它们不是唯一的，则必须属于同一类型。如果接口都声明了同名但类型不同的非函数成员，编译器将发出错误。

```typescript
interface A {
    a: number;
}

interface A {
    a: string; // 编译错误
}
```

如果有同名函数，接口合并后，每个同名函数都被视为描述同一函数的重载。注意，后面的接口比前面的接口具有更高的优先级。

```typescript
interface Cloner {
  clone(animal: Animal): Animal;
}
interface Cloner {
  clone(animal: Sheep): Sheep;
}
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}

// 等同于
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}
```

但是，如果参数的类型是单个具体的值，那么接口合并后，这些单个值类型的接口会冒泡到最上方。

合并重载签名的基本原则是后声明的重载签名具有更高优先级。但也存在一个例外，若重载签名的参数类型中包含字面量类型，则该重载签名具有更高的优先级。例如，下例中尽管第2行的方法签名f是先声明的，但在接口合并后仍具有更高的优先级，因为它的函数签名中带有字面量类型。

```typescript
interface A {
    f(x: 'foo'): boolean;
}

interface A {
    f(x: any): void;
}

interface MergedA {
    f(x: 'foo'): boolean;
    f(x: any): void;
}
```


```typescript
interface Document {
  createElement(tagName: any): Element;
}
interface Document {
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
  createElement(tagName: string): HTMLElement;
  createElement(tagName: "canvas"): HTMLCanvasElement;
}

// 等同于
interface Document {
  createElement(tagName: "canvas"): HTMLCanvasElement;
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
  createElement(tagName: string): HTMLElement;
  createElement(tagName: any): Element;
}
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

## interface 与 type 的区别

从作用上看，`interface`命令与`type`命令很相似。很多类型即可以用 interface 表示，也可以用 type 表示。很多时候，两者可以换用。

它们的相同之处，在于都能为类型起名。

```typescript
type Country = {
 name: string;
 capital: string;
}
interface Coutry {
 name: string;
 capital: string;
}
```

上面示例是`type`命令和`interface`命令，分别定义同一个类型。

`class`命令也有类似作用，通过定义一个类，同时定义一个类型。但是，它会创造一个值，编译后依然存在。如果只是单纯想要一个类型，应该使用`type`或`interface`。

它们的区别有下面几点。

（1）`type`能够表示非对象类型，而`interface`只能表示对象类型（包括数组、函数等）。

任何类型都用`type`命令定义别名，但是只有对象类型才能用`interface`定义。

（2）`interface`可以继承其他类型，`type`不支持继承。

继承的主要作用是添加属性，`type`定义的对象类型如果想要添加属性，只能使用`&`运算符，重新定义一个类型。

```typescript
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}
```

上面示例中，类型`Bear`在`Animal`的基础上添加了一个属性`honey`。

作为比较，`interface`添加属性，采用的是继承的写法。

```typescript
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}
```

同名 interface 会合并，定义同名 type 则会报错。这表明，inteface 是开放的，可以添加属性，type 是封闭的，不能添加属性，只能定义新的 type。

注意，type 和 interface 是可以换用的。

接口扩展类型别名

type PartialPointX = { x: number; };
interface Point extends PartialPointX { y: number; }

类型别名扩展接口

interface PartialPointX { x: number; }
type Point = PartialPointX & { y: number; };

（3）`interface`无法表达某些复杂类型（比如交叉类型和联合类型），但是`type`可以。

```typescript
type A = { /* ... */ };
type B = { /* ... */ };

type AorB = A | B;
type AorBwithName = AorB & { name: string };
```

上面示例中，类型`AorB`是一个联合类型，`AorBwithName`则是为`AorB`添加一个属性。这两种运算，`interface`都没法表达。

（4）同名`interface`会自动合并，同名`type`则会报错。也就是说，TypeScript 不允许使用`type`多次定义同一个类型。

```typescript
type A = { foo:number }; // 报错
type A = { bar:number }; // 报错
```

上面示例中，`type`两次定义了类型`A`，导致两行都会报错。

作为比较，`interface`则会自动合并。

```typescript
interface A { foo:number };
interface A { bar:number };

const obj:A = {
  foo: 1,
  bar: 1
};
```

上面示例中，`interface`把类型`A`的两个定义合并在一起。

（5）总结：如果有复杂的类型运算，没有选择只有使用`type`；如果需要扩充类型或自动合并，那么可以使用`interface`。
