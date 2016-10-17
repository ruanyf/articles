# 背景

如果不定义背景图片或者背景色，一个网页元素的背景就是透明的。

## opaque

`opaque`的值在0到100之间。默认值是100，表示百分之百不透明，而0表示百分之百透明。

## background-repeat

`background-repeat`指定背景图像的面积小于容器面积时的平铺方式，可以取以下值。

- repeat：背景图片沿容器的X轴和Y轴平铺，将会平铺满整个容器，可能会造成背景图片显示不全。
- repeat-x： 背景图片沿容器的X轴平铺。
- repeat-y：背景图片沿容器的Y轴平铺。
- no-repeat：背景图片不做任何平铺。
- round：背景图片沿容器的X轴和Y轴平铺，将会平铺满整个容器，但会根据容器尺寸和图片尺寸做自适应处理，不会造成图片显示不全。
- space：背景图片会平铺整个容器，但是不会改变背景图片的大小，如果有多余空间，会平均分配作为相邻图片之间的空白。

`background-repeat`可以设置两个值，分别表示X轴和Y轴的重复方式。上面六个值其实是下面方式的简写方式。

- `repeat`：相当于`repeat repeat`
- `repeat-x`：相当于`repeat-x no-repeat`
- `repeat-y`：相当于`no-repeat repeat`
- `no-repeat`：相当于`no-repeat no-repeat`
- `space`：相当于`space space`
- `round`：相当于`round round`

这两个值还有其他搭配方式，比如`round space`、`space round`、`round repeat-y`等等。

## 参考链接

- [单聊background-repeat](http://www.w3cplus.com/css3/css3-background-repeat-space-round.html)，by 大漠

