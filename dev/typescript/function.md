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
function f1(): void {
  return undefined;
}
```

严格地说，void 类型表示，该函数的返回值没有利用价值，或者说不应该使用该函数的返回值。所以，下面的函数返回值类型是 void，但是对于有返回值的函数并不报错。

```typescript
type voidFunc = () => void;
 
const f1: voidFunc = () => {
  return true;
};
 
const f2: voidFunc = () => true;
 
const f3: voidFunc = function () {
  return true;
};
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

## rest 参数

rest 参数表示函数所有的剩余参数，它的类型是一个数组。该数组的所有成员必须类型相同，也需要指定类型。

```typescript
function joinNumbers(...nums: number[]): string {
  return nums.join('-');
}
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

## 参数解构

函数参数如果存在变量解构，类型写法如下。

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

有些构造函数，加不加 new 都可以调用（比如`Date()`），这时它的类型两种方式都要声明。

```typescript
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}
```