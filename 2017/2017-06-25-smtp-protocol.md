# 如何验证 Email 地址：SMTP 协议入门教程

Email 是最常用的用户识别手段，通常需要验证地址的真实性。

常用的方法是向该地址发出一封验证邮件，要求用户阅读或回复该邮件。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017062501.png)

但是很多时候（比如要搞一次营销活动），拿到的就是数据库里面成千上万的 Email 地址，不可能通过回复来确认真实性，这时该怎么办呢？

答案就是使用 [SMTP 协议](http://baike.baidu.com/item/SMTP/175887?fromtitle=SMTP%E5%8D%8F%E8%AE%AE&fromid=421587)。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017062502.jpg)

## 一、SMTP 协议简介

SMTP 是“简单邮件传输协议”（Simple Mail Transfer Protocol）的缩写，用来发送电子邮件，基于 TCP 协议。

只要运行了该协议的服务器端（daemon），当前服务器就变为邮件服务器，可以接收电子邮件。

验证一个 Email 邮箱的真假，可以直接询问它所在域名的 SMTP 服务器，有没有这个邮箱。如果服务器返回 250  或 251 状态码，邮箱就是真的；如果返回 5xx（500～599），就是假的。

注意，即使服务器确认邮箱是真的， 也不代表邮件一定会发送到该邮箱，更不代表用户一定会读到该邮件。

## 二、查找域名的 MX 记录

下面通过一个例子，演示如何验证`test@gmail.com`这个邮箱。

首先，需要查找`gmail.com` 的 MX 记录。它指向真正处理邮件的那台服务器。

```bash
$ nslookup
> 
```

输入`nslookup`命令后，会提示一个大于号，表示等待用户进一步输入。

```bash
> set q=mx
> gmail.com
```

上面代码中，`set q=mx`设定查询的是 MX 记录，第二行输入要查找的域名，结果返回了5条 MX 记录。

```bash
Server:		192.168.1.1
Address:	192.168.1.1#53

Non-authoritative answer:
gmail.com	mail exchanger = 20 alt2.gmail-smtp-in.l.google.com.
gmail.com	mail exchanger = 30 alt3.gmail-smtp-in.l.google.com.
gmail.com	mail exchanger = 10 alt1.gmail-smtp-in.l.google.com.
gmail.com	mail exchanger = 5 gmail-smtp-in.l.google.com.
gmail.com	mail exchanger = 40 alt4.gmail-smtp-in.l.google.com.
```

`gmail.com`是很大的邮件服务商，所以会有五条记录，一般的域名只有一条。如果这一步查不到 MX 记录，该邮箱肯定是假的。更多 DNS 的介绍，请参考[《DNS 原理入门》](http://www.ruanyifeng.com/blog/2016/06/dns.html)。

## 三、建立 TCP 连接

知道了邮件服务器的地址，就可以与它建立 [TCP ](http://www.ruanyifeng.com/blog/2017/06/tcp-protocol.html) 连接了。SMTP 协议的默认端口是25。使用 Telnet 或 Netcat 命令，都可以连接该端口。

```bash
$ telent gmail-smtp-in.l.google.com 25
# 或者
$ nc gmail-smtp-in.l.google.com 25
```

如果服务器返回`220`状态码，就表示连接成功。

```bash
220 mx.google.com ESMTP f14si7006176pln.607 - gsmtp
```

接下来，就可以使用 SMTP 协议的各种命令与邮件服务器交互了。

## 四、HELO 命令和 EHLO 命令

SMTP 协议规定，连接成功后，必须向邮件服务器通报连接的域名，也就是邮件将从哪里发来。

假定我们从`mail@example.com`向`test@gmail.com`发送邮件，这里要通报的域名就是`example.com`。

```bash
HELO exampl.com
```

邮件服务器返回状态码`250`，表示响应成功。

```bash
250 mx.google.com at your service
```

`HELO`命令现在比较少用，一般都使用`EHLO`命令。

```bash
EHLO example.com
```

邮件服务器收到`EHLO`命令以后，不仅会返回`250`状态码，还会返回自己支持的各种扩展的列表。

```bash
250-mx.google.com at your service, [114.84.160.153]
250-SIZE 157286400
250-8BITMIME
250-STARTTLS
250-ENHANCEDSTATUSCODES
250-PIPELINING
250-CHUNKING
250 SMTPUTF8
```

## 五、MAIL FROM 命令

然后，连接者要使用`MAIL FROM`命令，向邮件服务器通报邮件的来源地址。

```bash
MAIL FROM:<mail@example.com>
```

上面代码表示，连接者将从`mail@example.com`向邮件服务器发送邮件。邮件服务器返回`250`状态码，表示响应成功。

```bash
250 2.1.0 OK h10si3194349otb.59 - gsmtp
```

SMTP 是一个很简单的协议，本身没有规定如何验证邮件的来源，也就是说，不验证邮件是否真的从`mail@example.com`发来，所以导致了后来垃圾邮件泛滥。为了控制垃圾邮件，许多邮件服务器会用自己的方法验证邮件地址，下面就是其中的一些方法。

> - example.com 是否有 MX 记录
> - example.com 是否可以 Ping 通
> - 是否存在 postmaster@example.com 这个邮箱
> - 发起连接的 IP 地址是否在黑名单之中
> - IP 地址的反向 DNS 解析，是否指向一个邮件服务器

## 六、RCPT TO 命令

最后一步就是使用`RCPT TO`命令，验证邮件地址是否存在。

```bash
RCPT TO:<test@gmail.com>
```

邮件服务器返回了`550`状态码，表示该 Email 地址不存在。

```bash
550-5.1.1 The email account that you tried to reach does not exist. Please try
550-5.1.1 double-checking the recipient's email address for typos or
550-5.1.1 unnecessary spaces. Learn more at
550 5.1.1  https://support.google.com/mail/?p=NoSuchUser p34si3372771otp.228 - gsmtp
```

如果查询的是一个真实的 Email 地址，邮件服务器就会返回`250`状态码。

```bash
RCPT TO:<yifeng.ruan@gmail.com>
250 2.1.5 OK p34si3372771otp.228 - gsmtp
```

一般来说，状态码 250 和 251 都表示邮箱存在，状态码 5xx 表示不存在，其他状态码（主要是 4xx）则代表无法确认。

```bash
RCPT TO:<xxx@censored.pl>
451 Temporary local problem - please try later
```

验证完成后，使用`QUIT`命令关闭 TCP 连接。

```bash
QUIT
221 2.0.0 closing connection p34si3372771otp.228 - gsmtp
```

## 七、参考链接

- [How to Verify Email Address](http://blog.online-domain-tools.com/2014/11/14/how-to-verify-email-address/)
- [Simple Mail Transfer Protocol](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol)

（正文完）