# SSH用法

## SSL/TLS协议

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

