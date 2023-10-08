# Upgrade 字段

`Upgrade`用于检测 HTTP 协议及其他协议是否可使用更高的版本进行通信，其参数值可以用来指定一个完全不同的通信协议。

```http
Upgrade: TLS/1.0
Connection: Upgrade
```

Upgrade 字段只对客户端和邻接服务器之间的通信产生作用。因此，使用 Upgrade 时，还需要额外指定`Connection:Upgrade`。

对于附有首部字段 Upgrade 的请求，服务器可用 101 Switching Protocols 状态码作为响应返回。