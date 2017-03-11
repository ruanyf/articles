# Pointfree 编程风格指南

本文要回答一个很重要的问题：[函数式编程]()有什么用？

目前，业界主流的编程语言都不属于函数式编程，已经能够解决各种问题。既然如此，为什么还要学函数式编程，难道只为了多理解一些新奇的概念？

就像一个网友说的：

> “函数式编程有什么优势呢？我感觉，这种写法可能会令人头痛吧。”

我也曾经困惑，如何把函数式编程用于日常的编程实践呢，根本不知道从何入手。直到有一天，我学到了 Pointfree 这个概念，顿时豁然开朗，原来应该这样用！

我现在的看法是，Pointfree 是函数式编程用于日常开发的最佳实践。

##  一、程序的本质

让我从最基本的讲起，什么是程序？

上图是一个任务，左侧是数据输入（input），中间是一系列的运算步骤，对数据进行加工，右侧是最后的数据输出（output）。**一个或多个这样的任务，就组成了程序。**

数据的输入和输出（统称为 I/O），可能与键盘、屏幕、文件、数据库等相关。**这里的关键是，中间的运算部分不能有 I/O 操作，应该是纯运算，即通过纯粹的数学运算来求值。**否则，就应该拆分出另一个任务。

I/O 操作往往可以使用现成命令，因此大多数时候，编程就是写中间的那部分运算逻辑。现在的主流写法是过程式编程和面向对象编程，但是我觉得，就纯运算而言，函数式编程最合适。

## 二、函数的拆分与合成

运算过程可以用一个函数`fn`表示。

`fn`的形式如下。

```javascript
fn :: a -> b
```

上面的式子表示，函数`fn`的输入是数据`a`，输出是数据`b`。

如果运算比较复杂，通常需要将`fn`拆分成多个函数。

`f1`、`f2`、`f3`的形式如下。

```javascript
f1 :: a -> m
f2 :: m -> n
f3 :: n -> b
```

上面的式子中，输入的数据还是`a`，输出的数据还是`b`，但是多了两个中间值`m`和`n`。

我们可以把整个运算过程，想象成一根水管（pipe），数据从这头进去，那头出来。

函数的拆分，无非就是将一根水管拆成了三根。

进去的数据还是`a`，出来的数据还是`b`。这就很明显了，`fn`与`f1`、`f2`、`f3`存在对应关系。

```javascript
fn = R.pipe(f1, f2, f3);
```

上面代码中，我用到了 [Ramda](http://www.ruanyifeng.com/blog/2017/03/ramda.html) 函数库的[`pipe`](http://ramdajs.com/docs/#pipe)方法，将三个函数合成为一个。Ramda 是一个非常有用的库，后面的例子都会使用它。

## 三、Pointfree 的概念

从上面的式子还可以看出，如果先定义`f1`、`f2`、`f3`，就可以算出`fn`。整个过程，根本不需要知道`a`或`b`。

也就是说，我们完全可以把数据处理的过程，定义成一种与参数无关的合成运算。不需要用到所要处理的参数，只要把一些简单的运算步骤合成在一起，就可以定义出我们需要的运算。

这就叫做 Pointfree，不使用所要处理的值，只合成运算过程，中文可以译作“无值”风格。

请看下面的例子。

```javascript
var addOne = x => x + 1;
var square = x => x * x;
```

上面是两个基本运算`addOne`和`square`。

把它们合成一个运算。

```javascript
var addOneThenSquare = R.pipe(addOne, square);

addOneThenSquare(2) //  9
```

上面代码中，`addOneThenSquare`是一个函数，定义它的时候，根本不需要提到要处理的值，这就是 Pointfree。

## 四、Pointfree 的本质

Pointfree 的本质就是使用一些通用的的小函数，组合出各种复杂的运算。比如，如果你要取出某个对象的`role`属性，不要直接用`obj.role`，而是定义一个工具函数`propRole`。

```javascript
var prop = (p, obj) => obj[p];
var propRole = R.curry(prop)('role');
```

上面代码中，`prop`函数需要两个参数，这时所要处理的数据`obj`要放在最后一个参数，这是为了方便柯里化，产生只接受`obj`一个参数的函数`propRole`。

```javascript
var isWorker = s => s === 'worker';
var workers = R.filter(R.pipe(propRole, isWorker));

var data = [
  {name: '张三', role: 'worker'},
  {name: '李四', role: 'worker'},
  {name: '王五', role: 'manager'},
];
workers(data)
// [
//   {"name": "张三", "role": "worker"},
//   {"name": "李四", "role": "worker"}
// ]
```

上面代码中，`data`是传入的值，`workers`是处理这个值的函数。定义`workers`的时候，完全没有提到`data`，这就是 Pointfree。

简单说，Pointfree 就是运算过程抽象化，我要处理一个值，但是不要提到这个值。这样做有很多好处，它能够让代码更清晰和简练，更符合语义，更容易复用，测试也变得轻而易举。

## 五、Pointfree 的示例一

下面，我们来看一个实例。

```javascript
var str = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';
```

上面是一个字符串，请问其中最长的单词有多少个字符？

我们先定义一些基本运算。

```javascript
// 以空格分割单词
var splitBySpace = s => s.split(' ');

// 每个单词的长度
var getLength = w => w.length;

// 词的数组转换成长度的数组
var getLengthArr = arr => R.map(getLength, arr); 

// 返回较大的数字
var getBiggerNumber = (a, b) => a > b ? a : b;

// 返回最大的一个数字
var findBiggestNumber = arr => R.reduce(getBiggerNumber, 0, arr);
```

然后，把基本的运算合成为一个函数。

```javascript
var getLongestWordLength = R.pipe(
  splitBySpace,
  getLengthArr,
  findBiggestNumber,
);

getLongestWordLength(str) // 11
```

可以看到，整个运算由三个步骤构成，每个步骤都有语义化的名称，非常的清晰。这就是 Pointfree 风格的优势。

Ramda 提供了很多现成的方法，可以直接使用这些方法，省得自己定义一些常用函数。

```javascript
// 上面代码的另一种写法
var getLongestWordLength = R.pipe(
  R.split(' '),
  R.map(R.length),
  R.reduce(R.max, 0),
);
```

完整的代码请看[这里](https://gist.github.com/ruanyf/47e5d4f06194e9745e64f4c0404e3f78)，可以到[线上测试环境](http://ramdajs.com/repl/?v=0.23.0)运行。

## 六、Pointfree 示例二

最后，看一个实战的例子，拷贝自 Scott Sauyet 的文章[《Favoring Curry》](http://fr.umio.us/favoring-curry/)。那篇文章能帮助你深入理解柯里化，强烈推荐阅读。

下面是一段服务器返回的 JSON 数据。

要求是返回用户 Scott 的所有完成的任务，并按日期升序排列。

如果采用过程式编程，代码[如下](https://gist.github.com/ruanyf/4796d51f4774ead34726762b4de45a92)。

可以看到，上面代码不容易读，出错的可能性很大。

现在使用 Pointfree 风格[改写](https://gist.github.com/ruanyf/728d1fc9117d86f1bc728afc2272fb32)。

```javascript
var getIncompleteTaskSummaries = function(membername) {
  return fetchData()
    .then(R.prop('tasks'))
    .then(R.filter(R.propEq('username', membername)))
    .then(R.reject(R.propEq('complete', true)))
    .then(R.map(R.pick(['id', 'dueDate', 'title', 'priority'])))
    .then(R.sortBy(R.prop('dueDate')));
};
```

上面代码中，所有的数据处理都是同步的，所以可以把各个`then`里面的方法合成起来。

```javascript
// 提取 tasks 属性
var SelectTasks = R.prop('tasks');

// 过滤出指定的用户
var filterMember = member => R.filter(
  R.propEq('username', member)
);

// 排除已经完成的任务
var excludeCompletedTasks = R.reject(R.propEq('complete', true));

// 选取指定属性
var selectFields = R.map(
  R.pick(['id', 'dueDate', 'title', 'priority'])
);

// 按照到期日期排序
var sortByDueDate = R.sortBy(R.prop('dueDate'));

// 合成函数
var getIncompleteTaskSummaries = function(membername) {
  return fetchData().then(
    R.pipe(
      SelectTasks,
      filterMember(membername),
      excludeCompletedTasks,
      selectFields,
      sortByDueDate,
    )
  );
};
```

完整的代码请看[这里](https://gist.github.com/ruanyf/af1ae2ec302919d6247e2d7051046dcc)。

Pointfree 跟过程式的写法一比较，孰优孰劣一目了然。

## 七、参考链接

- [Pointfree Javascript](http://lucasmreis.github.io/blog/pointfree-javascript/)
- [Favoring Curry](http://fr.umio.us/favoring-curry/)

（完）