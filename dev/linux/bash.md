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

