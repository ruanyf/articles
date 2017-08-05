# 撤销

命令模块下，`u`（代表 undo）会撤销上一个操作。

默认情况下，撤销只在当前对话（session）有效。如果关闭文件再打开，就无法撤销上一个对话的操作。如果想跨对话撤销，需要在`.vimrc`里面打开下面的设置。

```
" 跨 session 撤销
set undofile
```

打开跨对话撤销以后，Vim 会对每个文件生成一个历史文件，保存在被编辑文件的相同目录下。下面的设置可以让所有历史文件，保存在一个地方。

首先，在 Vim 的配置目录里面，新建一个目录。

```bash
$ mkdir ~/.vim/undodir
```

然后在`.vimrc`里面，指定这个目录作为历史文件的保存位置。

```
" 历史文件的保存位置
set undodir=~/.vim/undodir
```

## 参考链接

- [Persistent Undo in Vim](https://jovicailic.org/2017/04/vim-persistent-undo/), by Jovica Ilic
