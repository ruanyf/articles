# Debian的用法

## 分支

Debian总是同时至少维护三个版本：stable，testing和unstable。

- stable是最新的官方发行版，也是推荐安装的版本。目前是version 8，代码名jessie。该分支有backports服务，提供某些软件当前版本。
- testing是正在测试、将要成为stable的版本，会包含更新的软件。目前的testing版是sid。
- unstable是当前正在积极开发的，包含有最新的软件，但可能不稳定、并且有错误。

其他分支还有：

- Oldstable是比Stable更老的版本，stable发布一年之内都会支持这个更老的版本。
- Experimental是暂保存实验性软件的分支。

## 版本名称

- Debian 8 (jessie)
- Debian 7 (wheezy)
- Debian 6.0 (squeeze)
- Debian GNU/Linux 5.0 (lenny)
- Debian GNU/Linux 4.0 (etch)
- Debian GNU/Linux 3.1 (sarge)
- Debian GNU/Linux 3.0 (woody)
- Debian GNU/Linux 2.2 (potato)
- Debian GNU/Linux 2.1 (slink)
- Debian GNU/Linux 2.0 (hamm)

## apt

apt是软件包管理工具，来自“A Package Tool”的缩写。

### 软件源

apt的源列表存放在`/etc/apt/sources.list`文件。

```bash
deb http://mirrors.163.com/debian/ unstable main contrib non-free
deb-src http://mirrors.163.com/debian/ unstable main contrib non-free

deb http://security.debian.org/ testing/updates main contrib non-free
deb-src http://security.debian.org/ testing/updates main contrib non-free

deb http://mirrors.163.com/debian/ testing-updates main
deb-src http://mirrors.163.com/debian/ testing-updates main

deb http://mirrors.163.com/debian/ testing-proposed-updates main contrib non-free
deb http://mirrors.ustc.edu.cn/debian-security testing/updates main contrib non-free
```

sources.list文件的每一行就是一个软件源。它的格式分成四个部分。

1. deb或者deb-src（表示deb包或者源代码）。
2. debian镜像的地址，标准的结构下这个地址目录下有dists、pool等子目录。
3. 第三部分为版本目录，即`http://mirrors.163.com/debian/dists/`下的子目录，我们要选择想要使用的版本，比如我们要用testing，则此部分为testing。注意Unstable和Sid是相同的，目前来说，Testing和Wheezy是相同的，Stable和Squeeze是相同的。
4. 第四部分为第三部分目录下的子文件夹，通常是main、contrib、non-free三个文件夹（ubuntu的命名与此不同），分别代表自由软件，半自由软件和非自由软件。通常我们将这三个都写上，以空格分开。

### 安装和卸载软件

apt-get install命令用来安装软件。

```bash
$ sudo apt-get remove [软件名]
```

apt-get remove命令用来卸载软件（保留配置文件）。

```bash
$ sudo apt-get remove [软件名]
```

apt-get purge用来彻底卸载软件（包括删除配置文件）。

```bash
$ sudo apt-get purge [软件名]
```

apt-get dist-upgrade命令用于Debian系统版本的升级。

```bash
$ sudo apt-get dist-upgrade
```

### 升级

apt-get update命令用来更新本地的软件信息库。

```bash
$ sudo apt-get update
```

升级单个软件，只要重新使用apt-get install即可。

```bash
$ sudo apt-get install [软件名] 
```

apt-get upgrade命令升级所有本地已安装的软件。

```bash
$ sudo apt-get upgrade 
```

### 搜索软件

apt-cache search命令用来搜索软件。

```bash
$ apt-cache search [搜索词] 
```

## dpkg：软件包管理命令

（1）安装软件包

使用`dpkg -i`（表示install）命令，安装deb软件包。

```bash
$ dpkg -i <package-file-name>
```

（2）查看软件包安装信息

使用`dpkg -l`（表示list）命令，查看软件包的安装状态。

```bash
$ dpkg -l | grep 'tcl'
```

如果返回信息的最前面有`ii`两个字母，就表示已安装(installed ok installed）。

所有已安装包的状态可在`/var/lib/dpkg/status`文件中查看。

（3）删除软件包

使用`dpkg -r`（表示remove）命令，删除软件包。

```bash
$ dpkg -r tcl8.4 
```

这时再使用`dpkg -l`命令查看软件包信息，会发现软件包最前面的两个字母是`rc`，表示软件已经卸载，但还没有清除配置文件（removed ok config-files）。

（4）删除软件包及其配置文件

使用`dpkg -P`（表示purge）命令，彻底删除软件包。

```bash
$ dpkg -P tcl8.4 
```

这时，再使用`dpkg -l`命令，查看已安装软件包，就会发现已经找不到该软件包了。

## 网络配置

### 网卡配置文件

/etc/network/interfaces是Debian的网卡配置文件。 

```bash
auto eth0
iface eth0 inet dhcp
```

```bash
iface eth0 inet static
address 192.168.1.5
netmask 255.255.255.0
gateway 192.168.1.254
```

### ifconfig

ifconfig命令用于提供网络各个端口的信息。

```bash
$ ifconfig
```

上面命令会提供ifconfig能够找到的所有网络端口的信息，一般会包括一个以太网网卡的物理网口，以及一个本机虚拟的回路（loopback）网口（供本机程序互相通信）。

返回信息一般包括以下几个部分。

- Link encap：网络封装类型，一般是Ethernet或者Local Loopback。
- Hwaddr：网络接口的MAC地址。
- inet addr：网络接口的IP地址。
- Bcast：所在网络的广播地址。
- Mask：子网掩码
- MTU：最大传输单元（Maximum transmission unit），单个数据包（packet）的最大体积。
- RX：收到的包的统计。
- TC：发出的包的统计。
- collisions：发生包碰撞的次数。
- txqueuelen：传输队列的长度。
- RX bytes，TX bytes：该网络接口通过数据的统计。

ifup命令和ifdown命令用于开启/关闭网络接口。

```bash

$ sudo ifdown eth0

$ sudo ifup eth0

```
