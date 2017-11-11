# SSH 的配置

SSH 的配置文件是`/etc/ssh/sshd_config`（服务端）和`/etc/ssh/ssh_config`（客户端）。

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
