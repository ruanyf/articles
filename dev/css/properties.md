# CSS 属性

## background-blend-mode

background-blend-mode属性指定背景的颜色混合模式，共有16个值可取：normal（默认值，即不混合）, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color and luminosity（显示单色效果）。

可以显示多张背景图片的混合，或者背景图片与背景色的混合。

```javascript
  background-image: url(...g);
  background-color: #51B7D3;
  background-blend-mode: luminosity;
```

## background-image

`background`属性可以同时指定背景图和背景颜色。

```css
body {
  background: url(sweettexture.jpg) blue;
}
```

## background-position

`background-position`指定背景图的位置。

```css
background-position: 100px 5px;
```

位置属性可以指定关键字。

- top
- right
- bottom
- left
- center

## background-blend-mode

`background-blend-mode`用于指定两种颜色混合的方式。

```css
div {
  background: url(img/pattern.png), url(img/jellyfish.jpg), #f07e32;
  background-blend-mode: screen;
}
```

Demo：http://codepen.io/tutsplus/live/wMvoyj

教程：http://webdesign.tutsplus.com/tutorials/blending-modes-in-css-color-theory-and-practical-application--cms-25201

## border-image

在边框上显示图像。

## content

指定伪元素的内容。

```css
.myDiv:after {
  content: "I am hardcoded text from the *content* property";
}

div[data-line]:after {
  content: attr(data-line); /* 属性名没有引号 */
}

div[data-line]:after {
  content: "[line " attr(data-line) "]";
}

```

## counter

counter用来实现计数器。

```html
<ol class="list">
    <li>a</li>
    <li>b</li>
    <li>c</li>
</ol>
```

`li`元素前面添加计数器的代码如下。

```css
.list {
    counter-reset: i; //reset conunter
}
.list > li {
    counter-increment: i; //counter ID
}
.list li:after {
    content: "[" counter(i) "]"; //print the result
}
```

下面是一个高级用法的例子。

```html
<div class="numbers">  
  <input id="one" type="checkbox"><label for="one">1</label>
  <input id="two" type="checkbox"><label for="two">2</label>
  <input id="three" type="checkbox"><label for="three">3</label>
  <input id="four" type="checkbox"><label for="four">4</label>
  <input id="five" type="checkbox"><label for="five">5</label>
  <input id="one-hundred" type="checkbox"><label for="one-hundred">100</label>
</div>  
<p class="sum">  
  Sum 
</p>  
```

然后，利用计数器做出一个累加计算器。

```css
.numbers {
  counter-reset: sum;
}

#one:checked { counter-increment: sum 1; }
#two:checked { counter-increment: sum 2; }
#three:checked { counter-increment: sum 3; }
#four:checked { counter-increment: sum 4; }
#five:checked { counter-increment: sum 5; }
#one-hundred:checked { counter-increment: sum 100; }

.sum::after {
  content: '= ' counter(sum);
}
```

## cursor

`cousor`属性用来指定鼠标形状。

```css
.cursor_auto {
    cursor: auto;
}

.cursor_default {
    cursor: default;
}

.cursor_none {
    cursor: none;
}

.cursor_pointer {
    cursor: pointer;
}

.cursor_progress {
    cursor: progress;
}

.cursor_help {
    cursor: help;
}

.cursor_text {
    cursor: text;
}

.cursor_cell {
    cursor: cell;
}

.cursor_crosshair {
    cursor: crosshair;
}

.cursor_alias {
    cursor: alias;
}

.cursor_context-menu {
    cursor: context-menu;
}

.cursor_vertical-text {
    cursor: vertical-text;
}  /*not compatible with opera*/

.cursor_copy {
    cursor: copy;
}

.cursor_move {
    cursor: move;
}

.cursor_no-drop {
    cursor: no-drop;
}  /*not compatible with opera*/

.cursor_not-allowed {
    cursor: not-allowed;
}  /*not compatible with opera*/

.cursor_all-scroll {
    cursor: all-scroll;
}  /*not compatible with opera*/

.cursor_col-resize {
    cursor: col-resize;
}  /*not compatible with opera*/

.cursor_row-resize {
    cursor: row-resize;
}  /*not compatible with opera*/

.cursor_nesw-resize {
    cursor: nesw-resize;
}
.cursor_nwse-resize {
    cursor: nwse-resize;
}

.cursor_n-resize {
    cursor: n-resize;
}

.cursor_e-resize {
    cursor: e-resize;
}

.cursor_s-resize {
    cursor: s-resize;
}

.cursor_w-resize {
    cursor: w-resize;
}

.cursor_ns-resize {
    cursor: ns-resize;
}

.cursor_ew-resize {
    cursor: ew-resize;
}

.cursor_ne-resize {
    cursor: ne-resize;
}

.cursor_nw-resize {
    cursor: nw-resize;
}

.cursor_sw-resize {
    cursor: sw-resize;
}

.cursor_se-resize {
    cursor: se-resize;
}

.cursor_wait {
    cursor: wait;
}

.cursor_grab {
    cursor: grab;
}  /*only compatible with firefox and opera*/

.cursor_grabbing {
    cursor: grabbing;
}  /*only compatible with firefox and opera*/

.cursor_zoom-in {
    cursor: zoom-in;
}  /*not compatible with explorer*/

.cursor_zoom-out {
    cursor: zoom-out;
}  /*not compatible with explorer*/

.cursor_custom {
    cursor: url(image.gif), url(image.cur), auto;
}
```

## display

display属性表示如何展示元素。

```css
display: block;
display: flex;
```

### filter

filter属性表示图片滤镜，支持grayscale, blur, sepia, saturate, opacity, brightness, contrast, hue-rotate, invert效果。

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

模糊与鼠标悬停效果相结合。

```css
.spoiler {
	-webkit-filter: blur(20px);
	-webkit-transition-property: -webkit-filter;
	-webkit-transition-duration: .4s;
}
.spoiler:hover, .spoiler:focus {
	-webkit-filter: blur(0px);
}
```

## flex

flex功能可以指定容器采用弹性布局。

```css
div{
  display: flex;
}
```

## filter

filter属性在指定元素上应用滤镜。

- blur()：模糊，参数为模糊半径
- brightness()：亮度，0%为全黑，100%为原始亮度
- contrast()：对比度，0%为全黑，100%为原始对比度
- grayscale()：灰度，0%为原始色彩，100%为完全灰度。
- hue-rotate()：色调，0为原始色调，360为色彩轮旋转一周后回到原色调。
- invert()：负片效果，0%为原始效果，100%为完全负片效果。
- opacity()：透明度，0%为完全透明，100%为完全不透明。
- saturate()：饱和度，0%为完全不饱和，100%为完全饱和。
- sepia()：作旧效果，0%为原始效果，100%为完全作旧
- drop-shadow()：阴影效果，设置同box-shadow接近
- url()：引用定义在SVG文件中的滤镜

多个滤镜可以联合使用。

```css
filter: sepia(1) brightness(150%) contrast(0.5);
```

## mix-blend-mode

mix-blend-mode属性指定前景与背景的颜色混合模式，即前景色与背景色的混合。它的取值同background-blend-mode属性一样，也是16个值。

## object-fit

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

## object-position

object-position设置容器中的对象（通常是图片）的垂直和水平位置，与background-position设置背景图片的写法相同。

```css

img {
  height: 100px;
  width: 100px;
  object-fit: contain;
  object-position: top 70px;
}

```

## pointer-events

该属性定义当前图形对象会不会成为鼠标动作的目标。

```css
/* 图片将对鼠标行为无反应 */
img {
  pointer-events: none;
}

a[href="http://example.com"] {
  pointer-events: none;
}
```

一旦pointer-events设为none，就不会触发JavaScript事件。在该元素上点击，任何addEventListener添加的回调函数，都不会触发。

## text-overflow

该属性定义了文本超出容器宽度后，如何处理。如果将多余文字显示成三点的省略号，可以像下面这样设置。

```css
.ellipsis {
    overflow: hidden; 
    white-space: nowrap; 
    text-overflow: ellipsis;
}
```

上面代码第一行是隐藏溢出，第二行是防止断行，第三行是在行尾加上省略号。

## position

position属性用来确定元素的定位。

```css
position: relative;
position: sticky;
position: absolute;
position: fixed;
```

## transition

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

