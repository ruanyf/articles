# shell 命令

有两种主要方法可以在 Vim 里调用外部程序：

- :!<command>——在从 Vim 内容跑某命令时很有用，尤其是在你想把运行结果输出到 Vim buffer 的情况下。
- :shell——以 Vim 子进程的方式弹开一个命令行。适合交互式命令。

可以用 :r! 把呼叫命令的回显直接贴到当前工作的文档里。例如，把当前目录的文档列表放进当前编辑文件就可以输入：

```bash
:r!ls
```

这种读取方式当然不光可以用在命令回显；你可以用 :r 轻松读进其他文件的内容，比如你的公钥或是你自定义的样版文件：

```bash
:r ~/.ssh/id_rsa.pub
:r ~/dev/perl/boilerplate/copyright.pl
```

值得注意的是，像排序和查找之类常见的操作，Vim 有其自带的方法 :sort 和 :grep。

Vim 有个 diffing 模式，即 vimdiff，它允许你查看不同版本文件间的区别，还提供三向合并用以解决版本冲突，你可以用 :diffput 和 :diffget 这样的命令来选择合适的代码段。你可以在命令行下直接运行 vimdiff，需要至少两个文件才能做对比：

```bash
$ vimdiff file-v1.c file-v2.c
```

你可以在 Vim 下直接调用版本控制的命令，这可能也是你大多数时候最需要的。% 永远是当前激活显示窗口的内容，记住这点非常有用：

```bash
:!svn status
:!svn add %
:!git commit -a
```
