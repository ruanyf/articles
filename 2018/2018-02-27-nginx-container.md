# Nginx 容器教程

春节前，我看到 Nginx [加入](https://hg.nginx.org/nginx/rev/641306096f5b)了 HTTP/2 的 server push 功能，就很想试一下。

正好这些天，我在学习 Docker，就想到可以用 [Nginx 容器](https://hub.docker.com/_/nginx/)。万一哪里改乱了，直接删掉，再重启一个容器就可以了。

下面就是我搭建 Nginx 容器的过程，以及如何加入 SSL 证书。你会看到 Docker 用来测试软件的新功能，真的很方便，很值得学习。如果你还不会 Docker，可以先看[《Docker 入门教程》](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)，非常简单，半小时以内就能学会。

## 一、HTTP 服务

Nginx 的最大作用，就是搭建一个 Web Server。有了容器，只要一行命令，服务器就架设好了，完全不用配置。

```bash
$ docker container run \
  -d \
  -p 127.0.0.2:8080:80 \
  --rm \
  --name mynginx \
  nginx
```

上面命令下载并运行官方的 [Nginx image](https://hub.docker.com/_/nginx/)，默认是最新版本（latest），当前是 1.13.9。如果本机安装过以前的版本，请删掉重新安装，因为只有 1.13.9 才开始支持 server push。

上面命令的各个参数含义如下。

> - `-d`：在后台运行
> - `-p` ：容器的`80`端口映射到`127.0.0.2:8080`
> - `--rm`：容器停止运行后，自动删除容器文件
> - `--name`：容器的名字为`mynginx`

如果没有报错，就可以打开浏览器访问 127.0.0.2:8080 了。正常情况下，显示 Nginx 的欢迎页。

然后，把这个容器终止，由于`--rm`参数的作用，容器文件会自动删除。

```bash
$ docker container stop mynginx
```

## 二、映射网页目录

网页文件都在容器里，没法直接修改，显然很不方便。下一步就是让网页文件所在的目录`/usr/share/nginx/html`映射到本地。

首先，新建一个目录，并进入该目录。

```bash
$ mkdir nginx-docker-demo
$ cd nginx-docker-demo
```

然后，新建一个`html`子目录。

```bash
$ mkdir html
```

在这个子目录里面，放置一个`index.html`文件，内容如下。

```html
<h1>Hello World</h1>
```

接着，就可以把这个子目录`html`，映射到容器的网页文件目录`/usr/share/nginx/html`。

```bash
$ docker container run \
  -d \
  -p 127.0.0.2:8080:80 \
  --rm \
  --name mynginx \
  --volume "$PWD/html":/usr/share/nginx/html \
  nginx
```

打开浏览器，访问 127.0.0.2:8080，应该就能看到 Hello World 了。

## 三、拷贝配置

修改网页文件还不够，还要修改 Nginx 的配置文件，否则后面没法加 SSL 支持。

首先，把容器里面的 Nginx 配置文件拷贝到本地。

```bash
$ docker container cp mynginx:/etc/nginx .
```

上面命令的含义是，把`mynginx`容器的`/etc/nginx`拷贝到当前目录。不要漏掉最后那个点。

执行完成后，当前目录应该多出一个`nginx`子目录。然后，把这个子目录改名为`conf`。

```bash
$ mv nginx conf
```

现在可以把容器终止了。

```bash
$ docker container stop mynginx
```

## 四、映射配置目录

重新启动一个新的容器，这次不仅映射网页目录，还要映射配置目录。

```bash
$ docker container run \
  --rm \
  --name mynginx \
  --volume "$PWD/html":/usr/share/nginx/html \
  --volume "$PWD/conf":/etc/nginx \
  -p 127.0.0.2:8080:80 \
  -d \
  nginx
```

上面代码中，`--volume "$PWD/conf":/etc/nginx`表示把容器的配置目录`/etc/nginx`，映射到本地的`conf`子目录。

浏览器访问 127.0.0.2:8080，如果能够看到网页，就说明本地的配置生效了。这时，可以把这个容器终止。

```bash
$ docker container stop mynginx
```

## 五、自签名证书

现在要为容器加入 HTTPS 支持，第一件事就是生成私钥和证书。正式的证书需要证书当局（CA）的签名，这里是为了测试，搞一张自签名（self-signed）证书就可以了。

下面，我参考的是 [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04) 的教程。首先，确定你的机器安装了 [OpenSSL](https://www.openssl.org/source/)，然后执行下面的命令。

```bash
$ sudo openssl req \
  -x509 \
  -nodes \
  -days 365 \
  -newkey rsa:2048 \
  -keyout example.key \
  -out example.crt
```

上面命令的各个参数含义如下。

- `req`：处理证书签署请求。
- `-x509`：生成自签名证书。
- `-nodes`：跳过为证书设置密码的阶段，这样 Nginx 才可以直接打开证书。
- `-days 365`：证书有效期为一年。
- `-newkey rsa:2048`：生成一个新的私钥，采用的算法是2048位的 RSA。
- `-keyout`：新生成的私钥文件为当前目录下的`example.key`。
- `-out`：新生成的证书文件为当前目录下的`example.crt`。

执行后，命令行会跳出一堆问题要你回答，比如你在哪个国家、你的 Email 等等。

其中最重要的一个问题是 Common Name，正常情况下应该填入一个域名，这里可以填 127.0.0.2。

```bash
Common Name (e.g. server FQDN or YOUR name) []:127.0.0.2
```

回答完问题，当前目录应该会多出两个文件：`example.key`和`example.crt`。

`conf`目录下新建一个子目录`certs`，把这两个文件放入这个子目录。

```bash
$ mkdir conf/certs
$ mv example.crt example.key conf/certs
```

## 六、HTTPS 配置

有了私钥和证书，就可以打开 Nginx 的 HTTPS 了。
 
首先，打开`conf/conf.d/default.conf`文件，在结尾添加下面的配置。

```bash
server {
    listen 443 ssl http2;
    server_name  localhost;

    ssl                      on;
    ssl_certificate          /etc/nginx/certs/example.crt;
    ssl_certificate_key      /etc/nginx/certs/example.key;

    ssl_session_timeout  5m;

    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers   on;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
```

然后，启动一个新的 Nginx 容器。

```bash
$ docker container run \
  --rm \
  --name mynginx \
  --volume "$PWD/html":/usr/share/nginx/html \
  --volume "$PWD/conf":/etc/nginx \
  -p 127.0.0.2:8080:80 \
  -p 127.0.0.2:8081:443 \
  -d \
  nginx
```

上面命令中，不仅映射了容器的80端口，还映射了443端口，这是 HTTPS 的专用端口。

打开浏览器，访问 https://127.0.0.2:8081/ 。因为使用了自签名证书，浏览器会提示不安全。不要去管它，选择继续访问，应该就可以看到 Hello World 了。

至此，Nginx 容器的 HTTPS 支持就做好了。有了这个容器，下一篇文章，我就来试验 HTTP/2 的 server push 功能。

## 七、参考链接

- [Tips for deploying nginx(official image) with docker](https://blog.docker.com/2015/04/tips-for-deploying-nginx-official-image-with-docker/), by Mario Ponticello
- [How To Run Nginx in a Docker Container on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-run-nginx-in-a-docker-container-on-ubuntu-14-04), by Thomas Taege
- [Official Docker Library docs](https://docs.docker.com/samples/library/nginx/),  by Docker
- [How To Create a Self-Signed SSL Certificate for Nginx in Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04), by Justin Ellingwood

（完）

## HTTP/2 Push

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>hello world</h1>
  <img src="example.png">
</body>
</html>
```

- [Introducing HTTP/2 Server Push with NGINX 1.13.9](https://www.nginx.com/blog/nginx-1-13-9-http2-server-push/), by Nginx

