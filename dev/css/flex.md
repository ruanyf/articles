# flex布局

## 概述

flex布局是一个布局（layout）模式，意为弹性布局，可以很方便地指定布局。目前，大多数浏览器已经支持。

下面是一个div容器，里面有一个span元素。

```html
<div class="box">
  <span></span>
</div>
```

现在指定这个div容器，采用flex布局。

```css
.box{
  display: flex;
}
```

现在，这个容器就会块级元素，采用弹性布局。如果想采用行内的弹性布局，可以将display属性改为inline-flex。

```css
.box{
  display: inline-flex;
}
```

它被称为一个弹性容器（flex container），它的所有子元素（span元素）就自动成为容器成员，被称为弹性项目（flex item）。

## 基本概念

flex布局默认提供两根轴，一根是水平的主轴（main axis），另一根是垂直的副轴（cross axis）。主轴的开始位置叫做main start，结束位置叫做main end；副轴的开始位置叫做cross start，结束位置叫做cross end。

弹性项目在主抽占据的空间叫做main-size，在副轴占据的空间叫做cross size。

![](https://developer.mozilla.org/files/3739/flex_terms.png)

- flex-direction属性：定义主轴的方向，默认是水平（row）。
- justify-content属性：定义弹性项目如何沿主轴的水平线布局。
- align-items属性：定义弹性项目如何沿副轴的垂直线布局。
- align-self属性：定义单个弹性项目与副轴的对齐方式，会覆盖align-items属性的设置。

## 弹性容器

弹性容器的属性：margin, align-content, align-items, align-self, display, flex, flex-basis, flex-direction, flex-flow, flex-grow, flex-shrink, flex-wrap, justify-content, min-height, min-width, order。

### flex-direction属性

flex-direction属性决定主轴的方向。它可能有4个值：row（默认值）、row-reverse、column、column-reverse。

![](https://cdn.css-tricks.com/wp-content/uploads/2014/05/flex-direction1.svg)

```javascript
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

### flex-wrap属性

默认情况下，Flex项目都排在一条线上。flex-wrap属性定义，如果一条线排不下怎么办。

![](https://cdn.css-tricks.com/wp-content/uploads/2014/05/flex-wrap.svg)

```javascript
.container{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

它可以取三个值。

- nowrap（默认）：所有Flex-item排在一根线上。
- wrap：排成多行，每行都是从左到右。
- wrap-reverse：排成多行，每行都是从右到左

### justify-content属性

justify-content属性定义了Flex项目在主轴上的对齐方式。

![](https://cdn.css-tricks.com/wp-content/uploads/2013/04/justify-content.svg)

```javascript
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

它可能取5个值，具体对齐方式与轴方向有关。下面都以从左到齐的主轴为准。

- flex-start（默认值）：Flex项目向左对齐
- flex-end：项目向右对齐
- center： 居中。
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔都相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### align-items属性

align-items属性定义项目在副轴上如何对齐。

![](https://cdn.css-tricks.com/wp-content/uploads/2014/05/align-items.svg)

```javascript
.container {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

它可能取5个值。具体的对齐方式与副轴的方向有关，以下以从上到下的副轴为例。

- flex-start：对齐副轴的起始位置。
- flex-end：对齐副轴的结束位置。
- center：对齐副轴的中点。
- baseline: 所有项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目本身的高度没有设置或是auto，将伸展满整个容器的高度。

### align-content属性

align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

![](https://cdn.css-tricks.com/wp-content/uploads/2013/04/align-content.svg)

```css
.container {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

该属性可以取6个值。

- flex-start：轴线与副轴起始位置对齐。
- flex-end：与副轴终止位置对齐。
- center：与副轴中点对齐。
- space-between：与副轴两端对齐，轴线之间的间隔平均分布。
- space-around：轴线之间的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- stretch（默认值）：轴线占满整个副轴空间。

接着，指定容器中的元素，在主轴上水平居中（justify-content属性）。

```css
.first-face {
  display: flex;
  justify-content: center;
}
```

![](http://davidwalsh.name/demo/dicey-flexbox-images/face-1-2.png)

然后，指定在副轴上也居中（align-items属性）。

```css
.first-face {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

![](http://davidwalsh.name/demo/dicey-flexbox-images/face-1-3.png)

接下来，再看多个元素的情况。

```html
<div class="second-face">
  <span class="pip"></span>
  <span class="pip"></span>
</div>
```

```css
.second-face {
  display: flex;
}
```

![](http://davidwalsh.name/demo/dicey-flexbox-images/face-2-1.png)

然后，使用space-between属性，指定两端对齐。

```css
.second-face {
  display: flex;
  justify-content: space-between;
}
```

![](http://davidwalsh.name/demo/dicey-flexbox-images/face-2-2.png)

align-self属性可以指定某个成员在纵轴的下端。

```css
.second-face {
  display: flex;
  justify-content: space-between;
}

.second-face .pip:nth-of-type(2) {
  align-self: flex-end;
}
```

![](http://davidwalsh.name/demo/dicey-flexbox-images/face-2-3.png)

下面实现四角对齐。

```html
<div class="fourth-face">
  <div class="column">
    <span class="pip"></span>
    <span class="pip"></span>
  </div>
  <div class="column">
    <span class="pip"></span>
    <span class="pip"></span>
  </div>
</div>
```

```css
.fourth-face {
  display: flex;
  justify-content: space-between;
}

.fourth-face .column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

![](http://davidwalsh.name/demo/dicey-flexbox-images/face-4-3.png)

## Flex项目

### order属性

order属性控制Flex项目在容器里的出现顺序。

![](https://cdn.css-tricks.com/wp-content/uploads/2013/04/order-2.svg)

```css
.item {
  order: <integer>;
}
```

### flex-grow属性

flex-grow属性定义了Flex项目的放大比例，默认为0。如果所有项目的该属性都为0，则它们将等分空间。如果一个项目为2，其他项目都为1，则前者将占据2倍的空间。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

### flex-shrink属性

flex-shrink属性定义了项目的缩小比例，默认为1。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

### flex-basis属性

flex-basis属性定义了项目的默认大小。如果设为0，则宽度不随容器变化；如果设为auto，多余空间的分配取决于flex-grow的值。

### flex属性

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。

### align-self属性

align-self属性允许单个项目有不一样的对齐方式。

```javascript
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

## 浏览器前缀

（1）垂直居中

首先，指定flex容器。

```html

<div class="flexbox-container">
	<div>Blah blah</div>
	<div>Blah blah blah blah blah blah</div>
</div>

```

设置垂直置中。

```css

.flexbox-container {
	display: -ms-flex;
	display: -webkit-flex;
	display: flex;

	-ms-flex-align: center;
	-webkit-align-items: center;
	-webkit-box-align: center;

	align-items: center;
}

```

（2）两栏式布局

HTML代码。

```css
<div class="flexbox-container">
	<div><h3>Column 1</h3></div>
	<div><h3>Column 2</h3></div>
</div>
```

CSS代码。padding和margin都不属于这种情况。

```css
.flexbox-container {
	display: -ms-flex;
	display: -webkit-flex;
	display: flex;
}

.flexbox-container > div {
	width: 50%;
	padding: 10px;
}

.flexbox-container > div:first-child {
	margin-right: 20px;
}
```

## 参考链接

- [Getting Dicey With Flexbox](http://davidwalsh.name/flexbox-dice), by Landon Schropp
- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- Dimitar Stojanov, [A Visual Guide to CSS3 Flexbox Properties](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)
