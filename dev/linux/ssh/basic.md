# SSH 基本知识

SSH（Secure Shell 的缩写）是一种网络协议，用于加密两台计算机之间的通信，并且支持各种身份验证机制。

实务中，它主要用于保证远程登录和远程命令的安全，但是任何网络服务都可以用这个协议来加密。

## SSH 是什么

历史上，网络主机之间的通信是不加密的，属于明文通信。这使得通信很不安全，一个典型的例子就是服务器登录。登录远程服务器的时候，需要将用户输入的密码传给服务器，如果这个过程是明文通信，就意味着传递过程中，线路经过的中间计算机都能看到密码，这是很可怕的。

SSH 就是为了解决这个问题而诞生的，它能够加密计算机之间的通信，保证不被窃听或篡改。它还能对操作者进行认证（authentication）和授权（authorization）。明文的网络协议可以套用在它里面，从而实现加密。

## 历史

1995年，芬兰赫尔辛基工业大学的研究员 Tatu Ylönen 设计了 SSH 协议的第一个版本（现称为 SSH 1），同时写出了第一个实现（称为 SSH1）。

当时，他所在的大学网络一直发生密码嗅探攻击，他不得不为服务器设计一个更安全的登录方式。写完以后，他就把这个工具公开了，允许其他人免费使用。

SSH 可以替换 rlogin、TELNET、FTP 和 rsh 这些不安全的协议，所以大受欢迎，用户快速增长，1995年底已经发展到五十个国家的20,000个用户。SSH 1 协议也变成 IETF 的标准文档。

1995年12月，由于客服需求越来越大，Tatu Ylönen 就成立了一家公司 SCS，专门销售和开发 SSH。这个软件的后续版本，逐渐从免费软件变成了专有软件。

SSH 1 协议存在一些安全漏洞，所以1996年就提出了 SSH 2（或者称为 SSH 2.0）协议。这个协议与1.0版不兼容，在1997年进行了标准化，1998年推出了软件实现 SSH2。但是，官方的 SSH2 软件是一个专有软件，不能免费使用，而且 SSH1 的有些功能也没有提供。

1999年，OpenBSD 的开发人员决定写一个 SSH 2 协议的开源实现，这就是 OpenSSH 项目。该项目最初是基于 SSH 1.2.12 版本，那是当时 SSH 1 协议最新的免费版本。但是，它很快就完全摆脱了官方代码，在许多开发者的参与下，按照自己的路线发展。OpenSSH 随 OpenBSD 2.6 版本一起提供，以后又移植到其他操作系统，成为最流行的 SSH 实现。目前，Linux 的所有发行版几乎都自带 OpenSSH。

现在，SSH-2 有多种实现，既有免费的，也有收费的。本书的内容主要是针对 OpenSSH。

## SSH 架构

SSH 的软件架构是服务器-客户端模式（Server - Client）。在这个架构中，SSH 软件分成两个部分。

接收客户端发出的请求的部分，称为服务器（server），OpenSSH 的实现为 sshd。向服务器发出请求的部分，称为客户端（client），OpenSSH 的实现为 ssh。

本教程约定，大写的 SSH 表示协议，小写的 ssh 表示客户端软件。

另外，OpenSSH 还提供一些辅助工具软件（比如 ssh-keygen 、ssh-agent）和专门的客户端工具（比如 scp 和 sftp）。

## SSL/TLS 协议

客户端要向服务端提供一些加密参数，这叫做“加密集”（cipher suite）。

```
TLS_RSA_WITH_AES_128_CBC_SHA
```

含义如下。

- TLS：协议
- RSA：密钥交换算法
- AES：加密算法
- 128：加密强度
- CBC：加密模式
- SHA：数字签名的Hash函数

```http
Handshake protocol: ClientHello
    Version: TLS 1.2
    Random
        Client time: May 22, 2030 02:43:46 GMT
        Random bytes: b76b0e61829557eb4c611adfd2d36eb232dc1332fe29802e321ee871
    Session ID: (empty)
    Cipher Suites
        Suite: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256”
        Suite: TLS_DHE_RSA_WITH_AES_128_GCM_SHA256
        Suite: TLS_RSA_WITH_AES_128_GCM_SHA256
        Suite: TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA
        Suite: TLS_DHE_RSA_WITH_AES_128_CBC_SHA
        Suite: TLS_RSA_WITH_AES_128_CBC_SHA
        Suite: TLS_RSA_WITH_3DES_EDE_CBC_SHA
        Suite: TLS_RSA_WITH_RC4_128_SHA
    Compression methods
        Method: null
    Extensions
        Extension: server_name
            Hostname: www.feistyduck.com
        Extension: renegotiation_info
        Extension: elliptic_curves
            Named curve: secp256r1
            Named curve: secp384r1
        Extension: signature_algorithms
            Algorithm: sha1/rsa
            Algorithm: sha256/rsa
            Algorithm: sha1/ecdsa
            Algorithm: sha256/ecdsa”
```

服务器回应

```http
Handshake protocol: ServerHello
    Version: TLS 1.2
    Random
        Server time: Mar 10, 2059 02:35:57 GMT”
        Random bytes: 8469b09b480c1978182ce1b59290487609f41132312ca22aacaf5012
    Session ID: 4cae75c91cf5adf55f93c9fb5dd36d19903b1182029af3d527b7a42ef1c32c80
    Cipher Suite: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
    Compression method: null
    Extensions
        Extension: server_name
        Extension: renegotiation_info”
```

### 生成密钥

```bash
$ ssh-keygen -t rsa
# 或者
$ ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"
```

密钥会在`~/.ssh`目录生成。

服务器安装OpenSSH服务器。

```bash
$ sudo apt-get install openssh-server

# Ubuntu 15.04+
$ systemctl restart ssh

# Ubuntu 14.04
$ service ssh restart
```

将本地密钥推送到服务器。

```bash
$ ssh-copy-id username@host
```

上面命令会将公钥添加到远程用户的`authorized_keys`文件中。密钥上传后，就可以直接登录到远程服务器，而无需提示输入密码。

通过设置基于密钥的身份验证，可以简化登录过程并提高整体服务器安全性。

### 命令行参数

`-4`：连接时使用 IPv4。

`-6`：连接时使用 IPv6。

`-C`：传输数据时采用压缩。

`-D`：指定本机的 Socks 监听端口，该端口收到的请求，都将转发到远程的 SSH 主机。

```bash
$ ssh -D 8888 user@remoteserver
```

`-i`：指定登陆服务器所需要的私钥，意为“identity_file”，默认为`~/.ssh/id_dsa`。

```bash
$ ssh johndoe@host.example.com -i ~/.ssh/host.key
```

`-L`：指定本地端口绑定。

```bash
$ ssh  -L 9999:targetServer:80 user@remoteserver
```

上面代码中，所有发向本地`9999`端口的请求，都会经过`remoteserver`发往 targetServer 的 80 端口，这就相当于直接连上了 targetServer 的 80 端口。

`-p`：指定远程的端口，比如`-p 22`。

`-R`：指定远程端口绑定。

```bash
$ ssh -R 9999:targetServer:902 user@remoteserver
```

上面命令中，指定`remoteserver`监听自己的 9999 端口，所有发向这个端口的请求，都会转向 targetServer 的 902 端口。

`-v`：输出详细的调试信息。


