# Web App的零框架解决方案

MVC框架（尤其是大型框架）有一个严重的缺点，就是会产生用户的重度依赖。一旦框架本身出现问题或者停止更新，用户的处境就会很困难，维护和更新成本极高。

ES6的到来，使得JavaScript语言有了原生的模块解决方案。于是，开发者有了另一种选择，就是不使用MVC框架，只使用各种单一用途的模块库，组合完成一个项目。

下面是可供选择的各种用途的模块列表，摘自Andy Walpole的[《2015: The End of the Monolithic JavaScript Framework》](https://andywalpole.me/#!/blog/142134/2015-the-end-the-monolithic-javascript-framework)。

## 辅助功能库（Helper Libraries）

- [moment.js](http://momentjs.com/)：日期和时间的标准化
- [underscore.js](http://underscorejs.org/) / [Lo-Dash](https://lodash.com/)：一系列函数式编程的功能函数

## 路由库（Routing）

- [router.js](https://github.com/tildeio/router.js/)：Ember.js使用的路由库
- [route-recognizer](https://github.com/tildeio/route-recognizer)：功能全面的路由库
- [page.js](https://github.com/visionmedia/page.js)：类似Express路由的库
- [director](https://github.com/flatiron/director)：同时支持服务器和浏览器的路由库

## Promise库

- [RSVP.js](https://github.com/tildeio/rsvp.js)：ES6兼容的Promise库
- [ES6-Promise](https://github.com/jakearchibald/es6-promise)：RSVP.js的子集，但是全面兼容ES6
- [q](https://github.com/kriskowal/q)：最常用的Promise库之一，AngularJS用了它的精简版
- [native-promise-only](https://github.com/getify/native-promise-only)：严格符合ES6的Promise标准，同时兼容老式浏览器

## 通信库

- [fetch](https://github.com/github/fetch)：实现window.fetch功能
- [qwest](https://github.com/pyrsmk/qwest)：支持XHR2和Promise的Ajax库
- [jQuery](https://github.com/jquery/jquery)：jQuery 2.0支持按模块打包，因此可以创建一个纯Ajax功能库

## 动画库（Animation）

- [cssanimevent](https://github.com/magnetikonline/cssanimevent)：兼容老式浏览器的CSS3动画库
- [Velocity.js](http://julian.com/research/velocity/)：性能优秀的动画库

## 辅助开发库（Development Assistance）

- [LogJS](https://github.com/bfattori/LogJS)：轻量级的logging功能库
- [UserTiming.js](https://github.com/nicjansma/usertiming.js)：支持老式浏览器的高精度时间戳库

## 流程控制和架构（Flow Control/Architecture）

- [ondomready](https://github.com/tubalmartin/ondomready)：类似jQuery的ready()方法，符合AMD规范
- [script.js](https://github.com/ded/script.js])：异步的脚本加载和依赖关系管理库
- [async](https://github.com/caolan/async)：浏览器和node.js的异步管理工具库
- [Virtual DOM](https://github.com/Matt-Esch/virtual-dom)：react.js的一个替代方案，参见[Virtual DOM and diffing algorithm](https://gist.github.com/Raynos/8414846)

## 数据绑定（Data-binding）

- [Object.observe()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/observe)：Chrome已经支持该方法，可以轻易实现双向数据绑定

## 模板库（Templating）

- [Mustache](http://mustache.github.io/)：大概是目前使用最广的不含逻辑的模板系统

## 微框架（Micro-Framework）

某些情况下，可以使用微型框架，作为项目开发的起点。

- [bottlejs](https://github.com/young-steveo/bottlejs)：提供惰性加载、中间件钩子、装饰器等功能
- [Stapes.js](http://hay.github.io/stapes/#top)：微型MVC框架
- [soma.js](http://somajs.github.io/somajs/site/)：提供一个松耦合、易测试的架构
- [knockout](http://knockoutjs.com/)：最流行的微框架之一，主要关注UI

（完）
