# If-Unmodified-Since 字段

If-Unmodified-Since 只用于客户端的请求。

首部字段 If-Unmodified-Since 和首部字段 If-Modified-Since 的作用相反。它的作用的是告知服务器，指定的请求资源只有在字段值内指定的日期时间之后，未发生更新的情况下，才能处理请求。如果在指定日期时间后发生了更新，则以状态码 412 Precondition Failed 作为响应返回。

```http
If-Unmodified-Since: Thu, 03 Jul 2012 00:00:00 GMT
```
