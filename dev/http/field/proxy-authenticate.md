# Proxy-Authenticate 字段

Proxy-Authenticate 把由代理服务器所要求的认证信息发送给客户端。

```http
Proxy-Authenticate: Basic realm="Usagidesign Auth";
```

它与客户端和服务器之间的 HTTP 访问认证的行为相似，不同之处在于其认证行为是在客户端与代理之间进行的。而客户端与服务器之间进行认证时，首部字段 WWW-Authorization 有着相同的作用。