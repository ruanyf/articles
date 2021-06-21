# signal.h

`signal.h`提供了处理信息（即异常情况）的工具。

信号有两种类型。

- 运行时错误
- 发生在程序以外的时间。

`signal.h`定义了一系列宏，表示不同的信号。每个宏的值都是一个正整数常量。

- SIGABRT：异常中止（可能由于调用了 abort() 方法）。
- SIGFPE：算术运算发生了错误（可能是除以 0 或者溢出）。
- SIGILL：无效指令。
- SIGINT：中断。
- SIGSEGV：无效存储访问。
- SIGTERM：终止请求。

`signal()`函数用来指定某种信号的处理函数。它的第一个参数是某种信号，第二个参数是处理函数的函数名。

```c
signal(SIGINT, handler);
```

处理函数`handler`必须接受一个 int 类型的参数，且返回值为 void。处理函数执行时，信号的编码会作为参数传给处理函数。处理函数内部可以根据这个参数，判断到底接受到了哪种信号。因为多个信号可以使用同一个处理函数。

程序可以忽略信号，即不指定处理函数。

一旦信号处理函数返回，程序会从信号发生点恢复并继续执行。但是，当信号是 SIGABRT，当处理函数返回时，操作系统会让程序中止。

`signal()`的返回值是前一个处理函数的指针。如果需要可以把它保存在变量之中，当新的处理函数执行完，再恢复以前的处理函数。

```c
void (*orig_handler)(int);
orig_handler = signal(SIGINT, orig_handler);
// SIGINT 信号发生之后
signal(SIGINT, orig_handler);
```

上面的示例中，先为信号`SIGINT`指定了新的处理函数，等到这个函数用过之后，再恢复原来的处理函数。

## 宏

`signal.h`还提供了信号相关的宏。

SIG_DFL：表示默认的处理函数。

```c
signal(SIGINT, SIG_IGN);
```

上面示例中，SIGINT 的处理函数是默认处理函数，由实现决定。

SIG_IGN：表示忽略该信号。

```c
signal(SIGINT, SIG_IGN);
```

SIG_ERR：指定信号处理函数时发生错误，`signal()`会返回这个值，并在`errno`存入一个正值。

```c
if (signal(SIGINT, handler) == SIG_ERR) {
  perror("signal(SIGINT, handler) failed");
  // ...
}
```

## raise()

`raise()`用来在程序中发出信号。

```c
int raise(int sig);
```

它的返回值可以用来测试调用是否成功，0 表示成功，非 0 表示失败。

```c
void handler(int sig) {
  printf("Handler called for signal %d\n", sig);
}

signal(SIGINT, handler);
raise(SIGINT);
```
