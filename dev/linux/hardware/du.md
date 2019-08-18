# du 命令

## 基本用法

`du`是“磁盘使用情况”（disk usage），给出给定文件或目录使用的估计磁盘空间量，对于查找占用大量磁盘空间的文件和目录非常有用。

```bash
$ du [OPTIONS] FILE
```

如果`FILE`是文件，就显示该文件占据的文件大小。如果给定的`FILE`是目录，`du`将汇总该目录中每个文件和子目录的磁盘使用情况。如果`FILE`未指定，`du`则将报告当前工作目录的磁盘使用情况。默认单位是 KB。

```bash
$ du ~/Documents
```

可以将多个文件或目录作为参数。

```bash
$ du ~/Documents ~/Pictures ~/.zshrc
```

## 参数

`-a`参数报告目录中每个文件的磁盘空间使用情况。

```bash
$ du -a ~/Documents
```

`-h`参数将文件大小显示为人类可读的单位。

```bash
$ sudo du -h /var
...
4.0K  /var/lib/apt/mirrors/partial
8.0K  /var/lib/apt/mirrors
205M  /var/lib/apt
2.9G  /var/lib/
```

`-s`参数之报告目录的总大小，而不报告子目录的大小。

```bash
$ sudo du -sh /var
2.9G /var
```

`-c`参数显示多个目录的总计大小。

```bash
$ sudo du -csh /var/log /var/lib
1.2G  /var/log
2.9G  /var/lib
4.1G  total
```

`--max-depth`参数指定统计的子目录深度。

```bash
$ sudo du -h --max-depth=1 /var/lib
544K  /var/lib/usbutils
4.0K  /var/lib/acpi-support
205M  /var/lib/apt
2.9G  /var/lib
```

`--apparent-size`参数给出文件实际占用的硬盘大小。

```bash
$ sudo du -sh --apparent-size /var/lib
2.9G /var/lib
```

打印出最大的5个子目录。

```bash
$ sudo du -h /var/ | sort -rh | head -5
4.6G  /var/
2.9G  /var/lib
2.6G  /var/lib/snapd
1.7G  /var/lib/snapd/snaps
1.2G  /var/log/journal/af8ce1d394b844fea8c19ea5c6a9bd09
```

## 参考链接

- [Du Command in Linux](https://linuxize.com/post/du-command-in-linux/)
