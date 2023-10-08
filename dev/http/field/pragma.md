# Pragma 字段

Pragma 是 HTTP/1.1 之前版本的历史遗留字段，仅为了向后兼容而保留。

它只用于客户端请求，只有一种使用形式，要求所有的中间服务器不返回缓存。

```http
Pragma: no-cache
```

如果所有的中间服务器都支持 HTTP/1.1，直接采用`Cache-Control: no-cache`。否则，请求会同时含有下面两个字段。

```http
Cache-Control: no-cache
Pragma: no-cache
```

