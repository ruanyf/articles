# declare 命令

declare 命令用来表示，声明的类型用在其他文件中，通常用在类型声明文件`d.ts`中。

declare 的作用是使得 TypeScript 也能写 C 语言那样的类型声明，即只声明类型，不必给出具体实现。比如，函数不能只写类型，不写实现。

它包含外部变量声明、外部函数声明、外部类声明、外部枚举声明和外部命名空间声明。

```typescript
declare var a: boolean;
 
declare let b: boolean;

declare const c: boolean;
```

外部变量声明不允许定义初始值，因为它只表示一种类型，而不能够表示一个值。如果外部变量声明中没有使用类型注解，那么变量的类型为any类型。

```typescript
declare function f(a: string, b: boolean): void;
```

外部函数声明使用“declare function”关键字来定义。外部函数声明中不允许带有函数实现，只能定义函数类型。

```typescript
declare class C {
    // 静态成员声明
    public static s0(): string;
    private static s1: string;

    // 属性声明
    public a: number;
    private b: number;

    // 构造函数声明
    constructor(arg: number);

    // 方法声明
    m(x: number, y: number): number;

    // 存取器声明
    get c(): number;
    set c(value: number);

    // 索引签名声明
    [index: string]: any;
}
```

外部类声明使用“declare class”关键字来定义。外部类声明中的成员不允许带有具体实现，只允许定义类型。例如，类的方法和构造函数不允许带有具体实现，类的属性声明不允许定义初始值等。

```typescript
declare enum Foo {
    A,
    B,
}

declare enum Bar {
    A = 0,
    B = 1,
}

declare const enum Baz {
    A,
    B,
}

declare const enum Qux {
    A = 0,
    B = 1,
}
```

外部枚举声明与常规枚举声明主要有以下两点不同：

- 在外部枚举声明中，枚举成员的值必须为常量枚举表达式，例如数字字面量、字符串字面量或简单算术运算等。
- 在使用了“declare enum”的外部枚举中，若枚举成员省略了初始值，则会被视为计算枚举成员，因此不会被赋予一个自增长的初始值，如0、1和2等。

若想要实际运行此例中的代码，我们还需要给出Direction枚举的具体定义。“typings.d.ts”中只声明了Direction枚举的类型，而没有提供具体定义。

外部命名空间的成员默认为导出成员，不需要使用export关键字来明确地导出它们，但使用了export关键字也没有错误。

```typescript
declare namespace Foo {
    export var a: boolean;
}
```

```typescript
declare module 'io' {
   export function readFile(filename: string): string;
}
```

在该语法中，“declare module”是关键字，它后面跟着一个表示模块名的字符串，模块名中不能使用路径。

===

举例来说，浏览器脚本会使用`document`对象，该对象是浏览器内置的，不是脚本定义的。所以，可以使用`declare`命令，表示`document`对象由外部定义。TypeScript 默认提供的定义文件`lib.d.ts`，给出了`document`的类型声明。

```typescript
declare var document;  
document.title = "Hello"; 
```

如果 TypeScript 如果找到`document`的外部定义，就会假定它的类型是`any`。

## declare module 命令

我们可以为每个模块文件，定义一个`.d.ts`文件。但是，更方便的做法是为整个项目，定义一个大的`.d.ts`文件，在这个文件里面使用`declare module`定义每个模块文件的类型。

下面的示例是`node.d.ts`文件的一部分。

```typescript
declare module "url" {
  export interface Url {
    protocol?: string;
    hostname?: string;
    pathname?: string;
  }

  export function parse(
    urlStr: string,
    parseQueryString?,
    slashesDenoteHost?
  ): Url;
}

declare module "path" {
  export function normalize(p: string): string;
  export function join(...paths: any[]): string;
  export var sep: string;
}
```

使用时，脚本使用三斜杠命令，加载这个类型声明文件。

```typescript
/// <reference path="node.d.ts"/>
```

如果不想为外部模块编写类型，可以在`.d.ts`文件里面或者在脚本顶部，加上下面一行命令。

```typescript
declare module "模块名";
```

加上上面的命令以后，外部模块即使没有类型，也可以通过编译。但是，从该模块输入的所有接口都将为`any`类型。

## 扩展模块类型

如果一个项目有多个模块文件，可以对一个文件中声明的类型，在另一个文件中进行扩展。

```typescript
// a.ts
export interface A {
  x: number;
}

// b.ts
import { A } from './a';

declare module './a' {
  interface A {
    y: number;
  }
}

const a:A = { x: 0, y: 0 };
```

上面示例中，脚本`a.ts`定义了一个接口`A`，脚本`b.ts`为这个接口添加了属性`y`。`declare module './a' {}`表示对`a.ts`里面的模块，进行类型声明，而同名 interface 会自动合并，所以等同于扩展类型。

使用这种语法进行模块的类型扩展时，有两点需要注意：

（1）不能创建新的顶层类型。也就是说，只能对`a.ts`模块中已经存在的类型进行扩展，不允许增加新的顶层类型，比如新定义一个接口`B`。

（2）不能对默认的`default`接口进行扩展，只能对 export 命令输出的命名接口进行扩充。这是因为在进行类型扩展时，需要依赖输出的接口名。

## 扩充全局声明

与模块扩充类似，TypeScript还提供了全局对象扩充语法`declare global {}`。

全局对象是 JavaScript 引擎提供的对象，可以直接使用。如果需要扩充全局对象，就需要使用`declare`命令，主要用于为 JavaScript 原生对象（比如`Array`）添加成员。

```typescript
export {}; // 确保当前文件被当成模块处理

declare global {
  interface Array<T> {
    mapToNumbers(): number[];
  }
}

Array.prototype.mapToNumbers = function () {
  /* ... */
};
```

示例如下：

```typescript
export {};

declare global {
    interface Window {
        myAppConfig: object;
    }
}

const config: object = window.myAppConfig;
```

此例中，“declare global {}”是全局对象扩充语法，它扩展了全局的Window对象，增加了一个myAppConfig属性。第1行，我们使用了“export {}”空导出语句，这是因为全局对象扩充语句必须在模块或外部模块声明中使用，当我们添加了空导出语句后，该文件就成了一个模块。

下面是另一个例子。

```typescript
export class Observable<T> {
  // ... still no implementation ...
}
declare global {
  interface Array<T> {
    toObservable(): Observable<T>;
  }
}
Array.prototype.toObservable = function () {
  // ...
};
```

全局对象扩充也具有和模块扩充相同的限制，不能在全局对象扩充语法中增加新的顶层声明，只能扩充现有的声明。