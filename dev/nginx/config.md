# 配置

Nginx的主配置文件是`nginx.conf`，通常位于`/usr/local/etc/nginx`或者`/etc/nginx`。官方网站提供范例配置[nginx.conf.default](https://gist.github.com/nishantmodak/d08aae033775cb1a0f8a)）可以查看。

虚拟主机的默认配置文件是`/etc/nginx/sites-available/default`。一般的做法是，在`sites-available`目录里面，根据每个站点的名字，新建配置文件，比如`/etc/nginx/sites-available/example.com.conf`。

虚拟主机的配置文件通常带有一个或多个`server`区块。

```bash
server {
  listen 80 default_server;
  listen [::]:80 default_server ipv6only=on;

  root /usr/share/nginx/html;
  index index.html index.htm;

  location / {
    try_files $uri $uri/ =404;
  }
}
```

修改配置后，可以使用下面的命令重新加载配置。

```bash
$ nginx –s reload
```

除了`nginx.conf`，还有`sites-available`和`sites-enabled`两个目录，前者包括所有可用的网站配置，后者只包括前者的符号链接，指向那些已经激活的网站。

`sites-available`目录里面的配置文件，加上660权限。

```bash
# chmod 660 /etc/nginx/sites-available/example.com.conf
```

修改它们所属的用户组。

```bash
# Debian and Derivatives
$ chgrp www-data  /etc/nginx/sites-available/tecmintlovesnginx.com.conf

# CentOS and RHEL
$ chgrp nginx  /etc/nginx/sites-available/tecmintlovesnginx.com.conf
```

另外，需要修改日志目录的用户组，与nginx属于同一个用户组。

```bash
# mkdir /var/www/logs
# chmod -R 660 /var/www/logs
# chgrp <nginx user> /var/www/logs
```

然后，建立`sites-enabled`目录到`site-available`的符号链接。

```bash
# ln -s /etc/nginx/sites-available/example.com.conf /etc/nginx/sites-enabled/example.com.conf
```

接着，在`/var/www/<domain name>/public_html`目录里面，放置一个`index.html`。

最后，测试配置，并重启nginx。

```bash
# nginx -t && systemctl start nginx
```

修改`/etc/hosts`，增加域名解析。

```bash
192.168.0.25 example.com
```

`sites-enabled`下的文件自动加载。激活新网站的做法是，符号链接`sites-enabled`目录的配置文件，然后重启 nginx。

```
$ cd /etc/nginx/sites-available
# ... create newproject.com ...
$ cd /etc/nginx/sites-enabled
$ ln -s ../sites-available/newproject.com .
$ /etc/init.d/nginx reload
[....] Reloading nginx configuration: nginx.
$
```

停用某个网站的做法是从sites-enabled目录移除符号链接，重启nginx。

```
$ cd /etc/nginx/sites-enabled
$ rm newproject.com
$ /etc/init.d/nginx reload
[....] Reloading nginx configuration: nginx.
$
```
