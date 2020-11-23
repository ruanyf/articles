# SSH 客户端

## 简介

OpenSSH 的客户端是二进制程序 ssh。它在 Linux / Unix 系统的位置是`/usr/local/bin/ssh`，Windows 系统的位置是`\Program Files\OpenSSH\bin\ssh.exe`。

Linux 系统一般都自带 ssh，如果没有就需要安装。

```bash
# Ubuntu 和 Debian
$ sudo apt install openssh-client

# CentOS 和 Fedora
$ sudo dnf install openssh-clients
```

安装以后，可以使用`-h`参数，查看一下是否安装成功。

```bash
$ ssh -h
```

## 基本用法

ssh 最常见的用途就是连接 SSH 服务器。

```bash
$ ssh foo.com
```

上面命令登录服务器`foo.com`，这要求`foo.com`必须安装并正在运行 SSH 服务器。

ssh 默认连接服务器的22端口，`-p`参数可以指定其他端口。

```bash
$ ssh -p 8821 foo.com
```

上面命令连接服务器`foo.com`的8821端口。

ssh 默认使用本地的当前用户名，登录服务器的同名账户。如果需要登录服务器的其他账户，可以使用`-l`参数指定。

```bash
$ ssh -l bar foo.com
```

上面命令登录服务器`foo.com`的用户`bar`的账户。

如果是首先连接远程主义，客户端会在命令行显示一段文字，表示不认识这台服务器，是否确认需要连接。

```bash
The authenticity of host 'ssh.linuxize.com (192.168.121.111)' can't be established.
ECDSA key fingerprint is SHA256:Vybt22mVXuNuB5unE++yowF7lgA/9/2bLSiO3qmYWBY.
Are you sure you want to continue connecting (yes/no)?
```

每个主机都有一个唯一的指纹，储存在`~/.ssh/known_hosts`文件中。输入`yes`可以将当前服务器的指纹储存在本机，以后再连接的时候，就不会提示这段文字了。

然后，客户端会要求输入远程服务器的密码。输入以后，就登陆远程服务器的 Shell 了。

默认是以客户端的当前用户名，登录远程服务器。要以其他用户身份登录，用以下格式指定用户名和主机。

```bash
$ ssh username@hostname
```

还可以使用`-l`参数指定用户名。

```bash
$ ssh -l username hostname
```

默认端口是22，`-p`参数可以指定端口。

```bash
$ ssh -p 5522 username@hostname
```

`-v`参数用来显示详细信息，可以在遇到问题时使用。如果想查看更详细的信息，可以使用`-vv`或`-vvv`参数。

```bash
$ ssh -v username@hostname
```

## ssh 命令行配置项

**-c**

`-c`参数指定加密算法。

```bash
$ ssh -c blowfish,3des server.example.com
# 或者
$ ssh -c blowfish -c 3des server.example.com
```

上面命令指定使用加密算法`blowfish`或`3des`。

**-C**

`-C`参数表示压缩数据传输。

```bash
$ ssh -C server.example.com
```

**-d**

`-d`参数设置打印的 debug 信息级别，数值最高，输出的内容越详细。

```bash
$ ssh –d 1 foo.com
```

**-D**

`-D`参数表示动态端口转发。

```bash
$ ssh -D 1080 server
```

**-f**

`-f`参数表示 SSH 连接在后台运行。

**-F**

`-F`参数指定配置文件。

```bash
$ ssh -F /usr/local/ssh/other_config
```

上面命令指定使用配置文件`other_config`。

**-h，--help**

`-h`、`--help`参数显示帮助信息。

```bash
$ ssh --help
```

**-i**

`-i`参数用于指定私钥。注意，服务器必须存有对应的公钥。

```bash
$ ssh -i my-key server.example.com
```

**-l**

`-l`参数指定远程登录的账户名。

```bash
$ ssh -l sally server.example.com
```

**-L**

`-L`参数设置本地端口转发，详见《端口转发》一章。

**-m**

`-m`参数指定校验数据完整性的算法（message authentication code，简称 MAC）。

```bash
$ ssh -m hmac-sha1,hmac-md5 server.example.com
```

上面命令指定数据校验算法为`hmac-sha1`或`hmac-md5`。

**-o**

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

**-p**

`-p`参数指定 SSH 客户端连接的服务器端口。

```bash
$ ssh -p 2035 server.example.com
```

上面命令连接服务器的2035端口。

**-q**

`-q`参数表示安静模式（quiet），不向用户输出任何警告信息。

```bash
$ ssh –q foo.com
root’s password:
```

上面命令使用`-q`参数，只输出要求用户输入密码的提示。

**-R**

`-R`参数指定远程端口转发，详见《端口转发》一章。

**-t**

`-t`参数在 ssh 直接运行远端命令时，提供一个互动式 Shell。

```bash
$ ssh -t server.example.com emacs
```

**-v**

`-v`参数显示详细信息。

```bash
$ ssh -v server.example.com
```

`-v`可以重复多次，表示信息的详细程度。

```bash
$ ssh -v -v -v server.example.com
```

**-V**

`-V`参数输出远程服务器的版本。

```bash
$ ssh foo.com –V
ssh: SSH Secure Shell 3.2.3 (non-commercial version) on i686-pc-linux-gnu
```

上面命令输出`foo.com`的 SSH 服务器版本是`SSH Secure Shell 3.2.3`。

**-X**

`-X`参数表示打开 X 窗口转发。

```bash
$ ssh -X server.example.com
```

**-1，-2**

`-1`参数指定使用 SSH 1 协议。

`-2`参数指定使用 SSH 2 协议。

```ssh
$ ssh -2 server.example.com
```

**-4，-6**

`-4`指定使用 IPv4 协议，这是默认值。

```bash
$ ssh -4 server.example.com
```

`-6`指定使用 IPv6 协议。

```bash
$ ssh -6 server.example.com
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

- `AddressFamily inet`：表示只使用 IPv4 协议。如果设为`inet6`，表示只使用 IPv6 协议。
- `BindAddress 192.168.10.235`：指定本机的 IP 地址（如果本机有多个 IP 地址）。
- `CheckHostIP yes`：检查 SSH 服务器的 IP 地址是否跟公钥数据库吻合。
- `Ciphers blowfish,3des`：指定加密算法。
- `Compression yes`：是否压缩传输信号。
- `ConnectionAttempts 10`：客户端进行连接时，最大的尝试次数。
- `ConnectTimeout 60`：客户端进行连接时，服务器在指定秒数内没有回复，则中断连接尝试。
- `DynamicForward 1080`：指定动态转发端口。
- `GlobalKnownHostsFile /users/smith/.ssh/my_global_hosts_file`：指定全局的公钥数据库文件的位置。
- `Host server.example.com`：指定连接的域名或 IP 地址，也可以是昵称，支持通配符。`Host`命令后面的所有配置，都是针对该主机的，直到下一个`Host`命令为止。
- `HostKeyAlgorithms ssh-dss,ssh-rsa`：指定密钥算法，优先级从高到低排列。
- `HostName myserver.example.com`：在`Host`命令使用昵称的情况下，`HostName`指定域名或 IP 地址。
- `IdentityFile keyfile`：指定私钥文件。
- `LocalForward 2001 localhost:143`：指定本地端口转发。
- `LogLevel QUIET`：指定日志详细程度。
- `MACs hmac-sha1,hmac-md5`：指定数据校验算法。
- `NumberOfPasswordPrompts 2`：密码登录时，用户输错密码的最大尝试次数。
- `PasswordAuthentication no`：是否支持密码登录，该方法能否登录成功由服务器决定。
- `Port 2035`：指定客户端连接的 SSH 服务器端口。
- `PreferredAuthentications publickey,hostbased,password`：指定各种登录方法的优先级。
- `Protocol 2`：支持的 SSH 协议版本，多个版本之间使用逗号分隔。
- `PubKeyAuthentication yes`：是否支持密钥登录，该方法能否登录成功由服务器决定。
- `RemoteForward 2001 S:143`：指定远程端口转发。
- `SendEnv COLOR`：SSH 客户端向服务器发送的环境变量名，多个环境变量之间使用空格分隔。环境变量的值从客户端当前环境中拷贝。
- `ServerAliveInterval 300`：客户端建立连接后，如果在给定秒数内，没有收到服务器发来的消息，客户端向服务器发送`server-alive`消息。如果不希望客户端发送，这一项设为`0`。
- `ServerAliveCountMax 8`：客户端发送`server-alive`消息的最大尝试次数。如果服务器还是没有回应，则中断连接。
- `StrictHostKeyChecking yes`：`yes`表示严格检查，服务器公钥为未知或发生变化，则拒绝连接。`no`表示如果服务器公钥未知，则加入客户端公钥数据库，如果公钥发生变化，不改变客户端公钥数据库，输出一条警告，依然允许连接继续进行。`ask`（默认值）表示询问用户是否继续进行。
- `TCPKeepAlive yes`：客户端是否定期向服务器发送`keepalive`信息。
- `User userName`：指定远程账户名。
- `UserKnownHostsFile /users/smith/.ssh/my_local_hosts_file`：指定当前用户的公钥数据库文件的位置。
- `VerifyHostKeyDNS yes`：是否检查 SSH 服务器的 DNS 记录，有没有公钥里保存的一致。

