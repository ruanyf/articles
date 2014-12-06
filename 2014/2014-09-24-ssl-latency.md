# SSL延迟有多大？

据说，Netscape公司当年设计SSL协议的时候，有人提过，将互联网所有链接都变成HTTPs开头的加密链接。

这个建议没有得到采纳，原因之一是HTTPs链接比不加密的HTTP链接慢很多。（另一个原因好像是，HTTPs链接默认不能缓存。）

自从我知道这个掌故以后，脑袋中就有一个观念：HTTPs链接很慢。但是，它到底有多慢，我并没有一个精确的概念。直到今天我从一篇[文章](http://www.semicomplete.com/blog/geekery/ssl-latency.html)中，学到了测量HTTPs链接耗时的方法。

![slow connection](http://image.beekka.com/blog/2014/bg2014092401.jpg)

首先我解释一下，为什么HTTPs链接比较慢。

HTTPs链接和HTTP链接都建立在TCP协议上。HTTP链接比较单纯，使用三个握手数据包建立连接之后，就可以发送内容数据了。

![tcp handshake](http://image.beekka.com/blog/2014/bg2014092402.png)

上图中，客户端首先发送SYN数据包，浏览器收到后发送SYN+ACK数据包，客户端收到后发送ACK数据包，然后就可以发送内容了。这三个数据包的发送过程，就是HTTP链接握手阶段的耗时。

再来看HTTPs链接，它也采用TCP协议发送数据，所以它也需要上面的这三步握手过程。而且，在这三步结束以后，它还有一个单独的SSL协议的[握手过程](http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html)，这就叫做SSL延迟。

总结一下，就是下面这两个式子。

> HTTP耗时 = TCP握手
> 
> HTTPs耗时 = TCP握手 + SSL握手

所以，HTTPs肯定比HTTP耗时。

命令行工具curl有一个w参数，可以用来测量TCP握手和SSL握手的具体耗时。下面以访问支付宝为例。

```bash
$ curl -w "TCP handshake: %{time_connect}, SSL handshake: %{time_appconnect}\n" -so /dev/null https://www.alipay.com

TCP handshake: 0.022, SSL handshake: 0.064
```

上面命令中的w参数表示指定输出格式，time_connect变量表示TCP握手的耗时，time_appconnect变量表示SSL握手的耗时（更多变量请查看[文档](http://curl.haxx.se/docs/manpage.html)和[实例](https://josephscott.org/archives/2011/10/timing-details-with-curl/)），s参数和o参数用来关闭标准输出。

从运行结果可以看到，SSL握手的耗时（64毫秒）大概是TCP握手（22毫秒）的三倍。也就是说，在建立连接的阶段，HTTPs链接比HTTP链接要长3倍的时间，具体数字取决于CPU的快慢。

所以，如果是对安全性要求不高的场合，为了提高网页性能，建议不要采用保密强度很高的数字证书。一般场合下，1024位的证书已经足够了，2048位和4096位的证书将进一步延长SSL握手的耗时。

（完）








