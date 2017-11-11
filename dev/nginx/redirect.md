# 重定向

Nginx 的重定向命令较为简单。

```
server {
	listen 80;
	server_name domain1.com;
	return 301 $scheme://domain2.com$request_uri;
}
```

上面的代码将所有请求，301重定向到另一个域名。

如果只要重定向某个目录的请求，可以像下面这样写。

```
# 301 重定向
rewrite ^/images/(.*)$ http://images.example.com/$1 redirect;

# 302 重定向
rewrite ^/images/(.*)$ http://images.example.com/$1 permanent;
```
