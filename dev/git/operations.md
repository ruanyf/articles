# Git的操作

## 错误处理

### 未提交的错误

如果还没有进行commit，只是想恢复工作区，使用下面的命令可以恢复到上一次commit的状态。

```bash
$ git reset --hard HEAD
```

上面的命令，还会同时将暂存区恢复到上一次commit的状态。

如果只是想恢复某一个文件，可以采用下面的命令。

```bash
# 将工作区的hello.rb恢复到暂存区的状态
$ git checkout -- hello.rb

# 将工作区的hello.rb恢复到仓库区HEAD指针的状态
$ git checkout HEAD hello.rb
```

### 已提交的错误

如果想修改已经提交的错误，正确的方法是提交一个新的commit，改正错误。

```bash
$ git revert HEAD
```

上面的命令创造一个新的commit，这个commit会恢复HEAD所有已经修改的提交。

```bash
$ git revert HEAD^
```

上面的命令创造一个新的commit，这个commit会恢复HEAD的前面一次提交所做的修改。如果产生冲突，将会要求用户进行处理。

通常情况下，不应该修改历史。但是某些情况下，可能需要对上一次提交进行修改。

```bash
$ git commit support an --amend
```

这时，可以增加文件、修改提交说明，然后再进行提交。这一次提交会取代上一次提交。
