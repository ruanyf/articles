# RESTful API 最佳实践

RESTful 是目前最流行的 API 设计规范，用于规范客户端与服务器的数据交互接口。

它的大原则容易把握，但是细节不容易做对。这篇文章就是总结 API 的设计细节，介绍怎么设计出易于理解和使用的 API。

## 一、URL 设计

### 1.1 动词 + 谓语

REST 的核心思想就是，客户端发出的数据操作指令都是“动词 + 谓语”的结构。比如，`GET /articles`这个命令，`GET`是动词，`/articles`是谓语。

动词通常只有五个。就是下面五种 HTTP 方法，分别对应 CRUD 操作。

> - GET：读取（Read）
> - POST：新建（Create）
> - PUT：更新（Update）
> - PATCH：更新（Update），通常是部分更新
> - DELETE：删除（Delete）

### 1.2 动词的覆盖

有些客户端对动词有限制，只能使用`GET`和`POST`这两个动词。

但流行的约定是接受一个请求头X-HTTP-Method-Override，其字符串值包含PUT，PATCH或DELETE之一。

宾语就是服务器的 API。这就是说，服务器 API 的网址应该是名词，不能是动词。比如，`/articles`这样的网址就是正确的，而下面这样的动词 URL 都是错误的。

- /getAllCars
- /createNewCar
- /deleteAllRedCars

## 复数 URL

URL 到底应该是复数，还是单数？这没有统一的看法，但是如果需要返回数据的集合，比如`GET /articles`，那 URL 明显应该是复数。

所以，为了统一起见，建议都使用复数 URL，即`GET /articles/2`要好于`GET /article/2`。

## 避免多层级的 URL

URL 表示某种资源。一种很常见的情况是，资源需要分类，因此很容易写出资源嵌套的 URL，比如获取某个作者的所有文章。

```http
GET /authors/12/articles
```

这种 URL 不利于扩展，语义也不明确，查询对象到底是作者，还是文章？

更好的做法是，过滤条件使用查询字符串表达。

```http
GET /articles?author_id=12
```

API 最多只有两层。

下面是另一个例子。查询已发布的文章，你可以会设计成嵌套的 URL。

```http
GET /articles/published/
```

查询字符串的写法明显更好。

```http
GET /articles/?published=true```
```

## 状态码

每一次操作，服务器都必须给出回应。回应分成状态码和数据两部分。

状态码就是一个三位数的数字。`1xx`表示相关信息，`2xx`表示成功，`3xx`表示重定向，`4xx`表示客户端错误和表示`5xx`服务器错误。

几个主要操作的成功状态码，可以都是`200`，但也可以设置得更精确一些。

- GET: 200 OK
- POST: 201 Created
- PUT: 200 OK
- PATCH: 200 OK
- DELETE: 204 No Content

- 401 Unauthorized
- 403 Forbidden

用户未提供身份验证凭据，或者没有通过身份验证，返回`401 Unauthorized`。

用户通过了身份验证，但是不具有访问资源所需的权限，返回`403 Forbidden`。

`202 Accepted`可以作为`201 Created`的补充，用于异步操作。表示服务器了解用户的要求，但是还没有创建资源，将在未来某个时间进行创建。

HTTP/1.1 303 See Other
Location: /api/orders/12345

- **303 See Other** 参考其他位置。通常用于异步操作，异步操作在其他位置创建了资源。
-   **304 Not Modified**表示客户端已在其缓存中有响应。因此无需再次传输相同的数据。

-   **400 Bad Request** 服务器不理解客户端的请求，未做任何处理。
-   **404 Not Found** 所请求的资源不存在，或不可用。
- -   405 Method Not Allowed  - When an HTTP method is being requested that isn't allowed for the authenticated user
-   **410 Gone** 所请求的资源已从这个地址转移，不再可用。
- 415 Unsupported Media Type：客户端要求的返回格式不是 JSON
- 422 – Unprocessable Entity – ：客户端上传的附件无法处理，导致请求失败。Should be used if the server cannot process the enitity, e.g. if an image cannot be formatted or mandatory fields are missing in the payload.
- [429 Too Many Requests](http://tools.ietf.org/html/rfc6585#section-4) 请求超过限额。
-   **500 Internal Server Error**  客户端请求有效，服务器处理时发生了意外。
-   **503 Service Unavailable** 服务器瘫痪或无法处理请求，一般用于网站维护。


## 不要返回纯本文

服务器回应的数据，不应该是纯文本，应该是一个 JSON 对象，这样才能返回结构化数据。

相应地，服务器回应的 HTTP 头信息的`Content-Type`属性要设为`application/json`。

客户端请求时，HTTP 头信息需要提供`ACCEPT`属性。

```http
GET  https://adventure-works.com/orders/2 HTTP/1.1 
Accept: application/json
```

## 发生错误时，不要返回 200 状态码

有一个做法是，不管操作是否成功，统一返回200状态码，具体的状态显示在数据体里面，就像下面这样。

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "status": "failure",
    "data": {
        "error": "Expected at least two items in list."
    }
}
```

这张做法使得状态码无法表达语义，正确的做法是把错误反映在状态码上，同时把错误信息在数据体里面返回。

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "error": "Invalid payoad.",
    "detail": {
        "surname": "This field is required."
    }
}
```

## 提供链接

API 的使用者未必知道，URL 是怎么设计的。一个解决方法就是，在回应中，给出相关链接，便于下一步操作。这种方法叫做 HATEOAS

```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status":"In progress",
   "link": {"rel":"cancel","method":"delete", "href":"/api/status/12345" } 
}
```

## 参考链接

- [RESTful API Design: 13 Best Practices to Make Your Users Happy](https://blog.florimondmanca.com/restful-api-design-13-best-practices-to-make-your-users-happy), by Florimond Manca
- [API design](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design), by MicroSoft Azure



