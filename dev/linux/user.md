# 用户管理

Linux系统的用户管理，主要用到以下命令。

- useradd 增加新用户
- usermod 修改现有用户
- userdel 删除指定用户
- passwd 为用户指定密码
- chage 查看或修改用户密码的过期信息

## useradd

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

- -u：用户ID（UID）
- -g：组ID（GID）
- -c：用户信息（Comments）
- -d：用户主目录（Home Directory）
- -s：用户Shell

## usermod

`usermod`命令用于修改用户信息。

```javascript
$ usermod -G sap -d /opt/sap -s /bin/sh harry
```

它的参数含义如下。

- -G：修改用户所在的组
- -d：修改用户主密码
- -s：修改用户的Shell

## userdel

`userdel`命令用于删除指定用户。

```javascript
# -r参数表示同时删除子目录
$ userdel -r linuxtechi
```

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

## chage

`chage`命令用于指定用户密码过期时间。

```bash
# 指定密码0天后过期，即下次登陆就必须更新密码
$ chage -d 0 <username>

# 查看密码过期信息
$ chage -l <username>
```

## sudo

`sudo`命令用于以根用户的身份执行命令。

```bash
# 列出用户可以执行的命令
$ sudo -l

# 进入根用户的shell
$ sudo -i
```
