# 只列出目录的命令

如何只显示子目录，不显示文件？

可以使用下面的命令。

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
