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

JavaScript可以操作这些变量。

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
