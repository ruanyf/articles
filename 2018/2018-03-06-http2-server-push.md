# HTTP/2 Server Push 教程

[HTTP/2 协议](http://www.ruanyifeng.com/blog/2016/08/http.html)的主要目的是提高网页性能。

头信息（header）原来是直接传输文本，现在是压缩后传输。原来是同一个 TCP 连接里面，上一个回应（response）发送完了，服务器才能发送下一个，现在可以多个回应一起发送。

服务器推送（server push）是 HTTP/2 协议里面，唯一一个需要开发者自己配置的功能。其他功能都是服务器和浏览器自动实现，不需要开发者关心。

本文详细介绍服务器推送的原理和配置方法。

## 一、传统的网页请求方式

下面是一个非常简单的 HTML 网页文件`index.html`。

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>hello world</h1>
  <img src="example.png">
</body>
</html>
```

这个网页包含一张样式表`style.css`和一个图片文件`example.png`。为了渲染这个网页，浏览器会发出三个请求。第一个请求是`index.html`。

```bash
GET /index.html HTTP/1.1
```

服务器收到这个请求，就把`index.html`发送给浏览器。浏览器发现里面包含了样式表和图片，于是再发出两个请求。

```bash
GET /style.css HTTP/1.1
```

```bash
GET /example.png HTTP/1.1
```

这就是传统的网页请求方式。它有两个问题，一是至少需要两轮 HTTP 通信，二是收到样式文件之前，网页都会显示一片空白，这个阶段一旦超过2秒，用户体验就会非常不好。

## 二、传统方式的改进

一种解决办法就是把外部资源合并在网页文件里面，减少 HTTP 请求。比如，把样式表的内容写在`<style>`标签之中，把图片改成 Base64 编码的 [Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)。

另一种方法就是资源的[预加载](https://w3c.github.io/preload/)（preload）。网页预先告诉浏览器，立即下载某些资源。比如，上例可以写成下面这样。

```html
<link rel="preload" href="/styles.css" as="style">
<link rel="preload" href="/example.png" as="image">
```

对于上例来说，`preload`命令并没有什么帮助。但是，如果前一个网页就使用这个命令，预加载后一个网页需要的资源，那么用户打开后一个网页时，就会感觉速度飞快。

这两种方法都有缺点。第一种方法虽然减少了 HTTP 请求，但是把不同类型的代码合并在一个文件里，违反了分工原则。第二种方法只是提前了下载时间，并没有减少 HTTP 请求。

## 三、服务器推送的概念

服务器推送（server push）指的是，还没有收到浏览器的请求，服务器就把各种资源推送给浏览器。 

比如，浏览器只请求了`index.html`，但是服务器把`index.html`、`style.css`、`example.png`全部发送给浏览器。这样的话，只需要一轮 HTTP 通信，浏览器就得到了全部资源，提高了性能。

## 四、Nginx 实现

[Nginx](https://www.nginx.com/blog/nginx-1-13-9-http2-server-push/) 从 1.13.9 版开始，支持服务器推送。[前一篇教程](http://www.ruanyifeng.com/blog/2018/02/nginx-docker.html)已经做好了 Nginx 容器，接着就来体验一下。

首先，进入工作目录，把原来的首页删除。

```bash
$ cd nginx-docker-demo
$ rm html/index.html
```

然后，新建`html/index.html`文件，写入本文第一节的网页源码。

另外，`html`子目录下面，还要新建两个文件`example.png`和`style.css`。前者可以随便找一张 PNG 图片，后者要在里面写一些样式。

```css
h1 {
  color: red;
}
```

最后，打开配置文件`conf/conf.d/default.conf`，将 443 端口的部分改成下面的样子。

```bash
server {
    listen 443 ssl http2;
    server_name  localhost;

    ssl                      on;
    ssl_certificate          /etc/nginx/certs/example.crt;
    ssl_certificate_key      /etc/nginx/certs/example.key;

    ssl_session_timeout  5m;

    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers   on;

    location / {
      root   /usr/share/nginx/html;
      index  index.html index.htm;
      http2_push /style.css;
      http2_push /example.png;
    }
}
```

其实就是最后多了两行`http2_push`命令。它的意思是，如果用户请求根路径`/`，就推送`style.css`和`example.png`。

现在可以启动容器了。

```bash
$ docker container run \
  --rm \
  --name mynginx \
  --volume "$PWD/html":/usr/share/nginx/html \
  --volume "$PWD/conf":/etc/nginx \
  -p 127.0.0.2:8080:80 \
  -p 127.0.0.2:8081:443 \
  -d \
  nginx
```

打开浏览器，访问 https://127.0.0.2:8081 。浏览器会提示证书不安全，不去管它，继续访问，就能看到网页了。

网页上看不出来服务器推送，必须打开“开发者工具”，切换到 Network 面板，就可以看到其实只发出了一次请求，`style.css`和`example.png`都是推送过来的。

查看完毕，关闭容器。

```bash
$ docker container stop mynginx
```

## 五、Apache 实现实现

Apache 也类似，可以在配置文件`httpd.conf`或者`.htaccess`里面打开服务器推送。

```html
<FilesMatch "\index.html$">
    Header add Link "</styles.css>; rel=preload; as=style"
    Header add Link "</example.png>; rel=preload; as=image"
</FilesMatch>
```

## 六、后端实现

上面的服务器推送，需要写在服务器的配置文件里面。这显然很不方便，每次修改都要重启服务，而且应用与服务器的配置不应该混在一起。

服务器推送还有另一个实现方法，就是后端应用产生 HTTP 回应的头信息`Link`命令。服务器发现有这个头信息，就会进行服务器推送。

```bash
Link: </styles.css>; rel=preload; as=style
```

如果要推送多个资源，就写成下面这样。

```bash
Link: </styles.css>; rel=preload; as=style, </example.png>; rel=preload; as=image
```

可以参考 [Go](https://ops.tips/blog/nginx-http2-server-push/)、[Node](https://blog.risingstack.com/node-js-http-2-push/)、[PHP](https://blog.cloudflare.com/using-http-2-server-push-with-php/) 的实现范例。

这时，Nginx 的[配置](https://www.nginx.com/blog/nginx-1-13-9-http2-server-push/)改成下面这样。

```bash
server {
    listen 443 ssl http2;

    # ...

    root /var/www/html;

    location = / {
        proxy_pass http://upstream;
        http2_push_preload on;
    }
}
```

如果服务器或者浏览器不支持 HTTP/2，那么浏览器就会按照 preload 来处理这个头信息，预加载指定的资源文件。

事实上，这个头信息就是 preload 标准提出的，它的语法和`as`属性的值都写在了[标准](https://w3c.github.io/preload/#as-attribute)里面。

## 七、缓存问题

服务器推送有一个很麻烦的问题。所要推送的资源文件，如果浏览器已经有缓存，推送就是浪费带宽。即使推送的文件版本更新，浏览器也会优先使用本地缓存。

一种解决办法是，只对第一次访问的用户开启服务器推送。下面是 Nginx 官方给出的示例，根据 Cookie 判断是否为第一次访问。

```bash
server {
    listen 443 ssl http2 default_server;

    ssl_certificate ssl/certificate.pem;
    ssl_certificate_key ssl/key.pem;

    root /var/www/html;
    http2_push_preload on;

    location = /demo.html {
        add_header Set-Cookie "session=1";
        add_header Link $resources;
    }
}


map $http_cookie $resources {
    "~*session=1" "";
    default "</style.css>; as=style; rel=preload";
}
```


## 八、性能提升

服务器推送可以提高性能。网上[测评](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/#measuring-server-push-performance)的结果是，打开这项功能，比不打开时的 HTTP/2 快了8%，甚至比将资源都嵌入网页的 HTTP/1 快了5%。

可以提到，提升程度也不是特别多，大概是几百毫秒。而且，也不建议一次推送太多资源，这样反而会拖累性能，因为浏览器不得不处理所有推送过来的资源。只推送 CSS 样式表可能是一个比较好的选择。

## 九、参考链接

- [A Comprehensive Guide To HTTP/2 Server Push](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/)，by Jeremy Wagner
- [Introducing HTTP/2 Server Push with NGINX 1.13.9](https://www.nginx.com/blog/nginx-1-13-9-http2-server-push/), by Nginx

（完）