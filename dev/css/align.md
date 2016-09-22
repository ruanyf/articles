# 对齐的设置

## text-align

`text-align`命令设置行内文本如何排列。它可以取以下值。

- left：左对齐
- right：右对齐
- center：居中对齐
- justify：两端对齐，除了最后一行是左对齐。
- inherit：继承父元素的值
- match-parent：与父元素的direction相反
- start：`direction`命令为从左到右时，为左对齐；从右到左时，为右对齐
- end：`direction`命令为从左到右时，为右对齐；从右到左时，为左对齐

## vertical-align

`vertical-align`设置一个元素与在同一条水平线上的其他元素如何对齐。这些元素需要都是`inline`。它可以取以下值。

- baseline：对齐父元素的基线，默认值
- length: 升高或降低特定的长度，可使用负值
- %：升高或降低`line-height`的百分比，不允许负值
- sub：设为下标
- super：设为上标
- top: 当前元素的顶部对齐最高元素的顶边
- text-top：当前元素的顶部对齐父元素字体的顶部
- middle：元素位于父元素的垂直中部
- bottom：当前元素的底部对齐本行最低元素的底部
- text-bottom：当前元素的底部，对齐父元素字体的底部
- initial：设置为默认值
- inherit：继承父元素的值

这个属性通常用于同一行的图标与文字的对齐。

```css
vertical-align: middle;
```

这个命令对设为`display: table-cell`的元素也有效，可以控制元素在单元格之中的垂直对齐方式。这时，一般使用`top`、`middle`和`bottom`等值。
