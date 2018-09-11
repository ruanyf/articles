# 文件时间

## 概述

Linux 系统的每个文件都有三个时间戳。

- atime（access time）：上一次读取时间，包括直接读取和 cat、vim、less 之类的软件读取。
- mtime（modify time）：上一次修改时间，指的是文件内容的最后变动时间。
- ctime（change time）：上一次变动时间，指的是文件的属性和元数据的变化，包括权限、所有者、文件名、位置等。这个时间由系统控制，开发者无法直接改变它。

注意，文件内容的变更也会导致 ctime 的变化，即 mtime 变化一定引起 ctime 的变化。

`stat`命令可以用来查看时间戳。

```bash
# 格式
$ stat <filename>

# 示例
$ stat abhi.txt
  File: abhi.txt
  Size: 0         	Blocks: 0          IO Block: 4096   regular empty file
Device: 10305h/66309d	Inode: 11936465    Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/abhishek)   Gid: ( 1000/abhishek)
Access: 2018-08-30 12:19:54.262153704 +0530
Modify: 2018-08-30 12:19:54.262153704 +0530
Change: 2018-08-30 12:19:54.262153704 +0530
 Birth: -
```

## touch 命令：改变时间戳

`touch`命令可以改变 atime、mtime 和 ctime，把它们重置为当前时间。

```bash
$ touch demo.txt
```

上面命令使得`demo.txt`的三个时间戳都发生改变。

如果只希望改变文件的`atime`，不改变其他两个时间戳，可以使用`touch`命令的`-a`参数。

```bash
$ touch -a demo.txt
```

如果只希望改变`mtime`（`ctime`会自动随之改变），可以使用`-m`参数。

```bash
$ touch -m demo.txt
```

`-r`参数用来将一个文件的时间戳，改成另一个文件的时间戳。

```bash
$ touch -r <source_file> <target_file>
```

上面命令将`target_file`的`atime`和`mtime`，改成跟`source_file`一致。

`touch`命令的`-t`参数还可以将时间戳改成指定时间。时间的格式如下。

```bash
$ touch -t [[CC]YY]MMDDhhmm[.ss] <filename>
```

`-t`参数后面的符号含义如下。

- CC – 年的前两位数字
- YY – 年的后两位数字
- MM – 月（01-12）
- DD – 日（01-31）
- hh – 小时（00-23）
- mm – 分（00-59）
- ss – 秒（00-59） 

这些符号里面，`CC`是可选的，`CCYY`也是可选的，默认值是当前年份。`SS`可以省略，默认为`00`。

```bash
$ touch -t 12021301 demo.txt 
```

上面命令将`demo.txt`的时间戳，改成当前年份的12月2日13点01分。

注意，`-t`参数只能改变`atime`和`mtime`，`ctime`仍然将是当前时间。

`-h`参数用来处理符号链接。

```bash
$ touch -h <symbolic_link>
```

## 参考链接

- [9 Useful Examples of Touch Command in Linux](https://linuxhandbook.com/touch-command/)，by Abhishek