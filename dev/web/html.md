# HTML用法

## HTML标签

### Article

Article标签表示文档的主体内容部分。

### Aside

Aside标签表示与文档主体部分相关的部分。

### Footer

Footer标签表示整张网页或一个section的尾部。

### Header

Header标签表示某个部分的头部。通常，整张网页或一个section，会有一个Header。

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
