# Referer 字段

Referer 只用于客户端的请求。它用于告知服务器请求的原始资源的 URI。

```http
Referer: http://www.hackr.jp/index.htm
```

客户端一般都会发送 Referer 首部字段给服务器。但当直接在浏览器的地址栏输入 URI，或出于安全性的考虑时，也可以不发送该首部字段。

因为原始资源的 URI 中的查询字符串可能含有 ID 和密码等保密信息，要是写进 Referer 转发给其他服务器，则有可能导致保密信息的泄露。

另外，Referer 的正确的拼写应该是 Referrer。