# Group

一个用户可以属于多个组（group）。组的最大作用就是，同组的成员可以共享组权限。

Linux 的组分成两类。

- 主要组（primary group）。用户创建文件的时候，文件所在的组就是用户的主要组。大多数情况下，用户的主要组跟用户名相同。用户的主要组保存在`/etc/passwd`文件。
- 次要组（secondary group 或称supplementary group）。如果希望把某些权限分配给一组用户，最好的方法就是建立一个组，把用户都加到这个组，这样的组就称为次要组。

每个用户只能属于一个主要组，可以属于零个或多个次要组。

## usermod 命令

`useradd`命令用于将一个现有的用户加入一个次要组。

```bash
$ sudo usermod -a -G groupname username
```

`-G`参数用于指定组名。

`-a`参数表示用户追加（append）到一个新的组。如果省略`-a`参数，用户将从所有没有列在`-G`参数后面的组里移除。

如果操作成功，`usermod`命令不会有任何提示。如果用户或组不存在，会有警告。

`-G`参数后面可以跟多个组，用于一次将用户添加到多个组。组与组之间使用逗号分隔，逗号前后不能有空格。

```bash
$ sudo usermod -a -G group1,group2 username
```

`-g`参数用于改变一个用户的主要组，后面跟的是组名。

```bash
$ sudo usermod -g groupname username
```

## gpasswd 命令

`gpasswd`命令用于将用户从指定组移除。

```bash
$ sudo gpasswd -d username groupname
```

`-d`参数用于指定组名。

`passwd`命令还可以用来设置组密码。知道组密码的用户可以使用`newgrp`命令加入该组。

某些情况下，根用户可能希望非根用户也能够管理一个或多个组，添加或删除组成员。这时，根用户可以使用`gpasswd`命令的`-A `参数指定某个用户作为特定组的管理员。

```bash
$ gpasswd -A jane web
```

上面命令将用户`jane`设为`web`组的管理员。用户`jane`就可以使用`groupadd`的`-a`参数为`web`组添加成员或删除成员。注意，如果`jane`本身并不是`web`组的成员，上面的命令并不会使其成为这个组的成员。

## id 命令

`id`命令用于膳食某个用户所属的所有组。

```bash
# 格式
$ sudo id username

# 示例
$ id ruanyf
uid=1000(ruanyf) gid=1000(ruanyf) 组=24(cdrom),25(floppy),29(audio)
```

上面例子显示用户的id、主要组和次要组。

## groups 命令

`groups`命令用来显示用户所属的次要组。

```bash
$ groups ruanyf
wheel storage power users libvirt docker kvm
```

## groupadd 命令

`groupadd`命令用来新建组。

```bash
$ sudo groupadd groupname
```

它有如下参数。

- -f	如果组已存在，则以成功状态退出。当您不需要在尝试创建某个组之前检查它是否存在时，此选项对于脚本编写很方便。
- -g	手动指定组 ID。默认设置是使用不低于 GID_MIN 且大于任何现有组的 ID 的最小值。组 ID 通常是唯一的，而且必须是非负的。
- -o	允许组拥有一个非唯一 ID。
- -K	可用于覆盖来自 /etc/login.defs 的默认值。

## groupdel

`groupdel`命令用于删除一个组。

```bash
$ sudo groupdel groupname
```

除了组名，该命令没有任何参数。注意，如果一个组是某个用户的主要组，该命令就无法删除。

## groupmod

`groupmod`命令用来修改组信息。

- `-n` 选项更改组名称
- `-g` 选项更改组编号

```bash
$ id john
uid=1001(john) gid=1001(john) groups=1001(john)
$ groupmod -n john2 john
$ id john
uid=1001(john) gid=1001(john2) groups=1001(john2)
$ ls -ld ~john
drwx------. 3 john john2 4096 Feb 15 16:03 /home/john
```

## 参考链接

- [How to Add User to Group in Linux](https://linuxize.com/post/how-to-add-user-to-group-in-linux/), by Linuxize
