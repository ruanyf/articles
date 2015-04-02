# nginx的用法

## 简介

Nginx（发音engine x）是一个轻量级的开源HTTP服务器软件，可以用来取代Apache，或者与Apache配合使用。

它与Apache的区别在于：它的设计基于事件和异步操作，而Apache完全依赖线程。当访问量很大的时候，大量新增的线程 很快会耗尽内存，而基于事件的非阻塞设计能够轻松处理。

nginx有一个主进程和几个worker进程，每一个worker进程能够处理几千个连接。

### 内置模块

nginx采用模块式设计，通过加载模块扩展功能。目前，nginx不支持动态加载模块，模块必须和内核一起编译。所有的模块都是中间件，即接收上一个模块的输入，处理后再将输出传给下一个模块。

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

Nginx的配置文件是`nginx.conf`，通常位于`/usr/local/etc/nginx`或者`/etc/nginx`。

下面是一个带注释的配置文件（复制自[nginx.conf.default](https://gist.github.com/nishantmodak/d08aae033775cb1a0f8a)）。

```
#user  nobody;
#Defines which Linux system user will own and run the Nginx server

worker_processes  1;
#Referes to single threaded process. Generally set to be equal to the number of CPUs or cores.

#error_log  logs/error.log; #error_log  logs/error.log  notice;
#Specifies the file where server logs.

#pid        logs/nginx.pid;
#nginx will write its master process ID(PID).

events {
    worker_connections  1024;
    # worker_processes and worker_connections allows you to calculate maxclients value:
    # max_clients = worker_processes * worker_connections
}


http {
    include       mime.types;
    # anything written in /opt/nginx/conf/mime.types is interpreted as if written inside the http { } block

    default_type  application/octet-stream;
    #

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    # If serving locally stored static files, sendfile is essential to speed up the server,
    # But if using as reverse proxy one can deactivate it

    #tcp_nopush     on;
    # works opposite to tcp_nodelay. Instead of optimizing delays, it optimizes the amount of data sent at once.

    #keepalive_timeout  0;
    keepalive_timeout  65;
    # timeout during which a keep-alive client connection will stay open.

    #gzip  on;
    # tells the server to use on-the-fly gzip compression.

    server {
        # You would want to make a separate file with its own server block for each virtual domain
        # on your server and then include them.
        listen       80;
        #tells Nginx the hostname and the TCP port where it should listen for HTTP connections.
        # listen 80; is equivalent to listen *:80;

        server_name  localhost;
        # lets you doname-based virtual hosting

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            #The location setting lets you configure how nginx responds to requests for resources within the server.
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```

除了`nginx.conf`，还有`sites-available`和`sites-enabled`两个目录，前者包括所有可用的网站配置，后者只包括前者的符号链接，指向那些已经激活的网站。

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

## 限制访问

限制IP段。

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

限制单个IP地址的带宽，以及能够建立的连接数。。

```

location /download/ {
    limit_conn addr 1;
    limit_rate 50k;
}

```

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

## 参考链接

- nginx Document, [Restricting Access](http://nginx.com/resources/admin-guide/restricting-access/)
- fcambus, [Nginx Resources](https://github.com/fcambus/nginx-resources)
- Nishant Modak, [Nginx Guide: Essentials](http://code.tutsplus.com/articles/nginx-guide-essentials--cms-22880)
- H5BP, [Server Configs Nginx](https://github.com/h5bp/server-configs-nginx/blob/master/doc/TOC.md)
