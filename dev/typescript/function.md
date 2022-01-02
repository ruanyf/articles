# 函数的类型注释

## 基本用法

函数整体的类型可以用箭头函数表示。

```typescript
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
``` 

上面示例中，`(a: string) => void`表示该函数有一个参数`a`，类型为`string`，返回值的类型是`void`，即没有返回值。

这里有几个注意点。

（1）类型里面的参数名是必须的。TypeScript 会将`(string) => void`理解成函数有一个名叫 string 的参数。

（2）函数的参数要放在圆括号里面。

（3）如果不指定参数类型，则表示该参数的类型为`any`。

比较方便的写法，是为函数指定一个类型别名。

```typescript
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}
```

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

## 函数重载

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

构造函数用来生成实例对象，必须使用`new`命令调用。构造函数的类型，也要使用对象的形式表达。

```typescript
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```

它的参数名前面要加上 new。

有些构造函数，加不加 new 都可以调用（比如`Date()`），这时它的类型两种方式都要声明。

```typescript
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}
```