#　Range 字段

Range 只用于客户端的请求。

对于只需获取部分资源的范围请求，包含首部字段 Range 即可告知服务器资源的指定范围。

```http
Range: bytes=5001-10000
```

上面的示例表示请求获取从第 5001 字节至第 10000 字节的资源。

接收到附带 Range 首部字段请求的服务器，会在处理请求之后返回状态码为 206 Partial Content 的响应。无法处理该范围请求时，则会返回状态码 200 OK 的响应及全部资源。