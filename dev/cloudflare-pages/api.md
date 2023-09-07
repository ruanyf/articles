# 页面函数的 API

## 函数

```
onRequest(context) 
```
  
无论请求方法如何，所有请求都会调用此函数。

```
onRequestGet(context)
```

所有GET请求都会调用此函数。

```
onRequestPost(context) 
```

所有POST请求都会调用此函数。

```
onRequestPatch(context) 
```

所有PATCH请求都会调用此函数。

```
onRequestPut(context) 
```

所有PUT请求都会调用此函数。

```
onRequestDelete(context) 
```

所有DELETE请求都会调用此函数。

```
onRequestHead(context) 
```

所有HEAD请求都会调用此函数。

```
onRequestOptions(context) 
```

所有OPTIONS请求都会调用此函数。

上面函数的参数`context`对象，都是 EventContext 类型，返回值都是 `Response | Promise<Response>`类型。

```
env.ASSETS.fetch()
```

用来获取静态资产。该函数只能是向目录路径请求时触发，不能是向静态资产请求时触发。比如，应该请求`/users/`，而不是请求`/users/index.html`。它返回修改过的请求。

## EventContext

`EventContext`是 onRequest() 函数的参数。它有以下属性：

- request：这是传入的 Request 对象。
- functionPath：字符串，表示请求的路径。 
- waitUntil(promise) 
- passThroughOnException()
- next(input?, init?)：将请求传给`next()`方法，或者传给静态资产服务器。
- env：EnvWithFetch 类型，保存了环境变量和秘密值，它的 ASSETS 属性代表默认的静态服务器行为。
- params：保存动态路由的值。
- data