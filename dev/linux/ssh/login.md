# SSH 密码登录

## ssh 的基本用法

SSH 登录服务器的命令如下。

```bash
$ ssh hostname
```

上面命令中，`hostname`是主机名，它可以是域名，也可能是 IP 地址，局域网内部的主机名。

不指定用户名的情况下，将使用客户端的当前用户名，作为远程服务器的登录用户名。如果希望使用另一个用户名登录服务器，可以采用下面的语法。

```bash
$ ssh user@hostname
```

上面的命令中，用户名和主机名写在一起了，之间使用`@`分隔。

`ssh`的`-l`参数可以用来指定用户名，这样的话，用户名和主机名就不用写在一起了。

```bash
$ ssh -l username host
```

发出登录命令后，SSH 客户端就会尝试与远程服务器建立加密连接。如果第一次连接某个主机，SSH 会跳出一段警告信息。

```bash
$ ssh -l pat shell.isp.com

The authenticity of host 'shell.isp.com (192.168.0.2)' can't be established.
RSA key fingerprint is 77:a5:69:81:9b:eb:40:76:7b:13:04:a9:6c:f4:9c:5d.
Are you sure you want to continue connecting (yes/no)?
```

上面这段警告信息的意思是，`shell.isp.com`这台主机的公钥指纹是陌生的，你是否确定要继续连接？

“公钥指纹”指的是服务器公钥的哈希值，下面的命令可以查看某个公钥的指纹。

```bash
$ ssh-keygen -l -f /etc/ssh/ssh_host_ecdsa_key.pub
256 da:24:43:0b:2e:c1:3f:a1:84:13:92:01:52:b4:84:ff   (ECDSA)
```

上面的例子中，`ssh-keygen -l -f`命令会输出公钥`/etc/ssh/ssh_host_ecdsa_key.pub`的指纹。

再回到前面，第一次连接是否要继续的问题。回答`yes`以后，SSH 就会继续连接，并将远程主机列为可信的主机，并将公钥指纹保存到客户端的文件`~/.ssh/known_hosts`里面，以后再次连接就不会跳出这段警告了。公钥指纹可以防止有人恶意冒充远程主机。

```bash
Warning: Permanently added 'shell.isp.com,192.168.0.2' (RSA) to the list of known hosts
```

客户端确认服务器可信以后，就会要求用户输入远程服务器的密码。

```bash
pat@shell.isp.com's password:
```

用户输入的密码会通过加密连接发给服务器，服务器检验正确以后，就会准许客户端登录。

## 服务器公钥变更

公钥指纹可以防止有人恶意冒充远程主机。

如果服务器的公钥发生变更（比如重装了 sshd），客户端再次连接时，就会发生公钥指纹不吻合的情况。这时，客户端就会中断连接，并显示一段警告信息。

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

这时，你需要确认到底是什么原因，使得公钥指纹发生变更，到底是恶意劫持，还是管理员变更了 SSH 服务器公钥。

如果新的公钥确认可以信任，需要继续执行连接，你可以执行下面的命令，将原来的公钥指纹从`~/.ssh/known_hosts`文件删除。

```bash
$ ssh-keygen -R hostname
```

上面命令中，`hostname`是发生公钥变更的主机名。

除了使用上面的命令，你也可以手工修改`known_hosts`文件，将公钥指纹删除。

## 执行远程命令

SSH 登录成功后，用户就进入了远程主机的命令行环境，所看到的提示符，就是远程主机的提示符。这时，你就可以输入想要在远程主机执行的命令。

另一种执行远程命令的方法，是将命令直接写在`ssh`连接命令的后面。

```bash
$ ssh username@hostname command
```

上面的命令会使得 SSH 在登录成功后，立刻在远程主机上执行命令`command`。

下面是一个例子。

```bash
$ ssh USER@penguin.example.com cat /etc/hosts
```

上面的命令会在登录成功后，立即远程执行命令`cat /etc/hosts`。

