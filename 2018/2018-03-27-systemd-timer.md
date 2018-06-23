# Systemd 定时器教程

[Systemd](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html) 作为 Linux 的系统启动器，功能强大。

本文通过一个简单例子，介绍 Systemd 如何设置定时任务。这不仅实用，而且可以作为 Systemd 的上手教程。

![](http://www.ruanyifeng.com/blogimg/asset/2018/bg2018033001.jpg)

## 一、定时任务

所谓定时任务，就是未来的某个或多个时点，预定要执行的任务，比如每五分钟收一次邮件、每天半夜两点分析一下日志等等。

Linux 系统通常都使用 [cron](https://wiki.archlinux.org/index.php/Cron_%28%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%29) 设置定时任务，但是 Systemd 也有这个功能，而且优点显著。

> - 自动生成日志，配合 Systemd 的日志工具，很方便除错
> - 可以设置内存和 CPU 的使用额度，比如最多使用50%的 CPU
> - 任务可以拆分，依赖其他 Systemd 单元，完成非常复杂的任务

下面，我就来演示一个 Systemd 定时任务：每小时发送一封电子邮件。

## 二、邮件脚本

先写一个发邮件的脚本`mail.sh`。

```bash
#!/usr/bin/env bash

echo "This is the body" | /usr/bin/mail -s "Subject" someone@example.com
```

上面代码的`someone@example.com`，请替换成你的邮箱地址。

然后，执行这个脚本。

```bash
$ bash mail.sh
```

执行后，你应该就会收到一封邮件，标题为`Subject`。

如果你的 Linux 系统不能发邮件，建议安装 [ssmtp](http://tombuntu.com/index.php/2008/10/21/sending-email-from-your-system-with-ssmtp/) 或者 [msmtp](https://wiki.archlinux.org/index.php/msmtp)。另外，`mail`命令的用法，可以参考[这里](https://www.binarytides.com/linux-mail-command-examples/)。

## 三、Systemd 单元

学习 Systemd 的第一步，就是搞懂“单元”（unit）是什么。

简单说，单元就是 Systemd 的最小功能单位，是单个进程的描述。一个个小的单元互相调用和依赖，组成一个庞大的任务管理系统，这就是 Systemd 的基本思想。

由于 Systemd 要做的事情太多，导致单元有很多[不同的种类](https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files)，大概一共有12种。举例来说，Service 单元负责后台服务，Timer 单元负责定时器，Slice 单元负责资源的分配。

每个单元都有一个单元描述文件，它们分散在三个目录。

> - `/lib/systemd/system`：系统默认的单元文件
> - `/etc/systemd/system`：用户安装的软件的单元文件
> - `/usr/lib/systemd/system`：用户自己定义的单元文件

下面的命令可以查看所有的单元文件。

```bash
# 查看所有单元
$ systemctl list-unit-files

# 查看所有 Service 单元
$ systemctl list-unit-files --type service

# 查看所有 Timer 单元
$ systemctl list-unit-files --type timer
```

## 四、单元的管理命令

下面是常用的单元管理命令。

```bash
# 启动单元
$ systemctl start [UnitName]

# 关闭单元
$ systemctl stop [UnitName]

# 重启单元
$ systemctl restart [UnitName]

# 杀死单元进程
$ systemctl kill [UnitName]

# 查看单元状态
$ systemctl status [UnitName]

# 开机自动执行该单元
$ systemctl enable [UnitName]

# 关闭开机自动执行
$ systemctl disable [UnitName]
```

## 五、Service 单元

前面说过，Service 单元就是所要执行的任务，比如发送邮件就是一种 Service。

新建 Service 非常简单，就是在`/usr/lib/systemd/system`目录里面新建一个文件，比如`mytimer.service`文件，你可以写入下面的内容。

```bash
[Unit]
Description=MyTimer

[Service]
ExecStart=/bin/bash /path/to/mail.sh
```

可以看到，这个 Service 单元文件分成两个部分。

`[Unit]`部分介绍本单元的基本信息（即元数据），`Description`字段给出这个单元的简单介绍（名字叫做`MyTimer`）。

`[Service]`部分用来定制行为，Systemd 提供许多字段。

> - `ExecStart`：`systemctl start`所要执行的命令
> - `ExecStop`：`systemctl stop`所要执行的命令
> - `ExecReload`：`systemctl reload`所要执行的命令
> - `ExecStartPre`：`ExecStart`之前自动执行的命令
> - `ExecStartPost`：`ExecStart`之后自动执行的命令
> - `ExecStopPost`：`ExecStop`之后自动执行的命令

注意，定义的时候，所有路径都要写成绝对路径，比如`bash`要写成`/bin/bash`，否则 Systemd 会找不到。

现在，启动这个 Service。

```bash
$ sudo systemctl start mytimer.service
```

如果一切正常，你应该就会收到一封邮件。

## 六、Timer 单元

Service 单元只是定义了如何执行任务，要定时执行这个 Service，还必须定义 Timer 单元。

`/usr/lib/systemd/system`目录里面，新建一个`mytimer.timer`文件，写入下面的内容。

```bash
[Unit]
Description=Runs mytimer every hour

[Timer]
OnUnitActiveSec=1h
Unit=mytimer.service

[Install]
WantedBy=multi-user.target
```

这个 Timer 单元文件分成几个部分。

`[Unit]`部分定义元数据。

`[Timer]`部分定制定时器。Systemd 提供以下一些字段。

> - `OnActiveSec`：定时器生效后，多少时间开始执行任务
> - `OnBootSec`：系统启动后，多少时间开始执行任务
> - `OnStartupSec`：Systemd 进程启动后，多少时间开始执行任务
> - `OnUnitActiveSec`：该单元上次执行后，等多少时间再次执行
> - `OnUnitInactiveSec`： 定时器上次关闭后多少时间，再次执行
> - `OnCalendar`：基于绝对时间，而不是相对时间执行
> - `AccuracySec`：如果因为各种原因，任务必须推迟执行，推迟的最大秒数，默认是60秒
> - `Unit`：真正要执行的任务，默认是同名的带有`.service`后缀的单元
> - `Persistent`：如果设置了该字段，即使定时器到时没有启动，也会自动执行相应的单元
> - `WakeSystem`：如果系统休眠，是否自动唤醒系统

上面的脚本里面，`OnUnitActiveSec=1h`表示一小时执行一次任务。其他的写法还有`OnUnitActiveSec=*-*-* 02:00:00`表示每天凌晨两点执行，`OnUnitActiveSec=Mon *-*-* 02:00:00`表示每周一凌晨两点执行，具体请参考[官方文档](https://www.freedesktop.org/software/systemd/man/systemd.time.html)。

## 七、[Install] 和 target

`mytimer.timer`文件里面，还有一个`[Install]`部分，定义开机自启动（`systemctl enable`）和关闭开机自启动（`systemctl disable`）这个单元时，所要执行的命令。

上面脚本中，`[Install]`部分只写了一个字段，即`WantedBy=multi-user.target`。它的意思是，如果执行了`systemctl enable mytimer.timer`（只要开机，定时器自动生效），那么该定时器归属于`multi-user.target`。

所谓 Target 指的是一组相关进程，有点像 init 进程模式下面的启动级别。启动某个Target 的时候，属于这个 Target 的所有进程都会全部启动。

`multi-user.target`是一个最常用的 Target，意为多用户模式。也就是说，当系统以多用户模式启动时，就会一起启动`mytimer.timer`。它背后的操作其实很简单，执行`systemctl enable mytimer.timer`命令时，就会在`multi-user.target.wants`目录里面创建一个符号链接，指向`mytimer.timer`。

## 八、定时器的相关命令

下面，启动刚刚新建的这个定时器。

```bash
$ sudo systemctl start mytimer.timer
```

你应该立刻就会收到邮件，然后每个小时都会收到同样邮件。

查看这个定时器的状态。

```bash
$ systemctl status mytimer.timer
```

查看所有正在运行的定时器。

```bash
$ systemctl list-timers
```

关闭这个定时器。

```bash
$ sudo systemctl stop myscript.timer
```

下次开机，自动运行这个定时器。

```bash
$ sudo systemctl enable myscript.timer
```

关闭定时器的开机自启动。

```bash
$ sudo systemctl disable myscript.timer
```

## 九、日志相关命令

如果发生问题，就需要查看日志。Systemd 的日志功能很强，提供统一的命令。

```bash
# 查看整个日志
$ sudo journalctl

# 查看 mytimer.timer 的日志
$ sudo journalctl -u mytimer.timer

# 查看 mytimer.timer 和 mytimer.service 的日志
$ sudo journalctl -u mytimer

# 从结尾开始查看最新日志
$ sudo journalctl -f

# 从结尾开始查看 mytimer.timer 的日志
$ journalctl -f -u timer.timer
```

## 十、参考链接

- [How to Use Systemd Timers](https://jason.the-graham.com/2013/03/06/how-to-use-systemd-timers/), by Jason Graham
- [Using systemd as a better cron](https://medium.com/horrible-hacks/using-systemd-as-a-better-cron-a4023eea996d), by luqmaan
- [Getting started with systemd](https://coreos.com/os/docs/latest/getting-started-with-systemd.html), by CoreOS
- [systemd/Timers](https://wiki.archlinux.org/index.php/Systemd/Timers), by ArchWiki
- [Understanding Systemd Units and Unit Files](https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files), by Justin Ellingwood

（完）
