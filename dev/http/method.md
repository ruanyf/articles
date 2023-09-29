# HTTP 方法

## GET 方法

GET 方法用于访问服务器的特定资源。

## POST 方法

POST 方法用来向服务器发送数据。

## PUT 方法

PUT 方法用来向服务器发送数据，一般只用在 REST API 里面。

## DELETE 方法

DELETE 方法用于删除文件。

## HEAD 方法

HEAD 方法只用来获得数据头，不需要数据体。除了不返回数据体，它跟 GET 方法是一致的。

```http
HEAD / HTTP/1.1
Host: example.com
```

## OPTIONS 方法

OPTIONS 方法表示不请求特定资源，而是了解服务器的总体情况，比如支持哪些方法。

```http
OPTIONS * HTTP/1.1
```

上面示例中，URL 部分是一个星号（`*`），表示不针对特定资源。

