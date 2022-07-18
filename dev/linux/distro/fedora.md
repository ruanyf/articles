# Fedora

## 包管理器 dnf

Fedora 的包管理器基于 rpm，并在其上构建了几个更高级别的工具，最著名的是 PackageKit（默认 gui）和 DNF。GNOME Software 也可以用。

DNF 现在是 Fedora 默认的包管理器。

```bash
# 搜索
$ sudo dnf search 包名

# 安装
$ sudo dnf install 包名

# 删除
$ sudo dnf remove 包名
```

更新系统。

```bash
$ sudo dnf upgrade --refresh -y
```

dnf 的其他命令如下。

- autoremove- 删除所有不再需要的软件包。
- check-update- 检查更新，但不下载或安装软件包。
- downgrade- 恢复到以前版本的包。
- info- 提供有关包的基本信息，包括名称、版本、版本和描述。
- reinstall- 重新安装当前安装的包。
- upgrade- 检查更新包的存储库并更新它们。
- exclude- 从交易中排除包裹。

dnf 可用来在命令行直接升级 Fedora。https://docs.fedoraproject.org/en-US/quick-docs/dnf-system-upgrade/

安装语言包

```bash
$ sudo dnf install langpacks-zh_CN
```

## 安装 sshd

查看是否已经安装了 openssh-server。

```bash
$ rpm -qa | grep openssh-server
```

如果没有安装，则安装 openssh-server。

```bash
$ sudo dnf install openssh-server
```

指定下次系统启动后，自动启动 sshd。

```bash
$ sudo systemctl enable sshd
```

如果以后要禁用 sshd，执行下面的命令。

```bash
$ sudo systemctl disable sshd
```

启动 sshd。

```bash
$ sudo systemctl start sshd
```

检查 sshd 的状态。

```bash
$ sudo systemctl status sshd
```

检查端口 22 是否打开。

```bash
$ sudo ss -lt
```

## 安装 nfs

清除 dnf 包缓存。

```bash
$ sudo dnf makecache
```

安装 nfs-utils。 

```bash
$ sudo dnf install nfs-utils -y
```

在本机创建挂载目录 /mnt/nfs。

```bash
$ mkdir /mnt/nfs
```

挂载 NFS。

```bash
$ sudo mount -t nfs 192.168.51.10:/volume/ds920 /mnt/nfs
```

## 安装 proxychains

https://kim1024.github.io/2019/01/16/proxychains_fedora

查看包信息。

```bash
$ dnf info proxychains-ng
```

安装。

```bash
$ sudo dnf install proxychains-ng -y
```

proxychains 按照以下顺序查找配置文件。

- ./proxychains.conf
- ~/.proxychains/proxychains.conf
- /etc/proxychains.conf

在配置文件写入。

```
[ProxyList]
socks5 127.0.0.1 1080
```

proxychains 的用法如下。

```bash
$ proxychains4 command options
```

它也可以在当前 Bash 执行。

```bash
$ proxychains4 -q /bin/bash
```


