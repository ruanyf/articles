## dd 命令

`dd`是非常强大和有用的实用程序，用来转换和复制文件。在像Linux这样的Unix和类Unix操作系统上，几乎所有东西都被视为文件，甚至是块设备，这使得`dd`在克隆磁盘或擦除数据等方面很有用。

`dd`的基本语法非常简单，读取standard input和写入standard output。但是，我们可以指定input和output文件。

`dd`最常见的用例之一是备份主引导记录：旧MBR分区系统上的第一个扇区。该扇区的长度通常是512字节。假设我们要备份`/dev/sda`磁盘的主引导记录 MBR，可以使用下面的命令。

```bash
$ sudo dd if=/dev/sda bs=512 count=1 of=mbr.img
```

- if 输入文件
- of 输出文件
- bs 一次读取的数量，或者扇区大小。单位字节。
- count 需要读取的扇区总数。
- skip 输入时跳过指定数量的扇区
- seek 输出时跳过指定数量的扇区

创建整个磁盘的压缩文件。

```bash
$ sudo dd if=/dev/sda bs=1M | gzip -c -9 > sda.dd.gz
```

擦除磁盘数据。

```bash
$ sudo dd if=/dev/zero bs=1M of=/dev/sda
```

使用随机数据填满磁盘。

```bash
$ sudo dd if=/dev/urandom bs=1M of=/dev/sda
```

## 参考链接

- [How dd command works in Linux with examples](https://linuxconfig.org/how-dd-command-works-in-linux-with-examples), Egidio Docile
