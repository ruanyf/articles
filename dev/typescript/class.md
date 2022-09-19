# 类

## 概述

类（class）是面向对象编程的基本构件，TypeScript 给予了全面支持。

声明 class 的时候，class 内部必须给出每个成员的类型描述。

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

类的方法属于函数，类型可以写在定义里面，所以可以不必先定义。但是，单独定义方法的类型，也是可以的。

```typescript
class Point {
    x: number;
    y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(point:Point): Point;
    add(point:Point) {
      return new Point(
        this.x + point.x,
        this.y + point.y
      );
    }
}
```

上面示例中，方法`add()`有单独一行的类型定义。注意，方法的实现必须紧跟在它的类型定义后面，否则会报错。

```typescript
class Color {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

这个类定义创建了两件事。

首先，一个名为 Color（可以通过调用new）的构造函数：

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

## 构造函数

构造函数不允许定义返回值类型，因为构造函数的返回值类型永远为类的实例类型。

```typescript
class B {
  constructor(): object {}
    //             ~~~~~~~
    //             编译错误！不允许指定构造函数的返回值类型
}
```

构造函数也支持重载。

```typescript
class A {
    constructor(x: number, y: number);
    constructor(s: string);
    constructor(xs: number | string, y?: number) {}
}
 
const a = new A(0, 0);
const b = new A('foo');
```

## 存取器

存取器指的是某个属性（假定为`p`）的赋值方法`set p()`和取值方法`get p()`

如果一个类属性同时定义了get方法和set方法，那么get方法的返回值类型必须与set方法的参数类型一致，否则将产生错误。

```typescript
class C {
   /**
    * 正确
    */
   private _foo: number = 0;
   get foo(): number {
       return this._foo;
   }
   set foo(value: number) {}

   /**
    * 错误！'get' 和 'set' 存取器必须具有相同的类型
     */
  private _bar: string = '';
  get bar(): string {
        return this._bar;
  }
  set bar(value: number) {}
}
```

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

如果某个接口跟类的结构一致，类的实例也可以赋值给接口类型。

```typescript
class Circle {
   radius: number;
   area(): number {
       return Math.PI * this.radius * this.radius;
    }
}

interface CircleType {
    radius: number;
    area(): number;
}

// 正确
const a: Circle = new Circle();

// 正确
const b: CircleType = new Circle();
```

## 使用 inteface

另一种给出 Class 类型注释的方法，就是使用 interface。这时要使用 implements 关键字。

```typescript
interface Point {
    x: number;
    y: number;
}

class MyPoint implements Point {
  x: number = 1;
  y: number = 2;
}
```

Class 可以部署接口以外的方法和属性。

```typescript
class MyPoint implements Point {
  x: number = 1;
  y: number = 2;
  z: number = 3; // 接口没有定义的属性
}
```

上面示例中，`MyPoint`类实现了`Point`接口，但是内部还部署了一个属性`z`，这是接口`point`没有定义的。

但是如果相反，`MyPoint`类缺少`Point`接口里面的方法，那么就会报错。

```typescript
// 报错
class MyPoint implements Point {
  x: number = 1;
}
```

上面示例中，`MyPoint`类少了`Point`接口里面的属性`y`，编译时就会报错。

类可以实现多个接口，每个接口之间使用逗号分隔。

```typescript
class Car implements MotorVehicle, Flyable, Swimmable {
// Implement all the methods from three
// interfaces here
}
```

上面示例中，`Car`类同时实现了`MotorVehicle`、`Flyable`、`Swimmable`三个接口。这意味着，它必须部署这三个接口声明的所有属性和方法。

但是，同时实现多个接口并不是一个好的写法，容易使得代码难以管理，可以使用两种方法替代。

第一种方法是类的继承。

```typescript
class Car implements MotorVehicle {
}

class SecretCar extends Car implements Flyable, Swimmable {

}
```

上面示例中，`SecretCar`类继承了`Car`类，然后再实现`Flyable`和`Swimmable`两个接口。

第二种方法是接口的继承。

```typescript
interface A {
  a:number;
}

interface B extends A {
  b:number;
}
```

上面示例中，接口`B`就继承了接口`A`。

前一个例子可以用接口继承改写。

```typescript
interface MotorVehicle {
  // ...
}
interface Flyable {
  // ...
}
interface Swimmable {
  // ...
}

interface SuperCar extends MotoVehicle,Flyable, Swimmable {
  // ...
}

class SecretCar implements SuperCar {
  // ...
}
```

上面示例中，接口`SuperCar`就继承了多个接口。

注意，发生多重继承时（即一个接口同时继承多个接口），不同接口不能有互相冲突的属性。

```typescript
interface Flyable {
  foo:number;
}

interface Swimmable {
  foo:string;
}
```

上面示例中，属性`foo`在两个接口里面的类型不同，如果同时继承这两个接口，编译时就会报错。

`implements`关键字后面，不仅可以是接口，也可以是一个类。这时，后面的类将被当作接口。

```typescript
class Car {
  num:number = 111;
}

// 错误
class MyCar implements Car {
}

// 正确
class MyCar implements Car {
  num:number = 222;
}
```

上面示例中，`implements`后面是类`Car`，这时 TypeScript 就把`Car`视为一个接口，要求`MyCar`部署`Car`里面的每一个属性和方法，否则就会报错。

注意，interface 描述的是类的对外接口，所以只能定义公开属性，不能定义私有属性。因为 TypeScript 设计者认为，私有属性是类的内部实现，接口作为模板，不应该涉及类的内容代码写法。

```typescript
interface Foo {
  private member:{}; // 报错
}
```

上面示例中，接口`Foo`有一个私有属性，结果就报错了。

对于变量来说，既可以声明类型是 Class，也可以声明类型是 Interface。

```typescript
interface MotorVehicle {
}

class Car implements MotorVehicle {
}

// 写法一
const c1: Car = new Car();
// 写法二
const c2: MotorVehicle = new Car();
```

这两种写法的区别是，如果类`Car`里面部署了接口`MotoVehicle`没有的属性和方法，那么只有变量`c1`可以调用这些属性和方法。

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

构造函数上也可以使用可访问性修饰符。它描述的是在何处允许使用该类来创建实例对象。在默认情况下，构造函数是公有的。如果将构造函数设置成私有的，则只允许在类的内部创建该类的对象。

```typescript
class Singleton {
    private static instance?: Singleton;
 
     private constructor() {}
 
     static getInstance() {
         if (!Singleton.instance) {
             // 允许访问
             Singleton.instance = new Singleton();
         }
         return Singleton.instance;
  }
}
 
new Singleton(); // 编译错误
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

### 参数属性

TypeScript 提供了一种简洁语法，将构造函数的形式参数声明为类的成员变量，它叫作参数属性。

为形式参数添加任何一个可访问性修饰符或者readonly修饰符，该形式参数就成了类的属性。

```typescript
class A {
  constructor(public x: number) {}
}
 
const a = new A(0);
a.x; // 值为0
```

上面示例中，此例在类A的构造函数中，参数x是一个参数成员，因此会在类A中声明一个public的成员变量x。第5行，使用实际参数0来实例化类A时会自动将成员变量x的值初始化为0，

```typescript
class A {
02     constructor(
03         public x: number,
04         protected y: number,
05         private z: number
06     ) {}
07 }
08 
09 class B {
10     constructor(readonly x: number) {}
11 }
```

readonly 可以与可访问性修饰符，一起使用。

```
class A {
  constructor(
         public readonly x: number,
         protected readonly y: number,
         private readonly z: number
   ) {}
}
```

## 方法重载

如果存在方法重载（method overloading），方法的每种使用形式都必须给出单独的类型定义。

```typescript
class ProductService {
  getProducts(): void;
  getProducts(id: number): void;
  getProducts(id?: number) {
    if (typeof id === 'number') {
     console.log(`Getting the product info for ${id}`);
    } else {
      console.log(`Getting all products`);
    }
  }
}

const prodService = new ProductService();
prodService.getProducts(123);
prodService.getProducts();
```

上面示例中，方法`getProducts()`的具体实现之中，参数`id`后面必须带有问号`?`，否则会报错。因为它有两种调用形式，参数`id`是可以省略的。

方法`getProducts()`前面的两行类型定义，其实是可以省略的，所以大多数情况下，方法重载可以不单独写类型定义。

但是，对于复杂的方法重载，可以考虑写上每一种调用形式的类型定义，这样方便阅读代码，另一方面对于 IDE 的 API 提示也很有帮助。

## abstract 类

TypeScript 允许在类定义的前面，加上关键字`abstract`，表示该类不能被实例化，只能当作其他类的模板。这种类就叫做“抽象类”（abastract class）。

```typescript
abstract class A {}

const a = new A(); // 报错
```

抽象类的作用是作为基类使用，派生类可以继承抽象类。

```typescript
abstract class Base {}

class Derived extends Base {}

const derived = new Derived();
```

抽象类也可以继承其他抽象类。

```typescript
abstract class Base {}

abstract class Derived extends Base {}
```

抽象类的内部可以有实现好的方法，也可以有抽象方法，即方法定义前加上关键字`abstract`，表示该方法需要继承该类的类来实现。

```typescript
abstract class Base {
  abstract a: string;
  b: string = '';
}
```

注意，抽象成员不允许包含具体实现代码。

如果一个具体类继承了抽象类，那么在具体的派生类中必须实现抽象类基类中的所有抽象成员。因此，抽象类中的抽象成员不能声明为private，否则将无法在派生类中实现该成员。声明为 public 和 protected 是可以的。

```typescript
abstract class Base {
  private abstract a: string; // 报错
  b: string = '';
}
```

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

上面示例会报错，因为派生类是基类的子类型，重写基类的成员时需要保证子类型兼容性。

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

若派生类重写了基类中的受保护成员，则可以将该成员的可访问性设置为受保护的或公有的。也就是说，在派生类中只允许放宽基类成员的可访问性。

```typescript
class Base {
    protected x: string = '';
    protected y: string = '';
    protected z: string = '';
}

class Derived extends Base {
    // 正确
    public x: string = '';

    // 正确
    protected y: string = '';

    // 错误！派生类不能够将基类的受保护成员重写为更严格的可访问性
    private z: string = '';
}
```

虽然一个类只允许继承一个基类，但是可以实现一个或多个接口。在定义类时，使用implements语句能够声明类所实现的接口。当实现多个接口时，接口名之间使用逗号“,”分隔。

```typescript
interface A {}
interface B {}
 
class C implements A, B {}
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

类的内部可以使用`staic`关键字，定义静态属性。

类的静态属性也可以使用 public、private、protected 修饰符。

```typescript
class MyClass {
  private static x = 0;
}
console.log(MyClass.x); // 报错
```

类的public静态成员和protected静态成员也可以被继承。

```typescript
class Base {
    public static x: string = '';
    protected static y: string = '';
}

class Derived extends Base {
    b() {
        // 继承了基类的静态成员 x
        Derived.x;

        // 继承了基类的静态成员 y
        Derived.y;
    }
}
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

TypeScript提供了一个“--noImplicitThis”编译选项。当启用了该编译选项时，如果this值默认获得了any类型，那么将产生编译错误。

TypeScript支持在函数形式参数列表中定义一个特殊的this参数来描述该函数中this值的类型。如果函数的第一个参数是 this，TypeScript 编译时会去除这个参数。

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

第一个`this`参数，可以声明函数内部`this`的类型。

```typescript
function foo(this: { name: string }) {
  this.name = 'Patrick';
  this.name = 0; // 报错
}

foo.call({ name: 123 }); // 报错
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

this 也是一个特殊类型，表示当前类，可以在类的非静态成员的类型注解中使用this类型。

```typescript
class Counter {
  private count: number = 0;

  public add(): this {
     this.count++;
      return this;
  }
  public subtract(): this {
      this.count--;
      return this;
  }
    public getResult(): number {
      return this.count;
    }
}
```

注意，this类型不允许应用于类的静态成员。

```typescript
class A {
  static a: this;
  //        ~~~~
  //        编译错误！ 'this' 类型只能用于类的非静态成员
}
```