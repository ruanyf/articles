# Bash 变量

## 环境变量

环境变量是Shell环境提供的变量。`env`命令或`printenv`命令，可以显示所有全局变量。

```bash
$ env
# 或者
$ printenv
```

下面是一些常用的环境变量。

- `DISPLAY`：显示器的名字，通常是 ":0"，表示第一个显示器
- `EDITOR`：文本编辑器的名字
- `HOME`：用户的主目录
- `LANG`：字符集以及语言编码，比如`zh_CN.UTF-8`
- `PATH`：由冒号分开的目录列表，当输入可执行程序名后，会搜索这个目录列表
- `PS1`：Shell提示符
- `PWD`：当前工作目录
- `SHELL`：Shell的名字
- `TERM`：终端类型名，即终端仿真器所用的协议
- `USER`：用户名

## 自定义变量

Shell遇到变量，会自动创建。

变量名的规则如下。

- 由字母数字字符（字母和数字）和下划线字符组成。
- 第一个字符必须是一个字母或一个下划线。
- 不允许出现空格和标点符号。

变量声明和赋值的形式如下。

```bash
variable=value
```

注意，等号两边不能有空格。

Bash没有数据类型的概念，所有的变量值都是字符串。

下面是一些例子。

```bash
a=z                     # Assign the string "z" to variable a.
b="a string"            # Embedded spaces must be within quotes.
c="a string and $b"     # Other expansions such as variables can be
                        # expanded into the assignment.
d="\t\ta string\n"      # Escape sequences such as tabs and newlines.
e=$(ls -l foo.txt)      # Results of a command.
f=$((5 * 7))            # Arithmetic expansion.
```

在参数展开过程中，变量名可能被花括号 “{}” 包围着。由于变量名周围的上下文，其变得不明确的情况下， 这会很有帮助。

```bash
$ mv $filename ${filename}1
```

## 本地变量

本地变量是只有当前脚本可以使用的变量，`set`命令可以显示所有本地变量。

```bash
$ set
```

`unset`命令用于删除变量。

```bash
x=2
echo $x
unset x
echo $x
```

上面代码只会输出一个2。

## printenv

`printenv`命令显示所有环境变量。

```bash
$ printenv
```

`printenv`也可以显示单个环境变量的值。

```bash
$ printenv USER
```

注意，这里的变量名之前，不需要使用`$`。

