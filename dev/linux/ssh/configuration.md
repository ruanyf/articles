# SSH 的配置

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

修改配置文件以后，可以使用下面的命令验证，配置文件是否有错误。

```bash
$ sshd -t
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
