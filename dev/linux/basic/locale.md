# 语言和区域设置

操作系统允许将语言、度量衡、时间格式等，按照不同的区域进行设置。

## locale 命令

不带有任何参数时，`locale`命令显示当前设置。

```bash
$ locale
```

区域设置一般有以下几个属性。

- LC_MESSAGES：系统消息的语言。
- LC_RESPONSE：屏幕上显示的对话框的语言（例如“是”或“否”对话框）。
- LC_NUMERIC：数字的格式（例如数字中的逗号）。
- LC_TIME：时间和日期的格式。
- LC_COLLATE：字符串的字母排序（例如文件名）。
- LC_MONETARY：根据国家/地区设置货币名称和符号。
- LC_NAME：名称的格式（例如，在名字前显示的姓氏）。

`-a`参数显示本机可用的区域设置。

```bash
$ locale -a
```

如果要更改当前区域，只需打开`/etc/default/locale`文件，更改或写入`Lang`变量的值。

```bash
LANG="en_US.UTF-8"
```

你可以将这个值设为本机可用的某个区域。然后退出登录，再次登录就会生效。

另一种更改区域的方法是使用`update-locale`命令。

```bash
$ sudo update-locale LANG=<name of locale here>
```

如果本机不存在你需要的区域，可以用下面的命令生成。

```bash
$ sudo locale-gen <name of locale here>
$ sudo locale-gen <name of locale here>.UTF-8
```

上面两个命令是等价的，区别仅在于是否有 UTF-8 支持。

生成以后，更新一下区域列表。

```bash
$ sudo update-locale
```

## localectl 命令

`localectl status`命令用于查询当前的区域设置。

```bash
$ sudo localectl status
```

该设置保存在`/etc/locale.conf`。

```bash
$ sudo cat /etc/locale.conf
```

`localectl list-locales`命令列出可用的区域。

```bash
$ sudo localectl list-locales
```

`localectl set-locale`命令用于更改当前区域。

```bash
$ sudo localectl set-locale LANG = locale_name
```

