# TLS 设置

## 启用 HTTP/2

打开配置文件（比如`/etc/nginx/sites-enabled/sitename`)，将下面的一行改掉。

```bash
listen 443 ssl;
```

改成

```bash
listen 443 ssl http2;
```

改完以后，可以使用下面的命令验证。

```bash
$ curl --http2 -I https://domain.com/
```

## 弃用 TLS 1.0

如果要放弃使用 TLS 协议 1.0 版本，就要把下面一行改掉。

```bash
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
```

改成

```bash
ssl_protocols TLSv1.1 TLSv1.2;
```

## 参考链接

- Hayden James, [Nginx tuning tips: TLS/SSL HTTPS – Improved TTFB/latency](https://haydenjames.io/nginx-tuning-tips-tls-ssl-https-ttfb-latency/)
