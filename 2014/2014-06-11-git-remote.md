# Git远程操作详解

[Git](http://zh.wikipedia.org/wiki/Git)是目前最流行的[版本管理系统](http://www.ruanyifeng.com/blog/2008/12/a_visual_guide_to_version_control.html)，学会Git几乎成了开发者的必备技能。

Git有很多优势，其中之一就是远程操作非常简便。本文详细介绍5个Git命令，它们的概念和用法，理解了这些内容，你就会发现Git远程操作其实非常容易。

* git clone
* git remote
* git fetch
* git pull
* git push

本文针对Git的初级用户，从最简单的讲起，但是需要读者对Git的基本用法有所了解。同时，本文涵盖上面5个命令的主要用法，所以对于熟练用户也有参考价值。

## 一、git clone

远程操作的第一步，通常是从远程主机克隆一个代码库，这时就要用到git clone命令。

```
$ git clone <代码库的网址>
```

比如，克隆jQuery的代码库。

```
$ git clone https://github.com/jquery/jquery.git
```

该命令会在本地主机生成一个目录，与远程主机的代码库同名。如果要指定不同的目录名，可以将目录名作为git clone命令的第二个参数。

```
$ git clone <代码库的网址> <本地目录名>
```

git clone支持多种协议，除了HTTP(s)以外，还支持SSH、Git、本地文件协议等，下面是一些例子。

```
$ git clone http[s]://example.com/path/to/repo.git/
$ git clone ssh://example.com/path/to/repo.git/
$ git clone git://example.com/path/to/repo.git/
$ git clone /opt/git/project.git 
$ git clone file:///opt/git/project.git
$ git clone ftp[s]://example.com/path/to/repo.git/
$ git clone rsync://example.com/path/to/repo.git/
```

SSH协议还有另一种写法。

```
$ git clone [user@]example.com:path/to/repo.git/
```

通常来说，Git协议下载速度最快，SSH协议用于需要用户认证的场合。各种协议优劣的详细讨论请参考[官方文档](http://git-scm.com/book/en/Git-on-the-Server-The-Protocols)。

## 二、git remote

为了便于管理，Git要求每个远程主机都必须指定一个主机名。git remote命令就用于管理主机名。

不带参数的时候，git remote命令列出所有远程主机。

```
$ git remote
origin
```

使用-v参数，可以参看远程主机的网址。

```
$ git remote -v
origin	git@github.com:jquery/jquery.git (fetch)
origin	git@github.com:jquery/jquery.git (push)
```

上面代码表示，当前只有一台远程主机，叫做origin，以及它的网址。

Git规定，克隆代码库的时候，所使用的远程主机自动被命名为origin。如果想用其他的主机名，需要用git clone命令的-o参数指定。

```
$ git clone -o jQuery https://github.com/jquery/jquery.git
$ git remote
jQuery
```

上面代码表示，克隆的时候，指定远程主机叫做jQuery。

git remote show命令加上主机名，可以查看该主机的详细信息。

```
$ git remote show <主机名>
```

git remote add命令用于添加远程主机。

```
$ git remote add <主机名> <网址>
```

git remote rm命令用于删除远程主机。

```
$ git remote rm <主机名>
```

git remote rename命令用于远程主机的改名。

```
$ git remote rename <原主机名> <新主机名>
```

## 三、git fetch

一旦远程主机有了更新（git术语叫做commit），就需要将这些更新取回本地，这时就要用到git fetch命令。

```
$ git fetch <远程主机>
```

上面命令将某个远程主机的更新，全部取回本地。

默认情况下，git fetch取回所有分支（branch）的更新。如果只想取回特定分支的更新，可以指定分支名。

```
$ git fetch <远程主机> <分支名>
```

比如，取回origin主机的master分支。

```
$ git fetch origin master
```

所取回的更新，在本地主机上要用“远程主机名/分支名”的形式读取。比如origin主机的master，就要用origin/master读取。

git branch命令的-r参数，可以用来查看远程分支，-a参数查看所有分支。

```
$ git branch -r
origin/master

$ git branch -a
* master
  remotes/origin/master
```

上面命令表示，本地主机的当前分支是master，远程分支是origin/master。

取回远程主机的更新以后，可以在它的基础上，使用git checkout命令创建一个新的分支。

```
$ git checkout -b newBrach origin/master
```

上面命令表示，在origin/master的基础上，创建一个新分支。

此外，也可以使用git merge命令或者git rebase命令，在本地分支上合并远程分支。

```
$ git merge origin/master
# 或者
$ git rebase origin/master
```

上面命令表示在当前分支上，合并origin/master。

## 四、git pull







