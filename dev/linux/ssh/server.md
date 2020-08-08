# SSH 服务器端

## 简介

SSH 的架构是服务器/客户端模式，两端运行的软件是不一样的。OpenSSH 的服务器软件叫做 sshd。

一般来说，sshd 安装后会跟着系统一起启动。如果当前 sshd 没有启动，可以用下面的命令启动。

```bash
$ sshd
```

上面的命令运行以后，sshd 自动进入后台，所以命令后面不需要加上`&`。

除了直接运行可执行文件，也可以通过 SystemD 启动 sshd 服务。

```bash
$ sudo systemctl start sshd.service
```

下面的命令停止 sshd 服务。

```bash
$ sudo systemctl stop sshd.service
```

下面的命令重启 sshd 服务。

```bash
$ sudo systemctl restart sshd
```

下面的命令让 sshd 在计算机启动时自动运行。

```bash
$ sudo systemctl enable sshd.service
```

## 服务器配置文件

sshd 的配置文件在`/etc/ssh`目录，主配置文件是`sshd_config`，此外还有一些安装时生成的密钥。

- `/etc/ssh/sshd_config`：配置文件
- `/etc/ssh/ssh_h ost_ecdsa_key`：ECDSA 私钥。
- `/etc/ssh/ssh_host_ecdsa_key.pub`：ECDSA 公钥。
- `/etc/ssh/ssh_host_key`：用于 SSH 1 协议版本的 RSA 私钥。
- `/etc/ssh/ssh_host_key.pub`：用于 SSH 1 协议版本的 RSA 公钥。
- `/etc/ssh/ssh_host_rsa_key`：用于 SSH 2 协议版本的 RSA 私钥。
- `/etc/ssh/ssh_host_rsa_key.pub`：用于 SSH 2 协议版本的 RSA 公钥。
- `/etc/pam.d/sshd`：PAM 配置文件。

注意，如果重装 sshd，上面这些密钥都会重新生成，导致客户端重新 SSH 连接服务器，会跳出警告，拒绝连接。为了避免这种情况，可以在重装 sshd 时，先备份`/etc/ssh`目录，重装后再恢复这个目录。

配置文件的命令格式是，每个命令占据一行。每行都是关键字加上值，关键字大小写不敏感。

```bash
Port 2034
```

上面的配置命令指定，关键字`Port`的值是`2034`。`Port`写成`port`也可。

另一种格式是关键字与值之间有一个等号，等号前后的空格可选。

```bash
Port = 2034
```

`#`开头的行表示注释。

```bash
# 这是一行注释
```

注意，注释只能放在一行的开头，不能放在一行的结尾。

```bash
Port 2034   #  此处不允许注释
```

另外，空行等同于注释。

sshd 启动时会自动读取默认的配置文件。如果希望使用其他的配置文件，可以用 sshd 命令的`-f`参数指定。

```bash
$ sshd -f /usr/local/ssh/my_config
```

修改配置文件以后，可以用 sshd 命令的`-t`（test）检查有没有语法错误。

```bash
$ sshd -t
```

配置文件修改以后，并不会自动生效，必须重新启动 sshd。

```bash
$ sudo systemctl restart sshd
```

## sshd 密钥

sshd 需要密钥表明自己的身份。所有密钥都是公钥和私钥成对出现，公钥的文件名以后缀`.pub`表示。

DSA 格式的密钥文件默认为`/etc/ssh/ssh_host_dsa_key`（公钥为`ssh_host_dsa_key.pub`），RSA 格式的密钥为`/etc/ssh/ssh_host_rsa_key`（公钥为`ssh_host_rsa_key.pub`）。如果需要支持 SSH 1 协议，则必须有密钥`/etc/ssh/ssh_host_key`。

密钥也可以通过配置文件的`HostKey`命令指定，多个密钥可以使用多个`HostKey`命令。

```bash
HostKey /usr/local/ssh/my_dsa_key
HostKey /usr/local/ssh/my_rsa_key
HostKey /usr/local/ssh/my_old_ssh1_key
```

## sshd 的命令行配置项

sshd 命令有一些配置项。这些配置项在调用时指定，可以覆盖配置文件的设置。

（1）`-p`

`-p`参数指定 sshd 的服务端口。

```bash
$ sshd -p 2034
```

上面命令指定 sshd 在`2034`端口启动。

`-p`参数可以指定多个端口。

```bash
$ sshd -p 2222 -p 3333
```

（2）`-o`

`-o`参数指定配置文件的一个配置关键字和对应的值。

```bash
$ sshd -o "Port 2034"
```

关键字和对应值之间，可以使用等号。

```bash
$ sshd -o "Port = 2034"
```

如果省略等号前后的空格，也可以不使用引号。

```bash
$ sshd -o Port=2034
```

`-o`参数可以多个一些使用，用来指定多个配置关键字。

（3）`-h`

`-h`参数用于指定密钥。

```bash
$ sshd -h /usr/local/ssh/my_rsa_key
```

（4）`-d`

`-d`参数用于显示 debug 信息。

```bash
$ sshd -d
```

（5）`-f`

`-f`参数指定配置文件的位置。

（6）`-t`

`-t`参数检查配置文件的语法是否正确。

