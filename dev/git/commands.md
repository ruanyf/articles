# Git命令列表

## git branch

分支操作命令。

（1）新建一个分支

直接在git branch后面跟上分支名，就表示新建该分支。

```bash

$ git branch develop

```

新建一个分支，指向当前commit。本质是在refs/heads/目录中生成一个文件，文件名为分支名，内容为当前commit的哈希值。

（2）删除分支

-d参数用来删除一个分支。

```bash

$ git branch -d <分支名>

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

## git hash-object

`git hash-object`命令计算一个文件的git对象ID，即SHA1的哈希值。

```bash

$ echo "hello" | git hash-object --stdin
$ echo "hola" | git hash-object -w --stdin

```

参数

- w 将对象写入对象数据库 
- stdin 表示从标准输入读取，而不是从本地文件读取。

## git merge

将当前分支合并到指定分支。

```bash

$ git merge develop

```

将当前分支与develop分支合并，产生的新的commit对象有两个父节点。

如果“指定分支”本身是当前分支的一个直接子节点，则会产生fast-forward合并，即合并不会产生新的节点，只是让当前分支指向“指定分支”的最新commit。

Git合并所采用的方法是Three-way merge，及合并的时候除了要合併的兩個檔案，還加上它们共同的父节点。这样可以大大減少人為處理 conflict 的情況。如果采用two-way merge，則只用兩個檔案進行合併（svn默认就是这种合并方法。）

## git ref-parse

显示某个指示符的SHA1哈希值。

```bash

$ git ref-parse HEAD

```

## git reset

将文件从暂存区移除。

```bash

$ git reset <文件名>

```

## git rm

删除文件。

## git stash

运行该命令后，所有没有commit的代码，都会暂时从工作区移除，回到上次commit时的状态。

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

````
