# 　WWW-Authenticate 字段

WWW-Authenticate 只用于服务器的回应。它用于 HTTP 访问认证。它会告知客户端适用于访问请求 URI 所指定资源的认证方案（Basic 或是 Digest）和带参数提示的质询（challenge）。

状态码 401 Unauthorized 响应中，肯定带有首部字段 WWW-Authenticate。

```http
WWW-Authenticate: Basic realm="Usagidesign Auth"
```