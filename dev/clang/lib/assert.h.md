# assert.h

`assert.h`头文件定义了宏`assert()`。这个宏接受一个整型表达式作为参数，如果表达式的值非零，就表示伪，`assert()`宏就在标准错误流`stderr`中写入一条错误信息，并调用`abort()`函数终止程序（`abort()`函数的原型在`stdlib.h`头文件中）。

assert()宏是为了标识出程序中某些条件为真的关键位置，如果其中的一个具体条件为假，就用 assert()语句终止程序。

通常，assert()的参数是一个条件表达式或逻辑表达式。如果 assert()中止了程序，它首先会显示失败的测试、包含测试的文件名和行号。

```c
z = x * x - y * y;
assert(z >= 0);
```

上面的断言类似于下面的代码。

```c
if (z < 0) {
  puts("z less than 0");
  abort();
}
```

如果断言失败，程序会中断执行，会显示下面的提示。

```c
Assertion failed: (z >= 0), function main, file /Users/assert.c, line 14.
```

使用 assert()有几个好处：它不仅能自动标识文件和出问题的行号，还有一种无需更改代码就能开启或关闭 assert()的机制。如果认为已经排除了程序的 bug，就可以把下面的宏定义写在包含assert.h的位置前面：

```c
#define NDEBUG
```

并重新编译程序，这样编译器就会禁用文件中的所有 assert()语句。如果程序又出现问题，可以移除这条`#define`指令（或者把它注释掉），然后重新编译程序，这样就重新启用了assert()语句。

