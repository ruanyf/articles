# CSS的用法

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
