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

## HTTP/2协议的特点

- 二进制传输
- 多工的流传输（多个流可以混合在一个连接中传递，流可以理解成组成responce的单位）
- 不同的数据流，可以指定优先性和所依赖的流
- 信息头压缩
- 传统的HTTP连接，在发出Content-Length以后，不能终止传输，否则只能新建另一个TCP连接。HTTP/2允许重置（reset）某个流，传输一个新的流。
- 服务器推送

## 参考网址

- Iliyan Peychev, [HTTP 2.0 is coming, be ready](HTTP 2.0 is coming, be ready)
- Daniel Stenberg, [http2 explained](http://daniel.haxx.se/http2/)
