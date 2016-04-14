# Content Security Policy

内容安全政策（Content Security Policy）主要用来防止跨站点攻击。它属于HTTP头信息的一个字段，用来限制外部资源载入网页（JavaScript、CSS、表单提交等）。

下面是github.com的CSP设置。

```http
CONTENT-SECURITY-POLICY:
  default-src 'none';
  base-uri 'self';
  block-all-mixed-content;
  child-src render.githubusercontent.com;
  connect-src 'self' uploads.github.com status.github.com api.github.com www.google-analytics.com wss://live.github.com;
  font-src assets-cdn.github.com;
  form-action 'self' github.com gist.github.com;
  frame-ancestors 'none';
  frame-src render.githubusercontent.com;
  img-src 'self' data: assets-cdn.github.com identicons.github.com www.google-analytics.com collector.githubapp.com *.gravatar.com *.wp.com *.githubusercontent.com;
  media-src 'none';
  object-src assets-cdn.github.com;
  plugin-types application/x-shockwave-flash;
  script-src assets-cdn.github.com;
  style-src 'unsafe-inline' assets-cdn.github.com
```

可以看到，`CONTENT-SECURITY-POLICY`这个字段里面，可以设置很多属性。

`script-src`用来设置`script`标签的脚本来源。

## 参考链接

- Patrick Toomey, [GitHub's CSP journey](http://githubengineering.com/githubs-csp-journey/)
