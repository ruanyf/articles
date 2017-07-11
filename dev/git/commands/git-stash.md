# git stash

`git stash`命令用于暂时保存没有提交的工作。运行该命令后，所有没有commit的代码，都会暂时从工作区移除，回到上次commit时的状态。

它处于`git reset --hard`（完全放弃还修改了一半的代码）与`git commit`（提交代码）命令之间，很类似于“暂停”按钮。

```bash
# 暂时保存没有提交的工作
$ git stash
Saved working directory and index state WIP on workbranch: 56cd5d4 Revert "update old files"
HEAD is now at 56cd5d4 Revert "update old files"

# 列出所有暂时保存的工作
$ git stash list
stash@{0}: WIP on workbranch: 56cd5d4 Revert "update old files"
stash@{1}: WIP on project1: 1dd87ea commit "fix typos and grammar"

# 恢复某个暂时保存的工作
$ git stash apply stash@{1}

# 恢复最近一次stash的文件
$ git stash pop

# 丢弃最近一次stash的文件
$ git stash drop

# 删除所有的stash
$ git stash clear
```

上面命令会将所有已提交到暂存区，以及没有提交的修改，都进行内部保存，没有将工作区恢复到上一次commit的状态。

使用下面的命令，取回内部保存的变化，它会与当前工作区的代码合并。

```bash
$ git stash pop
```

这时，如果与当前工作区的代码有冲突，需要手动调整。

`git stash`命令可以运行多次，保存多个未提交的修改。这些修改以“先进后出”的stack结构保存。

`git stash list`命令查看内部保存的多次修改。

```bash
$ git stash list
stash@{0}: WIP on new-feature: 5cedccc Try something crazy
stash@{1}: WIP on new-feature: 9f44b34 Take a different direction
stash@{2}: WIP on new-feature: 5acd291 Begin new feature
```

上面命令假设曾经运行过`git stash`命令三次。

`git stash pop`命令总是取出最近一次的修改，但是可以用`git stash apply`指定取出某一次的修改。

```bash
$ git stash apply stash@{1}
```

上面命令不会自动删除取出的修改，需要手动删除。

```bash
$ git stash drop stash@{1}
```

git stash 子命令一览。

```bash
# 展示目前存在的stash
$ git stash show -p

# 切换回stash
$ git stash pop

# 清除stash
$ git stash clear
```

参考链接

- Ryan Hodson, [Quick Tip: Leveraging the Power of Git Stash](http://code.tutsplus.com/tutorials/quick-tip-leveraging-the-power-of-git-stash--cms-22988)
