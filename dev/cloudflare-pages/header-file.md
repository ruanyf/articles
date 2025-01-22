# 头信息文件

`_headers`文件可以定制匹配某个路由的头信息，放在项目的输出目录中。

该文件的内容格式如下。

```
[url]
  [name]: [value]
```

下面是示例。

```
# This is a comment
/secure/page
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer

/static/*
  Access-Control-Allow-Origin: *
  X-Robots-Tag: nosnippet

https://myproject.pages.dev/*
  X-Robots-Tag: noindex

# Cross-Origin Resource Sharing (CORS)
/*
  Access-Control-Allow-Origin: *

https://:project.pages.dev/*
  Access-Control-Allow-Origin: https://staging.:project.pages.dev/

# Prevent your pages.dev deployments showing in search results
https://:project.pages.dev/*
  X-Robots-Tag: noindex
```

一个请求如果满足多条规则，所有指定的头信息都会被添加。

```
/about/faq/*
  Link: </about/faqs>; rel="canonical"
```

移除规则可以用`!`开头。

```
/*.jpg
  ! Content-Security-Policy
```

URL 匹配可以使用通配符。

```
/movies/:title
  x-movie-name: You are watching ":title"
```

`_headers`文件对 Functions 功能产生的回应无效。

每个项目可以添加100个头信息规则，每条规则不能超过2000个字符。