# TypeScript 基本语法

本章介绍 TypeScript 的一些最基本的语法和概念。

## 类型声明

TypeScript 代码简单说就是在 JavaScript 代码的基础上，为变量和存储位置加上类型声明。

类型声明的写法，就是在变量或存储位置的后面加上“:[类型]”。

```typescript
let foo:string;
```

上面示例是一行变量声明语句，变量名`foo`后面的`:string`就是类型声明，表示变量`foo`的类型是`string`（字符串）。

除了变量声明，定义函数时，也要给出参数和返回值的类型声明。

```typescript
function toString(num:number):string {
  return String(num);
}
```

上面示例中，函数`toString()`的参数`num`的类型是`number`，返回值的类型是`string`。注意，返回值类型需要写在参数括号的后面。

变量的值应该与声明的类型一致，如果不一致，TypeScript 在编译时就会报错。

```typescript
// 报错
let foo:string = 123;
```

上面示例中，变量`foo`声明的类型是字符串，但是赋值为数值`123`，TypeScript 就会报错。

## 类型推断

变量和存储位置并不要求都有类型声明，如果没有，TypeScript 会尝试自己推断类型。

```typescript
let foo = 123;
```

上面示例中，变量`foo`并没有类型声明，TypeScript 就会推断它的类型。由于它被赋值为一个数值，因此 TypeScript 推断它的类型为`number`。

如果变量`foo`的值后面更改为其他类型，TypeScript 就会报错。

```typescript
let foo = 123;
foo = 'hello'; // 报错
```

上面示例中，变量`foo`的类型推断为`number`，后面赋值为字符串，TypeScript 就会报错。

TypeScript 也可以推断函数的返回值。

```typescript
function toString(num:number) {
  return String(num);
}
```

上面示例中，函数`toString()`没有声明返回值的类型，但是 TypeScript 推断返回的是字符串。

如果缺乏足够明确的信息，TypeScript 可能无法推断出某个变量或位置是什么类型。这时，TypeScript 就会将其设为`any`类型，即可能为任何类型。

很多项目采用严格设定（打开了`noImplicitAny`），不允许类型推断为`any`，这时如果 TypeScript 无法推断出类型，就会报错。

```typescript
// 报错
function fn(s) {
  console.log(s.subtr(3));
}
```

上面示例中，TypeScript 无法推断出参数`s`的类型。如果项目不允许推断为`any`类型，就会报错。

## 类型不是值

TypeScript 添加的类型系统，只能用于类型运行。它不是 JavaScript 的值，不能用于 JavaScript 的值运算。

```typescript
let x:any;
console.log(any); // 报错
```

## 类型断言

类型断言可以用来手动指定一个值的类型。

```typescript
<类型>值
// or
值 as 类型
```

```typescript
var str = '1' 
var str2:number = <number> <any> str   //str、str2 是 string 类型
console.log(str2)
```

当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 T。这是为了在进行类型断言时提供额外的安全性，完全毫无根据的断言是危险的，如果你想这么做，你可以使用 any。

它之所以不被称为类型转换，是因为转换通常意味着某种运行时的支持。但是，类型断言纯粹是一个编译时语法，同时，它也是一种为编译器提供关于如何分析代码的方法。

## 数据类型

### any 类型

any 类型的变量，它的值可以是任意类型。它的值会动态变化。

```typescript
let x: any = 1;    // 数字类型
x = 'I am who I am';    // 字符串类型
x = false;    // 布尔类型
```

any 类型的变量，可以跳过类型检查。所以，如果某些变量不想进行类型检查，可以把它们设为 any 类型。

数组也可以设为 any 类型的数组。

```typescript
let arrayList: any[] = [1, false, 'fine'];
arrayList[1] = 100;
```

如果一个变量是多个类型，但不是不定类型，可以使用`|`运算符指定多个类型。

```typescript
let x: number | null | undefined;
x = 1; // 运行正确
x = undefined;    // 运行正确
x = null;    // 运行正确
```

## 数组类型

多重数组

```typescript
var multi:number[][] = [[1,2,3],[23,24,25]];  
```

## 元组

数组中元素的数据类型都一般是相同的（any[] 类型的数组可以不同），如果存储的元素数据类型不同，则需要使用元组。

## Union

TypeScript 联合类型
联合类型（Union Types）可以通过管道(|)将变量设置多种类型，赋值时可以根据设置的类型来赋值。

创建联合类型的语法格式如下：

Type1|Type2|Type3 

```javascript
var val:string|number 
```


## never 类型

never 代表从不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环）。

```typescript
let x: never;
let y: number;

// 运行错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (()=>{ throw new Error('exception')})();

// 运行正确，never 类型可以赋值给 数字类型
y = (()=>{ throw new Error('exception')})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}
```

- 任意类型	any	声明为 any 的变量可以赋予任意类型的值。
- 数字类型	number	
双精度 64 位浮点值。它可以用来表示整数和分数。TypeScript 没有单独的整数类型。
- 字符串类型	string
- 布尔类型	boolean	
表示逻辑值：true 和 false。
- 数组类型	无	
声明变量为数组。
// 在元素类型后面加上[]
let arr: number[] = [1, 2];

// 或者使用数组泛型
let arr: Array<number> = [1, 2];
- 元组	无	
元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。
- 枚举	enum	
枚举类型用于定义数值集合。
void	void	
用于标识方法返回值的类型，表示该方法没有返回值。

function hello(): void {
    alert("Hello Runoob");
}
null	null	
表示对象值缺失。

undefined	undefined	
用于初始化变量为一个未定义的值

never	never	
never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。

## interface

`interface`命令用来描述对象的类型组成。

```javascript
interface User {
  name: string;
  id: number;
}

const user = {
  name: "Hayes",
  id: 0,
};
```

下面是使用`interface`命令定义对象实例的例子。

```javascript
interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);
```

## 类型

TypeScript 的内置类型与 JavaScript 一致。

- number
- string
- bigint
- boolean
- symbol
- null
- undefined
- object

此外，还提供了一些特殊类型。

- unknown	the top type.
- never	the bottom type.
- object literal	eg { property: Type }
- void	a subtype of undefined intended for use as a return type.
- T[]	mutable arrays, also written Array<T>
- [T, T]	tuples, which are fixed-length but mutable
- (t: T) => U	functions

### Union

Union 类型（联合）表示有多个可能的类型，或者有限的值。

type 命令用来定义简单类型的变量。

```javascript
type MyBool = true | false;
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

function getLength(obj: string | string[]) {
  return obj.length;
}
```

### Generics

Generics（范型）用来描述数组包含的值。

```javascript
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```

泛型可以在类型里面使用变量。

```javascript
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

declare const backpack: Backpack<string>;
```

上面代码中，`Type`就是一个变量，具体的值由声明实例时的类型决定。

## 接口

接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。

TypeScript 接口定义如下：

interface interface_name { 
}
实例
以下实例中，我们定义了一个接口 IPerson，接着定义了一个变量 customer，它的类型是 IPerson。

customer 实现了接口 IPerson 的属性和方法。

```typeScript
interface IPerson { 
    firstName:string, 
    lastName:string, 
    sayHi: ()=>string 
} 
 
var customer:IPerson = { 
    firstName:"Tom",
    lastName:"Hanks", 
    sayHi: ():string =>{return "Hi there"} 
} 
```

接口继承就是说接口可以通过其他接口来扩展自己。

Typescript 允许接口继承多个接口。

继承使用关键字 extends。

单接口继承语法格式：

Child_interface_name extends super_interface_name

多接口继承语法格式：

Child_interface_name extends super_interface1_name, super_interface2_name,…,super_interfaceN_name
继承的各个接口使用逗号 , 分隔。

实例

```typescript
interface Person { 
   age:number 
} 
 
interface Musician extends Person { 
   instrument:string 
} 
 
var drummer = <Musician>{}; 
drummer.age = 27 
```

## 类

```typescript
class Car { 
    // 字段 
    engine:string; 
 
    // 构造函数 
    constructor(engine:string) { 
        this.engine = engine 
    }  
 
    // 方法 
    disp():void { 
        console.log("发动机为 :   "+this.engine) 
    } 
}
```

类可以实现接口，使用关键字 implements，并将 interest 字段作为类的属性使用。

以下实例红 AgriLoan 类实现了 ILoan 接口：

TypeScript
interface ILoan { 
   interest:number 
} 
 
class AgriLoan implements ILoan { 
   interest:number 
   rebate:number 
   
   constructor(interest:number,rebate:number) { 
      this.interest = interest 
      this.rebate = rebate 
   } 
} 

## 命名空间

命名空间定义了标识符的可见范围，一个标识符可在多个名字空间中定义，它在不同名字空间中的含义是互不相干的。这样，在一个新的名字空间中可定义任何标识符，它们不会与任何已有的标识符发生冲突，因为已有的定义都处于其他名字空间中。

TypeScript 中命名空间使用 namespace 来定义，语法格式如下：

namespace SomeNameSpaceName { 
   export interface ISomeInterfaceName {      }  
   export class SomeClassName {      }  
}

以上定义了一个命名空间 SomeNameSpaceName，如果我们需要在外部可以调用 SomeNameSpaceName 中的类和接口，则需要在类和接口。

要在另外一个命名空间调用语法格式为：

SomeNameSpaceName.SomeClassName;
如果一个命名空间在一个单独的 TypeScript 文件中，则应使用三斜杠 /// 引用它，语法格式如下：

/// <reference path = "SomeFileName.ts" />

## 使用方法

### TypeScript Playground

最简单的 TypeScript 使用方法，就是使用官网的 [TypeScript Playground](http://www.typescriptlang.org/play/)。只要打开网页，把代码贴进文本框，就会自动编译代码，并且在浏览器中执行编译后的 JS 代码。

它具有支持完整的 IDE 支持，比如自动提示、显示静态类型错误。而且，它还可以把代码片段和编译器设置，保存到 URL 中，便于分享给他人。

### TS Node

[TS Node](https://github.com/TypeStrong/ts-node) 是基于 Node.js 的一个工具软件，可以运行 TypeScript 代码。

使用时，可以全局安装。

```bash
$ npm install -g ts-node
```

使用`npx ts-node`，可以在不安装它的情况下运行。

安装后，就可以直接运行 TS 脚本。

```bash
$ ts-node script.ts
# 或者
$ npx ts-node script.ts
```

执行时，不带有任何参数，它就会提供一个 TapeScript 命令行 REPL 运行环境。

```bash
$ ts-node
> const twice = (x: string) => x + x;
> twice('abc')
'abcabc'
```
