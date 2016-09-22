# display 属性

`display: none;`会从文档流移除该元素及其子元素，仿佛它们是不存在的。它们占据的空间会释放出来。

`display: inline;`产生行内元素，没有自己的高度和宽度，由容器决定，前后不会产生换行。

`display: block;`产生块级元素，会占据一行，占满容器的宽度。

`display: list-item;`将元素渲染为一个列表项，行首产生一个列表标记，可以用`list-style`定制样式。

`display: inline-block;`产生行内的块级元素，有自己的高和宽，但是前后不会产生换行。

## 表格相关的设置

- `table` 对应`<table>`元素
- `table-header-group` 对应`<thead>`
- `table-row`	对应`<tr>`
- `table-cell` 对应`<td>`
- `table-row-group` 对应`<tbody>`
- `table-footer-group` 对应`<tfoot>`
- `table-column-group` 对应`<colgroup>`
- `table-column` 对应`<col>`
- `table-caption` 对应`<caption>`
- `inline-table` 将一个表格渲染具有`inline-block`的形式

## 表格显示

```css
div {
  display: table;
  display: table-cell;
  display: table-column;
  display: table-colgroup;
  display: table-header-group;
  display: table-row-group;
  display: table-footer-group;
  display: table-row;
  display: table-caption;
}
```

## flexbox

`display: flexbox;`是一维布局，定义沿着一根直线的布局。这根直线可以折行。

## grid

`display: grid;`是二维布局。

## 参考链接

- [How well do you know CSS display?](https://www.chenhuijing.com/blog/how-well-do-you-know-display/), by Chen Hui Jing
