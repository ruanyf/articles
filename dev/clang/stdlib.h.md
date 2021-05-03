# stdlib.h

## atoi()

`atoi()`函数将字符串类型的字母和数字，转换为整数。

它接受一个字符串作为参数。

```c
char s[3] = "10";
int times = atoi(s);
```

不是参数是数字开头的字符串，`atoi()`会只转换数字部分，比如`atoi("42regular")`会返回整数`42`。如果首字符不是数字，比如“hello world”，则会返回`0`。

## atof()

`atof()`函数将字符串转换成 double 类型的值。

`atol()`函数把字符串转换成 long 类型的值。它们的工作原理和atoi()类似。

strtol() 把字符串转换成long类型的值

strtoul()把字符串转换成unsigned long类型的值

strtod()把字符串转换成double类型的值。

这些函数的智能之处在于识别和报告字符串中的首字符是否是数字。而且，strtol()和strtoul()还可以指定数字的进制。

```c
char* end;

long value = strtol("0xff", &end, 16);
printf("%ld\n", value); // 255
printf("%s\n", end); // 无内容

value = strtol("0xffxx", &end, 16);
printf("%ld\n", value); // 255
printf("%s\n", end); // xx
```

上面示例中，`strtol()`的第一个参数是读取的字符串，第二个参数是解析结束时剩下的无法解析的字符串，第三个参数是解析所采用的进制。

## exit()

`exit()`用来结束程序。一旦调用该函数，程序就会立即结束。

该函数的参数就是程序的返回值。一般来说，它的参数有两种可选的常量：`EXIT_SUCCESS`（相当于 0）表示程序运行成功，`EXIT_FAILURE`表示程序异常中止。

```c
// 程序运行成功
exit(EXIT_SUCCESS);

// 程序异常中止
exit(EXIT_FAILURE);
```

## rand()

`rand()`函数用来生成 0～RAND_MAX 之间的随机数。`RAND_MAX`也定义在`stdlib.h`里面，通常等于 INT_MAX。

```c
int x = rand();
```

如果希望获得整数 N 到 M 之间的随机数，可以使用下面的写法。

```c
int x = rand() % M + N;
```

比如，1 到 6 之间的随机数，写法如下。

```c
int x = rand() % 6 + 1;
```

## srand()

`rand()`是伪随机数函数，为了增加随机数，必须在调用它之前，使用`srand()`函数重置一下种子值。

`srand()`函数接受一个无符号整数（unsigned int）作为种子值，没有返回值。

```c
void srand(unsigned int seed);
```

通常使用`time()`函数返回的系统时间，作为`srand()`的参数。

```c
#include <time.h>
srand((unsigned int) time(0));
```

上面代码中，`time()`的原型定义在头文件`time.h`里面，返回的类型名是`time_t`，具体的类型与系统有关，所以要强制转换一下类型。`time()`的参数是一个指针，指向一个具体的 time_t 类型的时间值，这里传入空指针`0`作为参数。

