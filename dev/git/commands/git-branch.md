# git branch

`git branch`是分支操作命令。

```bash
# 列出所有本地分支
$ git branch

# 列出所有本地分支和远程分支
$ git branch -a
```

（1）新建一个分支

直接在git branch后面跟上分支名，就表示新建该分支。

```bash
$ git branch develop
```

新建一个分支，指向当前commit。本质是在refs/heads/目录中生成一个文件，文件名为分支名，内容为当前commit的哈希值。

注意，创建后，还是停留在原来分支，需要用`git checkout`切换到新建分支。

使用`-b`参数，可以新建的同时，切换到新分支。

（2）删除分支

`-d`参数用来删除一个分支。

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

# 如果有重名分支，强制改名
$ git branch -m feature132 twitter-experiment
```

（4）查看merge情况

```bash

# Shows branches that are all merged in to your current branch
$ git branch --merged

# Shows branches that are not merged in to your current branch
$ git branch --no-merged

```

