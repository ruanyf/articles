# flex布局

网页布局（layout）是CSS的一个重点应用。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071001.gif)

传统的布局有下面几种。

- display: block;
- display: inline;
- display: list-item;
- display: table;

[display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)属性搭配[position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)属性和[float](https://developer.mozilla.org/en-US/docs/Web/CSS/float)属性，是最常见的布局解决方案。

但是，这个方案基于[盒状模型](https://developer.mozilla.org/en-US/docs/Web/CSS/box_model)，对于那些特殊位置的布局非常不方便。比如，[垂直居中](https://css-tricks.com/centering-css-complete-guide/)就很不容易实现，代码好像一种破解，而不是正常的解决。

```css
.element {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071002.png)

2009年，W3C提出了一种新的方案——Flex布局，用来简便地、完整地、响应式地实现各种页面布局。经过5年多的发展，Flex布局几乎得到了所有浏览器的支持。这意味着，你现在就能很安全地使用这项功能。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071003.jpg)

可以毫无疑问地说，Flex布局是未来的首选方案。本文介绍它的语法，主要是翻译和参考了下面两篇文章：[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)和[A Visual Guide to CSS3 Flexbox Properties](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)。

## 一、Flex布局是什么？

Flex是flexible box的缩写，意为弹性的盒状布局，中文可以译为“弹性布局”。它的设计目的是为盒状模型提供最大的灵活性，可以在不知道容器大小或者容器大小可变的情况下，指定布局方式。

任何一个容器都可以指定为Flex布局。

```css
.box{
  display: flex;
}
```

行内元素也可以使用Flex布局。

```css
.box{
  display: inline-flex;
}
```

Webkit内核的浏览器，必须加上-webkit前缀。

```css
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。

## 二、基本概念

采用Flex布局的元素，称为Flex容器（flex container），简称“容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称“项目”。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列，在主轴占据的空间叫做main size，在交叉轴占据的空间叫做cross size。

## 三、容器的属性

以下6个属性设置在容器上。

> - flex-direction
> - flex-wrap
> - flex-flow
> - justify-content
> - align-items
> - align-content

### 3.1 flex-direction属性

`flex-direction`属性决定主轴的方向（即项目的排列方向）。

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071005.png)

它可能有4个值。

- `row`（默认值）：主轴为水平方向，起点在左端。
- `row-reverse`：主轴为水平方向，起点在右端。
- `column`：主轴为垂直方向，起点在上沿。
- `column-reverse`：主轴为垂直方向，起点在下沿。

### 3.2 flex-wrap属性

默认情况下，项目都排在一条线（又称“轴线”）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071006.png)

```javascript
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

它可能取三个值。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071007.png)

（1）`nowrap`（默认）：不换行。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071008.jpg)

（2）`wrap`：换行，第一行在上方。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071009.jpg)

（3）`wrap-reverse`：换行，第一行在下方。

### 3.3 flex-flow

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

### 3.4 justify-content属性

`justify-content`属性定义了项目在主轴上的对齐方式。

```javascript
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071010.png)

它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。

- `flex-start`（默认值）：左对齐
- `flex-end`：右对齐
- `center`： 居中
- `space-between`：两端对齐，项目之间的间隔都相等，项目与边框没有间隔。
- `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### 3.5 align-items属性

`align-items`属性定义项目在交叉轴上如何对齐。

```javascript
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png)

它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

- `flex-start`：交叉轴的起点对齐。
- `flex-end`：交叉轴的终点对齐。
- `center`：交叉轴的中点对齐。
- `baseline`: 项目的第一行文字的基线对齐。
- `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

### 3.6 align-content属性

`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png)

该属性可能取6个值。

> - `flex-start`：与交叉轴的起点对齐。
> - `flex-end`：与交叉轴的终点对齐。
> - `center`：与交叉轴的中点对齐。
> - `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
> - `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
> - `stretch`（默认值）：轴线占满整个交叉轴。

### 四、容器的属性

以下6个属性设置在项目上。

- `order`
- `flex-grow`
- `flex-shrink`
- `flex-basis`
- `flex`
- `align-self`

### 4.1 order属性

项目在主轴的排列顺序，默认是其出现的顺序。`order`属性可以改变这一点，让后面出现的项目，排到前面去。

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为`0`。

```css
.item {
  order: <integer>;
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071013.png)

### 4.2 flex-grow属性

`flex-grow`属性定义项目的放大比例，默认为0，即如果主轴存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071014.png)

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项目多一倍。

### 4.3 flex-shrink属性

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071015.jpg)

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

### 4.4 flex-basis属性

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size），即项目本身的尺寸。浏览器根据这个属性，计算主轴是否有剩余空间。它的默认值为`auto`，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟`width`或`height`属性一样的值（比如350px、20%、5em等等），则项目将占据固定空间。

### 4.5 flex属性

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：`auto` (代表`1 1 auto`) 和 none (代表`0 0 auto`)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### 4.6 align-self属性

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

```javascript
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071016.png)

该属性可能取6个值，除了`auto`，其他都与`align-items`属性完全一致。

（完）

# Flex布局实例教程

[上一篇文章](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)，介绍了Flex布局的语法。

今天介绍，常见布局的Flex写法。你会看到，不管是什么布局，Flex往往都可以几行命令搞定。

下面的内容，我只列出代码，详细的语法解释请查阅[《Flex布局语法教程》](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)。

我主要参考了[Landon Schropp](http://davidwalsh.name/flexbox-dice)的文章和[Solved by Flexbox](http://philipwalton.github.io/solved-by-flexbox/)。

## 一、骰子的布局

如果不加说明，本节的HTML模板一律如下。

```html
<div class="box">
  <span class="item"></span>
</div>
```

上面代码中，div元素是Flex容器，span元素是Flex项目。如果有多个项目，就要添加多个span元素，以此类推。

### 1.1 单项目：首行左对齐

Flex布局默认就是首行左对齐，所以一行代码就够了。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071301.png)

```css
.box {
  display: flex;
}
```

### 1.2 单项目：首行居中对齐

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071302.png)

```css
.box {
  display: flex;
  justify-content: center;
}
```

### 1.3 单项目：首行右对齐

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071303.png)

```css
.box {
  display: flex;
  justify-content: flex-end;
}
```

### 1.4 单项目：中行左对齐

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071304.png)

```css
.box {
  display: flex;
  align-items: center;
}
```

### 1.5 单项目：垂直居中对齐

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071305.png)

```css
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 1.6 单项目：尾行居中对齐

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071306.png)

```css
.box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
```

### 1.7 单项目：尾行右对齐

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071307.png)

```css
.box {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
```

### 1.8 双项目：首行两端对齐

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071308.png)

```css
.box {
  display: flex;
  justify-content: space-between;
}
```

### 1.9 双项目：首列两端对齐

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071309.png)

```css
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

### 1.10 双项目：中列两端对齐

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071310.png)

```css
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
```

### 1.11 双项目：尾列两端对齐

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071311.png)

```css
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
```

### 1.12 双项目：首行左对齐，中行居中对齐

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071312.png)

```css
.box {
  display: flex;
}

.item:nth-child(2) {
  align-self: center;
}
```

### 1.13 双项目：首行左对齐，尾行右对齐

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071313.png)

```css
.box {
  display: flex;
  justify-content: space-between;
}

.item:nth-child(2) {
  align-self: flex-end;
}
```

### 1.14 三项目：对角线布局

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071314.png)

```css
.box {
  display: flex;
}

.item:nth-child(2) {
  align-self: center;
}

.item:nth-child(3) {
  align-self: flex-end;
}
```

### 1.15 四项目：首行排满，尾行右对齐

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071315.png)

```css
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-content: space-between;
}
```

### 1.16 四项目：四角对齐

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071316.png)

HTML代码如下。

```html
<div class="box">
  <div class="column">
    <span class="item"></span>
    <span class="item"></span>
  </div>
  <div class="column">
    <span class="item"></span>
    <span class="item"></span>
  </div>
</div>
```

CSS代码如下。

```css
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.column {
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}
```

### 1.17 六项目：首行排满，尾行排满

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071317.png)

```css
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
```

### 1.18 六项目：首列排满，尾列排满

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071318.png)

```css
.box {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-between;
}
```

### 1.19 六项目：首行两端对齐，中行居中，尾行排满

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071319.png)

HTML代码如下。

```html
<div class="box">
  <div class="row">
    <span class="item"></span>
    <span class="item"></span>
    <span class="item"></span>
  </div>
  <div class="row">
    <span class="item"></span>
  </div>
  <div class="row">
     <span class="item"></span>
     <span class="item"></span>
  </div>
</div>
```

CSS代码如下。

```css
.box {
  display: flex;
  flex-wrap: wrap;
}

.row{
  flex-basis: 100%;
  display:flex;
}

.row:nth-child(2){
  justify-content: center;
}

.row:nth-child(3){
  justify-content: space-between;
}
```

### 1.20 九项目

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071320.png)

```css
.box {
  display: flex;
  flex-wrap: wrap;
}
```

## 二、网格布局

### 2.1 基本网格布局

容器平均分配空间。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071321.png)

HTML代码如下。

```html
<div class="Grid">
  <div class="Grid-cell">…</div>
  <div class="Grid-cell">…</div>
  <div class="Grid-cell">…</div>
</div>
```

CSS代码如下。

```css
.Grid {
  display: flex;
}

.Grid-cell {
  flex: 1;
}
```

上面这样的设置，不管父容器之中有多少个项目，都会平分宽度。

遇到小屏幕时，可以使用 media query，让项目占满一行。

```css
@media (max-width: 400px) {
  .flex-grid {
    display: block;
  }
}
```

网格之间的间隔，可以像下面这样设置。

```css
.flex-grid-thirds {
  display: flex;
  justify-content: space-between;
}
.flex-grid-thirds .col {
  width: 32%;
}
```

### 2.2 百分比布局

某项目占据固定的百分比，其余项目平均分配空间。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071322.png)

HTML代码如下。

```html
<div class="Grid">
  <div class="Grid-cell u-1of4">…</div>
  <div class="Grid-cell">…</div>
  <div class="Grid-cell u-1of3">…</div>
</div>
```

```css
.Grid {
  display: flex;
}

.Grid-cell {
  flex: 1;
}

.Grid-cell.u-full {
  flex: 0 0 100%;
}

.Grid-cell.u-1of2 {
  flex: 0 0 50%;
}

.Grid-cell.u-1of3 {
  flex: 0 0 33.3333%;
}

.Grid-cell.u-1of4 {
  flex: 0 0 25%;
}
```

## 三、圣杯布局

[圣杯布局](https://en.wikipedia.org/wiki/Holy_Grail_(web_design))（Holy Grail Layout）指的是一种最常见的网站布局。页面从上到下，分成三个部分：头部（header），躯干（body），尾部（footer）。其中躯干又水平分成三栏，从左到右为：导航、主栏、副栏。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071323.png)

HTML代码如下。

```html
<body class="HolyGrail">
  <header>…</header>
  <div class="HolyGrail-body">
    <main class="HolyGrail-content">…</main>
    <nav class="HolyGrail-nav">…</nav>
    <aside class="HolyGrail-ads">…</aside>
  </div>
  <footer>…</footer>
</body>
```

CSS代码如下。

```css
.HolyGrail {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

header,
footer {
  flex: 1;
}

.HolyGrail-body {
  display: flex;
  flex: 1;
}

.HolyGrail-content {
  flex: 1;
}

.HolyGrail-nav, .HolyGrail-ads {
  /* 两个边栏的宽度设为12em */
  flex: 0 0 12em;
}

.HolyGrail-nav {
  /* 导航放到最左边 */
  order: -1;
}
```

如果是小屏幕，躯干的三栏改为垂直分布。

```css
@media (max-width: 768px) {
  .HolyGrail-body {
    flex-direction: column;
    flex: 1;
  }
  .HolyGrail-nav,
  .HolyGrail-ads,
  .HolyGrail-content {
    flex: auto;
  }
}
```

## 四、输入框的布局

常常需要在输入框的前方添加提示，后方添加按钮。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071324.png)

HTML代码如下。

```html
<div class="InputAddOn">
  <span class="InputAddOn-item">…</span>
  <input class="InputAddOn-field">
  <button class="InputAddOn-item">…</button>
</div>
```

CSS代码如下。

```css
.InputAddOn {
  display: flex;
}

.InputAddOn-field {
  flex: 1;
}
```

## 五、悬挂式布局

有时，主栏的左侧或右侧，需要添加一个图片栏。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071325.png)

HTML代码如下。

```html
<div class="Media">
  <img class="Media-figure" src="" alt="">
  <p class="Media-body">…</p>
</div>
```

CSS代码如下。

```css
.Media {
  display: flex;
  align-items: flex-start;
}

.Media-figure {
  margin-right: 1em;
}

.Media-body {
  flex: 1;
}
```

### 六、固定的底栏

有时，页面内容太少，无法占满一屏的高度，底栏就会抬高到页面的中间。

这时可以采用Flex布局，让底栏总是出现在页面的底部。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071326.png)

HTML代码如下。

```html
<body class="Site">
  <header>…</header>
  <main class="Site-content">…</main>
  <footer>…</footer>
</body>
```

CSS代码如下。

```css
.Site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.Site-content {
  flex: 1;
}
```

（完）

## 参考链接

- [Getting Dicey With Flexbox](http://davidwalsh.name/flexbox-dice), by Landon Schropp
- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- Dimitar Stojanov, [A Visual Guide to CSS3 Flexbox Properties](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)
