# stdlib.h

## 算术函数

标准函数库包含了4个整型算术函数。

```c
int abs( int value );
long int labs( long int value );
div_t div( int numerator, int denominator );
ldiv_t ldiv( long int numer, long int denom );
```

abs函数返回它的参数的绝对值。如果其结果不能用一个整数表示，这个行为是未定义的。

`labs`用于执行相同的任务，但它的作用对象是长整数。

div函数把它的第2个参数（分母）除以第1个参数（分子），产生商和余数，用一个div_t结构返回。这个结构包含下面两个字段，

```c
int　quot;　 //　商
int　rem;　 //　余数
```

`ldiv`所执行的任务和div相同，但它作用于长整数，其返回值是一个ldiv_t结构。

## atoi()，atol()

`atoi()`函数将字符串类型的字母和数字，转换为整数。

```c
int atoi(char const * string);
```

它接受一个字符串作为参数（字符串起首的空格会被忽略）。

```c
char s[3] = "10";
int times = atoi(s); // 10
```

如果参数是数字开头的字符串，`atoi()`会只转换数字部分，比如`atoi("42regular")`会返回整数`42`。如果首字符不是数字，比如“hello world”，则会返回`0`。

`atol()`函数与`atoi()`类似，唯一的区别是把字符串转换成 long 类型的值。

```c
long atol(char const * string);
```

## strtol()，strtoul()

`strtol()`用来将字符串形式的整数值，转为 long int。如果转换不成功，返回`0`。它与`atoi()`的区别在于，可以指定整数的进制，还允许访问字符串的剩余部分。

```c
long strtol(const char* nPtr, char** endPtr, int base);
```

它接受三个参数。

- `nPtr`：待转换的字符串（起首的空白字符会被忽略）。
- `endPrt`：一个指针，指向不能转换部分的第一个字符。这个参数如果设为 NULL，就表示不需要这个指针。
- `base`：待转换整数的进制。这个值应该是`2`到`36`之间的整数，代表相应的进制，如果是特殊值`0`，表示让`strtol()`根据数值的前缀，自己确定进制。

```c
char* end;

long value = strtol("0xff", &end, 16);
printf("%ld\n", value); // 255
printf("%s\n", end); // 无内容

value = strtol("0xffxx", &end, 16);
printf("%ld\n", value); // 255
printf("%s\n", end); // xx
```

上面示例中，`strtol()`可以指定字符串包含的是16进制整数。不能转换的部分，可以使用指针`end`进行访问。

下面是另外一个例子。

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
  const char* string = "-1234567abc";
  char* remainderPtr;
  long x = strtol(string, &remainderPtr, 0);
  printf("%s\"%s\"\n%s%ld\n%s\"%s\"\n",
    "The original string is ",
    string,
    "The converted value is ",
    x,
    "The remainder of the original string is ",
    remainderPtr
  );
}
```

上面代码的输出结果如下。

```c
The original string is "-1234567abc"
The converted value is -1234567
The remainder of the original string is "abc"
```

如果被转换的值太大，`strtol()`函数在`errno`中存储`ERANGE`这个值，并返回`LONG_MIN`（原值为负数）或`LONG_MAX`（原值为正数）。

`strtoul()`的用法与`strtol()`类似，唯一的区别是将字符串转为 unsigned long int。

```c
unsigned long strtoul(const char* nPtr, char** endPtr, int base);
```

如果被转换的值太大，`strtoul()`返回`ULONG_MAX`。

## atof()，strtod()

`atof()`函数将字符串转换成 double 类型的值。如果转换不成功，返回`0.0`。

```c
double atof(const char* str);
```

下面是一个例子。

```c
atof("98993489"); // 98993489.000000
```

`strtod()`用来将一个字符串形式的浮点数转为 double。如果转换不成功，返回`0`。它与`atof()`的区别是，可以获取一个指针，指向字符串不能转换部分的第一个字符。

```c
double strtod(const char* nPtr, char** endPtr);
```

它接受两个参数，第一个参数是字符串（`char*`），第二个参数是字符串数组（`char**`）。

它的处理过程是，首先解析第一个参数（如果起首有空白字符，会被过滤），如果第一个参数可以转换成 double 值，则返回该 double 值，同时将第二个参数指向剩余的不可转换部分的第一个字符；如果第一个参数无法转成 double 值，则返回`0`，同时将第二个参数指向第一个参数。

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
  const char* string = "51.2% are admitted";
  char* stringPtr;
  double d = strtod(string, &stringPtr);
  printf("The string \"%s\" is converted to the\n", string);
  printf("double value %.2f and the string \"%s\"\n", d, stringPtr);
}
```

上面示例中，`strtod()`提取字符串`string`的开头的 double 值`51.2`，然后将不能转换的部分（`% are admitted`）的指针放入`stringPtr`。上面代码的输出结果如下。

```bash
The string "51.2% are admitted" is converted to the
double value 51.20 and the string "% are admitted"
```

`atof()`与`strtod()`的转换结果如果太大或太小，无法用 double 值表示，那么将 errno 中存储`ERANGE`这个值。如果值太大（无论是正数还是负数），函数返回`HUGE_VAL`；如果值太小，函数返回零。

## rand()

`rand()`函数用来生成 0～RAND_MAX 之间的随机数。`RAND_MAX`也定义在`stdlib.h`里面，通常等于 INT_MAX。

```c
// 原型
int rand(void);

// 示例
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

`rand()`是伪随机数函数，为了增加随机性，必须在调用它之前，使用`srand()`函数重置一下种子值。

`srand()`函数接受一个无符号整数（unsigned int）作为种子值，没有返回值。

```c
void srand(unsigned int seed);
```

通常使用`time()`函数返回的系统时间，作为`srand()`的参数。

```c
#include <time.h>
srand((unsigned int) time(0));
```

上面代码中，`time()`的原型定义在头文件`time.h`里面，返回值的类型是类型别名`time_t`，具体的类型与系统有关，所以要强制转换一下类型。`time()`的参数是一个指针，指向一个具体的 time_t 类型的时间值，这里传入空指针`0`作为参数。

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

## abort()

`abort()`用于不正常地终止一个正在执行的程序。由于这个函数将引发 SIGABRT 信号，你可以在程序中为这个信号设置一个信号处理函数。

```c
void abort(void);
```

## system()

system函数把它的字符串参数传递给宿主操作系统，这样它就可以作为一条命令，由系统的命令处理器执行。

void system( char const *command );

这个任务执行的准确行为因编译器而异，system的返回值也是如此。但是，system可以用一个NULL参数调用，用于询问命令处理器是否实际存在。在这种情况下，如果存在一个可用的命令处理器，system返回一个非零值，否则它返回零。
