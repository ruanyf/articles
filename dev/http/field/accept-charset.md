# Accept-Charset 字段

Accept-Charset 只用于客户端的请求。

它用来通知服务器用户代理支持的字符集及字符集的相对优先顺序。另外，可一次性指定多种字符集。与首部字段 Accept 相同的是可用权重 q 值来表示相对优先级。

```http
Accept-Charset: iso-8859-5, unicode-1-1;q=0.8
```