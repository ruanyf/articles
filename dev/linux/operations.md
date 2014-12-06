# Linux常用操作

## 用户操作

（1）列出当前用户

```bash
$ whoami
```

（2）列出所有用户

```bash
$ sudo cat /etc/shadow
```

（3）列出所有用户的密码

```bash
$ sudo cat /etc/passwd
```
 
（4）创建用户

```bash
$ sudo useradd [用户名]
```
然后，为该用户设置密码。

```bash
$ sudo passwd [用户名] 
```
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

/etc/group文件的记录格式如下。

```
group_name:passwd:GID:user_list
```

每条记录分四个字段：

1. 用户组名称；
2. 用户组密码；
3. GID
4. 用户列表，每个用户之间用,号分割；本字段可以为空；如果字段为空表示用户组为GID的用户名；

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

（6）刻录镜像盘

```bash
$ sudo dd if=debian-*-netinst.iso of=/dev/sdX
```
