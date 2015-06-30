# ES6的功能侦测库 ES-Checker

两周前，[《ECMAScript国际标准（第6版）》](http://www.ecma-international.org/ecma-262/6.0/)正式通过，下一代 JavaScript 语言定案。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015063002.jpg)

ECMAScript 6（以下简称 ES6）总共新增了20多项重大的语言特性。各种浏览器和 Node.js 都积极支持，但还有不少功能没实现。

上个周末，我读到了 Kyle Simpson 的文章[《ES6: Features By Testing》](http://davidwalsh.name/es6-features-testing)，发现他开发了[一组测试](https://github.com/getify/es-feature-tests/blob/master/lib/featuretests.js#L18)，可以侦测运行环境支持哪些 ES6 的功能。

我就在他的基础上 ，写了功能侦测库 [ES-Checker](https://github.com/ruanyf/es-checker) ，用于查看 ES6 的支持情况。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015063004.png)

今天，我把这个库提交到 [Hacker News](https://news.ycombinator.com/item?id=9802639)，结果居然进入了首页！虽然，名次不高，上榜时间也不长，但也算实现了一个人生愿望。

[![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015063001.png)](https://news.ycombinator.com/item?id=9802639)

请先看[Demo](http://ruanyf.github.io/es-checker/index.cn.html)，你的浏览器支持多少 ES6？

[![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015063003.png)](http://ruanyf.github.io/es-checker/index.cn.html)

[ES-Checker](https://github.com/ruanyf/es-checker) 可用于多种环境。

**（1）命令行环境**

```bash
$ npm install -g es-checker
$ es-checker
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015063005.png)

**（2）Node环境**

将 ES-Checker 安装在项目的根目录。

```bash
$ npm install es-checker
```

就可以在脚本中引用 ES-Checker 了。

```javascript
var Supports = require("es-checker");

if (Supports.letConst) {
  let x = 5;
} else {
  var x = 5;
}
```

Supports 对象的属性清单，请见后文。

**（3）浏览器环境**

将 es-checker.js 插入页面。

```html
<script src="http://ruanyf.github.io/es-checker/es-checker.js"></script>
```

然后在脚本中使用 Supports 对象，决定哪些功能可以使用。

```html
<script>
if (Supports.letConst) {
  let x = 5;
} else {
  var x = 5;
}
</script>
```

## 附：Supports 的属性清单

- **letConst**: let 和 const 命令
- **defaultParameter**: 函数的默认参数
- **spreadRest**: 扩展（...）运算符
- **destructuring**: 解构赋值
- **parameterDestructuring**: 函数参数的解构
- **templateString**: 模板字符串
- **forOf**: for...of循环
- **arrow**: 箭头函数
- **generator**: generator函数
- **conciseMethodProperty**: 对象属性的简洁表示法
- **computedProperty**: 对象属性名使用表达式
- **moduleExport**: 模块的export命令
- **moduleImport**: 模板的import命令
- **numericLiteral**: 数值的八进制和二进制表示法
- **oldOctalLiteral**: 八进制的前缀零表示法
- **symbol**: Symbol类型
- **unicodeEscape**: Unicode字符的大括号表示法
- **unicodeIdentifier**: Unicode字符是否可用作标识名
- **unicodeRegExp**: 正则表达式的u修饰符
- **stickyRegExp**: 正则表达式的y修饰符
- **class**:  类（class）
- **letTDZ**: let命令的暂时性死区
- **constRedef**: 不允许再次用const声明同一变量
- **objectProto**: 对象的__proto__属性
- **objectSuper**: 对象方法是否可以使用super
- **extendNatives**: 原生类型的扩展
- **tco**: 尾调用优化
- **symbolImplicitCoercion**: Symbol值不能用于运算
- **functionNameInference**: 匿名函数的name属性推断函数名
- **objectStatics**: Object的静态方法
- **arrayStatics**: 数组的静态方法
- **arrayMethods**: 数组的实例方法
- **typedArrays**: 类型化数组
- **typedArrayStatics**: 类型化数组的静态方法
- **typedArrayMethods**: 类型化数组的实例方法
- **stringMethods**: 字符串的实例方法
- **numberStatics**: Number对象的静态方法
- **mathStatics**: Math对象的静态方法
- **collections**: Map, Set, WeakMap, WeakSet
- **proxy**:  Proxy对象
- **promise**:  Promise对象

（完）