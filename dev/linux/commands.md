# bash命令一览

### file

file命令用来查看文件类型。

```bash
$ file Default.png
Default.png: PNG image data, 640 x 1136, 8-bit/color RGB, non-interlaced

```

### history

history命令显示了过去输入的500条命令。

```bash

$ history

# 执行特定编号的命令
$ !100

# 搜索某些命令
$ history | grep “BLOW”

# 分屏查看
$ history | less

```

### read

read命令将用户输入读入变量。

```bash
$ read x
```

### rename

为文件批量改名。

```bash

$ rename [-v -n -f] <pcre> <files>

```

- v 在标准输出显示改名过程
- n 模拟显示改名的结果，并不实际改名
- f 覆盖同名文件
- <pcre> 代表Perl-compatible regular expression (PCRE)，即改名的正则表达式，形式为's/old-name/new-name/'

```bash

$ rename 's/\.jpeg$/\.jpg/' *.jpeg

# 小写改成大写
$ rename 'y/A-Z/a-z/' *

$ rename -v 's/img_(\d{4})\.jpeg$/dan_$1\.jpg/' *.jpeg

```

### tcpdump

tcpdump命令在链接层过滤每个网络数据包，能够网络上的所有通信。它是Berkeley Packet Filters的命令行界面。

### top

top输出系统当前状态。

