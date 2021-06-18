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

## atexit()

`atexit()`用来注册函数退出时，要执行的其他函数。它的参数是要执行的函数地址，即函数名。

```c
#include <stdio.h>
#include <stdlib.h>
void sign_off(void);
void too_bad(void);

int main(void) {

int n;

atexit(sign_off);　　 /* 注册 sign_off()函数 */
puts("Enter an integer:");

if (scanf("%d", &n) != 1) {
  puts("That's no integer!");
  atexit(too_bad);　/* 注册 too_bad()函数 */
  exit(EXIT_FAILURE);
}

  printf("%d is %s.\n", n, (n % 2 == 0) ? "even" : "odd");
  return 0;
}

void sign_off(void) {
  puts("Thus terminates another magnificent program from");
  puts("SeeSaw Software!");
}

void too_bad(void) {
  puts("SeeSaw Software extends its heartfelt condolences");
  puts("to you upon the failure of your program.");
}
```

注意，输入失败时，会调用sign_off()和too_bad()函数；但是输入成功时只会调用sign_off()。因为只有输入失败时，才会进入if语句中注册too_bad()。另外还要注意，最先调用的是最后一个被注册的函数。

`atexit()`注册的函数，当调用`exit()`时就会执行这些函数。注意，即使没有显式调用`exit()`，还是会调用`sign_off()`，因为`main()`结束时会隐式调用`exit()`。

`atexit()`注册的函数（如`sign_off()`和`too_bad()`）应该不带任何参数且返回类型为`void`。通常，这些函数会执行一些清理任务，例如更新监视程序的文件或重置环境变量。
