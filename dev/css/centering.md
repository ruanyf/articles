# 置中

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
