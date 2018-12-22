# 自定义错误页

如果用户请求了错误的网址，或者处理请求时发生错误，nginx 会向用户显示一个错误页。该页面可以自定义。

可以在`server`块里面，写入下面的定义。

```bash
error_page 400 401 402 403 404 405 406 407 408 409 410 411 412 413 414 415 416 417 418 421 422 423 424 426 428 429 431 451 500 501 502 503 504 505 506 507 508 510 511 /error.html;

location = /error.html {
  ssi on;
  internal;
  root /var/www/default;
}
```

上面的代码指定，错误页为网站的`/error.html`，该页在`/var/www/default/`目录里面。

可以用下面的设置测试。

```bash
location = /404.html {
  return 404;
}
```

## 参考链接

- [One NGINX error page to rule them all](https://blog.adriaan.io/one-nginx-error-page-to-rule-them-all.html)
