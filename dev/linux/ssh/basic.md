# SSH 基本知识

SSH（Secure Shell 的缩写）是一种加密相关的网络协议，用于客户端和服务器之间的加密通信，并支持各种身份验证机制。

它主要用于保证远程登录和远程执行命令的安全，但是任何网络服务都可以用这个协议来加密。

## SSH 是什么

历史上，网络主机之间的通信是不加密的，属于明文通信。这使得通信很不安全，一个典型的例子就是服务器登录。登录远程服务器，需要将用户输入的密码传给服务器，如果这个过程是明文通信，就意味着传递过程中，信号经过的中间计算机都能看到密码，这是很可怕的。

SSH 就是为了解决这个问题而诞生的，它能够加密计算机之间的通信，保证不被窃听或篡改。它还能对操作者进行认证（authentication）和授权（authorization）。那些明文的网络协议可以套用在它里面，从而实现加密。

## 历史

1995年，芬兰赫尔辛基工业大学的研究员 Tatu Ylönen 设计了 SSH 协议的第一个版本（现称为 SSH-1），同时写出了第一个实现（称为 SSH1）。当时，他所在的大学网络一直发生密码嗅探攻击，他不得不为服务器设计一个更安全的登录方式。写完以后，他就把这个工具公开了，允许其他人免费使用。

SSH 可以替换 rlogin、TELNET、FTP 和 rsh 这些不安全的协议，所以大受欢迎，用户快速增长，1995年底已经发展到五十个国家的20,000个用户。SSH-1 协议也变成 IETF 的标准化文档。

1995年12月，由于客服需求越来越大，Tatu Ylönen 就成立了一家公司 SCS，专门销售和开发 SSH。这个软件的后续版本，逐渐从免费软件变成了专有软件。

SSH-1 协议存在一些安全漏洞，所以1996年就提出了 SSH-2（或者称为 SSH 2.0）协议。这个协议与1.0版不兼容，在1997年进行了标准化，1998年推出了软件实现 SSH2。但是，官方的 SSH2 软件是一个专有软件，不能免费使用，而且 SSH1 的有些功能也没有提供。

1999年，OpenBSD 的开发人员决定写一个 SSH-2 协议的开源实现，这就是 OpenSSH 项目。该项目最初是基于 SSH 1.2.12 版本，那是当时 SSH-1 协议最新的免费版本。但是，它很快就完全摆脱了官方代码，在许多开发者的参与下，按照自己的路线发展。OpenSSH 随 OpenBSD 2.6 版本一起提供，以后又移植到其他操作系统，成为最流行的 SSH 实现。目前，Linux 的所有发行版几乎都自带 OpenSSH。

现在，SSH-2 有多种实现，既有免费的，也有收费的。本书的内容主要是针对 OpenSSH。

## SSH 架构

SSH 的软件架构是服务器-客户端模式（Server - Client）。

SSH 软件分成两个部分。接收客户端发出的请求的部分，称为服务器（server），在 Unix / Linux 系统的实现一般为 sshd。向服务器发出请求的部分，称为客户端（client），在 Unix / Linux 系统的实现一般为 ssh。本教程约定，大写的 SSH 表示协议，小写的 ssh 表示客户端软件。另外，一些专用的程序，比如 scp 和 sftp 也属于 SSH 客户端。

此外，SSH 还包括一些辅助工具，用来帮助实现加密功能，比如`ssh-keygen`、`ssh-agent`等。

## 登录远程服务器

SSH 登录服务器的命令如下。

```bash
$ ssh username@host
```

执行上面的命令，本地计算机通过 SSH 客户端，就能登录远程服务器。上面这种格式，用户名和主机名写在一起了，之间使用`@`分隔。

`-l`参数可以用来指定用户名，这样的话，用户名和主机名就不用写在一起了。

```bash
$ ssh -l username host
```

执行登录命令以后，SSH 客户端就会与远程服务器建立加密连接。如果是第一次连接某个主机，SSH 会跳出一段警告信息。

```bash
$ ssh -l pat shell.isp.com

The authenticity of host 'shell.isp.com (192.168.0.2)' can't be established.
RSA key fingerprint is 77:a5:69:81:9b:eb:40:76:7b:13:04:a9:6c:f4:9c:5d.
Are you sure you want to continue connecting (yes/no)?
```

上面这段警告信息的意思是，`shell.isp.com`这台主机的公钥指纹是陌生的，你是否确定要继续连接？回答`yes`以后，SSH 就会继续连接，并将远程主机的公钥指纹保存下来，列为可信的主机，以后再次连接就不会跳出这段警告了。公钥指纹可以防止有人恶意冒充远程主机。

```bash
Warning: Permanently added 'shell.isp.com,192.168.0.2' (RSA) to the list of known hosts
```

确认为可信主机以后，客户端会要求用户输入远程服务器的密码。密码会通过加密连接发给服务器，服务器检验正确以后，就会准许客户端登录。

## 公钥指纹变更

公钥指纹可以防止有人恶意冒充远程主机。如果遇到已知主机的指纹变更，SSH 连接时会显示一段警告信息。

```bash
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that the RSA host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
77:a5:69:81:9b:eb:40:76:7b:13:04:a9:6c:f4:9c:5d.
Please contact your system administrator.
Add correct host key in /home/smith/.ssh/known_hosts to get rid of this message.
Offending key in /home/smith/.ssh/known_hosts:36
```

这时，你需要确认到底是什么原因，使得公钥指纹发生变更。除了恶意劫持，也有可能是管理员变更了公钥。

如果确认信任新的公钥，继续执行连接，就需要手工更改`known_hosts`文件，将新的公钥指纹加入该文件。

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

## OpenSSH

OpenSSH 是目前最流行的 SSH 协议客户端，可以创建远程计算机到 SSH 服务器的安全连接。

可以使用下面的命令，安装 OpenSSH。

```bash
# Ubuntu 和 Debian
$ sudo apt install openssh-client

# CentOS 和 Fedora
$ sudo dnf install openssh-clients
```

SSH 客户端的默认命令形式如下。

```bash
$ ssh [OPTIONS] [USER@]:HOST
```

最简单的用法就是直接连接远程主机。这时会使用本地的当前用户名，默认登陆远程主机的22端口。

```bash
$ ssh foo.com
```

如果是首先连接远程主义，客户端会在命令行显示一段文字，表示不认识这台服务器，是否确认需要连接。

```bash
The authenticity of host 'ssh.linuxize.com (192.168.121.111)' can't be established.
ECDSA key fingerprint is SHA256:Vybt22mVXuNuB5unE++yowF7lgA/9/2bLSiO3qmYWBY.
Are you sure you want to continue connecting (yes/no)?
```

每个主机都有一个唯一的指纹，储存在`~/.ssh/known_hosts`文件中。输入`yes`可以将当前服务器的指纹储存在本机，以后再连接的时候，就不会提示这段文字了。

然后，客户端会要求输入远程服务器的密码。输入以后，就登陆远程服务器的 Shell 了。

默认是以客户端的当前用户名，登录远程服务器。要以其他用户身份登录，用以下格式指定用户名和主机。

```bash
$ ssh username@hostname
```

还可以使用`-l`参数指定用户名。

```bash
$ ssh -l username hostname
```

默认端口是22，`-p`参数可以指定端口。

```bash
$ ssh -p 5522 username@hostname
```

`-v`参数用来显示详细信息，可以在遇到问题时使用。如果想查看更详细的信息，可以使用`-vv`或`-vvv`参数。

```bash
$ ssh -v username@hostname
```

- ssh-keygen
- ssh-agent
- ssh-add
- ssh-keysign
- ssh-keyscan
- sftp-server
- sshd

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


