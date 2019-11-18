`# CSS 定位详解：sticky 定位的用法

CSS 有两个最重要的基本属性，前端开发必须掌握：布局的`display`和定位的`position`。

`display`属性比较复杂，两个重要的布局，我已经介绍过了：[弹性布局`flex`](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)和[网格布局`grid`](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)。

下面介绍相对简单的`position`属性。它非常有用，我希望通过10分钟的阅读，帮助大家掌握网页定位，说清楚浏览器怎么计算网页元素的位置，尤其是新引进的`sticky`定位。

![](https://www.wangbase.com/blogimg/asset/201911/bg2019111718.jpg)

## 一、position 属性的作用

`position`属性用来指定一个元素在网页上的位置。它一般可以取五个值。

> - `static`
> -  `relative`
> -  `fixed`
> -  `absolute`
> -  `sticky`

其中，第五个值`sticky`是2017年浏览器才支持的，本文将重点介绍。

## 二、static 属性值

`static`是`position`属性的默认值。如果省略`position`属性，浏览器就认为该元素是`static`定位。

这时，浏览器会按照源码的顺序，决定每个元素的位置，这称为“正常的页面流”（normal flow）。每个元素占据自己的默认位置，元素与元素之间不产生重叠。

![](https://www.wangbase.com/blogimg/asset/201911/bg2019111720.jpg)

## 三、relative，absolute，fixed

`relative`、`absolute`、`fixed`这三个属性值有一个共同点：都是相对于某个基点的定位。不同之处仅仅在于基点不同。所以，只要理解了它们各自的基点是什么，就很容易掌握这三个属性值。

另外，这三个属性都不会对其他元素的位置产生影响，因此元素之间可能产生重叠。

### 3.1 relative 属性值

`relative`表示，相对于默认位置（即`static`时的位置）进行偏移，即定位基点是元素的默认位置。

![](https://www.wangbase.com/blogimg/asset/201911/bg2019111721.jpg)

![](https://www.wangbase.com/blogimg/asset/201911/bg2019111722.jpg)

它必须搭配`top`（顶部）、`bottom`（底部）、`left`（左边）、`right`（右边）这四个属性一起使用，用来指定偏移的方向和距离。

![](https://www.wangbase.com/blogimg/asset/201911/bg2019111723.jpg)

```css
div {
  position: relative;
  top: 20px;
}
```

上面代码中，`div`元素从默认位置向下偏移`20px`（即距离顶部`20px`）。

### 3.2 absolute 属性值

`absolute`表示，相对于上级元素（一般是父元素）进行偏移，即定位基点是父元素。

它有一个重要的限制条件：父元素不能是`static`定位，否则定位基点就会变成整个网页的根元素`html`。另外，`absolute`定位也必须搭配`top`、`bottom`、`left`、`right`这四个属性一起使用。

![](https://www.wangbase.com/blogimg/asset/201911/bg2019111801.jpg)

```css
/*
  HTML 代码如下
  <div id="father">
    <div id="son"></div>
  </div>
*/

#father {
  positon: relative;
}
#son {
  position: absolute;
  top: 20px;
}
```

上面代码中，父元素是`relative`定位，子元素是`absolute`定位，所以子元素的定位基点是父元素，相对于父元素的顶部向下偏移`20px`。

如果父元素是`static`定位，上例的子元素就是距离网页的顶部向下偏移`20px`。

注意，`absolute`定位的元素会被“正常页面流”忽略，即在“正常页面流”中，该元素所占空间为零，周边元素不受影响。

### 3.3 fixed 属性值

`fixed`表示，相对于视口（viewport，浏览器窗口）进行偏移，即定位基点是浏览器窗口的左上角。这会导致元素的位置不随页面滚动而变化，好像在固定在网页上一样。

![](https://www.wangbase.com/blogimg/asset/201911/bg2019111802.jpg)

它如果搭配`top`、`bottom`、`left`、`right`这四个属性一起使用，表示元素的初始位置是基于视口计算的，否则初始位置就是元素的默认位置。

```css
div {
  position: fixed;
  top: 0;
}
```

上面代码中，`div`元素始终在页面顶部，不随网页滚动而变化。

## 四、sticky 属性值

`sticky`属性值跟前面四个属性值都不一样，它会产生动态效果，很像`relative`和`fixed`的结合：一些时候是`relative`定位（定位基点是自身默认位置），另一些时候自动变成`fixed`定位（定位基点是视口左上角）。

因此，它能够形成“局部固定”的效果。比如，搜索网页的工具栏，初始加载时在页面的中上部（`relative`定位）。

![](https://www.wangbase.com/blogimg/asset/201911/bg2019111604.jpg)

页面向下滚动时，工具栏会始终停留在页面头部（`sticky`定位）。

![](https://www.wangbase.com/blogimg/asset/201911/bg2019111605.jpg)

等到页面向上滚动回到原位，工具栏也会回到原位。

`sticky`生效的前提是，必须搭配`top`、`bottom`、`left`、`right`这四个属性一起使用，不能省略，否则无效，等同于`relative`定位。原因是这四个属性可以定义“偏移距离”，浏览器用来当作`sticky`的生效门槛。

具体规则是，当页面滚动，视口进入父元素范围时，只要与`sticky`元素的距离达到生效门槛，`relative`定位自动切换为`fixed`定位；视口离开父元素范围时，`fixed`定位自动切换回`relative`定位。

请看下面的示例代码。注意，除了已被淘汰的 IE 以外，其他浏览器目前都支持`sticky`。但是，Safari 浏览器需要加上浏览器前缀`-webkit-`。

```css
#toolbar {
  position: -webkit-sticky; /* safari 浏览器 */
  position: sticky; /* 其他浏览器 */
  top: 20px;
}
```

上面代码中，页面向下滚动时，视口进入`#toolbar`的父元素，一旦视口的顶部与元素的距离小于`20px`（门槛值），`#toolbar`就自动变为`fixed`定位，保持与视口顶部`20px`的距离。页面继续向下滚动，父元素的底部离开视口（即整个父元素不可见），`toolbar`恢复成`relative`定位，从视口消失。

## 四、 sticky 的应用

`sticky`定位可以实现一些很有用的效果。除了上面提到“局部固定”效果，这里再介绍两个。

## 4.1 堆叠效果

堆叠效果（stacking）指的是页面滚动时，下方的元素覆盖上方的元素。下面是一个图片堆叠的例子，下方的图片会随着页面推动，覆盖上方的图片（[demo](https://jsbin.com/fegiqoquki/edit?html,css,output)）。

HTML 代码就是几张图片。

```html
<div><img src="pic1.jpg"></div>
<div><img src="pic2.jpg"></div>
<div><img src="pic3.jpg"></div>
```

CSS 代码极其简单，只要两行。

```css
div {
  position: sticky;
  top: 0;
}
```

![](https://www.wangbase.com/blogimg/asset/201911/bg2019111609.jpg)

详细解释可以看[这篇教程]( https://dev.to/vinceumo/slide-stacking-effect-using-position-sticky-91f)。

### 4.2 表格的表头锁定

大型表格滚动的时候，表头始终固定，可以用`sticky`实现（[demo](https://jsbin.com/decemanohe/edit?html,css,output)）。

![](https://www.wangbase.com/blogimg/asset/201911/bg2019111610.jpg)

CSS 代码也很简单。

```css
th {
  position: sticky;
  top: 0; 
}
```

需要注意的是，`sticky`必须设在`<th>`元素上面，不能设在`<thead>`和`<tr>`元素，原因可以看[这篇文章](https://css-tricks.com/position-sticky-and-table-headers/)。

（正文完）
