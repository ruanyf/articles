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
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}
```

函数类型也可以定义成一个对象，详见《对象类型》一章。

```typescript
interface myfn {
  (a:number, b:number): number;
}

var add:myfn = (a, b) => a + b;
```

上面示例中，interface 命令定义了接口`myfn`，这个接口的类型是一个对象，但是该对象可调用，因此也就是一个函数。

## void

void 类型指函数没有返回值。

JavaScript 函数如果没有返回值，实际上是 undefined。

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

## rest 参数

rest 参数是一个数组，也需要指定类型。

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
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