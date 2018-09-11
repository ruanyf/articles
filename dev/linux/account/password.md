# 密码

## passwd 命令

`passwd`命令用于修改用户的密码。

没有任何参数时，`passwd`只能改变用户自己的密码。

```bash
$ passwd
```

非根用户会被要求先输入当前密码，然后再设置新密码。

如果是根用户，可以改变其他用户的密码。

```bash
$ sudo passwd <username>
```

下面的命令可以用一行代码，完成密码输入。

```bash
$ echo -e "<newpassword>\n<newpassword>" | sudo passwd username
````

`-l`参数用来锁定一个用户的密码，使其无法再用密码登录（但是，SSH 登录依然可用）。

```bash
$ sudo passwd -l <username>
```

如果锁定了`root`用户，会使得`sudo`成为唯一可以管理系统的方法。

```bash
$ sudo passwd -l root
```

`-u`参数用来解锁密码。

```bash
$ passwd -u <username>
```

`-d`参数用来移除一个用户的密码，使得该账户的密码变成空密码。

```bash
$ sudo passwd -d username
```

`-x`参数用来指定密码过期时间。

```bash
$ sudo passwd -x 30 username
```

上面命令指定密码的有效期是30天，用户必须在30后改变密码。

`-u`参数设置密码过期前多少天，开始向用户显示警告，要求改变密码。

```bash
# 格式
$ passwd -w <days> <username>

# 示例
$ sudo passwd -w 5 username
```

`-e`参数设置密码立即过期，下次登陆时就会要求修改密码。

```bash
$ sudo passwd -e <username>
```

```bash
# 显示密码状态信息
$ passwd -S <username>

# 查看所有密码状态信息（根用户权限）
$ passwd -Sa

# 设置密码多少天后过期
$ passwd -n <days> <username>

# 设置密码不活跃期
# 密码到期后，多少天内用户不修改，此后用户不得再登陆
$ passwd -i <days> <username>
```

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

## chage 命令

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