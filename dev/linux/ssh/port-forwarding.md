# SSH 端口转发

对于开发者来说，ssh 是一个必备的工具，用来登录服务器。

但是，它还有一大用途，就是作为加密通信的中介，充当两台服务器之间的通信加密跳板。这个功能称为端口转发（port forwarding），又称 ssh 隧道（tunnel）。

这是一种在客户端和服务器之间创建加密的 SSH 连接的方法，通过该连接可以中继服务端口。SSH 转发对于传输使用未加密协议的服务（例如 VNC 或 FTP），访问受地理限制的内容或绕过中间防火墙的网络数据很有用。基本上，你可以转发任何 TCP 端口并通过安全的 SSH 连接建立隧道流量。

端口转发的两个主要作用：（1）将不安全的网络服务变成 SSH 安全连接，比如通过端口转发访问 telnet、ftp 等明文服务；（2）绕过网络防火墙。

下面就是端口转发的简单介绍。如果你还不熟悉 ssh 的基本用法，可以先阅读[《SSH 入门教程》](http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)。

## 用法

ssh 作为数据通信的加密跳板，有多种使用场景。ssh 本身支持三种用法。 

### 动态转发

动态端口转发创建了一个 SOCKS 代理服务器，该服务器允许多个端口的通信，都通过这个连接转发。

这种转发的一种使用场景是，访问所有外部网站，都要通过 ssh 中介。

这时就要把本地端口绑定到 ssh 跳板机。至于 ssh 跳板机要去访问哪一个网站，完全是动态的，所以叫做动态转发。

```bash
$ ssh -D local-port tunnel-host -N
```

上面命令中，`-D`表示动态转发，`local-port`是本地端口，`tunnel-host`是 ssh 跳板机，`-N`表示只进行端口转发，不登录远程 Shell。

举例来说，如果本地端口是`2121`，那么实际命令就是下面这样。

```bash
$ ssh -D 2121 tunnel-host -N
```

注意，这种转发采用了 SOCKS5 协议。访问外部网站时，需要把 HTTP 请求转成 SOCKS5 协议，才能把本地端口的请求转发出去。

下面是 ssh 隧道建立后的一个使用实例。

```bash
$ curl -x socks5://localhost:2121 http://www.example.com
```

上面命令中，curl 的`-x`参数指定代理服务器，即通过 SOCKS5 协议的本地`2121`端口，访问`http://www.example.com`。

### 本地转发

第二种场景是，只针对特定网站打开 ssh 隧道。这叫做“本地转发”。本地端口转发使你可以将连接，从本地主机转发到 SSH 服务器主机，然后再转发到目标主机端口。

```html
$ ssh -L local-port:target-host:target-port  tunnel-host -N
```

上面命令中，`-L`参数表示本地转发，`local-port`是本地端口，`target-host`是你想要访问的目标服务器，`target-port`是目标服务器的端口，`tunnel-host`是 ssh 跳板机。

`-N`参数表示不执行远程命令，另外还有一个`-f`参数表示 SSH 连接在后台运行。

举例来说，在本地`2121`端口建立 ssh 隧道，访问`www.example.com`，可以写成下面这样。

```bash
$ ssh -L 8080:www.example.com:80 tunnel-host -N
```

然后，访问本机的`2121`端口，就是访问`www.example.com`。

```bash
$ curl http://localhost:2121
```

注意，本地端口转发采用 HTTP 协议，不用转成 SOCKS5 协议。

### 远程转发

远程端口转发与本地端口转发相反。它将连接从服务器主机转发到本地主机，然后再转发到目标主机端口。

这种场景比较特殊，主要针对内网的情况。本地计算机在外网，ssh 跳板机和目标服务器都在内网，而且本地计算机无法访问内网之中的跳板机，但是跳板机可以访问本机计算机。

由于本机无法访问跳板机，就无法从外网发起隧道，必须反过来，从跳板机发起隧道，这时就会用到远程端口转发。

```bash
$ ssh -R local-port:target-host:target-port -N local
```

上面的命令，首先需要注意，不是在本机执行的，而是在 ssh 跳板机执行的，从跳板机去连接本地计算机。`-R`参数表示远程端口转发，`local-port`是本地计算机的端口，`target-host`和`target-port`是目标服务器及其端口。

比如，跳板机执行下面的命令，绑定本地计算机的`2121`端口，去访问`www.example.com:80`。

```bash
$ ssh -R 2121:www.example.com:80 local -N
```

执行上面的命令以后，跳板机到本地计算机的隧道已经建立了。然后，就可以从本机访问目标服务器了，即在本机执行下面的命令。

```bash
$ curl http://localhost:2121
```

这种端口转发会远程绑定另一台机器的端口，所以叫做“远程端口转发”，也是采用 HTTP 协议。

## 实例：Email 加密下载

上面介绍了 ssh 端口转发的三种用法，下面就来看几个具体的实例。

公共场合的 WiFi，如果使用非加密的通信，是非常不安全的。假定我们在咖啡馆里面，需要从邮件服务器明文下载邮件，怎么办？一种解决方法就是，采用本地端口转发，在本地电脑与邮件服务器之间，建立 ssh 隧道。

```bash
$ ssh -L 2121:mail-server:143 tunnel-host -N
```

上面命令指定本地`2121`端口绑定 ssh 跳板机`tunnel-host`，跳板机连向邮件服务器的`143`端口。这样下载邮件，本地到 ssh 跳板机这一段，是完全加密的。当然，跳板机到邮件服务器的这一段，依然是明文的。

## 实例：简易 VPN

VPN 用来在外网与内网之间建立一条加密通道。内网的服务器不能从外网直接访问，必须通过一个跳板机，如果本机可以访问跳板机，就可以使用 ssh 本地转发，简单实现一个 VPN。

```bash
$ ssh -L 2080:corp-server:80 -L 2443:corp-server:443 tunnel-host -N
```

上面命令通过 ssh 跳板机，将本机的`2080`端口绑定内网服务器的`80`端口，本机的`2443`端口绑定内网服务器的`443`端口。

## 实例：两级跳板

端口转发可以有多级，比如新建两个 ssh 隧道，第一个隧道转发给第二个隧道，第二个隧道才能访问目标服务器。

首先，新建第一级隧道。

```bash
$ ssh -L 7999:localhost:2999 tunnel1-host
```

上面命令在本地`7999`端口与`tunnel1-host`之间建立一条隧道，隧道的出口是`tunnel1-host`的`localhost:2999`，也就是`tunnel1-host`收到本机的请求以后，转发给本机的`2999`端口。

然后，在第一台跳板机执行下面的命令，新建第二级隧道。

```bash
$ ssh -L 2999:target-host:7999 tunnel2-host -N
```

上面命令将第一台跳板机`tunnel1-host`的`2999`端口，通过第二台跳板机`tunnel2-host`，连接到目标服务器`target-host`的`7999`端口。
 
最终效果就是，访问本机的`2999`端口，就会转发到`target-host`的`2999`端口。

## 参考链接

- [An Illustrated Guide to SSH Tunnels](https://solitum.net/an-illustrated-guide-to-ssh-tunnels/), Scott Wiersdorf

