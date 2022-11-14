# TypeScript 的 interface 接口

## 简介

interface 是对象的模板，可以看作是一种类型约定，中文译为“接口”。使用了这个模板的对象，就拥有了指定的类型结构，

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}
```

上面示例中，定义了一个接口`Person`，它指定一个对象模板，拥有三个属性`firstName`、`lastName`和`age`。任何实现这个接口的对象，都必须部署这三个属性，并且必须符合规定的类型。

实现该接口很简单，只要指定它作为对象的类型即可。

```typescript
const p:Person = {
  firstName: 'John',
  lastName: 'Smith',
  age: 25
};
```

上面示例中，变量`p`的类型就是接口`Person`，所以必须符合`Person`指定的结构。

interface 可以表示对象的各种语法，它的成员有5种形式。

- 对象属性
- 对象的属性索引
- 对象方法
- 函数
- 构造函数

（1）对象属性

```typescript
interface Point {
  x: number;
  y: number;
}
```

上面示例中，`x`和`y`都是对象的属性，分别使用冒号指定每个属性的类型。

属性之间使用分号或逗号分隔，最后一个属性结尾的分号或逗号可以省略。

如果属性是可选的，就在属性名后面加一个问号。

```typescript
interface Foo {
  x?: string;
}
```

如果属性是只读的，需要加上`readonly`修饰符。

```typescript
interface A {
  readonly a: string;
}
```

（2）对象的属性索引

```typescript
interface A {
  [prop: string]: number;
}
```

上面示例中，`[prop: string]`就是属性的字符串索引，表示属性名只要是字符串，都符合类型要求。

属性索引共有`string`、`number`和`symbol`三种类型。

一个接口中，最多只能定义一个字符串索引。字符串索引会约束该类型中所有名字为字符串的属性。

```typescript
interface MyObj {
  [prop: string]: number;
 
  a: boolean;      // 编译错误
}
```

上面示例中，属性索引指定所有名称为字符串的属性，它们的属性值必须是数值（`number`）。属性`a`的值为布尔值就报错了。

属性的数值索引，其实是指定数组的类型。

```typescript
interface A {
  [prop: number]: string;
}
 
const obj:A = ['a', 'b', 'c'];
```

上面示例中，`[prop: number]`表示属性名的类型是数值，所以可以用数组对变量`obj`赋值。

同样的，一个接口中最多只能定义一个数值索引。数值索引会约束所有名称为数值的属性。

如果一个 interface 同时定义了字符串索引和数值索引，那么数值索性必须服从于字符串索引。因为在 JavaScript 中，数值属性名最终是自动转换成字符串属性名。

```typescript
interface A {
  [prop: string]: number;
  [prop: number]: string; // 报错
}

interface B {
  [prop: string]: number;
  [prop: number]: number; // 正确
}
```

上面示例中，数值索引的属性值类型与字符串索引不一致，就会报错。数值索引必须兼容字符串索引的类型声明。

（3）对象的方法

对象的方法共有三种写法。

```typescript
// 写法一
interface A {
  f(x: boolean): string;
}

// 写法二
interface B {
  f: (x: boolean) => string; 
}

// 写法三
interface C {
  f: { (x: boolean): string };
}
```

属性名可以采用表达式，所以下面的写法也是可以的。

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

interface 里面的函数重载，不需要给出实现。但是，由于对象内部定义方法时，无法使用函数重载的语法，所以需要额外在对象外部给出函数方法的实现。

```typescript
interface A {
  f(): number;
  f(x: boolean): boolean;
  f(x: string, y: string): string;
}

function MyFunc(): number;
function MyFunc(x: boolean): boolean;
function MyFunc(x: string, y: string): string;
function MyFunc(
  x?:boolean|string, y?:string
):number|boolean|string {
  if (x === undefined && y === undefined) return 1;
  if (typeof x === 'boolean' && y === undefined) return true;
  if (typeof x === 'string' && typeof y === 'string') return 'hello';
  throw new Error('wrong parameters');  
}

const a:A = {
  f: MyFunc
}
```

上面示例中，接口`A`的方法`f()`有函数重载，需要额外定义一个函数`MyFunc()`实现这个重载，然后部署接口`A`的对象`a`的属性`f`等于函数`MyFunc()`就可以了。

（4）函数

interface 也可以用来声明独立的函数。

```typescript
interface Add {
  (x:number, y:number): number;
}

const myAdd:Add = (x,y) => x + y;
```

上面示例中，接口`Add`声明了一个函数类型。

（5）构造函数

interface 内部可以使用`new`关键字，表示构造函数。

```typescript
interface ErrorConstructor {
  new (message?: string): Error;
}
```

上面示例中，接口`ErrorConstructor`内部有`new`命令，表示它是一个构造函数。

TypeScript 里面，构造函数特指具有`constructor`属性的类，详见《Class》一章。

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

## interface 命令

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
