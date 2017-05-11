## 负载均衡

Nginx 可以用作负载均衡。

```
upstream backend  {
  server backend1.example.com;
  server backend2.example.com;
  server backend3.example.com;
}
```

上面代码会将流量分配到三台服务器。具体的分配规则，由 Nginx 自动完成。

Nginx 允许调整不同服务器的权重。

```
upstream backend  {
  server backend1.example.com weight=1;
  server backend2.example.com weight=2;
  server backend3.example.com weight=4;
}
```

如果有一台服务器有连接失败的可能，可以在配置中指明。

```
upstream backend  {
  server backend1.example.com max_fails=3  fail_timeout=15s;
  server backend2.example.com weight=2;
  server backend3.example.com weight=4;
}
```

上面代码指定，连续三次失败或15秒超时，Nginx会不再给这台服务器分配流量。

如果某台服务器下线，可以手动指定。

```
upstream backend  {
  server backend1.example.com weight=1;
  server backend2.example.com weight=2;
  server backend3.example.com down;
}
```

最后，建立一个到`backend`的代理。

```
server {
  location / {
    proxy_pass  http://backend;
  }
}
```
