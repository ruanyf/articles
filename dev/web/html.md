# HTML用法

## HTML标签

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

保持标签的简洁。

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
