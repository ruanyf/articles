# 磁盘管理

## 硬件设备

块设备 是一个表示任何可格式化为固定大小的块的存储设备的抽象层；各个块可与其他块地址独立地存取。这种存取通常称为随机存取。

可使用 ls -l 命令显示 /dev 条目。每个输出行上的第一个字符是 b，表示块设备，比如软盘、CD 驱动器、IDE 硬盘驱动器或 SCSI 硬盘驱动器；`c`表示字符设备，比如终端 (tty) 或空 (null) 设备。

## 分区

对于大型硬盘驱动器，将可用空间划分或分区为多个不同的分区。

分区可具有不同的大小，不同的分区之上可包含不同的文件系统，所以一个磁盘可用于许多用途，包括在多个操作系统之间共享它。

分区信息存储在磁盘上的分区表上。该表列出了每个分区的起点和终点的信息、它的类型信息，以及它是否标记为可引导。

使用 fdisk 显示 MBR 分区信息，带 -l 选项的 fdisk 命令用于列出分区。如果您希望查看一个特定驱动器上的分区，可以添加一个设备名称，比如 /dev/sda。

```bash
$ sudo fdisk -l /dev/sda

Disk /dev/sda: 500.1 GB, 500107862016 bytes
255 heads, 63 sectors/track, 60801 cylinders, total 976773168 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0xed1f86f7

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *          63   185915519    92957728+   7  HPFS/NTFS/exFAT
/dev/sda2       185915520   195365519     4725000   12  Compaq diagnostics
/dev/sda3       195366910   976773119   390703105    5  Extended
/dev/sda5       195366912   293021695    48827392   83  Linux
/dev/sda6       293023744   312553471     9764864   82  Linux swap / Solaris
/dev/sda7       312555520   333035519    10240000   83  Linux
```

Start 和 End 列显示了每个分区的开始和结束柱面。这些柱面不得重叠，一般都是连续的，没有其他空间介于中间。

星号表示该逻辑分区被标记为可引导（或活动）。该标志通常使标准 DOS PC 主引导记录能够引导该分区。但是，加载程序只能引导主分区。此标志对于 LILO 或 GRUB 引导加载程序没有意义。两个示例现在都使用 GRUB2 作为引导加载程序。

Blocks 列显示分区中的块数。现在大部分磁盘，扇区大小都为 512 字节，所以一个分区中的最大块数是柱面数 (End + 1 - Start) 与每个柱面的扇区数的乘积的一半。

Id 字段表示该分区的目标用途。类型 82 是一个 Linux 交换分区，类型 83 是一个 Linux 数据分区。

## 创建分区

`fdisk`命令用于创建、修改和删除磁盘分区。

```bash
$ fdisk /dev/sda
```

`mkfs`用于在分区上创建文件系统。创建一个 ext4 分区 (/dev/sdc6) 和一个 XFS 分区 (/dev/sdc3)，分别挂载在 /quotatest/ext4 和 /quotatest/xfs 上。

```bash
$ mkfs -t ext4 /dev/sdc6
$ mkdir -p /quotatest/ext4
$ mount /dev/sdc6 /quotatest/ext4

$ mkfs -t xfs -i size=512 /dev/sdc3
$ mkdir -p /quotatest/xfs
$ mount /dev/sdc3 /quotatest/xfs
```
