## 浏览器加载 CommonJS 模块的原理与实现

就在这个周末，[npm](https://www.npmjs.com/) 超过了 [cpan](http://www.cpan.org/) ，成为地球上最大的软件模块仓库。

npm 的模块都是 JavaScript 语言写的，但浏览器用不了，因为不支持 CommonJS 格式。要想让浏览器用上这些模块，必须转换格式。

本文介绍浏览器加载 CommonJS 的原理，并且给出一种非常简单的[实现](https://github.com/ruanyf/tiny-browser-require/blob/master/require.js)。

![](http://image.beekka.com/blog/2015/bg2015052201.png)

## 一、原理

浏览器不兼容CommonJS的根本原因，在于缺少四个Node.js环境的变量。

> - module
> - exports
> - require
> - global

只要能够提供这四个变量，浏览器就能加载 CommonJS 模块。

下面是一个简单的示例。

```javascript
var module = {
  exports: {}
};

(function(module, exports) {
  exports.multiply = function (n) { return n * 1000 };
}(module, module.exports))

var multiply = module.exports.multiply;
f(5) // 5000 
```

上面代码向一个立即执行函数提供 module 和 exports 两个外部变量，模块就放在这个立即执行函数里面。模块的输出值放在 module.exports 之中，这样就实现了模块的加载。

## 二、Browserify 的实现

知道了原理，就能做出工具了。[Browserify](http://browserify.org/) 是目前最常用的 CommonJS 格式转换的工具。

![](http://image.beekka.com/blog/2015/bg2015052202.png)

请看一个例子，main.js 模块加载 foo.js 模块。

```javascript
// foo.js
module.exports = function(x) {
  console.log(x);
};

// main.js
var foo = require("./foo");
foo("Hi");
```

使用下面的命令，就能将main.js转为浏览器可用的格式。

```bash
$ browserify main.js > compiled.js
```

Browserify到底做了什么？安装一下[browser-unpack](https://www.npmjs.com/package/browser-unpack)，就能看清楚了。

```bash
$ npm install browser-unpack -g
```

然后，将前面生成的compile.js解包。

```bash
$ browser-unpack < compiled.js

[
  {
    "id":1,
    "source":"module.exports = function(x) {\n  console.log(x);\n};",
    "deps":{}
  },
  {
    "id":2,
    "source":"var foo = require(\"./foo\");\nfoo(\"Hi\");",
    "deps":{"./foo":1},
    "entry":true
  }
]
```

可以看到，browerify 将所有模块放入一个数组，id 属性是模块的编号，source 属性是模块的源码，deps 属性是模块的依赖。

因为 main.js 里面加载了 foo.js，所以 deps 属性就指定 ./foo 对应1号模块。执行的时候，浏览器遇到 require('./foo') 语句，就自动执行1号模块的 source 属性，并将执行后的 module.exports 属性值输出。

##  三、Tiny Browser Require

虽然 Browserify 很强大，但不能在浏览器里操作，有时就很不方便。

我根据 [mocha](https://github.com/mochajs/mocha) 的内部实现，做了一个纯浏览器的 CommonJS 模块加载器 [tiny-browser-require](https://github.com/ruanyf/tiny-browser-require) 。完全不需要命令行，直接放进浏览器即可，所有代码只有30多行。

[![](http://image.beekka.com/blog/2015/bg2015052203.png)](https://github.com/ruanyf/tiny-browser-require)

它的逻辑非常简单，就是把模块读入数组，加载路径就是模块的id。

```javascript
function require(p){
  var path = require.resolve(p);
  var mod = require.modules[path];
  if (!mod) throw new Error('failed to require "' + p + '"');
  if (!mod.exports) {
    mod.exports = {};
    mod.call(mod.exports, mod, mod.exports, require.relative(path));
  }
  return mod.exports;
}

require.modules = {};

require.resolve = function (path){
  var orig = path;
  var reg = path + '.js';
  var index = path + '/index.js';
  return require.modules[reg] && reg
    || require.modules[index] && index
    || orig;
};

require.register = function (path, fn){
  require.modules[path] = fn;
};

require.relative = function (parent) {
  return function(p){
    if ('.' != p.charAt(0)) return require(p);
    var path = parent.split('/');
    var segs = p.split('/');
    path.pop();

    for (var i = 0; i < segs.length; i++) {
      var seg = segs[i];
      if ('..' == seg) path.pop();
      else if ('.' != seg) path.push(seg);
    }

    return require(path.join('/'));
  };
};
```

使用的时候，先将上面的代码放入页面。然后，将模块放在如下的立即执行函数里面，就可以调用了。

```html
<script src="require.js" />

<script>
require.register("moduleId", function(module, exports, require){
  // Module code goes here
});
var result = require("moduleId");
</script>
```

还是以前面的 main.js 加载 foo.js 为例。

```javascript
require.register("./foo.js", function(module, exports, require){
  module.exports = function(x) {
    console.log(x);
  };
});

var foo = require("./foo.js");
foo("Hi");
```

注意，这个库只模拟了 require 、module 、exports 三个变量，如果模块还用到了 global 或者其他 Node 专有变量（比如 process），就通过立即执行函数提供即可。

（完）

