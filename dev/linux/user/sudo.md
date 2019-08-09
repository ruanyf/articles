# sudo 命令

`su`和`sudo`命令允许当前用户切换成另一个用户。

## sudo 命令

`sudo`命令允许您使用其他用户的权限运行程序（默认情况下，以超级用户身份）。它会提示您输入个人密码，并通过检查sudoers系统管理员配置的文件来确认您执行命令的请求。

```bash
$ sudo [command]
```

上面命令中，`command`是所要执行的命令。

`-l`参数显示当前用户的权限。

```bash
$ sudo -l
Matching Defaults entries for abhi on test-server:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User abhi may run the following commands on test-server:
    (ALL : ALL) NOPASSWD: ALL
```

`-U`参数指定用户。

```bash
$ sudo -l -U [username]
```

## su 命令

`su`命令允许你成为另一个用户。

```bash
$ su [username]
```

以其他用户的身份，执行单个命令。

```bash
$ su [username] -c [command]
```

如果不输入用户名，就默认为`root`用户。

系统会提示你输入该用户的密码。
