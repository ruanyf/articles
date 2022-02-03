# 泛型

有些函数可以接受各种类型的参数，返回值的类型与参数类型相关。

any 可以表达这种情况。

```typescript
function firstElement(arr: any[]): any {
  return arr[0];
}
```

但是，any 实际上取消了类型检查，并不是一个很理想的方式。

这时，可以引入类型变量的概念，来解决这个问题，进行更精确的描述。

```typescript
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

先在函数名后面，使用尖括号定义要用到的类型变量`Type`。Type 就是变量名，可以随便起，大写或小写都没关系，不过类型变量名一般都采用首字母大写，表示这代表一种类型。

然后，将参数类型定义为`Type[]`，即数组`arr`的成员类型时变量 Type。然后，返回值是 Type 或 undefined，即返回值的类型与参数类型相关，参数类型是 Type，返回值类型也是 Type，两者是一致的，至于 Type 到底是什么类型，这里并不重要。

调用函数的时候，可以在尖括号里面指明参数的实际类型。

```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}

// 写法一
let output = identity<string>("myString");
```

更常见的做法是让 TypeScript 自己去推断类型。

```typescript
let output = identity("myString");
```

类型推断虽然写起来方便，但是有些复杂的使用场景，TypeScript 可能推断不出参数的类型，这时就只能手动注明参数的具体类型了。

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

## 数组泛型

数组类型 number[] or string[] 只是  `Array<number>` 和 `Array<string>`的简写形式。

```typescript
function doSomething(value: Array<string>) {
  // ...
}
 
let myArray: string[] = ["hello", "world"];
```

如果数组成员可能全部是字符，或全部是数值，类型说明可以写成`Array<string | number>`。

Array 本身是一个泛型的接口，它的类型定义基本上是下面的样子。

```typescript
interface Array<Type> {
  /**
   * Gets or sets the length of the array.
   */
  length: number;
 
  /**
   * Removes the last element from an array and returns it.
   */
  pop(): Type | undefined;
 
  /**
   * Appends new elements to an array, and returns the new length of the array.
   */
  push(...items: Type[]): number;
 
  // ...
}
```

类似的数据结构 Map、Set、Promise，其实也是泛型接口 Map<K, V>, Set<T>, and Promise<T>。

TypeScript 默认还提供一个 ReadonlyArray 接口，表示该数组不能改变。

```typescript
function doStuff(values: ReadonlyArray<string>) {
  // 报错
  values.push("hello!");
}
```

如果看到一个函数的参数是 ReadonlyArray 类型，就不用担心它在数组内部会被改变。

## 泛型类

泛型也可以用在类（class）上面。

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


