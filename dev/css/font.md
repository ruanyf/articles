# 字体的用法

首先，设置网页的根字体大小。

```css
:root {
    font-size: 16px;
}

// Or you can use html
// html {
//    font-size: 16px;
// }
```

然后，每个一级区块的`font-size`采用`rem`单位，内部属性使用`em`单位。这时，`em`的大小是基于`rem`设置的。

```css
button {
    font-size: 0.875rem;
    // All the internal/external value use in 'em'
    // This value use of your "font-size" as the basic font size
    // And you will not have any problem with the font size of the container ( Example bottom )
    padding: .5em 1em;
    border: .125em solid #e3e3e3;
    @media (min-width: 48rem){ // min-width: 768px
      font-size: 1.125rem;
    }
    @media (min-width: 62rem){ // min-width: 992px
      font-size: 1.375rem;
    }
}
```

## 反锯齿

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```
