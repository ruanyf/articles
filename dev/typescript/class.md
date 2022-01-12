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


类本身也是一个类型，比如上面例子的类`Point`本身就是一个类型，方法`add()`的参数就是`Point`类型。

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

### private

`private`是私有属性，只能在定义它的类内部使用，实例和子类都不能读取。

```typescript
class Base {
  private x = 0;
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
  private secretKey = 12345;
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

### readonly

readonly 用来修饰一个属性是只读的，只有构造函数可以更改它的值，其它方式都不可以。

```typescript
class Greeter {
  readonly name: string = "world";
  constructor() {
    this.name = 'otherName';
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

## abstract

`abstrct`也是一个修饰符，不仅可以用于类的成员，也可以用于类本身。

它表明这个类不能实例化，必须用子类继承后，对子类实例化。也就是说，抽象类只用于定义类的原型，必须继承后使用。

`abstract`的作用是，确保一系列相关的子类拥有跟基类相同的接口。

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
