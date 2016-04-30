# CSS选择器

## 基本选择器

`#elementId`选中指定`id`属性的元素。

`.elementClass`选中指定`class`属性的元素。

## :first-of-type，:last-of-type

`:first-of-type`选中容器里面，第一个符合要求的元素。

```css
p:first-of-type {
  font-size: 1.25em;
}
```

`:last-of-type`选中容器里面，最后一个符合要求的元素。

```css
p:last-of-type {
  font-size: 0.75em;
}
```

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

```css
p:nth-child(2) {
  color: red;
}
```

`:nth-child()`选中第二个子元素，而且这个元素必须是`p`元素。

`:nth-child()`和`:nth-last-child()`可以使用通配符作为参数，参见`:nth-of-type()`部分的说明。

```css
.module:nth-child(4n) {
  margin-right: 0;
}
```

## :nth-of-type()，:nth-last-of-type()

`:nth-of-type()`选中指定类型和指定位置的元素，`:nth-last-of-type()`选中倒数位置的指定类型和指定位置的元素。

```css
p:nth-of-type(2) {
  color: red;
}
```

`:nth-of-type`选中子元素之中的第二个`p`元素。

通配符用法。

```css
li:nth-of-type(2n) {
  background: lightslategrey;
}

li:nth-of-type(3n+2) {
  background: blue;
}
```

`:nth-of-type`的参数可以是`an + b`的形式。

- “a”是一个整数
- “n”作为英文字母，总是不变的，含义是“0, 1, 2, ....”
- “+”作为一个运算符，可以是“+”，也可以是“-”
- “b”是一个整数，如果提供了运算符，就必须提供“b”

`:nth-of-type`的参数还可以是`even`或`odd`。

```css
li::nth-of-type(odd)  {
  background: lightslategrey;
}
```
