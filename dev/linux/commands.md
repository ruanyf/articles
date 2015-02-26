# bash命令一览

### alias

alias用来为命令建立别名。

```bash
alias cp="cp -R"
alias mkdir="mkdir -p"
```

### bind

显示可绑定的操作，以及已经绑定的快捷键。

```bash
$ bind -P
```

显示可绑定的操作。

```bash
$ bind -l
```

自定义绑定的键。

```bash
 .bash_profile (or, more accurately, in my global bash settings file) I use:
# make cursor jump over words
bind '"\e[5C": forward-word'    # control+arrow_right
bind '"\e[5D": backward-word'   # control+arrow_left

# make history searchable by entering the beginning of command 
# and using up and down keys
bind '"\e[A": history-search-backward'  # arrow_up
bind '"\e[B": history-search-forward'   # arrow_down
```

### cat

cat命令用来将一个或多个文件的内容，显示在标准输出。

```bash
$ cat file1 file2
```

参数-n表示输出带行号。

### chmod

chmod命令用来改变命令的权限。

用户类型

- u - user
- g - group
- a - all

权限类型

- r - read
- w - write
- x - execute

```bash
$ chmod u+x myfile
$ chmod g+rxw myfile
$ chmod ga-wx myfile

$ chmod 777 myfile
$ chmod 755 myfile
```

### cp

cp命令用来复制文件。

```bash
$ cp source target
```

参数-R用来递归复制目录。

```bash
$ cp -R dir1 dir2
```

### echo

echo命令用于将参数显示在标准输出上。

```bash
$ echo joe
joe
$ echo "joe"
joe
```

上面两个命令都将Joe显示在标准输出，引号（包括单引号）默认不起作用。

如果要输出引号，需要用反斜杠转义。

```bash
$ echo \"joe\"
"joe"
```

参数-e表示不输出换行符。

参数-n表示解释特殊符号。

```bash
echo -e "joe\tjoe\njoe"
joe	joe
joe
```

### exit

exit命令用来退出当前脚本。

### export

export命令用于将脚本中的变量，输出到当前Shell。

### file

file命令用来查看文件类型。

```bash
$ file Default.png
Default.png: PNG image data, 640 x 1136, 8-bit/color RGB, non-interlaced

```

### find

从当前目录中，按照文件名查找文件。

```bash
$ find . -name "*.txt"
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

### mkdir

mkdir命令用来新建目录。

参数-p用来遇到已存在的目录时不报错。

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

### rm

rm命令用来删除文件或目录。

参数-r表示递归删除。

参数-f表示强制删除，即忽视警告。

### source

Bash运行脚本文件，会新建一个Shell。它与原有Shell之间没有通信。

```bash
$ cat ./test_src.sh 
#!/usr/bin/env bash

myvariable=54
echo $myvariable
```

在当前Shell运行上面的脚本，脚本中的变量便不存在了。

```bash
$ ./test_src.sh 
54
$ echo $myvariable
```

source命令就用来让脚本文件运行在当前Shell。 

```bash
$ source ./test_src.sh 
54
$ echo $myvariable
54
```

source命令可以用一个点代替。

```bash
$ . ./test_src.sh
54
```

### tcpdump

tcpdump命令在链接层过滤每个网络数据包，能够网络上的所有通信。它是Berkeley Packet Filters的命令行界面。

### top

top输出系统当前状态。

