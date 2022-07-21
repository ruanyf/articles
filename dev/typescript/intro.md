# TypeScript 简介

## 概述

TypeScript（简称为“TS”）是微软公司发明的一种编程语言。

它的主要目的是为 JavaScript 语言（简称为“JS”）添加类型注释，将其改为静态类型语言。

JavaScript 本身是动态类型语言（即变量可以随时改变类型），也不支持类型注释。

```javascript
let x = 123;
x = 'hello world';
```

上面是一段 JavaScript 代码，变量`x`的值可以是任意类型，并且允许随时改变类型。上面示例中，`x`先赋值为数值`123`，然后又变为字符串`hello world`，这就叫做（变量的）动态类型。

TypeScript 首先要求变量声明时，必须给出类型注释。

```typescript
let x:number = 123;
```

上面示例中，变量`x`后面的`:number`就是类型注释，冒号表示类型描述，`number`表示变量`x`的类型是`number`（数值），所以可以赋值为`123`。赋值为其他类型的值，就会报错。

```typescript
// 报错
let x:number = 'hello world';

// 报错
let x:number = 'hello world';
x = 'hello world';
```

上面示例中，变量`x`的类型是数值，却被赋值为字符串`hello world`，结果就报错了。

变量一旦设定类型，它的类型就固定了。如果变量的类型一开始是数值，那就只能存放数值，不能存放其它类型的值。这就叫做静态类型。

TypeScript 的设计目的，就是为 JavaScript 加上静态类型系统，并不想成为一门独立的全新语言。所以，它沿用了 JavaScript 的所有语法，只添加了类型相关的一些新语法，可以视为是 JavaScript 的超集语言。

理论上，JavaScript 脚本都属于合法的 TyepScript 脚本，现有的 JavaScript 代码可以与 TypeScript 代码一起工作。但是，TypeScript 代码必须通过编译器，编译为 JavaScript 代码，才能在 JavaScript 引擎中执行。

学习 TypeScript，必须先了解 JavaScript 的语法。本书假定读者已经掌握了 JavaScript 语言，就不再介绍它的语法了，只介绍 TypeScript 引入的静态类型系统。

JavaScript 语法可以参考[《JavaScript 教程》](https://wangdoc.com/javascript)和[《ES6 教程》](https://wangdoc.com/es6)。

## 类型的概念

类型（type）就是一组具有相同特征的值。如果一组值具有共同的特征，就可以说，它们属于同一种类型。

指定某个值属于某种类型，就等于在说，该值具有该种类型的特征。如果该值不具有该种特征，就可以认定发生了错误。

类型是人为添加的一种编程约束，主要目的是在软件开发过程中，让编译器和开发工具可以提供更多的验证和帮助，帮助提高代码质量，减少错误。

## 静态类型的优点

TypeScript 为什么要为 JavaScript 添加类型呢？原因是静态类型语言有一些突出的优点。

（1）有利于发现错误。

静态类型语言要求每一个变量、每一个值、每一处用到值的地方，都设定好类型。这样的话，编译器和（支持类型检查的）代码编辑器，就能轻松发现类型不匹配的地方，从而减少了错误，节省了程序员的时间。

（2）使得静态检查成为可能。

编译器处理静态类型语言时，由于有了类型信息，可以不运行代码，就推断执行结果，这叫做静态检查。

静态检查不需要代码的运行环境，只要能运行编译器就可以，因此可以提前执行、大量执行。这对于大型项目非常重要，只运行静态检查就可以发现很多问题，大大降低了线上风险。

静态检查不仅能够发现类型错误，还能发现拼写错误、语义错误和方法调用错误。

```javascript
function hello() {
  console.log('hello world');
}
hallo(); // 报错
```

上面示例中，函数`hello()`调用时，不小心拼错成`hallo()`。这段代码会在运行时报错，但是静态检查根据没有找到`hallo()`的定义这一点，可以在上线前的编译阶段就报错。

```typescript
const a:number = 0;
const b:boolean = true;
const result:number = a + b; // 报错
```

上面示例是合法的 JavaScript 代码，但是不应该这样写，因为将数值`a`与布尔值`b`相加，通常是没有意义的。TypeScript 会在编译阶段报错，提示两者不是同一个类型，不应该相加，可能搞错了。

```typescript
function hello() {
  return 'hello world';
}

const foo:boolean = hello().find('hello'); // 报错
```

上面示例中，TypeScript 在编译阶段发现，`hello()`返回的是一个字符串，但是字符串对象的类型定义中，并没有`find()`方法，所以报错了。

（3）提供更好的 IDE 支持，能够语法提示和自动补全。

有些 IDE（集成开发环境，比如 VSCode）会利用类型信息，为用户提供语法提示（编辑器会自动提示函数用法、参数等）和自动补全（只需键入一部分的变量名或函数名，编辑器补全后面的部分）。

（4）提供了代码文档。

类型注释相当于代码文档，有些工具也确实能够从类型注释直接生成文档。类型信息可以描述对象有哪些方法和属性，函数的参数和返回值等等。熟练的开发者往往只看类型注释，就能推断代码的用法。

（5）有助于代码重构。

修改他人的代码，往往非常痛苦，项目越大越痛苦，因为不确定修改后是否会影响到其他部分的代码。类型注释大大减轻了重构的成本。

一般来说，只要函数或对象的参数和返回值保持类型不变，就能基本确定重构后的代码也能正常运行，如果还有配套的单元测试，就完全可以放心重构。越是大型的、多人合作的项目，类型系统能够提供的帮助越大。

## 静态类型的缺点

静态类型也存在一些缺点。

（1）丧失了动态类型的代码灵活性。

静态类型不仅将代码限定死了，而且要求在实现之前，就对如何实现有一个确定的构想，这有时很难做到。

（2）增加了编程工作量。

有了类型系统之后，程序员不仅需要编写功能，还需要编写类型注释。这增加了不少工作量，会显著拖长项目的开发时间。

（3）更高的学习成本。

类型系统通常比较复杂，要学习的东西更多，要求开发者付出更高的学习成本。

（4）引入了独立的编译步骤。

原生的 JavaScript 代码，可以直接在 JavaScript 引擎运行。添加类型系统以后，就多出了一个单独的类型编译阶段，只有转成 JavaScript 代码以后才能运行。

（5）兼容性问题。

TypeScript 依赖 JavaScript 生态，需要用到很多原有的模块。但是，过去大部分 JavaScript 项目都没有做 TypeScript 适配，虽然可以自己动手做适配，不过使用时难免还是会有一些兼容性问题。

## 设计思想

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
