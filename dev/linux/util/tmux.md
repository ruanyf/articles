# Tmux

## 简介

Tmux 是对话（session）复用工具，可以替代 GNU Screen。

它可以在一个会话中，打开多个窗口。每个窗口可以占据整个屏幕，可以分成矩形窗格。用户可以方便地切换窗口，并且某个窗口从当前对话转移到其他对话。

Tmux 对话是持久的，这意味着即使断开连接，在 Tmux 中运行的程序也将继续运行。

Tmux 的所有命令都以前缀开头，默认情况下前缀是`ctrl+b`。

安装命令如下。

```bash
# Ubuntu 和 Debian
$ sudo apt install tmux

# CentOS 和 Fedora
$ sudo yum install tmux
```

## 用法

要开始第一个 Tmux 对话，只需键入`tmux`。

```bash
$ tmux
```

这将打开一个新的 Tmux 对话，创建一个新窗口，并在该窗口中启动一个 shell。

进入Tmux 对话后，您会在屏幕底部看到状态行，其中显示有关当前会话的信息。

`-s`参数可以用来为每个对话起名。

```bash
$ tmux new -s session_name
```

`tmux ls`命令列出当前正在运行的 Tmux 对话。

```bash
$ tmux ls
```

要将 Tmux 对话剥离当前的 Bash 对话，可以使用快捷键`Ctrl+b d`。

`tmux attach-session`可以让某个程序重新接回当前对话。

```bash
$ tmux attach-session -t session_name
```

## 多窗口和窗格

每个 Tmux 对话默认创建一个窗口，还可以使用`Ctrl+b c`命令，为这个对话创建多个窗口。窗口的命令默认为从0到9。

所有窗口的列表，会显示在屏幕底部的状态栏。

Tmux 窗口和窗格的快捷键如下。

- Ctrl+b c Create a new window (with shell)
- Ctrl+b w Choose window from a list
- Ctrl+b 0 Switch to window 0 (by number )
- Ctrl+b , Rename the current window
- Ctrl+b % Split current pane horizontally into two panes
- Ctrl+b " Split current pane vertically into two panes
- Ctrl+b o Go to the next pane
- Ctrl+b ; Toggle between current and previous pane
- Ctrl+b x Close the current pane

## 配置文件

Tmux 的配置文件是`~/.tmux.conf`。下面是一个示例。

```bash
# Improve colors
set -g default-terminal 'screen-256color'

# Set scrollback buffer to 10000
set -g history-limit 10000

# Customize the status line
set -g status-fg  green
set -g status-bg  black
```

