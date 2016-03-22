# 启动

用户每次使用Shell，都要开启一个Session（对话）。

Session有两种类型：登录Shell和非登录Shell。它们的区别有两点，一是“登录Shell”会提示用户输入用户名和密码，二是它们的初始化脚本不同。

登录Shell的初始化脚本如下。

- `/etc/profile`：所有用户的全局配置脚本。
- `~/.bash_profile`：用户的个人配置脚本。
- `~/.bash_login`：如果`~/.bash_profile`没找到，则尝试读取这个脚本。
- `~/.profile`：如果`~/.bash_profile`和`~/.bash_login`都没找到，则尝试读取这个脚本。

非登录Shell的初始化脚本如下。

- `/etc/bash.bashrc`
- `~/.bashrc`

对用户来说，`~/.bashrc`通常是最重要的脚本。非登录Shell默认会执行它，而登录Shell也会通过调用执行它。

下面是一个典型的`.bash_profile`文件。

```bash
# .bash_profile
# Get the aliases and functions
if [ -f ~/.bashrc ]; then
. ~/.bashrc
fi
# User specific environment and startup programs
PATH=$PATH:$HOME/bin
export PATH
```

上面代码中，只要`.bashrc`存在，就会执行它。

## source

`source`命令用于执行一个脚本，通常用于重新加载一个配置文件。

```bash
$ source .bashrc
```

`source`有一个简写形式，可以使用一个点（`.`）来表示。

```bash
$ . .bashrc
```
