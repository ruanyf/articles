# 盒状模型

## width

`width: auto`表示父元素提供的所有宽度（100%）。

## max-width

`max-width`设为`none`，可以让元素占满父元素的整个宽度。

## overflow

`overflow`属性指定如果元素的大小超出容器时的行为。

- `visible`：默认值，表示溢出的部分可见
- `hidden`：表示溢出的部分不可见
- `scroll`：表示发生溢出时，会显示滚动条，用户可以拖动滚动条，看到溢出的部分

## clip

`clip`规则指定元素超出容器大小时，具体显示哪个部分。它只对绝对定位（absolute）和固定定位（fixed）的元素有效。

```css
clip: rect(0px, 100px, 100px, 0px);
```

`react`函数四个参数的含义如下。

- 第一个参数：剪切后的顶边距离容器的顶边的距离
- 第二个参数：剪切后的右边界距离容器的左边界的距离
- 第三个参数：剪切后的底边距离容器的顶边的距离
- 第四个参数：剪切后的左边界距离容器的左边界的距离

```css
clip: rect(auto 100px auto auto);
```

该规则已经被废除，但是浏览器还是普遍支持。

## clip-path

`clip-path`是`clip`规则的继承者，用来剪切元素的大小。它对所有定位方式都适用。

```css
clip: rect(110px, 160px, 170px, 60px);
/* 等同于 */
clip-path: inset(10px 20px 30px 40px);
```

`clip-path`支持多种路径定义方式。

```css
.clip-me {

  /* referencing path from an inline SVG <clipPath> */
  clip-path: url(#c1);

  /* referencing path from external SVG */
  clip-path: url(path.svg#c1);

  /* polygon */
  clip-path: polygon(5% 5%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);

  /* circle */
  clip-path: circle(30px at 35px 35px);

  /* ellipse */
  clip-path: ellipse(65px 30px at 125px 40px);

  /* inset-rectangle() may replace inset() ? */
  /* rectangle() coming in SVG 2 */

  /* rounded corners... not sure if a thing anymore */
  clip-path: inset(10% 10% 10% 10% round 20%, 20%);

}
```

## box-sizing

`box-sizing`指定盒状模型的宽度范围。

- `border-box`：宽度包括padding和border
- `content-box`：默认值，只包括内容区的宽度，不包括padding和border

```css
*, *:after, *:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
```

## object-fit

`object-fit`命令指定一个元素的大小应该如何适应它的容器，主要用于图像。它可以取以下的值。

- fill：容器的宽度和高度就是元素的宽度和高度，会截去溢出的部分。
- contain：元素会填满容器，不会改变长宽比，可能会有溢出。
- cover：元素会填满容器，可能会改变长宽比，但不会有溢出。
- none：元素不会改变的大小，具体的展示效果由默认算法决定
- scale-down：展示效果会选择`none`或`contain`之中，对象尺寸较小的一个
- inherit：使用父元素的值
- initial：使用浏览器的默认值
- unset：这个属性是`inherit`和`initial`的结合，如果该元素继承父元素，就采用`inherit`，否则采用`initial`
