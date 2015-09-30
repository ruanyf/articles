# HTTP笔记

如今，一张网页通常要发出80到100个HTTP请求（request）。浏览器会同时跟服务器保留6个连接（connection）。

[HTTP/2](http://http2.github.io/http2-spec/)是一个二进制协议，浏览器与服务器之间交换[“数据框”](http://http2.github.io/http2-spec/#FramingLayer)（frame）。每个数据框属于一个[数据流](http://http2.github.io/http2-spec/#StreamsLayer)（stream），每个数据流有一个编号（identifier）。这些数据流都是多工的（multiplexed），即浏览器可以向服务器发送，服务器也可以向浏览器发送。

与HTTP 1.1不同，HTTP/2的信息头也是压缩的，使用HPACK算法。另外，HTTP/2协议规定，服务器也可以向浏览器推送信息。

![](/image/http-connection-2014-12-06.png)

1. 客户端请求page.html
2. 服务器发现网页包含script.js，就自己向浏览器发送stream 2，发送该脚本。
3. 服务器发起Stream 3，向浏览器推送style.css。

使用HTTP/2时，HTTP请求的数量不再是一个问题，优化主要集中在减小文件体积，利用好缓存。

以下的网页优化今后将不再需要。

- 文件合并
- 域名分设（Domain sharding）：这一步应该首先去除，因为它增加DNS查找的时间。Sharding的原因有两个，一个不占用TCP请求通道；二是为图片等静态资源，新增没有cookie的域名。
- 行内资源（Resource inlining）：data URL
- Image sprites
- 使用不含cookie的域名

HTTP 1.1定义了pipelining，允许一个请求尚未得到回应的情况下，就发出另一个请求。但是，大多数浏览器默认没有打开这项功能。

发出HTTP请求就像在超市排队付款，一共只有6条队伍，前面的人排满了，后面的人就只有等着。

HTTP/2需要兼容HTTP 1.1，两者使用同样的协议符`http://`，所以需要一种自动协议升级机制。HTTP 1.1定义了HTTP信息头`Upgrade: header`，代价是多一次通信往返。但是，HTTP/2没有采用这种方法，而是采用了一种TLS协议扩展Next Protocol Negotiation（错写NPN），服务器告诉浏览器自己支持哪些协议，然后浏览器选择所要采用的协议。但是，HTTP/2没有采用这种方法，而是采用另一种机制ALPN（Application Level Protocol Negotiation），具体做法是浏览器告诉服务器它支持的协议顺序，服务器挑选它所要采用的一种。

## HTTP/2协议

2015年2月，IETF发布新版HTTP标准HTTP/2。

只有使用加密协议的站点，才能使用HTTP/2。

### HTTP/2协议的特点

- 二进制传输
- 多工的流传输Multiplexing（多个流可以混合在一个连接中传递，流可以理解成组成response的单位）
- 不同的数据流，可以指定优先性和所依赖的流Dependencies and prioritization
![](https://blogs.akamai.com/assets_c/2015/02/Ludkin%20Blog%20Image%203-thumb-400x508-3507.png)
- 信息头压缩Header compression
- 传统的HTTP连接，在发出Content-Length以后，不能终止传输，否则只能新建另一个TCP连接。HTTP/2允许重置（reset）某个流，传输一个新的流。
- 服务器推送Server push

### 与HTTP 1.1的比较

（1）请求的对象数目

HTTP 1.1 ：对于同一个TCP连接，一次只能请求一个对象。只有收到服务器回应后，才能请求下一个对象。

![](https://blogs.akamai.com/assets_c/2015/02/Ludkin%20Blog%20Image%201-thumb-400x523-3495.png)

HTTP/2：启用了多工（multiplexing），对于同一个TCP连接，浏览器能够送出任意数目的请求，收到的HTTP请求是没有次序的。

![](https://blogs.akamai.com/assets_c/2015/02/Ludkin%20Blog%20Image%202-thumb-400x579-3501.png)

（2）HTTP头信息的压缩

HTTP 1.1：每次请求，浏览器需要提供许多session信息，这部分要占据大量的HTTP头信息，造成每次请求的体积很大。

HTTP/2：浏览器和服务器都会对HTTP头信息进行压缩。此外，完整的头信息只需要送出一次。

（3）

HTTP 1.1：通信只能由客户端发起，这意味着服务器只能收到请求后，推送资源到客户端。

HTTP/2：服务器能够发起通信，推送到客户端。这就能够减少GET请求的数目。

## HTTP信息头

### Cache-Control

提供Cache控制。

- max-age=[seconds] 当前cache最长保存时间
- s-maxage=[seconds] 类似max-age，但只用于共享cache（即proxy服务器）
- public 表示已认证的HTTP回应也可以共享cache（proxy服务器）
- private 表示cache只能用于浏览器，不能用于proxy
- no-cache 严格声明每次都要向服务器验证
- no-store 不能保存cache
- must-revalidate 一旦缓存过期，就要重新验证
- proxy-revalidate 类似must-revalidate，但是只用proxy服务器

```http
Cache-Control: max-age=3600, must-revalidate
```

Cache-Control的优先性高于Expires。

### Expires

网页何时过期。

```http
Expires: Fri, 30 Oct 1998 14:19:41 GMT
```

### 安全相关的HTTP头信息

- Content-Security-Policy
  - Content-Security-Policy-Report-Only
  - X-Webkit-Content-Security-Policy
  - X-Content-Security-Policy
- Public-Key-Pins
  - Public-Key-Pins-Report-Only
- Strict-Transport-Security
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- X-Download-Options
- X-Permitted-Cross-Domain-Policies

## 参考网址

- Iliyan Peychev, [HTTP 2.0 is coming, be ready](HTTP 2.0 is coming, be ready)
- Daniel Stenberg, [http2 explained](http://daniel.haxx.se/http2/)
- Stephen Ludin, [With HTTP/2, Akamai Introduces Next Gen Web](https://blogs.akamai.com/2015/02/with-http2-akamai-introduces-next-gen-web.html)
