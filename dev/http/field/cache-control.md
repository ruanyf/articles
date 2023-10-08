# Cache-Control 字段

Cache-Control 字段指定缓存的工作机制。它可以有多个值，值与值之间使用逗号分隔。

## 字段值

缓存请求相关的值。

- no-cache：无，强制向源服务器再次验证
- no-store：无，不缓存请求或响应的任何内容
- max-age = [ 秒]，必需，响应的最大Age值
- max-stale( = [ 秒])，可省略，接收已过期的响应
- min-fresh = [ 秒]，必需，期望在指定时间内的响应仍有效
- no-transform，无，代理不可更改媒体类型
- only-if-cached，无，从缓存获取资源
- cache-extension，-，新指令标记（token）

缓存响应相关的值

- public：无，可向任意方提供响应的缓存
- private：可省略，仅向特定用户返回响应
- no-cache：可省略，缓存前必须先确认其有效性
- no-store：无，不缓存请求或响应的任何内容
- no-transform：无，代理不可更改媒体类型
- must-revalidate：无，可缓存但必须再向源服务器进行确认
- proxy-revalidate：无，要求中间缓存服务器对缓存的响应有效性再进行确认
- max-age = [ 秒]：必需，响应的最大Age值
- s-maxage = [ 秒]：必需，公共缓存服务器响应的最大Age值
- cache-extension：-，新指令标记（token）

### max-age

`max-age`可以用于用户的请求，也可以用于服务器的回应。它需要设置参数值，代表数据缓存的最长时间，单位为秒。

```http
Cache-Control: maxage=604800
```

（1）用于客户端的请求

这时，如果缓存的数据被缓存的时间小于指定的时间，那么缓存服务器就向客户端返回缓存，否则就向源服务器重新请求数据。

如果 max-age 的值设为0，那么缓存服务器就必须向源服务器重新请求数据。

（2）用于源服务器的回应

这时表示源服务器提示缓存服务器，返回数据的有效时间。这段时间内，返回的数据可以缓存后重复使用。

如果使用`max-age`的同时，源服务器的回应还存在`Expires`字段，则`Expires`被忽略。

### max-stale

`max-stale`只用于客户端的请求，表示客户端能够接受已经过期的缓存数据，只要过期时间不多于指定时间。

它的值是能够接受的过期时间，单位为秒。

```http
Cache-Control: max-stale=3600
```

如果不指定值，就表示不管缓存过期了多久，都可以返回。

它的主要使用场景是，源服务器关闭或速度太慢，而客户端接受过期的缓存。

### min-fresh

`min-fresh`只用于客户端的请求，指定缓存数据依然有效的剩余时间，单位为秒。有效期低于这个时间的缓存，不得返回。

```http
Cache-Control: min-fresh=60
```

这个值的含义是，客户端接受已经缓存的数据，但是缓存不能马上过期，必须留有一定时间的有效期。

### must-revalidate

`must-revalidate`只用于源服务器的回应，指示回应可以缓存，并可以在没有过期时重用。如果过期，必须向源服务器进行验证是否可以重用。

```http
Cache-Control: must-revalidate
```

它通常与`max-age`一起使用。

```http
Cache-Control: max-age=604800, must-revalidate
```

如果缓存服务器无法连接源服务器进行验证，缓存服务器必须向客户端返回 504 Gateway Timeout。

HTTP 协议允许缓存服务器在与源服务器断开连接时，重用过期的回应。`must-revalidate`是防止这种情况的一种方法，设置要么使用源服务器重新验证存储的响应，要么生成 504 回应。

这也意味着，使用`must-revalidate`会忽略`max-stale`。

### no-cache

`no-cache`可以用于客户端的请求，也可以用于源服务器的回应。

```http
Cache-Control: no-cache
```

（1）用于客户端的请求

这表示用户提示缓存服务器，如果返回缓存过的数据，必须向源服务器验证是否为最新数据。

（2）用于源服务器的回应

这表示源服务器提示缓存服务器，数据可以缓存，但每次重用之前，必须向源服务器验证。

注意，`no-cache`不表示不能缓存，只表示重用之前必须验证。

### no-store

`no-store`用于源服务器的回应，表示数据不得缓存。

### no-transform

`no-transform`可以用于客户端的请求，也可以用于源服务器的回应。

它表示任何中间服务器（无论是否有缓存功能），都不应该更改源服务器回应的数据体，主要用于防止中间服务器压缩图片。

```http
Cache-Control: no-transform
```

### only-if-cached

`only-if-cached`只用于客户端的请求，表示只返回缓存的数据，即使缓存已经过期，也将其返回。如果没有可用的缓存，将返回 504 Gateway Timeout。

```http
Cache-Control: only-if-cached
```

### private

`private`用于源服务器的响应，指示缓存服务器，被缓存的数据只可以提供给该发出请求的用户。

```http
Cache-Control: private
```

### proxy-revalidate

`proxy-revalidate`只用于源服务器的回应，要求缓存服务器收到客户端请求返回响应之前，必须再次验证缓存的有效性。

```http
Cache-Control: proxy-revalidate
```

它相当于`must-revalidate`，但是只用于多用户共用的缓存。

### public

`public`用于源服务器的回应，指示缓存服务器，被缓存的数据也可以提供给其他用户。

```http
Cache-Control: public
```

### s-maxage

`s-maxage`用于源服务器的回应，表示数据保持新鲜的时间（单位为秒）。

```http
Cache-Control: s-maxage=604800
```

该字段与`max-age`作用相同，区别在于前者只适用于多用户使用的公共缓存服务器（即缓存可以 share）。如果两者同时存在，`max-age`会被忽略。

## 示例

```http
Cache-Control: public, max-age=0, must-revalidate
```

上面命令的意思是：

缓存这个东西，但立即让它变得陈旧，并询问源服务器下次是否有新的副本可供下载。

在每次后续访问页面时，浏览器将始终向源服务器（或全局 CDN）检查资产的最新版本，但只有在这些资产发生更改时，它才会真正执行完整下载。如果一切都一样，您将收到304 Not Modified响应，并且将使用浏览器的“过时”版本。

```http
Cache-Control: public, max-age=31560000, immutable
```

这就是它的含义：

- public- 资源可以存储在浏览器和源服务器之间（包括浏览器和源服务器）之间的任何缓存中
- max-age=31560000- 缓存不必认为它“过时”，直到一整年过去
- immutable- 浏览器被明确指示不要访问源/CDN，只是为了检查是否有更新的内容可用（不再有重新验证请求）

制定该策略后，第一次访问页面后，将直接从缓存加载每个资源。