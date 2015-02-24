# CSS的用法

## 选择器

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

## 属性

### filter

图片滤镜，支持grayscale, blur, sepia, saturate, opacity, brightness, contrast, hue-rotate, invert效果。

灰度效果。

```css

img.bw {
	filter: grayscale(1);
}

```

动画效果。

```css

img.bw {
	filter: grayscale(0);
}

img.bw.grey {
	filter: grayscale(1);
	transition-property: filter;
	transition-duration: 1s;	
}

```

其他例子。

```css

/* 模糊 */
.myElement {
	-webkit-filter: blur(2px);
}

/* 组合效果 */
.myElement {
	-webkit-filter: blur(2px) grayscale(.5) opacity(0.8);
}

```

### flex

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

### object-fit

定义内容如何适应容器的高和宽，比如不同大小的图片，如何放在同一个位置。

```css

img {
  height: 100px;
  width: 100px;
  object-fit: contain;
}

```

object-fit可能的值共有五个。

```css

object-fit: fill
object-fit: contain
object-fit: cover
object-fit: none
object-fit: scale-down

```

- contain：图片自动升缩，以固有的长宽比，完整显示在容器中。
- fill：图片自动填满容器，即使破坏原有的长宽比。
- cover：保留图像的长宽比，但会自动升缩以填满容器，长度或宽度中较小的一个会完全在容器中展示，较大的一个会溢出。
- none：完全忽视容器的大小，使用图片固有的长宽比。
- scale-down: none或者contain中导致图片尺寸较小的那个值。

cover表示自动将图像的中心点，放置到容器的中心点，同时根据容器的大小，截取自身的大小。

```css

img {
  object-fit: cover;
}

```

参考链接

- MDN, [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
- Chris Nager, [Center and crop images with a single line of CSS](https://medium.com/@chrisnager/center-and-crop-images-with-a-single-line-of-css-ad140d5b4a87)
- Chris Mills, [Exploring object-fit](https://hacks.mozilla.org/2015/02/exploring-object-fit/)

### object-position

object-position设置容器中的对象（通常是图片）的垂直和水平位置，与background-position设置背景图片的写法相同。

```css

img {
  height: 100px;
  width: 100px;
  object-fit: contain;
  object-position: top 70px;
}

```

### pointer-events

该属性定义当前图形对象会不会成为鼠标动作的目标。

```css

/* 图片将对鼠标行为无反应 */
img {
  pointer-events: none;
}

a[href="http://example.com"] {
  pointer-events: none;
}

``

一旦pointer-events设为none，就不会触发JavaScript事件。在该元素上点击，任何addEventListener添加的回调函数，都不会触发。

### text-overflow

该属性定义了文本超出容器宽度后，如何处理。如果将多余文字显示成三点的省略号，可以像下面这样设置。

```css
.ellipsis {
    overflow: hidden; 
    white-space: nowrap; 
    text-overflow: ellipsis;
}
```

上面代码第一行是隐藏溢出，第二行是防止断行，第三行是在行尾加上省略号。

### transition

```css

/* Format */
transition: property || duration || timing-function || delay

/* Various Examples */
transition: all 300ms ease 0;
transition: all 0.5s ease-in-out 0;
transition: background 300ms cubic-bezier(.61,-0.67,0,1.45) 0;
transition: opacity 100ms ease 0, background 200ms ease-in-out 0, transform 200ms ease-out 0;

/* Cross Browser Prefixes */
-webkit-transition: all 300ms ease 0;
-moz-transition: all 300ms ease 0;
-o-transition: all 300ms ease 0;
transition: all 300ms ease 0;

```

## 单位

### calc()

calc方法用于计算值。比如，每行放置4张图片，可以采用如下的代码。

```css

img {
  float: left;
  width: calc(25% - 20px);
  margin: 10px;
}

```

动态排列图片，可以配合media query。

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
