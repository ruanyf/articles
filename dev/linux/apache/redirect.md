# Apache 重定向

重定向功能用于将对一个网址的请求，自动导向另一个网址。

HTTP 提供两个重定向状态：301 永久性跳转和302 暂时性跳转。

## Redirect 指令

`Redirect`指令将旧的 URL 导向新的 URL。

```
<VirtualHost *:80>
	ServerName www.domain1.com
	Redirect / http://www.domain2.com
</VirtualHost>

<VirtualHost *:80>
	ServerName www.domain2.com
	. . .
	. . .
</VirtualHost>
```

下面是另一些例子。

```
Redirect "/service" "http://foo2.example.com/service"
Redirect "/one" "/two"
```

`Redirect`指令默认返回 302 状态码，可以改为 301 跳转。

```
Redirect 301 /oldlocation http://www.domain2.com/newlocation
Redirect permanent /oldlocation http://www.domain2.com/newlocation
```

`Redirect`指令可以写在`<If>`指令里面。

```
<If "%{HTTP_HOST} != 'www.example.com'">
    Redirect "/" "http://www.example.com/"
</If>
```

下面的指令将 HTTP 协议的请求，改成 HTTPS 请求。

```
<If "%{SERVER_PROTOCOL} != 'HTTPS'">
  Redirect "/admin/" "https://www.example.com/admin/"
</If>
```

## RedirectMatch 指令

`RedirectMatch`指令使用正则表达式匹配每一个请求。

```
RedirectMatch ^/images/(.*)$ http://images.example.com/$1
RedirectMatch "(.*)\.gif$" "http://other.example.com$1.jpg"
```

上面代码中，正则表达式里面的括号部分捕获的内容，可以用`$1`引用。

## mod_rewrite

`mod_rewrite`模块提供了改写请求的能力。

首先，将`AllowOverride`从`None`改成`All`。

```
 <Directory /var/www/>
   Options Indexes FollowSymLinks MultiViews
   AllowOverride All
 </Directory>
```

然后，重启服务。

```bash
$ sudo service apache2 restart
```

最后，可以将 URL 改写规则写在网站根目录下的`.htaccess`文件，也可以写在配置文件的`<Directory>`指令里面。

```
RewriteEngine on
RewriteRule ^oranges.html$ apples.html
```

上面规则会将所有针对`/apple.html`的请求，改写成`/oranges.html`。

下面是其他一些改写的例子。

```
# Apache 内部的跳转，用户不可见
RewriteRule    "^/foo\.html$"  "/bar.html" [PT]

# URL 的变化，用户可见
RewriteRule    "^/foo\.html$"  "bar.html"  [R]

RewriteRule   "^/docs/(.+)"  "http://new.example.com/docs/$1"  [R,L]

RewriteRule ^(meat|produce|dairy)/([^/.]+)/([^/.]+)$ results.php?products=$1&type=$2&species=$3
RewriteRule ^products/([A-Za-z0-9-]+)/?$ results.php?products=$1 [NC]
```

规则最后的`[NC]`表示该规则忽视字符串的大小写。

`mod-rewrite`模块还允许指定 URL 改写的条件。

```
RewriteEngine on
RewriteCond %{HTTP_REFERER} !^$
RewriteCond %{HTTP_REFERER} !^http://(www\.)?example\.com/.*$ [NC]
RewriteRule .*\.(gif|jpeg|png)$ http://www.example.com/unpleasantness.jpg [R,NC,L]
```

上面代码中，条件有两个，一个是`HTTP_REFERER`变量不为空，另一个是`HTTP_REFERER`不是当前网站。只要满足这两个条件，对图片的请求都会重定向到一张特定的图片。如果想禁止对图片的访问，可以直接使用下面的规则。

```
RewriteRule .*\.(gif|jpeg|png)$ - [F]
```

下面的例子是将对`document.html`的请求改写成对`document.php`的请求，条件是`document.php`存在，而且`document.html`不存在。

```
<Directory "/var/www/htdocs">
    RewriteEngine on
    RewriteBase "/var/www/htdocs"

    RewriteCond "$1.php" -f
    RewriteCond "$1.html" !-f
    RewriteRule "^(.*).html$" "$1.php"
</Directory>
```

另一个例子是将不带`www`的域名请求，重定向到`www`域名。

```
RewriteEngine on
RewriteCond %{HTTP_HOST} ^example\.com$ [NC]
RewriteRule ^(.*)$ http://www.example.com/$1 [R=301,L]
```

下面的例子是禁止某些 IP 地址的访问。

```
RewriteCond %{REMOTE_ADDR} ^(12\.34\.56\.789)$
RewriteRule (.*) - [F,L]
```

## 参考链接

- [How To Set Up Mod_Rewrite](https://www.digitalocean.com/community/tutorials/how-to-set-up-mod_rewrite), by Etel Sverdlov
- [Redirecting and Remapping with mod_rewrite](https://httpd.apache.org/docs/2.4/rewrite/remapping.html), by Apache
