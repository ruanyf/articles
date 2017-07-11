# git merge

将当前分支合并到指定分支。

```bash

$ git merge develop

```

将当前分支与develop分支合并，产生的新的commit对象有两个父节点。

如果“指定分支”本身是当前分支的一个直接子节点，则会产生fast-forward合并，即合并不会产生新的节点，只是让当前分支指向“指定分支”的最新commit。

Git合并所采用的方法是Three-way merge，及合并的时候除了要合併的兩個檔案，還加上它们共同的父节点。这样可以大大減少人為處理 conflict 的情況。如果采用two-way merge，則只用兩個檔案進行合併（svn默认就是这种合并方法。）

