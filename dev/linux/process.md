# 进程处理

## 端口（port）

端口（port）是网络通信的一种机制，用于将网络数据分配到指定的软件。端口号是一个16位整数，从0到65535。

下面的命令可以查看已经定义用途的端口。

```bash
$ less /etc/services
```

端口号可以分成三段。

- 0～1023：系统专用端口
- 1024～49151：用户端口，但是已经登记用途。
- 49152～65535：动态端口（只供暂时性使用）

以下命令可以查询正在使用的端口号。

```bash
$ netstat -tulpn
# 或者
$ sockstat -l

# 查看哪个程序正在使用80端口
$ netstat -tulpn | grep :<processId>
# 或者
$ fuser <processId>/tcp
# 或者
$ lsof -i :<processId> | grep LISTEN

# 查看正在监听的端口
$ netstat -nat | grep LISTEN
```

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
