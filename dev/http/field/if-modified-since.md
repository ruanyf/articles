# If-Modified-Since

If-Modified-Since 只用于客户端的请求。

如果在 If-Modified-Since 字段指定的日期时间后，资源发生了更新，服务器会接受请求。

```http
If-Modified-Since: Thu, 15 Apr 2004 00:00:00 GMT
```

该字段告知服务器若 If-Modified-Since 字段值早于资源的更新时间，则希望能处理该请求。而在指定 If-Modified-Since 字段值的日期时间之后，如果请求的资源都没有过更新，则返回状态码 304 Not Modified 的响应。

If-Modified-Since 用于确认客户端或中间服务器拥有的本地资源的有效性。获取资源的更新日期时间，可通过确认首部字段 Last-Modified 来确定。