# Content-Range 字段

Content-Range

针对范围请求，返回响应时使用的首部字段 Content-Range，能告知客户端作为响应返回的实体的哪个部分符合范围请求。字段值以字节为单位，表示当前发送部分及整个实体大小。

```http
Content-Range: bytes 5001-10000/10000
```
