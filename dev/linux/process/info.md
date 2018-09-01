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
