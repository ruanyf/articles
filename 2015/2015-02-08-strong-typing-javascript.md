# 强类型 JavaScript 的解决方案

JavaScript 是一种[弱类型](http://en.wikipedia.org/wiki/Strong_and_weak_typing)（或称[动态类型](http://en.wikipedia.org/wiki/Dynamic_programming_language)）语言，即变量的类型是不确定的。

```javascript

x = 5; // 5
x = x + 'A'; // '5A'

```

上面代码中，变量x起先是一个数值，后来是一个字符串，类型完全由当前的值决定，这就叫弱类型。

弱类型的好处是十分灵活，可以写出非常简洁的代码。但是，对于大型项目来说，强类型更有利，可以降低系统的复杂度，在编译时就发现类型错误，减轻程序员的负担。

一直有人尝试，让 JavaScript 变成强类型语言。在[官方](http://wiki.ecmascript.org/doku.php?id=strawman:types)最终支持强类型之前，本文介绍三种现在就可用的解决方案。

![](http://image.beekka.com/blog/2015/bg2015020801.jpg?i=407300661)

（题图：摄于花莲，台湾，2012年6月）

## 一、TypeScript

[TypeScript](http://www.typescriptlang.org/) 是微软2012年推出的一种编程语言，属于 JavaScript 的超集，可以编译为 JavaScript 执行。 它的最大特点就是支持强类型和 [ES6 Class](http://es6.ruanyifeng.com/#docs/class)。

安装TypeScript。

```bash
$ npm install -g typescript
```

然后，为变量指定类型。

```javascript
// greet.ts
function greet(person: string) {
  console.log("Hello, " + person);
}

greet([0, 1, 2]);
```

上面是文件 greet.ts 的代码，后缀名 ts 表明这是 TypeScript 的代码。函数 greet 的参数，声明类型为字符串，但在调用时，传入了一个数组。

使用 tsc 命令将 ts 文件编译为 js 文件，就会抛出类型不匹配的错误。

```bash
$ tsc greeter.ts
greet.ts(5,9): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

## 二、flowcheck

[flowcheck](http://gcanti.github.io/flowcheck/) 是一个轻量级的类型断言库，可以在运行时（runtime）检查变量类型是否正确。

首先，安装。

```javascript
$ npm install -g flowcheck
```

然后，编写一个声明了变量类型的脚本。

```javascript

function sum(a: number, b: number) {
  return a + b;
}

sum('hello','world')
```

接着，使用下面的命令，将脚本转换为正常的 JavaScript 文件。

```bash
$ browserify -t flowcheck -t [reactify --strip-types] input.js -o output.js
```

转换后的文件如下。

```javascript
var _f = require("flowcheck/assert");

function sum(a, b) {
	_f.check(arguments, _f.arguments([_f.number, _f.number]));
  return a + b;
}
```

可以看到，代码中插入一个断言库。每次运行函数之前，会先执行断言，如果类型不符就报错。

```bash
$ node output.js
// throw new TypeError(message);
            ^
TypeError: 

Expected an instance of number got "hello", context: arguments / [number, number] / 0

Expected an instance of number got "world", context: arguments / [number, number] / 1

```

## 三、flow

[Flow](http://flowtype.org/) 是 Facebook 在2014年发布的一个类型检查工具，用来检查 React 的源码。

安装命令如下。

```javascript
$ npm install --global flow-bin
```

如果安装不成功（我就是如此），就需要自己从[源码](https://github.com/facebook/flow)编译了。

Flow 的用法很多，我只举几个例子。前文介绍的两种工具，只能检查声明了类型的变量，而 Flow 可以推断变量类型。

```javascript
// hello.js
/* @flow */
function foo(x) {
  return x*10;
}
foo("Hello, world!");
```

上面是文件 hello.js ，该文件的第一行是注释，表明需要使用 Flow 检查变量类型。

```bash

$ flow check
hello.js:7:5,19: string
This type is incompatible with
/hello.js:4:10,13: number

```

运行 flow check 命令，得到报错信息：预期函数 foo 的参数是一个数值，但是实际为一个字符串。

Flow 也支持变量的类型声明。

```javascript

/* @flow */
function foo(x: string, y: number): string {
  return x.length * y;
}
foo("Hello", 42);

```

另一个有趣的功能是，Flow 可以将类型注释（annotation），转为类型声明。

```javascript
// annotation.js
/**
  @param {number} x
  @return {number}
 */
function square(x) {
  return x * x;
}
square(5);
```

运行 flow port 命令，会得到下面的结果。

```bash
$ flow port annotation.js
function square(x: number) : number {
   return x * x;
 }
```

Flow 的更多介绍，可以阅读[《Exploring Flow, Facebook's Type Checker for JavaScript》](http://www.crmarsh.com/flow/)。

本文的原始幻灯片点击[这里](http://slides.ruanyifeng.com/type/)（里面有更多内容）。

（完）