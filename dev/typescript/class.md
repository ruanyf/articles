# 类

## 概述

在类的内部，首先给出实例属性的类型注释，然后再定义方法。

```typescript
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
}
```

上面示例中，实例属性`x`和`y`的类型是`number`。

```typescript
class Color {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

这个类定义创建了两件事。

首先，一个名为Color（可以通过调用new）的构造函数：

```typescript
assert.equal(
  typeof Color, 'function')
```

其次，创建了一个名为`Color`实例类型。

```typescript
const green: Color = new Color('green');
```

注意，类名`Color`作为类型使用时，只能用来表示实例的类型，不能用来表示类本身。

```typescript
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

// 错误
function createPoint(PointClass:Point, x: number, y: number) { // (A)
  return new PointClass(x, y);
}

// 正确
function createPoint(PointClass: typeof Point, x: number, y: number) { 
  return new PointClass(x, y);
}
// 或者
function createPoint(
  PointClass: new (x: number, y: number) => Point, // (A)
  x: number, y: number
) {
  return new PointClass(x, y);
}
// 或者
function createPoint(
  PointClass: {new (x: number, y: number): Point},
  x: number, y: number
) {
  return new PointClass(x, y);
}

const point = createPoint(Point, 3, 6);
assert.ok(point instanceof Point);
```

上面示例中，`Point`作为类型时，不能用来表示类本身。这里是要传入一个类，作为构造函数使用，所以必须写成`typeof Point`。

如果属性是构造函数的参数，那么声明属性有一种简便写法，前面需要加上 public、private、protected。

```typescript
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}

// 等同于
class Params {
  public readonly x: number,
  protected y: number,
  private z: number

  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
```

类的内部也可以包括构造函数的类型签名。

```typescript
class Point {
  // Overloads
  constructor(x: number, y: string);
  constructor(s: string);
  constructor(xs: any, y?: any) {
    // TBD
  }
}
```

注意，构造函数的类型签名不能有返回值的类型，因为它总是返回当前类的实例。

类也可以有索引签名。

```typescript
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);
 
  check(s: string) {
    return this[s] as boolean;
  }
}
```

在 TypeScript 中声明一个类，同时也声明这个类的接口（interface）。

这就是说，类本身也是一个类型，比如上面例子的类`Point`本身就是一个类型，方法`add()`的参数就是`Point`类型。

继承的时候，只需要给出新增属性的类型注释，不需要给出继承属性的类型注释。

```typescript
class Point3D extends Point {
    z: number;
    constructor(x: number, y: number, z: number) {
        super(x, y);
        this.z = z;
    }
    add(point: Point3D) {
        var point2D = super.add(point);
        return new Point3D(point2D.x, point2D.y, this.z + point.z);
    }
}
```

上面示例中，实例属性`z`是`Point3D`新增的属性，所以需要给出类型注释。实例属性`x`和`y`是继承的属性，不用重复给出类型注释了。

## class 类型

class 可以作为类型使用。

```typescript
class Foo {
  x:number;
  constructor() {
    this.x = 123;
  }
}

const f:Foo = new Foo();
```

上面示例中，`Foo`是一个类，可以作为类型使用，指定变量`f`为该类型就表示`f`是`Foo`的一个实例。

TypeScript 规定，只要两个类的结构相同（属性和方法相同），就认为这两个类的类型相同，可以互相替代。

```typescript
class Person {
  name: string;
}

class Customer {
  name: string;
}

// 正确
const cust:Customer = new Person();
```

上面示例中，`Person`和`Customer`是两个结构相同的类，TypeScript 将它们视为相同类型，因此可以互相替换。

现在修改一下代码，`Person`类添加一个属性。

```typescript
class Person {
  name: string;
  age: number;
}

class Customer {
  name: string;
}

// 正确
const cust:Customer = new Person();
```

上面示例中，`Person`类添加了一个属性`age`，跟`Customer`类的结构不再相同。但是这种情况下，TypeScript 依然认为，`Person`属于`Customer`类型。这是因为在使用`Customer`类型的情况下，应该只会用到它的`name`属性，而`Person`类具有`name`属性，可以认为符合`Customer`的结构，它多出来的`age`属性由于用不到，可以不予考虑。

反过来就不行，如果`Customer`类多出一个属性，就会编译报错。

```typescript
class Person {
  name: string;
}

class Customer {
  name: string;
  age: number;
}

// 报错
const cust:Customer = new Person();
```

上面示例中，`Person`类比`Customer`类少一个属性`age`，它就不属于`Customer`类型。因为在使用`Customer`类型的情况下，可能会用到它的`age`属性，而`Person`类就没有这个属性。

这说明，只要 A 类具有 B 类的结构，哪怕还有额外的属性和方法，TypeScript 也认为 A 属于 B 的类型。

不仅是类，如果某个对象跟某个 class 结构相同，TypeScript 也认为两者的类型相同。

```typescript
class Person {
  name: string;
}

const obj = { name: 'John' };
const p:Person = obj; // 正确
```

上面示例中，对象`obj`并不是`Person`的实例，但是赋值给变量`p`不会报错，TypeScript 认为`obj`也属于`Person`类型，因为它们的属性相同。

由于这种情况，运算符`instanceof`不适用于判断某个对象是否跟某个 class 属于同一类型。

```typescript
obj instanceof Person // false
```

上面示例中，运算符`instanceof`确认变量`obj`不是 Person 的实例，但是两者的类型是相同的。

## 使用 inteface

另一种给出 Class 类型注释的方法，就是使用 interface。这时要使用 implements 关键字。

```typescript
interface Point {
    x: number;
    y: number;
    z: number; // New member
}

class MyPoint implements Point { // ERROR : missing member `z`
    x: number; y: number;
}
```

类可以实现多个接口，例如`class C implements A, B {`。

注意，interface 描述的是类的对外接口，所以只能定义公开属性，不能定义私有属性。

```typescript
interface IFoo
{
  private member: {}; // 报错
}
```

## 访问修饰符

TypeScript 提供了三个访问修饰符（access modifiers），控制类的成员的可访问性：`public`、`private`和`protected`。

### public

`public`是公开属性，实例可以获取的属性。

```typescript
class Greeter {
  public greet() {
    console.log("hi!");
  }
}
const g = new Greeter();
g.greet();
```

`public`是属性的默认状态，可以省略不写。

公开属性有一种简便写法，就是用在构造函数的属性前面。

```typescript
clss Foo {
  bar: string;
}

// 等同于
class Foo {
  constructor(public bar:string) {
    // ...
  }
}
```

上面示例中，`Foo`类的内部声明了一个属性`bar`，相当于构造函数的`bar`参数用`public`修饰，两种写法是等价的。`public`就相当于表明，构造函数的这个参数是可以公开访问的。

### private

`private`是私有属性，只能用在定义它的类内部，实例和子类都不能读取私有属性。

```typescript
class Base {
  private x:number = 0;
}
const b = new Base();
console.log(b.x); // 报错

class Derived extends Base {
  showX() {
    // 报错
    console.log(this.x); 
  }
}
```

这也意味着，子类不能定义跟父类 private 属性同名的属性。

```typescript
class Base {
  private x = 0;
}
class Derived extends Base {
  // 报错
  x = 1;
}
```

注意，private 并不是真正意义的私有属性。一方面，编译成 JavaScript 后，private 关键字就被剥离了，该属性可以正常在实例上访问。另一方面，就算是在 TypeScript 代码里面，使用方括号写法（`[]`），就能从实例上拿到该属性。

```typescript
class MySafe {
  private secretKey:number = 12345;
}
 
const s = new MySafe();
console.log(s["secretKey"]); // 12345
```

如果想获得真正意义的私有属性，建议使用 ES6 的私有属性写法`#propName`。

```javascript
class MySafe {
  #secretKey = 12345;
}
 
const s = new MySafe();
console.log(s["secretKey"]); // undefined
```

### 私有构造函数

构造函数也可以是私有的，这就防止了直接用`new`命令生成类的实例。

通常，这时会有一个静态方法，充当工厂函数，要求所有实例都通过该方法生成。

```typescript
class DataContainer {
  #data: string;
  static async create() {
    const data = await Promise.resolve('downloaded'); // (A)
    return new this(data);
  }
  private constructor(data: string) {
    this.#data = data;
  }
  getData() {
    return 'DATA: '+this.#data;
  }
}
DataContainer.create()
  .then(dc => assert.equal(
    dc.getData(), 'DATA: downloaded'));
```

上面示例中，所有实例都通过静态方法`DataContainer.create()`生成。

### protected

`protected`也是私有属性，实例无法读取该属性，但是子类可以读取。

```typescript
class Greeter {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName() {
    return "hi";
  }
}
 
class SpecialGreeter extends Greeter {
  public howdy() {
    // OK to access protected member here
    console.log("Howdy, " + this.getName());
  }
}
const g = new SpecialGreeter();
g.greet(); // OK
g.getName(); // 报错
```

注意，父类`protected`属性，子类可以将其对外公开。

```typescript
class Base {
  protected m = 10;
}
class Derived extends Base {
  // No modifier, so default is 'public'
  m = 15;
}
const d = new Derived();
console.log(d.m); // OK
```

上面示例中，子类 Derived 的属性 m 前面没有修饰符，所以等同于这里的修饰符是`public`，所以外界可以读取这个属性。

这提醒我们，如果子类继续保持父类的私密属性，那么属性名前面不要忘记加上`protected`。

protected 属性还意味着，不能从父类的实例访问该属性。

```typescript
class Base {
  protected x: number = 1;
}
class Derived1 extends Base {
  protected x: number = 5;
}
class Derived2 extends Base {
  f1(other: Derived2) {
    other.x = 10;
  }
  f2(other: Base) {
    other.x = 10; // 报错
  }
}
```

不过，父类内部访问该属性是没有问题的。

```typescript
class FooBase {
    public x: number;
    private y: number;
    protected z: number;
}

var foo = new FooBase();
foo.x; // okay
foo.y; // ERROR : private
foo.z; // ERROR : protected

class FooChild extends FooBase {
    constructor() {
      super();
        this.x; // okay
        this.y; // ERROR: private
        this.z; // okay
    }
}
```

上面示例中，实例只能访问属性`x`，不能访问属性`y`和`z`。子类可以访问属性`x`和`z`，但不能访问属性`y`。

如果不注明，默认的访问修饰符是`public`。

有些实例属性，是由构造函数的参数传入的。这样等于要给出两次类型注释，一次在类的头部，另一次在构造函数的参数里面，这有一点累赘。所以，TypeScript 提供了一种简写形式。

```typescript
class Foo {
    public x: number;
    constructor(x:number) {
        this.x = x;
    }
}

// 等同于
class Foo {
    constructor(public x:number) {
    }
}
```

上面示例的简写形式，自动将`public x`声明为实例属性。

### readonly 修饰符

`readonly`用来修饰类的某个属性，表示该属性只能在初始化时或构造方法里面设置，一旦设置后就不能更改它的值，即该属性设置后就变成只读了。

```typescript
class Greeter {
  readonly name: string = "world"; // 正确
  constructor() {
    this.name = 'otherName'; // 正确
  }

  err() {
    // 报错
    this.name = "not ok";
  }
}

const g = new Greeter();
// 报错
g.name = "also not ok";
```

上面示例中，`g.name`是一个只读属性，可以在初始化时或构造方法里面设置（如果两个地方都设置了，以构造函数为准），在其他方法修改该属性都会报错。

`readonly`属性也可以采用构造函数参数的简便写法。

```typescript
class Foo {
  readonly bar:string;
}

// 等同于
class Foo {
  constructor(readonly bar:string) {
    // ...
  }
}
```

## abstract

`abstrct`也是一个修饰符，不仅可以用于类的成员，也可以用于类本身。

抽象类表明这个类不能实例化，必须用子类继承后，对子类实例化。也就是说，抽象类只用于定义类的原型，必须继承后使用。

抽象方法没有实现，只有类型签名。每个子类必须有一个具有相同名称和兼容类型签名的具体方法。如果一个类有任何抽象方法，它也必须是抽象的。

`abstract`的作用是，确保一系列相关的子类拥有跟基类相同的接口，可以看作是模板，其中每个抽象方法都是必须由子类填充（实现）的空白。对于抽象类里面的非抽象方法，则表示是子类已经实现的接口。

虽然一个类可以实现多个接口，但它最多只能扩展一个抽象类。

注意，“抽象”只存在于编译时。在运行时，抽象类是普通类，不存在抽象方法（因为它们只提供编译时信息）。

```typescript
abstract class Base {
  abstract getName(): string;
 
  printName() {
    console.log("Hello, " + this.getName());
  }
}
 
const b = new Base();
```

抽象类不能用来生成实例。

```typescript
abstract class FooCommand {}

class BarCommand extends FooCommand {}

// 报错
const fooCommand: FooCommand = new FooCommand(); 

// 正确
const barCommand = new BarCommand(); 
```

如果抽象类的属性前面加上`abstract`，就表明子类必须给出该方法的实现。

```typescript
abstract class FooCommand {
  abstract execute(): string;
}

// 报错
class BarErrorCommand  extends FooCommand {} 

// 正确
class BarCommand extends FooCommand {
  execute() {
    return `Command Bar executed`;
  }
}
```

如果一个函数的参数是抽象类，它的类型可以写成下面这样。

```typescript
// 正确
function greet(ctor: new () => Base) {
  const instance = new ctor();
  instance.printName();
}
greet(Derived);

// 错误
function greet(ctor: typeof Base) {
  const instance = new ctor();
  instance.printName();
}
// 报错
greet(Base);
```

下面是抽象方法的例子。

```typescript
class StringBuilder {
  string = '';
  add(str: string) {
    this.string += str;
  }
}
abstract class Printable {
  toString() {
    const out = new StringBuilder();
    this.print(out);
    return out.string;
  }
  abstract print(out: StringBuilder): void;
}

class Entries extends Printable {
  entries: Entry[];
  constructor(entries: Entry[]) {
    super();
    this.entries = entries;
  }
  print(out: StringBuilder): void {
    for (const entry of this.entries) {
      entry.print(out);
    }
  }
}

class Entry extends Printable {
  key: string;
  value: string;
  constructor(key: string, value: string) {
    super();
    this.key = key;
    this.value = value;
  }
  print(out: StringBuilder): void {
    out.add(this.key);
    out.add(': ');
    out.add(this.value);
    out.add('\n');
  }
}
```

## 继承

子类可以使用 extends 关键字继承基类，并且可以覆盖基类里面的同名方法。

```typescript
class Base {
  greet() {
    console.log("Hello, world!");
  }
}
 
class Derived extends Base {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}
```

但是，子类的同名方法不能改变类型签名。

```typescript
class Base {
  greet() {
    console.log("Hello, world!");
  }
}
 
class Derived extends Base {
  // 报错
  greet(name: string) {
    console.log(`Hello, ${name.toUpperCase()}`);
  }
}
```

如果 A 类包含 B 类的所有属性，TypeScript 会认为它们的类型是相同的。

```typescript
class Point1 {
  x = 0;
  y = 0;
}
 
class Point2 {
  x = 0;
  y = 0;
}
 
// OK
const p: Point1 = new Point2();
```

```typescript
class Person {
  name: string;
  age: number;
}
 
class Employee {
  name: string;
  age: number;
  salary: number;
}
 
// OK
const p: Person = new Employee();
```

空类不包含任何成员，以空类为类型参数的地方，所有类都可以使用。

```typescript
class Empty {}
 
function fn(x: Empty) {
  // can't do anything with 'x', so I won't
}
 
// All OK!
fn(window);
fn({});
fn(fn);
```

## extends

`extends`本身也是一个运算符，用来确定两个类型有无继承关系。

```typescript
TypeC = TypeA extends TypeB ? TrueExpression : FalseExpression
```

如果`TypeA`继承`TypeB`，那么返回`TrueExpression`分配给`TypeC`，否则得到类型`FalseExpression`分配给`TypeC`。

`extends`可以当作类型的相等运算符。

```typescript
type Username = 'foo'

// true
type Matched = Username extends 'foo' ? true : false
```

## 静态属性

类的静态属性也可以使用 public、private、protected 修饰符。

```typescript
class MyClass {
  private static x = 0;
}
console.log(MyClass.x); // 报错
```

## 泛型类

类也可以使用泛型进行类型注释。

```typescript
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}
 
const b = new Box("hello!");
```

注意，静态方法不能使用泛型变量。

```typescript
class Box<Type> {
  static defaultValue: Type; // 报错
```

因为这意味着静态属性的类型，与实例类型有关，这样将静态属性与实例相关联，并不是很好的做法。

## this 问题

如果函数的第一个参数是 this，TypeScript 编译时会去除这个参数。

```typescript
// 编译前
function fn(this: SomeType, x: number) {
  /* ... */
}

// 编译后
function fn(x) {
  /* ... */
}
```

这主要是为了编译检查时，确保类的内部方法正确引用了 this。这个 this 是写给编译器看的，保证该方法只能在实例上调用，不能单独调用。

```typescript
class MyClass {
  name = "MyClass";
  getName(this: MyClass) {
    return this.name;
  }
}
const c = new MyClass();
// OK
c.getName();
 
// 报错
const g = c.getName;
console.log(g());
```

this 也是一个特殊类型，表示当前类。

```typescript
class Box {
  contents: string = "";
  // 类型签名：Box.set(value: string): this
  set(value: string) {
    this.contents = value;
    return this;
  }
}

// 参数类型为 this
class Box {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}
```

这跟指定为`other: Box`不一样，主要发生在子类继承的情况。

```typescript
class Box {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}
 
class DerivedBox extends Box {
  otherContent: string = "?";
}
 
const base = new Box();
const derived = new DerivedBox();
derived.sameAs(base); // 报错
```

上面示例中，参数 base 不等于子类的 this，导致报错。
