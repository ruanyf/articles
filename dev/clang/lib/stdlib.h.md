# stdlib.h

## 类型别名和宏

stdlib.h 定义了下面的类型别名。

- size_t：sizeof 的返回类型。
- wchar_t：宽字符类型。

stdlib.h 定义了下面的宏。

- NULL：空指针。
- EXIT_SUCCESS：函数运行成功时的退出状态。
- EXIT_FAILURE：函数运行错误时的退出状态。
- RAND_MAX：rand() 函数可以返回的最大值。
- MB_CUR_MAX：当前语言环境中，多字节字符占用的最大字节数。

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

## 字符串转成数值

### a 系列函数

`stdlib.h`定义了一系列函数，可以将字符串转为数组。

- atoi()：字符串转成 int 类型。
- atof()：字符串转成 double 类型。
- atol()：字符串转成 long int 类型。
- atoll()：字符串转成 long long int 类型。

它们的原型如下。

```c
int atoi(const char* nptr);
double atof(const char* nptr);
long int atol(const char* nptr);
long long int atoll(const char* nptr);
```

上面函数的参数都是一个字符串指针，字符串开头的空格会被忽略，转换到第一个无效字符处停止。函数名称里面的`a`代表 ASCII，所以`atoi()`的意思是“ASCII to int”。

它们返回转换后的数值，如果字符串无法转换，则返回`0`。

下面是用法示例。

```c
atoi("3490")   // 3490
atof("3.141593")   // 3.141593
```

如果参数是数字开头的字符串，`atoi()`会只转换数字部分，比如`atoi("42regular")`会返回整数`42`。如果首字符不是数字，比如“hello world”，则会返回`0`。

### str 系列函数（浮点数转换）

`stdlib.h`还定义了一些更强功能的浮点数转换函数。

- strtof()：字符串转成 float 类型。
- strtod()：字符串转成 double 类型。
- strtold()：字符串转成 long double 类型。

它们的原型如下。

```c
float strtof(
  const char* restrict nptr,
  char** restrict endptr
);

double strtod(
  const char* restrict nptr,
  char** restrict endptr
);
    
long double strtold(
  const char* restrict nptr,
  char** restrict endptr
);
```

它们都接受两个参数，第一个参数是需要转换的字符串，第二个参数是一个指针，指向原始字符串里面无法转换的部分。

- `nptr`：待转换的字符串（起首的空白字符会被忽略）。
- `endprt`：一个指针，指向不能转换部分的第一个字符。如果字符串可以完全转成数值，该指针指向字符串末尾的终止符`\0`。这个参数如果设为 NULL，就表示不需要处理字符串剩余部分。

它们的返回值是已经转换后的数值。如果字符串无法转换，则返回`0`。如果转换结果发生溢出，errno 会被设置为 ERANGE。如果值太大（无论是正数还是负数），函数返回`HUGE_VAL`；如果值太小，函数返回零。

```c
char *inp = "   123.4567abdc";
char *badchar;

double val = strtod(inp, &badchar);

printf("%f\n", val); // 123.456700
printf("%s\n", badchar); // abdc
```

字符串可以完全转换的情况下，第二个参数指向`\0`，因此可以用下面的写法判断是否完全转换。

```c
if (*endptr == '\0') {
  // 完全转换
} else {
  // 存在无法转换的字符
}
```

如果不关心没有转换的部分，则可以将 endptr 设置为 NULL。

这些函数还可以将字符串转换为特殊值 Infinity 和 NaN。如果字符串包含 INF 或 INFINITY（大写或小写皆可），则将转换为 Infinity；如果字符串包含 NAN，则将返回 NaN。

### str 系列函数（整数转换）

str 系列函数也有整数转换的对应函数。

- strtol()：字符串转成 long int 类型。
- strtoll()：字符串转成 long long int 类型。
- strtoul()：字符串转成 unsigned long int 类型。
- strtoull()：字符串转成 unsigned long long int 类型。

它们的原型如下。

```c
long int strtol(
  const char* restrict nptr,
  char** restrict endptr,
  int base
);
    
long long int strtoll(
  const char* restrict nptr,
  char** restrict endptr,
  int base
);
    
unsigned long int strtoul(
  const char* restrict nptr,
  char** restrict endptr,
  int base
);
    
unsigned long long int strtoull(
  const char* restrict nptr,
  char** restrict endptr, int base
);
```

它们接受三个参数。

（1）`nPtr`：待转换的字符串（起首的空白字符会被忽略）。

（2）`endPrt`：一个指针，指向不能转换部分的第一个字符。如果字符串可以完全转成数值，该指针指向字符串末尾的终止符`\0`。这个参数如果设为 NULL，就表示不需要处理字符串剩余部分。

（3）`base`：待转换整数的进制。这个值应该是`2`到`36`之间的整数，代表相应的进制，如果是特殊值`0`，表示让函数根据数值的前缀，自己确定进制，即如果数字有前缀`0`，则为八进制，如果数字有前缀`0x`或`0X`，则为十六进制。

它们的返回值是转换后的数值，如果转换不成功，返回`0`。

下面是转换十进制整数的例子。

```c
char* s = "3490";
unsigned long int x = strtoul(u, NULL, 10);

printf("%lu\n", x); // 3490
```

下面是转换十六进制整数的例子。

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

下面是转换二进制整数的例子。

```c
char* s = "101010";
unsigned long int x = strtoul(s, NULL, 2);

printf("%lu\n", x); // 42
```

下面是让函数自行判断整数进制的例子。

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

如果被转换的值太大，`strtol()`函数在`errno`中存储`ERANGE`这个值，并返回`LONG_MIN`（原值为负数）或`LONG_MAX`（原值为正数），`strtoul()`则返回`ULONG_MAX`。

## rand()

`rand()`函数用来生成 0～RAND_MAX 之间的随机整数。`RAND_MAX`是一个定义在`stdlib.h`里面的宏，通常等于 INT_MAX。

```c
// 原型
int rand(void);

// 示例
int x = rand();
```

如果希望获得整数 N 到 M 之间的随机数（包括 N 和 M 两个端点值），可以使用下面的写法。

```c
int x = rand() % （M - N + 1) + N;
```

比如，1 到 6 之间的随机数，写法如下。

```c
int x = rand() % 6 + 1;
```

获得浮点数的随机值，可以使用下面的写法。

```c
// 0 到 0.999999 之间的随机数
printf("0 to 0.99999: %f\n", rand() / ((float)RAND_MAX + 1));

// n 到 m 之间的随机数：
// n + m * (rand() / (float)RAND_MAX)
printf("10.5 to 15.7: %f\n", 10.5 + 5.2 * rand() / (float)RAND_MAX);
```

上面示例中，由于`rand()`和`RAND_MAX`都是 int 类型，要用显示的类型转换转为浮点数。

## srand()

`rand()`是伪随机数函数，为了增加随机性，必须在调用它之前，使用`srand()`函数重置一下种子值。

`srand()`函数接受一个无符号整数（unsigned int）作为种子值，没有返回值。

```c
void srand(unsigned int seed);
```

通常使用`time(NULL)`函数返回当前距离时间纪元的秒数，作为`srand()`的参数。

```c
#include <time.h>
srand((unsigned int) time(NULL));
```

上面代码中，`time()`的原型定义在头文件`time.h`里面，返回值的类型是类型别名`time_t`，具体的类型与系统有关，所以要强制转换一下类型。`time()`的参数是一个指针，指向一个具体的 time_t 类型的时间值，这里传入空指针`NULL`作为参数，由于 NULL 一般是`0`，所以也可以写成`time(0)`。

## atexit()

`atexit()`用来登记当前函数退出时，要执行的其他函数。它的参数是要执行的函数地址，即函数名。

```c
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
  puts("sign_off");
}

void too_bad(void) {
  puts("too bad");
}
```

上面示例中，用户输入失败时，会调用`sign_off()`和`too_bad()`函数；但是输入成功时只会调用`sign_off()`。因为只有输入失败时，才会进入`if`语句登记`too_bad()`。

另外，如果有多条`atexit()`语句，函数退出时最先调用的，是最后一个登记的函数。

`atexit()`登记的函数（如上例的`sign_off`和`too_bad`）应该不带任何参数且返回类型为`void`。通常，这些函数会执行一些清理任务，例如删除临时文件或重置环境变量。

## abort()

`abort()`用于不正常地终止一个正在执行的程序。使用这个函数的目的，主要是它会触发 SIGABRT 信号，开发者可以在程序中为这个信号设置一个处理函数。

```c
void abort(void);
```

该函数没有参数。

## system()

system函数把它的字符串参数传递给宿主操作系统，这样它就可以作为一条命令，由系统的命令处理器执行。

void system( char const *command );

这个任务执行的准确行为因编译器而异，system的返回值也是如此。但是，system可以用一个NULL参数调用，用于询问命令处理器是否实际存在。在这种情况下，如果存在一个可用的命令处理器，system返回一个非零值，否则它返回零。


