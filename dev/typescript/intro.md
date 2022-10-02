# TypeScript 简介

## 概述

TypeScript（简称“TS”）是微软公司发明的一种基于 JavaScript （简称为“JS”）语言的编程语言。

它的目的并不是创造一种全新语言，而是增强 JavaScript 的功能，使其更适合开发多人合作的企业级项目。TypeScript 可以看成是 JavaScript 的衍生语言。

它继承了 JavaScript 的语法，所有 JavaScript 脚本都可以看作 TypeScript 脚本。后者只是在前者基础上，额外再增加了一些语法功能。所以，人们常常说，TypeScript 是 JavaScript 的超集（superset）。

TypeScript 增加的最主要功能，也是这门语言的主要目的，就是为 JavaScript 添加一个独立的类型系统。

## 类型的概念

类型（type）指的是一组具有相同特征的值。如果两个值具有某个共同的特征，就可以说，它们属于同一种类型。

举例来说，123 和 456 这两个值，共同特征是都能进行数学运算，所以都属于“数值”（number）这个类型。

一旦确定某个值属于某种类型，就意味着这个值具有该类型的所有特征。凡是适用该类型的地方，都可以使用这个值；凡是不适用该类型的地方，使用这个值都会报错。

**类型是人为添加的一种编程约束和用法提示。** 主要目的是在软件开发过程中，让编译器和开发工具提供更多的验证和帮助，帮助提高代码质量，减少错误。

下面是一段简单的 TypeScript 代码，演示一下类型系统的作用。

```typescript
function addOne(n:number) {
  return n + 1;
}
```

上面示例中，函数`addOne()`有一个参数`n`，类型为数值（number），表示这个位置只能使用数值，传入其他类型的值就会报错。

```typescript
addOne('hello') // 报错
```

上面示例对函数`addOne()`传入了一个字符串`hello`，TypeScript 编译器就会报错，指出这个位置只能传入数值，不能传入字符串。

JavaScript 语言就没有这个功能，默认不限制参数的类型，任何类型的值都可以传入函数`addOne()`，不适合的值在运行时就会报错。

作为比较，TypeScript 是在开发阶段报错，有利于提早发现错误，避免用户使用时遇到错误。而且，函数定义里面加入类型，具有提示作用，可以告诉开发者这个函数怎么用。

## 动态类型与静态类型

如果你学过 JavaScript，就会知道它本身有一个类型系统，比如`123`和`Hello world`在 JavaScript 里面是两种不同的类型（数值 vs 字符串）。但是，它的类型系统非常弱，而且没有什么使用限制，JavaScript 属于动态类型语言。

TypeScript 引入了一个强大的类型系统，具有非常严格的类型限制，属于静态类型语言。


下面是一个最简单的例子，演示一下 TypeScript 和 JavaScript 的差异。

```javascript
// JavaScript 代码
let x = 123;
x = 'hello';
```

上面是两行 JavaScript 代码。第一行声明了一个变量`x`，变量的值是一个数值。

第二行将`x`的值改成了一个字符串。由于JavaScript 是动态类型语言，即变量的类型是动态的，可以是任意类型，并且能够随时改变类型，所以上面的代码是完全合法的。

如果采用 TypeScript，声明变量就要写成下面这样。

```typescript
// TypeScript 代码
let x:number = 123;
```

上面示例中，变量`x`后面的`:number`就是类型注释，表示它的值应该是一个数值。TypeScript 要求变量声明时，必须给出类型注释。

如果变量的值与指定的类型不符合，就会报错。

```typescript
let x:number = 'hello'; // 报错
```

上面示例中，变量`x`的类型是数值，却被赋值为字符串`hello`，结果就报错了。

变量一旦设定了类型，就只能存放这个类型的值，不能存放其它类型的值。这就叫做静态类型。

## 学习途径

学习 TypeScript，必须先了解 JavaScript 的语法。本书假定读者已经掌握了 JavaScript 语言，就不再介绍它的语法了，只介绍 TypeScript 引入的静态类型系统。

JavaScript 语法可以参考[《JavaScript 教程》](https://wangdoc.com/javascript)和[《ES6 教程》](https://wangdoc.com/es6)。

学习 TypeScript 需要有 JavaScript 基础。比较理想的学习途径是，先学会 JavaScript，再学习 TypeScript。 

跳过 JavaScript，直接学习 TypeScript 也是可以学会的，但是最终还是需要懂 JavaScript。因为 TypeScript 主要运行在浏览器和 Node.js 环境，这两个环境都只支持 JavaScript，所有接口和资料都是为后者准备的。事实上，TypeScript 代码运行时，都是先编译成 JavaScript 然后再运行。

本书完整介绍 TypeScript 语言，但是不涉及 JavaScript 语法的详细介绍，假设读者对后者已经有一个基本了解。

需要注意的是，JavaScript 的语法标准已经从 ES5 进化到了 ES6。标准委员会从2015年开始，每年发布一个新的语法版本：ES015、ES2016、ES017…… TypeScript 完全采用 ES6 的语法，所以掌握 ES6 也是的。

如果你对 JavaScript 语法（ES5 和 ES6）还不熟悉，建议先阅读 JavaScript 语法标准教程和 ES6 语法入门，再来阅读本书。




## TypeScript 的历史

2012年，微软公司宣布了 TypeScript 项目，它的主要设计者是著名的编程语言设计大师 Anders Hejlsberg，他也是 C## 和 .Net 的设计师。

微软发明这门语言的主要目的，是让 JavaScript 程序员可以参与 Windows 8 应用程序的开发。当时，Windows 8 即将发布，它的应用程序除了 C# 和 Visual Basic，还可以用 HTML 和 JavaScript 来写。微软希望，这种新语言既能让 JavaScript 程序员快速上手，也能让 .Net 程序员感到熟悉。

所以，TypeScript 的很多语法概念，很大程度上跟 .Net 是类似的。

这门语言的特点，就是为 JavaScript 加入一个类型系统，使其能够进行静态语法分析。这样严格的语法约束，就使其能够用于大型的、多人合作的软件项目。

另外，TypeScript 是一个开源项目，接受社区的参与，核心的编译器采用 Apache 2.0 许可证。



## 静态类型的优点

有了类型以后，TypeScript 就可以对代码进行类型检查。不用运行代码，只通过分析类型，就能及时发现代码错误。另外，类型注释也有利于编辑器提供语法提示，以及自动生成文档。

并且，TypeScript 有助于提高代码质量，保证代码安全，更适合用在大型的企业级项目。这就是为什么大量 JavaScript 项目转成 TypeScript 的原因。

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

TypeScript 脚本文件使用`.ts`后缀名，JavaScript 脚本文件使用`.js`后缀名。

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
