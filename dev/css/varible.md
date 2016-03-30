# CSS变量

声明变量。

```css
:root{
    --awesome-blue: #2196F3;
}
```

读取变量。

```css
.some-element{
    background-color: var(--awesome-blue);
}
```

注意，变量名对大小写敏感。

`var()`函数接受第二个参数，指定如果读取变量失败时的默认值。

```css
width: var(--custom-width, 20%);
```

变量可以嵌套。

```css
--base-color: #f93ce9;
--background-gradient: linear-gradient(to top, var(--base-color), #444);
```

变量也可以与`calc`函数结合使用。

```css
--container-width: 1000px;
max-width: calc(var(--container-width) / 2);
```

## 参考链接

- [What You Need To Know About CSS Variables](http://tutorialzine.com/2016/03/what-you-need-to-know-about-css-variables/), by Danny Markov

