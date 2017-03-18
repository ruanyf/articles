# Reduce 和 Transduce 的含义

学习[函数式编程](http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html)，必须掌握很多术语，否则根本看不懂文档。

本文介绍两个基本术语：`reduce`和`transduce`。它们非常重要，也非常有用。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017031801.png)

## 一、reduce 的用法

`reduce`是一种数组运算，通常用于将数组的所有成员“累积”为一个值。

```javascript
var arr = [1, 2, 3, 4];

var sum = (a, b) => a + b;

arr.reduce(sum, 0) // 10
```

上面代码中，`reduce`对数组`arr`的每个成员执行`sum`函数。`sum`的参数`a`是累积变量，参数`b`是当前的数组成员。每次执行时，`b`会加到`a`，最后输出`a`。

累积变量必须有一个初始值，上例是`reduce`函数的第二个参数`0`。如果省略该参数，那么初始值默认是数组的第一个成员。

```javascript
var arr = [1, 2, 3, 4];

var sum = function (a, b) {
  console.log(a, b);
  return a + b;
};

arr.reduce(sum) // => 10
// 1 2
// 3 3
// 6 4
```

上面代码中，`reduce`方法省略了初始值。通过`sum`函数里面的打印语句，可以看到累积变量每一次的变化。

总之，`reduce`方法提供了一种遍历手段，对数组所有成员进行“累积”处理。

## 二、map 是 reduce 的特例

累积变量的初始值也可以是一个数组。

```javascript
var arr = [1, 2, 3, 4];

var handler = function (newArr, x) {
  newArr.push(x + 1);
  return newArr;
};

arr.reduce(handler, [])
// [2, 3, 4, 5]
```

上面代码中，累积变量的初始值是一个空数组，结果`reduce`就返回了一个新数组，等同于执行`map`方法，对原数组进行一次“变形”。下面是使用`map`改写上面的例子。

```javascript
var arr = [1, 2, 3, 4];
var plusOne = x => x + 1;
arr.map(plusOne) // [2, 3, 4, 5]
```

事实上，所有的`map`方法都可以基于`reduce`实现。

```javascript
function map(f, arr) {
  return arr.reduce(function(result, x) {
    result.push(f(x));
    return result;
  }, []);
}
```

因此，`map`只是`reduce`的一种特例。

## 三、`reduce`的本质

本质上，`reduce`是三种运算的合成。

> - 遍历
> - 变形
> - 累积

还是来看上面的例子。

```javascript
var arr = [1, 2, 3, 4];
var handler = function (newArr, x) {
  newArr.push(x + 1);
  return newArr;
};

arr.reduce(handler, [])
// [2, 3, 4, 5]
```

上面代码中，首先，`reduce`遍历了原数组，这是它能够取代`map`方法的根本原因；其次，`reduce`对原数组的每个成员进行了“变形”（上例是加`1`）；最后，才是把它们累积起来（上例是`push`方法）。

## 四、 transduce 的含义

`reduce`包含了三种运算，因此非常有用。但也带来了一个问题：代码的复用性不高。在`reduce`里面，变形和累积是耦合的，不太容易拆分。

每次使用`reduce`，开发者往往都要从头写代码，重复实现很多基本功能，很难复用别人的代码。

```javascript
var handler = function (newArr, x) {
  newArr.push(x + 1);
  return newArr;
};
```

上面的这个处理函数，就很难用在其他场合。

有没有解决方法呢？回答是有的，就是把“变形”和“累积”这两种运算分开。如果`reduce`允许变形运算和累积运算分开，那么代码的复用性就会大大增加。这就是`transduce`方法的由来。

`transduce`这个名字来自 transform（变形）和 reduce 这两个单词的合成。它其实就是`reduce`方法的一种不那么耦合的写法。

```javascript
// 变形运算
var plusOne = x => x + 1;

// 累积运算
var append = function (newArr, x) {
  newArr.push(x);
  return newArr;
}; 

R.transduce(R.map(plusOne), append, [], arr);
// [2, 3, 4, 5]
```

上面代码中，`plusOne`是变形操作，`append`是累积操作。我使用了 [Ramda 函数库](http://www.ruanyifeng.com/blog/2017/03/ramda.html)的`transduce`实现。可以看到，`transduce`就是将变形和累积从`reduce`拆分出来，其他并无不同。

## 五、transduce 的用法

`transduce`最大的好处，就是代码复用更容易。

```javascript
var arr = [1, 2, 3, 4];
var append = function (newArr, x) {
  newArr.push(x);
  return newArr;
}; 

// 示例一
var plusOne = x => x + 1;
var square = x => x * x;

R.transduce(
  R.pipe(R.map(plusOne), R.map(square)), 
  append, 
  [], 
  arr
); // [2, 5, 10, 17]

// 示例二
var isOdd = x => x % 2 === 1;

R.transduce(
  R.pipe(R.filter(isOdd), R.map(square)), 
  append, 
  [], 
  arr
); // [1, 9]
```

上面代码中，示例一是两个变形操作的合成，示例二是过滤操作与变形操作的合成。这两个例子都使用了 [Pointfree 风格](http://www.ruanyifeng.com/blog/2017/03/pointfree.html)。

可以看到，`transduce`非常有利于代码的复用，可以将一系列简单的、可复用的函数合成为复杂操作。作为练习，有兴趣的读者可以试试，使用`reduce`方法完成上面两个示例。你会发现，代码的复杂度和行数大大增加。

## 六、Transformer 对象

`transduce`函数的第一个参数是一个对象，称为 Transformer 对象（变形器）。前面例子中，`R.map(plusOne)`返回的就是一个 Transformer 对象。

事实上，任何一个对象只要遵守 [Transformer 协议](https://github.com/cognitect-labs/transducers-js#transformer-protocol)，就是 Transformer 对象。

```javascript
var Map = function(f, xf) {
    return {
       "@@transducer/init": function() { 
           return xf["@@transducer/init"](); 
       },
       "@@transducer/result": function(result) { 
           return xf["@@transducer/result"](result); 
       },
       "@@transducer/step": function(result, input) {
           return xf["@@transducer/step"](result, f(input)); 
       }
    };
};
```

上面代码中，`Map`函数返回的就是一个 Transformer 对象。它必须具有以下三个属性。

> - @@transducer/step：执行变形操作
> - @@transducer/init：返回初始值
> - @@transducer/result：返回变形后的最终值

所有符合这个协议的对象，都可以与其他 Transformer 对象合成，充当`transduce`函数的第一个参数。

因此，`transduce`函数的参数类型如下。

```javascript
transduce(
  变形器 : Object,
  累积器 : Function,
  初始值 : Any,
  原始数组 : Array
)
```

## 七、into 方法

最后，你也许发现了，前面所有示例使用的都是同一个累积器。

```javascript
var append = function (newArr, x) {
  newArr.push(x);
  return newArr;
}; 
```

上面代码的`append`函数是一个常见累积器。因此， Ramda 函数库提供了`into`方法，将它内置了。也就是说，`into`方法相当于默认提供`append`的`transduce`函数。

```javascript
R.transduce(R.map(R.add(1)), append, [], [1,2,3,4]);
// 等同于
R.into([], R.map(R.add(1)), [1,2,3,4]);
```

上面代码中，`into`方法的第一个参数是初始值，第二个参数是变形器，第三个参数是原始数组，不需要提供累积器。

下面是另外一个例子。

```javascript
R.into(
  [5, 6],
  R.pipe(R.take(2), R.map(R.add(1))),
  [1, 2, 3, 4]
) // [5, 6, 2, 3]
```

## 八、参考链接

- [Transducers.js: A JavaScript Library for Transformation of Data](http://jlongster.com/Transducers.js--A-JavaScript-Library-for-Transformation-of-Data)
- [Transducers Explained: Part 1](http://simplectic.com/blog/2014/transducers-explained-1/)
- [Streaming Logs with Transducers and Ramda](http://simplectic.com/blog/2015/ramda-transducers-logs/)

（完）
 