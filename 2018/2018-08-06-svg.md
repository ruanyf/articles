# SVG 图像入门教程

## 一、概述

SVG 是一种基于 XML 语法的图像格式，全称是可缩放矢量图（Scalable Vector Graphics）。其他图像格式都是基于像素的，SVG 则是属于对图像的数学描述，所以它本质上是文本文件，体积较小，且不管放大多少倍都不会失真。

![](https://www.wangbase.com/blogimg/asset/201808/bg2018080601.jpg)

SVG 文件可以直接插入网页，成为 DOM 的一部分，然后用 JavaScript 和 CSS 进行操作。

<blockquote><pre><code class="language-markup">
&lt;!DOCTYPE html>
&lt;html>
&lt;head>&lt;/head>
&lt;body>
&lt;svg
  id="mysvg"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 800 600"
  preserveAspectRatio="xMidYMid meet"
>
  &lt;circle id="mycircle" cx="400" cy="300" r="50" />
&lt;svg>
&lt;/body>
&lt;/html>
</code></pre></blockquote>

上面是 SVG 代码直接插入网页的例子。

SVG 代码也可以写在一个独立文件中，然后用`<img>`、`<object>`、`<embed>`、`<iframe>`等标签插入网页。

<blockquote><pre><code class="language-markup">
&lt;img src="circle.svg">
&lt;object id="object" data="circle.svg" type="image/svg+xml">&lt;/object>
&lt;embed id="embed" src="icon.svg" type="image/svg+xml">
&lt;iframe id="iframe" src="icon.svg">&lt;/iframe>
</code></pre></blockquote>

CSS 也可以使用 SVG 文件。

<blockquote><pre><code class="language-css">
.logo {
  background: url(icon.svg);
}
</code></pre></blockquote>

SVG 文件还可以转为 BASE64 编码，然后作为 Data URI 写入网页。

<blockquote><pre><code class="language-markup">
&lt;img src="data:image/svg+xml;base64,[data]">
</code></pre></blockquote>

## 二、语法

### 2.1 `<svg>`标签

SVG 代码都放在顶层标签`<svg>`之中。下面是一个例子。

<blockquote><pre><code class="language-markup">
&lt;svg width="100%" height="100%">
  &lt;circle id="mycircle" cx="50" cy="50" r="50" />
&lt;/svg>
</code></pre></blockquote>

`<svg>`的`width`属性和`height`属性，指定了 SVG 图像在 HTML 元素中所占据的宽度和高度。除了相对单位，也可以采用绝对单位（单位：像素）。如果不指定这两个属性，SVG 图像默认占满它所在的 HTML 元素。

如果只想展示 SVG 图像的一部分，就要指定`viewBox`属性。

<blockquote><pre><code class="language-markup">
&lt;svg width="100" height="100" viewBox="50 50 50 50">
  &lt;circle id="mycircle" cx="50" cy="50" r="50" />
&lt;/svg>
</code></pre></blockquote>

`<viewBox>`属性的值有四个数字，分别是左上角的横坐标和纵坐标、视口的宽度和高度。上面代码中，SVG 图像是100像素宽 x 100像素高，`viewBox`属性指定视口从`(50, 50)`这个点开始。所以，实际看到的是右下角的四分之一圆。

注意，视口必须适配所在的空间。上面代码中，视口的大小是 50 x 50，由于 SVG 图像的大小是 100 x 100，所以视口会放大去适配 SVG 图像的大小，即放大了四倍。

如果不指定`width`属性和`height`属性，只指定`viewBox`属性，则相当于只给定 SVG 图像的长宽比。

### 2.2 `<circle>`标签

`<circle>`标签代表圆形。

<blockquote><pre><code class="language-markup">
&lt;svg width="300" height="180">
  &lt;circle cx="30"  cy="50" r="25" />
  &lt;circle cx="90"  cy="50" r="25" class="red" />
  &lt;circle cx="150" cy="50" r="25" class="fancy" />
&lt;/svg>
</code></pre></blockquote>

上面的代码定义了三个圆。`<circle>`标签的`cx`、`cy`、`r`属性分别为横坐标、纵坐标和半径，单位为像素。坐标都是相对于`<svg>`画布的左上角原点。

`class`属性用来指定对应的 CSS 类。

<blockquote><pre><code class="language-css">
.red {
  fill: red;
}

.fancy {
  fill: none;
  stroke: black;
  stroke-width: 3pt;
}
</code></pre></blockquote>

SVG 的 CSS 属性与网页元素有所不同。

> - fill：填充色
> - stroke：描边色
> - stroke-width：边框宽度

### 2.3 `<line>`标签

`<line>`标签用来绘制直线。

<blockquote><pre><code class="language-markup">
&lt;svg width="300" height="180">
  &lt;line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0,0,0);stroke-width:5" />
&lt;/svg>
</code></pre></blockquote>

上面代码中，`<line>`标签的`x1`属性和`y1`属性，表示线段起点的横坐标和纵坐标；`x2`属性和`y2`属性，表示线段终点的横坐标和纵坐标；`style`属性表示线段的样式。

### 2.4 `<polyline>`标签

`<polyline>`标签用于绘制一根折线。

<blockquote><pre><code class="language-markup">
&lt;svg width="300" height="180">
  &lt;polyline points="3,3 30,28 3,53" fill="none" stroke="black" />
&lt;/svg>
</code></pre></blockquote>

`<polyline>`的`points`属性指定了每个端点的坐标，横坐标与纵坐标之间与逗号分隔，点与点之间用空格分隔。

### 2.5 `<rect>`标签

`<rect>`标签用于绘制矩形。

<blockquote><pre><code class="language-markup">
&lt;svg width="300" height="180">
  &lt;rect x="0" y="0" height="100" width="200" style="stroke: #70d5dd; fill: #dd524b" />
&lt;/svg>
</code></pre></blockquote>

`<rect>`的`x`属性和`y`属性，指定了矩形左上角端点的横坐标和纵坐标；`width`属性和`height`属性指定了矩形的宽度和高度（单位像素）。

### 2.6 `<ellipse>`标签

`<ellipse>`标签用于绘制椭圆。

<blockquote><pre><code class="language-markup">
&lt;svg width="300" height="180">
  &lt;ellipse cx="60" cy="60" ry="40" rx="20" stroke="black" stroke-width="5" fill="silver"/>
&lt;/svg>
</code></pre></blockquote>

`<ellipse>`的`cx`属性和`cy`属性，指定了椭圆中心的横坐标和纵坐标（单位像素）；`rx`属性和`ry`属性，指定了椭圆横向轴和纵向轴的半径（单位像素）。

### 2.7 `<polygon>`标签

`<polygon>`标签用于绘制多边形。

<blockquote><pre><code class="language-markup">
&lt;svg width="300" height="180">
  &lt;polygon fill="green" stroke="orange" stroke-width="1" points="0,0 100,0 100,100 0,100 0,0"/>
&lt;/svg>
</code></pre></blockquote>

`<polygon>`的`points`属性指定了每个端点的坐标，横坐标与纵坐标之间与逗号分隔，点与点之间用空格分隔。

### 2.8 `<path>`标签

`<path>`标签用于制路径。

<blockquote><pre><code class="language-markup">
&lt;svg width="300" height="180">
&lt;path d="
  M 18,3
  L 46,3
  L 46,40
  L 61,40
  L 32,68
  L 3,40
  L 18,40
  Z
">&lt;/path>
&lt;/svg>
</code></pre></blockquote>

`<path>`的`d`属性表示绘制顺序，它的值是一个长字符串，每个字母表示一个绘制动作，后面跟着坐标。

> - M：移动到（moveto）
> - L：画直线到（lineto）
> - Z：闭合路径

### 2.9 `<text>`标签

`<text>`标签用于绘制文本。

<blockquote><pre><code class="language-markup">
&lt;svg width="300" height="180">
  &lt;text x="50" y="25">Hello World&lt;/text>
&lt;/svg>
</code></pre></blockquote>

`<text>`的`x`属性和`y`属性，表示文本区块基线（baseline）起点的横坐标和纵坐标。文字的样式可以用`class`或`style`属性指定。

### 2.10 `<use>`标签

`<use>`标签用于复制一个形状。

<blockquote><pre><code class="language-markup">
&lt;svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
  &lt;circle id="myCircle" cx="5" cy="5" r="4"/>

  &lt;use href="#myCircle" x="10" y="0" fill="blue" />
  &lt;use href="#myCircle" x="20" y="0" fill="white" stroke="blue" />
&lt;/svg>
</code></pre></blockquote>

`<use>`的`href`属性指定所要复制的节点，`x`属性和`y`属性是`<use>`左上角的坐标。另外，还可以指定`width`和`height`坐标。

### 2.11 `<g>`标签

`<g>`标签用于将多个形状组成一个组（group），方便复用。

<blockquote><pre><code class="language-markup">
&lt;svg width="300" height="100">
  &lt;g id="myCircle">
    &lt;text x="25" y="20">圆形&lt;/text>
    &lt;circle cx="50" cy="50" r="20"/>
  &lt;/g>

  &lt;use href="#myCircle" x="100" y="0" fill="blue" />
  &lt;use href="#myCircle" x="200" y="0" fill="white" stroke="blue" />
&lt;/svg>
</code></pre></blockquote>

### 2.12 `<defs>`标签

`<defs>`标签用于自定义形状，它内部的代码不会显示，仅供引用。

<blockquote><pre><code class="language-markup">
&lt;svg width="300" height="100">
  &lt;defs>
    &lt;g id="myCircle">
      &lt;text x="25" y="20">圆形&lt;/text>
      &lt;circle cx="50" cy="50" r="20"/>
    &lt;/g>
  &lt;/defs>

  &lt;use href="#myCircle" x="0" y="0" />
  &lt;use href="#myCircle" x="100" y="0" fill="blue" />
  &lt;use href="#myCircle" x="200" y="0" fill="white" stroke="blue" />
&lt;/svg>
</code></pre></blockquote>

### 2.13 `<pattern>`标签

`<pattern>`标签用于自定义一个形状，该形状可以被引用来平铺一个区域。

<blockquote><pre><code class="language-markup">
&lt;svg width="500" height="500">
  &lt;defs>
    &lt;pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      &lt;circle fill="#bee9e8" cx="50" cy="50" r="35" />
    &lt;/pattern>
  &lt;/defs>
  &lt;rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
&lt;/svg>
</code></pre></blockquote>

上面代码中，`<pattern>`标签将一个圆形定义为`dots`模式。`patternUnits="userSpaceOnUse"`表示`<pattern>`的宽度和长度是实际的像素值。然后，指定这个模式去填充下面的矩形。

### 2.14 `<image>`标签

`<image>`标签用于插入图片文件。

<blockquote><pre><code class="language-markup">
&lt;svg viewBox="0 0 100 100" width="100" height="100">
  &lt;image xlink:href="path/to/image.jpg"
    width="50%" height="50%"/>
&lt;/svg>
</code></pre></blockquote>

上面代码中，`<image>`的`xlink:href`属性表示图像的来源。

### 2.15 `<animate>`标签

`<animate>`标签用于产生动画效果。

<blockquote><pre><code class="language-markup">
&lt;svg width="500px" height="500px">
  &lt;rect x="0" y="0" width="100" height="100" fill="#feac5e">
    &lt;animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" />
  &lt;/rect>
&lt;/svg>
</code></pre></blockquote>

上面代码中，矩形会不断移动，产生动画效果。

`<animate>`的属性含义如下。

> - attributeName：发生动画效果的属性名。
> - from：单次动画的初始值。
> - to：单次动画的结束值。
> - dur：单次动画的持续时间。
> - repeatCount：动画的循环模式。

可以在多个属性上面定义动画。

<blockquote><pre><code class="language-markup">
&lt;animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" />
&lt;animate attributeName="width" to="500" dur="2s" repeatCount="indefinite" />
</code></pre></blockquote>

### 2.16 `<animateTransform>`标签

`<animate>`标签对 CSS 的`transform`属性不起作用，如果需要变形，就要使用`<animateTransform>`标签。

<blockquote><pre><code class="language-markup">
&lt;svg width="500px" height="500px">
  &lt;rect x="250" y="250" width="50" height="50" fill="#4bc0c8">
    &lt;animateTransform attributeName="transform" type="rotate" begin="0s" dur="10s" from="0 200 200" to="360 400 400" repeatCount="indefinite" />
  &lt;/rect>
&lt;/svg>
</code></pre></blockquote>

上面代码中，`<animateTransform>`的效果为旋转（`rotate`），这时`from`和`to`属性值有三个数字，第一个数字是角度值，第二个值和第三个值是旋转中心的坐标。`from="0 200 200"`表示开始时，角度为0，围绕`(200, 200)`开始旋转；`to="360 400 400"`表示结束时，角度为360，围绕`(400, 400)`旋转。

## 三、JavaScript 操作

### 3.1 DOM 操作

如果 SVG 代码直接写在 HTML 网页之中，它就成为网页 DOM 的一部分，可以直接用 DOM 操作。

<blockquote><pre><code class="language-markup">
&lt;svg
  id="mysvg"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 800 600"
  preserveAspectRatio="xMidYMid meet"
>
  &lt;circle id="mycircle" cx="400" cy="300" r="50" />
&lt;svg>
</code></pre></blockquote>

上面代码插入网页之后，就可以用 CSS 定制样式。

<blockquote><pre><code class="language-css">
circle {
  stroke-width: 5;
  stroke: #f00;
  fill: #ff0;
}

circle:hover {
  stroke: #090;
  fill: #fff;
}
</code></pre></blockquote>

然后，可以用 JavaScript 代码操作 SVG。

<blockquote><pre><code class="language-javascript">
var mycircle = document.getElementById('mycircle');

mycircle.addEventListener('click', function(e) {
  console.log('circle clicked - enlarging');
  mycircle.setAttribute('r', 60);
}, false);
</code></pre></blockquote>

上面代码指定，如果点击图形，就改写`circle`元素的`r`属性。

### 3.2 获取 SVG DOM

使用`<object>`、`<iframe>`、`<embed>`标签插入 SVG 文件，可以获取 SVG DOM。

<blockquote><pre><code class="language-javascript">
var svgObject = document.getElementById('object').contentDocument;
var svgIframe = document.getElementById('iframe').contentDocument;
var svgEmbed = document.getElementById('embed').getSVGDocument();
</code></pre></blockquote>

注意，如果使用`<img>`标签插入 SVG 文件，就无法获取 SVG DOM。

### 3.3 读取 SVG 源码

由于 SVG 文件就是一段 XML 文本，因此可以通过读取 XML 代码的方式，读取 SVG 源码。

<blockquote><pre><code class="language-markup">
&lt;div id="svg-container">
  &lt;svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve" width="500" height="440"
  >
    &lt;!-- svg code -->
  &lt;/svg>
&lt;/div>
</code></pre></blockquote>

使用`XMLSerializer`实例的`serializeToString()`方法，获取 SVG 元素的代码。

<blockquote><pre><code class="language-javascript">
var svgString = new XMLSerializer()
  .serializeToString(document.querySelector('svg'));
</code></pre></blockquote>

### 3.4 SVG 图像转为 Canvas 图像

首先，需要新建一个`Image`对象，将 SVG 图像指定到该`Image`对象的`src`属性。

<blockquote><pre><code class="language-javascript">
var img = new Image();
var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});

var DOMURL = self.URL || self.webkitURL || self;
var url = DOMURL.createObjectURL(svg);

img.src = url;
</code></pre></blockquote>

然后，当图像加载完成后，再将它绘制到`<canvas>`元素。

<blockquote><pre><code class="language-javascript">
img.onload = function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
};
</code></pre></blockquote>

## 四、实例：折线图

下面将一张数据表格画成折线图。

<blockquote><pre><code class="language-markup">
Date |Amount
-----|------
2014-01-01 | $10
2014-02-01 | $20
2014-03-01 | $40
2014-04-01 | $80
</code></pre></blockquote>

上面的图形，可以画成一个坐标系，`Date`作为横轴，`Amount`作为纵轴，四行数据画成一个数据点。

<blockquote><pre><code class="language-markup">
&lt;svg width="350" height="160">
  &lt;g class="layer" transform="translate(60,10)">
    &lt;circle r="5" cx="0"   cy="105" />
    &lt;circle r="5" cx="90"  cy="90"  />
    &lt;circle r="5" cx="180" cy="60"  />
    &lt;circle r="5" cx="270" cy="0"   />

    &lt;g class="y axis">
      &lt;line x1="0" y1="0" x2="0" y2="120" />
      &lt;text x="-40" y="105" dy="5">$10&lt;/text>
      &lt;text x="-40" y="0"   dy="5">$80&lt;/text>
    &lt;/g>
    &lt;g class="x axis" transform="translate(0, 120)">
      &lt;line x1="0" y1="0" x2="270" y2="0" />
      &lt;text x="-30"   y="20">January 2014&lt;/text>
      &lt;text x="240" y="20">April&lt;/text>
    &lt;/g>
  &lt;/g>
&lt;/svg>
</code></pre></blockquote>

## 五、参考链接

- Jon McPartland, [An introduction to SVG animation](http://bigbitecreative.com/introduction-svg-animation/)
- Alexander Goedde, [SVG - Super Vector Graphics](http://tavendo.com/blog/post/super-vector-graphics/)
- Joseph Wegner, [Learning SVG](http://flippinawesome.org/2014/02/03/learning-svg/)
- biovisualize, [Direct svg to canvas to png conversion](http://bl.ocks.org/biovisualize/8187844)
- Tyler Sticka, [Cropping Image Thumbnails with SVG](https://cloudfour.com/thinks/cropping-image-thumbnails-with-svg/)
- Adi Purdila, [How to Create a Loader Icon With SVG Animations](https://webdesign.tutsplus.com/tutorials/how-to-create-a-loader-icon-with-svg-animations--cms-31542)

（完）