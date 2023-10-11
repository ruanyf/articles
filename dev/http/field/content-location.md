# Content-Location

Content-Location 给出与报文主体部分相对应的 URI。和首部字段 Location 不同，Content-Location 表示的是报文主体返回资源对应的 URI。

比如，对于使用首部字段 Accept-Language 的服务器驱动型请求，当返回的页面内容与实际请求的对象不同时，首部字段 Content-Location 内会写明 URI。（访问 http://www.hackr.jp/
 返回的对象却是 http://www.hackr.jp/index-ja.html
 等类似情况）

```http
Content-Location: http://www.hackr.jp/index-ja.html
```