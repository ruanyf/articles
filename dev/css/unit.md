# CSS的单位

## em

`em`表示一个单位的字体大小。

```css
h1 { font-size: 20px } /* 1em = 20px */
p { font-size: 16px } /* 1em = 16px */
```

默认情况下，`1em`等于父元素的字体大小设定。

```css
html { font-size: 16px }
h1 { font-size: 2em } /* 16px * 2 = 32px */
```

浏览器的默认字体大小是16px。

```css
html { font-size: 100% } /* This means 16px by default*/

h1 {
  font-size: 2em; /* 1em = 16px */
  margin-bottom: 1em; /* 1em = 32px */
}

p {
  font-size: 1em; /* 1em = 16px */
  margin-bottom: 1em; /* 1em = 16px */
}
```

`em`的大小由`font-size`属性决定。其他许多需要大小单位的属性，也可以使用`em`，这就相当于间接由`font-size`决定。

```css
.header {
  font-size: 16px;
  padding: 0.5em 0.75em; /* 相当于 8px 12px */
  background: #7F7CFF;
}
```

`em`单位最大的特点就是，它是基于父元素的`em`计算出来的。所以，设置父元素的字体大小，会影响到所有子元素的大小。

## rem

`rem`代表根元素的`em`大小（root em），即`font-size`的大小。这意味着，`1rem`总是等与`html`元素的`font-size`大小。

```css
h1 {
  font-size: 2rem;
  margin-bottom: 1rem; /* 1rem = 16px */
}

p {
  font-size: 1rem;
  margin-bottom: 1rem; /* 1rem = 16px */
}
```

## vh，vw

`vh`表示百分之一的浏览器视口高度，`vw`表示百分之一的浏览器视口宽度。

## 参考链接

- Zell, [REM vs EM – The Great Debate](http://zellwk.com/blog/rem-vs-em/)
