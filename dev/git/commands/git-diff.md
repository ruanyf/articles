# git diff

`git diff`命令用于查看文件之间的差异。

```bash
# 查看工作区与暂存区的差异
$ git diff

# 查看某个文件的工作区与暂存区的差异
$ git diff file.txt

# 查看暂存区与当前 commit 的差异
$ git diff --cached

# 查看两个commit的差异
$ git diff <commitBefore> <commitAfter>

# 查看暂存区与仓库区的差异
$ git diff --cached

# 查看工作区与上一次commit之间的差异
# 即如果执行 git commit -a，将提交的文件
$ git diff HEAD

# 查看工作区与某个 commit 的差异
$ git diff <commit>

# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 查看工作区与当前分支上一次提交的差异，但是局限于test文件
$ git diff HEAD -- ./test

# 查看当前分支上一次提交与上上一次提交之间的差异
$ git diff HEAD -- ./test

# 生成patch
$ git format-patch master --stdout > mypatch.patch
```

比较两个分支

```bash
# 查看topic分支与master分支最新提交之间的差异
$ git diff topic master

# 与上一条命令相同
$ git diff topic..master

# 查看自从topic分支建立以后，master分支发生的变化
$ git diff topic...master
```

