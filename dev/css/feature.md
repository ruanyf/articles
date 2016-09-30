# 常用功能

## 置中

`transform`方法。

容器设置相对定位。

```css
.container {
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
}
```

元素的左上角先定位在容器中央，然后向西北方向移动自身的`50%`。

```css
.container div {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
}
```

## 隐藏元素

彻底隐藏一个元素。

```css
[hidden] {
  display: none;
}
```

在视觉上隐藏一个元素。

```css
.visuallyhidden {
  position: absolute;

  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;

  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
```

## 参考链接

- [Hiding DOM elements](https://allyjs.io/tutorials/hiding-elements.html)

