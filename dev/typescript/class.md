# TypeScript 的 class 类型

## 简介

类（class）是面向对象编程的基本构件，封装了属性和方法，TypeScript 给予了全面支持。

### 属性的类型

类的属性可以在顶层声明，也可以在构造方法内部声明。

对于顶层声明的属性，可以在声明时同时给出类型。

```typescript
class Point {
  x:number;
  y:number;
}
```

上面声明时，属性`x`和`y`的类型都是`number`。

如果不给出类型，TypeScript 会认为`x`和`y`的类型都是`any`。

```typescript
class Point {
  x;
  y;
}
```

上面示例中，`x`和`y`的类型都是`any`。

如果声明时给出初值，可以不写类型，TypeScript 会自行推断属性的类型。

```typescript
class Point {
  x = 0;
  y = 0;
}
```

上面示例中，属性`x`和`y`的类型都会被推断为 number。

TypeScript 有一个配置项`strictPropertyInitialization`，只要打开，就会检查属性是否设置了初值，如果没有就报错。

如果你打开了这个设置，但是某些情况下，不是在声明时赋值或在构造函数里面赋值，为了防止这个设置报错，可以使用非空断言。

```typescript
class Point {
  x!:number;
  y!:number;
}
```

上面示例中，属性`x`和`y`没有初值，但是属性名后面添加了感叹号，表示这两个属性肯定不会为空，所以 TypeScript 就不报错了，详见《类型断言》一章。

### readonly 修饰符

属性名前面加上 readonly 修饰符，就表示该属性是只读的。实例对象不能修改这个属性。

```typescript
class A {
  readonly id = 'foo';
}

const a = new A();
a.id = 'bar'; // 报错
```

上面示例中，`id`属性前面有 readonly 修饰符，实例对象修改这个属性就会报错。

readonly 属性的初始值，可以写在顶层属性，也可以写在构造函数里面。

```typescript
class A {
  readonly id:string;

  constructor() {
    this.id = 'bar'; // 正确
  }
}
```

上面示例中，构造方法内部设置只读属性的初值，这是可以的。

```typescript
class A {
  readonly id:string = 'foo';

  constructor() {
    this.id = 'bar'; // 正确
  }
}
```

上面示例中，构造方法修改只读属性的值也是可以的。或者说，如果两个地方都设置了只读属性的值，以构造方法为准。在其他方法修改只读属性都会报错。

### 方法的类型

类的方法就是普通函数，类型声明方式与函数一致。

```typescript
class Point {
  x:number;
  y:number;

  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
  }

  add(point:Point) {
    return new Point(
      this.x + point.x,
      this.y + point.y
    );
  }
}
```

上面示例中，构造方法`constructor()`和普通方法`add()`都注明了参数类型，但是省略了返回值类型，因为 TypeScript 可以自己推断出来。

类的方法跟普通函数一样，可以使用参数默认值，以及函数重载。

下面是参数默认值的例子。

```typescript
class Point {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
```

上面示例中，如果新建实例时，不提供属性`x`和`y`的值，它们都等于默认值`0`。

下面是函数重载的例子。

```typescript
class Point {
  constructor(x:number, y:string);
  constructor(s:string);
  constructor(xs:number|string, y?:string) {
    // ...
  }
}
```

上面示例中，构造方法可以接受一个参数，也可以接受两个参数，采用函数重载进行类型声明。

另外，构造方法不能声明返回值类型，否则报错，因为它总是返回实例对象。

```typescript
class B {
  constructor():object { // 报错
    // ...
  }
}
```

上面示例中，构造方法声明了返回值类型`object`，导致报错。

### 存取器方法

存取器（accessor）是特殊的类方法，包括取值器（getter）和存值器（setter）两种方法。

它们用于读写某个属性，取值器用来读取属性，存值器用来写入属性。

```typescript
class C {
  _name = '';
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
}
```

上面示例中，`get name()`是取值器，其中`get`是关键词，`name`是属性名。外部读取`name`属性时，实例对象会自动调用这个方法，该方法的返回值就是`name`属性的值。

`set name()`是存值器，其中`set`是关键词，`name`是属性名。外部写入`name`属性时，实例对象会自动调用这个方法，并将所赋的值作为函数参数传入。

TypeScript 对存取器有以下规则。

（1）如果某个属性只有`get`方法，没有`set`方法，那么该属性自动成为只读属性。

```typescript
class C {
  _name = 'foo';

  get name() {
    return this._name;
  }
}

const c = new C();
c.name = 'bar'; // 报错
```

上面示例中，`name`属性没有`set`方法，对该属性赋值就会报错。

（2）`set`方法的参数类型，必须兼容`get`方法的返回值类型，否则报错。

```typescript
class C {
  _name = '';
  get name():string {
    return this._name;
  }
  set name(value:number) {
    this._name = value; // 报错
  }
}
```

上面示例中，`get`方法的返回值类型是字符串，与`set`方法参数类型不兼容，导致报错。

```typescript
class C {
  _name = '';
  get name():string {
    return this._name;
  }
  set name(value:number|string) {
    this._name = String(value); // 正确
  }
}
```

上面示例中，`set`方法的参数类型（`number|return`）兼容`get`方法的返回值类型（`string`），这是允许的。但是，最终赋值的时候，还是必须保证与`get`方法的返回值类型一致。

另外，如果`set`方法的参数没有指定类型，那么会推断为与`get`方法返回值类型一致。

（3）`get`方法与`set`方法的类型必须一致，要么都为公开方法，要么都为私有方法。

### 属性索引

类允许定义属性索引。

```typescript
class MyClass {
  [s:string]: boolean |
    ((s:string) => boolean);
 
  get(s:string) {
    return this[s] as boolean;
  }
}
```

上面示例中，`[s:string]`表示所有属性名类型为字符串的属性，它们的属性值要么是布尔值，要么是返回布尔值的函数。

注意，由于类的方法是一种特殊属性（属性值为函数的属性），所以属性索引必须同时给出属性和方法两种类型。

```typescript
class MyClass {
  [s:string]: boolean;
 
  get(s:string) { // 报错
    return this[s] as boolean;
  }
}
```

上面示例中，属性索引没有给出方法的类型，导致`get()`方法报错。

## 实现 interface 接口

### implements 关键字

属性和方法的类型，除了在类的内部声明，还可以在类的外部，使用 type 或 interface 命令声明。然后，类使用 implements 关键字，套用这个外部类型声明。

```typescript
interface Country {
  name:string;
  capital:string;
}
// 或者
type Country = {
  name:string;
  capital:string;
}

class MyCountry implements Country {
  name = '';
  capital = '';
}
```

上面示例中，`interface`或`type`都可以定义一个对象类型。类`MyCountry`使用`implements`关键字，表示该类的实例对象使用这个外部类型。

类的内部可以定义外部类型没有声明的方法和属性。

```typescript
interface Point {
  x: number;
  y: number;
}

class MyPoint implements Point {
  x = 1;
  y = 1;
  z:number = 1;
}
```

上面示例中，`MyPoint`类实现了`Point`接口，但是内部还定义了一个额外的属性`z`，这是允许的。

但是如果相反，`MyPoint`类缺少`Point`接口里面的属性或方法，就会报错。

```typescript
// 报错
class MyPoint implements Point {
  x: number = 1;
}
```

上面示例中，`MyPoint`类少了`Point`接口里面的属性`y`，就会报错。

`implements`关键字后面，不仅可以是接口，也可以是一个类。这时，后面的类将被当作接口。

```typescript
class Car {
  id:number = 1;
  move():void {};
}

class MyCar implements Car {
  id = 2; // 不可省略
  move() {};   // 不可省略
}
```

上面示例中，`implements`后面是类`Car`，这时 TypeScript 就把`Car`视为一个接口，要求`MyCar`实现`Car`里面的每一个属性和方法，否则就会报错。所以，这时不能因为`Car`类已经实现过一次，而在`MyCar`类省略属性或方法。

注意，interface 描述的是类的对外接口，也就是实例的公开属性和公开方法，不能定义私有的属性和方法。这是因为 TypeScript 设计者认为，私有属性是类的内部实现，接口作为模板，不应该涉及类的内部代码写法。

```typescript
interface Foo {
  private member:{}; // 报错
}
```

上面示例中，接口`Foo`有一个私有属性，结果就报错了。

### 实现多个接口

类可以实现多个接口，每个接口之间使用逗号分隔。

```typescript
class Car implements MotorVehicle, Flyable, Swimmable {
  // ...
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

上面示例中，`Car`类实现了`MotorVehicle`，而`SecretCar`类继承了`Car`类，然后再实现`Flyable`和`Swimmable`两个接口，相当于它同时实现了三个接口。

第二种方法是接口的继承。

```typescript
interface A {
  a:number;
}

interface B extends A {
  b:number;
}
```

上面示例中，接口`B`继承了接口`A`，类只要实现接口`B`，就相当于实现`A`和`B`两个接口。

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

上面示例中，接口`SuperCar`通过`SuperCar`接口，就间接实现了多个接口。

注意，发生多重实现时（即一个接口同时实现多个接口），不同接口不能有互相冲突的属性。

```typescript
interface Flyable {
  foo:number;
}

interface Swimmable {
  foo:string;
}
```

上面示例中，属性`foo`在两个接口里面的类型不同，如果同时实现这两个接口，就会报错。

## Class 类型

### 实例类型

TypeScript 的类本身就是一种类型，但是它代表该类的实例类型，而不是 class 的自身类型。

```typescript
class Color {
  name:string;

  constructor(name:string) {
    this.name = name;
  }
}

const green:Color = new Color('green');
```

上面示例中，定义了一个类`Color`。它的类名就代表一种类型，实例对象`green`就属于该类型。

对于引用实例对象的变量来说，既可以声明类型为 Class，也可以声明类型为 Interface，因为两者都代表实例类型。

```typescript
interface MotorVehicle {
}

class Car implements MotorVehicle {
}

// 写法一
const c:Car = new Car();
// 写法二
const c:MotorVehicle = new Car();
```

上面示例中，变量`c`的类型可以写成类`Car`，也可以写成接口`MotorVehicle`。它们的区别是，如果类`Car`有接口`MotoVehicle`没有的属性和方法，那么只有变量`c1`可以调用这些属性和方法。

作为类型使用时，类名只能表示实例的类型，不能表示类的自身类型。

```typescript
class Point {
  x:number;
  y:number;

  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
  }
}

// 错误
function createPoint(
  PointClass:Point,
  x: number,
  y: number
) {
  return new PointClass(x, y);
}
```

上面示例中，函数`createPoint()`的第一个参数`PointClass`，需要传入 Point 这个类，但是如果把参数的类型写成`Point`就会报错，因为`Point`描述的是实例类型，而不是 Class 的自身类型。

### 类的自身类型

要获得一个类的自身类型，一个简便的方法就是使用 typeof 运算符。

```typescript
function createPoint(
  PointClass:typeof Point,
  x:number,
  y:number
):Point { 
  return new PointClass(x, y);
}
```

上面示例中，`createPoint()`的第一个参数`PointClass`是`Point`类自身，要声明这个参数的类型，简便的方法就是使用`typeof Point`。因为`Point`类是一个值，`typeof Point`返回这个值的类型。注意，`createPoint()`的返回值类型是`Point`，代表实例类型。

JavaScript 语言中，类只是构造函数的一种语法糖，本质上是构造函数的另一种写法。所以，类的自身类型可以写成构造函数的形式。

```typescript
function createPoint(
  PointClass: new (x:number, y:number) => Point,
  x: number,
  y: number
):Point {
  return new PointClass(x, y);
}
```

上面示例中，参数`PointClass`的类型写成了一个构造函数，这时就可以把`Point`类传入。

构造函数也可以写成对象形式，所以参数`PointClass`的类型还有另一种写法。

```typescript
function createPoint(
  PointClass: {
    new (x:number, y:number): Point
  },
  x: number,
  y: number
):Point {
  return new PointClass(x, y);
}
```

根据上面的写法，可以把构造函数提取出来，单独定义一个接口（interface），这样可以大大提高代码的通用性。

```typescript
interface PointConstructor {
  new(x:number, y:number):Point;
}

function createPoint(
  PointClass: PointConstructor,
  x: number,
  y: number
):Point {
  return new PointClass(x, y);
}
```

总结一下，类的自身类型就是一个构造函数，可以单独定义一个接口来表示。

### 结构类型原则

Class 也遵循“结构类型原则”。一个对象只要满足 Class 的实例结构，就跟该 Class 属于同一个类型。

```typescript
class Foo {
  id!:number;
}

function fn(arg:Foo) {
  // ...
}

const bar = {
  id: 10,
  amount: 100,
};

fn(bar); // 正确
```

上面示例中，对象`bar`满足类`Foo`的实例结构，只是多了一个属性`amount`。所以，它可以当作参数，传入函数`fn()`。

如果两个类的实例结构相同，那么这两个类就是兼容的，可以用在对方的使用场合。

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

上面示例中，`Person`和`Customer`是两个结构相同的类，TypeScript 将它们视为相同类型，因此`Person`可以用在类型为`Customer`的场合。

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

上面示例中，`Person`类添加了一个属性`age`，跟`Customer`类的结构不再相同。但是这种情况下，TypeScript 依然认为，`Person`属于`Customer`类型。

这是因为根据“结构类型原则”，只要`Person`类具有`name`属性，就满足`Customer`类型的实例结构，所以代替它。反过来就不行，如果`Customer`类多出一个属性，就会报错。

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

上面示例中，`Person`类比`Customer`类少一个属性`age`，它就不满足`Customer`类型的实例结构，就报错了。因为在使用`Customer`类型的情况下，可能会用到它的`age`属性，而`Person`类就没有这个属性。

总之，只要 A 类具有 B 类的结构，哪怕还有额外的属性和方法，TypeScript 也认为 A 兼容 B 的类型。

不仅是类，如果某个对象跟某个 class 的实例结构相同，TypeScript 也认为两者的类型相同。

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

## 类的兼容

在确定两个类类型之间的子类型关系时仅检查类的实例成员类型，类的静态成员类型以及构造函数类型不进行检查。

```typescript
class Point {
    x: number;
    y: number;
    static t: number;
    constructor(x: number) {}
}

class Position {
    x: number;
    y: number;
    z: number;
    constructor(x: string) {}
}

const point: Point = new Position('');
```

此例中，Position是Point的子类型，在确定子类型关系时仅检查x和y属性。

只要对象满足类的属性要求，TypeScript 就认为对象兼容这个类。

如果类中存在私有成员或受保护成员，那么在确定类类型间的子类型关系时要求私有成员和受保护成员来自同一个类，这意味着两个类需要存在继承关系。

## 类与接口的合并

TypeScript不支持合并同名的类声明，但是外部类声明可以与接口声明进行合并，合并后的类型为类类型。

```typescript
declare class C {
    x: string;
}

interface C {
    y: number;
}

let c: C = new C();
c.x;
c.y;
```

## 参考链接

- [TypeScript Constructor in Interface](http://fritzthecat-blog.blogspot.com/2018/06/typescript-constructor-in-interface.html)