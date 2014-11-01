# Linux常用操作

## 组操作

（1）显示当前用户所在的组

```bash
$ groups
```

（2) 显示特定用户所在的组

```bash
$ groups [userID]
```

(3) 查看所有的组

```bash
$ cat /etc/group
```
## 挂载USB盘

（1）将USB盘插入电脑

（2）列出所有储存设备。
```bash
$ sudo fdisk -l
```
你会看到储存盘都是`/dev/sdXN`的形式，其中X是盘号，N是分区号。

（3）在文件系统中创建一个挂载点。
```bash
$ sudo mkdir /media/externaldrive
```

（4） 此时，只有root用户才能读取U盘，因此要将U盘变为所有用户都可以读取。

```bash
$ sudo chgrp -R users /media/externaldrive
$ sudo chmod -R g+w /media/externaldrive
```

（5）挂载USB盘。

```bash
sudo mount [/dev/sdXN] /media/externaldrive -o=rw
```