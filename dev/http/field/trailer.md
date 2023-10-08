# Trailer 字段

Trailer 说明在数据体尾部还有哪些字段。它主要用于 HTTP/1.1 分块传输数据的场合。

```http

HTTP/1.1 200 OK
Date: Tue, 03 Jul 2012 04:40:56 GMT
Content-Type: text/html
...
Transfer-Encoding: chunked
Trailer: Expires



...(报文主体)...
0
Expires: Tue, 28 Sep 2004 23:59:59 GMT
```

上面示例中，`Trailer`字段指明在数据体尾部，还有 Expires 字段。
