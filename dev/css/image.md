# 图像处理

## filter

`filter`命令支持以下函数。

- url()：使用svg滤镜
- blur()：高斯模糊
- brightness()：亮度
- contrast()：对比度
- drop-shadow()：阴影
- grayscale()：灰度
- hue-rotate()：色调旋转
- invert()：色调分离
- opacity()：透明
- saturate()：饱和度
- sepia()：加入褐色色调

```css
filter: saturate(200%);
filter: sepia(100%);
filter: opacity(50%);
filter: url(resources.svg#c1);
filter: blur(5px);
filter: invert(100%);
filter: hue-rotate(90deg);
filter: brightness(0.5);
filter: contrast(200%);
filter: grayscale(50%);
filter: grayscale(0.5) blur(10px);
filter: drop-shadow(16px 16px 10px black);
```
