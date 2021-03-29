# 预处理器（Preprocessor）

C 语言编译器在编译程序之前，会先使用预处理器（preprocessor）处理代码。所以，C 语言提供了一些预处理器专用的语法。

## #define

`#define`命令定义替换模式，会将源码里面给定的词替换成另一个词。

```c
#define MAX 100
```

上面示例定义将源码里面的`MAX`，全部替换成`100`。

注意，`#define`是原样替换，指定什么内容，就一模一样替换成什么内容。

```c
#define HELLO "Hello, world"

// 相当于 printf("%s", "Hello, world");
printf("%s", HELLO);
```

## #include

`#include`命令用于编译时插入其他源码文件，常用于包含头文件（后缀名为`.h`的文件），即包含函数原型的文件。

```c
#include "foo.h" // 包含用户提供的头文件

#include <foo.h> // 包含系统提供的头文件
```

## #if...#else

`#if...#else`命令用于控制哪些行可以被编译，常常与`#define`配合使用。

```c
#define FOO 1

#if FOO
  aaa
  aaa
#else
  bbb
  bbb
#endif
```

上面示例中，由于`FOO`等于1，所以`aaa`会进入编译，`bbb`会被省略。如果`FOO`等于0，结果就会正好倒过来。

`#if`命令的一个应用，就是将代码块注释掉。

```c
#if 0
  printf("All this code"); /* is effectively */
  printf("commented out"); // by the #if 0
#endif
```

如果有多个判断条件，可以加入`#elif`命令。

```c
#if HAPPY_FACTOR == 0
    printf("I'm not happy!\n");
#elif HAPPY_FACTOR == 1
    printf("I'm just regular\n");
#else
    printf("I'm extra happy!\n");
#endif
```

## #ifdef...#endif

在大型项目中，检查某个文件是否被包含过，是常见的需求。解决方案是，在头文件里面定义一个空的替换模式，然后使用专用命令`#ifdef...#endif`，检查这个变量是否包含过。

```c
#define EXTRA_HAPPY

#ifdef EXTRA_HAPPY
  printf("I'm extra happy!\n");
#endif
```

上面示例定义了一个空的替换模式`EXTRA_HAPPY`，`#ifdef`检查这个模式是否被定义过。如果是的，就会将`#ifdef...#endif`内部的代码一起编译，否则就会忽略它们。

`#ifdef`也支持`#else`命令。

```c
#ifdef EXTRA_HAPPY
    printf("I'm extra happy!\n");
#else
    printf("I'm just regular\n");
#endif
```

`#ifdef`等同于`#if defined`。

```c
#ifdef FOO
// 等同于
if defined FOO
```

使用这种语法，可以完成多成替换条件的判断。

```c
#if defined FOO
  x = 2;
#elif defined BAR
  x = 3;
#endif
```

相应地，还有一个`#ifndef...#endif`命令，如果某个模式没有定义过，就会编译内部代码。

```c
#ifdef EXTRA_HAPPY
    printf("I'm extra happy!\n");
#endif

#ifndef EXTRA_HAPPY
    printf("I'm just regular\n");
#endif
```

上面示例检查一个模式是否定义过，指定了两种结果各自需要编译的代码。

另一种常见的用法，是在`#ifndef`内部指定需要替换的模式。

```c
#ifndef MYHEADER_H  // First line of myheader.h

#define MYHEADER_H
int x = 12;

#endif
```

`#ifndef`等同于`#if !defined`。

```c
#ifndef FOO
// 等同于
#if !defined FOO
```

## #undef

`#undef`命令用来取消定义过的宏。

```c
#define GOATS

#undef GOATS  // Make GOATS no longer defined
```

## #pragma once

`#pragma once`用来解决一个头文件被包含多次的问题。

## 内置宏

C 语言提供一些内置的宏，可以直接使用。

- `__DATE__`	The date of compilation—like when you’re compiling this file—in Mmm dd yyyy format
- `__TIME__`	The time of compilation in hh:mm:ss format
- `__FILE__`	A string containing this file’s name
- `__LINE__`	The line number of the file this macro appears on
- `__func__`	The name of the function this appears in, as a string107
- `__STDC__`	Defined with 1 if this is a standard C compiler
- `__STDC_HOSTED__`	This will be 1 if the compiler is a hosted implementation108, otherwise 0
- `__STDC_VERSION__`	This version of C, a constant long int in the form yyyymmL, e.g. 201710L

```c
#include <stdio.h>

int main(void)
{
    printf("This function: %s\n", __func__);
    printf("This file: %s\n", __FILE__);
    printf("This line: %d\n", __LINE__);
    printf("Compiled on: %s %s\n", __DATE__, __TIME__);
    printf("C Version: %ld\n", __STDC_VERSION__);
}

/* 输出如下

This function: main
This file: test.c
This line: 7
Compiled on: Mar 29 2021 19:19:37
C Version: 201710

*/
```

# 带参数的宏

宏可以带有参数。

```c
#include <stdio.h>

#define SQR(x) x * x

int main(void) {
  printf("%d\n", SQR(12));  // 144
}
```

上面示例中，`SQR(12)`被替换成`12 * 12`。

注意，`SQR()`括号里面的内容，会按照宏的定义被原样替换，比如`SQR(3 + 4)`被替换成`# + 4 * 3 + 4`。所以，必须保证宏的用法与定义的一样。

更好的解决方案是在定义宏的时候，尽量多使用括号，这样可以避免很多意外的发生。

```c
#define SQR(x) ((x) * (x))
```

上面示例中，`SQR(x)`替换后的形式，有两层圆括号，就可以避免很多错误的发生。

一般来说，宏都是一行的。使用反斜杠（`\`）换行，就可以将宏写成多行。

```c
#define PRINT_NUMS_TO_PRODUCT(a, b) { \
    int product = (a) * (b); \
    for (int i = 0; i < product; i++) { \
        printf("%d\n", i); \
    } \
}
```

上面示例中，替换文本放在大括号里面，这是为了创造一个块作用域，避免宏内部的变量污染外部。

宏也可以有多个参数，下面是三角形面积计算公式的例子。

```c
#define TRIANGLE_AREA(w, h) (0.5 * (w) * (h))
```

由于带有参数的宏，与函数极为相像，那么什么时候使用宏，什么时候使用函数？一般来说，应该首先使用函数，它的功能更强、更容易理解。但是，以前的代码大量使用宏，尤其是简单的数学运算。

`define`命令里面的替换文本，只要前面加上`#`，就可以让输出变成一个字符串。

```c
#define STR(x) #x

// 等同于 printf("%s\n", "3.14159");
printf("%s\n", STR(3.14159));
```

可以定义多重的宏，即多次替换。

```c
#define QUADP(a, b, c) ((-(b) + sqrt((b) * (b) - 4 * (a) * (c))) / (2 * (a)))
#define QUADM(a, b, c) ((-(b) - sqrt((b) * (b) - 4 * (a) * (c))) / (2 * (a)))
#define QUAD(a, b, c) QUADP(a, b, c), QUADM(a, b, c)
```

上面示例是一元二次方程组求解的替换（存在正负两个根）。

还可以定义可变参数的宏（即不确定有多少个参数）。

```c
#define X(a, b, ...) (10*(a) + 20*(b)), __VA_ARGS__
```

上面示例中，`X(a, b, ...)`表示`X()`至少有两个参数，多余的参数使用`...`表示。`__VA_ARGS__`将多余的参数替换成逗号分隔的形式。

```c
X(5, 4, 3.14, "Hi!", 12)
// 替换成
(10*(5) + 20*(4)), 3.14, "Hi!", 12
```

`__VA_ARGS__`前面加上一个`#`号，可以让输出变成一个字符串。

```c
#define X(...) #__VA_ARGS__

printf("%s\n", X(1,2,3));  // Prints "1, 2, 3"
```

## #error

`#error`用于终止程序运行，抛出一个错误。

```c
#ifndef __STDC_IEC_559__
  #error I really need IEEE-754 floating point to compile. Sorry!
#endif
```

## #line

`#line`命令用于覆盖内置的宏`__LINE__`，将其改为自定义的值。后面的行将从这个值开始计数。

```c
#line 300
```

`#line`改掉内置的宏`__FILE__`。

```c
#line 300 "newfilename"
```

上面示例中，`__FILE__`被改成`newfilename`。
