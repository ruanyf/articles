# mount 命令

mount 命令常用来挂载外部储存设备，或者将镜像文件挂载到本地文件系统。

下面以挂载 iso 文件为例。

第一步，建立挂载目录。

```bash
$ sudo mkdir -p /mnt/iso
```

第二步，挂载文件。

```bash
$ sudo mount -o loop /path/to/isoFile /mnt/iso
```

上面命令的`-o loop`，表示以循环设备（loop device）模式挂载文件。

循环设备是一种伪设备(pseudo-device)，使得用户可以像访问块设备一样访问一个文件。

第三步，就可以浏览挂载目录了，看到加载文件里面的内容了。

```bash
$ ls -l /mnt/iso/
```

第四步，不需要的时候，就卸载已经挂载的文件或设备。

```bash
$ sudo umount /mnt/iso
```