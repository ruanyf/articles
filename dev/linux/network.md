# 网络管理

```bash
# 列出所有正在使用的IPv4连接
$ lsof -Pnl +M -i4
```

## netstat

`netstat` 程序被用来检查各种各样的网络设置和统计数据。

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
