# rsync

rsync 用来在两台计算机或者两个路径之间同步文件。它名称里面的`r`就是指 remote，所以 rsync 其实是“远程同步”（remote sync）的意思。与其他文件传输工具（如 FTP 或 SCP）不同，rsync 先检查发送方和接收方上的文件，仅传输同步它们所需的文件。

```bash
$ rsync -a /source/path /target/path
```

上面的命令会创造一个完全备份。如果目标路径不存在，就会新建。

`-a`参数表示递归复制。

注意，`/home/user/dir/`和`/home/usr/dir`不一样。没有最后的斜杠，rsync 将复制整个目录。如果带有最后斜杠，则会拷贝目录下的所有内容，而不会新建这个目录。

```bash
$ rsync -avze ssh /home/user/directory/ user@remote.host.net:/home/user/directory/
```

上面命令中，`-e`参数表示使用 SSH 进行远程登录，

rsync 的最大特点就是它可以完成增量备份，也就是只复制有变动的文件。

```bash
$ rsync -a --link-dest /compare/path /source/path /target/path
```

`-link-dest`参数指定一个比较路径，然后源文件路径跟这个路径进行比较，找出变动的文件，将它们拷贝到目标路径。那些没有变动的文件，会变成指向比较路径的链接。

`-a`参数表示存档模式，保存所有的元数据，比如修改时间（modification time）、权限、所有者，并且软链接也会拷贝成软链接。

`-v`参数表示输出细节。`-vv`表示输出更详细的信息，`-vvv`表示输出最详细的信息。

`-h`参数表示以人类可读的格式输出。

`--exclude`参数指定排除不进行复制的文件，比如`--exclude="*.iso"`。rsync 会复制“点”开头的隐藏文件，如果要排除隐藏文件，可以这样写`--exclude=".*/"`。

`-z`参数用于压缩数据。

`--delete`参数保证源路径删除的文件，在目标路径也同样删除。

```bash
$ rsync -avH --delete /etc username@192.168.0.1:backup
```

`--progress`参数表示显示进展。

## 参考链接

- [Mirror Your Web Site With rsync](https://www.howtoforge.com/mirroring_with_rsync), by Falko Timme
