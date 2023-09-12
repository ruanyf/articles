# HTTP 协议

## 简介

HTTP/1.x 是一种纯文本协议，描述客户端和服务器之间的通信。客户端发送这样的消息：

```http
POST /anything/chat HTTP/1.1
host: httpbingo.org
content-type: application/json
user-agent: curl/7.87.0

{
    "message": "Hello!"
}
```

并收到这样的响应消息：

```http
HTTP/1.1 200 OK
date: Mon, 28 Aug 2023 07:51:49 GMT
content-type: application/json

{
    "message": "Hi!"
}
```

HTTP/2 是一种二进制协议。不过，所有工具都以纯文本形式显示HTTP/2消息。

## HTTP 数据结构

### HTTP 请求

HTTP 请求由三个主要部分组成。

（1）请求行。

```http
POST /anything/chat HTTP/1.1
```

- 方法（POST）：定义客户端想要执行的操作。
- 路径（/anything/chat）：所请求资源的 URL（不带协议、域和端口）。
- 版本（HTTP/1.1）：HTTP 协议的版本。

（2）数据头

```http
host: httpbingo.org
content-type: application/json
user-agent: curl/7.87.0
```

每行都是一个键值对，告诉服务器有关请求的一些有用信息。在上例中，它是服务器的主机名 (httpbingo.org)、内容的类型 ( application/json) 和客户端的自我标识 (user-agent)。

（3）数据体。

```http
{
    "message": "Hello!"
}
```

客户端发送到服务器的实际数据。

HTTP 协议是无状态的，因此任何状态都必须包含在请求本身中，无论是在标头中还是在正文中。

### HTTP 响应

HTTP 响应也包含三个主要部分：

（1）状态行

```http
HTTP/1.1 200 OK
```

- 版本( )HTTP/1.1表示 HTTP 协议的版本。
- 状态码（200）告诉请求是否成功，以及为什么（不同情况有很多种状态码）。
- 状态消息是状态代码的人类可读的描述。HTTP/2 没有它。

（2）响应头

```http
date: Mon, 28 Aug 2023 07:51:49 GMT
content-type: application/json
```

与请求标头类似，它们提供有关对客户端的响应的有用信息。

（3）响应正文

```http
{
    "message": "Hi!"
}
```

服务器发送给客户端的实际数据。

