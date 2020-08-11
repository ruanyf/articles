# SSH 的配置

## 客户端配置文件

SSH 客户端的全局配置文件放在`/etc/ssh/`目录，用户个人的配置文件放在`~/.ssh/`目录。

全局的配置文件默认为`/etc/ssh/ssh_config`。用户个人的配置文件`~/.ssh/config`如果存在的话，将覆盖全局配置文件。

用户个人的 SSH 配置文件。

- `~/.ssh/authorized_keys`：包含服务器的授权公共密钥列表。当客户端连接到服务器时，服务器通过检查存储在此文件中的已签名公钥来对客户端进行身份验证。
- `~/.ssh/id_ecdsa`：用户的 ECDSA 私钥。
- `~/.ssh/id_ecdsa.pub`：用户的 ECDSA 公钥。
- `~/.ssh/id_rsa`：用于 SSH 协议版本2 的RSA私钥。
- `~/.ssh/id_rsa.pub`：用于SSH 协议版本2 的RSA公钥。
- `~/.ssh/identity`：用于 SSH 协议版本1 的RSA私钥。
- `~/.ssh/identity.pub`：用于 SSH 协议版本1 的RSA公钥。
- `~/.ssh/known_hosts`：包含用户访问的SSH服务器的主机密钥。该文件对于确保SSH客户端连接到正确的SSH服务器非常重要。

## 原始材料

SSH 的配置文件是`/etc/ssh/sshd_config`（服务端）和`/etc/ssh/ssh_config`（客户端），用户个人的配置文件在`~/.ssh/config`，下面是一个例子。

```bash
Host *
     Port 2222

Host remoteserver
     HostName remoteserver.thematrix.io
     User neo
     Port 2112
     IdentityFile /home/test/.ssh/remoteserver.private_key
```

上面代码中，`Host *`表示对所有主机生效，后面单个主机的设置可以覆盖它。

单个主机的配置格式如下。

```bash
Host dev
    HostName dev.foo.com
    User mike
    Port 4422
```

上面的内容写入配置文件，以后只需要执行`ssh dev`命令，就能登陆远程主机。

```bash
$ ssh dev
# 等同于
$ ssh -p 4422 mike@dev.foo.com
```

