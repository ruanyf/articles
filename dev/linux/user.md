# 用户管理

Linux系统的用户管理，主要用到以下命令。

- useradd 增加新用户
- usermod 修改现有用户
- userdel 删除指定用户
- passwd 为用户指定密码
- chage 查看或修改用户密码的过期信息

在登录后，新 shell 进程会使用您的用户和组 ID 来运行。这些是控制您对系统上任何文件的访问的权限。这通常意味着您不能访问数据其他用户的文件，不能写入系统文件。

## 用户信息

### id

`id`命令用来查看用户信息。

```bash
$ id john
uid=1001(john) gid=100(users) groups=100(users)
```

### whoami

`whoami`命令返回当前用户的ID。

```bash
$ whoami
jane
```

## 用户管理

### useradd

`useradd`命令用于增加新用户。

```bash
# 新增用户
$ useradd <username>

# 定制新用户的参数
$ useradd -u 2000 -g 5000 -c "Admin Account of SAP" -d /opt/sap -s /bin/ksh john

# 查看新增的用户
$ grep john /etc/passwd
```

`useradd`命令背后，Linux系统会进行以下操作。

- 新建用户主目录`/home/<username>`
- 在`/etc/passwd`文件更新用户信息
- 在`/etc/group`文件储存用户的组信息
- 在`/etc/shadow`文件更新用户的密码信息
- 在`/var/spool/mail/<username>`目录储存用户的Email

`useradd`命令的参数如下。

- `-b` `--base-dir`：在其中创建用户主目录的默认基础目录。这通常是 /home，用户的主目录是 /home/$USER。
- `-c` `--comment`：用户信息（Comments），一个描述该 ID 的文本字符串
- `-d` `--home`：用户主目录（Home Directory）的目录名称
- `-e` `--expiredate`：帐户将过期或被禁用的日期，格式为 YYYY-MM_DD。
- `-g` `--gid`：组ID（GID），用户的初始登录组的名称或编号。该组必须存在。
- `-G` `--groups`：用户所属的其他组的逗号分隔列表。
- `-K` 可用于覆盖来自`/etc/login.defs`的默认值。
- `-m` `--create-home`：创建用户主目录，如果用户的主目录不存在，则创建它。将框架文件和 /etc/skel 中的所有目录都复制到主目录。
- `-o` `--non-unique` 允许用户拥有一个非唯一 ID。
- `-p` `--password` 加密的密码。如果未指定密码，默认设置是禁用该帐户。您通常将在后续步骤中使用 passwd 命令，而不是生成一个加密的密码并在 useradd 命令上指定它。
- `-s` `--shell`：用户Shell，如果用户的登录 shell 的名称与默认登录 shell 不同，则采用用户的登录 shell 名称。
- `-u` `--uid`：用户ID（UID） 非负的用户 ID 编号，如果未指定 -o，那么它必须是唯一的。默认设置是使用不低于 UID_MIN 且大于任何现有用户的 ID 的最小值。

## 相关文件

用户和组信息的主要存储库是 /etc 中的 4 个文件：

- /etc/passwd 是包含用户的基本信息的密码 文件。
- /etc/shadow 是包含已加密的密码的影子密码 文件。
- /etc/group 是组 文件，包含组的基本信息和哪些用户属于它们。
- /etc/gshadow 是包含已加密的组密码的影子组 文件。

所有这些文件都是纯文本文件。通常，不要直接编辑它们。可以使用所提供的工具来更新它们，以便正确锁定它们并保持同步。

出于安全原因，密码 (/etc/passwd) 和组 (/etc/group) 文件都添加了阴影。passwd 和 group 文件本身必须是所有用户可读的，但加密的密码不应是所有用户可读的。因此，影子文件包含加密的密码，而且这些文件仅能由 root 读取。suid 程序提供了必要的验证访问权，该程序具有根权限但可由任何用户运行。

可以使用 vipw 命令安全地编辑 /etc/passwd，使用类似的 vigr 命令安全地编辑 /etc/group。当您在 vi 编辑器中执行更改时，这两个命令会锁定必要的文件。如果更改 /etc/passwd，vipw 会提示您查看是否还需要更新 /etc/shadow。类似地，如果使用 vigr 更新 /etc/group，系统会提示您更新 /etc/gshadow。如果需要删除组管理员，可能需要使用 vigr，因为 gpasswd 只允许添加管理员。

### /etc/passwd

`/etc/passwd`文件包含系统中的每个用户的一行。

```
root:x:0:0:root:/root:/bin/bash
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
john:x:1001:1020:John Doe:/home/john:/bin/bash
jane:x:1002:1002:Jane Doe:/home/jane:/bin/bash
john3:x:1003:1003:John Doe3:/home/john3:/bin/bash
```

每一行包含 7 个以冒号 (:) 分隔的字段。

- 用户名	用于登录系统的名称。例如 jane。
- 密码	已加密的密码。使用影子密码时，只包含一个 x 字符。
- 用户 ID (UID)	用于在系统中表示此用户名的编号。例如，表示用户 jane 的 1002。
- 组 ID(GID)	用于表示此用户在系统中的主要组的编号。例如，用户 jane 的 1002。
- 注释(GECOS)	一个用于描述用户的可选字段。例如 Jane Doe。该字段可以包含多个逗号分隔的条目。它也可供 finger 等程序使用。GECOS 是过去使用的名称。请在 man 5 passwd 中查阅详细信息。
- 主目录	用户的主目录的绝对路径。例如 /home/jane。
- Shell	在用户登录到系统时自动启动的程序。这通常是一个交互式 shell，比如 /bin/bash 或 /bin/tcsh，但它可以是任何程序，不一定是交互式 shell。对于 mail 用户，它是 /sbin/nologin，指示系统 mail 用户无法登录。

### /etc/group

`/etc/group`文件包含系统中的每个组的一行。

```
root:x:0:
mail:x:12:
jane:x:1002:
john2:x:1020:john3
john3:x:1003:
```

每一行包含 4 个以冒号 (:) 分隔的字段。

- 组名称	此组的名称。例如 john2。
- 密码	已加密的密码。使用影子组密码时，只包含一个 x 字符。
- 组 ID(GID)	用于在系统中表示此组的编号。例如表示组 jane 的 1002。
- 成员	一个逗号分隔的组成员列表，以此组作为主要组的成员除外。

## usermod

`usermod`命令用于修改用户信息。

```javascript
$ usermod -G sap -d /opt/sap -s /bin/sh harry
```

它的参数含义如下。

- -G：修改用户所在的组
- -d：修改用户主密码
- -s：修改用户的Shell
- -L：锁定或挂起帐户。
- -U：解锁帐户。
- -e：设置帐户的有效期。
- -f：密码过期之后到禁用帐户之前的天数。

它可以使用用于 useradd 的大部分选项，但不能为用户创建或填充新主目录。如果需要更改用户的名称，可以指定 -l 或 --login 选项和新名称。

如果您需要预防用户登录，可以使用 usermod 命令的 -L 选项挂起 或锁定 帐户。可以使用 -U 选项解锁帐户。

## userdel

`userdel`命令用于删除指定用户。

```javascript
# -r参数表示同时删除子目录
$ userdel -r linuxtechi
```

`-r`或`--remove`选项来删除用户的主目录及其内容，以及用户的邮件。

### 影子文件

`/etc/shadow`文件包含已加密的密码，以及密码和帐户有效期信息。

密码可使用多种加密算法之一来进行加密。旧版的系统使用了 DES 或 MD5，但现代系统通常使用 Blowfish、SHA-256 或 SHA-512，或者可能使用 MD5。无论采用哪种加密算法，密码都会加盐，防止两个平常相同的密码生成相同的已加密值。盐是一个可变长度的字段，最长 8 个字符，并以下一个 $ 符号结尾。随后是已加密的密码。

### /etc/login.defs

创建用户时的系统默认行为在`/etc/login.defs`中定义，它是一个文本文件，包含多个与系统登录相关的定义。此文件中的一些值可以控制用户和组的创建，其他值可以控制登录时的系统行为。

```bash
#
# Min/max values for automatic uid selection in useradd
#
UID_MIN			 1000
UID_MAX			60000
# System accounts
#SYS_UID_MIN		  100
#SYS_UID_MAX		  999

#
# Min/max values for automatic gid selection in groupadd
#
GID_MIN			 1000
GID_MAX			60000
# System accounts
#SYS_GID_MIN		  100
#SYS_GID_MAX		  999
```

上面一段定义用户的最小编号是1000，用户组的最小编号是1000。

## 特殊帐号

除了常规用户帐户和系统上的根帐户之外，通常还有一些特殊用途的帐户，用于 FTP、SSH、邮件、新闻等守护进程。

这些帐户通常可以控制文件，不应被普通登录用户访问。因此，它们通常将登录 shell 指定为`/sbin/nologin`或`/bin/false`，以便让登录尝试失败。

## passwd

`passwd`命令用于修改用户的密码。

```bash
# 根用户可以修改其他用户的密码
$ passwd <username>

# 非根用户只能修改自己的密码
$ passwd

# 一行命令完成密码输入
$ echo -e "<newpassword>\n<newpassword>" | passwd username

# 显示密码状态信息
$ passwd -S <username>

# 查看所有密码状态信息（根用户权限）
$ passwd -Sa

# 删除指定用户的密码
$ passwd -d <username>

# 设置密码立即过期，下次登陆时就会要求修改密码
$ passwd -e <username>

# 设置密码多少天后过期
$ passwd -n <days> <username>

# 设置密码过期前多少天，开始向用户显示警告
$ passwd -w <days> <username>

# 锁定用户密码，不得修改
$ passwd -l <username>

# 解锁用户密码
$ passwd -u <username>

# 设置密码不活跃期
# 密码到期后，多少天内用户不修改，此后用户不得再登陆
$ passwd -i <days> <username>
```

非根用户会被要求先输入当前密码，然后再设置新密码。

密码状态信息一共有7栏，含义如下。

- 用户名
- 密码状态：PS（Password Set）、LK（Password locked）、NP（No Password）
- 密码上次修改时间
- minimum age
- maximum age
- warning period
- inactivity period for the password

`passwd`命令的选项如下。

- -l 锁定或挂起帐户。
- -u 解锁帐户。
- -d 通过将帐户设置为无密码来禁用它。
- -f 设置帐户的有效期。
- -n 密码的最短有效天数。
- -x 密码的最长有效天数。
- -w 在必须更改密码之前提醒的天数。
- -i 密码过期之后到禁用帐户之前的天数。
- -S 输出一条有关当前帐户状态的短消息。

## chage

`chage`命令用于指定用户密码过期时间。

```bash
# 指定密码0天后过期，即下次登陆就必须更新密码
$ chage -d 0 <username>

# 查看密码过期信息
$ chage -l <username>
```

change命令的选项

- -E 设置帐户的有效期。
- -m 密码的最短有效天数。
- -M 密码的最长有效天数。
- -W 在必须更改密码之前提醒的天数。
- -I 密码过期之后到禁用帐户之前的天数。
- -l 输出一条有关当前帐户状态的短消息。

## sudo

`sudo`命令用于以根用户的身份执行命令。

```bash
# 列出用户可以执行的命令
$ sudo -l

# 进入根用户的shell
$ sudo -i
```

## 用户组

### groupadd

`groupadd`命令用来添加用户组。

- -f	如果组已存在，则以成功状态退出。当您不需要在尝试创建某个组之前检查它是否存在时，此选项对于脚本编写很方便。
- -g	手动指定组 ID。默认设置是使用不低于 GID_MIN 且大于任何现有组的 ID 的最小值。组 ID 通常是唯一的，而且必须是非负的。
- -o	允许组拥有一个非唯一 ID。
- -K	可用于覆盖来自 /etc/login.defs 的默认值。

### groupdel

`groupdel`命令只需要组名称，就能删除这个组。它没有选项。您不能删除作为用户的主要组的任何组。

### groupmod

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

### gpasswd

组也可以有密码，可以使用`gpasswd`命令设置。知道组密码的用户可以使用 newgrp 命令临时加入该组。您需要权衡使用 usermod 命令将用户添加到组的优势与有太多人知道组密码的安全问题。

在某些情况下，您可能希望非 root 的用户能够管理一个或多个组，添加或删除组成员。根用户可以使用 gpasswd 的 -A 选项来添加用户作为组的管理员。

```bash
$ gpasswd -A jane john2
```

上面命令将用户 jane 设置为组 john2 的管理员。用户 jane 现在可以使用 groupadd 的 -a 选项向组 john2 添加成员。类似地，管理员可以删除组的成员。备注：如果组管理员不是组的成员，添加他或她不会使其成为组的成员。
