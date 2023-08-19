# sudo 命令

`su`和`sudo`命令允许当前用户切换成另一个用户。

## sudo 命令

### 简介

`sudo`命令允许您使用其他用户的权限运行程序（默认情况下，以超级用户身份）。它会提示您输入个人密码，并通过检查sudoers系统管理员配置的文件来确认您执行命令的请求。

```bash
$ sudo [command]
```

上面命令中，`command`是所要执行的命令。

通过分号，可以一次指定所要执行多个命令。

```bash
$ sudo ls; whoami; hostname 
```

上面示例以根用户的身份，一次执行了3个命令。

执行 sudo 命令以后，系统会要求输入当前用户的密码来验证身份。

每次执行`sudo`命令，系统就会检查用户在`/etc/sudoers`文件中的权限。

如果没有安装这个命令，就需要先安装`sudoer`软件包。

### 参数

`-u`参数指定所要切换的用户名。

```bash
$ sudo -u [username] [command]
```

`-l`参数显示当前用户的权限。

```bash
$ sudo -l
Matching Defaults entries for abhi on test-server:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User abhi may run the following commands on test-server:
    (ALL : ALL) NOPASSWD: ALL
```

`-U`参数指定用户。

```bash
$ sudo -l -U [username]
```

`-i`参数会启动一个互动式的 Shell 环境。

```bash
$ sudo -i
```

## su 命令

### 简介

`su`命令允许当前用户切换成另一个用户，也就是允许当前用户以另一个用户的权限来执行命令。

它是 substitute user（替代用户）或  switch user（切换用户）的缩写，早期也是 super user（超级用户）的缩写。

有些系统不允许 root 用户登录，就可以登录后使用`su`命令切换到 root 用户。

如果当前系统没有安装`su`命令，需要安装 util-linux 软件包。

它的参数就是所要切换的用户名。

```bash
$ su [userID]
```

如果省略用户名，那么就是切换成根用户（用户 ID 为 0）。

执行后，会提示输入所要切换的用户的密码。输入成功后，就会变成另一个用户的身份。切换后，工作目录保持不变，但是 Shell 和环境变量都会改变。

这时，你可以用`whoami`检查一下是否切换成功。

```bash
$ whoami
```

任务执行完毕，可以执行`exit`命令，退出当前用户。

```bash
$ exit
```

### 与 sudo 的区别

`su`与`sudo`命令的区别有以下几点。

（1）sudo 赋予的是一次性权限，命令执行完自动收回权限，而 su 赋予权限后，需要手动切换回来， 

（2）验证身份时，`sudo`输入的是当前用户的密码，`su`输入的是所要切换用户的密码。也就是说，`su`需要共享密码，如果不想这样做，只有使用`sudo`。

（3）两者的限制不同。`su`命令切换后，会拥有目标用户的身份，没有任何限制。而`sudo`命令是以目标用户的权限执行某个命令，并可以限制用户所能执行的程序（在`/etc/sudoers`文件里面指定）。

另外，ubuntu 系统不允许切换为 root 用户，只允许使用 root 用户的权限，这时就没办法直接使用 su 命令。

这时，可以使用下面的命令，进入 root 用户的 Shell 环境。

```bash
$ sudo su -
```

### 参数

`-h`参数（或者`--help`）显示帮助信息。

```bash
$ su –h
```

`-`参数（或者`-l`、`--login`）可以切换到指定用户登录时 Shell 环境，相当于重置环境变量，并且会切换目录。

```bash
$ su - [username]
```

`-s`参数（或者`--shell`）可以切换成指定的某个 Shell。

```bash
$ su -s /usr/bin/zsh
```

`-p`参数（或者`--preserve-environment`）可以保留当前的环境变量，即不引入目标用户的环境变量。

```bash
$ su -p
```

如果同时使用`-p`和`-`，则前者会被忽略。

`-c`参数（或者`--command`）可以直接指定，以指定用户身份所要执行的命令，从而不进入互动式的 Shell 环境。

```bash
$ su [username] -c [command]
```

## wheel 用户组

wheel 用户组指定具有特殊权限的用户，该组用户可以使用`sudo`或`su`命令，切换成另一个用户（通常是根用户）。

不过，GNU su 不支持 wheel 用户组，不会去检查当前用户是否属于该组。
