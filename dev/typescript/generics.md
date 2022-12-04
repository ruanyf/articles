# TypeScript 泛型

## 简介

有些时候，函数返回值的类型与参数类型是相关的。

```javascript
function getFirst(arr) {
  return arr[0];
}
```

上面示例中，函数`getFirst()`总是返回参数数组的第一个成员。参数数组是什么类型，返回值就是什么类型。

这个函数的类型声明只能写成下面这样。

```typescript
function f(arr:any[]):any {
  return arr[0];
}
```

上面的类型声明，就反映不出参数与返回值之间的类型关系。

为了解决这个问题，TypeScript 就引入了“泛型”（generics）。泛型的特点就是带有“类型参数”（type parameter）。

```typescript
function getFirst<T>(arr:T[]):T {
  return arr[0];
}
```

上面示例中，函数`getFirst()`的函数名后面尖括号的部分`<T>`，就是类型参数放在一对尖括号（`<>`）里面。本例只有一个类型参数`T`，可以将其视为类型声明需要的变量，具体的类型由调用时输入的参数类型决定。

参数类型是`T[]`，返回值类型是`T`，就清楚地表示了两者之间的关系。比如，输入的参数类型是`number[]`，那么 T 的值就是`number`，因此返回值类型也是`number`。

函数调用时，需要提供类型参数。

```typescript
getFirst<number>([1, 2, 3])
```

上面示例中，调用函数`getFirst()`时，需要在函数名后面使用尖括号，给出类型参数`T`的值，本例是`<number>`。

不过为了方便，函数调用时，往往省略不写类型参数的值，让 TypeScript 自己推断。

```typescript
getFirst([1, 2, 3])
```

上面示例中，TypeScript 会从实际参数`[1, 2, 3]`，推断出类型参数 T 的值为`number`。

有些复杂的使用场景，TypeScript 可能推断不出类型参数的值，这时就必须显式给出了。

```typescript
function comb<T>(arr1:T[], arr2:T[]):T[] {
  return arr1.concat(arr2);
}
```

上面示例中，两个参数`arr1`、`arr2`和返回值都是同一个类型。如果不给出类型参数的值，下面的调用会报错。

```typescript
comb([1, 2], ['a', 'b']) // 报错
```

上面示例会报错，TypeScript 认为两个参数不是同一个类型。但是，如果类型参数是一个联合类型，就不会报错。

```typescript
comb<number|string>([1, 2], ['a', 'b']) // 正确
```

上面示例中，类型参数是一个联合类型，使得两个参数都符合类型参数，就不报错了。这种情况下，类型参数是不能省略不写的。

类型参数的名字，可以随便取，但是必须为合法的标识符。习惯上，类型参数的第一个字符往往采用大写字母。

一般会使用`T`（type 的第一个字母）作为类型参数的名字。如果有多个类型参数，则使用 T 后面的 U、V 等字母命名，各个参数之间使用逗号“,”分隔。

下面是多个类型参数的例子。

```typescript
function map<T, U>(
  arr:T[],
  f:(arg:T) => U
):U[] {
  return arr.map(f);
}

// 用法实例
map<string, number>(
  ['1', '2', '3'],
  (n) => parseInt(n)
); // 返回 [1, 2, 3]
```

上面示例将数组的实例方法`map()`改写成全局函数，它有两个类型参数`T`和`U`。含义是，原始数组的类型为`T[]`，对该数组的每个成员执行一个处理函数`f`，将类型`T`转成类型`U`，那么就会得到一个类型为`U[]`的数组。

总之，泛型可以理解成一段类型逻辑，需要类型参数来表达。有了类型参数以后，可以在输入类型与输出类型之间，建立一一对应关系。

泛型主要用在三个场合：函数、接口和类。

## 类型参数的默认值

类型参数可以设置默认值。使用时，如果没有给出类型参数的值，就会使用默认值。

```typescript
function getFirst<T = string>(
  arr:T[]
):T {
  return arr[0];
}
```

上面示例中，`T = string`表示类型参数的默认值是`string`。调用`getFirst()`时，如果不给出`T`的值，TypeScript 就认为`T`等于`string`。

但是，因为 TypeScript 会从实际参数推断出`T`的值，从而覆盖掉默认值，所以下面的代码不会报错。

```typescript
getFirst([1, 2, 3]) // 正确
```

上面示例中，实际参数是`[1, 2, 3]`，TypeScript 推断 T 等于`number`，从而覆盖掉默认值`string`。

类型参数的默认值，往往用在类中。

```typescript
class Generic<T = string> {
  list:T[] = []

  add(t:T) {
    this.list.push(t)
  }
}
```

上面示例中，类`Generic`有一个类型参数`T`，默认值为`string`。这意味着，实例方法`add()`的参数`t`的类型，默认是`string`。

```typescript
const g = new Generic();

g.add(4) // 报错
g.add('hello') // 正确
```

上面示例中，新建`Generic`的实例`g`时，没有给出类型参数`T`的值，所以`T`就等于`string`。因此，向`add()`方法传入一个数值会报错，传入字符串就不会。

```typescript
const g = new Generic<number>();

g.add(4) // 正确
g.add('hello') // 报错
```

上面示例中，新建实例`g`时，给出了类型参数`T`的值是`number`，因此`add()`方法传入数值不会报错，传入字符串会报错。

一旦类型参数有默认值，就表示它是可选参数。如果有多个类型参数，可选参数必须在必选参数之后。

```typescript
<T = boolean, U> // 错误

<T, U = boolean> // 正确
```

上面示例中，依次有两个类型参数`T`和`U`。如果`T`是可选参数，`U`不是，就会报错。

## 待用材料

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

《数组》一章提到过，数组类型有一种表示方法是`Array<T>`。这就是泛型的写法，`Array`是 TypeScript 原生的一个类型接口，`T`是它的类型参数。声明数组时，需要提供`T`的值。

```typescript
let arr:Array<number> = [1, 2, 3];
```

上面的示例中，`Array<number>`就是一个泛型，类型参数的值是`number`，表示该数组的全部成员都是数值。

同样的，如果数组成员都是字符串，那么类型就写成`Array<string>`。事实上，在 TypeScript 内部，数组类型的另一种写法`number[]`、`string[]`，只是`Array<number>`、`Array<string>`的简写形式。

在 TypeScript 内部，`Array`是一个泛型接口，类型定义基本是下面的样子。

```typescript
interface Array<Type> {

  length:number;
 
  pop():Type | undefined;
 
  push(...items:Type[]): number;
 
  // ...
}
```

上面代码中，`push()`方法的参数`item`的类型是`Type[]`，跟`Array()`的参数类型`Type`保持一致，表示只能添加同类型的成员。调用`push()`的时候，TypeScript 就会检查两者是否一致。

其他的 TypeScript 内部数据结构，比如`Map`、`Set`和`Promise`，其实也是泛型接口，完整的写法是`Map<K, V>`、`Set<T>`和`Promise<T>`。

TypeScript 默认还提供一个`ReadonlyArray<T>`接口，表示只读数组。

```typescript
function doStuff(
  values: ReadonlyArray<string>
) {
  values.push('hello!');  // 报错
}
```

上面示例中，参数`values`的类型是`ReadonlyArray<string>`，表示不能修改这个数组，所以函数体内部新增数组成员就会报错。因此，如果不希望函数内部改动参数数组，就可以将该参数数组声明为`ReadonlyArray`类型。

## 类型参数的约束条件

很多类型参数并不是无限制的，对于传入的类型存在约束条件。

```typescript
function comp<T>(a:T, b:T) {
  if (a.length >= b.length) {
    return a;
  }
  return b;
}
```

上面示例中，类型参数 T 有一个隐藏的约束条件：T 必须是对象，且存在`length`属性。如果不满足这个条件，就会报错。

TypeScript 提供了一种语法，允许在类型参数上面写明约束条件，如果不满足条件，编译时就会报错。这样也可以有良好的语义，对类型参数进行了说明。

```typescript
function comp<T extends { length: number }>(
  a:T, b:T
) {
  if (a.length >= b.length) {
    return a;
  }
  return b;
}
```

上面示例中，`T extends { length: number }`就是约束条件，表示类型参数 T 必须满足`{ length: number }`，否则就会报错。

```typescript
comp([1, 2], [1, 2, 3]) // 正确
comp('ab', 'abc') // 正确
comp(1, 2) // 报错
```

上面示例中，只要传入的参数类型不满足约束条件，就会报错。

类型参数的约束条件采用下面的形式。

```typescript
<TypeParameter extends ConstraintType>
```

上面语法中，`TypeParameter`表示类型参数，`extends`是关键字，这是必须的，`ConstraintType`表示类型参数要满足的条件，即类型参数应该是`ConstraintType`的子类型。

类型参数可以同时设置约束条件和默认值，前提是默认值必须满足约束条件。

```typescript
type Fn<A extends string, B extends string = 'world'>
  =  [A, B];

type Result = Fn<'hello'> // ["hello", "world"]
```

上面示例中，类型参数`A`和`B`都有约束条件，并且`B`还有默认值。所以，调用`Fn`的时候，可以只给出`A`的值，不给出`B`的值。

另外，上例也可以看出，泛型本质上是一个类型函数，通过输入参数，获得结果，两者是一一对应关系。

如果有多个类型参数，一个类型参数的约束条件，可以引用其他参数。

```typescript
<T, U extends T>
// 或者
<T extends U, U>
```

上面示例中，`U`的约束条件引用`T`，或者`T`的约束条件引用`U`，都是正确的。

但是，约束条件不能引用类型参数自身。

```typescript
<T extends T>               // 报错
<T extends U, U extends T>  // 报错
```

上面示例中，`T`的约束条件不能是`T`自身，因此多个类型参数也不能互相约束（即`T`的约束条件是`U`、`U`的约束条件是

## 使用注意点

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