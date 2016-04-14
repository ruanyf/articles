# 布局

## HTML5网页布局（Layout）

尽量使用语义标签。

```html
<main>
  <article>
    <header>
      <h1>Blog post</h1>
      <p>Published: <time datetime="2015-02-21">21st Feb, 2015</time></p>
    </header>
    <p>…</p>
  </article>
</main>
```

保持标签的简洁，属性不需要使用双引号。

```html
<!doctype html>
<html lang=en>
  <meta charset=utf-8>
  <title>Contact</title>
  <link rel=stylesheet href=style.css>

  <h1>Contact me</h1>
  <input type=email placeholder=you@email.com required>
  <script src=main.js></script>
</html>
```

## HTML标签

### Article

Article标签表示文档的主体内容部分。

### Aside

Aside标签表示与文档主体部分相关的部分。

### Footer

Footer标签表示整张网页或一个section的尾部。

### Header

Header标签表示某个部分的头部。通常，整张网页或一个section，会有一个Header。

### Label

`Label`用于为指定的表单元素，提供解释性文本。

它有两种用法。

```html
<!-- 用法一 -->
<label>
  <input type="checkbox" name="quokka">
  Yes, I want to buy a quokka!
</label>

<!-- 用法二 -->
<input type="checkbox" id="yayforwallaby"
       name="wallaby">
<label for="yayforwallaby">
  Yes, I want to buy a wallaby!
</label>
```

注意，在用法二之中，表单元素必须有`id`属性，`label`元素的`for`属性匹配的是`id`属性，而不是`name`属性。`name`属性用于将这个表单元素的值发送到服务器。

另一点需要注意的是，在JavaScript之中，`for`属性无法以`element.for`的形式获取，因为`for`是一个JavaScript保留字，必须改用`htmlfor`表示。

```javascript
var labels = document.querySelectorAll('label');
for (var i=0; i<labels.length; i++) {
  if (labels[i].htmlFor) {
    if (!document.getElementById(labels[i].htmlFor)) {
      labels[i].style.background = 'firebrick';
    }
  }
}
```

### Main

Main标签表示文档的主要部分。

### Meter

Meter标签表示某个范围内的度量值。

```html
<meter>1 of 10</meter>
<meter>2 of 7</meter>
```

它有6个属性。

- value
- min
- max
- high
- low
- optimum

```html
Your batting average is <meter value=".340" min="0" max="1.000" low=".215" high=".367" optimum="1.000">.340</meter>
```

### Nav

Nav标签表示文档的导航部分，通常可以放在Header部分之中。

### Progress

Progress标签表示进度。

```html
Your download is <progress>55%</progress> complete
```

它有三个属性。

- value
- min
- max

### Section

section标签代表文档的一个部分。

```html
<section>
  <h1>Bob Dylan Albums</h1>
  <p>Some text</p>

  <section>
    <h2>Blood on the Tracks</h2>
    <p>Some text</p>
  </section>

  <section>
    <h2>Highway 61 Revisited</h2>
    <p>Some text</p>
  </section>

  <p>Some text</p>
</section>
```

### Time

Time标签用来表示时间。

```html
<time>2011-07-14</time>
<time datetime="14:00">2pm</time>
<time datetime="2011-07-14">July 14th, 2011</time>
<time datetime="2011-07-14T14:00">2pm on July 14th</time>
```

### Video

`video`元素用于插入视频元素。

```html
<video
  src="#defer-loading"
  poster="nice-default.jpg
  autoplay
/>
```

下面是将视频全屏插入网页，作为背景 。

```css
video.fullscreen {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  transform: translate(-50%, -50%);
}
```

参考链接

- [Should I use a video as a background?](https://css-tricks.com/should-i-use-a-video-as-a-background/)
