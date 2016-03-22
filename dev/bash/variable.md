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

