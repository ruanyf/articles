# Git

git是一种源码管理系统（source code management，缩写为SCM）。它对当前文件提供版本管理功能，核心思想是对当前文件建立一个对象数据库（object database），将历史版本信息存放在这个数据库中。

## git操作流程

- 安装git
- 提交用户名和电子邮件

```bash
$ git config --global user.name "Some One"
$ git config --global user.email "someone@gmail.com"
```

1. git init：新建一个git库
2. git status：查看目前状态
3. git add <文件名>：添加文件从工作区到暂存区
4. git commit -m "提示信息"：从暂存区提交到代码仓库
5. git log：查看提交commit的信息
6. git remote add origin https://github.com/try-git/try_git.git : 添加远程指针
7. git push -u origin master：将本地的master分支推送到远程origin主机，-u参数表示记住对应关系，下次可以直接git push推送。
8. git pull origin master：将远程主机origin的代码取回本地，与本地的master分支合并
9. git diff HEAD：查看与上一次commit的区别

### 发布一个版本

为当前分支打上版本号。

```
$ git tag -a [VERSION] -m "released [VERSION]"
$ git push origin [VERSION]
```

## git对象

对象数据库包含四类对象。

- Blob：包含二进制数据，它们是文件内容。只要文件内容改变，就会在对象数据库中生成一个blob对象。注意，blob对象只保存文件内容，不含文件名和文件存储位置等信息。如果文件名改变，或者文件储存位置改变，不会生成新的blob对象。
- Tree：blob对象的集合，以及它们的文件名和权限。一个tree对象描述一个时点上的一个目录。
- Commit：描述一个时点上的项目状态，包含一条log信息，一个tree对象和指向父节点（parent commits）的指针。第一个commit对象没有父节点。
  - 紀錄 root tree SHA1
  - 紀錄 parent commit SHA1
  - 紀錄作者、時間和 commit message 資訊
- tag

对象数据库依赖SHA哈希函数。当一个对象加入数据库，它会被SHA函数处理，得到的结果就是该对象在数据库中的名字（前两个字节被当作目录名，用来提高效率）。

git命令基本上是图数据库操作命令，用来删除/操作节点、移动指针等等。

```bash

$ git init
$ echo hello > hello.txt
$ git add .
$ tree .git
# 存在 .git/objects/ce/013625030ba8dba906f756967f9e9ca394464a
# 這是 hello 內容的 SHA1
$ printf "blob 6\x00hello\n" | shasum
$ echo "hello" | git hash-object --stdin
$ git cat-file -p ce0136

```

上面代码有几点需要注意。

- `git add`命令就会生成二进制对象。
- shasum命令返回字符串的SHA哈希函数结果。
- `git hash-object`命令计算一个文件的git对象ID，stdin参数表示从标准输入读取，而不是从本地文件读取。
- `git cat-file`命令显示git对象文件的内容和大小信息，p参数表示以易于阅读的格式显示。

树对象保存当前目录的快照。

```
040000 tree 0eed1217a2947f4930583229987d90fe5e8e0b74 data
100664 blob 5e40c0877058c504203932e5136051cf3cd3519b letter.txt
100664 blob 274c0052dd5408f8ae2bc8440029ff67d79bc5c3 number.txt
```

commit（快照）对象也保存在`.git/objects`目录。

```
tree ffe298c3ce8bb07326f888907996eaa48d266db4
author Mary Rose Cook <mary@maryrosecook.com> 1424798436 -0500
committer Mary Rose Cook <mary@maryrosecook.com> 1424798436 -0500

a1
```

### 配置

指定全局的.gitignore文件。

```bash
$ git config --global core.excludesfile=/Users/flores/.gitignore
```

## 目录结构

- .git/refs/heads：保存各个分支的指针
- .git/HEAD 文件，保存HEAD指针

```
ref: refs/heads/master
```

上面代码说明HEAD指向`.git/refs/heads/master`文件，该文件是一个Hash值。

```
a87cc0f39d12e51be8d68eab5cef1d31e8807a1c
```

- .git/refs/tags：保存tag指针

### 缓冲区域（index）

Index区域（.git/index）是一个二进制文件，用来保存当前目录在某个时点的状态。

`git init`命令用来创建index区域，以及对象数据库（.dircache/objects）。

100644 為檔案模式,表示這是一個普通檔案；100755 表示可執行檔,120000 表示 symbolic link。

`.git/index`文件，保存暂存区的文件名和对应的Hash值，每行对应一个文件。下面是一个例子。

```
data/letter.txt 5e40c0877058c504203932e5136051cf3cd3519b
data/number.txt 274c0052dd5408f8ae2bc8440029ff67d79bc5c3
```

## Git commit的全过程

1. 用內容產生 blob object
2. 寫入 file mode, blob SHA1, file name 到 staging area
3. 根據 staging area 產生 Tree object
4. 用 root tree SHA1 和 parent commit SHA1 產生
commit object
5. 用 commit SHA1 更新 master 參考

如何不用 `git add` 和 `git commit`指令完成 commit 動作?

```bash

# git add的部分

$ echo "hola" | git hash-object -w --stdin
$ git update-index --add --cacheinfo \
100644 5c1b14949828006ed75a3e8858957f86a2f7e2eb hola.txt

# git commit的部分

$ git write-tree
$ git commit-tree 27b9d5 -m "Second commit" -p 30b060
$ git update-ref refs/heads/master 97b806c9e5561a08e0df1f1a60857baad3a1f02e

```

## 父节点

合并产生的新节点，会有两个父节点。第一个是当前所在分支的父节点，第二个合并进来的那个分支的父节点。

## Tag对象

Tag 分兩種:annotated tag 才會產生 object。

```bash

$ git tag -a release
$ git rev-parse release
$ git cat-file -p 2450f3

```

tag对象的内容。

```

object 309be0
type commit
tag release
tagger ihower 1375383070 +0800
Release!

```

## Reference（指针）

所谓指针（reference），只是一个链接，用来指向其他物体，方便引用。Git有三种指针，但是所有指针归根结底都是指向某个commit。

- Tag指针：指向某个commit，或者指向某个tag对象。保存位置在.git/refs/tags/目录，文件名为tag名，内容为某个commit或ref object的SHA1哈希。
- Branch指针：指向某个commit。每次该分支有新的commit，指针就会变动。
- HEAD指针：指向目前所在的Branch，用来区分目前在哪个分支。比如，内容为ref: refs/heads/
master。

## 团队开发模式

集中式工作流程：團隊內部私有專案，大家都有權限 Push 到共用的 Repository

管理員工作流程：適合一般 Open Source 專案,只有少部分人有權限可以 Push到 Repository,其他開發者用用 request pull 請求合併。例如 GitHub 提供的 Fork 和 Pull Request 功能。

## 分支管理策略

### github flow

- master 是 stable/production 可佈署的版本
- 任何開發從 master branch 分支出 feature branch
- 送 pull request 開始進行行討論、code review和測試
- 最後合併回 master 代表可以佈署了

pros and cons

- 簡單、清楚、容易了解
- 搭配 Github 的 Pull Request 介面
- 沒有 release branch,東⻄一進 master 就上 production

### Ruby on Rails

- master 是開發版本
- feature branches 審核完後,合併進 master
- maintenance branches,用 cherry-pick 做 backporting
- 基本上就是 Github flow 加上 maintenance branches 維護舊版的設計
- 版本號(Tag)打在 master 上,透過 preview 和 beta 的版本號提前釋出

### CMake

- master 預備釋出的版本,feature branches 從這裡分支出去
- feature branch 完成後,合併進 next
-  next 整合版本,完成的 feature branch 先合併到這裡進行測試
  - 在 next 測好的 feature branch,才合併進 master
  - 可以將 master 合併進 next,減少之後的 code conflicts
  - 不會將 next 合併進 master
-  nightly 每天 1:00 UTC 自動從 next branch 分支支出來跑自動測試

## Git远程操作

Git的repo一般是用来指本地库，远程库（remote）主要用来存档、合作、分享和触发持续集成。 

## 参考链接

- corbet, [The guts of git](https://lwn.net/Articles/131657/): 最早的一篇介绍Git的文章，可以了解Git的总体设计思路
- 张文钿, [git从微观到宏观](http://ihower.tw/blog/archives/7938)
