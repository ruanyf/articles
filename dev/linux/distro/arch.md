# Arch Linux

## 安装

下载镜像文件和签名文件。然后，验证签名。

```bash
$ gpg --keyserver-options auto-key-retrieve --verify archlinux-version-x86_64.iso.sig

# 或者
$ pacman-key -v archlinux-version-x86_64.iso.sig
```

镜像文件启动后，会以 root 用户身份登录第一个虚拟控制台，并显示 Zsh shell 提示符。

检查下面的目录是否存在。

```bash
# ls /sys/firmware/efi/efivars
```

如果存在，表示系统将以 UEFI 模式引导。

检查网络接口。

```bash
# ip link
```

可以使用 iwctl 命令登陆 Wifi。

检查网络是否连通。

```bash
# ping archlinux.org
```

更新系统时间。

```bash
# timedatectl set-ntp true
```

列出磁盘。

```bash
# fdisk -l
```

硬盘分区。

- root directory`/`。
- an EFI system partition.

新建的分区需要建立文件系统。

```bash
# 根分区
# mkfs.ext4 /dev/root_partition

# swap 分区
# mkswap /dev/swap_partition

# efi 分区
# mkfs.fat -F 32 /dev/efi_system_partition
```

加载文件系统。

```bash
# mount /dev/root_partition /mnt
# mount --mkdir /dev/efi_system_partition /mnt/boot
# swapon /dev/swap_partition
```

编辑仓库服务器文件`/etc/pacman.d/mirrorlist`。

安装必要的文件。

```bash
# pacstrap /mnt base linux linux-firmware
```

生成 fstab 文件

```bash
# genfstab -U /mnt >> /mnt/etc/fstab
```

将根分区更改为新系统。

```bash
# arch-chroot /mnt
```

设置时区。

```bash
# ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
```

生成 `/etc/adjtime`

```bash
# hwclock --systohc
```

编辑`/etc/locale.gen`，去除`en_US.UTF-8 UTF-8`的注释和其他需要的本地化语言。

生成 locales。

```bash
# locale-gen
```

编辑`/etc/locale.conf`。

```bash
LANG=en_US.UTF-8
```

编辑`/etc/hostname`。

设置根用户的密码。

```bash
# passwd
```

退出根用户环境。

```bash
# exit
```

卸载所有加载的分区。

```bash
# umount -R /mnt
```

重新启动。

```bash
# reboot
```

## Pacman

更新软件列表。

```bash
$ sudo pacman -Sy
```

更新整个系统。

```bash
$ sudo pacman -Syu
```

添加软件包。

```bash
$ sudo pacman -S packagename
```

也可以一次安装多个包。

```bash
$ sudo pacman -S pac1 pac2
```

在安装后，输出软件包的详细信息。

```bash
$ pacman -Qi cmatrix
```

删除软件包。

```bash
$ sudo pacman -R packagename
```

## Yay

安装。

```bash
$ git clone https://aur.archlinux.org/yay-git.git
$ chmod 777 yay-git
$ cd yay-git
$ makepkg -si
```

更新系统

```bash
$ sudo yay -Syu
```

安装软件包。

```bash
$ yay -S packagename
```

删除软件包。

```bash
$ yay -R packagename
```

删除所有不必要的依赖项。

```bash
$ yay -Rns cmatrix
```

删除系统不需要的软件包。

```bash
$ yay -Yc
```
