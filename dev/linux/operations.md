# Linux常用操作

## 用户操作

```bash
# 列出当前用户
$ whoami

# 列出所有用户
$ sudo cat /etc/shadow

# 列出所有用户的密码
$ sudo cat /etc/passwd

# 创建用户
$ sudo useradd [用户名]

# 为用户设置密码。
$ sudo passwd [用户名]
```

## 组操作

（1）显示当前用户所在的组

```bash
$ groups
```

（2) 显示特定用户所在的组

```bash
$ groups [userID]
```

(3) 查看所有的组

```bash
$ cat /etc/group
```

/etc/group文件的记录格式如下。

```
group_name:passwd:GID:user_list
```

每条记录分四个字段：

1. 用户组名称；
2. 用户组密码；
3. GID
4. 用户列表，每个用户之间用,号分割；本字段可以为空；如果字段为空表示用户组为GID的用户名；

## 挂载USB盘

（1）将USB盘插入电脑

（2）列出所有储存设备。

```bash
$ sudo fdisk -l
```

你会看到储存盘都是`/dev/sdXN`的形式，其中X是盘号，N是分区号。

（3）在文件系统中创建一个挂载点。

```bash
$ sudo mkdir /media/externaldrive
```

（4） 此时，只有root用户才能读取U盘，因此要将U盘变为所有用户都可以读取。

```bash
$ sudo chgrp -R users /media/externaldrive
$ sudo chmod -R g+w /media/externaldrive
```

（5）挂载USB盘。

```bash
sudo mount [/dev/sdXN] /media/externaldrive
```

（6）刻录镜像盘

```bash
$ sudo dd if=debian-*-netinst.iso of=/dev/sdX
```

## 信号（signal）

信号是进程间的一种通信机制，用于内核向某个进程发送消息。

- SIGTERM信号表示内核要求进程终止，进程可以自行退出，也可以不理会这个信号。
- SIGKILL信号用于立即终止进程，进程不能忽略该信号。

```bash
# 发出SIGTERM
$ kill [processID]
```

## nmcli 网络操作

```bash
# 查看所有网络连接
$ nmcli connection show

# 显示所有网络接口
$ nmcli device status

# 显示所有wifi连接
$ nmcli dev wifi list

# 连接某个已经成功的连接
$ nmcli con up id

# 连接某个wifi
$ nmcli dev wifi connect <name> password <password>
```

## 截图

xfce截图。

```bash
$ xfce4-screenshooter -f
```

Gnome截图。

```bash
$ gnome-panel-screenshot
$ gnome-panel-screenshot --delay 10
```

ImageMagick截图。

```bash
$ import MyScreenshot.png
```

然后，用鼠标选中所要截图的范围。

其他参数

```bash
# 10秒后抓取整个屏幕
$ sleep 10; import -window root MyScreenshot2.png

# 抓取图片后，并打开编辑软件
$ sleep 15; import -window root MyScreenshot3.png; gimp MyScreenshot3.png

# 抓取图片后，将宽度缩为500像素
$ import -window root -resize 500 AnotherScreenshot.png
```

scrot截图

```bash
# 安装
$ sudo aptitude install scrot

$ scrot MyScreenshot.png

# 设置质量和延迟，并进行编辑
$ scrot -q 85 -d 5 screenshot.png && gimp screenshot.png &
```

GIMP也可以用来截图，命令为`File —> Acquire —> Screen Shot`。

## Crontab 定时任务

crontab是UNIX下用来执行定时任务的一个守护进程。它可以定时执行某些脚本。

crontab的格式如下。

```bash
MIN HOUR DOM MON DOW CMD
```

- MIN：分钟，0-59
- HOUR：小时，0-23
- DOM：每个月的第几天，1-31
- MON：月份，1-12
- DOW：每周的第几天，0-6
- CMD：需要执行的命令或脚本

下面的命令可以进入contab的编辑模式。

```bash
# 进入crontab编辑模式
$ crontab -e

# 列出所有定时任务
$ crontab -l

# 列出指定用户的所有定时任务
$ crontab -u <userName> -l

# 删除Crontab条目
$ crontab -r

# 删除前询问
$ crontab -i -r
```

下面是一些例子。

```bash
# 8月20日下午4点30分
30 16 20 8 * /path/to/script

# 9点到18点，每小时执行一次
00 09-18 * * * /path/to/script

# 每天11点半或16点半检查邮件
30 11,16 * * * /path/to/script

# 每过10分钟执行一次，但是周末除外
*/10 * * * 0-4 /path/to/script
```

## 周期性执行一个命令

有多种方式，可以每隔几秒就执行一次命令。

（1）watch

`watch`周期性执行一个命令，输出结果。默认情况下，该命令每隔2秒就执行一次。

```bash
# 每隔2秒，清理一下内存
$ watch free -m

# 每隔10秒，执行某个脚本
$ watch -n 10 script.sh
```

`watch`命令的参数

- -n - 指定两次执行之间间隔的秒数
- -b – 如果命令的退出码非0，则喇叭响一下
- -c – 解释ANSI的颜色码
- -d – 对输出结果发生变化的部分高亮显示

（2）sleep命令

`sleep`命令可以指定暂停多少秒之后，再继续执行。

```bash
# foo循环
$ for i in {1..10}; do echo -n "This is a test in loop $i "; date ; sleep 5; done

# while循环
$ while true; do echo -n "This is a test of while loop";date ; sleep 5; done
```


