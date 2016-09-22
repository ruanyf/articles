# 盒状模型

## width

`width: auto`表示父元素提供的所有宽度（100%）。

## max-width

`max-width`设为`none`，可以让元素占满父元素的整个宽度。

## box-sizing

`box-sizing`指定盒状模型的宽度范围。

- `box-sizing: border-box;`宽度包括边框

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
