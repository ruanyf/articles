# Connection 字段

Connection 字段可以用于客户端的请求，也可以用于服务器的回应。

（1）不再转发的数据头字段。

中间服务器收到请求或回应后，将不再发出`Connection`字段指明的字段。

```http
Upgrade: Http/1.1
Connection: Upgrade
```

上面示例中，中间服务器将不再转发 Upgrade 字段。

（2）管理持久连接

服务器回应里面，该字段表示结束持久连接。

```http
Connection: close
```

HTTP/1.1 之前的版本，默认使用非持久连接。如果想在旧版本的 HTTP 协议上，使用持续连接，就需要使用下面的命令。

```http
Connection: Keep-Alive
```

服务器收到以后，为了维持持久连接，也必须在回应里面指定`Connection: Keep-Alive`。

HTTP/1.1 默认使用持久连接，所以不需要使用上面的命令。

当服务器端想明确断开连接时，则指定 Connection 首部字段的值为 Close。