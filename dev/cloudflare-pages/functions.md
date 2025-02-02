# Cloudflare Pages 页面函数

## 简介

Cloudflare Pages 提供 functions 功能，让静态页面可以调用服务端的云函数。

页面函数的脚本文件，统一放在项目根目录下的`functions`子目录。

## 静态路由

`functions`子目录里面的脚本名和目录结构，对应项目的目录结构。

|文件路径|路由|
|-------|---|
|/functions/index.js | example.com |
| /functions/helloworld.js | example.com/helloworld |
| /functions/howdyworld.js | example.com/howdyworld |
| /functions/fruits/index.js | example.com/fruits |
| /functions/fruits/apple.js | example.com/fruits/apple |
| /functions/fruits/banana.js | example.com/fruits/banana |

路径结尾的目录斜杠可以省略，对于`/foo`和`/foo/`的请求，都会导向`/functions/foo.js`或`/functions/foo/index.js`（如果这两个文件都存在，那么 index.js 优先于 foo.js）。

如果没有对应的云函数，那么请求就会转向对应的静态资源。

## 动态路由

动态路由需要在文件名外面加一对方括号（`[]`）。比如，`/users/[user].js`可以匹配下面的路径`/users/nevi`和`/users/daniel`。

如果要匹配多层路径，文件名外面要加双层方括号。比如，`/users/[[user]].js`可以匹配下面的路径`/users/nevi/foobar`和`/users/daniel/xyz/123`。

静态路由优先于动态路由。比如，有两个脚本`users/special.js`和`users/[user].js`，对于路径`/users/special`的请求会匹配`users/special.js`，而不是`users/[user].js`。

动态路由捕捉到的参数，会出现在请求的`context.params`参数上。

```javascript
export function onRequest(context) {
  return new Response(context.params.user)
}
```

双层方括号补货的参数，返回的是一个数组。

## _routes.json

项目输出目录中的 _routes.json 文件定义了何时调用云函数。如果使用 wrangler 发布项目，该文件会自动生成。

下面示例是所有路径上调用云函数。

```json
{
   "version": 1,
   "include": ["/*"],
   "exclude": []
}
```

下面示例是除了`/build`以外的其他路径都调用云函数。

```json
{
   "version": 1,
   "include": ["/*"],
   "exclude": ["/build/*"]
}
```

_routes.json 文件的要求

- 至少有一条 include 规则
- include/exclude 规则总计不得超过100条
- 每条规则不得多于100个字符。

## 请求处理函数

脚本文件里面需要有请求处理函数。

```javascript
export function onRequest(context) {
  return new Response("Hello, world!");
}
```

请求处理函数`onRequest()`的参数是一个上下文对象`context`。

`onRequest()`函数的返回值，必须是一个 Response 对象或者 Response 的 Promise 包装对象。

动态路由匹配的路径，存在`context.params`参数。

```javascript
// functions/users/[user].js

export function onRequest(context) {
  return new Response(context.params.user)
}
```

上面示例中，动态路由`[user].js`的`user`匹配的路径就存在`context.params.user`。比如，请求的路径是`/users/daniel`，那么`context.params.user`就是`daniel`。

对于多层路径，匹配的值会保存成一个数组，存在`context.params`参数。

```javascript
// functions/users/[[catchall]].js

export function onRequest(context) {
  return new Response(JSON.stringify(context.params.catchall))
}
```

上面示例中，访问路径`/users/daniel/xyz/123`，那么`context.params.catchall`就是一个数组`["daniel", "xyz", "123"]`。

onRequest() 函数可以细分成以下函数。

- onRequestGet()
- onRequestPost()
- onRequestPatch()
- onRequestPut()
- onRequestDelete()
- onRequestHead()
- onRequestOptions()

env.ASSETS.fetch() 用来抓取一个静态资源。

## 路由控制文件 _routes.json

`_routes.json`控制何时调用页面函数。它应该放置在项目的输出目录中。

该文件的 JSON 对象包含三个属性。

- version：数据结构的版本，目前只有`version 1`。
- include：函数生效的路由。
- exclude：函数失效的路由。`exclude`优先级别高于`include`。

`include`和`exclude`可以使用通配符，星号（`*`）可以匹配多层路径。

下面是一个`_routes.json`。

```javascript
// _routes.json
{ 
  "version": 1,
  "include": ["/*"],
  "exclude": []
}
```

上面示例表明，函数对所有页面生效。如果要排除某些路径，可以定义`exclude`属性。

```javascript
{
 "version": 1,
 "include": ["/*"],
 "exclude": ["/build/*"]
}
```

Cloudflare 规定，必须至少有一条`include`规则，但是`include`和`exclude`规则不能多于100条，并且每条规则不能多于100个字符。

## 配置

云函数的配置文件 wrangler.toml / wrangler.json 可以手写，也可以用下面的命令从控制台下载生成。

```bash
$ npx wrangler pages download config <PROJECT_NAME>
```

它的主要键值对如下。

- pages_build_output_dir 项目的输出目录

下面是 wragler.toml 的示例。

```toml
name = "my-pages-app"
pages_build_output_dir = "./dist"
compatibility_date = "2023-10-12"
compatibility_flags = ["nodejs_compat"]

[[kv_namespaces]]
binding = "KV"
id = "<NAMESPACE_ID>"
```

下面命令部署 Pages 项目。

```bash
$ npx wrangler pages deploy
```
