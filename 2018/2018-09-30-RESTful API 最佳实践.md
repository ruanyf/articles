# RESTful API 最佳实践

REST 主要用于构建 API。完成客户端与服务器的数据交互。

## 动宾结构

REST 的核心思想就是，每个数据操作的命令都是动宾结构。

动词是 HTTP 方法，对应 CRUD 操作。

- GET：读取（Read）
- POST：新建（Create）
- PUT：更新（Update）
- PATCH：更新（Update）
- DELETE：删除（Delete）

宾语就是服务器的 API。这就是说，服务器 API 的网址应该是名词，不能是动词。比如，`/articles`这样的网址就是正确的，而下面这样的动词 URL 都是错误的。

- /getAllCars
- /createNewCar
- /deleteAllRedCars

## 复数 URL

URL 到底应该是复数，还是单数？这没有统一的看法，但是如果需要返回数据的集合，比如`GET /articles`，那 URL 明显应该是复数。

所以，为了统一起见，建议都使用复数 URL，即`GET /articles/2`要好于`GET /article/2`。

## 避免资源嵌套

URL 表示某种资源。一种很常见的情况是，资源需要分类，因此很容易写出资源嵌套的 URL，比如获取某个作者的所有文章。

```http
GET /authors/12/articles
```

这种 URL 不利于扩展，语义也不明确，查询对象到底是作者，还是文章？

更好的做法是，过滤条件使用查询字符串表达。

```http
GET /articles?author_id=12
```

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

`202 Accepted`可以作为`201 Created`的补充，表示服务器了解用户的要求，但是还没有创建资源，将在未来某个时间进行创建。

## 不要返回纯本文

服务器回应的数据，不应该是纯文本，应该是一个 JSON 对象，这样才能返回结构化数据。

相应地，服务器回应的 HTTP 头信息的`Content-Type`属性要设为`application/json`。

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

## 参考链接

- [RESTful API Design: 13 Best Practices to Make Your Users Happy](https://blog.florimondmanca.com/restful-api-design-13-best-practices-to-make-your-users-happy), by Florimond Manca



