# nginx的用法

## 简介

Nginx（发音/engine x/）是一个轻量级的开源 HTTP 服务器软件，可以用来取代 Apache，或者与 Apache 配合使用。

它与 Apache 的区别在于：它的设计基于事件和异步操作，而 Apache 完全依赖线程。当访问量很大的时候，大量新增的线程 很快会耗尽内存，而基于事件的非阻塞设计能够轻松处理。

Nginx 的安装。

```bash
$ sudo apt-get install nginx
```

安装成功后，下面是一些常用命令。

```bash
# 系统启动时，自动启动 nginx
$ sudo systemctl enable nginx

# 启动 nginx
$ sudo systemctl start nginx

# 重启 nginx
$ sudo systemctl restart nginx

# 停止 nginx
$ sudo systemctl stop nginx

# 重新加载配置文件
$ sudo systemctl reload nginx

# 查看 nginx 状态
$ sudo systemctl status nginx

# 验证配置文件是否有语法错误
$ sudo nginx -t
```

nginx 一般使用下面的目录位置。

- /var/log/nginx/ ：日志文件目录，通常包含`access.log`和`error.log`两个主日志文件，以及各个站点的日志。
- /etc/nginx/：配置文件目录。
- /etc/nginx/sites-available/：所有站点的配置文件目录。
- /etc/nginx/sites-enabled/：生效站点的配置文件目录，通常是`/etc/nginx/sites-available/`对应文件的软连接。
- /etc/nginx/nginx.conf：主配置文件。

## 工作原理

nginx 有一个主进程和几个 worker 进程。有多少个 CPU，就有多少个 worker 进程。每一个 worker 进程能够处理几千个连接。

```bash
$ ps -ef --forest | grep nginx
```

上面的命令可以查看所有 nginx 进程，一般是1个主进程，与 CPU 内核数对应的 worker 进程，1个 cache manager 进程，1个 cache loader 进程。

nginx 进程分工如下。

- 主进程：读取配置，绑定端口，创造子进程。
- worker 进程：执行实际任务的进程，包括处理网络请求，读取或写入硬盘，与上游服务器通信。
- cache loader 进程：将硬盘上的缓存读入内存，然后退出。
- cache manager 进程：周期性执行，从缓存清除过时的条目。

worker 进程在创建时，根据配置文件初始化，并且留有多个socket用于与主进程通信。每当有新的网络请求，worker进程就会监听到事件，从而启动。

### Web 根目录

新建一个目录作为 Web 服务的根目录。

```bash
$ sudo mkdir -p /var/www/example.com/public_html
$ sudo chown -R www-data:www-data /var/www/example.com/public_html
$ sudo chmod 755 /var/www
```

然后，可以在该目录下写入一个首页文件`index.html`。

```bash
$ sudo nano /var/www/example.com/public_html/index.html
```

### 配置文件

将默认的配置文件，拷贝成一份指定站点的配置文件。

```bash
$ sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/example.com
```

编辑该文件。

```bash
$ sudo nano /etc/nginx/sites-available/example.com
```

下面是一份简单的配置。

```nginx
server {
        listen   80; ## listen for ipv4; this line is default and implied
        #listen   [::]:80 default ipv6only=on; ## listen for ipv6

        root /var/www/example.com/public_html;
        index index.html index.htm;

        # Make site accessible from http://localhost/
        server_name example.com;
}
```

最后，激活这个配置文件。

```bash
$ sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/example.com
```

然后，重启 nginx。

```bash
$ sudo service nginx restart
```

### 内置模块

nginx 采用模块式设计，通过加载模块扩展功能。目前，nginx不支持动态加载模块，模块必须和内核一起编译。所有的模块都是中间件，即接收上一个模块的输入，处理后再将输出传给下一个模块。

下面是一些默认编译的模块。

- Access (ngx_http_access_module)：限制访问某些IP地址。

```
location / {
    deny  192.168.1.1;
    allow 192.168.1.0/24;
    allow 10.1.1.0/16;
    allow 2001:0db8::/32;
    deny  all;
}
```

- HTTP Auth (ngx_http_auth_basic_module)：启用HTTP Basic Auth。

```
location / {
    auth_basic           "password";
    auth_basic_user_file conf/htpasswd;
}
```

- Subrequest Auth (ngx_http_auth_request_module)：客户端认证基于一个子请求的结果。
- Limit connections (ngx_http_limit_conn_module)：允许设置单个IP地址的同一时间的最大连接数（connection）。
- Limit requests (ngx_http_limit_req_module)：允许设置单个IP地址的最大请求数。

### 外部模块

外部模块需要在编译时指定。

```bash
$ ./configure --add-module=/path/to/module/source
# 或者不安装某些模块
$ ./configure  --without-http_dav_module --withouthttp_spdy_module
```

下面是一些有用的外部模块。

- ngx_pagespeed：Google的PageSpeed项目的一个产品，用于提高网页加载速度。
- nginx-rtmp-module：实时流（stream）操作的模块。
- nginx-push-stream-module：基于流操作的一个推送（push）模块，支持EventSource长轮询（Long polling），一个例子就是WebSocket。

## 使用方法

```bash
# 启动
$ /etc/init.d/nginx start

# 停止
$ /etc/init.d/nginx stop

# 重启
$ /etc/init.d/nginx reload

# 验证配置文件
$ nginx -t
```

## 配置

### server区块

基本配置。

```bash
server {
    listen       80;
    server_name  tecmintlovesnginx.com www.tecmintlovesnginx.com;
    access_log  /var/www/logs/tecmintlovesnginx.access.log;  
    error_log  /var/www/logs/tecmintlovesnginx.error.log error; 
        root   /var/www/tecmintlovesnginx.com/public_html;  
        index  index.html index.htm;
}
```

（1）server_tokens

server_tokens指定发生错误时，是否显示nginx错误信息。

```bash
server {
    listen       192.168.0.25:80;
    Server_tokens        off;
    server_name  tecmintlovesnginx.com www.tecmintlovesnginx.com;
    access_log  /var/www/logs/tecmintlovesnginx.access.log;
    error_log  /var/www/logs/tecmintlovesnginx.error.log error;
        root   /var/www/tecmintlovesnginx.com/public_html;
        index  index.html index.htm;
}
```

（2）屏蔽指定的HTTP动词

在server区块内部，指定可以接受的HTTP动词。

```bash
if ($request_method !~ ^(GET|HEAD|POST)$) {
   return 444;
}
```

然后，下面的命令就会返回444错误。

```bash
$ curl -X DELETE http://192.168.0.25/index.html
```

（3）指定SSL版本

```bash
server {
  listen *:443;
  ssl on;
  server_name "";
  ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;

  ssl_certificate        /etc/nginx/certs/server.crt;
  ssl_certificate_key    /etc/nginx/certs/server.key;
  ssl_client_certificate /etc/nginx/certs/ca.crt;
  ssl_verify_client      on;
}
```

（4）指定 SSL 证书

首先，删除或注释掉下面指定监听80端口的两行。

```bash
listen 80 default_server;
listen [::]:80 default_server ipv6only=on;
```

改成下面的样子。

```bash
listen 443 ssl;

server_name example.com;

ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
```

还可以加上三行附加设置。

```bash
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers AES256+EECDH:AES256+EDH:!aNULL;
```

然后，在原来的`server`区块外面，再加一个`server`区块。

```bash
server {
    listen 80;
    server_name example.com;
    rewrite ^/(.*) https://example.com/$1 permanent;
}
```

下面是另一个例子。

```bash
server {
    listen 192.168.0.25:443 ssl;
    server_tokens off;
    server_name  tecmintlovesnginx.com www.tecmintlovesnginx.com;
    root   /var/www/tecmintlovesnginx.com/public_html;
    ssl_certificate /etc/nginx/sites-enabled/certs/tecmintlovesnginx.crt;
    ssl_certificate_key /etc/nginx/sites-enabled/certs/tecmintlovesnginx.key;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
}
```

最后，重启`nginx`。

```bash
$ sudo service nginx restart
```

生成证书的命令。

```bash
# openssl genrsa -aes256 -out tecmintlovesnginx.key 1024
# openssl req -new -key tecmintlovesnginx.key -out tecmintlovesnginx.csr
# cp tecmintlovesnginx.key tecmintlovesnginx.key.org
# openssl rsa -in tecmintlovesnginx.key.org -out tecmintlovesnginx.key
# openssl x509 -req -days 365 -in tecmintlovesnginx.csr -signkey tecmintlovesnginx.key -out tecmintlovesnginx.crt
```

（5）HTTP导向HTTPS

```bash
server {
  return 301 https://$server_name$request_uri;
}
```

（6）反向代理，转发请求

```
http {

  server {
    location /app/ {
      proxy_pass http://app/;
      proxy_set_header X-ClientCert-DN $ssl_client_s_dn;
    }
  }
}
```

上面代码中，用户对`/app`路径的访问请求，会被转发到后端服务。这时，nginx会增加一个HTTP信息头`X-ClientCert-DN`，它的值就是nginx变量`$ssl_client_s_dn`，这个值从客户端证书的Common Name部分获取。

另一个例子。

```
location / {
    proxy_pass http://localhost:15301/;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

### User Agent限制

新建一个文件`/etc/nginx/blockuseragents.rules`，定义屏蔽User Agent的规则。

```bash
map $http_user_agent $blockedagent {
        default         0;
        ~*malicious     1;
        ~*bot           1;
        ~*backdoor      1;
        ~*crawler       1;
        ~*bandit        1;
}
```

然后，在server区块之前包含这个文件。

```bash
include /etc/nginx/blockuseragents.rules;
```

接着，在server区块里面启用屏蔽功能。

```bash
server {
  if($blockedagent) {
    return 403;
  }
}
```

重新启动以后，使用被屏蔽的user agent访问，就会返回403错误。

```bash
$ wget --user-agent "I am a bandit haha" http://192.168.0.25/index.html
```

## 限制访问

全局拦截。

```bash
$ vi /etc/nginx/sites-enabled/blockips.conf
```

写入所要拦截的IP。

```
deny 123.123.123.123;
```

然后，重启nginx。

```bash
sudo /etc/init.d/nginx restart
```

`blockips.conf`里面，如果想要拦掉某个网段，可以写成下面这样。

```
deny 123.123.123.0/24;
```

如果只允许某个网段，可以写成下面这样。

```
allow 1.2.3.4/24;
deny all;
```

nginx配置文件里面限制IP段。

```
location / {
    allow 192.168.1.1/24;
    allow 127.0.0.1;
    deny 192.168.1.2;
    deny all;
}
```

启用访问认证。

```
server {
    ...
    auth_basic "closed website";
    auth_basic_user_file conf/htpasswd;
}
```

全站启用访问认证，某些路径允许自由访问。

```
server {
    ...
    auth_basic "closed website";
    auth_basic_user_file conf/htpasswd;

    location /public/ {
        auth_basic off;
    }
}
```

认证和IP地址之中，只要满足一个条件即可。

```
location / {
    satisfy any;

    allow 192.168.1.0/24;
    deny  all;

    auth_basic           "closed site";
    auth_basic_user_file conf/htpasswd;
}
```

限制单个IP地址的带宽，以及能够建立的连接数。

```

location /download/ {
    limit_conn addr 1;
    limit_rate 50k;
}

```

## SSL支持

下面的命令用来生成自签名证书，生成的证书为`/etc/nginx/ssl/ssl.crt`。

```javascript
$ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/ssl.key -out /etc/nginx/ssl/ssl.crt
```

将数字证书放在/etc/nginx/certificates/目录。

修改配置文件，打开HTTPs端口。

```
server {
    listen              443 ssl;
    server_name         www.example.com;
    ssl_certificate     www.example.com.crt;
    ssl_certificate_key www.example.com.key;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    ...
}
```

重启nginx服务。

修改配置文件，将HTTP流量导向HTTPs。

```
server {
    listen 80;
    server_name www.example.com;
    rewrite ^(.*) https://$host$1 permanent;
}
```

增加ssl session的缓存时间。

```javascript
worker_processes auto;

http {
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 10m;

    server {
        listen              443 ssl;
        server_name         www.example.com;
        keepalive_timeout   70;

        ssl_certificate     www.example.com.crt;
        ssl_certificate_key www.example.com.key;
        ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers         HIGH:!aNULL:!MD5;
        ...
```

同一台服务器同时处理HTTP和HTTPs请求。

```
server {
    listen              80;
    listen              443 ssl;
    server_name         www.example.com;
    ssl_certificate     www.example.com.crt;
    ssl_certificate_key www.example.com.key;
    ...
}
```

同一张证书支持多个域名（比如，同时支持www.example.com和www.example.org）。

```
ssl_certificate     common.crt;
ssl_certificate_key common.key;

server {
    listen          443 ssl;
    server_name     www.example.com;
    ...
}

server {
    listen          443 ssl;
    server_name     www.example.org;
    ...
}
```

如果浏览器支持 TLS Server Name Indication 扩展，就可以一台服务器支持多个证书。

```
server {
    listen          443 ssl;
    server_name     www.example.com;
    ssl_certificate www.example.com.crt;
    ...
}

server {
    listen          443 ssl;
    server_name     www.example.org;
    ssl_certificate www.example.org.crt;
    ...
}
```

检查nginx是否支持SNI扩展。

```bash
$ NGINX -V
...
TLS SNI support enabled
...
```

## 均衡负载

```
http {
  upstream cluster {
      server 127.0.0.1:3000;
      server 127.0.0.1:3001;
      server 127.0.0.1:3002;
      server 127.0.0.1:3003;
  }
  server {
       listen 80;
       server_name www.domain.com;
       location / {
            proxy_pass http://cluster;
       }
  }
}
```

## 参考链接

- nginx Document, [Restricting Access](http://nginx.com/resources/admin-guide/restricting-access/)
- fcambus, [Nginx Resources](https://github.com/fcambus/nginx-resources)
- Nishant Modak, [Nginx Guide: Essentials](http://code.tutsplus.com/articles/nginx-guide-essentials--cms-22880)
- H5BP, [Server Configs Nginx](https://github.com/h5bp/server-configs-nginx/blob/master/doc/TOC.md)
