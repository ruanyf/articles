# git reset

`git reset`命令用于将当前分支指向另一个位置。

```bash
# 将当期分支的指针倒退三个 commit，
# 并且会改变暂存区
$ git reset HEAD~3

# 倒退指针的同时，不改变暂存区
$ git reset --soft HEAD~3

# 倒退指针的同时，改变工作区
$ git reset --hard HEAD~3
```

如果不指定回滚的位置，那么等同于撤销修改。

```bash
# 撤销上一次向暂存区添加的所有文件
$ git reset

# 无任何效果
$ git reset --soft

# 同时撤销暂存区和工作区的修改，
# 回复到上一次提交的状态
$ git reset --hard

# 撤销上一次向暂存区添加的某个指定文件，
# 不影响工作区中的该文件
$ git reset -- <filename>
```

## 参数

- soft: 不改变工作区和缓存区，只移动 HEAD 到指定 commit。
- mixed: 只改变缓存区，不改变工作区。这是默认参数，通常用于撤销`git add`。
- hard：改变工作区和暂存区到指定 commit。该参数等同于重置，可能会引起数据损失。`git reset --hard`等同于`git reset --hard HEAD`。
- `-p`表示键入交互模式，指定暂存区的哪些部分需要撤销。

```bash
# Undo add
$ git reset

# Undo a commit，不重置工作区和缓存区
# 回到 HEAD 之前的那个 commit
$ git reset --soft HEAD^

# Undo a commit，重置工作区和缓存区
# 连续撤销三个 commit：HEAD, HEAD^, and HEAD~2
$ git reset --hard HEAD~3

# 从暂存区移除指定文件，但不改变工作区中的该文件
$ git reset -- frotz.c
```

