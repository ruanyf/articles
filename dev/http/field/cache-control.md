# Cache-Control 字段

## 简介

Cache-Control 是一个响应字段，用来设置缓存，主要规定中间服务器和客户端，可以将从原始服务器获取的资源保存多久才进行更新。

它的工作过程是这样的：客户端向源服务器发出请求，要求获取某个资源；源服务器向客户端发出该资源，中间可能会经过其他服务器，那些中间服务器可能会缓存该资源，以便加速后续的网络请求。

源服务器在发出资源时，可能会设置该资源的有效期，比如5分钟。那么，在中间服务器和客户端收到该资源的5分钟之内，这个资源一直在有效期，这段时间内，如果再收到相同请求，中间服务器和客户端就可以直接使用缓存的资源，而不必再次请求源服务器。等到五分钟以后，中间服务器和客户端如果再收到相同请求，缓存的资源就已经过了有效期，需要再次请求源服务器，询问该资源是否依然有效。

源服务器可以回复，该资源依然有效，中间服务器和客户端就可以继续使用缓存的资源，并更新它的有效期。如果资源不再有效，源服务器就必须发送一个新版本的该资源，代替缓存里面的旧版本。

中间服务器的缓存是共享缓存，即为许多用户提供相同缓存响应的中间缓存。浏览器缓存是私有缓存，只为某个用户缓存响应。

Cache-Control 的某些指令专门针对共享缓存，而另一些指令也适用于私有缓存。

## 格式

`Cache-Control`这个字段出现在 HTTP 回应之中，可以有多个值，值与值之间使用逗号分隔。如果某个值接受参数，那么值与参数之间使用等号连接。

```http
Cache-Control: public, max-age=86400
```

上面示例中，`Cache-Control`有两个值`public`和`max-age`，它们之间使用逗号分隔。`max-age`有参数`86400`，使用等号连接。

## 过期时间

缓存的过期时间，计算顺序如下：

（1）服务器会根据`Cache-Control: max-age=<number>`响应中的指令建立一个以秒为单位的新鲜度时间线。

（2）按照`Expires: <date>`和`Date: <date>`计算时间间隔。

（3）如果没有标头，缺少明确的过期时间，服务器根据`Last-Modified`进行推断。

对于共享缓存，特殊指令`s-maxage=<number>`优先于所有其他指令。

## 缓存过期

缓存过期时，中间服务器或浏览器会向服务器发出一条验证请求。

服务器检查后，如果缓存已经过期，则回应`HTTP 200 OK`和更新后的响应正文；否则，返回`HTTP 304 Not Modified`状态码和一个空的响应体，确认可以重用现有的响应。

某个资源的不同缓存版本，历史上通过`Last-Modified: <date>`来确认，现在的替代方案是使用`ETag: "<value>"`响应头，它存储一个任意的ASCII字符串，用于唯一标识响应。该字符串通常是一个哈希值，包含一个或多个信息：修改时间、文件大小和文件内容。

进行验证时，中间服务器或浏览器的验证请求，会带有这两个属性值中的一个。

- `Last-Modified: <date>`变成`If-Modified-Since: <date>；`
- `ETag: "<value>"变成If-None-Match: "<value>"`

如果这两个值同时提供，只考虑 `If-None-Match`。

无论验证请求的结果如何，缓存的响应标头都会使用从服务器收到的新值进行更新，并且缓存响应的新鲜度指示器会被重置。

某些缓存可能会被设置为在某些情况下提供过期的响应，例如与服务器的连接断开或发生 HTTP 5xx 服务器错误时。

## 字段值

Cache-Control 有许多值，可以大致分成四类。

（1）能否缓存（cacheability），即当前资源是否需要缓存。它主要包含以下三个值。

- public：中间服务器可以缓存该资源。
- private：中间服务器不可以缓存该资源，但是用户个人的客户端浏览器可以缓存。
- no-store：中间服务器和客户端都不可以缓存该资源。
​​
（2）过期时间（expiration），即该资源需要缓存多久。它主要有以下值。

- max-age=seconds：资源在多少秒后过期，从原始服务器发出该资源算起。
- s-maxage=seconds：资源在中间服务器上缓存多少秒后过期，该值可以覆盖`max-age`和`Expires`标头。客户端浏览器忽略该值。
- no-cache：中间服务器和客户端每次重用该资源之前，必须重新向原始服务器验证，才能用于后续的请求。

源服务器还可以用`Expires`字段，指定资源过期的时间（格林尼治标准时）。

（3）重新验证（revalidation），这类设置决定了资源过期后的行为。它主要有以下值。

- must-revalidate：一旦资源过期，中间服务器和客户端必须向源服务器要求验证，只有验证成功，才可以再次使用缓存的资源。
- proxy-revalidate：与`must-revalidate`含义相同，但是只用于中间服务器的行为。
- stale-while-revalidate=seconds：指定中间服务器的缓存秒数。
- stale-if-error=seconds：指定多长时间内遇到错误时，可以使用过期的缓存。

（4）其他（​​other）

- no-transform — Indicates that an intermediary — regardless of whether it implements a cache — must not transform the payload.
- immutable — Indicates to clients the response body does not change over time. The resource, if unexpired, is unchanged on the server. The user should not send a conditional revalidation request, such as If-None-Match or If-Modified-Since, to check for updates, even when the user explicitly refreshes the page. 

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

超过这个时间后，缓存被认为过期。

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

该指令确认缓存过期后的处理方式，即不得重用过期的响应，直到源服务器成功验证该响应为止。

如果服务器抛出错误，缓存必须返回该错误信息，而不是重复使用过时的响应。如果缓存断开连接，则必须返回 HTTP 504 网关超时状态码或其他更合适的错误代码。

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

对于共享缓存，`must-revalidate`以及`s-maxage`和`public`，允许对于带有`Authorization`头的请求重用响应。

### no-cache

`no-cache`可以用于客户端的请求，也可以用于源服务器的回应。

```http
Cache-Control: no-cache
```

它规定，在源服务器成功验证响应之前，缓存不得重用任何响应。

这与`must-revalidate`类似，但它指的是所有缓存的响应，而不仅仅是过期的响应。实际上，no-cache 类似于 max-age=0, must-revalidate 。

（1）用于客户端的请求

这表示用户提示缓存服务器，如果返回缓存过的数据，必须向源服务器验证是否为最新数据。

（2）用于源服务器的回应

这表示源服务器提示缓存服务器，数据可以缓存，但每次重用之前，必须向源服务器验证。

注意，`no-cache`不表示不能缓存，只表示重用之前必须验证。

### no-store

`no-store`用于源服务器的回应，表示数据不得缓存。

no-store 响应指令表明，私有缓存和共享缓存不得存储请求或响应的任何部分，并且永远不得重用响应。

该指令也可能影响非 HTTP 缓存。大多数浏览器会将带有 no-store 响应指令的页面排除在前进/后退缓存之外。

### must-understand

must-understand 响应指令表明，不得缓存那些缓存不理解语义的 HTTP 状态码的响应。该指令旨在使现有实现能够适应未来可能对缓存有特殊要求的状态码。

### no-transform

`no-transform`可以用于客户端的请求，也可以用于源服务器的回应。

它表示任何中间服务器（无论是否有缓存功能），都不应该更改源服务器回应的数据体，主要用于防止中间服务器压缩图片。

no-transform 响应指令表明，无论中间层是否实现缓存，都不得转换响应内容，例如优化图像或压缩样式表和脚本。

```http
Cache-Control: no-transform
```

### only-if-cached

`only-if-cached`只用于客户端的请求，表示只返回缓存的数据，即使缓存已经过期，也将其返回。如果没有可用的缓存，将返回 504 Gateway Timeout。

```http
Cache-Control: only-if-cached
```

### private

`private`用于源服务器的响应，指示缓存服务器，被缓存的数据只可以提供给该发出请求的用户，即该响应仅供单个用户使用，共享缓存不得存储响应，用于防止其他指令无意中将经过身份验证的响应提供给共享缓存。

```http
Cache-Control: private
```

### proxy-revalidate

`proxy-revalidate`只用于源服务器的回应，要求缓存服务器收到客户端请求返回响应之前，必须再次验证缓存的有效性。

proxy-revalidate 响应指令类似于 must-revalidate ，但仅影响共享缓存。

```http
Cache-Control: proxy-revalidate
```

它相当于`must-revalidate`，但是只用于多用户共用的缓存。

### public

`public`用于源服务器的回应，指示缓存服务器，被缓存的数据也可以提供给其他用户。

```http
Cache-Control: public
```

该指令使得共享缓存可能会存储并重用包含 Authorization 标头的请求响应。私有缓存也可能存储该响应。

### s-maxage

`s-maxage`用于源服务器的回应，表示数据保持新鲜的时间（单位为秒）。

`s-maxage=<number>`响应指令类似于 max-age ，但仅影响共享缓存。

该指令还包含了 proxy‑revalidate 响应指令的语义，即共享缓存必须先通过源服务器成功验证，才能使用过期的响应。

```http
Cache-Control: s-maxage=604800
```

该字段与`max-age`作用相同，区别在于前者只适用于多用户使用的公共缓存服务器（即缓存可以 share）。如果两者同时存在，`max-age`会被忽略。

### stale-while-revalidate

stale-while-revalidate 响应指令用于过期内容。 ）（2010 年）。它表示，某个缓存的响应尚未超过其新鲜度有效期指定的秒数时，可以重用该响应。

每当由于该指令的存在而导致的提供过时的响应时，中间服务器应触发对源服务器的重新验证。

### stale-if-error

`stale-if-error=<number>`响应指令表示，如果尝试验证过期响应导致错误，则缓存可以使用缓存的响应，前提是该响应的新鲜度生命周期未超过指定的秒数。

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

（1）缓存一个静态资源。

```http
Cache-Control: public, max-age=86400
```

（1）确保保密的资源不被缓存。

```http
Cache-Control: no-store
```

（1）只缓存在客户端，不缓存在中间服务器。

```http
Cache-Control: private, max-age=3600
```

（1）缓存在客户端和中间服务器，但是使用前必须向源服务器重新验证。

```http
Cache-Control: public, no-cache
```

（1）缓存在中间服务器，但是要求使用缓存前，向源服务器验证。

```http
Cache-Control: public, no-cache, proxy-revalidate
```

或者

```http
Cache-Control: public, s-maxage=0
```

（1）缓存在中间服务器，但是使用缓存前，必须向源服务器验证。

```http
Cache-Control: public, no-cache, must-revalidate
```

（1）缓存资源，但是要求中间服务器不得改动。

```http
Cache-Control: public, no-transform
```

这个设置同时禁止中间服务器改动源服务器的压缩方法。

（1）缓存资源，但是需要重新验证，如果源服务器不可用，那么可以使用过期的资源。

```http
Cache-Control: public, max-age=3600, stale-if-error=60
```

缓存3600秒（1小时）以后，尝试重新验证资源。如果源服务器返回一个错误，那么中间服务器继续提供过期的缓存，直到60秒后才停止提供。

（1）资源在中间服务器和浏览器缓存不同的时间。

```http
Cache-Control: public, max-age=7200, s-maxage=3600
```

（1）缓存资源，当中间服务器重新验证时，继续提供缓存的资源。

```http
Cache-Control: max-age=600, stale-while-revalidate=30
```

资源在600秒是不过期的，另外中间服务器可以在额外的30秒内继续提供该缓存，同时向源服务器验证该资源。

## 参考链接

- [HTTP caching, a refresher](https://danburzo.ro/http-caching-refresher/)