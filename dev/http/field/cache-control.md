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