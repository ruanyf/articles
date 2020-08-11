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

## sshd 配置项

以下是`/etc/ssh/sshd_config`文件里面的配置项。

- `AcceptEnv PATH TERM`：允许接受哪些客户端通过`SendEnv`命令发来的变量，即允许客户端设置那些服务器的环境变量，变量名之间使用空格分隔。
- `AllowGroups groupName`：允许登录的用户组，多个组之间用空格分隔。如果不使用该项，则允许所有用户组登录。
- `AllowUsers user1 user2`：允许登录的用户，用户名之间使用空格分隔，也可以使用多个`AllowUsers`命令指定，用户名支持使用通配符。如果不使用该项，则允许所有用户登录。该项也可以指定域名，比如`AllowUsers jones@example.com`。
- `AllowTcpForwarding yes`：是否允许端口转发。
- `Banner /usr/local/etc/warning.txt`：用户登录后，sshd 向其展示的定制信息，默认不展示任何内容。
- `Ciphers 3des-cbc`：sshd 可以接受的加密算法，多个算法之间使用逗号分隔。
- `ClientAliveCountMax 8`：客户端没有响应时，服务器尝试连接的次数。
- `ClientAliveInterval 180`：允许客户端发呆的时间，单位为秒。如果这段时间里面，客户端没有发送任何信号，SSH 连接将关闭。
- `Compression yes`：客户端与服务器之间的数据传输是否压缩。
- `DenyGroups groupName`：不允许登录的用户组。
- `DenyUsers user1`：不允许登录的用户，用户名之间使用空格分隔，也可以使用多个`DenyUsers`命令指定。
- `ListenAddress 0.0.0.0`：sshd 启用的网址，默认在本机所有网络接口启用，可以指定只在某个网络接口启用（比如`ListenAddress 192.168.10.23`），也可以指定某个域名启用（比如`ListenAddress server.example.com`）。
- `LoginGraceTime 60`：允许客户端登录时发呆的最长时间，比如迟迟不输入密码，单位为秒。如果设为`0`，就表示没有限制。
- `LogLevel VERBOSE`：日志的详细程度，可能的值为`QUIET`、`FATAL`、`ERROR`、`INFO`、`VERBOSE`、`DEBUG`、`DEBUG1`、`DEBUG2`、`DEBUG3`。
- `MACs hmac-sha1`：sshd 可以接受的数据校验算法，多个算法之间使用逗号分隔。
- `MaxAuthTries 3`：允许 SSH 登录的最大尝试次数，如果密码输入错误达到指定次数，SSH 连接将关闭。
- `MaxStartups 32`：允许同时并发的 SSH 连接数量。如果设为`0`，就表示没有限制。这个属性也可以设为`A:B:C`的形式，比如`MaxStartups 10:50:20`，表示如果达到10个并发连接，后面的连接将有50%的概率被拒绝；如果达到20个并发连接，则后面的连接将100%被拒绝。
- `PasswordAuthentication yes`：是否允许密码登录，建议改成`no`（禁止密码登录，只允许密钥登录）。
- `PermitEmptyPasswords yes`：是否允许无密码登录，即用户的密码是否可以为空，建议改成`no`（禁止无密码登录）。
- `PermitRootLogin yes`：是否允许根用户登录，建议改成`no`（禁止根用户登录）。
- `PermitUserEnvironment no`：是否允许 sshd 运行客户端的`~/.ssh/environment`文件和`~/.ssh/authorized_keys`文件里面的`environment= options`设置。出于安全考虑，建议不要打开。
- `Protocol 1`：使用 SSH-1 协议，建议改成`2`（SSH-2 协议）。可以同时支持两个协议，比如`Protocol 2,1`。
- `Port 9876`：sshd 的连接端口。
- `PrintMotd no`：用户登录后，是否向其展示系统的 motd 信息（`/etc/motd`）。由于 Shell 一般会展示这个信息，所以这里建议关闭。
- `PubKeyAuthentication yes`：是否允许密钥登录。
- `StrictModes yes`：sshd 是否检查用户的一些重要文件和目录的权限。对于用户的 SSH 配置文件、密钥文件和所在目录，SSH 要求拥有者必须是根用户或用户本人，用户组和其他人的写权限必须关闭。
- `TCPKeepAlive yes`：打开 sshd 跟客户端 TCP 连接的 keepalive 参数。
- `UseDNS yes`：用户 SSH 登录一个域名时，服务器是否使用 DNS，确认该域名对应的 IP 地址包含本机。打开该选项意义不大，而且如果 DNS 更新不及时，还有可能误判，建议关闭。
- `X11Forwarding no`：是否打开 X window 的转发。

修改配置文件以后，可以使用下面的命令验证，配置文件是否有语法错误。

```bash
$ sshd -t
```

新的配置文件生效，必须重启 sshd。

```bash
$ sudo systemctl restart sshd
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


（7）`-D`

sshd 不作为后台守护进程运行。

```bash
$ sshd -D
```

（8）`-e`

`-e`参数将 sshd 写入系统日志 syslog 的内容导向标准错误（standard error）。

