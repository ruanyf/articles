# hono.js

## 安装

```bash
$ npm create hono@latest my-app
$ cd my-app
$ npm i
$ npm run dev
```

在 src/index.ts 开始编写应用程序。

## 基本用法

```bash
import { Hono } from 'hono'
const app = new Hono()

app.get('/', (c) => c.text('Hono!'))

export default app
```

你也可以直接返回 Response 对象。

```javascript
app.get('/', (c) => {
  return new Response('Good morning!')
})
```

HTTP 方法

```javascript
app.post('/posts', (c) => c.text('Created!', 201))
app.delete('/posts/:id', (c) =>
  c.text(`${c.req.param('id')} is deleted!`)
)
```

## 路由

通配符

```javascript
app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})
```

## 中间件

基本身份认证的例子。

```javascript
import { basicAuth } from 'hono/basic-auth'

// ...

app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret',
  })
)

app.get('/admin', (c) => {
  return c.text('You are authorized!')
})
```

添加 etag 和 日志的例子

```javascript
import { Hono } from 'hono'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'

const app = new Hono()
app.use(etag(), logger())
```

中间件的写法

```javascript
app.use(async (c, next) => {
  const start = Date.now()
  await next()
  const end = Date.now()
  c.res.headers.set('X-Response-Time', `${end - start}`)
})
```

## API

hono 实例方法

- app.get(path, callback)
- app.post()
- app.put()
- app.delete()
- app.use(middleware,...)

context 属性

- context.env
- context.req: Request
- context.res: Response

context 方法

- context.html(html)
- context.text(txt)
- context.json(obj)

## cloudflare worker

cloudflare worker 可以返回自定义对象。

```javascript
const app = new Hono()

export default {
  fetch: app.fetch,
  scheduled: async (batch, env) => {},
}
```


