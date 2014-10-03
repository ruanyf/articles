# JavaScript 运行机制详解：再谈Event Loop

一年前，我写了一篇[《什么是 Event Loop？》](http://www.ruanyifeng.com/blog/2013/10/event_loop.html)，那篇文章是错的，直到最近才发现。

下面就是我现在对Event Loop的理解，即对JavaScript语言的内部运行机制的理解。本文受到了Philip Roberts的演讲[《Help, I'm stuck in an event-loop》](http://vimeo.com/96425312)的启发。

进入正文之前，插播一条消息。

[![cover](http://es6.ruanyifeng.com/images/cover_thumbnail.jpg)](http://es6.ruanyifeng.com/images/cover.jpg)

我的新书《ECMAScript 6入门》出版了（[版权页](http://es6.ruanyifeng.com/images/copyright.png)，[内页1](http://es6.ruanyifeng.com/images/page1.png)，[内页2](http://es6.ruanyifeng.com/images/page2.png)），铜版纸全彩印刷，附有索引。预览和购买链接点击[这里](http://es6.ruanyifeng.com/)。

## 一、为什么JavaScript是单线程？

JavaScript运行机制的最大特点，就是只有一个[线程](http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html)，也就是说，同一个时间只能做一件事。

那么，为什么JavaScript不能有多个线程呢？这样能提高效率啊。

JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript主要用途是与用户互动，操作网页内容。这注定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

所以，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本新建线程，但是子线程完全受主线程控制，且不得操作DOM。

## 二、任务队列

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

如果因为计算量大，CPU忙不过来，倒也算了，但是很多时候CPU是闲着的，因为IO设备（输入输出设备）很慢（比如Ajax操作从网络读取数据），不得不等着它们给出结果，然后再往下执行。

这时，CPU完全可以不管IO设备，挂起相关任务，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。

这就是JavaScript运行机制的设计思路：

（1）所有任务都在主线程上执行，形成一个[执行栈](http://www.ruanyifeng.com/blog/2013/11/stack.html)（stack）。

（2）主线程之外，还存在一个“任务队列“（task queue）。那些与IO设备相关的任务，系统有两种处理方式，一种是等待IO设备返回结果（同步执行），另一种是把那些任务放到“任务队列“之中，继续执行后续的任务（异步执行）。

（3）一旦“执行栈“中的所有任务执行完毕，系统就会检查“任务队列“。如果IO设备返回了结果，相关任务就会从“任务队列“进入执行栈，继续执行。

下图就是主线程和任务队列的示意图。

只要主线程空了，就会去检查“任务队列“，这个过程会循环重复。

## 三、事件和回调函数

上一段说过，对于那些涉及IO设备的任务（异步任务），比较好的做法是在返回结果之前，先把它们挂起来。这种做法的正式名称，叫做回调函数，即指定一个函数，执行到它的时候，系统会把它挂在一边。等到系统从“任务队列“中得知，IO设备返回了结果，再回过头开始执行它。

所以，“任务队列“实质上是一个事件的队列（也可以理解成消息的队列），IO设备完成一项任务，就在“任务队列“中添加一个事件。主线程检查“任务队列“，就是检查里面有哪些事件。

“任务队列“中的事件，除了IO设备的事件，还包括一些用户产生的事件，比如用户点击鼠标的事件，如果指定过回调函数，该事件就会进入“任务队列“，等待主线程读取。

## 四、Event Loop

主线程从“任务队列“中读取事件，这个过程是循环不断的，所以又称为Event Loop（事件循环）。

为了更好地理解Event Loop，请看下图（转引自Philip Roberts的演讲[《Help, I'm stuck in an event-loop》](http://vimeo.com/96425312)）。

 主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部API，它们在“任务队列“中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会一次次地去检查“任务队列“，看看哪些事件已经完成了，并执行对应的回调函数。

需要注意的是，只有执行栈变空之后，主线程才会去检查“任务队列“。请看下面这个例子。

```javascript
    var req = new XMLHttpRequest();
    req.open('GET', url);    
    req.onload = function (){};    
    req.onerror = function (){};    
    req.send();
```

上面代码中的req.send方法是Ajax操作向服务器发送数据，它是一个异步操作，意味着只有在当前脚本的所有代码执行完，系统才会去“任务队列“检查是否有返回结果。所以，它与下面的写法等价。

```javascript
    var req = new XMLHttpRequest();
    req.open('GET', url);    
    req.send();
    req.onload = function (){};    
    req.onerror = function (){};   
```

也就是说，指定回调函数的部分（onload和onerror），在send()方法的前面或后面无关紧要，因为它们属于当前脚本，系统总是执行完它们，才会去检查“任务队列“。

## 五、定时器

除了执行异步任务，“任务队列“还有一个作用，就是可以人为加入事件，指定某些代码在多少时间之后执行，相当于推迟执行。这叫做“定时器“（timer），即定时执行代码。

定时器功能主要由setTimeout()和setInterval()这两个函数来完成，它们的内部运行机制完全一样，区别在于前者指定的代码是一次性执行，后者则为反复执行。以下主要讨论setTimeout()。

setTimeout()接受两个参数，第一个是回调函数，第二个是推迟执行的毫秒数。

```javascript
console.log(1);

setTimeout(function(){
	console.log(2);
},1000);

console.log(3);
```

上面代码的执行结果是1，3，2，因为setTimeout()将第二行推迟到1000毫秒之后执行。

setTimeout()只是将事件插入了“任务队列“，必须等到当前代码执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，一定会在setTimeout()指定的时间执行。

如果将setTimeout()的第二个参数设为0，就表示当前代码执行完，立即执行指定的回调函数。

```javascript
setTimeout(function(){
	console.log(1);
}, 0);

console.log(2);
```

上面代码的执行结果总是2，1，因为只有在执行完第二行以后，系统才会去执行“任务队列“中的回调函数。有些浏览器规定了setTimeout()的第二个参数的最小值，比如Firefox规定不得低于4毫秒，如果低于这个值，就会自动调整。

另外，对于那些DOM的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每16毫秒重绘一次。这时使用requestAnimFrame()的效果要好于setTimeout()。

## 六、Node.js的Event Loop

Node.js也是单线程的Event Loop，但是它的运行机制不同于浏览器环境。

请看下面的示意图（作者[@BusyRich](https://twitter.com/BusyRich/status/494959181871316992)）。


根据上图，Node.js的运行机制如下。

> （1）V8引擎解析JavaScript脚本。
> 
> （2）解析后的代码，调用Node API。
> 
> （3）[libuv库](https://github.com/joyent/libuv)负责Node
> API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
> 
> （4）V8引擎再将结果返回给用户。

Node.js有一个[process.nextTick()](http://howtonode.org/understanding-process-next-tick)方法，可以将指定事件推迟到event loop的下一次执行，也就是当前的执行栈清空之后立即执行。

```javascript
function foo() {
    console.error(1);
}

process.nextTick(foo);
console.log(2);
// 2
// 1
```

process.nextTick(foo)的作用，与setTimeout(foo, 0)很相似，但是执行效率高得多（参见[比较结果](https://gist.github.com/mmalecki/1257394)）。

（完）

