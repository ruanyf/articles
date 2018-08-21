# 配置文件

下面是一个典型的虚拟主机配置文件`/etc/httpd/conf.d/example.com.conf`。

```html
<VirtualHost *:80>
    ServerName example.com
    ServerAlias www.example.com
    ServerAdmin webmaster@example.com
    DocumentRoot /var/www/example.com/public_html

    <Directory /var/www/example.com/public_html>
        Options -Indexes +FollowSymLinks
        AllowOverride All
    </Directory>

    ErrorLog /var/log/httpd/example.com-error.log
    CustomLog /var/log/httpd/example.com-access.log combined
</VirtualHost>
```

- ServerName: 域名
- ServerAlias: 域名的别名
- DocumentRoot: 网页文件目录
- Options: 指定服务器功能
  - Indexes: 如果直接访问目录，是否可以列出文件列表
  - FollowSymLinks: 是否可以访问符号链接文件
- AllowOverride: 是否允许 .htaccess 里面的设置覆盖配置文件
- ErrorLog, CustomLog: 指定日志文件位置

修改完配置文件以后，使用下面的命令测试配置文件的语法是否正确。

```bash
$ sudo apachectl configtest
```

如果语法正确，重启服务器。

```bash
$ sudo systemctl restart httpd
```

