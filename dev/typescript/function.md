# 函数的类型注释

## 基本用法

函数的类型写法是，同时给出参数类型和返回值类型。

```typescript
function hello(txt: string):void {
  console.log('hello ' + txt);
}
```

上面示例中，参数类型（`txt: string`）写在参数名的后面，返回值类型写在参数括号的后面，`void`表示没有返回值。

如果参数是一个函数，使用箭头函数的形式，表示整个函数的类型。

```typescript
const repeat2 = (str: string, times: number): string => {
  return str.repeat(times);
};

// 或者
const repeat3 = (str: string, times: number): string =>
  str.repeat(times);

function hello(txt: string):void {
  console.log('hello' + txt);
}

function greeter(fn: (a: string) => void):void {
  fn('world');
}

greeter(hello);
``` 

上面示例中，`(a: string) => void`表示该函数有一个参数`a`，类型为`string`，返回值的类型是`void`，即没有返回值。

这里有几个注意点。

（1）类型里面的参数名是必须的。TypeScript 会将`(string) => void`理解成函数有一个名叫 string 的参数，并且这个`string`参数的类型是`any`。

```typescript
type FunctionType2 = (string, number) => number;
// (string: any, number: any) => number
```

类型里面的参数名与实际参数名不一致，是可以的。

```typescript
let f: (x: number) => number;
 
f = function (y:number) {
  return y;
};
```

（2）函数的参数要放在圆括号里面。

（3）如果不指定参数类型，则表示该参数的类型为`any`。

比较方便的写法，是为函数指定一个类型别名。

```typescript
type Repeat = (str: string, times: number) => string;

type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}
```

上面这种类型写法，有两个地方需要注意。

（1）两个参数`str`和`times`的参数名需要声明。

（2）返回类型`string`使用箭头分隔，而不是使用冒号。

函数类型还可以采用可执行对象的方式声明。

```typescript
let add: { (x: number, y: number): number };
 
add = function (x: number, y: number): number {
  return x + y;
};
```

上面示例中，变量`add`的类型就是可执行函数。

```typescript
{
  (参数列表): 返回值
}
```

这种声明方式平时很少用，但是非常合适用在一个场合：函数本身存在属性。

```typescript
function f(x:number) {
  console.log(x);
}
 
f.version = '1.0';
```

上面示例中，函数`f()`本身还有一个属性`foo`。这时，`f`完全就是一个对象，类型就要使用可执行对象的方式声明。

```typescript
let foo: {
  (x: number): void;
  version: string
} = f;
```

函数类型也可以使用对象接口来定义，详见《对象类型》一章。

```typescript
interface myfn {
  (a:number, b:number): number;
}

var add:myfn = (a, b) => a + b;
```

上面示例中，interface 命令定义了接口`myfn`，这个接口的类型是一个对象，但是该对象可调用，因此也就是一个函数。

这种写法类似于方法的类型定义，但是不用写方法名。

## void 类型

如果函数没有返回值，或者说返回值是`undefined`，TypeScript 就认为函数的返回值是 void 类型。

```typescript
function f1():void {
  return undefined;
}
```

如果返回其他值，TypeScript 就会报错。

```typescript
function f():void {
  return 123; // 报错
}

const f3 = function (): void {
  return true; // 报错
};
```

但是，如果某个位置的值是 void 函数，比如某个变量或者某个方法的参数，但是实际传入的函数却有返回值，这种情况并不会报错，TypeScript 是允许的。

```typescript
type voidFunc = () => void;
 
const f1:voidFunc = () => {
  return true;
};
 
const f2:voidFunc = () => true;
 
const f3:voidFunc = function () {
  return true;
};
```

这是因为，这时 void 类型并不是严格检查，而是表示该函数的返回值没有利用价值，或者说不应该使用该函数的返回值。

这样设计是有现实意义的。举例来说，数组方法`Array.prototype.forEach(fn)`的参数`fn`是一个函数，而且这个函数应该没有返回值，即返回值类型是`void`。

```typescript
forEach(
  callbackfn:(...) => void,
  thisArg?:any
): void;
```

但是，实际应用中，很多时候传入的函数是有返回值，但是它的返回值不重要，或者不产生作用。

```typescript
const src = [1, 2, 3];
const ret = [];
src.forEach(el => ret.push(el));
```

上面示例中，`push()`有返回值，表示新插入的元素在数组里面的位置。TypeScript 不会报错。

如果没有启用`--strictNullChecks`编译选项，那么`void`返回值类型也允许返回`null`值。

```typescript
// 如果没有启用 --strictNullChecks，就不会报错
function f0():void {
  return null;
}
```

除了函数，其他变量声明为`void`类型没有多大用处，因为这时只能赋值为`null`（假定没有打开strictNullChecks) 或者`undefined`。

```typescript
let unusable: void = undefined;

// OK if `--strictNullChecks` is not given
unusable = null;
```

## never 类型

`never`类型表示肯定不会出现的值，主要用于表示某个函数肯定不会返回值，即函数不会正常执行结束。

它有以下两种情况。

（1）抛出错误的函数。

```typescript
function fail(msg:string):never {
  throw new Error(msg);
}
```

上面示例中，函数`fail()`会抛错，所以返回值是`never`。

注意，只有抛出错误，才是 never 类型。如果显式用`return`语句返回一个 Error 对象，返回值就不是 never 类型。

```typescript
function fail():Error {
  return new Error("Something failed");
}
```

上面示例中，函数`fail()`返回一个 Error 对象，所以返回值类型是 Error。

（2）无限执行的函数。

```typescript
const sing = function():never {
  while (true) {
    console.log('sing');
};
```

上面示例中，函数`sing()`会永远执行，不会返回，所以返回值类型是 never。

注意，`never`类型不同于`void`类型。前者表示函数没有执行结束，不可能有返回值；后者表示函数正常执行结束，但是不返回值，或者说返回`undefined`。

```typescript
// 正确
function sing():void {
  console.log('sing');
}

// 报错
function sing():never {
  console.log('sing');
}
```

上面示例中，函数`sing()`虽然没有`return`语句，但实际上是省略了`return undefined`这行语句，真实的返回值是`undefined`。所以，它的返回值类型要写成`void`，而不是`never`。

总之，`never`表示不可能出现的值，除了函数返回值，有一些场景，代码运行不到，但是有一个类型来表示，这时也可以使用`never`。

## 函数的赋值

函数的赋值指的是将某个函数赋值给指定类型的变量。

```typescript
const targetFunc: Trg = sourceFunc;
```

有一些地方需要注意。

（1）函数的返回值类型必须与指定类型相符。

```typescript
const trg1: (x: RegExp) => Object = (x: Object) => /abc/;
```

（2）如果指定的类型没有返回值（即返回`void`），则具体的函数实际上可以返回任何值。因为这种情况下，TypeScript 总是忽略 void，不再关心具体的返回值。

```typescript
const trg2: () => void = () => new Date();
```

（3）具体函数的参数数量，不能多于指定类型的参数。

```typescript
// 报错
const trg3: () => string = (x: string) => 'abc';
```

但是，具体函数的参数数量，可以少于指定类型的参数数量。

```typescript
const trg4: (x: string) => string = () => 'abc';
```

上面示例是正确的，即 TypeScript 允许省略参数。因为 JavaScript 允许函数接受多余的参数，所以 TypeScript 就没有要求一定要显式给出。

## 可选参数

如果一个参数有可能为空，可以在参数名后面加问号表示。

```typescript
function f(x?: number) {
  // ...
}
f(); // OK
f(10); // OK
```

上面示例中，虽然 x 的类型是 number，但实际上是 number | undefined。如果一个参数后面有问号，就表示它有可能是 undefined。

```typescript
function f1(x?: number) { 
  return x; 
}

f1(undefined) // undefined
```

上面示例中，参数`x`是可选的，等同于说`x`可以赋值为`undefined`。

但是，反过来就不成立，类型设为`undefined`的参数就不能省略。

```typescript
function f(x: undefined | number) {
  return x;
}

f() // 报错
```

上面示例中，参数`x`的类型是`undefined|number`，表示要么传入`undefined`，要么传入一个数值，如果省略这个参数，就会报错。

函数的前部参数有可能为空，这时要注明有可能为`undefined`。

```typescript
function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}
```

上面示例中，参数`values`有可能为空，所以这里要用`if`判断检查一下，`values`是否有值。

回调函数的参数如果是可选的，也要加问号。

```typescript
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    // I don't feel like providing the index today
    callback(arr[i]);
  }
}
```

一旦一个参数加了问号，函数体内部用到这个参数时，就需要判断是否可能为 undefined。

```typescript
myForEach([1, 2, 3], (a, i) => {
  // 报错
  console.log(i.toFixed());
});
```

注意，如果传入的参数对象有多余的属性，TypeScript 不会报错。

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

// 不报错
const formatter = createFormatter(prettierConfig);
```

但是，如果没有重合的属性，TypeScript 会报错。

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
  semicolons: true,
};

// 报错
const formatter = createFormatter(prettierConfig);
```

一种解决方法就是做一个类型断言。

```typescript
const formatter = createFormatter(prettierConfig as PrettierConfig);
```

## 参数默认值

TypeScript 函数的参数默认值写法，与 JavaScript 一致。

```typescript
function createPoint(
  x:number = 0,
  y:number = 0
):[number, number] {
  return [x, y];
}

createPoint() // [0, 0]
```

上面示例中，参数`x`和`y`的默认值都是`0`。这时可以省略`x`和`y`的类型声明，因为可以从默认值推断出来。

```typescript
function createPoint(
  x = 0, y = 0
):[number, number] {
  return [x, y];
}
```

设有默认值的参数，都是可选参数。这时，如果传入`undefined`，也会触发默认值。

```typescript
function trim3(str = ''): string {
  return str.trim();
}

// 类型推断为 (str?: string) => string
trim3;

function f2(x = 456) {
  return x;
}

f2(undefined) // 456
```

具有默认值的参数如果位于参数列表的末尾，那么该参数被视为可选参数。

```typescript
function add(x:number, y:number = 0) {
  return x + y;
}
 
add(1)  // 1
```

具有默认值的参数如果不位于参数列表的末尾，调用时必须传入值。

```typescript
function add(x:number = 0, y:number) {
  return x + y;
}

add(1) // 报错
```

可选参数与默认值不能同时使用。

```typescript
// 报错
function f(x?: number = 0) {
  // ... 
}
```

## rest 参数

rest 参数表示函数剩余的所有参数，类型有两种可能。

一种可能为数组（剩余参数类型相同）。

```typescript
function joinNumbers(...nums: number[]): string {
  return nums.join('-');
}
```

另一种可能为元组（剩余参数类型不同）。

```typescript
function f(...args:[boolean, number]) {}
```

元组需要声明每一个剩余参数的类型，也可以使用可选参数。

```typescript
function f(...args: [boolean, string?]) {}
```

rest 参数甚至可以嵌套。

```typescript
function f(...args: [boolean, ...string[]]) {}
```

下面是另一个例子。

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

rest 参数可以与变量解构结合使用。

```typescript
function repeat1(...[str, times]: [string, number]): string {
  return str.repeat(times);
}

// 等同于
function repeat2(str: string, times: number): string {
  return str.repeat(times);
}
```

## 函数重载

有些函数接受不同类型的参数时，会有不同的行为。这种根据参数类型不同，执行不同逻辑的行为，称为函数重载（function overload）。

```javascript
reverse('abc') // 'cba'
reverse([1, 2, 3]) // [3, 2, 1]
```

上面示例中，`reverse()`接受字符串作为参数时，返回的是逆序的字符串；接受数组作为参数时，返回的是逆序的数组。

这意味着，该函数内部有处理字符串和数组的两套逻辑，根据参数类型的不同，分别执行对应的逻辑。这就叫“函数重载”。

TypeScript 对于“函数重载”的类型描述方法是，逐一定义每一种情况的类型。

```typescript
function reverse(string: string): string;
function reverse<T>(array: T[]): T[];
function reverse<T>(stringOrArray: string | T[]): string | T[] {
  return typeof stringOrArray === "string"
    ? stringOrArray.split("").reverse().join("")
    : stringOrArray.slice().reverse();
}
```

上面示例中，前两行类型描述列举了重载的各种情况。第三行是函数本身的类型描述，必须与所有指定的重载情况兼容。

在其他一些编程语言中允许存在多个函数实现，并且在调用重载函数时编程语言负责选择合适的函数实现执行。在TypeScript中，重载函数只存在一个函数实现，开发者需要在这个唯一的函数实现中实现所有函数重载的功能。这就需要开发者自行去检测参数的类型及数量，并根据判断结果去执行不同的操作。

```typescript
function add(x: number, y: number): number;
function add(x: any[], y: any[]): any[];
function add(x: number | any[], y: number | any[]): any {
    if (typeof x === 'number' && typeof y === 'number') {
         return x + y;
    }
 
     if (Array.isArray(x) && Array.isArray(y)) {
         return [...x, ...y];
     }
}
```

TypeScript 不支持为不同的函数重载分别定义不同的函数实现。

注意，重载的类型描述与函数的具体实现之间，不能有其他代码，否则报错。每一个重载函数只允许有一个函数实现，并且它必须位于所有函数重载语句之后，否则将产生编译错误。

如果函数可以接受多种数目的参数，可以为每一种数目指定一个类型签名。

```typescript
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// 报错
const d3 = makeDate(1, 3);
```

函数的参数类型不同。

```typescript
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

function len(x: any[] | string) {
  return x.length;
}

// 等同于
function len(x: any[] | string) {
  return x.length;
}
```

虽然函数的具体实现里面，有类型描述。但是，函数的实际调用类型，以类型签名为准。

函数的类型签名不能与其他签名，或者函数的实现有冲突。

```typescript
function fn(x: boolean): void;
// 报错
function fn(x: string): void;

function fn(x: string): void;
function fn() {
  // ...
}
// 报错
fn();
```

对象的方法也可以使用重载。

```typescript
class StringBuilder {
  #data = '';

  add(num: number): this;
  add(bool: boolean): this;
  add(str: string): this;
  add(value: any): this {
    this.#data += String(value);
    return this;
  }

  toString() {
    return this.#data;
  }
}

const sb = new StringBuilder();
sb
  .add('I can see ')
  .add(3)
  .add(' monkeys!')
;
assert.equal(
  sb.toString(), 'I can see 3 monkeys!')
```

重载签名的排序很重要，类型最宽的声明应该放在最后面。

```typescript
function f(x: any): number;   // <- 函数重载1
function f(x: string): 0 | 1; // <- 函数重载2
function f(x: any): any {
     // ...
}
 
const a: 0 | 1 = f('hi');
//    ~
//    编译错误！类型 'number' 不能赋值给类型 '0 | 1'

// 正确的声明方式
function f(x: string): 0 | 1;
function f(x: any): number;
function f(x: any): any {
     // ...
}
 
const a: 0 | 1 = f('hi');  // 正确
```

## 参数解构

函数参数如果存在变量解构，类型写法如下。

```typescript
function f0([x, y]: [number, number]) {}
f0([0, 1]);
 
function f1({ x, y }: { x: number; y: number }) {}
f1({ x: 0, y: 1 });
```

```typescript
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}

// 或者
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```

## 高阶函数

一个函数的返回值还是一个函数，那么前一个函数就称为高阶函数（higher-order function）。

一个箭头函数返回的还是一个箭头函数，下面就是一个例子。

```typescript
(someValue: number) => (multiplier: number) => someValue * multiplier;
```

## 函数的属性

JavaScript 函数是一种特殊对象，所以可以有属性。

```javascript
function hello(name) {
  return 'hello ' + name;
}

hello.foo = 'bar';
```

上面示例中，`hello`是一个函数，可以拥有属性`foo`。

TypeScript 表达这种有属性的函数类型时，必须采用对象的形式表达。

```typescript
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
```

注意，这种写法的函数参数与返回值之间，间隔符是冒号` :`，而不是正常写法的箭头`=>`，因为这里采用的是对象类型的写法。

## 构造函数的类型

构造函数用来生成实例对象，必须使用`new`命令调用。构造函数的类型，必须添加`new`。

```typescript
let ErrorConstructor: new (message?: string) => Error;
```

构造函数也可以采用可执行对象的方式声明，实际上就是采用类的方式声明。

```typescript
let Dog: { new (name: string): object };
 
 Dog = class {
     private name: string;
     constructor(name: string) {
         this.name = name;
  }
};
 
let dog = new Dog('huahua');
```

```typescript
type SomeConstructor = {
  new (s: string): SomeObject;
};


interface BankAccount {  
    balance: number;  
    deposit(credit: number): number;  
}
var BankAccount: new() => BankAccount;
```

圆括号前面要加上`new`。

有一些函数被设计为既可以作为普通函数使用，同时又可以作为构造函数来使用。例如，JavaScript内置的“Number()”函数和“String()”函数等都属于这类函数。

有些函数即可以当作构造函数，也可以当作普通函数使用，即加不加 new 都可以调用，比如`Date()`、`Number()`、`String()`等。它们的类型就要同时写构造函数和普通函数两种。

```typescript
{
  new (x:number): Number;  // <- 构造签名
  (x:number): number;      // <- 调用签名
}
```