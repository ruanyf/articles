# 颜色

## currentColor

`currentColor`是一个属性值，代表当前元素的`color`属性的值。

```css
.box {
  color: red;
  border: 1px solid currentColor;
  box-shadow: 0 0 2px 2px currentColor;
}
```

上面代码，`border`和`box-shadow`的颜色都与`color`保持一致。这种写法的好处是，如果要修改`color`，只要修改一处就可以了，不用修改三个地方。

`currentColor`的另一个用处，是让衍生类都继承基类的颜色。

```css
.box {
    color: red;
}
.box .child-1 {
    background: currentColor;
}
.box .child-2 {
    color: currentColor;
    border 1px solid currentColor;
}
```

伪元素也可以使用`currentColor`。

```css
.box {
    color: red;
}
.box:before {
    color: currentColor;
    border: 1px solid currentColor;
}
```

## 参考链接

- [使用 currentColor 属性写出更好的 CSS 代码](http://www.qcyoung.com/2016/09/28/%E3%80%90%E8%AF%91%E3%80%91%E4%BD%BF%E7%94%A8%20currentColor%20%E5%B1%9E%E6%80%A7%E5%86%99%E5%87%BA%E6%9B%B4%E5%A5%BD%E7%9A%84%20CSS%20%E4%BB%A3%E7%A0%81/)
