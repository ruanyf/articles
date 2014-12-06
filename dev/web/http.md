# HTTP笔记

如今，一张网页通常要发出80到100个HTTP请求（request）。浏览器会同时跟服务器保留6个连接（connection）。

[HTTP/2](http://http2.github.io/http2-spec/)是一个二进制协议，浏览器与服务器之间交换[“数据框”](http://http2.github.io/http2-spec/#FramingLayer)（frame）。每个数据框属于一个[数据流](http://http2.github.io/http2-spec/#StreamsLayer)（stream），每个数据流有一个编号（identifier）。这些数据流都是多工的（multiplexed），即浏览器可以向服务器发送，服务器也可以向浏览器发送。

与HTTP 1.1不同，HTTP/2的信息头也是压缩的，使用HPACK算法。另外，HTTP/2协议规定，服务器也可以向浏览器推送信息。

![](http-connection-2014-12-06.png)

1. 客户端请求page.html
2. 服务器发现网页包含script.js，就自己向浏览器发送stream 2，发送该脚本。
3. 服务器发起Stream 3，向浏览器推送style.css。

使用HTTP/2时，HTTP请求的数量不再是一个问题，优化主要集中在减小文件体积，利用好缓存。

以下的网页优化今后将不再需要。

- 文件合并
- 域名分设（Domain sharding）：这一步应该首先去除，因为它增加DNS查找的时间
- 行内资源（Resource inlining）
- Image sprites
- 使用不含cookie的域名

## 参考网址

- Iliyan Peychev, [HTTP 2.0 is coming, be ready](HTTP 2.0 is coming, be ready)
