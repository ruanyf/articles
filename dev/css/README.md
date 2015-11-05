# CSS的用法

## 选择器

### BEM命名法

BEM是Block（区块）、Element（元素）、Modifier（修饰符）三者的简称。区块是顶级组件的抽象，元素是组件的组成部分，修饰符是组件或元素的状态。区块与元素之间用两个下划线连接，元素与修饰符之间用两个连词线连接。

```css
/* Block component */
.btn {}

/* Element that depends upon the block */
.btn__price {}

/* Modifier that changes the style of the block */
.btn--orange {}
.btn--big {}
```

对应的HTML代码结构如下。

```html
<a class="btn btn--big btn--orange" href="http://css-tricks.com">
  <span class="btn__price">$9.99</span>
  <span class="btn__text">Subscribe</span>
</a>
```

BEM的重要特点就是CSS是扁平式的，不存在元素嵌套。

### target

target选择器用来匹配当前hash。

产生动画效果。

```css

#further-resources:target {
  animation: highlight .8s ease-out;
}

@keyframes highlight {
  0% { background-color: #FFFF66; }
  100% { background-color: #FFFFFF; }
}

```

弹出效果。

```css

#search-overlay {
  position: fixed;
  top: 1em;
  bottom: 1em;
  right: 1em;
  left: 1em;
  /* … */
  opacity: 0;
  transition: opacity .3s ease-in-out;
  pointer-events: none;
}

#search-overlay:target {
  opacity: 1;
  pointer-events: auto;
  transition: opacity .3s ease-in-out;
}

```

导航栏效果

```css

.main-nav {
  position: fixed;
  top: 0;
  width: 0;
  height: 100%;
  background: #3B3B3B;
  overflow-y: auto;
  transition: width 0.3s ease;
}

#main-nav:target {
  width: 20%;
}

#main-nav:target + .page-wrap {
  width: 80%;
  .open-menu {
     display: none;
  }
  .close-menu {
     display: block;
  }
  .main-header {
    width: 80%;
    left: 20%;
  }
}

```

### 伪元素（Pseudo-element）

伪元素（::before或者::after）是每个元素额外多出来的DOM节点。


```css
.pebble::before {
  ...
}
.pebble::after {
  ...
}

```

伪元素使用两个双引号标识，如果希望IE8支持，也可以使用单引号。

```css

button::after {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  background: linear-gradient(to bottom, rgba(229, 172, 142, 0.1), rgba(255,255,255,0.5) 50%, rgba(229, 172, 142, 0.1));
  transform: rotateZ(60deg) translate(-5em, 7.5em);
}

button:hover::after {
  animation: sheen 1s forwards;
}

@keyframes sheen {
  100% {
    transform: rotateZ(60deg) translate(1em, -9em);
  }
}

```

参考链接

- Donovan Hutchinson, [Animating pseudo-elements](http://cssanimation.rocks/post/pseudo-elements/)

### 伪类

- :empty：没有任何子元素
- :in-range：针对有range属性的input
- :out-of-range：针对有range属性的input
- :optional：没有required属性的input元素
- :required
- :disabled
- :fullscreen
- :not()

## 操作

### 垂直置中

（1）方法一

原理：子元素的 top, right, bottom, left, margin, and padding属性，针对的是父元素的维度；transform针对的子元素本身的维度。

父元素、子元素需有明确高度，不能是auto。

```css

.children{
	background: #ffdb4c;
	height: 300px;
	position: relative;
	top: 50%;
	transform: translateY(-50%);
}

```

（2）方法二

```css

.parent { position: relative; }

.child {
    position: absolute;

    left: 50%;
    top: 50%;

    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

```

（3）方法三

```css

.parent { display: table; }

.child {
    display: table-cell;
    vertical-align: middle;
}

```

（5）行内置中

```css

.parent { line-height: 500px; }

.child {
    display: inline-block;
    vertical-align: middle;
}

```

（6）方法四（只对图片有效）

```css

.thumb {
  background-image: url(my-img.jpg);
  background-position: center;
  /* is this supported by IE8? I don't know */
  background-size: cover;

  height: 0;
  overflow: hidden;
  padding-bottom: 50%;
  width: 50%;
}

```

（7）方法五

```css

.children {
  margin-top: calc(50% - 12.5%);
}

```

（7）参考链接

- [Alignment and sizing in CSS](https://timseverien.com/articles/snippets/136-alignment-sizing-css/)

### 清理浮动

```css

.clearfix:after{
  visibility:hidden;
  display:block;
  font6size:0;
  content:" ";
  clear:both;
  height:0;
}

.clearfix{
  zoom:1; /* for IE6 IE7 */
}

```

### 动画

定义动画。

```css

keyframes rotation {
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(450deg);
  }
}

```

将所定义的动画添加到指定元素。（[Demo](http://demo.hongkiat.com/css3-animation-steps/)）

```css
.second {
  animation: rotation 60s steps(60) infinite;
  transform-origin: 100% 50%;
}
```

## 命令

### media

media命令规定CSS规则生效的媒介。

media命令的一种用法是，为不同的设备指定不同的背景图片。

```css
/* default is desktop image */
.someElement { background-image: url(sunset.jpg); }

@media only screen and (max-width : 1024px) {
  .someElement { background-image: url(sunset-small.jpg); }
}
```

## 单位

### calc()

calc方法用于计算值，常用于两种不同的单位之间的计算（比如百分比和绝对长度）。

实例1。每行放置4张图片，可以采用如下的代码。

```css
img {
  float: left;
  width: calc(25% - 20px);
  margin: 10px;
}
```

实例2。动态排列图片，可以配合media query。

```css

img {
  float: left;
  margin: 10px;
  width: calc(100% * 1 / 4 - 20px);
}

@media (max-width: 900px) {
  img {
    width: calc(100% * 1 / 3 - 20px);
  }
}

@media (max-width: 600px) {
  img {
    width: calc(100% * 1 / 2 - 20px);
  }
}

@media (max-width: 400px) {
  img {
    width: calc(100% - 20px);
  }
}

```

### attr()

attr()用于读取网页元素的属性值。

```css
div[data-line]:after { 
	content: "[line " attr(data-line) "]"; 
}
```
