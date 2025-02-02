# 中间件

中间件是在`onRequest()`之前运行的函数，必须放在`_middleware.js`脚本中。

在`_middleware.js`文件中，需要指定一个`onRequest`函数。 

下面是一个处理报错的中间件。

```typescript
export async function onRequest(context) {
  try {
    return await context.next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}
```

上面示例中，正常情况下交给`context.next()`来处理请求，如果报错就直接返回 500 状态码。

哪个路由需要中间件，`_middleware.js`文件就放在该目录中。比如，`functions/users/_middleware.js`会在所有访问`/users`开头的路径时运行。

如果需要定义一个对所有请求（包括静态文件）生效的中间件，就要创建一个`functions/_middleware.js`文件。

## 连锁中间件

多个中间件可以连锁起来，写成一个数组。

```typescript
async function errorHandling(context) {
  try {
    return await context.next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}

function authentication(context) {
  if (context.request.headers.get("x-email") != "admin@example.com") {
    return new Response("Unauthorized", { status: 403 });
  }

  return context.next();
}

export const onRequest = [errorHandling, authentication];
```

上面示例中，`errorHandling`会先运行，在其中通过`context.next()`调用`authentication`函数。
