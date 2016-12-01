# User space 与 Kernel space

学习 Linux 时，经常可以看到两个词：User space（用户空间）和 Kernel space（内核空间）。

简单说，Kernel space 是 Linux 内核的运行空间，User space 是用户程序的运行空间。为了安全，它们是隔离的，即使用户的程序崩溃了，内核也不受影响。

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016120201-1.png)

Kernel space 可以执行任意命令，调用系统的一切资源；User space 只能执行简单的运算，不能直接调用系统资源，必须通过系统接口（又称 system call），才能向内核发出指令。

```c
str = "my string" // 用户空间
x = x + 2
file.write(str) // 切换到内核空间

y = x + 4 // 切换回用户空间
```

上面代码中，第一行和第二行都是简单的赋值运算，在 User space 执行。第三行需要写入文件，就要切换到 Kernel space，因为用户不能直接写文件，必须通过内核安排。第四行又是赋值运算，就切换回 User space。

查看 CPU 时间在 User space 与 Kernel Space 之间的分配情况，可以使用`top`命令。它的第三行输出就是 CPU 时间分配统计。

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016120202.jpg)

这一行有 8 项统计指标。

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016120203.png)

其中，第一项`24.8 us`（user 的缩写）就是 CPU 消耗在 User space 的时间百分比，第二项`0.5 sy`（system 的缩写）是消耗在 Kernel space 的时间百分比。

随便也说一下其他 6 个指标的含义。

> - `0.0 ni`： niceness 的缩写，CPU 消耗在 nice 进程（低优先级）的时间百分比
- `73.6 id`：idle 的缩写，CPU 消耗在闲置进程的时间百分比，这个值越低，表示 CPU 越忙
- `0.4 wa`：wait 的缩写，CPU 等待外部 I/O 的时间百分比，这段时间 CPU 不能干其他事，但是也没有执行运算，这个值太高就说明外部设备有问题
- `0.0 hi`：hardware interrupt 的缩写，CPU 响应硬件中断请求的时间百分比
- `0.2 si`：software interrupt 的缩写，CPU 响应软件中断请求的时间百分比
- `0.0 st`：stole time 的缩写，该项指标只对虚拟机有效，表示分配给当前虚拟机的 CPU 时间之中，被同一台物理机上的其他虚拟机偷走的时间百分比

如果想查看单个程序的耗时，一般使用`time`命令。

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016120204.jpg)

程序名之前加上`time`命令，会在程序执行完毕以后，默认显示三行统计。

> - `real`：程序从开始运行到结束的全部时间，这是用户能感知到的时间，包括 CPU 切换去执行其他任务的时间。
- `user`：程序在 User space 执行的时间
- `sys`：程序在 Kernel space 执行的时间

`user`和`sys`之和，一般情况下，应该小于`real`。但如果是多核 CPU，这两个指标反映的是所有 CPU 的总耗时，所以它们之和可能大于`real`。

[参考链接]

- [User space vs kernel space](https://drawings.jvns.ca/userspace/)
- [Using the Linux Top Command](https://www.lifewire.com/linux-top-command-2201163)
- [Understanding Linux CPU stats](http://blog.scoutapp.com/articles/2015/02/24/understanding-linuxs-cpu-stats) 
- [What do 'real', 'user' and 'sys' mean in the output of time(1)?](http://stackoverflow.com/questions/556405/what-do-real-user-and-sys-mean-in-the-output-of-time1)

（完）





