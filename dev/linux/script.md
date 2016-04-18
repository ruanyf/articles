# Bash脚本

## 变量

### 概述

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

如果使用没有定义的变量，该变量的值为空字符。

```bash
$ cat v1.sh
#!/bin/sh
echo "Variable value is: $VAR1"
VAR1="Hello"
echo "Variable value is: $VAR1"

$ ./v1.sh
Variable value is:
Variable value is: Hello
```

Bash变量是弱类型的，可以随时改为其他类型的值。如果变量的值是字符串，而且包含空格，那么需要用双引号包起来。另外，双引号中的变量会被扩展成对应的值，单引号没有变量扩展的功能。

```bash
echo "Your home: $HOME" # Your home: /Users/<username>
echo 'Your home: $HOME' # Your home: $HOME
```

变量只对创建它的进程可见，因此使用上面这种方式声明的变量，都是本地变量。除非使用`export`命令，将变量输出到子进程。执行脚本会新建一个子进程，因此脚本之中的变量不会泄漏到它的执行环境。

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

`unset`命令用于删除一个变量。

在函数之中，使用`local`关键字声明只在函数内部有效的变量。

```bash
local local_var="I'm a local value"
```

使用冒号可以设置变量的默认值。

```bash
# 如果变量为空，则赋予默认值
: ${VAR:='default'}
: ${$1:='first'}
```

`declare`命令可以声明特定的命令。

```bash
$ declare option variablename
```

`declare`命令的参数为

- -r read only variable
- -i integer variable
- -a array variable
- -f for funtions
- -x declares and export to subsequent commands via the environment.

```bash
declare -i intvar
intvar=123
intvar=12.3 # 报错

declare -r rovar=281
rovar=212 # 报错
```

`readonly`命令可以设置只读变量。

```bash
$ readonly rov2="another constant value"
$ rov2=3
bash: rov2: readonly variable
```

`let`命令声明一个变量的值等于表达式的值。

```bash
$ let x=6-4
$ echo $x
2

$ x=6-4
echo $x
6-4
```

`local`关键字用于声明区块可见的局部代码。

```bash
pprint()
{
  local lvar="Local content"
  echo -e "Local variable value with in the function"
  echo $lvar
}
pprint
```

如果不加`local`，函数中声明的变量就是局部变量。

### 变量扩展

变量名前面加上`$`符号，就会输出变量的值。这就叫做“变量扩展”（parameter expansion）。

使用`$(command)`或者`command`，会执行命令，并将该命令的输出，存入变量。

```bash
now=`data +%T`
# or
now=$(data +%T)

echo now # 19:08:26
```

`$(( expression ))`会计算算术表达式。

```bash
$ echo $((3+4))
7

$ result=$(( ((10 + 5*3) - 7) / 2 ))
echo $result # 9
```

变量扩展有多种形式，可以修改并输出变量的值。

```bash
# 如果varname没有设置或等于null，就将其设为value
${varname:=value}

# 只有当变量varname没有设置时，才将其设为value
# 如果变量varname等于空字符串，则不进行操作
${varname=value}

# 返回变量长度
${#string}

# 返回某个位置开始的子字符串
${string:position}

# 返回某个位置开始的、指定长度的子字符串
${string:position:length}

# 从字符串头部开始删除$substring的最短匹配
${string#substring}

# 从字符串尾部开始删除$substring的最短匹配
${string%substring}

# 从字符串头部开始删除最长匹配
${string##substring}

# 从字符串尾部开始删除最短匹配
${string%%substring}

# 字符串的查找和替换（仅替换第一个匹配）
${string/pattern/replacement}

# 替换所有匹配
${string//pattern/replacement}

# 替换字符串的头部匹配
${string/#pattern/replacement}

# 替换字符串的尾部匹配
${string/%pattern/replacement}

# 提取文件名的主体部分
echo ${filename#*.}

# 提取文件名的后缀名部分
echo ${filename%.*}
```

### 环境变量

环境变量是脚本运行时外部使用`export`命令带入的变量。

- $PS1 提示符
- $HOME 用户的主目录
- $PATH 分号分隔的一组目录，shell会在这组目录里面寻找命令
- $SHELL 当前使用的Shell
- $PWD 当前目录
- $UID 当前用户的数字ID
- $RANDOM 0到32767之间的一个数
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
- `$*`或`$@` 全部参数，不含$0
- $0 脚本名
- $1 脚本的第一个参数
- $2 脚本的第二个参数，以此类推，直到$9
- ${10}...${N} 从10到N的参数
- $# 参数数组的大小，不含$0
- $$ 当前进程的ID
- $! 最近执行的背景线程的ID
- $- 使用`set`命令的参数
- $_ 上一个命令的最后一个参数。如果是shell脚本，就会给出绝对路径的文件名。

`$-`的例子。

```bash
set -e
# 输出 e
echo $-
```

参数的例子。

```bash
# hellokitty.sh
#!/usr/bin/env bash

echo hello $1

# 运行
$ ./hellokitty.sh kitty
hello kitty
```

## if结构

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

`if`后面的判断条件，可以单层大括号（`[`），或`test`命令。双层大括号内部可以使用`&&`和`||`代替`-a`和`-o`，以及使用正则运算符`=~`。

花括号用来处理变量的值。

```bash
$ VARIABLE=abcdef
$ echo Variable: $VARIABLE
Variable: abcdef
$ echo Variable: $VARIABLE123456
Variable:
$ echo Variable: ${VARIABLE}123456
Variable: abcdef123456

# 截取变量
$ var="abcde"; echo ${var%d*}
abc

# 替换字符串
$ var="abcde"; echo ${var/de/12}
abc12

# 替换第一个foo
${var/foo/bar};
# 替换所有的foo
${var//foo/bar};

# 使用默认值
$ default="hello"; unset var; echo ${var:-$default}
hello

$ echo f{oo,ee,a}d
food feed fad

$ mv error.log{,.OLD}
(error.log is renamed to error.log.OLD because the brace expression
expands to "mv error.log error.log.OLD")

$ for num in {000..2}; do echo "$num"; done
000
001
002

$ echo {00..8..2}
00 02 04 06 08

$ echo {D..T..4}
D H L P T
```

双层圆括号用于算术运算。

```bash
(( var = 78 ))
var=$(( 20 + 5 ))
(( var++ ))
(( var-- ))
(( var0 = var1<98?9:21 ))
((a++))

((meaning = 42))

for ((i=0; i<10; i++))

echo $((a + b + (14 * c)))
```

在双层圆括号之中，可以不用变量名之前加上美元符号，也可以使用空格。

单个方括号用于数组索引。

```bash
array[4]="hello"

element=${array[index]}
```

圆括号用于新建一个子shell或者创造数组。

```bash
$ pwd
/home/user
$ (cd /tmp; pwd)
/tmp
$ pwd
/home/user

array=(1 2 3)
echo ${array[1]}
2
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

- `[ ! EXPR ]` 如果EXPR为false，则返回true
- `[ (EXPR) ]` 返回EXPR的值.
- `[ EXPR1 -a EXPR2 ]` 表达式1和表达式2同时为`true`，则返回`true`
- `[ EXPR1 -o EXPR2 ]` 只要EXPR1或EXPR2有一个为true，则返回true。
- `?(<PATTERN-LIST>)`	Matches zero or one occurrence of the given patterns
- `*(<PATTERN-LIST>)`	Matches zero or more occurrences of the given patterns
- `+(<PATTERN-LIST>)`	Matches one or more occurrences of the given patterns
- `@(<PATTERN-LIST>)`	Matches one of the given patterns
- `!(<PATTERN-LIST>)`	Matches anything except one of the given patterns

```bash
$ rm -f !(survivior.txt)
```

运算符

- -eq 等于
- -ne 不等于
- -gt 大于
- -ge 大于或等于
- -lt 小于
- -le 小于或等于

```bash
# 单行判断
if [[ 1 -eq 1 ]]; then echo "true"; fi;

# 多行判断
if [[ 1 -eq 1 ]]; then
  echo "true";
fi;
```

`if...else`结构。

```bash
# 单行
if [[ 2 -ne 1 ]]; then echo "true"; else echo "false"; fi;

# 多行
if [[ 2 -ne 1 ]]; then
  echo "true";
else
  echo "false";
fi;
```

`if..elif..else`结构。

```bash
if [[ `uname` == "Adam" ]]; then
  echo "Do not eat an apple!";
elif [[ `uname` == "Eva" ]]; then
  echo "Do not take an apple!";
else
  echo "Apples are delicious!";
fi;
```

`case`结构

```javascript
case "$extension" in
  "jpg"|"jpeg")
    echo "It's image with jpeg extension."
  ;;
  "png")
    echo "It's image with png extension."
  ;;
  "gif")
    echo "Oh, it's a giphy!"
  ;;
  *)
    echo "Woops! It's not image!"
  ;;
esac;
```

上面代码中，`|`符号用来分隔多个模式，`)`符号用来终结一个模式队列，`*`表示除了上面模式以外的所有其他模式。每个`case`代码块应该以`;;`符号表示结束。

字符串比较运算符

- == Is Equal To
- != Is Not Equal To
- < Is Less Than
- <= Is Less Than Or Equal To
- > Is Greater Than if
- >= Is Greater Than Or Equal To

常见的判断表达式。

- `[ -a FILE ]`	如果路径存在，返回`true`
- `[ -b FILE ]`	True if FILE exists and is a block-special file.
- `[ -c FILE ]`	True if FILE exists and is a character-special file.
- `[ -d FILE ]`	如果路径存在，而且是一个目录，返回`true`
- `[ -e FILE ]`	如果路径存在，而且是一个目录或常规文件，返回`true`，否则返回`false`
- `[ -f FILE ]`	如果路径存在，而且是一个常规文件，返回`true`，否则返回`false`
- `[ -g FILE ]`	True if FILE exists and its SGID bit is set.
- `[ -h FILE ]`	True if FILE exists and is a symbolic link.
- `[ -k FILE ]`	True if FILE exists and its sticky bit is set.
- `[ -L FILE ]` 如果文件存在且是符号链接，则返回true
- `[ -p FILE ]`	True if FILE exists and is a named pipe (FIFO).
- `[ -r FILE ]` 如果文件存在且可读，则返回true
- `[ -s FILE ]` 如果文件存在，而且非空（size大于0），则返回true
- `[ -t FD ]`	True if file descriptor FD is open and refers to a terminal.
- `[ -u FILE ]`	True if FILE exists and its SUID (set user ID) bit is set.
- `[ -w FILE ]` 如果文件存在且可写，则返回true
- `[ -x FILE ]` 如果文件存在且可执行，则返回true
- `[ -O FILE ]`	True if FILE exists and is owned by the effective user ID.
- `[ -G FILE ]`	True if FILE exists and is owned by the effective group ID.
- `[ -L FILE ]`	True if FILE exists and is a symbolic link.
- `[ -N FILE ]`	True if FILE exists and has been modified since it was last read.
- `[ -S FILE ]`	True if FILE exists and is a socket.
- `[ FILE1 -nt FILE2 ]` 如果FILE1比FILE2更新（最近改动过），或者FILE1存在而FILE2不存在，则返回true
- `[ FILE1 -ot FILE2 ]` 如果FILE1比FILE2更老，或FILE2存在而FILE1不存在，则返回true。
- `[ FILE1 -ef FILE2 ]`	True if FILE1 and FILE2 refer to the same device and inode numbers.
- `[ -o OPTIONNAME ]`	True if shell option "OPTIONNAME" is enabled.
- `[ -z STRING ]`	如果参数字符串的长度为0，则返回`true`，否则返回`false`
- `[ -n STRING ]` or `[ STRING ]` 如果"STRING"的长度是非零，则返回true
- `[ STRING1 == STRING2 ]`	True if the strings are equal. "=" may be used instead of "==" for strict POSIX compliance.
- `[ STRING1 != STRING2 ]`	True if the strings are not equal.
- `[ STRING1 < STRING2 ]`	True if "STRING1" sorts before "STRING2" lexicographically in the current locale.
- `[ STRING1 > STRING2 ]`	True if "STRING1" sorts after "STRING2" lexicographically in the current locale.
- `[ ARG1 OP ARG2 ]`	"OP" is one of -eq, -ne, -lt, -le, -gt or -ge. These arithmetic binary operators return true if "ARG1" is equal to, not equal to, less than, less than or equal to, greater than, or greater than or equal to "ARG2", respectively. "ARG1" and "ARG2" are integers.

## 循环

for循环

```bash
# 单行
for variable in list; do ... ; done

# 多行
for arg in elem1 elem2 ... elemN
do
  # statements
done
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

for FILE in $HOME/*.bash; do
  mv $FILE ${HOME}/scripts
  chmod +x ${HOME}/scripts/${FILE}
done

# C语法的循环
for (( i = 0; i < 10; i++ )); do
  echo $i
done
```

while循环则是只要满足某个条件，就一直循环下去。

```bash
# 单行
while condition; do ... ; done

# 多行
while [[ condition ]]
do
  # statements
done

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

x=0
while [[ $x -lt 10 ]]; do # value of x is less than 10
  echo $(($x*$x))
  x=`expr $x + 1` # increase x
done
```

`until`循环则是只要条件为`false`，就不断执行。

```bash
until [[ conditions ]]; do
  #statements
done
```

循环过程中，可以使用`break`命令跳出循环，也可以使用`continue`命令直接跳到下一轮循环。

```bash
for (( i = 0; i < 10; i++ )); do
  if [[ $(($i % 2)) == 0 ]]; then continue; fi;
  echo $i
done
```

## select命令

select命令用于在屏幕上显示一组选项，供用户选择。它跟`for`循环的语法很相似。

```bash
select answer in elem1 elem2 ... elemN
do
  # statements
done
```

`select`会将所有选项，显示在屏幕上，并且在每一项前面加上序号，提示用户选择一个。用户的选择会储存在变量`answer`里面。

```bash
#!/bin/bash

PS3="Choose the package manager: "
select ITEM in bower npm gem pip
do
  echo -n "Enter the package name: " && read PACKAGE
  case $ITEM in
    bower) bower install $PACKAGE ;;
    npm)   npm   install $PACKAGE ;;
    gem)   gem   install $PACKAGE ;;
    pip)   pip   install $PACKAGE ;;
  esac;
  break # avoid infinite loop
done
```

运行上面代码，结果如下。

```bash
$ ./my_script
1) bower
2) npm
3) gem
4) pip
Choose the package manager: 2
Enter the package name: bash-handbook
<installing of bash-handbook>
```

## 正则运算符

`=~`是Bash的正则运算符，左侧运算数为等待验证的值，右侧为一个正则表达式。

```bash
if [[ $digit =~ [0-9] ]]; then
    echo "$digit is a digit"
else
    echo "oops"
fi
```

下面是另一个例子。

```bash
echo -n "Your answer> "
read REPLY
if [[ $REPLY =~ ^[0-9]+$ ]]; then
    echo Numeric
else
    echo Non-numeric
fi
```

```bash
files="*.jpg"
regex="[0-9]+_([a-z]+)_[0-9a-z]*"
for f in $files
do
    [[ $f =~ $regex ]]
    name="${BASH_REMATCH[1]}"
    echo "${name}.jpg"    # concatenate strings
    name="${name}.jpg"    # same thing stored in a variable
done
```

特殊字符

- `*`	Matches any string, including the null string (empty string)
- `?`	Matches any single character
- `X`	Matches the character X which can be any character that has no special meaning
- `\X`	Matches the character X, where the character's special meaning is stripped by the backslash
- `\\`	Matches a backslash

正则表达式的方括号。

- `[XYZ]`	The "normal" bracket expression, matching either X, Y or Z
- `[X-Z]`	A range expression: Matching all the characters from X to Y (your current locale, defines how the characters are sorted!)
- `[[:class:]]`	Matches all the characters defined by a POSIX® character class: alnum, alpha, ascii, blank, cntrl, digit, graph, lower, print, punct, space, upper, word and xdigit
- `[^…]`	A negating expression: It matches all the characters that are not in the bracket expression
- `[!…]`	Equivalent to `[^…]`
- `[]...]` or `[-…]` Used to include the characters ] and - into the set, they need to be the first characters after the opening bracket

## 执行脚本命令

在脚本中可以执行shell命令，有两种格式。

```bash
$ d=$(pwd)
$ d=`pwd`
```

实例。

```bash
$ len=$( cat file.txt | wc -l )
d=$( dirname $( readlink -m $0 ) )
```

## Process Substitution

Process Substitution（进程替换）也是用来在脚本中执行Shell命令，但是该Shell命令的输入和输出都是以文件形式出现。它的形式是`<( )`。

```bash
$ cat <( head -1 file.txt ) <( tail file.txt )
```

上面命令中cat的参数必须是文件，所以使用“进程替换”。

大括号也可以用来执行shell命令。

```bash
$ for i in 1 2 3; do { echo "***"$i; sleep 60 & } done
```

## 多行字符串

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

## 文件处理

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

## 函数

函数表示一组命令，可以反复调用。它的定义方式如下。

```bash
# 方式一
my_func () {
  # statements
}

# 方式二
function my_func () {
  # statements
}
```

命令行调用函数方式如下。

```bash
$ functionname arg1 arg2
```

函数使用`return`命令退出，`return`命令的参数就是函数的退出码。如果`return`命令没有参数，那么函数的退出状态就是函数体内最后一个命令的退出状态。

Bash提供一些特殊变量，用于读取函数变量。

- $# 参数个数
- $@ 所有参数，等同于`$0 $1 ...`
- $0 脚本名
- $1、$2、$3 函数各个参数

下面是一个例子。

```bash
# function with params
greeting () {
  if [[ -n $1 ]]; then
    echo "Hello, $1!"
  else
    echo "Hello, unknown!"
  fi
  return 0
}

greeting Denys  # Hello, Denys!
greeting        # Hello, unknown!
```

下面是另一个例子。

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

根据函数用户相似的，就是为命令起别名。

```bash
$ alias name='unix command with options'
```

函数内部可以使用变量`$FUNCNAME`，返回当前执行的函数名。

## 数组

Bash可以使用数组表示一组值，每个值之间用空格分隔。数组从0开始计算位置。

```bash
fruits[0]=Apple
fruits[1]=Pear
fruits[2]=Plum
echo ${fruits[*]}
# Apple Pear Plum
```

数组也可以用下面的方法声明。

```bash
fruits=(Apple Pear Plum)
```

其他操作。

```bash
# 取出数组的一部分
echo ${fruits[*]:0:2} # Apple Pear

# 添加新成员
fruits=(Orange ${fruits[*]} Banana Cherry)
echo ${fruits[*]} # Orange Apple Pear Plum Banana Charry

# 清空数组
unset fruits[0]
echo ${fruits[*]} #
```

## 除错

脚本可以打开除错选项，用来除错。

```bash
#!/bin/bash options
```

可用的选项如下。

- -f noglob，禁止文件名扩展（globbing）
- -i interactive，脚本以互动模式运行
- -n noexec，读取命令但不执行，用来语法检查
- -t 执行第一条命令后退出
- -v verbose，每条命令执行前，输出到终端
- -x xtrace，每条命令执行前，输出到标准输出，并且扩展命令

下面是使用`-x`参数的脚本。

```bash
#!/bin/bash -x

for (( i = 0; i < 3; i++ )); do
  echo $i
done
```

运行结果如下。

```bash
$ ./my_script
+ (( i = 0 ))
+ (( i < 3 ))
+ echo 0
0
+ (( i++  ))
+ (( i < 3 ))
+ echo 1
1
+ (( i++  ))
+ (( i < 3 ))
+ echo 2
2
+ (( i++  ))
+ (( i < 3 ))
```

如果只想对脚本的一部分除错，可以使用`set`命令，配合`+`和`-`来打开和关闭。

```bash
#!/bin/bash

echo "xtrace is turned off"
set -x
echo "xtrace is enabled"
set +x
echo "xtrace is turned off again"
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

## 参考链接

- Denys Dovhan, [bash-handbook](https://github.com/denysdovhan/bash-handbook)
