# 用户组

## groups 命令

查看当前用户所属的组。

```bash
$ groups
abhishek adm cdrom sudo dip plugdev lpadmin sambashare kvm
```

查看用户所属的所有组。

```bash
$ groups [user_name]
abhi : abhi sudo
```

查看多个用户所属的组。

```bash
$ groups user_1 user_2 user_3
```

## `/etc/group`文件

`/etc/group`文件保存所有组的信息，内容包含多行。

```bash
adm:x:4:syslog,abhishek
```

每一行各字段的含义如下。

- adm是组名
- x表示密码字段（当然，您不会在明文中看到密码）
- 4是Group ID aka GID
- syslog和abhishek是属于组adm的用户

## getent 命令

查看某个组的所有成员。

```bash
$ getent group [group_name]
```
