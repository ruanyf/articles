# bzip2

`bzip2`用于将文件压缩成`bz2`格式。

## 基本用法

```bash
# 格式
$ bzip2 [OPTIONS] filenames ...

# 压缩单个文件
$ bzip2 list.txt

# 压缩多个文件
# 下面的命令会产生三个 bz2 文件
$ bzip2 list.txt list1.txt list2.txt

# 解压
$ bzip2 -d list.txt.bz2
```

注意，`bzip2`默认会在压缩成功后，删除原始文件。如果希望保留原始文件，可以使用`-k`参数。

## 参数

```bash
# -d 解压
$ bzip2 -d list.txt.bz2

# -k 保留原始文件

# -t 检查一个压缩文件是否完整

# -v --verbose 输出压缩信息
```

## 参考链接

- [Linux bzip2 Command Tutorial for Beginners](https://www.howtoforge.com/linux-bzip2-command/), by HowToForge
