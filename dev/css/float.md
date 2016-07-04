# 浮动

如果父元素内部只有浮动元素，那么父元素将会崩塌（collapse）。下面的代码可以消除这个问题。

```css
.grid:after {
  content: "";
  display: table;
  clear: both;
}
```
