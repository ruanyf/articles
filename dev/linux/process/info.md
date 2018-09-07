# 进程信息

## 进程号

```bash
# 从进程名找出进程号
$ ps -aef | grep <processName>
# 实例
$ ps -aef | grep httpd

# 或者
$ pgrep sudo <processName>

# 从进程ID查看正在使用它的程序
$ ls -l /proc/<processId>/exe

# 列出某个进程打开的所有文件
$ sudo lsof -p <processId>

# 列出某个进程的工作目录
$ pwdx <processId>
# 或者
$ ls -l /proc/<processId>/cwd
```

列出某个程序相关的所有进程号。

```bash
# 格式
$ pidof <软件名称>

# 示例
$ pidof chrome
2551 2514 1963 1856 1771
```

## ps 命令

`ps`命令是进程操作的主要命令。不带有任何参数时，它会列出当前终端发起的所有进程。

```bash
$ ps
PID TTY          TIME CMD
23989 pts/0    00:00:00 bash
24148 pts/0    00:00:00 ps
```

`-e`参数会列出所有进程。

```bash
$ ps -e
```

`-f`参数会列出进程的完整信息。

```bash
$ ps -f
```

## pgrep 命令

`pgrep`命令根据关键词搜索进程，返回进程号。

```bash
$ pgrep nginx
20520
20521
```

`-u`参数可以指定用户名，表示只搜索某个用户的进程。

```bash
$ pgrep -u alan nginx
```

## pidof 命令

`pidof`命令根据可执行文件的路径，返回进程号。

```bash
$ pidof /home/alan/web/prod/nginx/sbin/nginx
20896 20895
```

## top 命令

`top`命令会返回所有进程占用系统进程的动态情况。

`-pid`参数可以指定只显示某个进程的资源占用。

```bash
$ top -pid 20881

Tasks:   4 total,   0 running,   4 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.8 us,  1.3 sy,  0.0 ni, 95.9 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem : 16387132 total, 10856008 free,  1857648 used,  3673476 buff/cache
KiB Swap:        0 total,        0 free,        0 used. 14177928 avail Mem 

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
20881 alan      20   0   12016    348      0 S   0.0  0.0   0:00.00 nginx
```

