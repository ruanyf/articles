# bash的用法

## bash环境

bash命令的x参数，进入调试环境。

```bash
$ bash -x <脚本文件名>
```

每次打开一个新的Bash窗口，就会执行.profile文件，作为窗口的初始化文件。

## 重定向

文件ID为1是标准输出，文件ID文件为2是标准错误。

```bash
$ command.sh 1> out.o 2> out.e
```

&1代表标准输出，&2代表标准错误。

```bash
$ echo "hello kitty" > &1
$ echo "hello kitty" > &2
```

将标准错误重定向到标准输出。

```bash
$ ./somescript.sh 2> &1
```

## 行命令

命令行窗口可以使用以下的编辑命令。

- Ctrl-A 移到行首
- Ctrl-E 移到行尾
- Ctrl-U 从光标位置删除到行首
- Ctrl-K 从光标位置删除到行尾
- Ctrl-f  前进一个字符
- Ctrl-b  后退一个字符
- Ctrl-forward-arrow 前进一个词
- Ctrl-backward-arrow 后退一个词
- up-arrow 前进到history的上一个命令
- down-arrow 后退history的下一个命令
- Ctrl-X Ctrl-E 打开编辑器，编辑行命令
- Ctrl-R 搜索输入命令的历史
- Ctrl-w 删除上一个输入的词
- Ctrl-y 粘贴上一个被删除的词
- Ctrl-c 终止前台进程，不执行当前命令行
- Ctrl-z 挂起前台进程
- Ctrl-l 清屏
- !! 重复上一个命令
- !$ 上一个命令中最后一个参数

反引号中的命令，会执行后运行。

```bash

$ `which git` --version

```

## Bash脚本

### Shebang

Shebang指文件第一行，用来指定命令解释器。

```bash
#! /bin/bash
```

解释器所在的位置也可以不写死，改用`/usr/bin/env`以$PATH确定执行哪一条命令。

```bash
#! /usr/bin/env node
```

### 变量

等号用来给变量赋值。等号前后都不能有空格。

```bash
$ a=3
```

对变量取值的时候，变量名前要加上美元符号。

```bash
$ echo $a
3
```

变量名如果后面还紧跟着其他字符，可以将其放在大括号中。

```bash
INIT_DIR="${HOME}/.dotfiles/bash"
```

Bash变量是弱类型的，可以随时改为其他类型的值。如果变量的值是字符串，而且包含空格，那么需要用双引号包起来。另外，双引号中的变量会被扩展成对应的值，单引号没有变量扩展的功能。

### 环境变量

- PS1 提示符
- SHELL 当前使用的Shell

### 特殊变量

- $? 特殊变量，表示上一个命令的输出结果，如果是0，表示运行成功。
- $* 全部参数
- $0 脚本名
- $1 脚本的第一个参数
- $2 脚本的第二个参数，以此类推
- $# 参数数组的大小

```bash
# hellokitty.sh
#!/usr/bin/env bash

echo hello $1

# 运行
$ ./hellokitty.sh kitty
hello kitty
```

### if结构

```bash
if condition
then
do something
else
do something else
fi
```

实例

```bash
$ a=joe
$ if [ $a == "joe" ]; then echo hello; fi
hello

```

脚本实例

```bash
#!/usr/bin/env bash

a=joe

if [ $a == "joe" ]; then 
	echo hello; 
elif [ $a == "doe" ]; then 
	echo goodbye; 
else 
	echo "ni hao"; 
fi
```

进行判断的脚本。

```bash
$ mkdir testdir   # make a test directory
$ outputdir=testdir
$ if ! cd $outputdir; then echo "couldnt cd into output dir"; exit; fi
$ # no error -  now we're in the directory testdir
```

test是判断命令，“[” 符号可用于代替test命令。

```bash
if test $? -eq 0 
then
fi

# 判断文件是否存在
if [ -e $file ]

# 判断文件大小是否为0
if [ -s $file ]

```

运算符

- -eq Is Equal To
- -ne Is Not Equal To
- -gt Is Greater Than
- -ge Is Greater Than or Equal To
- -lt Is Less Than
- -le Is Less Than or Equal To

字符串比较运算符

- == Is Equal To
- != Is Not Equal To
- < Is Less Than
- <= Is Less Than Or Equal To
- > Is Greater Than if
- >= Is Greater Than Or Equal To

### 循环

for循环

```bash
# 格式
$ for variable in list; do ... ; done

# 实例
$ for i in 1 2 3; do echo $i; done
1
2
3

$ for i in 1 2 hello; do echo $i; done
1
2
hello

$ for i in {1..10}; do echo -n "$i "; done; echo
1 2 3 4 5 6 7 8 9 10 

$ for i in $( seq 1 2 10 ); do echo -n "$i "; done; echo
1 3 5 7 9 
```

while循环

```bash
# 格式
$ while condition; do ... ; done

# 实例
$ x=1; while [ $x -lt 4 ]; do echo $x; x=$(($x+1)); done
1
2
3

$ cat junk.txt 
1
2
3
$ while read x; do echo $x; done < junk.txt
1
2
3
```

### 执行脚本命令

在脚本中可以执行shell命令，有两种格式。

```bash
$ d=$( pwd )
$ d=`pwd`
```

实例。

```bash
$ len=$( cat file.txt | wc -l )
d=$( dirname $( readlink -m $0 ) )
```

### Process Substitution

Process Substitution（进程替换）也是用来在脚本中执行Shell命令，但是该Shell命令的输入和输出都是以文件形式出现。它的形式是`<( )`。

```bash
$ cat <( head -1 file.txt ) <( tail file.txt )
```

上面命令中cat的参数必须是文件，所以使用“进程替换”。

大括号也可以用来执行shell命令。

```bash
$ for i in 1 2 3; do { echo "***"$i; sleep 60 & } done
```

### 多行字符串

使用Here字符串，输出多行文本。

```bash
cat <<_EOF_

Usage:

$0 --inp [inputfile] --outputdir [dir]  --inst [number] --prefix [string] 

Required Arguments:

  --inp         the input file 

Options:

  --outputdir	the output directory (default: cwd)
  --inst	the number of instances requested (default: 1)
  --prefix	the prefix of output files (default: tmp)

Example:

$0 --inp tmp.txt --outputdir tmpdir --inst 10

_EOF_
```

## 实例

### 查看指定目录大小

```bash
#!/bin/bash
#Author Leo G

echo " Enter your directory: "
read x
du -sh "$x"
```

### 备份脚本

```bash
#!/bin/bash
#Author Leo G

rsync -avz  -e "ssh " /path/to/yourfile user@backupserver.com:/backup/

echo "backup for $(date) "| mail -s "backup complete" user@youremail.com
```
