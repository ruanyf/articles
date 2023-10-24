# Linux 发行版简介

下面的命令可以发行当前正在运行哪一种 Linux 发行版。

```bash
$ uname -or
```

上面命令中，`-o`表示操作系统名，`-r`表示内核版本。

也可以使用`-a`，输出所有信息。

```bash
$ uname -a
```

下面是使用`/proc`内存信息。

```bash
$ cat /proc/version
```

另一种方法是使用`hostnamectl`命令。

```bash
$ hostnamectl
```

另一种方法是查看`cat /etc/os-release`文件。

```bash
$ cat /etc/os-release         [On Debian, Ubuntu and Mint]
$ cat /etc/os-release         [On RHEL/CentOS/Fedora and Rocky Linux/AlmaLinux]
$ cat /etc/gentoo-release     [On Gentoo Linux]
$ cat /etc/os-release         [On Alpine Linux]
$ cat /etc/os-release         [On Arch Linux]
$ cat /etc/SuSE-release       [On OpenSUSE]    
```

最后，也可以安装`lsb_release`软件包，查看它的结果。

```bash
$ lsb_release -a
```
