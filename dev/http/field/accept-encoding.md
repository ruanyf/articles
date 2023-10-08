# Accept-Encoding 字段

Accept-Encoding 只用于客户端的请求。它用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。可一次性指定多种内容编码。

```http
Accept-Encoding: gzip, deflate
```

常见的编码格式如下。

- gzip：使用 Lempel-Ziv 算法（LZ77）
- compress：使用 Lempel-Ziv-Welch 算法（LZW）。
- deflate： 使用 deflate 压缩算法。
- identity：不执行压缩或不会变化的默认编码格式。

权重 q 值来表示相对优先级。另外，也可使用星号（*）作为通配符，指定任意的编码格式。
