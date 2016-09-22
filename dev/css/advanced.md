# CSS高级功能

## 变量

`：root`选择器之中，可以设置CSS变量并赋值。

```css
:root {
  --base: #ffc600;
  --spacing: 10px;
  --blur: 10px;
}
```

使用时，通过`var`函数取出变量。

```css
img {
  padding: var(--spacing);
  background: var(--base);
  -webkit-filter: blur(var(--blur));
  filter: blur(var(--blur));
}
```

注意，变量名是大小写敏感的。

变量不能直接添加单位。

```css
/* 无效 */
.quote {
  --t-padding: 20;
  padding-top: var(--t-padding)px;
}

/* 有效 */
.quote {
  --t-padding: 20;
  padding-top: calc(var(--t-padding) * 1px);
}
```

JavaScript可以操作这些变量。

```javascript
// 取得变量值
var styles = getComputedStyle(document.documentElement);
var bgValue = String(styles.getPropertyValue('--background')).trim();

// 设置变量值
document.documentElement.style.setProperty('--background', 'black');
// 另一种写法
document.documentElement.style.setProperty('--h-color', 'var(--p-color)');
```

下面是一个使用CSS变量的例子，只要`<input>`的值发生变化，样式就会随之发生变化。

```javascript
// get the inputs
const inputs = [].slice.call(document.querySelectorAll('.controls input'));

// listen for changes
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

function handleUpdate(e) {
  // append 'px' to the end of spacing and blur variables
  const suffix = (this.id === 'base' ? '' : 'px');
  document.documentElement.style.setProperty(`--${this.id}`, this.value + suffix);
}
```

## supports

`supports`命令用来判断浏览器是否支持某项CSS功能。

```javascript
@supports not (display: grid) {
  // 不支持网格布局
  // 老式浏览器代码
}
@supports (display: grid) {
  // 支持网格布局
  // 新式浏览器代码
}
```

另一个例子。

```javascript
@supports (object-fit: cover) {
  img {
    object-fit: cover;
  }
  div {
    width: auto;
    background: green;
   // some other complex code for the fancy new layout
  }
}
```

## initial-letter

`initial-letter`决定首字母的下沉样式。

```css
/* 默认值 */
initial-letter: normal;

/* 占据1.5行高度 */
initial-letter: 1.5;

/* 占据3行高度 */
initial-letter: 3.0;

/* 占据3行高度，下沉2行高度 */
initial-letter: 3.0 2;
```

## 滤镜

网页的灰度显示。

```css
html {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}
```
