# JavaScript 有多灵活？

JavaScript 是一种灵活的语言，表达力极强，我来举一个例子，保证让很多人大吃一惊。

下面的例子受到了 Kyle Simpson 的文章[《Iterating ES6 Numbers》](http://blog.getify.com/iterating-es6-numbers/)的启发。

![](http://image.beekka.com/blog/2015/bg2015021001.jpg)

（题图：摄于华侨城，深圳，2014年6月）

---

首先，在 Number.prototype 对象上，部署一个 add 方法。

```javascript
Number.prototype.add = function (x) {
  return this + x;
};
```

上面代码为 Number 对象实例定义了一个 add 方法。如果你对这种写法不熟悉，建议先阅读我写的[《JavaScript 面向对象编程》](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)。

由于 Number 对象的实例就是数值，在数值上调用某个方法，数值会自动转为 Number 的实例对象，所以就得到了下面的结果。

```javascript
8['add'](2)
// 10
```

上面代码中，调用方法之所以写成`8['add']`，而不是`8.add`，是因为数值后面的点，会被解释为小数点，而不是点运算符。

将数值放在圆括号中，就可以使用点运算符调用方法了。

```javascript
(8).add(2)
// 10
```

其实，还有另一种写法。

```javascript
8..add(2)
// 10
```

上面代码的第一个点解释为小数点，第二个点解释为点运算符。为了语义清晰起见，下面我统一采用圆括号的写法。

由于add方法返回的还是数值，所以可以链式运算。

```javascript
Number.prototype.subtract = function (x) {
  return this - x;
};

(8).add(2).subtract(4)
// 6
```

上面代码在Number对象的实例上部署了subtract方法，它可以与add方法链式调用。

我们还可以部署更复杂的方法。

```javascript
Number.prototype.iterate = function () {
  var result = [];
  for (var i = 0; i <= this; i++) {
    result.push(i);
  }
  return result;
};

(8).iterate()
// [0, 1, 2, 3, 4, 5, 6, 7, 8]
```

上面代码在 Number 对象的原型上部署了 iterate 方法，可以将一个数值自动扩展为一个数组。

总之，现在我们可以在数值上直接调用方法了，但是后面一对圆括号看着有点碍眼，有没有可能去掉圆括号呢？也就是说，能不能将下面的表达式

```javascript
(8).double().square()
```

写成另一种样子？

```javascript
(8).double.suqare
```

这是可以做到的。

ES5规定，每个对象的属性都有一个[取值方法get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)，用来自定义该属性的读取操作。

```
Number.prototype = Object.defineProperty(
  Number.prototype, "double", {
    get: function (){return (this + this)} 
  }
);

Number.prototype =  Object.defineProperty(
  Number.prototype, "square", {
    get: function (){return (this * this)} 
  }
);
```

上面代码在 Number.prototype 上定义了两个属性 double 和 square ，以及它们的取值方法 get 。

因此，在任一数值上，读取这两个属性，就可以写成下面的样子。

```javascript
(8).double.square
// 256
```

也可以改用方括号运算符。

```javascript
8["double"]["square"]
// 256
```

（完）