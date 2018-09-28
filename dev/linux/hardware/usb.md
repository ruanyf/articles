# USB 设备

插入 USB 储存设备后，使用`fdisk -l`命令列出本机可用的储存系统。

```bash
$ sudo fdisk -l
```

USB 储存设备通常是`/dev/sdb[n]`。

然后，新建一个挂载点（比如`/media/USB`）。

```bash
$ sudo mkdir /media/[mountPointName]
```

接着，将 USB 设备挂载到挂载点。

```bash
# U 盘是 Fat32 格式
$ sudo mount -t vfat /dev/sdb1 /media/USB -o [securityoption]

# U 盘是 NTFS 格式
$ sudo mount -t ntfs-3g /dev/sdb1 /media/USB
```

`securityoption`用来设置 USB 设备的读取权限，通常是下面几个设置之一。

- uid=1000
- gid=1000
- Utf8
- dmask=027
- fmask=137

U 盘卸载的命令如下。

```bash
$ sudo umount /media/USB
$ sudo umount /dev/sdb1
```

卸载后，就可以拔下 U 盘。
