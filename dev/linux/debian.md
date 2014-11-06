# Debian的用法

## apt

apt的源列表存放在`/etc/apt/sources.list`文件。

```bash
deb http://mirrors.ustc.edu.cn/debian wheezy-backports main non-free contrib
deb http://mirrors.ustc.edu.cn/debian wheezy-proposed-updates main contrib non-free
deb http://mirrors.ustc.edu.cn/debian-security wheezy/updates main contrib non-free
deb-src http://mirrors.ustc.edu.cn/debian wheezy-backports main non-free contrib
deb-src http://mirrors.ustc.edu.cn/debian wheezy-proposed-updates main contrib non-free
deb-src http://mirrors.ustc.edu.cn/debian-security wheezy/updates main contrib non-free
deb http://http.us.debian.org/debian wheezy-backports main contrib non-free
deb http://security.debian.org wheezy/updates main contrib non-free
```

sources.list文件的每一行就是一个软件源。它的格式分成四个部分。

1. deb或者deb-src（表示deb包或者源代码）。
2. debian镜像的地址，标准的结构下这个地址目录下有dists、pool等子目录。
3. 第三部分为版本目录，即http://mirrors.163.com/debian/dists/下的子目录，我们要选择想要使用的版本，比如我们要用testing，则此部分为testing。注意Unstable和Sid是相同的，目前来说，Testing和Wheezy是相同的，Stable和Squeeze是相同的。
4. 第四部分为第三部分目录下的子文件夹，通常是main、contrib、non-free三个文件夹（ubuntu的命名与此不同），分别代表自由软件，半自由软件和非自由软件。通常我们将这三个都写上，以空格分开。

Debian系统升级

```bash
sudo aptitude update
sudo aptitude dist-upgrade
```
 
## /etc/network/interfaces

/etc/network/interfaces is Debian's network card configing file. 

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
