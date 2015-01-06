# CSS的用法

## 操作

### 清理浮动

```css

.clearfix:after{
  visibility:hidden;
  display:block;
  font6size:0;
  content:" ";
  clear:both;
  height:0;
}

.clearfix{
  zoom:1; /* for IE6 IE7 */
}

```

## 属性

### text-overflow

该属性定义了文本超出容器宽度后，如何处理。如果将多余文字显示成三点的省略号，可以像下面这样设置。

```css
.ellipsis {
    overflow: hidden; 
    white-space: nowrap; 
    text-overflow: ellipsis;
}
```

上面代码第一行是隐藏溢出，第二行是防止断行，第三行是在行尾加上省略号。

## 单位

### calc()

calc方法用于计算值。比如，每行放置4张图片，可以采用如下的代码。

```css

img {
  float: left;
  width: calc(25% - 20px);
  margin: 10px;
}

```

动态排列图片，可以配合media query。

```css

img {
  float: left;
  margin: 10px;
  width: calc(100% * 1 / 4 - 20px);
}

@media (max-width: 900px) {
  img {
    width: calc(100% * 1 / 3 - 20px);
  }
}

@media (max-width: 600px) {
  img {
    width: calc(100% * 1 / 2 - 20px);
  }
}

@media (max-width: 400px) {
  img {
    width: calc(100% - 20px);
  }
}

```
