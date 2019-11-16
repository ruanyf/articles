# CSS 定位详解：sticky 

CSS 有两个最重要的基本属性，一定要掌握：布局的`display`属性和定位的`position`属性。

`display`属性很复杂，跟据标准有20几个值。我介绍过其中两个比较重要的布局：弹性布局`flex`和网格布局`grid`。

今天就要介绍相对简单、但同样威力无比的`position`布局。这个属性一般可以取五个值。

> - `static`
> -  `relative`
> -  `fixed`
> -  `absolute`
> -  `sticky`

本文的重点是2017年新进入标准的第五个值`sticky`。我希望通过这篇文章，帮助大家理解，浏览器如何计算网页元素的位置。

## 一、position 属性的作用，`static`属性值

`position`属性用来指定一个元素在网页上的位置。

最简单的情况就是不使用这个属性，让浏览器按照从上到下的顺序，决定每个元素的位置。这称为“正常的页面流”（normal flow），每个元素的位置就是自己的默认位置，元素与元素之间不产生重叠。

`static`属性值就对应这种情况，它是`position`属性的默认值。所以，`position: static`这个命令，等同于不使用`position`属性。

## 二、relative，absolute，fixed

除了`static`，其他三个`position`属性的值——`relative`、`absolute`、`fixed`--都很容易理解。它们都是相对于不同的基点，对元素进行定位。

它们都不会对其他元素的位置产生影响，因此元素之间可能产生重叠。

**（1）`relative`**

`relative`属性值表示，相对于默认位置（即`static`时的位置）进行偏移。它必须搭配`top`、`bottom`、`left`、`right`这四个属性一起使用，用来指定偏移的方向和距离。

```css
div {
  position: relative;
  top: 20px;
}
```

上面代码中，`div`元素是`relative`定位，距离默认位置的顶部向下偏移`20px`，

**（2）`absolute`**

`absolute`属性值表示，相对于上级元素进行偏移。但是，它有一个限制条件，上级元素不能是`static`定位，否则就会相对于网页根元素`html`进行定位。

它也必须搭配`top`、`bottom`、`left`、`right`这四个属性一起使用，用来指定偏移的方向和距离。请看下面的例子。

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

上面代码表示，子元素距离父元素的顶部向下偏移`20px`。如果父元素没有指定`position: relative`，子元素就是距离整张网页的顶部向下偏移`20px`。

另外，“正常页面流”不包括`absolute`定位的元素，即对于周边元素来说，`absolute`定位的元素好像不存在一样。

**（3）fixed**

`fixed`属性值表示，相对于视口（viewport，即浏览器窗口）进行偏移，即元素的位置不随页面滚动而变化，比如始终在页面顶部。

如果搭配`top`、`bottom`、`left`、`right`这四个属性一起使用，表示元素的初始位置是基于视口计算的，否则初始位置就是元素的默认位置。

```css
div {
  position: fixed;
  top: 0;
}
```

上面代码中，`div`元素始终在页面顶部，不随网页滚动而变化。

“正常页面流”同样不包括`fixed`定位的元素，

## 三、sticky 属性值

`sticky`属性值很像`relative`和`fixed`的结合：某些时候是`relative`定位（相对于自身默认位置进行偏移），另一些时候自动变成`fixed`定位（相对于视口进行偏移）。

因此，它能够形成“局部固定”的效果。比如，搜索网页的工具栏，初始加载时在页面的中上部。

![](https://www.wangbase.com/blogimg/asset/201911/bg2019111604.jpg)

页面滚动进入搜索结果区时，工具栏会始终停留在页面头部。

![](https://www.wangbase.com/blogimg/asset/201911/bg2019111605.jpg)

等到页面回到原位，工具栏也会回到原位。

`sticky`生效的前提是，必须搭配`top`、`bottom`、`left`、`right`这四个属性一起使用，否则无效，浏览器视同`position: relative`。原因是这四个属性可以定义“偏移距离”，用来当作`sticky`的生效门槛。

具体规则是，当页面滚动，视口进入父元素范围时，只要与`sticky`元素的距离达到生效门槛，`relative`定位自动切换为`fixed`定位；视口离开父元素范围时，`fixed`定位自动切换回`relative`定位。

下面是示例代码。目前，除了已被淘汰的 IE 以外，其他浏览器都支持`sticky`。但是，Safari 浏览器需要加上浏览器前缀`-webkit-`。

```css
#toolbar {
  position: -webkit-sticky; /* safari 浏览器 */
  position: sticky; /* 其他浏览器 */
  top: 20px;
}
```

上面代码中，页面向下滚动时，视口进入`#toolbar`的父元素，只要视口的顶部与元素顶部的距离小于`20px`，`#toolbar`就自动变为`fixed`定位，保持与视口顶部`20px`的距离。页面继续向下滚动，父元素的底部离开视口（即整个父元素不可见），`toolbar`回复成`relative`定位，从视口消失。

## 四、 sticky 的应用

`sticky`定位可以实现一些很有用的效果。除了上面提到“局部固定”效果，这里再介绍两个。

**（1）堆叠效果**

堆叠效果（stacking）指的是页面滚动时，下方的元素覆盖上方的元素。下面是一个图片堆叠的例子，下方的图片会随着页面推动，覆盖上方的图片。

![](https://www.wangbase.com/blogimg/asset/201911/bg2019111609.jpg)

HTML 代码就是几张图片。

```html
<div><img src="pic1.jpg"></div>
<div><img src="pic2.jpg"></div>
<div><img src="pic3.jpg"></div>
```

CSS 代码极其简单，只要两行（[查看源码](https://jsbin.com/fegiqoquki/edit?html,css,output)）。

```css
div {
  position: sticky;
  top: 0;
}
```

详细解释可以看[这篇教程]( https://dev.to/vinceumo/slide-stacking-effect-using-position-sticky-91f)。

**（2）表格的表头锁定**

大型表格滚动的时候，表头始终固定，可以用`sticky`实现（查看 [Demo](https://jsbin.com/decemanohe/edit?html,css,output)）。

![](https://www.wangbase.com/blogimg/asset/201911/bg2019111610.jpg)

CSS 代码也很简单。需要注意的是，`sticky`必须设在`<th>`元素上面，不能设在`<thead>`和`<tr>`元素，原因可以看[这篇文章](https://css-tricks.com/position-sticky-and-table-headers/)。

```css
th {
  position: sticky;
  top: 0; 
}
```

（完）
