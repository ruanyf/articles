# Cloudflare Worker 简介

你的 Cloudflare Worker 项目，是一个 Node.js 项目。

它有一个入口脚本（`package.json`的`main`字段），默认输出一个对象，该对象指定各种事件的监听函数。

```javascript
export default {
  async fetch(request, env, ctx) {
    return new Response('Hello World!'); 
  }, 
};
```

上面示例中，入口脚本使用`export default`默认输出一个对象。这个对象的`fetch`属性是一个 async 函数，表示这是`fetch`事件的回调函数。该输出应该返回一个`Response`对象，表示对客户端请求的回应。



