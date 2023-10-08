# Authorization 字段

Authorization 只用于客户端的请求。它用来告知服务器，用户代理的认证信息（证书值）。

通常来说，客户端在接收到服务器返回的 401 状态码后，就把 Authorization 字段加入请求中。

```http
Authorization: Basic dWVub3NlbjpwYXNzd29yZA==
```
