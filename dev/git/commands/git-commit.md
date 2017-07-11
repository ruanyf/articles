# git commit

`git commit`命令用于将暂存区中的变化提交到仓库区。

`-m`参数用于指定 commit 信息，是必需的。如果省略`-m`参数，`git commit`会自动打开文本编辑器，要求输入。

```bash
$ git commit -m "message"
```

`git commit`命令可以跳过暂存区，直接将文件从工作区提交到仓库区。

```bash
$ git commit <filename>  -m "message"
```

上面命令会将工作区中指定文件的变化，先添加到暂存区，然后再将暂存区提交到仓库区。

`-a`参数用于先将所有工作区的变动文件，提交到暂存区，再运行`git commit`。用了`-a`参数，就不用执行`git add .`命令了。

```bash
$ git commit -am
```

`--amend`参数用于撤销上一次 commit，然后生成一个新的 commit。

```bash
$ git commit --amend - m "new commit message"
```

`--allow-empty`参数用于没有提交信息的 commit。

```bash
$ git commit --allow-empty
```

