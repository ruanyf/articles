# 反向代理

## 基本配置

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

```
location ~ \.php {
    proxy_pass http://127.0.0.1:8000;
}
```

## 改写头信息

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

```
location /match/here {
    proxy_set_header HOST $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    proxy_pass http://example.com/new/prefix;
}
```

## proxy_pass 属性

`proxy_pass`属性主要用在`location`块。

```
# server context

location /match/here {
    proxy_pass http://example.com;
}
```

上面代码中，用户访问 URL `/match/here/please`，会被这个 location 块拦截，改为访问`http://example.com/match/here/please`。

如果上游服务器指定了路径，那么匹配的路径将被替换掉。

```
# server context

location /match/here {
    proxy_pass http://example.com/new/prefix;
}

. . .
```

上面代码中，用户访问 URL `/match/here/please`，将被重定向到上游服务器`http://example.com/new/prefix/please`。其中，`/match/here`的部分被`/new/prefix`替换。

如果目标 URL 是正则匹配或者被改写过，导致无法替换。那么，将被原样传给上游服务器。

## 负载均衡

```
# http context

upstream backend_hosts {
    server host1.example.com;
    server host2.example.com;
    server host3.example.com;
}

server {
    listen 80;
    server_name example.com;

    location /proxy-me {
        proxy_pass http://backend_hosts;
    }
}
```

上面代码中，定义了上游服务器为三台。

不同的服务器还可以加权。

```
# http context

upstream backend_hosts {
    server host1.example.com weight=3;
    server host2.example.com;
    server host3.example.com;
}

. . .
```


下面是上游平衡算法。

- (round robin)：如果不存在其他平衡指令，则使用默认的负载平衡算法。 在上游上下文中定义的每个服务器依次顺序传递请求。
- least_conn ：指定应始终为具有最少活动连接数的后端提供新连接。 在与后端的连接可能持续一段时间的情况下，这尤其有用。
- ip_hash ：此平衡算法根据客户端的IP地址将请求分发到不同的服务器。 前三个八位字节用作决定服务器处理请求的密钥。 结果是客户端每次都倾向于由同一服务器提供服务，这有助于会话一致性。
- hash ：这种平衡算法主要用于memcached代理。 基于任意提供的散列密钥的值来划分服务器。 这可以是文本，变量或组合。 这是唯一需要用户提供数据的平衡方法，这是应该用于散列的密钥。

下面是更改上游平衡算法的例子。

```
# http context

upstream backend_hosts {

    least_conn;

    server host1.example.com;
    server host2.example.com;
    server host3.example.com;
}

. . .
```

如果采用 hash 方法，必须定义密钥。

```
# http context

upstream backend_hosts {

    hash $remote_addr$remote_port consistent;

    server host1.example.com;
    server host2.example.com;
    server host3.example.com;
}

. . .
```

## 参考链接

- [Understanding Nginx HTTP Proxying, Load Balancing, Buffering, and Caching](https://www.digitalocean.com/community/tutorials/understanding-nginx-http-proxying-load-balancing-buffering-and-caching), Justin Ellingwood
- [NGINX Reverse Proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/), NGINX Documentation 
