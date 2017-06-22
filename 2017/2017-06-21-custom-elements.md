# HTML 自定义元素教程

组件是 Web 开发的方向，现在的热点是 JavaScript 组件，但是未来更有希望的可能是 HTML 组件。

本文就介绍 HTML 组件的基础知识：自定义元素（custom elements）。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017062201.png)

文章结尾还有一则 [React 培训消息](#support)（含 React Native），欢迎关注。

## 一、浏览器处理

我们一般都使用标准的 HTML 元素。

```html
<p>Hello World</p>
```

上面代码中，`<p>`就是标准的 HTML 元素。

如果使用非标准的自定义元素，会有什么结果？

```html
<greeting>Hello World</greeting>
```

上面代码中，`<greeting>`就是非标准元素，浏览器不认识它。这段代码的[运行结果](http://jsbin.com/rifozonomu/edit?html,output)是，浏览器照常显示`Hello World`，这说明浏览器并没有过滤这个元素。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017062202.png)

现在，为自定义元素加上样式。

```css
greeting {
  display: block;
  font-size: 36px;
  color: red;
}
```

[运行结果](http://jsbin.com/dawenun/edit?html,css,output)如下。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017062203.png)

接着，使用脚本操作这个元素。

```javascript
function customTag(tagName, fn){
  Array
    .from(document.getElementsByTagName(tagName))
    .forEach(fn);
}
 
function greetingHandler(element) {
  element.innerHTML = '你好，世界';
}   
 
customTag('greeting', greetingHandler);
```

[运行结果](http://jsbin.com/bisege/edit?html,js,output)如下。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017062204.png)

这说明，浏览器对待自定义元素，就像对待标准元素一样，只是没有默认的样式和行为。这种处理方式是写入[HTML5 标准](https://www.w3.org/TR/html5/infrastructure.html#extensibility-0)的。

> "User agents must treat elements and attributes that they do not understand as semantically neutral; leaving them in the DOM (for DOM processors), and styling them according to CSS (for CSS processors), but not inferring any meaning from them."

上面这段话的意思是，浏览器必须将自定义元素保留在 DOM 之中，但不会任何语义。除此之外，自定义元素与标准元素都一致。

事实上，浏览器提供了一个`HTMLUnknownElement`对象，所有自定义元素都是该对象的实例。
 
```javascript
var tabs = document.createElement('tabs');

tabs instanceof HTMLUnknownElement // true
tabs instanceof HTMLElement // true
```

上面代码中，`tabs`是一个自定义元素，同时继承了`HTMLUnknownElement`和`HTMLElement`接口。

## 二、HTML import

有了自定义元素，就可以写出语义性非常好的 HTML 代码。

```html
<share-buttons>
  <social-button type="weibo">
    <a href="...">微博</a>
  </social-button>
  <social-button type="weixin">
    <a href="...">微信</a>
  </social-button>
</share-buttons>
```

上面的代码，一眼就能看出语义。

如果将`<share-buttons>`元素的样式与脚本，封装在一个 HTML 文件`share-buttons.html`之中，这个元素就可以复用了。

使用的时候，先引入`share-buttons.html`。

```html
<link rel="import" href="share-buttons.html">
```

然后，就可以在网页中使用`<share-buttons>`了。

```html
<article>
  <h1>Title</h1>
  <share-buttons/>
  ... ...
</article>
```

HTML imports 的更多用法可以参考教程（[1](https://www.html5rocks.com/en/tutorials/webcomponents/imports/)，[2](https://www.webcomponents.org/community/articles/introduction-to-html-imports)）。目前只有 Chrome 浏览器支持这个语法。

## 三、Custom Elements 标准

HTML5 标准规定了自定义元素是合法的。然后，W3C 就为自定义元素制定了一个单独的 [Custom Elements 标准](https://w3c.github.io/webcomponents/spec/custom/#custom-elements)。

它与其他三个标准放在一起—— HTML Imports，HTML Template、Shadow DOM——统称为 [Web Components](https://www.w3.org/standards/techs/components#w3c_all) 规范。目前，这个规范只有 Chrome 浏览器[支持](http://caniuse.com/#feat=custom-elements)。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017062205.jpg)

Custom Elements 标准对自定义元素的名字做了[限制](https://developers.google.com/web/fundamentals/getting-started/primers/customelements)。

> “自定义元素的名字必须包含一个破折号（`-`）所以`<x-tags>`、`<my-element>`和`<my-awesome-app>`都是正确的名字，而`<tabs>`和`<foo_bar>`是不正确的。这样的限制使得 HTML 解析器可以分辨那些是标准元素，哪些是自定义元素。”

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017062206.jpg)

注意，一旦名字之中使用了破折号，自定义元素就不是`HTMLUnknownElement`的实例了。

```javascript
var xTabs = document.createElement('x-tabs');

xTabs instanceof HTMLUnknownElement // false
xTabs instanceof HTMLElement // true
```

Custom Elements 标准规定了，自定义元素可以使用 ES6 的[`class`语法](http://es6.ruanyifeng.com/#docs/class)定义。

```javascript
// 定义一个 <my-element></my-element>
class MyElement extends HTMLElement {...}
window.customElements.define('my-element', MyElement);
```

上面代码中，原生的`window.customElements`对象的`define`方法用来定义 Custom Element。该方法接受两个参数，第一个参数是自定义元素的名字，第二个参数是一个 ES6 的`class`。

这个`class`使用`get`和`set`方法定义 Custom Element 的某个属性。

```javascript
class MyElement extends HTMLElement {
  get content() {
    return this.getAttribute('content');
  }

  set content(val) {
    this.setAttribute('content', val);
  }
}
```

有了这个定义，网页之中就可以插入`<my-element>`了。

```html
<my-element content="Custom Element">
  Hello
</my-element>
```

处理脚本如下。

```javascript
function customTag(tagName, fn){
  Array
    .from(document.getElementsByTagName(tagName))
    .forEach(fn);
}
 
function myElementHandler(element) {
  element.textConent = element.content;
}

customTag('my-element', myElementHandler);
```

[运行结果](http://jsbin.com/filejeq/edit?html,js,output)如下。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017062207.png)

ES6 Class 的一个好处是，可以很容易地写出继承类。

```javascript
class MyNewElement extends MyElement {
  // ...
}

customElements.define('my-new-element', MyNewElement);
```

今天的教程就到这里，更多用法请参考谷歌的[官方教程](https://developers.google.com/web/fundamentals/getting-started/primers/customelements)。

## 四、参考链接

-  John Negoita, [Extending HTML by Creating Custom Tags](https://code.tutsplus.com/tutorials/extending-the-html-by-creating-custom-tags--cms-28622)
- StackOverflow, [Are custom elements valid HTML5?](https://stackoverflow.com/questions/9845011/are-custom-elements-valid-html5)
- Eric Bidelman, [Custom Elements v1: Reusable Web Components](https://developers.google.com/web/fundamentals/getting-started/primers/customelements)

（正文完）

==============================

<a id="support"></a>

下面是一则培训消息。

自从我写了[《React 技术栈系列教程》](http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html)以后，有两种反馈：一种是觉得内容不够完整深入，希望有更详细的介绍，另一种是要求补上 React Native。对此我也没办法，精力有限，无法持续投入，只能推荐大家自己去看官方文档。

昨天，[优达学城](http://cn.udacity.com/)的朋友联系我。他们与 [React Training](https://reacttraining.com/) 合作，正式推出了 [React 培训课程](http://cn.udacity.com/course/react-nanodegree--nd019/)，希望我帮忙推广。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017062101.png)

我听了很兴奋，因为 [React Training](https://reacttraining.com/) 是美国最专业的 React 培训机构，水平很高。几个讲课老师在 React 社区都非常有名，[React Router](https://github.com/rackt/react-router) 、[unpkg](https://unpkg.com/) 和 mustache.js 就是他们的作品。我相信，国内很难找到这样水平的老师和课程。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017062102.png)

实际上，这件事在美国也很受关注，[Techcrunch](https://techcrunch.com/2017/06/20/udacitys-latest-nanodegree-will-teach-react/) 进行了报道。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017062105.png)

整个课程与美国完全同步，一共持续4个月，分成三个环节。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017062103.png)

课程内容涉及整个 React 技术栈，PC 端和手机端并重。学完之后，可以获得纳米学位的证书。

课程价格是 3399 元人民币。如果是第一次购买优达学城的课程，可以使用优惠码`ruanyf`，便宜300元。注意，该课程不是零基础的，要求学习者已经掌握 JavaScript 基本语法，所以有报名审核环节。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017062104.png)

想学 React / React Native 的同学可以考虑一下，真的是很好的课程，点击[这里](https://cn.udacity.com/course/react-nanodegree--nd019)了解详情，报名到6月27日截止。

（完）