# Systemd 定时器教程

Systemd 作为 Linux 的系统启动器，功能强大。

本文通过一个简单例子，介绍 Systemd 如何设置定时任务。这不仅很实用，而且可以作为 Systemd 的上手教程。

## 一、定时任务

所谓定时任务，就是未来的某个或多个时点，预定要执行的任务，比如每五分钟收一次邮件、每天半夜两点分析一下日志等等。

Linux 系统通常都使用 [cron](https://wiki.archlinux.org/index.php/Cron_%28%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%29) 设置定时任务，但是 Systemd 也可以，而且有一些显著的优点。

> - 自动生成日志，配合 Systemd 的日志工具，很方便除错
> - 可以设置内存和 CPU 的使用额度，比如最多使用50%的 CPU
> - 任务可以拆分，依赖其他 Systemd 单元，可以完成非常复杂的任务

下面，我就来演示一个 Systemd 定时任务：每10分钟发送一封电子邮件。

作为先决条件，你的 Linux 系统应该可以执行下面的命令，正常发出一封邮件。

```bash
$ echo "This is the body" | mail -s "Subject" someone@example.com
```

请将上面命令中的`someone@example.com`替换成你的邮箱地址，执行后，该邮箱应该就会收到一封标题为`Subject`的邮件。`mail`命令的介绍，可以参考[这里](https://www.binarytides.com/linux-mail-command-examples/)。

如果报错或者邮件发送不成功，建议安装 [ssmtp](https://wiki.archlinux.org/index.php/SSMTP) 或者 [msmtp](https://wiki.archlinux.org/index.php/msmtp)。

## 二、Systemd 单元

学习 Systemd 的第一步，就是理解“单元”（unit）是什么。

简单说，单元就是 Systemd 的最小功能单位，是单个进程的描述。一个个小的单元互相调用和依赖，组成一个庞大的任务管理系统，这就是 Systemd 的基本思想。

由于 Systemd 要做的事情太多，导致单元有很多[不同的种类](https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files)，大概一共有12种。举例来说，Service 单元负责后台服务，Timer 单元负责定时器，Slice 单元负责资源的分配。

System 默认提供的单元文件，都存放在`/lib/systemd/system`目录，各种软件定义的单元文件在`/etc/systemd/system`目录，用户自己定义的单元文件在`/usr/lib/systemd/system`目录，后面的例子就会用这个目录。

下面的命令可以查看所有的单元文件。

```bash
$ systemctl list-unit-files
```

这个命令还可以指定查看的类型。

```bash
# 查看所有 Service 单元
$ systemctl list-unit-files --type service

# 查看所有 Timer 单元
$ systemctl list-unit-files --type timer
```

## 三、单元的管理命令

下面是常用的单元管理命令。

```bash
# 启动单元
$ systemctl start [UnitName]
# 关闭单元
$ systemctl stop [UnitName]
# 重启单元
$ systemctl restart [UnitName]

# 激活单元，即启动后自动执行该单元
$ systemctl enable [UnitName]
# 废置单元，即让激活的单元不再自动执行
$ systemctl disable [UnitName]
```

## 四、Service 单元

前面说过，Service 单元就是所要执行的任务，比如发送邮件就是一种 Service。

首先，在`/usr/lib/systemd/system`目录里面，新建一个`mytimer.service`文件，写入下面的内容。

```bash
[Unit]
Description=MyTimer

[Service]
ExecStart=/bin/echo "This is the body" | /usr/bin/mail -s "Subject" someone@example.com
```

可以看到，这个 Service 单元的描述文件，分成两个部分。

`[Unit]`部分介绍本单元的基本信息（即元数据），`Description`字段给出这个单元的简单介绍，比如`MyTimer`。

`[Service]`部分是实际所要执行的命令，Systemd 提供许多字段用来定制 Service。

> - `ExecStart`：`systemctl start`所要执行的命令
> - `ExecStop`：`systemctl stop`所要执行的命令
> - `ExecReload`：`systemctl reload`所要执行的命令
> - `ExecStartPre`：`ExecStart`之前自动执行的命令
> - `ExecStartPost`：`ExecStart`之后自动执行的命令
> - `ExecStopPost`：`ExecStop`之后自动执行的命令

注意，定义命令的时候，所有命令都要给出绝对路径，比如`mail`命令要写成`/usr/bin/mail`，否则 Systemd 会找不到。一个解决办法就是把命令写成单独的脚本文件，然后这里定义`/bin/bash [脚本的绝对路径]`即可。

## 五、Timer 单元

Service 单元只是定义了发送邮件的命令，要定时执行这个 Service，还必须定义 Timer 单元。

在`/usr/lib/systemd/system`目录里面，新建一个`mytimer.timer`文件，写入下面的内容。

```bash
[Unit]
Description=Runs mytimer every hour

[Timer]
OnUnitActiveSec=1h
Unit=mytimer.service

[Install]
WantedBy=multi-user.target
```

这个 Timer 单元的描述文件，也分成几个部分。

`[Unit]`部分定义一些描述信息，即元数据。

`[Timer]`部分定义定时器。Systemd 提供以下一些字段。

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

上面的脚本里面，`OnUnitActiveSec=1h`表示一小时执行一次任务。其他的写法还有`OnUnitActiveSec=*-*-* 02:00:00`表示每天凌晨零点执行，`OnUnitActiveSec=Mon *-*-* 02:00:00`表示每周一凌晨两点执行，具体请参考[官方文档](https://www.freedesktop.org/software/systemd/man/systemd.time.html)。

## 六、[Install] 和 target

`mytimer.timer`文件里面，还有一个`[Install]`部分，定义`systemctl enable`和`systemctl disable`这个单元时，所要执行的命令。

上面脚本中，`[Install]`部分只写了一个字段，即`WantedBy=multi-user.target`。它的意思是，如果设置了机器启动就执行这个定时器，那么它归属于`multi-user.target`。

所谓 Target 指的是一组相关进程，有点像 init 进程模式下面的启动级别。启动某个Target 的时候，属于这个 Target 的所有进程都会全部启动。

`multi-user.target`是一个最常用的 Target，意为多用户模式。也就是说，当系统以多用户模式启动时，就会一起启动`mytimer.timer`。它背后的操作其实很简单，执行`systemctl enable mytimer.timer`命令时，就会在`multi-user.target.wants`目录里面创建一个符号链接，指向`mytimer.timer`。

## 七、运行定时器

下面，运行刚刚新建的这个定时器。

```bash
$ sudo systemctl start mytimer.timer
```

start: starts a systemd unit
stop: attempts to “nicely” end a service
status: provides detailed information on a service
restart: restarts (stops and then starts) the specified service
enable: hooks (links) a unit to various places, for instance to run at boot
disable: unhooks (unlinks) a unit, so it is not activated
systemctl kill httpd.service

```bash
$ systemctl stop shopify-recent shopify-full ...
$ systemctl daemon-reload
$ systemctl enable shopify-recent.timer shopify-full.timer ...
$ systemctl start shopify-recent shopify-full ...
```

# Start timer, as root
systemctl start myscript.timer
# Enable timer to start at boot
systemctl enable myscript.timer

```bash
$ systemctl start SERVICE
$ systemctl stop SERVICE
$ systemctl status SERVICE
$ systemctl list-timers  # view the status of the timers
$ journalctl  # view the full systemd logs in less
$ journalctl -u SERVICE  # view the logs for a specific service
$ journalctl -f  # tail the logs
$ journalctl -f -u SERVICE  # tail the logs for a specific service
```

## 定时器

每个 .timer 文件所在目录都得有一个对应的 .service 文件（如 foo.timer 和 foo.service）。.timer 用于激活并控制 .service 文件。 .service 文件中不需要包含 [Install] 部分，因为这由 timer 单元接管。必要时通过在定时器的 [Timer] 部分指定 Unit= 选项来控制一个与定时器不同名的服务单元。

使用 timer 单元时像其他单元一样 enable 或 start 即可（别忘了添加 .timer 后缀）。要查看所有已启用的定时器，运行：

$ systemctl list-timers


列出所有定时器（包括非活动的），使用下列命令： systemctl list-timers --all.

## 示例

单调定时器
定义一个在系统启动 15 分钟后执行，且之后每周都执行一次的定时器。

/etc/systemd/system/foo.timer
[Unit]
Description=Run foo weekly and on boot

[Timer]
OnBootSec=15min
OnUnitActiveSec=1w 

[Install]
WantedBy=timers.target
实时定时器
定义一个每周执行一次（明确时间为周一上午十二点）且上次未执行就立即执行的定时器。

/etc/systemd/system/foo.timer
[Unit]
Description=Run foo weekly

[Timer]
OnCalendar=weekly
Persistent=true     
 
[Install]
WantedBy=timers.target

## 参考链接

- [systemd/Timers](https://wiki.archlinux.org/index.php/Systemd/Timers), by ArchWiki
- https://www.freedesktop.org/software/systemd/man/systemd.time.html
