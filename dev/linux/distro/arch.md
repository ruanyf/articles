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

如果存在，表示系统将以 UEFI 模式引导。如果不是的话，就会以传统的 BIOS 模式引导，请参考官方文档。

检查网络是否连通。

```bash
# ping archlinux.org
```

### 硬盘分区

列出磁盘。

```bash
# fdisk -l
```

选择你要安装系统安装的硬盘，下面是以`/dev/sda`为例。

```bash
# fdisk /dev/sda
```

系统会进入 fdisk 的命令模式。

1. 按下`d`，删除该硬盘的所有现存分区。
2. 创建 UEFI 模式必须的 EFI 分区。

按下`n`时，系统要求选择分区类型（Partition type），输入`p`，表示主分区。

系统要求你选择一个磁盘号，输入1。

第一个分区位置：按下回车键，表示默认位置。

最后一个分区：输入 +512M 。

3. 将 EFI 分区的类型更改为 EFI System（而不是 Linux 系统）。

输入`t`更改类型。输入`L`查看所有可用的分区类型，然后将其对应的编号输入 EFI 系统。

保持默认块大小，当它要求分区大小时，输入+512M。

4、创建根分区

按 n 创建一个新分区。它会自动给它分区号 2。这次继续按 Enter 键将整个剩余磁盘空间分配给根分区。

5、写入硬盘

输入`w`命令将更改写入磁盘并退出 fdisk 命令。

- root directory`/`。
- an EFI system partition.

### 文件系统

新建的分区需要建立文件系统。

所以，你有两个磁盘分区。第一个是 EFI 类型。使用mkfs 命令在其上创建FAT32 文件系统：v

```bash
mkfs.fat -F 32 /dev/sda1
```

现在在根分区上创建一个 Ext4 文件系统：

```bash
mkfs.ext4 /dev/sda2
```

```bash
# 根分区
# mkfs.ext4 /dev/root_partition


# efi 分区
# mkfs.fat -F 32 /dev/efi_system_partition
```

### 加载文件系统。

```bash
# mount /dev/sda2 /mnt
```

```bash
# mount --mkdir /dev/efi_system_partition /mnt/boot
# swapon /dev/swap_partition
```

### 设置网络

检查网络接口。

```bash
# ip link
```

可以使用 iwctl 命令登陆 Wifi。

```bash
iwctl
```

进入 iwctl 的操作环境。

您可以使用以下命令列出所有连接的无线接口/设备：

```bash
device list
```

您需要选择首选的一个。选择无线接口后，使用以下命令扫描可用网络：

```bash
station wlan0 scan
```

当它扫描网络时，您还看不到网络名称。因此，要查看可用的连接，您可以输入：

```bash
station wlan0 get-networks
```

在列出的网络中，您可以使用以下命令连接到目标 Wi-Fi：

```bash
station wlan0 connect "Name of Network/WiFi"
```

如果它受密码保护，系统会要求您输入密码，输入凭据，您应该可以连接到它。

使用Ctrl + D退出网络设置提示。

```bash
按下 ctrl+d
```

我们已连接到网络，但要确保，您可以使用 ping 命令检查是否可以使用互联网：

```bash
curl www.baidu.com
```

如果您收到回复字节，则说明您已连接。使用Ctrl+C停止 ping 回复。

### 选择仓库

首先同步 pacman 存储库，以便您可以下载和安装软件：

```bash
pacman -Syy
```

这一步可能要很长时间。

安装 reflector 软件包。

```bash
pacman -S reflector
```

编辑仓库服务器文件`/etc/pacman.d/mirrorlist`。

生成适合国内的仓库列表。

```bash
reflector -c "CN" -f 12 -l 10 -n 12 --save /etc/pacman.d/mirrorlist
```

### 安装系统

安装必要的文件。

```bash
pacstrap /mnt base linux linux-firmware vim nano
```

生成文件分区表 fstab 文件。

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

### 更新系统时间

更新系统时间。

```bash
# timedatectl set-ntp true
```

### 配置系统

将根分区更改为新系统。

```bash
# arch-chroot /mnt
```

设置时区。

```bash
# ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

生成 `/etc/adjtime`

```bash
# hwclock --systohc
```

### 本地化

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

```bash
echo myarch > /etc/hostname
```

编辑`/etc/hosts`。

```bash
127.0.0.1	localhost
::1		localhost
```


设置根用户的密码。

```bash
# passwd
```

### 安装 Grub 引导程序

```bash
pacman -S grub efibootmgr
```

创建将挂载 EFI 分区的目录：

```bash
mkdir /boot/efi
```

挂载 efi 分区。

```bash
mount /dev/sda1 /boot/efi
```

安装 Grub。

```bash
grub-install --target=x86_64-efi --bootloader-id=GRUB --efi-directory=/boot/efi
```

生成配置文件。

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

### 使用环境

```bash
pacman -S sudo
```

增加一个用户。

```bash
useradd -m team
passwd team
```

将其加入超级用户。

```bash
usermod -aG wheel,audio,video,storage team
```

删除 wheel 前面的注释。

```bash
EDITOR=vim visudo
```

安装桌面环境。

```bash
pacman -S xorg networkmanager
```

安装 gnome。

```bash
pacman -S gnome
```

启用显示管理器 GDM。我还建议启用网络管理器

```bash
systemctl enable gdm.service
systemctl enable NetworkManager.service
```

### 收尾工作

退出根用户环境 chroot。

```bash
exit
```

卸载所有加载的分区。

```bash
umount -l /mnt
```

重新启动。

```bash
reboot
```

交换文件设置方法 https://itsfoss.com/create-swap-file-linux/

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
