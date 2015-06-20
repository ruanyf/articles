# Git的操作

## 错误处理

### 未提交的错误

编辑时，不小心编辑错了一个文件，可以将工作区的该文件恢复到上一个commit的状态。

```bash
$ git checkout -- <bad filename>

# 将工作区的hello.rb恢复到暂存区的状态
$ git checkout -- hello.rb

# 将工作区的hello.rb恢复到仓库区HEAD指针的状态
$ git checkout HEAD hello.rb
```

如果想将工作区的所有文件，恢复到上一次commit的状态，可以使用下面的命令。

```bash
$ git reset --hard HEAD
$ git reset <last good SHA>
$ git reset --hard <last good SHA>
```

`git reset`会把库历史回退到指定的SHA，好像后面的commit从来没有发生过，但是它们仍然保留在仓库区。默认情况下，`git reset`不改动工作区和暂存区，加上 --hard 可以连工作区和暂存区一起改变。

如果`git reset`以后，希望重新找回放弃的commit，可以使用下面的命令。

```bash
$ git reflog
$ git reset <SHA>

# 或者
$ git reflog
$ git checkout <SHA>
```

### 已提交的commit转移到另一个分支

你在master上提交了commit，突然发现这个commit应该提交到另一个分支，可以使用下面的命令。

```bash
# 新建feature分支，指向当前commit
# 但是仍然停留在master分支
$ git branch feature

# 重置master分支
$ git reset --hard origin/master

# 切换到feature分支
$ git checkout feature
```

### 抵消已提交的commit

如果提交后发现有错误，可以提交一个新的commit，抵消上一次的commit。

```bash
$ git revert HEAD
# 或者
$ git revert <SHA>
```

git revert 命令会生成一个新的commit，完全抵消上一个commit所做的变更。

```bash
$ git revert HEAD^
```

上面的命令创造一个新的commit，这个commit会恢复HEAD的前面一次提交所做的修改。如果产生冲突，将会要求用户进行处理。

### 修改提交信息

通常情况下，不应该修改历史。但是某些情况下，可能需要对上一次提交进行修改，比较修改提交信息。

```bash
$ git commit --amend
# 或者
$ git commit --amend -m "Fixes bug #42"
```

`git commit --amend`会提交一个新的commit，替换上一个commit，包含暂存区所有的变化。
