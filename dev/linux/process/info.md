# 进程信息

进程是程序的运行实例。

## 进程号

每个进程创建的时候，操作系统会为这个进程分配一个唯一编号（简称 PID），供内核使用。操作系统中创建时会自动分配给每个进程。

32位系统的 PID 最大值默认为是32,768，64位系统的最大值是 2 ^ 22（约4百万）。运行下面的命令，可以查看本机 PID 的最大值。

```bash
$ cat /proc/sys/kernel/pid_max
```

多种方法可以查看 PID。

```bash
# pidof 命令查看某个程序的 PID
# 第一个返回值可能是父进程
$ pidof apache2
3754 2594 2365 2364 2363 2362 2361

# pgrep 命令查看符合指定条件的所有正在运行的进程
# 最后一个返回值可能是父进程
$ pgrep apache2 
2361 
2362 
2363 
2364 
2365 
2594 3754

# pstree 命令返回进程树
# 可以搜索其中符合条件的部分
$ pstree -p | grep "apache2"
            |-apache2(3754)-+-apache2(2361)
            |               |-apache2(2362)
            |               |-apache2(2363)
            |               |-apache2(2364)
            |               |-apache2(2365)
            |               |-apache2(2594)

# ps 命令返回所有正在运行的进程
# 可以搜索其中符合条件的部分
$ ps aux | grep "apache2" 
```


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

