# Vim的配置

使用下面的命令，在命令模式下，查看启动时加载的文件。

```http
:scriptnames
```

可以打印成日志文件查看。

```http
$ vim --startuptime start.log name-of-your-file
```

- `:hlsearch` 打开高亮搜索
- `:syntax on` 打开语法高亮
- `:set hlsearch` 查找结果高亮
- `:set tabstop=4` 设置一个 tab 字符缩进的行数
- `:set autoindent` 打开“auto indent”功能。这导致vim能对新的文本行缩进与刚输入的文本行相同的列数。

这些命令（没有开头的冒号字符）添加到`~/.vimrc`，这些改动就会Vim每次启动时，自动生效。
