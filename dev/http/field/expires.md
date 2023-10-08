# Expires 字段

Expires 字段用于服务器的回应，指定数据的过期时间。

它的值是一个日期时间字符串。

```http
Expires: Wed, 21 Oct 2015 07:28:00 GMT
```

如果它的值为0，就表示数据已经过期了。

如果回应里面的`Cache-Control`字段设置了`max-age`或者`s-maxage`，那么 Expires 将被忽略。