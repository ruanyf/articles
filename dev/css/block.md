# 盒状模型

## width

`width: auto`表示父元素提供的所有宽度（100%）。

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
