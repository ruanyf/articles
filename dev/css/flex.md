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

可以毫无疑问地说，Flex布局是未来的首选方案。本文介绍它的语法，主要是翻译和参考了下面两篇文章：[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)和[A Visual Guide to CSS3 Flexbox Properties](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)。另外，我的下一篇文章，会介绍一些常见布局的Flex写法。

## 一、Flex布局是什么？

Flex是flexible box的缩写，意为弹性的盒状布局，中文可以译为“弹性布局”。它的设计目的是为盒状模型提供最大的灵活性。

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

flex-direction属性决定主轴的方向（即项目的排列方向）。

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071005.png)

它可能有4个值。

- row（默认值）：主轴为水平方向，起点在左端。
- row-reverse：主轴为水平方向，起点在右端。
- column：主轴为垂直方向，起点在上沿。
- column-reverse：主轴为垂直方向，起点在下沿。

### 3.2 flex-wrap属性

默认情况下，项目都排在一条线（又称“轴线”）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071006.png)

```javascript
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

它可能取三个值。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071007.png)

（1）nowrap（默认）：不换行。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071008.jpg)

（2）wrap：换行，第一行在上方。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071009.jpg)

（3）wrap-reverse：换行，第一行在下方。

### 3.3 flex-flow

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

### 3.4 justify-content属性

justify-content属性定义了项目在主轴上的对齐方式。

```javascript
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071010.png)

它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到齐。

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### 3.5 align-items属性

align-items属性定义项目在交叉轴上如何对齐。

```javascript
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png)

它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

- flex-start：交叉轴的起点对齐。
- flex-end：交叉轴的终点对齐。
- center：交叉轴的中点对齐。
- baseline: 项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

### 3.6 align-content属性

align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png)

该属性可能取6个值。

> - flex-start：与交叉轴的起点对齐。
> - flex-end：与交叉轴的终点对齐。
> - center：与交叉轴的中点对齐。
> - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
> - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
> - stretch（默认值）：轴线占满整个交叉轴。

### 四、容器的属性

以下6个属性设置在项目上。

- order
- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self

### 4.1 order属性

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```css
.item {
  order: <integer>;
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071013.png)

### 4.2 flex-grow属性

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071014.png)

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

### 4.3 flex-shrink属性

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071015.jpg)

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

### 4.4 flex-basis属性

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

### 4.5 flex属性

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### 4.6 align-self属性

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

```javascript
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071016.png)

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

（完）

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
