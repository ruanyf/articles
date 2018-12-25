# netrw 插件

`netrw`是 Vim 内置插件，用来提供目录浏览器功能。

## 启用

它可以用以下三个命令打开。

- `:Explore`：netrw 在当前窗口中打开。
- `:Sexplore`：垂直分割当前窗口，netrw 在上半部分打开。可用鼠标调整窗口的分隔位置，`:Sex`是该命令的简写。
- `:Vexplore`：水平分割当前窗口，netrw 在左半部分打开。可用鼠标调整窗口的分隔位置，`:Vex`是该命令的简写。

`netrw_browse_split`属性用来设置`netrw`的默认显示宽度，可以写入`.vimrc`文件。

```bash
let g:netrw_winsize = 25
```

## 视图

netrw 打开以后，会显示当前目录的所有子目录和文件。

netrw 一共有四种视图：简单视图（1号）、详细视图（2号）、宽视图（3号）、树状视图（4号）。`i`键用来切换视图。默认视图可以在`.vimrc`文件里面指定。

```bash
let g:netrw_liststyle = 3
```

netrw 视图在顶部有一个说明性的横幅，可以用`I`键关闭（0）或再次打开（1），也可以在`.vimrc`文件里面指定。

```bash
let g:netrw_banner = 0
```

## 文件的打开方式

默认情况下，文件将在`netrw`所在的窗口打开，也就是取代目录内容。

要更改此行为，可以设置`netrw_browse_split`属性，可选的值如下。

- 1 - 在新的水平分割窗口打开文件
- 2 - 在新的垂直分割窗口打开文件
- 3 - 在新选项卡中打开文件
- 4 - 在当前的窗口中打开

要使这个设置永久化，可以将这个属性写入`.vimrc`文件。

```bash
let g:netrw_browse_split = 1
```

## 参考链接

- [Vim: you don't need NERDtree or (maybe) netrw](https://shapeshed.com/vim-netrw/)
