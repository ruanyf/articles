# redirect 文件

在项目的推送目录中，定义`_redirects`文件。

注意，`_redirects`文件定义的重定向不适用于 Functions。也就是说，Functions 匹配的路由，先于重定向文件。

重定向文件每行的结构如下。

```bash
[source] [destination] [code?]
```

- `[source]`：请求路径，文件路径或者通配符
- `[destination]`：重定向的目的地
- `[code?]`： HTTP 状态码，默认为 302

`#`开始的行为注释。

重定向文件可以包含2000个静态重定向和100个动态重定向。

每个重定向规则不超过1000个字符。

静态重定向排在动态重定向前面。排在前面的规则先生效。

下面是一些例子。

```
/home301 / 301
/home302 / 302
/querystrings /?query=string 301
/twitch https://twitch.tv
/trailing /trailing/ 301
/notrailing/ /nottrailing 301
/page/ /page2/#fragment 301
/blog/* https://blog.my.domain/:splat
/products/:code/:name /products?code=:code&name=:name
```

重定向文件可以写出网页代理的效果。

```
/about/faq/* /about/faqs 200
```

目前，状态码只支持 301, 302, 303, 307, 308，200。

重定向不支持请求路径里面，匹配查询参数，也不支持匹配域名。

- :splat 包含所有字符