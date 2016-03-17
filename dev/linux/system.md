# 系统管理

## Systemd

Systemd是一个系统管理软件，主要用于管理后台守护进程（daemon）。它用来取代传统的initd服务启动方式。在使用它的系统中，它是所有其他进程的父进程。

Systemd每个启动的进程，称为“单位”（unit）。每个服务由描述文件（unit file）定义，描述文件存放在下面两个目录。

- `/usr/lib/systemd/system/`：软件包安装时自动添加的服务
- `/etc/systemd/system/`：系统管理员添加的服务，优先级较高。

描述文件分成四种类型，括号里面是描述文件的后缀名。

- services (.service)
- mount points (.mount)
- devices (.device)
- sockets (.socket)

正是由于描述文件有多种类型，所以使用时应该指定后缀名，比如`sshd.socket`。如果省略后缀名，那么`systemctl`默认后缀名是`.service`，比如`netctl`与`netctl.service`是等价的。

### 查看信息

```bash
# 查看版本
$ systemd --version

# 显示系统状态
$ systemctl status

# 列出现有服务
$ systemctl list-unit-files

# 列出正在运行的系统进程
$ systemctl
# 等同于
$ systemctl list-units

# 列出所有systemd试图加载的系统进程，不管成功或失败
$ systemctl --all
# 等同于
$ systemctl list-units --all

# 列出所有加载失败的系统进程
$ systemctl --failed
# 等同于
$ systemctl list-units --failed

# 列出所有的系统进程描述文件
$ systemctl list-unit-files

# 显示指定服务的状态
$ systemctl status unit

# 显示指定服务是否正在运行
$ systemctl is-active application.service

# 显示指定服务是否处于失败状态
$ systemctl is-failed application.service

# 显示指定服务是否激活
$ systemctl is-enabled unit

# 显示指定服务的配置参数
$ systemctl show sshd.service
```

### 系统管理

`systemd`提供系统的几个主要状态的切换命令。

```bash
# 重启系统
$ sudo systemctl reboot

# 关闭系统，切断电源
$ sudo systemctl poweroff

# CPU停止工作
$ systemctl halt

# 暂停系统
$ systemctl suspend

# 让系统进入冬眠状态
$ systemctl hibernate

# 让系统进入交互式休眠状态
$ systemctl hybrid-sleep

# 启动进入救援状态（单用户状态）
$ sudo systemctl rescue
```

查看启动耗时。

```bash
$ systemd-analyze                                                                                       1.951 Mb
Startup finished in 4.413s (kernel) + 1.923s (userspace) = 6.336s

# 查看启动详情
$ systemd-analyze blame
7.029s network.service
2.241s plymouth-start.service
1.293s kdump.service
1.156s plymouth-quit-wait.service
...

# 显示瀑布状的启动过程流
$ systemd-analyze critical-chain

graphical.target @1.918s
└─multi-user.target @1.918s
  └─NetworkManager.service @1.618s +299ms
    └─basic.target @1.616s
...

# 显示指定服务的启动流
$ systemd-analyze critical-chain atd.service
```

显示当前主机的信息。

```bash
$ hostnamectl
   Static hostname: rhel7.example.com
         Icon name: computer-laptop
           Chassis: laptop
        Machine ID: bcdc71f1943f4d859aa37e54a422938d
           Boot ID: f84556924b4e4bbf9c4a82fef4ac26d0
  Operating System: Red Hat Enterprise Linux Everything 7.0 (Maipo)
       CPE OS Name: cpe:/o:redhat:enterprise_linux:7.0:beta:everything
            Kernel: Linux 3.10.0-54.0.1.el7.x86_64
      Architecture: x86_64
```

设置主机名。

```bash
$ sudo hostnamectl set-hostname rhel7
```

显示本地化设置。

```bash
$ localectl
System Locale: LANG=en_US.UTF-8
VC Keymap: en_US
X11 Layout: en_US
```

设置本地化参数。

```bash
$ sudo localectl set-locale LANG=en_GB.utf8
$ sudo localectl set-keymap en_GB
```

显示当前时区设置。

```bash
$ timedatectl                                                                                           1.951 Mb
      Local time: 四 2016-03-03 12:34:16 CST
  Universal time: 四 2016-03-03 04:34:16 UTC
        RTC time: 四 2016-03-03 04:34:16
       Time zone: Asia/Shanghai (CST, +0800)
     NTP enabled: no
NTP synchronized: yes
 RTC in local TZ: no
      DST active: n/a
```

设置当前时区

```bash
$ sudo timedatectl set-time YYYY-MM-DD
$ sudo timedatectl set-time HH:MM:SS
```

显示所有可用的时区。

```bash
$ timedatectl list-timezones
```

设置时区。

```bash
$ sudo timedatectl set-timezone America/New_York
```

列出当前session。

```bash
$ loginctl list-sessions
```

列出所有登录用户。

```bash
$ loginctl list-users
```

显示指定用户的信息。

```bash
$ loginctl show-user ruanyf
```

### 服务管理

```bash
# 重启整个systemd
$ systemctl daemon-reload

# 立即启动一个服务
$ systemctl start unit

# 立即停止一个服务
$ systemctl stop unit

# 杀死服务的当前进程，服务会用新的进程重启
$ sudo systemctl kill apache.service

# 重启一个服务
$ systemctl restart unit

# 激活一个服务（系统启动时加载）
$ systemctl enable unit

# 停止激活一个服务
$ systemctl disable unit

# 重新加载一个服务的配置
$ systemctl reload unit
```

如果该服务的进程挂掉，会自动重启。

### 描述文件

新建一个`myapp.service`文件。

```bash
[Unit]
Description=Your app
After=network.target

[Service]
ExecStart=/var/www/myapp/app.js
Restart=always
StandardOutput=syslog
SyslogIdentifier=myapp
User=nobody
Group=nobody
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/var/www/myapp

[Install]
WantedBy=multi-user.target
```

它的含义如下。

- After：用来定义服务的依赖关系。如果A服务依赖于B服务，则增加`Requires=B`和`After=B`到A服务的描述文件的`[Unit]`部分。
- ExecStart：启动脚本。该脚本应该是可执行的（`chmod +x app.js`），并且第一行指定解释器（`#!/usr/bin/env node`）
- Restart：定义该服务的政策，`always`表示总是执行
- Environment：这些行用来指定环境变量。将`NODE_ENV`设为`production`的标准做法。
- Install部分：该服务何时激活，上例是系统启动时

将该文件拷贝到`/etc/systemd/system`目录。

```bash
$ sudo myapp.service /etc/systemd/system
```

让SystemMD重新加载配置文件。

```bash
$ sudo stemctl daemon-reload
```

最后，启动该服务。

```bash
$ sudo systemctl start myapp
```

### 系统日志

Systemd本身包含了系统日志，因此`syslog`进程不再需要了。journald的配置文件是`/etc/systemd/journald.conf`。

```bash
# 查看日志
$ journalctl

# 查看系统启动日志
$ journalctl -b

# 查看当前启动的日志
$ journalctl -b -0

# 查看上一次启动的日志
$ journalctl -b -1

# 查看前面第二次启动的日志
$ journalctl -b -2

# 查看指定时间之后的日志
$ journalctl --since="2012-10-30 18:17:16"

# 查看20分钟之前的日志
$ journalctl --since "20 min ago"

# 查看最新日志
$ journalctl -f

# 查看指定服务的日志
$ journalctl /usr/lib/systemd/systemd

# 查看指定进程的日志
$ journalctl _PID=1

# 查看指定服务的日志
$ journalctl -u [UNIT]

# 查看指定服务的日志，倒数显示
$ sudo journalctl -u $unit -f

# 查看状态
$ sudo systemctl status myapp
```

```bash
# 重启应用
$ sudo systemctl restart myapp

# 激活服务（正式在启动时加载）
$ sudo systemctl enable myapp

# 闲置服务
$ sudo systemctl disable myapp
```

## 时间管理

```bash
# 显示本地时间
$ date

# 显示世界时
$ date -u
```
