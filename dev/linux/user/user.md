# 用户

`/etc/passwd`文件中包含了当前系统的所有用户。

```bash
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
johndoe:x:1000:1000:John Doe,,,:/home/helder:/bin/bash
davmail:x:127:65534::/var/lib/davmail:/usr/sbin/nologin
statd:x:128:65534::/var/lib/nfs:/usr/sbin/nologin
```

每一行就是一个用户，冒号用于分隔各个字段。各个字段的含义如下。

- 用户名
- 加密密码（`x` 代表密码被储存了）
- 用户 ID（UID）
- 用户的组ID号（GID）
- 全名
- 用户的主目录
- 用户的登录shell（默认为bash shell）

通常，普通用户的 UID 大于或等于1000。这样可以提示`UID >= 1000`的用户是普通用户，`UID < 1000`的用户是系统用户。

`getent passwd`命令也会打印出类似结果。

```bash
$ getent passwd
```

`compgen -u`命令可以只输出用户名。

```bash
$ compgen -u
```

`id`命令查看用户的详细信息。

```bash
$ id [user_name]
uid=1000(abhishek) gid=1000(abhishek) groups=1000(abhishek),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),116(lpadmin),126(sambashare),127(kvm)
```

`users`命令输出当前登录用户的用户名。

```bash
$ users
abhi rohini root
```

`w`命令查看所有已经登录的用户的详细信息。

```bash
$ w
 09:54:54 up 26 min,  3 users,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
root     pts/0    202.91.87.114    09:37   21.00s  0.00s  0.00s -bash
abhi     pts/1    202.91.87.114    09:47    0.00s  0.00s  0.00s w
rohini   pts/2    157.43.53.142    09:48    6:13   0.00s  0.00s -bash
```

上面输出的各个字段含义如下。

- USER：用户名。
- TTY：用于登录的终端。pts 表示伪终端（pseudo terminal slave），用户通过SSH连接登录。
- FROM：用户计算机的IP地址
- LOGING：登录时间。
- IDLE：用户闲置了多长时间。
- JCPU：连接到 TTY 的所有进程使用的时间。
- PCPU：用户运行的当前进程使用的时间。
- WHAT：用户的当前进程。

`who`命令也可以查看当前的登录用户。

```bash
$ who
root     pts/0        Aug  6 09:37 (202.91.87.114)
abhi     pts/1        Aug  6 09:47 (202.91.87.114)
rohini   pts/2        Aug  6 09:48 (157.43.53.142)
```

`last`命令查看上次重启后登录系统的用户，以及他的退出登录的时间。

```bash
$ last
rohini   pts/3        157.43.53.142    Tue Aug  6 10:05 - 10:05  (00:00)
rohini   pts/2        157.43.53.142    Tue Aug  6 09:48   still logged in
abhi     pts/1        202.91.87.114    Tue Aug  6 09:47   still logged in
root     pts/0        202.91.87.114    Tue Aug  6 09:37   still logged in
reboot   system boot  4.15.0-52-generi Tue Aug  6 09:28   still running

wtmp begins Tue Aug  6 09:28:43 2019
```
