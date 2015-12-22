# bash的用法

Bash环境之中，用户配置文件位于主目录的`~/.bashrc`和`~/.profile`文件。这些配置文件会在用户登录时加载。

修改后，下面的命令可以让修改立刻生效。

```bash
$ source ~/bash_profile
```

`chsh`命令可以切换shell。

```bash
$ chsh zsh
```

每次打开一个新的Bash窗口，就会执行`.profile`文件，作为窗口的初始化文件。

对于登录Shell，Bash启动前，会先运行`/etc/profile exists`，然后是`/etc/profile.d`目录里面所有后缀为`.sh`的脚本。然后，依次是`~/.bash_profile`、`~/.bash_login`、`~/.profile`。

对于非登录Shell，会加载`~/.bashrc`，以及从`/etc/bash.bashrc`或`/etc/bashrc`输入全局变量。等你退出登录，会运行`~/.bash_logout`。

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

Bash脚本之中，可以自定义变量。变量使用等号赋值，等号前后都不能有空格。

```bash
$ a=3
```

对变量取值的时候，变量名前要加上美元符号。

```bash
$ echo $a
3
```

Bash变量名是大小写敏感的。变量名如果后面还紧跟着其他字符，可以将其放在大括号中。

```bash
INIT_DIR="${HOME}/.dotfiles/bash"
```

Bash变量是弱类型的，可以随时改为其他类型的值。如果变量的值是字符串，而且包含空格，那么需要用双引号包起来。另外，双引号中的变量会被扩展成对应的值，单引号没有变量扩展的功能。

变量只对创建它的进程可见，除非使用`export`命令，将变量输出到子进程。

如果在Bash变量之前放上变量赋值语句，则该变量会输入子进程。

```bash
$ echo "$VAR5 / $VAR6"
 /
$ VAR5=5 VAR6="some value" bash
$ echo "$VAR5 / $VAR6"
5 / some value
$ exit
$ echo "$VAR5 / $VAR6"
 /
```

`readonly`命令可以设置只读变量。

```bash
$ readonly rov2="another constant value"
$ rov2=3
bash: rov2: readonly variable
```

### 环境变量

- $PS1 提示符
- $SHELL 当前使用的Shell
- $$ 当前进程的ID
- $PPID 父进程的ID

```bash
$ echo $$
20708
# 新建一个子Shell
$ bash
$ echo $PPID
20708
# 退出子进程
$ exit
```

### 特殊变量

- $? 特殊变量，表示上一个命令的输出结果，如果是0，表示运行成功。
- $* 全部参数
- $0 脚本名
- $1 脚本的第一个参数
- $2 脚本的第二个参数，以此类推
- $# 参数数组的大小
- $$ 当前进程的ID

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

test是判断命令，也可以不把判断条件放在`[...]`之中。

```bash
if test $? -eq 0
then
fi

# 判断文件是否存在
if [ -e $file ]

# 判断文件大小是否为0
if [ -s $file ]
```

多个表达式的联合

- `[ ! EXPR ]` True if EXPR is false.
- `[ ( EXPR ) ]` Returns the value of EXPR. This may be used to override the normal precedence of operators.
- `[ EXPR1 -a EXPR2 ]` True if both EXPR1 and EXPR2 are true.
- `[ EXPR1 -o EXPR2 ]` True if either EXPR1 or EXPR2 is true.

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

常见的判断表达式。

- `[ -a FILE ]`	True if FILE exists.
- `[ -b FILE ]`	True if FILE exists and is a block-special file.
- `[ -c FILE ]`	True if FILE exists and is a character-special file.
- `[ -d FILE ]`	True if FILE exists and is a directory.
- `[ -e FILE ]`	True if FILE exists.
- `[ -f FILE ]`	True if FILE exists and is a regular file.
- `[ -g FILE ]`	True if FILE exists and its SGID bit is set.
- `[ -h FILE ]`	True if FILE exists and is a symbolic link.
- `[ -k FILE ]`	True if FILE exists and its sticky bit is set.
- `[ -p FILE ]`	True if FILE exists and is a named pipe (FIFO).
- `[ -r FILE ]`	True if FILE exists and is readable.
- `[ -s FILE ]`	True if FILE exists and has a size greater than zero.
- `[ -t FD ]`	True if file descriptor FD is open and refers to a terminal.
- `[ -u FILE ]`	True if FILE exists and its SUID (set user ID) bit is set.
- `[ -w FILE ]`	True if FILE exists and is writable.
- `[ -x FILE ]`	True if FILE exists and is executable.
- `[ -O FILE ]`	True if FILE exists and is owned by the effective user ID.
- `[ -G FILE ]`	True if FILE exists and is owned by the effective group ID.
- `[ -L FILE ]`	True if FILE exists and is a symbolic link.
- `[ -N FILE ]`	True if FILE exists and has been modified since it was last read.
- `[ -S FILE ]`	True if FILE exists and is a socket.
- `[ FILE1 -nt FILE2 ]`	True if FILE1 has been changed more recently than FILE2, or if FILE1 exists and FILE2 does not.
- `[ FILE1 -ot FILE2 ]`	True if FILE1 is older than FILE2, or is FILE2 exists and FILE1 does not.
- `[ FILE1 -ef FILE2 ]`	True if FILE1 and FILE2 refer to the same device and inode numbers.
- `[ -o OPTIONNAME ]`	True if shell option "OPTIONNAME" is enabled.
- `[ -z STRING ]`	True of the length if "STRING" is zero.
- `[ -n STRING ]` or `[ STRING ]`	True if the length of "STRING" is non-zero.
- `[ STRING1 == STRING2 ]`	True if the strings are equal. "=" may be used instead of "==" for strict POSIX compliance.
- `[ STRING1 != STRING2 ]`	True if the strings are not equal.
- `[ STRING1 < STRING2 ]`	True if "STRING1" sorts before "STRING2" lexicographically in the current locale.
- `[ STRING1 > STRING2 ]`	True if "STRING1" sorts after "STRING2" lexicographically in the current locale.
- `[ ARG1 OP ARG2 ]`	"OP" is one of -eq, -ne, -lt, -le, -gt or -ge. These arithmetic binary operators return true if "ARG1" is equal to, not equal to, less than, less than or equal to, greater than, or greater than or equal to "ARG2", respectively. "ARG1" and "ARG2" are integers.

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

### 文件处理

读取文件的命令格式。

```bash
while IFS= read -r line;
do
  COMMAND_on $line;
done < input.file
```

上面的`-r`参数表示防止反斜杠转义。

实例。

```bash
#!/bin/ksh
file="/home/vivek/data.txt"
while IFS= read -r line
do
  # display $line or do somthing with $line
  echo "$line"
done <"$file"
```

还可以读取每一行的栏位。

```bash
#!/bin/bash
file="/etc/passwd"
while IFS=: read -r f1 f2 f3 f4 f5 f6 f7
do
  # display fields using f1, f2,..,f7
  printf 'Username: %s, Shell: %s, Home Dir: %s\n' "$f1" "$f7" "$f6"
done <"$file"
```

### 函数

Bash提供一些特殊变量，用于读取函数变量。

- $# 参数个数
- $@ 所有参数，等同于`$0 $1 ...`
- $0 脚本名
- $1、$2、$3 函数各个参数

```bash
$ testfunc () { echo "$# parameters"; echo "$@"; }
$ testfunc
0 parameters

$ testfunc a b c
3 parameters
a b c
$ testfunc a "b c"
2 parameters
a b c
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
