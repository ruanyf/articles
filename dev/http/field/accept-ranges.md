# Accept-Ranges 字段

Accept-Ranges 只用于服务器的回应，用来告知客户端，服务器是否能处理范围请求，以指定获取服务器端某个部分的资源。

可指定的字段值有两种，可处理范围请求时指定其为 bytes，反之则指定其为 none。

```http
Accept-Ranges: bytes
```

当不能处理范围请求时，返回`Accept-Ranges: none`。