# Allow

客户端使用`Allow`字段，通知服务器，客户端支持哪些 HTTP 方法。

Allow 用于通知客户端能够支持 Request-URI 指定资源的所有 HTTP 方法。当服务器接收到不支持的 HTTP 方法时，会以状态码 405 Method Not Allowed 作为响应返回。与此同时，还会把所有能支持的 HTTP 方法写入首部字段 Allow 后返回。

各个方法之间只用逗号分隔，下面是一个例子。

```http
Allow: GET, POST, HEAD, OPTIONS
```