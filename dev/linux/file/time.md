# 文件时间

Linux 系统的每个文件都有三个时间戳。

- atime（access time）：上一次读取时间，包括直接读取和 cat、vim、less 之类的软件读取。
- mtime（modify time）：上一次修改时间，指的是文件内容的最后变动时间。
- ctime（change time）：上一次变动时间，指的是文件的属性和元数据的变化，包括权限、所有者、文件名、位置等。

注意，文件内容的变更也会导致 ctime 的变化，即 mtime 变化一定引起 ctime 的变化。

`stat`命令可以用来查看时间戳。

```bash
# 格式
$ stat <filename>

# 示例
$ stat abhi.txt
  File: abhi.txt
  Size: 0         	Blocks: 0          IO Block: 4096   regular empty file
Device: 10305h/66309d	Inode: 11936465    Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/abhishek)   Gid: ( 1000/abhishek)
Access: 2018-08-30 12:19:54.262153704 +0530
Modify: 2018-08-30 12:19:54.262153704 +0530
Change: 2018-08-30 12:19:54.262153704 +0530
 Birth: -
```
