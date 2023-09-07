# Cloudflare Pages 页面函数

## 简介

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

## 动态路由

动态路由需要在文件名外面加一对方括号（`[]`）。比如，`/users/[user].js`可以匹配下面的路径`/users/nevi`和`/users/daniel`。

如果要匹配多层路径，文件名外面要加双层方括号。比如，`/users/[[user]].js`可以匹配下面的路径`/users/nevi/foobar`和`/users/daniel/xyz/123`。

静态路由优先于动态路由。比如，有两个脚本`users/special.js`和`users/[user].js`，对于路径`/users/special`的请求会匹配`users/special.js`，而不是`users/[user].js`。

## 请求处理函数

脚本文件里面需要有请求处理函数。

```javascript
export function onRequest(context) {
  return new Response("Hello, world!");
}
```

请求处理函数`onRequest()`的参数是一个上下文对象`context`。

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
