# git log

```bash
# 列出当前分支的版本历史
$ git log

# 列出某个文件的版本历史，包括文件改名
$ git log --follow [file]
```

查看远程分支的变动情况。

```bash
$ git log remote/branch
```

查找log，即搜索commit信息。

```bash
$ git log --author=Andy
$ git log -i --grep="Something in the message"
```

上面代码中，`-i`参数表示搜索时忽略大小写。

查看某个范围内的commit

```bash
$ git log origin/master..new
# [old]..[new] - everything you haven't pushed yet
```

美化输出。

```bash
git log --graph --decorate --pretty=oneline --abbrev-commit
```

- --graph commit之间将展示连线
- --decorate 显示commit里面的分支
- --pretty=oneline 只显示commit信息的标题
- --abbrev-commit 只显示commit SHA1的前7位

