# 数据类型

C 语言的数据是有类型（type）的。所谓”类型”，就是编译器解释二进制数据的方式。

基本数据类型有三种：字符（char）、整数（int）和浮点数（float）。其他复杂的类型都是基于它们构建的。

## 字符类型

字符类型指的是单个字符，类型声明使用`char`关键字。

```c
char c = 'B';
```

上面示例声明了变量`c`是字符类型，并将其赋值为字母`B`。

C 语言规定，字符常量必须放在单引号里面。

在计算机内部，字符类型使用一个字节（8位）存储。C 语言将其当作整数处理，即字符类的整数范围是`-128`到`127`，每个字符对应一个整数（由 ASCII 码确定），比如`B`对应整数`66`。由于这个原因，一些小整数（小于128的整数）也可以赋值给字符类型。

```c
char c = 66;
```

上面示例中，变量`c`是字符类型，但是赋给它的值是整数66。实际上，这跟赋值为字符`B`的效果是一样的。

两个字符类型的变量可以进行数学运算。

```c
char a = 'B'; // 等同于 char a = 66;
char b = 'C'; // 等同于 char b = 67;

printf("%d\n", a + b); // 输出 133
```

上面示例中，占位符`%d`表示输出十进制整数，因此变量`a`和`b`相加，就是两个整数相加。

单引号本身也是一个字符，如果要引用这个字符，必须使用反斜杠转义。

```c
char t = '\'';
```

上面示例中，变量`t`等于单引号字符，由于字符类型的定义必须放在单引号里面，所以内部的单引号要使用反斜杠转义。

反斜杠还能用来表示 ASCII 码定义的一些控制字符，它们也属于字符类型的值。

- `\a`：警报，这会使得终端发出警报声或出现闪烁，或者两者同时发生。
- `\b`：退格键，光标回退一个字符，但不删除字符。
- `\f`：换页符，光标移到下一页。在现代系统上，这已经反映不出来了，行为改成类似于`\v`。
- `\n`：换行符。
- `\r`：回车符，光标移到同一行的开头。
- `\t`：制表符，光标移到下一个水平制表位，通常是下一个8的倍数。
- `\v`：垂直分隔符，光标移到下一个垂直制表位，通常是下一行的同一列。
- `\0`：null 字符，代表没有内容。注意，这个不代表数字0，是当作字符解读。
- `\nn`：字符的八进制值转义，`nn`为八进制值。
- `\xnn`：字符的十六进制值转义，`nn`为十六进制值。

由于单引号里面可以用八进制和十六进制值，所以下面的写法都是等价的。

```c
char x = 'B';
char x = 66;
char x = '\102';
char x = '\x42';
```

## 整数类型

### 简介

整数类型用来表示较大的整数，类型声明使用`int`关键字。

```c
int a;
```

上面示例声明了一个整数变量`a`。

目前来说，计算机内部对`int`类型的值，通常使用4个字节（32位）存储，但是2个字节（16位）或8个字节（64位）也有可能使用。它们可以表示的整数范围如下。

- 16位：-32,768 到 32,767。
- 32位：-2,147,483,648 到 2,147,483,647。
- 64位：-9,223,372,036,854,775,808 到 9,223,372,036,854,775,807。

### signed，unsigned

`int`类型包括正整数和负整数，也就是说，默认带有正负号（signed）。C 语言提供`signed`关键字，表示某个类型带有正负号，由于这是默认设置，所以`signed`关键字一般省略不写。

```c
int a;
// 等同于
signed int a;
```

`int`类型可以不带符号，即只能表示正数，也是允许的。这样的好处是，同样长度的内存能够表示的整数值，可以增大一倍。比如，64位无符号整数的存储范围，就增大到`0`到`18,446,744,073,709,551,615`。

`unsigned`关键字用来设置不带符号的数据类型，使其只能为正数。

```c
unsigned int a;
```

`unsigned int`里面的`int`可以省略，所以上面的声明也可以写成下面这样。

```c
unsigned a;
```

字符类型`char`也可以设置`signed`和`unsigned`。

```c
signed char c; // 默认值，范围为 -128 到 127
unsigned char c; // 范围为 0 到 255
```

### 整数的子类型

`int`类型使用4个或8个字节表示一个整数，对于一些较小的整数，这样做很浪费空间。另一方面，某些场合需要更大的整数，8个字节还不够。为了解决这些问题，C 语言提供三个关键字，可以更精细地限定整数的范围，也有利于更好地表达代码的意图。

- `short int`（简写为`short`）：占用空间不多于`int`，一般占用2个字节（整数范围为-32768～32767)。
- `long int`（简写为`long`）：占用空间不少于`int`，至少为4个字节。
- `long long int`（简写为`long long`）：占用空间多于`long`，至少为8个字节。

```c
short int a;
long int b;
long long int c;
```

默认情况下，`short`、`long`、`long long`都是带符号的（signed），也可以将它们声明为不带符号（unsigned），使得能够表示的最大值扩大一倍。

```c
unsigned short int a;
unsigned long int b;
unsigned long long int c;
```

C 语言允许省略`int`，所以上面的语句也可以写成下面这样。

```c
short a;
unsigned short a;

long b;
unsigned long b;

long long c;
unsigned long long c;
```

由于不同的计算机，数据类型的字节长度是不一样的，`int`类型可能是2个字节、也可能是4个字节或8个字节。为了程序的可移植性，确实需要32位整数时，应使用`long`类型而不是`int`类型；确实需要64位的整数时，应该使用`long long`类型。另一方面，为了节省空间，只需要16位整数时，应使用`short`类型。

## 浮点数类型

浮点数类型主要用来表示小数，类型声明使用`float`关键字。它与科学计数法相结合，可以表示非常大或者非常小的数。

```c
float c = 10.5;
```

上面示例中，变量`c`的类型是`float`。

`float`类型内部使用科学计数法储存一个值，比如`10.5`会表示成 1.05x10<sup>1</sup>，简写为`1.5E1`，其中`1.5`是科学计数法的小数部分，`E1`是科学计数法的指数部分。

`float`类型占用4个字节（32位），其中8位存放指数的值和符号，剩下24位存放小数的值和符号。`float`类型至少能够提供6位有效数字，指数部分的范围为`-37`到`37`，即10<sup>-37</sup>到10<sup>37</sup>。

有时候，32位浮点数提供的精度或者数据范围不足够，C 语言又提供了另外两种更大的浮点数类型。

- `double`：占用8个字节（64位），至少提供13位有效数字。
- `long double`：通常占用16个字节。

注意，由于存在精度限制，浮点数只是一个近似值，它的计算是不精确的，比如 C 语言里面`0.1 + 0.2`并不等于`0.3`，而是有一个很小的误差。

C 语言允许使用科学计数法表示浮点数。

```c
double x = 123.456e+3;
// 等同于
double x = 123.456e3;
```

上面示例中，`e`后面如果是加号`+`，加号可以省略。

注意，科学计数法里面`e`的前后，不能存在空格。

另外，科学计数法的小数部分如果是`0.x`或`x.0`的形式，那么`0`可以省略。

```c
0.3E6
// 等同于
.3E6

3.0E6
// 等同于
3.E6
```

## 布尔类型

C 语言原来没有为布尔值设置一个类型，只用整数`0`表示`false`，所有非零值表示`true`。

```c
i = 0;
while (i) {
// ...
```

上面代码中，只要`i`不等于`0`，C 语言就认为判断为真，从而执行循环体。

C99 标准添加了`_Bool`类型，表示布尔值`true`和`false`。不过，这个类型还是使用`0`表示`false`，`1`表示`true`，下面是一个示例。

```c
_Bool isNormal;

isNormal = 1;
if (isNormal)
  printf("Everything is OK.\n");
```

## 可移植类型

由于 C 语言的整数类型（short、int、long）在不同计算机上，占用的字节可能是不一样的，无法提前知道它们到底占用多少个字节。为了保证代码更好的可移植性，让程序员准确控制字节宽度，头文件`stdint.h`创造了一些新的类型别名。

（1）精确宽度类型(exact-width integer type)，保证某个整数类型的宽度是确定的。

- `int8_t`：8位有符号整数。
- `int16_t`：16位有符号整数。
- `int32_t`：32位有符号整数。
- `int64_t`：64位有符号整数。
- `uint8_t`：8位无符号整数。
- `uint16_t`：16位无符号整数。
- `uint32_t`：32位无符号整数。
- `uint64_t`：64位无符号整数。

上面这些都是类型别名，编译器会指定它们指向的底层类型。比如，某个系统中，如果`int`类型为32位，`int32_t`就会指向`int`；如果`long`类型为32位，`int32_t`则会指向`long`。

（2）最小宽度类型（minimum width type），保证某个整数类型的最小长度。比如，`int_least8_t`表示可以容纳8位有符号整数值的最小宽度的类型。

- int_least8_t
- int_least16_t
- int_least32_t
- int_least64_t
- uint_least8_t
- uint_least16_t
- uint_least32_t
- uint_least64_t

（3）最快的最小宽度类型（fast minimum width type），可以使整数计算达到最快的类型。比如，`int_fast8_t`表示对于8位有符号整数，运算速度最快的类型。

- int_fast8_t
- int_fast16_t
- int_fast32_t
- int_fast64_t
- uint_fast8_t
- uint_fast16_t
- uint_fast32_t
- uint_fast64_t

（4）可以保存指针的整数类型。`intptr_t`类型是可以存储指针（内存地址）的有符号整数，`uintptr_t`类型是无符号整数类型。

（5）最大宽度整数类型，用于存放最大的整数。`intmax_t`可以存储任何有效的有符号整数，`uintmax_t`存放无符号整数，这两个类型的宽度比`long long`和`unsigned long`更大。

下面是一个使用示例。

```c
#include <stdio.h>
#include <stdint.h>

int main(void) {
  int32_t x32;
  x32 = 45933945;
  printf("x32 = %d\n", x32);
  return 0;
}
```

上面示例中，变量`x32`声明为`int32_t`类型，可以保证是32位的宽度。

## 整数的进制

C 语言的整数默认都是十进制数，如果要表示八进制数和十六进制数，必须使用专门的表示法。

八进制使用`0`作为前缀，比如`017`、`0377`。

```c
int a = 012; // 八进制
```

十六进制使用`0x`或`0X`作为前缀，比如`0xf`、`0X10`。

```c
int a = 0x1A2B; // 十六进制
```

有些编译器使用`0b`前缀，表示二进制数。

```c
int x = 0b101010;
```

注意，不同的进制只是整数的书写方法，不会对整数的实际存储方式产生影响。所有整数都是二进制形式存储，跟书写方式无关。不同进制可以混合使用，比如`10 + 015 + 0x20`是一个合法的表达式。

`printf()`的进制相关占位符如下。

- `%d`：十进制整数。
- `%o`：八进制整数。
- `%x`：十六进制整数。
- `%#o`：显示前缀`0`的八进制整数。
- `%#x`：显示前缀`0x`的十六进制整数。
- `%#X`：显示前缀`0X`的十六进制整数。

```c
int x = 100;
printf("dec = %d\n", x); // 100
printf("octal = %o\n", x); // 144
printf("hex = %x\n", x); // 64
printf("octal = %#o\n", x); // 0144
printf("hex = %#x\n", x); // 0x64
printf("hex = %#X\n", x); // 0X64
```

## 溢出

每一种数据类型都有数值范围，如果存放的数值超出了这个范围，就会发生溢出。一般来说，编译器处理溢出的方法是，忽略多出来的二进制位，只保留剩下的位。

```c
unsigned char x = 255;
x = x + 1;

printf("%d\n", x); // 0
```

上面示例中，变量`x`加`1`，得到的结果不是`256`，而是`0`。因为`x`是`unsign char`类型，最大值是`255`（二进制`11111111`），加`1`后就发生了溢出。`256`（二进制`100000000`）的最高位`1`被丢弃，剩下的值就是`0`。

注意，发生溢出时，C 语言不会报错，程序继续运行，所以必须非常小心。

## 字面量的类型

字面量（literal）指的是代码里面直接出现的值。

```c
int x = 123;
```

上面代码中，`x`是变量，`123`就是字面量。

编译时，字面量也会写入内存，因此编译器必须为字面量指定数据类型，就像必须为变量指定数据类型一样。

一般情况下，十进制整数字面量（比如`123`）会被编译器指定为`int`类型。如果一个数值比较大，超出了`int`能够表示的范围，编译器会将其指定为`long int`。如果数值超过了`long int`，会被指定为`unsigned long`。如果还不够大，就指定为`long long`或`unsigned long long`。

小数（比如`3.14`）会被指定为`double`类型。

## 字面量后缀

有时候，编译器会将一个整数字面量分配为`int`，但是程序员希望将其分配为`long`，这时可以为该字面量加上后缀`l`或`L`，编译器就知道要把这个字面量的类型指定为`long`。建议优先使用`L`，因为小写的`l`容易跟数字`1`混淆。

```c
int x = 123L;
```

上面代码中，字面量`123`就会被指定为`long`类型。

八进制和十六进制的值，也可以使用后缀`l`和`L`指定为 Long 类型，比如`020L`和`0x20L`。

```c
int y = 0377L;
int z = 0x7fffL;
```

如果希望指定为无符号整数，可以使用后缀`u`或`U`。

```c
int x = 123U;
```

`L`和`U`可以结合使用，表示`unsigned long`类型。`L`和`U`的大小写和组合顺序无所谓。

```c
int x = 123LU;
```

对于浮点数，编译器默认指定为 double 类型，如果希望指定为其他类型，需要在小数后面添加后缀`f`（float）或`lf`（long double）。

总结一下，常用的字面量后缀有下面这些。

- `f`和`F`：`float`类型。
- `l`和`L`：对于整数是`long int`类型，对于小数是`long double`类型。
- `ll`和`LL`：Long Long 类型，比如`3LL`。
- `u`和`U`：表示`unsigned`，比如`15U`、`0377U`。

`u`还可以与其他整数后缀结合，放在前面或后面都可以，比如`10UL`、`10ULL`和`10LLU`都是合法的。

下面是一些示例。

```c
int           x = 1234;
long int      x = 1234L;
long long int x = 1234LL

unsigned int           x = 1234U;
unsigned long int      x = 1234UL;
unsigned long long int x = 1234ULL;

float x       = 3.14f;
double x      = 3.14;
long double x = 3.14L;
```

科学计数法也可以使用后缀。

```c
1.2345e+10F
1.2345e+10L
```

## 类型的自动转换

某些情况下，C 语言会自动转换某个值的类型。

### 赋值运算

赋值运算符会自动将右边的值，转成左边变量的类型。

（1）浮点数赋值给整数变量

```c
int x = 3.14;
```

上面示例中，变量`x`是整数类型，赋给它的值是一个浮点数。编译器会自动把`3.14`先转为`int`类型，再赋值给`x`，因此`x`的值是`3`。

这种自动转换会导致部分数据的丢失（`3.14`丢失了小数部分），所以最好不要跨类型赋值，尽量保证变量与所要赋予的值是同一个类型。

浮点数赋予整数变量时，C 语言直接丢弃小数部分，而不是四舍五入。

```c
int x = 12.99;
```

上面示例中，`x`等于`12`，而不是四舍五入的`13`。

（2）整数赋值给浮点数变量

整数赋值给浮点数变量时，会自动转为浮点数。

```c
float y = 12 * 2;
```

上面示例中，变量`y`的值不是`24`，而是`24.0`，因为等号右边的整数自动转为了浮点数。

（3）窄类型赋值给宽类型

字节宽度较小的整数类型，赋值给字节宽度较大的整数变量时，会发生类型提升，即窄类型自动转为宽类型。

比如，`char`或`short`类型赋值给`int`类型，会自动提升为`int`。

```c
char x = 10;
char y = 20;
int i = x + y;
```

上面示例中，`x + y`运算结果的类型是`char`，由于赋值给`int`，所以会自动提升为`int`。

（4）宽类型赋值给窄类型

字节宽度较大的类型，赋值给字节宽度较小的变量时，会发生类型降级，自动转为后者的类型。这时可能会发生溢出，导致难以预料的结果。

```c
int x = 100000;
unsigned short y = x;
printf("y is %i\n", y); // 34464
```

上面代码中，变量`x`是`int`类型，字节宽度较大；变量`y`是`short`类型，字节宽度较小。`100000`这个值对于`short`类型太大了，会发生溢出，导致变量`y`的值不是`10000`，而是截去高位后剩下的值。

### 截值

截值（Truncation）指的是数值从较宽的类型变为较窄的类型时，系统会自动截去多余的二进制位。

```javascript
char ch;
int i;

i = 321;
ch = i; // ch 的值是 65 （321 - 256）
```

上面例子中，变量`ch`的长度是8个二进制位，变量`i`是`int`类型，最少也有16个二进制位。将`i`赋值给`ch`，后者只能容纳`i`的后八位，前面多出来的二进制位被丢弃。`i`的值是`321`，二进制形式为`101000001`（共9位），保留后八位就变成了`01000001`（十进制的65，相当于字符`A`）。

浮点数赋值给整数类型的值，也会发生截值，浮点数的小数部分会被截去。

```c
double pi;
int i;

pi = 3.14159;
i = pi; // i 的值为 3
```

上面示例中，`i`等于`3`，将`pi`的小数部分截去了。

整数除法也属于截值的一种，因为得到的结果总是整数，小数部分会被截去。所以，整数除法需要特别小心，有时需要明确将运算数转为浮点数。

```c
int score;
score = 5;

score = (score / 20) * 100;
```

上面的代码，你可能觉得经过运算，`score`会等于`25`，但是实际上`score`等于`0`。这是因为`score / 20`是整除，会得到一个整数值`0`，所以乘以`100`后得到的也是`0`。

为了得到预想的结果，可以采用下一节的写法，明确将`score`转为浮点数（`(double)score / 20`），也可以将除数`20`改成`20.0`，让整除变成浮点数除法。

```c
score = (score / 20.0) * 100;
```

### 混合计算

不同类型的值进行混合计算时，必须先转成同一个类型，才能进行计算。转换规则如下：

- 整数与浮点数混合运算时，整数转为浮点数类型，与另一个运算数类型相同。
- 不同的浮点数类型混合运算时，宽度较小的类型转为宽度较大的类型，比如`float`转为`double`，`double`转为`long double`。
- 不同的整数类型混合运算时，宽度较小的类型会提升为宽度较大的类型。比如`short`转为`int`，`int`转为`long`等，有时还会将带符号的类型`signed`转为无符号`unsigned`。

```c
3 + 1.2 // 4.2
```

上面示例是`int`类型与`float`类型的混合计算，整数类型的`3`会先转成浮点数的`3.0`，再进行计算，得到`4.2`。

```c
unsigned char a = 255;
unsigned char b = 255;

if ((a + b) > 300) do_something();
```

上面示例中，`(a + b) > 300`这个表达式里面，`300`是`int`类型，字节宽度较大，所以`a + b`会自动转成`int`类型。函数`do_something()`会执行。

```c
unsigned short a = 1;
if ((a - 5) < 0) do_something();
```

上面示例中，变量`a`是`unsigned short`类型，这个类型的最小值是`0`，所以正常情况下`a - 5`等于`0`。但是，表达式`(a - 5) < 0`里面，`0`是`int`类型，所以`a - 5`会转为`int`类型，结果等于`-4`。函数`do_something()`会执行。

但是如果写成下面这样，`do_something()`就不会执行。

```c
unsigned short a = 1;
a = a - 5;
if (a < 0) do_something();
```

上面示例中，由于`unsigned short`类型的最小值是`0`，导致变量`a`运算后等于`0`，所以`do_something()`不会执行。

下面例子的执行结果，可能会出人意料。

```c
int a = -5;
if (a < sizeof(int)）
  do_something();
```

上面示例中，变量`a`是带符号整数，`sizeof(int)`是`size_t`类型，这是一个无符号整数。由于`size_t`字节宽度更大，所以`a`会自动转成无符号整数`4294967291`（转换规则是`-5`加上无符号整数的最大值，再加1），导致比较失败，`do_something()`不会执行。

最好避免无符号整数与有符号整数的混合运算。因为这时 C 语言会自动将`signed int`转为`unsigned int`，可能不会得到预期的结果。

### 函数

函数的参数和返回值，会自动转成函数定义里指定的类型。

```c
int dostuff(int, unsigned char);

char a = 42;
unsigned short b = 43;
long long int c = dostuff(a, b);
```

上面示例中，变量`a`和`b`不管原来的类型是什么，都会转成函数`dostuff()`定义的参数类型。

```c
char func(void) {
  int a = 42;
  return a;
}
```

上面示例中，应该函数内部的变量`a`是`int`类型，但是返回的值是`char`类型，因为函数定义中返回的是这个类型。

## 类型的显式转换

原则上，应该避免类型的自动转换，防止出现意料之外的结果。C 语言提供了类型的显式转换，允许手动转换类型。只要在一个值或变量的前面，使用圆括号指定类型`(type)`，就可以将这个值或变量转为指定的类型，这叫做“类型指定”（casting）。

```c
(unsigned char) ch
```

上面示例将变量`ch`转成无符号的字符类型。

```c
long int y = (long int) 10 + 12;
```

上面示例中，`(long int)`将`10`显式转为`long int`类型。这里的显示转换其实是不必要的，因为赋值运算符会自动将右边的值，转为左边变量的类型。

## sizeof 运算符

`sizeof`是 C 语言提供的一个运算符，返回某种数据类型或某个值占用的字节数量。它的参数可以是数据类型的关键字，也可以是变量名或某个具体的值。

```c
// 参数为数据类型
int x = sizeof(int);

// 参数为变量
int i;
sizeof(i);

// 参数为数值
sizeof(3.14)
```

上面的前两个示例，返回得到`int`类型占用的字节数量（通常是`4`或`8`）。第三个示例返回`8`，因为这是 double 类型占用的字节数量。

`sizeof`的返回值，C 语言只规定是无符号整数，并没有规定具体的类型。不同的系统中，返回值的类型有可能是`unsigned int`，也有可能是`unsigned long`，甚至是`unsigned long long`，对应的`printf()`占位符分别是`%u`、`%lu`和`%llu`。这样不利于程序的可移植性。

C 语言提供了一个解决方法，创造了一个类型别名`size_t`，用来统一表示`sizeof`的返回值类型。该别名定义在`stddef.h`头文件（引入`stdio.h`时会自动引入）里面，对应当前系统的`sizeof`的返回值类型，可能是`unsigned int`，也可能是`unsigned long`。

`printf()`有一个专门的占位符`%zd`用来对应`size_t`。

```c
printf("%zd\n", sizeof(int));
```

上面代码中，不管`sizeof`返回值的类型是什么，`%zd`占位符都可以正确输出。如果系统不支持`%zd`，可使用`%u`或`%lu`代替。

`sizeof`可以查看不同数据类型占用的字节数量。除了`char`类型始终占用一个字节，其他数据类型在不同的系统上，占用的字节数量可能会有所不同。

```c
int a = 999;

printf("%zd\n", sizeof(a)); // 4
printf("%zd\n", sizeof(2 + 7)); // 4
printf("%zd\n", sizeof(3.14)); // 8
```

上面示例中，整数（int 类型）占用4个字节，小数（double 类型）占用8个字节。

