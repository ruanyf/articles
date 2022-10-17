# 泛型

## 泛型的概念

前面章节的所有类型都是确定的，即使用之前就知道某个值是什么类型。但是很多时候，类型是不确定的，跟输入的值有关，如果输入改变类型，输出也会改变。这种类型不确定的情况，就叫做泛型（generics）。

举例来说，有些函数可以接受不定类型的参数，返回值的类型与参数类型相关。

```javascript
function f(x) {
  return x;
}
```

上面示例是一个函数，原封不动地返回它的参数。参数是什么类型，返回值就是什么类型，因此没有办法提前知道返回值的类型。它的类型描述只能写成下面这样。

```javascript
function f(x:any):any {
  return x;
}
```

有了泛型以后，就可以利用它的输出值类型由输入值决定这个特点，来描述它的类型。

```typescript
function f<T>(x:T):T {
  return x;
}
```

上面示例中，函数名`f`后面有一个尖括号，里面列出了这个函数需要的类型参数，即这个函数的类型需要依靠参数决定。本例只有一个类型参数`T`。

类型参数必须为合法的标识符，名字可以随便取，通常使用大写字母，或者以大写字母开头，比如使用`T`（type 的第一个字母），以及后续的`U`、`V`等字母。后面的代码很好懂，函数参数`x`的类型为`T`，返回值的类型也为`T`，这就准确表示了这个函数的类型。

总之，泛型可以理解成一段类型逻辑，输入值和输出值都是类型，可以接受多种类型的输入，但是输入类型和输出类型之间存在一一对应的关系。

调用函数时，可以在尖括号里面指明类型参数的值。

```typescript
function f<T>(x:T):T {
  return x;
}

f<number>(2) // 2
```

上面示例中，调用函数`f()`时，尖括号里面给出类型参数`T`的值是`number`，表示`f()`的参数和返回值类型都是数值。

不过，为了方便，调用时不写类型参数的值，让 TypeScript 自己推断。

```typescript
f(2) // 正确
```

类型推断虽然写起来方便，但是有些复杂的使用场景，TypeScript 可能推断不出参数的类型，这时就只能手动注明参数的具体类型了。

类型参数允许设置类型默认值。这样的话，调用时不给出具体的类型，就会使用默认值。

```typescript
function f<T = number>(x:T):T {
  return x;
}
```

上面示例中，类型参数`T`的默认值为`number`，调用时不给出`T`的值，就会默认`f()`的参数类型为`number`。

一旦类型参数有默认值，就表示它是可选参数。如果有多个类型参数，可选参数必须在必选参数之后。

```typescript
<T = boolean, U> // 错误

<T, U = boolean> // 正确
```

不过，即使`f()`的参数不是数值（比如`f('abc')`），编译也不会报错，因为 TypeScript 检查类型时，发现参数是字符串，就会设定`T`的值为字符串。

类型参数可有多个，统一放在尖括号（`<>`）里面，各个参数之间使用逗号“,”分隔。

泛型主要用在三个场合：函数、接口和类。

泛型可以看作是类型的函数，即这个函数接受类型当作参数，返回一个新的类型。

```typescript
type Fn  <A extends string, B extends string = 'world'>   =  [A, B]

type Result = Fn<'hello'> // ["hello", "world"]
```

但是，泛型本身不是 TypeScript 的一等公民，不能将一个泛型传给另一个泛型，TypeScript 也不允许将泛型当作类型参数。

如果数组成员是泛型，可以采用下面的写法。

```typescript
// 写法一
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}

// 写法二
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}
```

函数的泛型写法。

```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}
 
// 写法一 
let myIdentity: <Input>(arg: Input) => Input = identity;

// 写法二
let myIdentity: { <Type>(arg: Type): Type } = identity;
```

除了用于函数，泛型也可以定义类型。

```typescript
type MessageOf<T extends { message: unknown }> = T["message"];
 
interface Email {
  message: string;
}
 
type EmailMessageContents = MessageOf<Email>;
```

函数的泛型也可以采用 inteface 定义接口。

```typescript
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}
 
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: GenericIdentityFn = identity;
```

另一种写法是将类型变量定义在 interface 接口上面。

```typescript
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
 
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: GenericIdentityFn<number> = identity;
```

采用第二种写法时，每次使用 interface 接口时，都必须给出类型变量具体的值。

泛型主要用来描述变量之间的依赖关系，可以理解为引入了表示类型的变量。

```typescript
function reverse<T>(items: T[]): T[] {
    var toreturn = [];
    for (let i = items.length - 1; i >= 0; i--) {
        toreturn.push(items[i]);
    }
    return toreturn;
}
```

```typescript
class Queue<T> {
  private data = [];
  push(item: T) { this.data.push(item); }
  pop(): T | undefined { return this.data.shift(); }
}
```

可以同时使用多个类型变量。

```typescript
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
 
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
```

如果类型变量是对象，可以使用 extends 关键字继承其他对象。

```typescript
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
```

类型指定也可以用于泛型。

```typescript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

// 错误
const arr = combine([1, 2, 3], ["hello"]);

// 正确
const arr = combine<string | number>([1, 2, 3], ["hello"]);
```

上面示例中，类型指定将 Type 指定为`string | number`。

泛型虽然灵活，但是容易将类型注释写得很复杂，大大降低了代码可读性，所以必须谨慎使用，尤其要防止写出复杂难懂的泛型注释。

一个规则是如果类型变量在类型注释里面只出现一次，那么它很可能是不必要的。

```typescript
// 不必要
function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}

// 正确
function greet(s: string) {
  console.log("Hello, " + s);
}
```

下面是泛型与 Interface 接口结合的例子。

```typescript
interface Box<Type> {
  contents: Type;
}

let box: Box<string>;
```

泛型的类型变量可以嵌套。

```typescript
type OrNull<Type> = Type | null;
 
type OneOrMany<Type> = Type | Type[];
 
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
           
type OneOrManyOrNull<Type> = OneOrMany<Type> | null
 
type OneOrManyOrNullStrings = OneOrManyOrNull<string>;
               
type OneOrManyOrNullStrings = OneOrMany<string> | null
```

一个经验法则是，如果泛型的类型参数只是泛型体出现一次，那么可能不需要使用泛型。

```typescript
// 写法一
function length<T extends ArrayLike<unknown>>(t: T):number {}

// 写法二
function length(t: ArrayLike<unknown>): number {}
```

上面示例中，写法一的泛型其实是不需要的，因为类型参数`T`只在泛型体出现一次，完全可以改成写法二。

也就是说，只有当类型参数出现两次以上，才是泛型的适用场合。

## 数组的泛型表示

数组类型可以使用泛型表示。前面的《数组》一章提到过，数组类型有两种表示方法。

```typescript
// 方法一
let someValues: number[];

// 方法二
let someValues: Array<number>;
```

上面的方法二，就是使用泛型表示数组。`Array<number>`表示所有成员都是数值的数组，其中`Array`是 TypeScript 提供的数组生成接口，当它的类型参数是`number`时，返回的就是一个全部成员都是数值的数组类型。

同样的，如果数组成员都是字符串，那么类型就可以写成`Array<string>`。事实上，在 TypeScript 内部，写法一`number[]`、`string[]`只是写法二`Array<number>`、`Array<string>`的简写形式。

数组的类型参数，可以是各种各样的类型，`Array<string|number>`就表示数组成员可以是字符串，也可以是数值。

```typescript
class Person {}
const people = new Array<Person>(10);
```

上面示例中，`Array<Person>`表示数组成员都是`Person`类的实例对象。

`Array`本身是一个泛型接口，在 TypeScript 内部它的类型定义基本是下面的样子。

```typescript
interface Array<Type> {

  length: number;
 
  pop(): Type | undefined;
 
  push(...items: Type[]): number;
 
  // ...
}
```

上面代码中，`push()`方法的参数`item`的类型是`Type[]`，跟`Array()`的参数类型`Type`保持一致。调用`push()`的时候，TypeScript 就会检查两者是否一致。

其他的 TypeScript 内部数据结构，比如`Map`、`Set`和`Promise`，其实也是泛型接口，完整的写法是`Map<K, V>`、`Set<T>`和`Promise<T>`。

TypeScript 默认还提供一个`ReadonlyArray<T>`接口，表示该类型数组不能修改。

```typescript
function doStuff(
  values: ReadonlyArray<string>
) {
  values.push("hello!");  // 报错
}
```

上面示例中，参数`values`的类型是`ReadonlyArray<string>`，表示不能修改这个数组，所以函数体内部新增数组成员就会报错。

所以，如果看到一个函数的参数是`ReadonlyArray`类型，就不用担心它在函数内部会被改变。

## 类型参数的约束条件

类型参数可以加上约束条件。

```typescript
<TypeParameter extends ConstraintType>
```

上面语法表示，类型参数必须属于某个类型，即属于该类型的子类型。

```typescript
interface Point {
    x: number;
    y: number;
}

function identity<T extends Point>(x: T): T {
    return x;
}

// 正确
identity({ x: 0, y: 0 });
identity({ x: 0, y: 0, z: 0 });

identity({ x: 0 });
//       ~~~~~~~~
//       编译错误！类型 '{ x: number; }' 不能赋值给类型 Point
```

类型参数可以同时定义泛型约束和默认类型，但默认类型必须满足泛型约束。

```typescript
<TypeParameter extends ConstraintType = DefaultType>

// 实例
<T extends number = 0|1>
```

如果有多个类型参数，一个参数可以引用其他参数。

```typescript
<T, U extends T>
// 或者
<T extends U, U>
```

但是，不能引用自身。

```typescript
<T extends T>               // 错误
<T extends U, U extends T>  // 错误
```

## 泛型接口

泛型除了用来定义函数，也可以用来定义接口。

```typescript
interface Comparator<T> {
  compareTo(value: T): number;
}

class Rectangle implements Comparator<Rectangle> {

  compareTo(value: Rectangle): number {
    // the algorithm of comparing rectangles goes here
  }
}

class Triangle implements Comparator<Triangle> {
  compareTo(value: Triangle): number {
    // the algorithm of comparing triangles goes here
  }
}
```

## 泛型别名

泛型也可以用在`type`别名。

```typescript
type Nullable<T> = T | undefined | null; 
```

下面是另一个例子。

```typescript
type Container<T> = { value: T };

const a: Container<number> = { value: 0 };

const b: Container<string> = { value: 'b' };
```

下面是定义树形结构的例子。

```typescript
type Tree<T> = {
    value: T;
    left: Tree<T> | null;
    right: Tree<T> | null;
};
```

## 泛型类

泛型也可以用在类（class）上面。在泛型类定义中，形式类型参数列表紧随类名之后。

```typescript
class Pair<K, V> {
  key: K;
  value: V;
}
```

通常来说，类的构造函数会用到类型参数。

```typescript
class Pair<K, V> {
  constructor(
    public key: K,
    public value: V
  ) {
    // ...
  }
}

let p1: Pair<number, string> = new Pair(1, "Apple");
```

```typescript
class A<T> {
  value: T;
}

class B extends A<any> {
}
```

上面示例中，类`A`有一个类型参数`T`，使用时必须将`T`替换成具体的类型，所以类`B`的定义里面，给出了父类`A`的类型参数`any`。

泛型也可以用在类表达式。

```typescript
const Container = class<T> {
  constructor(private readonly data: T) {}
};

const a = new Container<boolean>(true);
const b = new Container<number>(0);
```

下面是一个链表的例子。

```typescript
interface NamedItem {  
    name: string;  
}

class List<T extends NamedItem> {  
    next: List<T> = null;

    constructor(public item: T) {  
    }

    insertAfter(item: T) {  
        var temp = this.next;  
        this.next = new List(item);  
        this.next.next = temp;  
    }

    log() {  
        console.log(this.item.name);  
    }

    // ...  
}
```

```typescript
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
 
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

生成类的实例时，要给出类型变量的具体值。

泛型变量通常是构造函数的参数。给出实例类型时，需要同时给出泛型变量的值。

```typescript
const someClass = class<Type> {
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};

// const m: someClass<string>
const m = new someClass("Hello, world");
```

类可以使用范型写成通用形式，其实就是写一个构造函数。

```typescript
type Class<T> = new (...args: any[]) => T;

// 或者
interface Class<T> {
  new(...args: any[]): T;
}

function createInstance<T>(
  AnyClass:Class<T>,
  ...args:any[]
):T {
  return new AnyClass(...args);
}
```

泛型类描述的是类的实例，所以不包括类的静态属性，因为静态属性定义在类的本身。因此，在类的静态成员中不允许引用类型参数。

```typescript
class Container<T> {
    static version: T;
     //              ~
    //              编译错误！静态成员不允许引用类型参数

  constructor(private readonly data: T) {}
}
```

## 变量继承

范型的类型变量，可以采用对象继承的形式。

```typescript
function computeDistance2<P extends Point>(point: P) { /*...*/ }
computeDistance2({ x: 1, y: 2, z: 3 }); // 正确
```

`extends`表示当前类继承基类，比如`<T extends constructorMixin>`表示`T`继承了`constructorMixin`，这意味着前者具有后者的结构，并且还有一些自己的属性和方法。因此，所有可以使用`constructorMixin`的地方，都可以使用`T`。