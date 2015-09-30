# CSS选择器

## :matches()

`:matches(A, B)`选择器表示匹配A或B。

```css
:matches(.foo, .bar) {
  background-color: green;
}

/* 等同于 */

.foo, .bar {
  background-color: green;
}
```

它可以简化一些选择器的写法。

```css
.syntax-highlighted .css-keyword,
.syntax-highlighted .css-tag {
  color: rgb(170, 13, 145);
}

/* 等同于 */

.syntax-highlighted :matches(.css-keyword, .css-tag) {
  color: rgb(170, 13, 145);
}
```

## :not()

`:not()`表示选中不匹配指定条件的元素。

```css
a:not(.internal) {
  color: red;
}
```

`:not()`可以采用链式写法。

```css
:not(i):not(em)

/* 等同于 */

:not(i, em)
```

## :nth-child()，:nth-last-child()

`:nth-child()`选中指定位置的子元素。`:nth-last-child()`选中倒数位置的子元素。
