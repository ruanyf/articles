# Bash 简介

## 命令

Bash可以使用的命令分成四类。

- 可执行程序
- Shell 提供的命令
- Shell 函数
- 前三类命令的别名

## type, whatis

`type`命令可以显示命令类型。

```bash
$ type command
```

下面是几个例子。

```bash
$ type type
type is a shell builtin

$ type ls
ls is aliased to `ls --color=tty'

$ type cp
cp is /bin/cp
```

`whatis`命令显示指定命令的描述。

```bash
$ whatis ls
ls (1) - list directory contents
```

## apropos

`apropos`命令返回符合搜索条件的命令列表。

```bash
$ apropos floppy
create_floppy_devices (8) - udev callout to create all possible
fdformat (8) - Low-level formats a floppy disk
floppy (8) - format floppy disks
gfloppy (1) - a simple floppy formatter for the GNOME
mbadblocks (1) - tests a floppy disk, and marks the bad
mformat (1) - add an MSDOS filesystem to a low-level
```

## alias, unalias

`alias`命令用来为命令起别名。

```bash
$ alias foo='cd /usr; ls; cd -'

$ type foo
foo is aliased to `cd /usr; ls ; cd -'
```

上面命令指定`foo`为三个命令的别名。以后，执行`foo`就相当于一起执行这三条命令。

注意，默认情况下，别名只在当前Session有效。当前Session结束时，这些别名就会消失。

`alias`命令不加参数时，显示所有有效的别名。

```bash
$ alias
alias l.='ls -d .* --color=tty'
alias ll='ls -l --color=tty'
alias ls='ls --color=tty'
```

`unalias`命令用来取消别名。

```bash
$ unalias foo
$ type foo
bash: type: foo: not found
```

## which

`which`命令显示可执行程序的路径。

```bash
$ which ls
/bin/ls
```

`which`命令用于Shell内置命令时（比如`cd`），将没有任何输出。

## help，man

`help`命令用于查看Shell内置命令的帮助信息，`man`命令用于查看可执行命令的帮助信息。

```bash
$ help cd
$ man ls
```

`man`里面的文档一共有8类，如果同一个命令，匹配多个文档，`man`命令总是返回第一个匹配。如果想看指定类型的文档，命令可以采用下面的形式。

```bash
$ man 5 passwd
```

## echo

`echo`命令用于将指定内容输出到显示屏（标准输出）。

```bash
$ echo this is a test
this is a test
```

## 引号

如果输出的文本之中包含括号，则需要使用双引号。

```bash
$ echo "two words.txt"
```

双引号还会对美元符号、斜杠和反引号转义。

```bash
$ echo "$USER $((2+2)) $(cal)"
```

双引号还可以保存格式。

```bash
# 输出一行显示
$ echo $(cal)

# 输出分行显示
$ echo "$(cal)"
```

双引号之中，反斜线可以用于转义，使得美元符号、斜杠和反引号不再会转义。

```bash
$ echo "The balance for user $USER is: \$5.00"
The balance for user me is: $5.00
```

文件名之中的特殊符号，也可以用反斜线转义。

```bash
$ mv bad\&filename good_filename
```

如果需要对反斜线本身转义，则需要连续使用两个反斜线（`//`）。

反斜线可以用来表示特殊符号。

- `\a` 响铃
- `\b` 退格
- `\n` 换行
- `\r` 回车
- `\t` 制表符

`echo`命令的`-e`参数，可以解释双引号之中的这些特殊符号。

```bash
$ echo -e "Time's up\a"
```

单引号除了不会对美元符号、斜杠和反引号转义，其他与双引号一致。

```bash
$ echo text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER
text /home/me/ls-output.txt a b foo 4 me

$ echo "text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER"
text ~/*.txt {a,b} foo 4 me

$ echo 'text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER'
text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER
```

## 重定向

重定向指的是将命令行输出写入指定位置。

`>`用来将标准输出重定向到指定文件。

```bash
$ ls -l /usr/bin > ls-output.txt
```

如果重定向后的指定文件已经存在，就会被覆盖，不会有任何提示。

如果命令没有任何输出，那么重定向之后，得到的是一个长度为`0`的文件。因此，`>`具有创建新文件或改写现存文件、将其改为长度`0`的作用。

```bash
$ > ls-output.txt
```

`>>`用来将标准输出重定向追加到指定文件。

```bash
$ ls -l /usr/bin >> ls-output.txt
```

`2>`用来将标准错误重定向到指定文件。

```bash
$ ls -l /bin/usr 2> ls-error.txt
```

标准输出和标准错误，可以重定向到同一个文件。

```bash
$ ls -l /bin/usr > ls-output.txt 2>&1
# 或者
$ ls -l /bin/usr &> ls-output.txt

# 追加到同一个文件
$ ls -l /bin/usr &>> ls-output.txt
```

如果不希望输出错误信息，可以将它重定向到一个特殊文件`/dev/null`。

```bash
$ ls -l /bin/usr 2> /dev/null
```

`|`用于将一个命令的标准输出，重定向到另一个命令的标准输入。

```bash
$ ls -l /usr/bin | less
```

不要将`>`与`|`混淆。

```bash
$ ls > less
```

上面命令会在当前目录，生成一个名为`less`的文本文件。

## tee

`tee`命令用于同时将标准输出重定向到文件，以及另一个命令的标准输入。

```bash
$ ls /usr/bin | tee ls.txt | grep zip
```

## 命令替换

命令替换（command substitution）指的是将一个命令的输出，替换进入另一个命令。`$(command)`表示命令替换，另一种写法是使用反引号。

```bash
$ echo $(ls)
# 或者
$ echo `ls`

$ ls -l $(which cp)
# 或者
$ ls -l `which cp`
```
