# JavaScript 模块的循环加载

“循环加载”（circular dependency）指的是，`a`脚本的执行依赖`b`脚本，而`b`脚本的执行又依赖`a`脚本。

```javascript
// a.js
var b = require('b');

// b.js
var a = require('a');
```

通常，“循环加载”表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015110201.jpg)

但是实际上，这是很难避免的，尤其是依赖关系复杂的大项目，很容易出现`a`依赖b，`b`依赖`c`，`c`又依赖`a`这样的情况。这意味着，模块加载机制必须考虑“循环加载”的情况。

本文介绍JavaScript语言如何处理“循环加载”。目前，最常见的两种模块格式CommonJS和ES6，处理方法是不一样的，返回的结果也不一样。

## CommonJS模块

CommonJS模块的重要特性是加载时执行，即脚本代码在`require`的时候，就会全部执行。**因此，CommonJS规定，一旦发现某个模块被“循环加载”，就立即停止加载，只输出已经执行的部分。**

让我们来看，[官方文档](https://nodejs.org/api/modules.html#modules_cycles)里面的例子。脚本文件`a.js`代码如下。

```javascript
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');
```

上面代码之中，`a.js`脚本先输出一个`done`变量，然后加载另一个脚本文件`b.js`。注意，此时`a.js`代码就停在这里，等待`b.js`执行完毕，再往下执行。

再看`b.js`的代码。

```javascript
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');
```

上面代码之中，`b.js`执行到第二行，就会去加载`a.js`，这时，就发生了“循环加载”。为了避免无穷递归，执行引擎不会去再次执行`a.js`，而是只返回已经执行的部分。

`a.js`已经执行的部分，只有一行。

```javascript
exports.done = false;
```

因此，对于`b.js`来说，它从`a.js`只输入一个变量`done`，值为`false`。

然后，`b.js`接着往下执行，等到全部执行完毕，再把执行权交还给`a.js`。于是，`a.js`接着往下执行，直到执行完毕。我们写一个脚本`main.js`，验证这个过程。

```javascript
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
```

执行`main.js`，运行结果如下。

```bash
$ node main.js

在 b.js 之中，a.done = false
b.js 执行完毕
在 a.js 之中，b.done = true
a.js 执行完毕
在 main.js 之中, a.done=true, b.done=true
```

上面的代码证明了两件事。一是，在`b.js`之中，`a.js`没有执行完毕，只执行了第一行。二是，`main.js`执行到第二行时，不会再次执行`b.js`，而是输出缓存的`b.js`的执行结果，即它的第四行。

```javascript
exports.done = true;
```

## ES6模块

ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令`import`时，不会去执行模块，而是只生成一个引用。等到真的需要用到时，再到模块里面去取值。

因此，ES6模块是动态引用，不存在缓存值的问题，而且模块里面的变量，绑定其所在的模块。请看下面的例子。

```javascript
// m1.js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);

// m2.js
import {foo} from './m1.js';
console.log(foo);
setTimeout(() => console.log(foo), 500);
```

上面代码中，`m1.js`的变量`foo`，在刚加载时等于`bar`，过了500毫秒，又变为等于`baz`。

让我们看看，`m2.js`能否正确读取这个变化。

```bash
$ babel-node m2.js

bar
baz
```

上面代码表明，ES6模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。

这导致ES6处理“循环加载”与CommonJS有本质的不同。**ES6根本不会检查是否发生了“循环加载”，只是生成一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。**

请看下面的例子（摘自 Dr. Axel Rauschmayer 的[《Exploring ES6》](http://exploringjs.com/es6/ch_modules.html)）。

```javascript
// a.js
import {bar} from './b.js';
export function foo() {
  bar();  
  console.log('执行完毕');
}
foo();

// b.js
import {foo} from './a.js';
export function bar() {  
  if (Math.random() > 0.5) {
    foo();
  }
}
```

按照CommonJS规范，上面的代码是没法执行的。`a`先加载`b`，然后`b`又加载`a`，这时`a`还没有任何执行结果，所以输出结果为`null`，即对于`b.js`来说，变量`foo`的值等于`null`，后面的`foo()`就会报错。

但是，ES6可以执行上面的代码。

```bash
$ babel-node a.js

执行完毕
```

`a.js`之所以能够执行，原因就在于ES6加载的变量，都是动态引用其所在的模块。只要引用是存在的，代码就能执行。

我们再来看ES6模块加载器[SystemJS](https://github.com/ModuleLoader/es6-module-loader/blob/master/docs/circular-references-bindings.md)给出的一个例子。

```javascript
// even.js
import { odd } from './odd'
export var counter = 0;
export function even(n) {
  counter++;
  return n == 0 || odd(n - 1);
}

// odd.js
import { even } from './even';
export function odd(n) {
  return n != 0 && even(n - 1);
}
```

上面代码中，`even.js`里面的函数`foo`有一个参数`n`，只要不等于0，就会减去1，传入加载的`odd()`。`odd.js`也会做类似操作。

运行上面这段代码，结果如下。

```javascript
$ babel-node
> import * as m from './even.js';
> m.even(10);
true
> m.counter
6
> m.even(20)
true
> m.counter
17
```

上面代码中，参数`n`从10变为0的过程中，`foo()`一共会执行6次，所以变量`counter`等于6。第二次调用`even（）`时，参数`n`从20变为0，`foo()`一共会执行11次，加上前面的6次，所以变量`counter`等于17。

这个例子要是改写成CommonJS，就根本无法执行，会报错。

```javascript
// even.js
var odd = require('./odd');
var counter = 0;
exports.counter = counter;
exports.even = function(n) {
  counter++;
  return n == 0 || odd(n - 1);
}

// odd.js
var even = require('./even');
exports.odd = function(n) {
  return n != 0 && even(n - 1);
}
```

上面代码中，`even.js`加载`odd.js`，而`odd.js`又去加载`even.js`，形成“循环加载”。这时，执行引擎就会输出`even.js`已经执行的部分（不存在任何结果），所以在`odd.js`之中，变量`even`等于`null`，等到后面调用`even(n-1)`就会报错。

```bash
$ node
> var m = require('./even');
> m.even(10)
TypeError: odd is not a function
```

[说明] 本文是我写的[《ECMAScript 6入门》](http://es6.ruanyifeng.com/)第20章[《Module》](http://es6.ruanyifeng.com/#docs/module)中的一节。

（完）






