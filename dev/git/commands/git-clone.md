# git clone

`git clone`命令用于克隆远程分支。

```bash
$ git clone alpha delta --bare
```

上面命令表示将alpha目录（必须是git代码仓库），克隆到delta目录。bare参数表示delta目录只有仓库区，没有工作区和暂存区，即delta目录中就是.git目录的内容。
