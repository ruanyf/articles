# 文件系统

## pwd

`pwd`命令显示列出当前所在的目录。

```bash
$ pwd
```

## cd

`cd`命令用来改变用户所在的目录。

```bash
# 进入用户的主目录
$ cd

# 进入前一个工作目录
$ cd -

# 进入指定用户的主目录
$ cd ~user_name
```

## ls

`ls`目录可以显示指定目录的内容。不加参数时，显示当前目录的内容。

```bash
# 显示多个目录的内容
$ ls ~ /usr

# -a --all 显示隐藏文件
$ ls -a

# -A 与-a类似，但是不显示当前目录和上一级目录两个点文件
$ ls -A

# -l 显示详细信息
$ ls -l

# -d 显示当前目录本身，而不是它的内容
# 通常与-l配合使用，列出一个目录本身的详细信息
$ ls -dl

# -F 目录名之后添加斜杠，可执行文件后面添加星号
$ ls -F

# -h 与-l配合使用，将文件大小显示为人类可读的格式

# -t 按文件修改时间排序，修改晚的排在前面
$ ls -t

# -s 按文件大小排序，

# --reverse 显示结果倒序排列
$ ls -lt --reverse
```

如果只显示一个目录里面的子目录，不显示文件，可以使用下面的命令。

```bash
# 只显示常规目录
$ ls -d */
$ ls -F | grep /
$ ls -l | grep ^d
$ tree -dL 1

# 只显示隐藏目录
$ ls -d .*/

# 隐藏目录和非隐藏目录都显示
$ find -maxdepth 1 -type d
```

## file

`file`命令显示指定文件的类型。

```bash
$ file picture.jpg
picture.jpg: JPEG image data, JFIF standard 1.01
```
