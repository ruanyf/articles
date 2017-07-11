# git checkout

`git checkout`命令有多种用途。

（1）用来切换分支。

```bash
$ git checkout
```

上面命令表示回到先前所在的分支。

```bash
$ git checkout develop
```

上面命令表示切换到`develop`分支。

（2）切换到指定快照（commit）

```bash
$ git checkout <commitID>
```

（3）将工作区指定的文件恢复到上次commit的状态。

```bash
# 将指定文件从暂存区复制到工作区，
# 用来丢弃工作区对该文件的修改
$ git checkout -- <filename>

# 还可以指定从某个 commit 恢复指定文件，
# 这会同时改变暂存区和工作区
$ git checkout HEAD~ -- <filename>
```

`-p`参数表示进入交互模式，只恢复部分变化。

```bash
$ git checkout -p
```

（4）切换到某个tag

```bash
$ git checkout tags/1.1.4
# 或者
$ git checkout 1.1.4
```

上面第二种用法的前提是，本地不能有叫做1.1.4的分支。

## 参数

`-b`用于生成一个新的分支。

```bash
$ git checkout -b new
```
