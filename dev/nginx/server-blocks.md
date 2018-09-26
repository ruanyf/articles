# Server Blocks 

nginx 允许一台服务器支持多个网站，这叫做 Server Blocks（跟 Apache 的 virtual host 是一个意思）。

如果`/var/www/example.com/`是网站的 document root 目录，网站的首页是`/var/www/example.com/public_html/index.html`。然后，把根目录的所有者改为 nginx 用户（www-data）。

```bash
$ sudo chown -R www-data: /var/www/example.com
```

创建该网站的配置文件`/etc/nginx/sites-available/example.com.conf`。

```bash
server {
    listen 80;
    listen [::]:80;

    root /var/www/example.com/public_html;

    index index.html;

    server_name example.com www.example.com;

     access_log /var/log/nginx/example.com.access.log;
     error_log /var/log/nginx/example.com.error.log;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

然后，测试这个配置文件是否正确。

```bash
$ nginx -t
```

如果配置正确，就可以重启 nginx 了。

```bash
$ sudo systemctl restart nginx
```
