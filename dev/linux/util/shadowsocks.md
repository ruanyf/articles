# Shadowsocks的用法

Shadowsocks简称SS，是轻量代理应用服务端。在VPS上搭建SS服务端，可支持在android、iPhone、window、macos多平台上使用。

Linux 环境安装客户端

```bash
$ sudo pip install shadowsocks
```

启动客户端。

```bash
$ sslocal -s server_ip -p server_port  -l 1080 -k password -t 600 -m aes-256-cfb
# 或者
$ sslocal -s ip  -p  port -k "password"
# 或者
$ sslocal -c /etc/shadowsocks/config.json
```

上面代码中，-s表示服务IP, -p指的是服务端的端口，-l是本地端口默认是1080（可以替换成任何端口号，只需保证端口不冲突）, -k 是密码（要加""）, -t超时默认300,-m是加密方法默认aes-256-cfb，

客户端配置项。

- 服务器：填写 服务器IP地址或域名
- 远程端口： 填写 服务器端口
- 本地端口：1080
- 密码： 填写密码
- 加密方法：选择一种加密方法

Android使用方法：在Google Play里搜索“影梭”或者“ShadowSocks”安装。

window客户端使用开源项目shadowsocks-r。
