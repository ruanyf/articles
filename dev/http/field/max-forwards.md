#　Max-Forwards

Max-Forwards 只用于客户端的请求。每次中间服务器转发，该字段的数值减 1。当数值变 0 时返回响应。

```http
Max-Forwards: 10
```

通过 TRACE 方法或 OPTIONS 方法，发送包含首部字段 Max-Forwards 的请求时，该字段以十进制整数形式指定可经过的服务器最大数目。服务器在往下一个服务器转发请求之前，Max-Forwards 的值减 1 后重新赋值。当服务器接收到 Max-Forwards 值为 0 的请求时，则不再进行转发，而是直接返回响应。

Max-Forwards 主要用于对通信中断的情况进行调查，确定在哪一步的中间服务器出现问题。