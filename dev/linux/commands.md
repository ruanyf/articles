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

### chgrp

chgrp命令改变文件的群组。

### chmod

chmod命令用来改变文件的权限。

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

### chown

chown命令改变文件的所有者。

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

find命令用来按照指定条件搜索文件或目录。从当前目录中，按照文件名查找文件。

```bash
$ find . -name "*.txt"

# 大小写不敏感
$ find . -iname "*.txt"

# 只搜索文件
$ find . -iname \*book\*.txt" -type f

# 搜索当前目录下的空目录
$ find -type d -empty
```

find命令默认搜索子目录。

参数-exec grep表示对于每个发现的文件，都用grep处理。

参数-type f表示只处理文件，不包括目录。

### grep

grep命令用来在文件中搜索指定文本。

```bash
# 输出myfile.txt中包含apple的行
$ grep apple myfile.txt

# 输出tempfile不包含the的行
grep -v the tempfile

# 输出文件名中包含zip的文件
ls /usr/bin /bin|grep zip
```

参数-A表示显示搜索结果+后面（After）的行，参数-B表示显示搜索结果+前面（Before）的行，参数-C表示显示搜索结果+前后（Context）的行。

```bash
$ grep -A1 apple myfile.txt  # return lines with the match, as well as 1 after
$ grep -B2 apple myfile.txt  # return lines with the match, as well as 2 before
$ grep -C3 apple myfile.txt  # return lines with the match, as well as 3 before and after.
```

参数-c：输出匹配的行数。

参数--color表示搜索结果高亮显示。

参数-e表示正则搜索。

参数--exclude-dir=dir指定搜索时排除在外的目录。

参数-F表示对于使用字面量处理搜索字符，不将其当作正则。

参数-h：在多文件搜索中，不输出文件名。

参数-H表示同时输出文件名。

参数-i表示搜索时忽略大小写。

参数-I表示忽略二进制文件。

参数-l（--files-with-matches）表示只输出文件名，不输出匹配的行。这能加快搜索速度，因为grep一旦在一个文件中找到第一个匹配的行，就不再向下搜索了。

参数-L：输出不匹配的文件名。

参数-n表示搜索结果包含行号。

参数-r表示递归搜索。

```bash
$ grep -r 'string' dir/
# 如果不支持-r参数，可以用下面的命令
$ find dir/ -type f -exec grep -H 'string' {} +
```

参数-v：显示所有不匹配该模式的行。

### groups

groups命令查看当前用户所属的群组。

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

### locate

locate 用来在整个文件系统（从根目录开始）搜索某个文件。

```bash
$ locate -i mybook
```

locate命令区分大小写，i参数表示大小写不敏感。

locate命令通过预先生成的数据库搜索，所以速度很快，缺点是搜索不到刚刚生成的文件。

- n 指定结果数，比如 n 10 表示只返回10条结果。
- r 进行正则搜索，将文件名解释为正则表达式。

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
