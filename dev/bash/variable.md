# Bash 变量

## 全局变量

全局变量又称为环境变量，是所有Shell环境都提供的变量。`env`命令或`printenv`命令，可以显示所有全局变量。

```bash
$ env
# 或者
$ printenv
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

## 系统变量

`printenv`命令显示所有系统变量。

```bash
$ printenv
```

一些常用的系统变量。

- `$USER`：用户名
-
