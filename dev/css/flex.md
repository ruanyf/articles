# flex布局

## 概述

flex布局指的是弹性布局，可以很方便地指定布局。目前，大多数浏览器已经支持。

下面是一个div容器，里面有一个span元素。

```html
<div class="first-face">
  <span class="pip"></span>
</div>
```

![](http://davidwalsh.name/demo/dicey-flexbox-images/face-1-1.png)

现在指定这个div容器，采用flex布局。

```css
.first-face {
  display: flex;
}
```

![](http://davidwalsh.name/demo/dicey-flexbox-images/face-1-1-axes.png)

flex布局默认提供两根轴，一根是水平的主轴（main axis），另一根是垂直的副轴（cross axis）。

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

### 浏览器前缀

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
