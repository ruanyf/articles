# CSS 的空格处理

## 一、空格规则

HTML 代码的空格通常会被浏览器忽略。

![](https://cdn.beekka.com/blogimg/asset/201807/bg2018073106.jpg)

```html
<p>◡◡hello◡◡world◡◡</p>
```

上面是一行 HTML 代码，文字的前部、内部和后部各有两个空格。为了便于识别，这里使用半圆形符号`◡`表示空格。

浏览器的输出结果如下。

```html
hello world
```

可以看到，文字的前部和后部的空格都会忽略，内部的连续空格只会算作一个。这就是浏览器处理空格的基本规则。

如果希望空格原样输出，可以使用`<pre>`标签。

```html
<pre>◡◡hello◡◡world◡◡</pre>
```

另一种方法是，改用 HTML 实体`&nbsp;`表示空格。

```html
<p>&nbsp;&nbsp;hello&nbsp;&nbsp;world&nbsp;&nbsp;</p>
```

## 二、空格字符

HTML 处理空格的规则，适用于多种字符。除了普通的空格键，还包括制表符（`\t`）和换行符（`\r`和`\n`）。

浏览器会自动把这些符号转成普通的空格键。

```html
<p>hello
world</p>
```

上面代码中，文本内部包含了一个换行符，浏览器视同为空格，输出结果如下。

```html
hello world
```

所以，文本内部的换行是无效的（除非文本放在`<pre>`标签内）。

```html
<p>hello<br>world</p>
```

上面代码使用`<br>`标签显式表示换行。

## 三、CSS 的 white-space 属性

HTML 语言的空格处理，基本上就是直接过滤。这样的处理过于粗糙，完全忽视了原始文本内部的空格可能是有意义的。

CSS 提供了一个 white-space 属性，可以提供更精确一点的空格处理方式。该属性共有六个值，除了一个通用的`inherit`（继承父元素），下面依次介绍剩下的五个值。

### 3.1 white-space: normal

`white-space`属性的默认值为`normal`，表示浏览器以正常方式处理空格。

```html
<p>◡◡hellohellohello◡hello
world
</p>
```

上面代码中，文本前部有两个空格，内部有一个长单词和一个换行符。

然后，容器`<p>`指定一个比较小的宽度。为了便于识别，背景色设为红色。

```css
p {
  width: 100px;
  background: red;
}
```

显示效果如下图。

![](https://cdn.beekka.com/blogimg/asset/201807/bg2018073101.png)

可以看到，文首的空格被忽略。由于容器太窄，第一个单词溢出容器，然后在后面一个空格处换行。文本内部的换行符自动转成了空格。

### 3.2 white-space: nowrap

`white-space`属性为`nowrap`时，不会因为超出容器宽度而发生换行。

```css
p {
  white-space: nowrap;
}
```

显示效果如下图。

![](https://cdn.beekka.com/blogimg/asset/201807/bg2018073102.png)

所有文本显示为一行，不会换行。

### 3.3 white-space: pre

`white-space`属性为`pre`时，就按照`<pre>`标签的方式处理。

```css
p {
  white-space: pre;
}
```

显示效果如下图。

![](https://cdn.beekka.com/blogimg/asset/201807/bg2018073103.png)

上面结果与原始文本完全一致，所有空格和换行符都保留了。

### 3.4 white-space: pre-wrap

`white-space`属性为`pre-wrap`时，基本还是按照`<pre>`标签的方式处理，唯一区别是超出容器宽度时，会发生换行。

```css
p {
  white-space: pre-wrap;
}
```

显示效果如下图。

![](https://cdn.beekka.com/blogimg/asset/201807/bg2018073104.png)

文首的空格、内部的空格和换行符都保留了，超出容器的地方发生了折行。

### 3.5 white-space: pre-line

`white-space`属性为`pre-line`时，意为保留换行符。除了换行符会原样输出，其他都与`white-space:normal`规则一致。

```css
p {
  white-space: pre-line;
}
```

显示效果如下图。

![](https://cdn.beekka.com/blogimg/asset/201807/bg2018073105.png)

除了文本内部的换行符没有转成空格，其他都与`normal`的处理规则一致。这对于诗歌类型的文本很有用。

## 四、参考链接

- [When does white space matter in HTML?](https://medium.com/@patrickbrosset/when-does-white-space-matter-in-html-b90e8a7cdd33)，by Patrick Brosset
- [white-space](https://css-tricks.com/almanac/properties/w/whitespace/)，by Sara Cope 

（完）