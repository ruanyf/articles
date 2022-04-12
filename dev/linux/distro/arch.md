# Arch Linux

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
