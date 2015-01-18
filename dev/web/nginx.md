# nginx的用法

## SSL支持

将数字证书放在/etc/nginx/certificates/目录。

修改配置文件，打开HTTPs端口。

```

server {
    listen 443;
    server_name "domain.tld";
    root /var/www/your_website_root;

    ssl on;
    ssl_certificate     /etc/nginx/certificates/cert-domain.tld.crt;
    ssl_certificate_key /etc/nginx/certificates/domain.tld.key;
}

```

重启nginx服务。

修改配置文件，将HTTP流量导向HTTPs。

```

server {
    listen 80;
    server_name "domain.tld";
    rewrite ^(.*) https://$host$1 permanent;
}

```
