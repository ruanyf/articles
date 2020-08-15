# SSH 客户端的配置

## 配置项

`-C`参数表示压缩数据传输。

```bash
$ ssh -C server.example.com
```

`-F`参数指定配置文件。

```bash
$ ssh -F /usr/local/ssh/other_config
```

`-l`参数指定远程账户名。

```bash
$ ssh -l sally server.example.com
```

`-i`参数用于指定私钥。

```bash
$ ssh -i my-key server.example.com
```

`-o`参数用来指定一个配置命令。

```bash
$ ssh -o "Keyword Value"
```

举例来说，配置文件里面有如下内容。

```bash
User sally
Port 220
```

通过`-o`参数，可以把上面两个配置命令从命令行传入。

```bash
$ ssh -o "User sally" -o "Port 220" server.example.com
```

使用等号时，配置命令可以不用写在引号里面，但是等号前后不能有空格。

```bash
$ ssh -o User=sally -o Port=220 server.example.com
```

`-p`

`-p`参数指定 SSH 客户端连接的服务器端口。

```bash
$ ssh -p 2035 server.example.com
```

`-v`

`-v`参数显示详细信息。

```bash
$ ssh -v server.example.com
```

`-v`可以重复多次，表示信息的详细程度。

```bash
$ ssh -v -v -v server.example.com
```

`-2`参数指定使用 SSH 2 协议。

`-1`参数指定使用 SSH 1 协议。

```ssh
$ ssh -2 server.example.com
```

`--help`参数显示帮助信息。

```bash
$ ssh --help
```

## 客户端配置文件

SSH 客户端的全局配置文件是`/etc/ssh/ssh_config`，用户个人的配置文件在`~/.ssh/config`，如果存在的话，将覆盖全局配置文件。

除了配置文件，用户个人有一些密钥文件和其他文件。

- `~/.ssh/authorized_keys`：包含服务器的授权公共密钥列表。当客户端连接到服务器时，服务器通过检查存储在此文件中的已签名公钥来对客户端进行身份验证。
- `~/.ssh/id_ecdsa`：用户的 ECDSA 私钥。
- `~/.ssh/id_ecdsa.pub`：用户的 ECDSA 公钥。
- `~/.ssh/id_rsa`：用于 SSH 协议版本2 的RSA私钥。
- `~/.ssh/id_rsa.pub`：用于SSH 协议版本2 的RSA公钥。
- `~/.ssh/identity`：用于 SSH 协议版本1 的RSA私钥。
- `~/.ssh/identity.pub`：用于 SSH 协议版本1 的RSA公钥。
- `~/.ssh/known_hosts`：包含用户访问的SSH服务器的主机密钥。该文件对于确保SSH客户端连接到正确的SSH服务器非常重要。

下面是用户个人配置文件的一个例子。

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

```bash
Host *.edu
 Compression yes
 PasswordAuthentication yes
```

对所有主机都有效的配置，可以写在`Host *`。

```bash
Host *
 Compression yes
```

后面单个主机的配置可以覆盖通用配置。

`Host`也可以用来指定昵称。

```bash
Host simple
HostName myserver.example.com
```

连接是，直接连接`myserver`即可。

```bash
$ ssh simple
```

上面命令中，`ssh`会自动连接`myserver.example.com`。

## 配置文件的命令

ssh 客户端配置文件的每一行，就是一个配置命令。配置命令与对应的值之间，可以使用空格，也可以使用等号。

```bash
Compression yes
# 等同于
Compression = yes
```

`#`开头的行表示注释，会被忽略。空行等同于注释。

- `Compression yes`：压缩传输信息。
- `Host server.example.com`：指定连接的域名或 IP 地址，可以使用通配符，也可以是昵称。`Host`命令后面的所有配置，都是针对该主机的，直到下一个`Host`命令为止。
- `HostName myserver.example.com`：在`Host`命令使用昵称的情况下，`HostName`指定域名或 IP 地址。
- `IdentityFile keyfile`：指定私钥文件。
- `StrictHostKeyChecking yes`：`yes`表示严格检查，服务器公钥为未知或发生变化，则拒绝连接。`no`表示如果服务器公钥未知，则加入客户端公钥数据库，如果公钥发生变化，不改变客户端公钥数据库，输出一条警告，依然允许连接继续进行。`ask`（默认值）表示询问用户是否继续进行。
- `CheckHostIP yes`：检查 SSH 服务器的 IP 地址是否跟公钥数据库吻合。
- `VerifyHostKeyDNS yes`：是否检查 SSH 服务器的 DNS 记录，有没有公钥里保存的一致。
- `GlobalKnownHostsFile /users/smith/.ssh/my_global_hosts_file`：指定全局的公钥数据库文件的位置。
- `Port 2035`：指定客户端连接的 SSH 服务器端口。
- `Protocol 2`：支持的 SSH 协议版本，多个版本之间使用逗号分隔。
- `SendEnv COLOR`：SSH 客户端向服务器发送的环境变量名，多个环境变量之间使用空格分隔。环境变量的值从客户端当前环境中拷贝。
- `User userName`：指定远程账户名。
- `UserKnownHostsFile /users/smith/.ssh/my_local_hosts_file`：指定当前用户的公钥数据库文件的位置。
