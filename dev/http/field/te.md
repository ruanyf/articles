# TE

TE 只用于客户端的请求。它告知服务器，客户端能够处理响应的传输编码方式及相对优先级。它和首部字段 Accept-Encoding 的功能很相像，但是用于传输编码。

```http
TE: gzip, deflate;q=0.5
```

TE 除指定传输编码之外，还可以指定伴随 trailer 字段的分块传输编码的方式。应用后者时，只需把 trailers 赋值给该字段值。

```http
TE: trailers
```