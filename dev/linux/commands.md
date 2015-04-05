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

### egrep

egrep命令与grep命令类似，但可以使用正则表达式。

```bash
$ egrep "apple|orange" myfile.txt
```

### exit

exit命令用来退出当前脚本。

### export

export命令用于将脚本中的变量，输出到当前Shell。

### fg

fg命令将后台进程放到前台。

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

### grep

grep命令用来在文件中搜索指定文本。

```bash
$ grep apple myfile.txt
```

参数-n表示搜索结果包含行号。

参数--color表示搜索结果高亮显示。

参数-A表示搜索结果再显示后面（After）的行，参数-B表示搜索结果再显示前面（Before）的行，参数-C表示再显示前后（Context）几行。

```bash
$ grep -A1 apple myfile.txt  # return lines with the match, as well as 1 after
$ grep -B2 apple myfile.txt  # return lines with the match, as well as 2 before
$ grep -C3 apple myfile.txt  # return lines with the match, as well as 3 before and after.
```

### head

head命令用来查看文件头部的内容。

```bash
$ head myfile.txt      # print the first 10 lines of the file
$ head -1 myfile.txt   # print the first line of the file
$ head -50 myfile.txt  # print the first 50 lines of the file
```

head命令可以查看多个文件。

```bash
$ head -2 hello.txt kitty.txt
==> hello.txt <==
hello
hello

==> kitty.txt <==
kitty
kitty
```

查看所有文件的头部。

```bash
$ head *
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

### nmap

nmap命令用于扫描网络端口。

```bash
$ nmap 192.168.1.0/24
```

上面命令扫描本地网络254个IP地址，返回哪些IP地址是可以ping的，以及它们打开的端口是什么。

### passwd

passwd命令用来改变密码。

### ps

ps命令显示进程信息。

```bash
$ ps -A   # show all process info
$ ps -fA  # show all process info (verbose)
```

### pstree

pstree以树状形式显示进程树。

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

### sed

sed命令主要用于文本替换和删除行。

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

### tar

tar命令用于将多个文件打包成一个文件。

```bash
tar -c -f destination.tar file1.txt file2.txt file3.txt
```

上面代码中，c选项表示新建，f选项表示文件，目的文件destination实际上是f选项的参数。几乎所有的tar命令用法，都需要带有c和f两个参数。

### tcpdump

tcpdump命令在链接层过滤每个网络数据包，能够网络上的所有通信。它是Berkeley Packet Filters的命令行界面。

### top

top输出系统当前状态。

### which

which命令输出当前shell命令对应的命令行程序。

```bash
$ which bash
/bin/bash
```

### who

who命令显示当前登录的用户。
