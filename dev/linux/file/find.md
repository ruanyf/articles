# find 命令

`find`命令用于搜索文件和目录。

## 基本用法

`find`命令的使用格式如下。

```bash
$ find [options] [path...] [expression] [action]
```

参数

- `-P`：不搜索符号链接的原始文件，默认行为。
- `-L`：搜索符号链接的原始文件。
- `-H`：Do not follow symbolic links except while processing the command line arguments.
- `-D`：输出搜索过程的详细信息。
- `-O`：打开搜索优化。

`path`是指定的搜索路径。

`expression`是搜索文件时要匹配的条件。

`action`是对找到或匹配的文件执行的操作。默认操作是将匹配的文件打印到标准输出（STDOUT）。

## 表达式

`-name`查询文件名，大小写敏感。

```bash
$ find /usr -name Words.txt
```

`-name`查询文件名，大小写不敏感。

```bash
$ find /usr -iname words.txt
```

可以使用通配符。

```bash
$ find /usr -iname '*.txt'
```

`-type`查找指定类型的文件，常用类型如下。

- b = block special
- c = character special
- d = directory
- p = named pipe
- f = regular file
- l = symbolic link
- s = socket

```bash
$ find ~/ -type f
```

`-size`指定文件大小，大小指示符如下。

- b = 512-byte blocks (default)
- c = bytes
- w = two-byte words
- k = kilobytes (KiB, 1024 bytes)
- M = Megabyte (MiB)
- G = Gigabyte (GiB)

`+`和`-`表示多和少。

```bash
$ find ~/ -size +50M

$ find /tmp -size -1G
```

`-user`指定文件所有者。

```bash
$ find / -user savona
```

`-user`也可以指定 UID。

```bash
$ find / -user 1000
```

`-group`指定文件所属的组。

```bash
$ find / -group wheel
```

下面三个属性可以指定文件的时间，默认单位是天。

- mtime = Modification time
- atime = Access time
- ctime = Change Time

找到一个10天前修改的文件。

```bash
$ find / -mtime 10
```

`+`和`-`同样表示多和少。

```bash
$ find / -mtime -30
$ find / -mtime +60
```

`-perm`指定文件的权限。

```bash
$ find / -perm 754
$ find / -perm u=rwx,g=rx,o=r
```

`-executable`指定可执行文件。

```bash
$ find /usr/bin/ -executable
```

`-readable`指定可读文件。

```bash
$ find /usr/share/ -readable
```

`-writable`指定可写文件。

```bash
$ find /usr/share/ -writable
```

`-empty`指定空文件（文件大小为零）和空目录（没有文件和子目录）。

```bash
$ find /var/tmp/ -empty
```

`-maxdepth`指定最大的子目录深度。

```bash
$ find / -maxdepth 5
```

`-mindepth`指定最小子目录深度。

```bash
$ find / -mindepth 5 -type f -empty
```

多个表达式可以结合使用。

```bash
$ find ~/ -type f -empty -readable
```

## 逻辑运算

`-a`表示两个表达式是 AND 关系。由于这是默认行为，`-a`可以省略。

```bash
$ find ~/ -type f -iname myfile
# 等同于
$ find ~/ -type f -a -iname myfile
```

`-o`表示 OR 关系。

```bash
$ find . -name "s" -o -name "o"
```

`!`表示 NOT，即不匹配某个表达式。

```bash
$ find . ! -type f
$ find . -type f ! -name "o*"
```

`()`可以永来强制优先级。

```bash
$ find . -type f '(' -name "my*" -o -name "ok*" ')'
```

## action

`-delete`表示删除。

`-ls`表示列出文件，这是默认动作。

`-exec`用于指定操作的命令，直到遇到分号“;”。分号需要被转义，防止被 shell 扩展。

```bash
$ find ~/test/ -maxdepth 1 -type f -execdir cp -v {} mydir/ \;
```

`-execdir`选项与`-exec`完全相同。主要区别是`-execdir`对匹配文件的子目录运行命令。

```bash
$ find ~/test/ -maxdepth 1 -type f -execdir cp -v {} mydir/ \;
```

`-ok`选项基本等同于`-exec`，区别是对每个文件执行操作之前会有提示，要求确认。

```bash
$ find ~/test/ -type f -ok rm -v {} \;
```

`-fprint <filename>`将操作结果写入一个文件。

```bash
$ find ~/test/ -type f -fprint output.txt
```

## 参考链接

- [Linux Find Command – Everything You Need to Know](https://www.putorius.net/linux-find-command.html), Steven Vona
