# Systemd 定时任务教程

## 优点

- 自动日志，容器除错
- 可以设置内存和 CPU 的使用额度
- 任务可以简单地独立于他们的定时器启动，简化调试。
每个任务可配置运行于特定的环境中（参见 systemd.exec(5) man page）。
任务可以使用 cgroups 特性。
任务可以配置依赖于其他 systemd 单元。

## 基本概念

- Services：定义工作。
- Timers：定义何时运行工作
- Slices：定义资源的额度

Unit 是单个进程的描述文件，用于描述如何启动该进程。

Ideas that in other init systems may be handled with one unified service definition can be broken out into component units according to their focus. This organizes by function and allows you to easily enable, disable, or extend functionality without modifying the core behavior of a unit.

Unit 就是启动过程中要完成的一件事情。默认的 Unit 文件在`/lib/systemd/system`目录，自定义 Unit 文件在`/etc/systemd/system`。

/usr/lib/systemd/system

查看所有的 Unit

```bash
$ systemctl list-unit-files

# 查看特定类型的 Unit
$ systemctl list-unit-files --type service
$ systemctl list-unit-files --type target
```



Target 是一组相关进程，有点像 init 模式下面的启动级别。启动某个target的时候，这些进程全部启动。

Each target is actually a collection of symlinks to our unit files. This is specified in the unit file by WantedBy=multi-user.target. Running systemctl enable foo.service creates symlinks to the unit inside multi-user.target.wants.

ExecStart= allows you to specify any command that you'd like to run when this unit is started. 

`ExecStart`命令就是启动 Unit 时，`systemctl start`要执行的命令。`ExecStop`就是关闭 Unit 时，`systemctl stop`要执行的命令。


## [Unit] 单元

`[Unit]`单元用来定义元数据。

`[Install]`就是 enable 和 disable 这个 Unit 时，要执行的命令。

- ExecStart=: This specifies the full path and the arguments of the command to be executed to start the process. This may only be specified once (except for "oneshot" services). If the path to the command is preceded by a dash "-" character, non-zero exit statuses will be accepted without marking the unit activation as failed.
- ExecStartPre=: This can be used to provide additional commands that should be executed before the main process is started. This can be used multiple times. Again, commands must specify a full path and they can be preceded by "-" to indicate that the failure of the command will be tolerated.
- ExecStartPost=: This has the same exact qualities as ExecStartPre= except that it specifies commands that will be run after the main process is started.
- ExecReload=: This optional directive indicates the command necessary to reload the configuration of the service if available.
- ExecStop=: This indicates the command needed to stop the service. If this is not given, the process will be killed immediately when the service is stopped.
- ExecStopPost=: This can be used to specify commands to execute following the stop command.
- RestartSec=: If automatically restarting the service is enabled, this specifies the amount of time to wait before attempting to restart the service.

- Restart=: This indicates the circumstances under which systemd will attempt to automatically restart the service. This can be set to values like "always", "on-success", "on-failure", "on-abnormal", "on-abort", or "on-watchdog". These will trigger a restart according to the way that the service was stopped.

- TimeoutSec=: This configures the amount of time that systemd will wait when stopping or stopping the service before marking it as failed or forcefully killing it. You can set separate timeouts with TimeoutStartSec= and TimeoutStopSec= as well.

`[Timer]`部分

- OnActiveSec=: 激活后多少秒开始执行
- OnBootSec=: 系统启动后多少秒激活该单元
- OnStartupSec=: systemd 进程本身启动后，多少秒激活该单元
- OnUnitActiveSec=: 该 Unit 上次激活后多少秒，再激活该单元
- OnUnitInactiveSec=: Unit 上次关闭后多少秒，再激活该单元
- OnCalendar=: 基于绝对时间，而不是相对时间，激活该单元
- AccuracySec=: 如果因为各种原因，Unit 必须推迟激活，推迟的最大秒数，默认是60秒。
- Unit=: 激活时间到了以后，真正执行的 Unit，默认是同名的带有`.service`后缀的 Unit。
- Persistent=: 如果设置了该字段，即使定时器到时没有启动，也会自动激活对应的 Unit。
- WakeSystem=: 如果系统休眠，是否自动唤醒系统。

## 服务

```bash
# /etc/systemd/system/shopify-recent.service
[Unit]
Description=Runs shopify recent scraper
Wants=shopify-recent.timer
[Service]
ExecStart=/usr/local/bin/node /app/shoes-scraper/src/scraper --recent --platform shopify
WorkingDirectory=/app/shoes-scraper
Slice=shoes-scraper.slice
[Install]
WantedBy=multi-user.target
```

## 定时器

```bash
# /etc/systemd/system/shopify-recent.timer
[Unit]
Description=Run shopify-recent every 15-30 minutes
Requires=shopify-recent.service
[Timer]
Unit=shopify-recent.service
OnUnitInactiveSec=15m
RandomizedDelaySec=15m
AccuracySec=1s
[Install]
WantedBy=timers.target
```

## 资源额度

```bash
# /etc/systemd/system/shoes-scraper.slice
[Unit]
Description=Limited resources Slice
DefaultDependencies=no
Before=slices.target
[Slice]
CPUQuota=80%
MemoryLimit=2.7G
```

## 运行任务

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
