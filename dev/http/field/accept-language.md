# Accept-Language 字段

Accept-Language 只用于客户端的请求。它用来告知服务器用户代理能够处理的自然语言集（指中文或英文等），以及自然语言集的相对优先级。可一次指定多种自然语言集。

```http
Accept-Language: zh-cn,zh;q=0.7,en-us,en;q=0.3
```

和 Accept 首部字段一样，按权重值 q 来表示相对优先级。

在上例中，客户端在服务器有中文版资源的情况下，会请求其返回中文版对应的响应，没有中文版时，则请求返回英文版响应。

