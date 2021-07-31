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

上面报错的格式如下。

```c
Assertion failed: [expression], function [abc], file [xyz], line [nnn].
```

上面代码中，方括号的部分使用实际数据替换掉。

使用 assert()有几个好处：它不仅能自动标识文件和出问题的行号，还有一种无需更改代码就能开启或关闭 assert()的机制。如果认为已经排除了程序的 bug，就可以把下面的宏定义写在包含assert.h的位置前面：

```c
#define NDEBUG
#include <assert.h>
```

并重新编译程序，这样编译器就会禁用文件中的所有 assert()语句。如果程序又出现问题，可以移除这条`#define`指令（或者把它注释掉），然后重新编译程序，这样就重新启用了assert()语句。

assert 的缺点是，因为引入了额外的检查，增加了程序的运行时间。

## static_assert()

C11 引入了静态断言`static_assert()`，用于在编译阶段进行断言判断。

```c
static_assert(constant-expression, string-literal);
```

`static_assert()`接受两个参数，第一个参数`constant-expression`是一个常量表达式，第二个参数`string-literal`是一个提示字符串。如果第一个参数的值为false，会产生一条编译错误，第二个参数就是错误提示信息。

```c
static_assert(sizeof(int) == 4, "64-bit code generation is not supported.");
```

上面代码的意思是，如果当前计算机的`int`类型不等于4个字节，就会编译报错。

注意，`static_assert()`只在编译阶段运行，无法获得变量的值。如果对变量进行静态断言，就会导致编译错误。

```c
int positive(const int n) {
  static_assert(n > 0, "value must > 0");
  return 0;
}
```

上面代码会导致编译报错，因为编译时无法知道变量`n`的值。

`static_assert()`的好处是，尽量在编译阶段发现错误，避免运行时再报错，节省开发时间。另外，有些`assert()`断言位于函数之中，如果不执行该函数，就不会报错，而`static_assert()`不管函数是否执行，都会进行断言判断。最后，`static_assert()`不会生成可执行代码，所以不会造成任何运行时的性能损失。

