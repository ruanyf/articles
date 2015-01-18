# Git命令列表

## git branch

分支操作命令。

（1）新建一个分支

直接在git branch后面跟上分支名，就表示新建该分支。

```bash

$ git branch develop

```

新建一个分支，指向当前commit。本质是在refs/heads/目录中生成一个文件，文件名为分支名，内容为当前commit的哈希值。

创建后，需要用git checkout切换到新建分支。

（2）删除分支

-d参数用来删除一个分支。

```bash

$ git branch -d <分支名>

```

（3）分支改名

```bash
$ git checkout -b twitter-experiment feature132
$ git branch -d feature132
```

另一种写法

```bash

# 为当前分支改名
$ git branch -m twitter-experiment

# 为指定分支改名
$ git branch -m feature132 twitter-experiment

```

（4）查看merge情况

```bash

# Shows branches that are all merged in to your current branch
$ git branch --merged

# Shows branches that are not merged in to your current branch
$ git branch --no-merged

```

## git cat-file

显示一个Git对象文件的内容。

```bash

$ git cat-file -p aaa96

```

p参数表示以易于阅读的格式显示。

## git checkout

（1）用来切换分支。

```bash

$ git checkout

```

回到先前所在的分支。

```bash

$ git checkout develop

```

上面命令表示切换到develop分支。

（2）将工作区指定的文件回复到上次commit的状态。

```bash

$ git checkout --<文件名>

```

## git commit-tree

根据一个树对象，生成新的commit对象。

```bash

$ git commit-tree 16e19f -m “First commit”

```

## git diff

查看文件之间的差异

```bash

# 查看工作区文件与上一次commit的差异
$ git diff

# 查看工作区文件与指定commit的差异
$ git diff <commit的名称>

# 查看工作区文件与暂存区的差异
$ git diff --staged

```

比较两个分支

```bash

$ git diff master..john/master

```

## git hash-object

`git hash-object`命令计算一个文件的git对象ID，即SHA1的哈希值。

```bash

$ echo "hello" | git hash-object --stdin
$ echo "hola" | git hash-object -w --stdin

```

参数

- w 将对象写入对象数据库 
- stdin 表示从标准输入读取，而不是从本地文件读取。

## git log

查看远程分支的变动情况。

```bash

$ git log remote/branch

```

查找log。

```bash

$ git log --author=Andy
$ git log --grep="Something in the message"

```

查看某个范围内的commit

```bash

$ git log origin/master..new
# [old]..[new] - everything you haven't pushed yet

```

## git merge

将当前分支合并到指定分支。

```bash

$ git merge develop

```

将当前分支与develop分支合并，产生的新的commit对象有两个父节点。

如果“指定分支”本身是当前分支的一个直接子节点，则会产生fast-forward合并，即合并不会产生新的节点，只是让当前分支指向“指定分支”的最新commit。

Git合并所采用的方法是Three-way merge，及合并的时候除了要合併的兩個檔案，還加上它们共同的父节点。这样可以大大減少人為處理 conflict 的情況。如果采用two-way merge，則只用兩個檔案進行合併（svn默认就是这种合并方法。）

## git rebase

互动的rebase。

```bash

$ git rebase -i master~3

```

## git ref-parse

显示某个指示符的SHA1哈希值。

```bash

$ git ref-parse HEAD

```

## git remote

为远程仓库添加别名。

```bash

$ git remote add john git@github.com:johnsomeone/someproject.git


# 显示所有的远程主机
$ git remote -v 

# 列出某个主机的详细信息
$ git remote show name 

```

## git reset

将文件从暂存区移除。

```bash

$ git reset <文件名>
$ git reset HEAD lib/foo.rb

```

## git rm

删除文件。

## git show

查看commit的内容

```bash

$ git show 12a86bc38 # By revision
$ git show v1.0.1 # By tag
$ git show feature132 # By branch name
$ git show 12a86bc38^ # Parent of a commit
$ git show 12a86bc38~2 # Grandparent of a commit
$ git show feature132@{yesterday} # Time relative
$ git show feature132@{2.hours.ago} # Time relative

```

## git stash

运行该命令后，所有没有commit的代码，都会暂时从工作区移除，回到上次commit时的状态。

它处于`git reset --hard`（完全放弃还修改了一半的代码）与`git commit`（提交代码）命令之间，很类似于“暂停”按钮。

```bash

$ git stash

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

参考链接

- Ryan Hodson, [Quick Tip: Leveraging the Power of Git Stash](http://code.tutsplus.com/tutorials/quick-tip-leveraging-the-power-of-git-stash--cms-22988)

## git tag

为commit打标签。Tag 分兩種:annotated tag 才會產生 object。

```bash

$ git tag tmp # 生成.git/refs/tags/tmp
$ git tag -a release

``` 

上面代码表示为当前commit打上一个带注解的标签，标签名为release。

## git update-index

将工作区的文件加入缓存区域。

```bash

$ git update-index --add --cacheinfo \
100644 5c1b14949828006ed75a3e8858957f86a2f7e2eb hola.txt

```

直接将缓存信息插入缓存文件。

## git update-ref

更新一个指针文件中的Git对象ID。

```bash

$ git update-ref refs/heads/master 107aff

```

## git write-tree 

根据当前缓存区域，生成一个树对象。

```bash

$ git write-tree

```
