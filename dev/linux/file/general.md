# 文件管理

## file 命令

`file`命令用来查看文件类型。

```bash
$ file /etc
/etc: directory
```

上面命令显示`/etc`是一个目录。

`-f`参数用于查询一个文件里面的多个路径的类型（每行一个文件）。

```bash
$ file -f files.list
```

`-s`参数读取块文件或者字符文件。

```bash
$ file -s /dev/sda
/dev/sda: DOS/MBR boot sector, extended partition table (last)
```

`-i`参数输出 mime 类型。

```bash
$ file -i -s /dev/sda
/dev/sda: application/octet-stream; charset=binary
```

## touch 命令

如果文件不存在，`touch`命令用来生成一个空文件。

```bash
$ touch <filename>
```

如果文件已经存在，`touch`命令会改变该文件的时间戳（详见《时间戳》一章）。

如果不确定一个文件是否存在，并且不想创建不存在的空文件，可以使用`-c`参数。

```bash
$ touch -c <filename>
```

上面代码中，如果文件不存在，不会新建。如果文件存在，就改变它的时间戳。

`touch`命令可以同时创建多个空文件。

```bash
# 格式
$ touch <file1> <file2> <file3>

# 示例
$ touch new-file-{1..10}.txt
```

## 硬链接和软链接

硬链接 是指向 inode 的目录条目，而 软链接 或 符号链接 是指向提供另一个目录条目的名称的 inode 的目录条目。符号链接也称为 symlink 。

您可以只为文件创建硬链接，而不为目录创建硬链接。一个例外是一个包含该目录和它的父目录（. 和 ..）的目录中的特殊目录条目，它们是维护子目录数量的硬链接。因为硬链接指向 inode，而且 inode 仅在特定的文件系统内是唯一的，所以硬链接不能跨文件系统使用。如果一个文件有多个硬链接，那么只在指向该 inode 的最后一个链接被删除，而且链接数量变为 0 时，才会删除该文件。

软链接或 symlink 仅按名称指向另一个文件或目录，而不是按 inode。软链接可以跨越文件系统边界进行使用。删除软链接不会删除目标文件或目录，删除目标文件或目录也不会自动删除任何软链接。

使用 ln 命令创建现有文件的额外的硬链接，但不能是目录。

使用 ln 命令和 -s 选项来创建软链接。

## find 命令

```bash
# 找出某个目录下面所有文件，然后删除
$ find /some/path -type f -delete
# 或者
$ find /some/path -type f -exec rm -f {} \;

# 找出某个目录下面指定类型的文件，然后删除
$ find /some/path -type f -iname "*.txt" -exec rm -f {} \;
```

