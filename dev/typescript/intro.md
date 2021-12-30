# TypeScript 简介

## 概述

### 静态类型

TypeScript （简称为“TS”）是微软公司发明的一种编程语言。

它的主要目的是将 JavaScript 语言（简称为“JS”）改造为一种静态类型语言。JavaScript 本身是动态类型语言，变量可以随时改变类型。

```javascript
let x = 123;
x = 'hello world';
```

上面示例中，变量`x`的值一开始是数值，后来改成了字符串，这就叫做动态类型。

TypeScript 是静态类型语言，不允许这样的改动。如果变量的类型一开始是数值，那就只能存放数值，不能存放其它类型的值。

由于 TypeScript 的目的只是为 JS 加上静态类型系统，所以它沿用了 JS 的所有语法，再加上自己的类型语法，可以视为是 JS 的超集。

理论上，JS 脚本都属于合法的 TS 脚本，现有的 JS 代码可以与 TS 代码一起工作。

TypeScript 的设计目的，只是 JavaScript 的类型注释，所以做了两个设计决定。

- 它的类型注释是可选的，你也可以不加，依然是有效的 TypeScript 代码。因此，所有 JavaScript 代码都是合法的 TypeScript 代码。

- TypeScript 不会在出现类型错误时，阻止代码转换成 JavaScript。因此，你可以逐步为以前的 JavaScript 代码添加 TypeScript 类型注释。 

### 编译

TypeScript 不提供代码的运行环境，只提供代码的转换工具，将 TS 代码转为 JS 代码，然后再在 JS 环境运行。这种代码转换，称为“编译”（compile）。

代码转换时，转换器会将添加的类型注释删除，并将 TS 特有的语法转为 JS 语法。因此，TS 的类型检查只是编译时的类型检查，而不是运行时的类型检查。一旦代码编译为 JS，运行时就不再检查类型了。

TypeScript 统一使用`.ts`作为 TypeScript 脚本的后缀名。

安装

```bash
$ npm install -g typescript
```

### 静态类型的好处

为什么 TS 要为 JS 添加静态类型？主要有下面三点好处。

- 编译时发现错误
- 使得代码更容易维护。
- 提供更好的 IDE 支持，能够语法提示和自动补全。

（1）发现拼写错误

```javascript
function hello() {
  console.log('hello world');
}
hallo();
```

上面示例中，函数`hello()`调用时，不小心拼写错了，写成`hallo()`。它会在运行时报错，有了 TypeScript以后，在正式上线之前的编译阶段，就会报错，提示函数`hallo()`未定义。

（2）发现语义错误

```javascript
const a = 0;
const b = true;
const result = a + b;
```

上面示例是合法的 JavaScript 代码，但是不应该这样写，因为将数值`a`与布尔值`b`相加，通常是没有意义的。TypeScript 也会在编译阶段报错，提示两者不应该相加。

（3）提供了代码文档。额外的类型说明，能够起到代码文档的作用。

```typescript
function toString(num: number): string {
  return String(num);
}
```

上面示例中，只看函数声明的第一行，就可以知道函数`toString()`接受一个数值作为参数，返回一个字符串。

（4）编辑器的自动代码补全。编辑器会自动提示函数用法、参数等。

（5）使得代码更容易重构。只要保持函数参数和返回值的类型不变，就可以放心重构函数本身的代码。

但是，静态类型也存在缺点，主要是丧失了动态类型的代码灵活性，以及编写代码时会增加一些工作量。（1）它是 JavaScript 之上的一个附加层：更复杂，要学习的东西更多，等等。（2）它在编写代码时引入了编译步骤。（3）TS 项目依赖 JS 生态，但是过去大部分 JS 项目都没有做 TS 适配。

## 类型的表达

TS 对每一个值的存储位置（变量、属性等），都要求有明确的类型。

TS 提供两种方法，获得存储位置的类型：类型注释和类型推断。

### 类型注释

在所有需要注明类型的地方，TypeScript 都允许使用`:TypeAnnotation`的形式说明类型。

最常见的，就是在声明变量时，在变量名后面使用冒号，添加类型注释，表示该变量的类型。

```typescript
let x: number;
```

上面代码中，变量`x`的类型是数值（number）。

声明函数的时候，也可以注明类型。

```typescript
var num: number = 123;
function identity(num: number): number {
    return num;
}
```

如果学过 JS，你可能知道没有初始化的变量，值一律等于`undefined`。那么，undefined 是否会违反静态类型`number`呢？TS 规定变量赋值之前不能读取，从而解决了这个问题。

### 类型推断

对于没有提供类型注释的变量和属性，TS 会自动推断它们的类型，这叫做“类型推断”。

```typescript
let myNumber = 123;
```

上面代码中，变量`myNumber`没有类型注释，TypeScript 会自行推断该变量的类型为数值，后面就不能改成其他类型的值了。

```typescript
let myNumber = 123;
myNumber = 'hello'; // 报错
```

上面示例中，变量`myNumber`的类型推断为数值，再赋值为字符串就会报错。

## 安装

```bash
$ npm install -g typescript
```

安装完，检查一下是否安装成功。

```bash
# 或者 tsc --version
$ tsc -v
Version 3.2.2
```

转换脚本命令，转换成 JavaScript 脚本运行。

```bash
$ tsc app.ts
```

上面命令会在`app.ts`的相同目录下，生成一个`app.js`文件。

可以同时转换多个文件。

```bash
$ tsc file1.ts file2.ts file3.ts
```

如果转换过程没有任何错误，上面的命令不会有任何显示，表示没有类型错误，编译成功。如果出错，`tsc`命令会报错，但是依然会生成`app.js`文件。这是因为 TypeScript 作者认为，开发者比编译器，更了解自己的代码，编译器的作用是给出编译错误，至于怎么处理编译结果，那就是开发者自己的判断了。

`--noEmitOnError`参数指定一旦编译报错，就不会生成 JS 文件。

```bash
$ tsc --noEmitOnError hello.ts
```

`--target`参数指定编译的版本，TypeScript 默认编译出来的 JavaScript 为 ES3 版本，可以指定编译为 ES2015 版本。

```bash
$ tsc --target es2015 hello.ts
```

`--strict`参数指定采用更严格的检查规则。

- noImplicitAny：类型推断一旦出现`any`变量，就报错，即变量必须可以推断为某种明确的类型。因为`any`类型的变量越少，类型系统的收益越大。
- strictNullChecks
