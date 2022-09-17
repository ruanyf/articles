# 类型断言

类型断言允许我们覆盖 TypeScript 为值计算的静态类型。这对于解决类型系统的限制很有用。

它相当于其他语言中的类型转换，但类型断言不会抛出异常，并且只用于静态检查，在运行时不做任何事情。

```typescript
// 无编译错误
const p0: { x: number } = { x: 0, y: 0 } as { x: number };
  
// 无编译错误
const p1: { x: number } = { x: 0, y: 0 } as { x: 0; y: 0 };
```

```typescript
const data: object = ['a', 'b', 'c']; // (A)

// @ts-expect-error: Property 'length' does not exist on type 'object'.
data.length; // (B)

assert.equal(
  (data as Array<string>).length, 3); // (C)
```

上面示例中，`['a', 'b', 'c']`会被 TypeScript 归类为对象，所以不能使用`length`属性。类型断言就将其指定为数组。

一般来说，类型断言应该少避免，因为它改变了 TypeScript 内置规则，有可能破坏静态检查。

类型推断可以暂时改变一个值的类型。

```typescript
interface Named {
  name: string;
}
function getName(obj: object): string {
  if (typeof (obj as Named).name === 'string') { // (A)
    return (obj as Named).name; // (B)
  }
  return '(Unnamed)';
}
```

使用类型断言之后，unknown 类型就可以作为所断言的类型使用。

```typescript
const value: unknown = "Hello World";
const someString: string = value as string;
const otherString = someString.toUpperCase(); // "HELLO WORLD"
```

请注意，TypeScript 不会执行任何特殊检查来确保类型断言确实有效。类型检查器假定您知道得更好，并相信您在类型断言中使用的任何类型都是正确的。

TypeScript 对下面的代码不会报错，但是运行时会报错。

```typescript
const value: unknown = 42;
const someString: string = value as string;
const otherString = someString.toUpperCase(); // BOOM
```

## 指定类型

TypeScript 允许采用类型断言的方式，强制改变类型，方法是在一个值前面加上尖括号（`<typeName>`）指定类型。

```typescript
let str = '1';
let str2:number = <number><any> str;
console.log(str2) // "1"
```

上面示例中，变量`str2`的类型是数值，但是赋值为一个字符串`str`，正常情况下会报错。这时如果你确定需要这样赋值，可以强制指定`str`的类型为`<number><any>`。这样的话，TypeScript 就会认为`str`的类型是数值，尽管实际上它是一个字符串。

这种语法有一个前提，就是如果将类型`T1`指定为`T2`，那么需要`T1`是`T2`的子类型，或者`T2`是`T1`的子类型。

```typescript
const s1:number|string = 'hello';
const s2:number = <number>s1; 
```

指定类型并不是真的改变一个值的类型，而是提示编译器，应该如何处理这个值。


## const 断言

如果`const`声明的对象属性是文字表达式，这些属性的类型是`string`，而不是文字表达式的值。断言可以使得这些属性的类型变为所声明的值。

```typescript
const HTTPRequestMethod = {
  CONNECT: "CONNECT" as "CONNECT",
  DELETE: "DELETE" as "DELETE",
  GET: "GET" as "GET",
  HEAD: "HEAD" as "HEAD",
  OPTIONS: "OPTIONS" as "OPTIONS",
  PATCH: "PATCH" as "PATCH",
  POST: "POST" as "POST",
  PUT: "PUT" as "PUT",
  TRACE: "TRACE" as "TRACE",
};

// 等同于
const HTTPRequestMethod = {
  CONNECT: "CONNECT",
  DELETE: "DELETE",
  GET: "GET",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  PATCH: "PATCH",
  POST: "POST",
  PUT: "PUT",
  TRACE: "TRACE",
} as const;

// 等同于
const HTTPRequestMethod: {
  readonly CONNECT: "CONNECT";
  readonly DELETE: "DELETE";
  readonly GET: "GET";
  readonly HEAD: "HEAD";
  readonly OPTIONS: "OPTIONS";
  readonly PATCH: "PATCH";
  readonly POST: "POST";
  readonly PUT: "PUT";
  readonly TRACE: "TRACE";
} = {
  CONNECT: "CONNECT",
  DELETE: "DELETE",
  GET: "GET",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  PATCH: "PATCH",
  POST: "POST",
  PUT: "PUT",
  TRACE: "TRACE",
};

// 等同于
enum HTTPRequestMethod {
  CONNECT = "CONNECT",
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  TRACE = "TRACE",
}
```

使用断言以后，就不能再修改属性的值了。

```typescript
HTTPRequestMethod.GET = "..."; // 报错
```

const 断言不限于字符串，其他值也可以用。

```typescript
const ORIGIN = {
  x: 0,
  y: 0,
} as const;

// 等同于
const ORIGIN: {
  readonly x: 0;
  readonly y: 0;
} = {
  x: 0,
  y: 0,
};
```

元组或数组也可以使用 const 断言。

```typescript
const ORIGIN = [0, 0] as const;
```

## 添加全局变量

```typescript
window.__INITIAL_DATA__ = {
    userID: "536891193569405430",
  };

// 报错
const initialData = window.__INITIAL_DATA__;
```

window 没有这个属性。

解决方法

```typescript
const initialData = (window as any).__INITIAL_DATA__;
```

还可以进一步对 initialData 进行断言。

```typescript
type InitialData = {
  userID: string;
};

const initialData = (window as any).__INITIAL_DATA__ as InitialData;
```

当然，比较好的方法还是通过 interface 为 Window 类型添加属性。

```typescript
type InitialData = {
  userID: string;
};

interface Window {
  __INITIAL_DATA__: InitialData;
}

const initialData = window.__INITIAL_DATA__;
```

但是，上面的解决方法在模块里面不适用，必须写成下面这样。

```typescript
declare global {
  interface Window {
    __INITIAL_DATA__: InitialData;
  }
}

const initialData = window.__INITIAL_DATA__;
```

## 非空断言运算符

TypeScript 会对下面的代码报错。

```typescript
const root = document.getElementById("root");

// 报错
// Object is possibly null
root.addEventListener("click", e => {
  /* ... */
});
```

上面代码中，root 变量的类型 HTMLElement | null，所以报错了。

为了防止这个错误，可以使用非空断言运算符，它在调用结尾加上后缀运算符`!`。

```typescript
const root = document.getElementById("root")!;

root.addEventListener("click", e => {
  /* ... */
});
```

非空断言运算符`!`告诉 TypeScript 假设返回的值document.getElementById()是非空且非未定义的（也称为“非空值”）。TypeScript 将排除类型null和undefined。

非空断言表示该值可能不是`undefined`或`null`。

下面是另一个例子。

```typescript
const theName = 'Jane' as (null | string);

// @ts-expect-error: Object is possibly 'null'.
theName.length;

assert.equal(
  theName!.length, 4); // OK
```

上面示例中，变量加上感叹号后缀，表示该值非空。

非空断言运算符没有任何运行时表现。也就是说，TypeScript 编译器不会发出任何验证代码来验证表达式实际上是非空的。所以，比较保险的方法是手动检查一下类型。

```typescript
const root = document.getElementById("root");

if (root === null) {
  throw Error("Unable to find DOM element #root");
}

root.addEventListener("click", e => {
  /* ... */
});
```

非空断言符还可以进行赋值断言。如果打开了严格的属性初始化，有时 TypeScript 没有推断出属性初始化，就会报错。

```typescript
class Point1 {
  // @ts-expect-error: Property 'x' has no initializer and is not definitely
  // assigned in the constructor.
  x: number;

  // @ts-expect-error: Property 'y' has no initializer and is not definitely
  // assigned in the constructor.
  y: number;

  constructor() {
    this.initProperties();
  }
  initProperties() {
    this.x = 0;
    this.y = 0;
  }
}
```

这时就可以使用非空断言符，进行赋值断言。

```typescript
class Point2 {
  x!: number; // (A)
  y!: number; // (B)
  constructor() {
    this.initProperties();
  }
  initProperties() {
    this.x = 0;
    this.y = 0;
  }
}
```


## 断言函数

```typescript
function assertNonNullish<TValue>(
  value: TValue,
  message: string
): asserts value is NonNullable<TValue> {
  if (value === null || value === undefined) {
    throw Error(message);
  }
}
```

`asserts value is NonNullable<TValue>`返回类型注解就是所谓的断言签名。这个断言签名表明，如果函数正常返回（也就是说，如果它没有抛出错误），它就断言value参数的类型是NonNullable<TValue>. TypeScript 使用这条信息来缩小我们传递给value参数的表达式的类型。

下面是一个例子。返回值加了类型断言以后，TypeScript 就不会报错了。

```typescript
const root = document.getElementById("root");
assertNonNullish(root, "Unable to find DOM element #root");

root.addEventListener("click", e => {
  /* ... */
});
```

## 参考链接

- [Const Assertions in Literal Expressions in TypeScript](https://mariusschulz.com/blog/const-assertions-in-literal-expressions-in-typescript), Marius Schulz
- [Assertion Functions in TypeScript](https://mariusschulz.com/blog/assertion-functions-in-typescript), Marius Schulz