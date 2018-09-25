# SSH 基本知识

SSH（Secure Shell 的缩写）是一种加密网络协议，用于客户端和服务器之间的安全连接，并支持各种身份验证机制。

两种最流行的机制是基于密码的身份验证和基于公钥的身份验证。后者比传统的密码验证更安全，更方便。

## 密钥

用户的密钥一般都放在主目录的`.ssh`目录里面。

下面的命令列出用户所有的公钥。

```bash
$ ls -l ~/.ssh/id_*.pub
```

如果不存在任何密钥，可以手动生成一个。下面命令生成一个新的4096位 SSH 密钥对，并将指定的电子邮件地址作为注释。

```bash
$ ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"
```

这时，系统会提示输入密钥的位置和文件名，用户可以选择接受默认设置。另外，还会提示是否对密钥设置口令保护（passphrase）。

## ssh-copy-id 命令

为了登录远程服务器，需要把用户的个人密钥拷贝到服务器。`ssh-copy-id`就用于把本地密钥复制到远程服务器。

```bash
$ ssh-copy-id remoteusername@server_ip_address
```

这时，系统会提示输入远程服务器的密码。

用户通过身份验证后，公钥`~/.ssh/id_rsa.pub`将复制到远程用户的`~/.ssh/authorized_keys`文件，并将关闭连接。

如果没有安装`ssh-copy-id`命令，可以用下面的命令代替。

```bash
$ cat ~/.ssh/id_rsa.pub | ssh remoteusername@server_ip_address "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

上面命令的作用就是将本地用户的公钥，写入远程的`~/.ssh/authorized_keys`文件。

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

### 命令行参数

`-i`指定登陆服务器所需要的私钥，意为“identity_file”，默认为`~/.ssh/id_dsa`。

```bash
$ ssh johndoe@host.example.com -i ~/.ssh/host.key
```

