# IP 地址

Linux有以下工具，可以查看网络接口。

- `ip`：显示和操作路由
- `netstat`：显示网络连接、路由表等。
- `ifconfig`：展示和配置网络接口

```bash
# 列出所有正在使用的IPv4连接
$ lsof -Pnl +M -i4
```

## whois 命令

`whois`命令用来查询域名或 IP 地址的相关信息。

```bash
$ whois example.com
```

上面命令会显示域名的注册商和联系信息。

## ip

显示所有网络接口。

```bash
$ ip link show
# 或者
$ ip a show
```

查看路由表。

```bash
$ ip r
```

## netstat

`netstat` 程序被用来检查各种各样的网络设置和统计数据。

显示所有网络接口。

```bash
$ netstat -i
```

使用“-ie”选项，我们能够查看系统中的网络接口。

```bash
$ netstat -ie
eth0    Link encap:Ethernet HWaddr 00:1d:09:9b:99:67
        inet addr:192.168.1.2 Bcast:192.168.1.255 Mask:255.255.255.0
        inet6 addr: fe80::21d:9ff:fe9b:9967/64 Scope:Link
        UP BROADCAST RUNNING MULTICAST MTU:1500 Metric:1
        RX packets:238488 errors:0 dropped:0 overruns:0 frame:0
        TX packets:403217 errors:0 dropped:0 overruns:0 carrier:0
        collisions:0 txqueuelen:100 RX bytes:153098921 (146.0 MB) TX
        bytes:261035246 (248.9 MB) Memory:fdfc0000-fdfe0000

lo      Link encap:Local Loopback
        inet addr:127.0.0.1 Mask:255.0.0.0
```

在上述实例中，可以看到系统有两个网络接口。第一个，叫做 eth0，是 因特网接口，和第二个，叫做 lo，是内部回环网络接口。

使用这个“-r”选项会显示内核的网络路由表。这展示了系统是如何配置网络之间发送数据包的。

```bash
$ netstat -r
Kernel IP routing table
Destination     Gateway     Genmask         Flags    MSS  Window  irtt Iface

192.168.1.0     *           255.255.255.0   U        0    0          0 eth0
default         192.168.1.1 0.0.0.0         UG       0    0          0 eth0
```

第一行显示了目的地 192.168.1.0。IP 地址以零结尾是指网络，而不是个人主机， 所以这个目的地意味着局域网中的任何一台主机。下一个字段，Gateway， 是网关（路由器）的名字或 IP 地址，用它来连接当前的主机和目的地的网络。 若这个字段显示一个星号，则表明不需要网关。

最后一行包含目的地 default。指的是发往任何表上没有列出的目的地网络的流量。 在我们的实例中，我们看到网关被定义为地址 192.168.1.1 的路由器，它应该能 知道怎样来处理目的地流量。

## ifconfig

显示所有网络接口。

```bash
$ /sbin/ifconfig -a
```

## 设置静态网址

网络配置文件是`/etc/network/interfaces`。

设置静态IP地址的例子。

```
auto eth0
iface eth0 inet static
 address 10.10.29.66
 netmask 255.255.255.192
 network 10.10.29.65
 broadcast 10.10.29.127
 gateway 10.10.29.65
# Google dns server for our network
 dns-nameservers 8.8.8.8 8.8.4.4
```

重启网络。

```bash
$ sudo /etc/init.d/networking restart
# 或者
$ sudo systemctl restart networking
```

## traceroute 命令

traceroute 命令查找网络数据包在本机与目标计算机之间的路径。它是了解数据如何通过网络流动的有用工具。

traceroute 命令将数据包发送到目标计算机，并记录这些数据包所采取的所有步骤。它打印出这些数据包所经过的服务器的IP地址和域名。用户可以看到数据包到达目标计算机所需的总时间，以及每一步的时间。

traceroute 的工作原理是利用网络数据包所具有的转发次数的限制。所有数据包都有一定数量的转发限制，防止数据包无休止地在网络中传递。当数据包从一台设备转发到另一台设备时，设备会检查该数据包的转发次数。如果它剩下的转发次数高于1，它会将数字减少1，然后再转发。如果该数字为1，它将丢弃数据包，并向发送者发回一个消息，告诉它丢弃了数据包，因为它的最大转发次数已经到了。

traceroute 使用这些消息来测试本地计算机和目标计算机之间的路由。它会开始发送一个只能一次转发的数据包。第一个设备将丢弃它，发回一个带有自己IP地址的消息。然后，traceroute 将发送另一个两次转发的数据包。第二个设备将发回丢弃消息。traceroute 将继续该过程，直到达到目标计算机。

traceroute 命令一般已经默认安装。如果不是这样，你可以手动安装。

```bash
# Ubuntu/Debian
$ sudo apt install traceroute

# Fedora
$ sudodnf install traceroute

# OpenSUSE
$ sudo zypper in traceroute

# Arch Linux
$ sudo pacman -S traceroute
```

使用的时候，直接`traceroute`加上目标计算机的域名或 IP 地址即可。

```bash
$ traceroute example.com
```

注意，有些网络设置为屏蔽 traceroute，所以可能不一定能得到结果。

`-4`参数表示使用 IPv4，`-6`参数表示使用 IPv6。

```bash
$ traceroute -4 example.com
```

`-T`参数表示使用 TCP 协议，这个协议更适合访问网站时发现的路由。默认情况下，使用 icmp(ping) 协议。

```bash
$ traceroute -T example.com
```

`-p`参数用于指定端口。

```bash
$ traceroute -p 53 192.168.1.1
```

`-f`参数指定起始的转发次数，`-m`参数指定结束的转发次数。下面命令指定只返回第3跳到第10跳的结果。

```bash
$ traceroute -f 3 -m 10 example.com
```

## 参考链接

- [Traceroute Basics](https://linuxconfig.org/traceroute-basics), by Nick Congleton
