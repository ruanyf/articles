# HTTP笔记

如今，一张网页通常要发出80到100个HTTP请求（request）。浏览器会同时跟服务器保留6个连接（connection）。

[HTTP/2](http://http2.github.io/http2-spec/)是一个二进制协议，浏览器与服务器之间交换[“数据框”](http://http2.github.io/http2-spec/#FramingLayer)（frame）。每个数据框属于一个[数据流](http://http2.github.io/http2-spec/#StreamsLayer)（stream），每个数据流有一个编号（identifier）。这些数据流都是多工的（multiplexed），即浏览器可以向服务器发送，服务器也可以向浏览器发送。

与HTTP 1.1不同，HTTP/2的信息头也是压缩的，使用HPACK算法。另外，HTTP/2协议规定，服务器也可以向浏览器推送信息。


