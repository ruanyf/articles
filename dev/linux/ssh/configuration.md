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



## 服务器配置项

修改配置文件以后，可以使用下面的命令验证，配置文件是否有错误。

```bash
$ sshd -t
```

以下是`/etc/ssh/sshd_config`文件里面的配置项。

- `AllowUsers user1 user2`：允许登录的用户，用户名之间使用空格分隔。
- `AllowTcpForwarding yes`：允许端口转发。
- `Ciphers 3des-cbc`：sshd 可以接受的加密算法，多个算法之间使用逗号分隔。
- `ClientAliveCountMax 8`：客户端没有响应时，服务器尝试连接的次数。
- `ClientAliveInterval 180`：允许客户端发呆的时间，单位为秒。如果这段时间里面，客户端没有发送任何信号，SSH 连接将关闭。
- `Compression yes`：客户端与服务器之间的数据传输是否压缩。
- `ListenAddress 0.0.0.0`：sshd 启用的网址，默认在本机所有网络接口启用，可以指定只在某个网络接口启用（比如`ListenAddress 192.168.10.23`），也可以指定某个域名启用（比如`ListenAddress server.example.com`）。
- `LoginGraceTime 60`：允许客户端登录时发呆的最长时间，比如迟迟不输入密码，单位为秒。如果设为`0`，就表示没有限制。
- `MACs hmac-sha1`：sshd 可以接受的数据校验算法，多个算法之间使用逗号分隔。
- `MaxAuthTries 3`：允许 SSH 登录的最大尝试次数，如果密码输入错误达到指定次数，SSH 连接将关闭。
- `MaxStartups 32`：允许同时并发的 SSH 连接数量。如果设为`0`，就表示没有限制。这个属性也可以设为`A:B:C`的形式，比如`MaxStartups 10:50:20`，表示如果达到10个并发连接，后面的连接将有50%的概率被拒绝；如果达到20个并发连接，则后面的连接将100%被拒绝。
- `PasswordAuthentication yes`：允许密码登录，建议改成`no`（禁止密码登录，只允许密钥登录）。
- `PermitEmptyPasswords yes`：允许无密码登录，即用户的密码为空，建议改成`no`（禁止无密码登录）。
- `PermitRootLogin yes`：允许根用户登录，建议改成`no`（禁止根用户登录）。
- `Protocol 1`：使用 SSH-1 协议，建议改成`2`（SSH-2 协议）。可以同时支持两个协议，比如`Protocol 2,1`。
- `Port 9876`：sshd 的连接端口。
- `StrictModes yes`：sshd 是否检查用户的一些重要文件和目录的权限。对于用户的 SSH 配置文件、密钥文件和所在目录，SSH 要求拥有者必须是根用户或用户本人，用户组和其他人的写权限必须关闭。
- `TCPKeepAlive yes`：打开 sshd 跟客户端 TCP 连接的 keepalive 参数。
- `UseDNS yes`：用户 SSH 登录一个域名时，服务器是否使用 DNS，确认该域名对应的 IP 地址包含本机。打开该选项意义不大，而且如果 DNS 更新不及时，还有可能误判，建议关闭。

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

修改配置文件之后，必须重启 SSH 服务。

```bash
$ systemctl restart sshd
```

## AuthenticationMethods

`AuthenticationMethods`字段用于指定认证方法。

```bash
AuthenticationMethods "publickey,password"
```

上面代码表示，用户登录时必须先验证密钥，然后再输入密码。注意，这时`PasswordAuthentication`字段必须设为`yes`。

```bash
Match User jsmith
    AuthenticationMethods "publickey,password"
```

上面代码表示，只对用户`jsmith`开启这个登录要求。
