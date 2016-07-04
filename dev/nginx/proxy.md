# 反向代理

编辑`/etc/nginx/sites-available/default`，或者在该目录下新建一个配置文件`/etc/nginx/sites-available/my-site`。

下面是简单的配置。

```
server {
  listen 80;
  server_name my.domain.com;
  location / {
    proxy_pass http://localhost:3000;
  }
}
```

下面是复杂的配置。

```
server {
    listen 80;

    server_name example.com;

    location / {
        proxy_pass http://APP_PRIVATE_IP_ADDRESS:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

上面的字段含义如下。

-  server_name：你的域名或IP地址
-  proxy_pass：私有IP地址

可以增加`location`区块，为不同的路径代理不同的后端地址。

```
    location /app2 {
        proxy_pass http://APP_PRIVATE_IP_ADDRESS:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```

