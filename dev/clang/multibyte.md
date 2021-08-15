# 多字节字符

C 语言诞生的时候，只考虑了英语字符，使用7位的 ASCII 码。字符集使用一个字节表示，就可以了。但是，一旦引入非英语的语种，一个字节就不够了，字符集必须使用多个字节表示。

1994年，C 语言的标准进行了拓展，支持多字节字节，并且引入了两种支持方案。

（1）宽字符方案（wide character），每个字符使用相同的字节长度存储。

（2）多字节字符方案（multibyte character），一个字符采用一个或多个字节存储。

## 字符的表示方法

- `\123`：以八进制值表示一个字符，斜杠后面需要三个数字。
- `\x4D`：以十六进制表示一个字符，`\x`后面需要两个字符。
- `\u2620`：以 Unicode 码点表示一个字符（不适用于 ASCII 字符），码点以十六进制表示，`\u`后面需要4个字符。
- `\U0001243F`：以 Unicode 码点表示一个字符（不适用于 ASCII 字符），码点以十六进制表示，`\U`后面需要8个字符。

```c
printf("A \102 C\n");
printf("A \x42 C\n");
```

上面两行都会输出`A B C`。

```c
printf("\u2022 Bullet 1\n");
printf("\U00002022 Bullet 1\n");
```

上面两行都会输出`• Bullet 1`。

C 语言本身只能解读基本字符，其它字符都要通过 Unicode 码点解读。所谓基本字符，指的是所有可打印的 ASCII 字符，但是有三个字符除外：`@`、`$`、`` ` ``。

```c
char* s = "€1.23";
printf("%s\n", s); 
```

上面示例可能不会输出正确结果，因为欧元符号`€`不属于 C 语言基本字符，编译器未必可以正确处理。

正确的写法是将`€`写成 Unicode 码点。

```c
char* s = "\u20AC1.23";
printf("%s\n", s); 
```

上面示例中，欧元符号`€`写成`\u20AC`，才能保证得到正确结果。

注意，`\u + 码点`和`\U + 码点`的写法，不能用来表示 ASCII 码字符（码点小于`0xA0`的字符），但是有三个字符除外：`0x24`（`$`），`0x40`（`@`）和`0x60`（`` ` ``）。

C 语言的字符串函数只针对单字节字符有效，对于多字节字符会返回错误的结果。

- strlen() 将返回字符串的字节数，而不是字符数。
- 字符串函数无法正常工作：strtok()、 strchr()（改为使用 strstr()）、strspn()、toupper()、tolower()、isalpha() 等。
- 使用 malloc() 为字符串分配空间时，或声明一个字符数组时，不能按字符数计算，而要按照字节数计算。

```c
char* s = "\u20AC1.23";  // €1.23
printf("%zu\n", strlen(s));  // 7
```

上面示例中，字符串`s`包含4个字符，但是`strlen()`返回的结果却是7，因为这是`s`的字节数，其中欧元符号`€`一个字符要占用3个字节储存。

## Unicode

Unicode 编码目前的码点范围是 U+0000 到 U+10FFFF，一共需要21个二进制位空间。

完整表达整个 Unicode 字符集，至少需要三个字节。但是，并不是所有文档都需要那么多字符，比如对于只需要 ASCII 码就够用的英语文档，文件体积会大出三倍。

为了适应不同的使用需求，Unicode 标准委员会提供了三种不同的编码方法，表示 Unicode 码点。

- UTF-8：使用1个到4个字节，表示一个码点。
- UTF-16：对于基本平面的字符（U+0000 到 U+FFFF），使用2个字节，表示一个码点。其他字符使用4个字节。
- UTF-32：统一使用4个字节，表示一个码点。

其中，UTF-8 的使用最为广泛，因为只使用一个字节的编码时（U+0000 到 U+007F），它跟 ASCII 的编码方式是一样的。

## 宽字符方案

宽字符是一种多字节字符的处理方法，可以看成使用多个单字节字符，表示一个多字节字符，因此本质上时字符串的数组。

宽字符有一个类型别名`wchat_t`类型，定义在`wchar.h`里面。

```c
#include <wchar.h>
```

定义在头文件`stddef.h`里面。

`wchar_t`属于整数类型（可能是有符号的，也可能是无符号的，由当前实现决定），长度为16位或32位，足以容纳当前系统的所有字符，每个值对应相应的 Unicode 的码点。

```c
wchar_t wc = '\x03b1';
```

上面示例中，宽字符变量`wc`就是希腊字母 alpha。`\x03b1`是该字符的16进制码点。

C 语言允许在字符和字符串前面，添加`L`前缀，表示宽字符。

```c
// 宽字符
L'a'

// 宽字符串
L"abc"
```

输出宽字符时，`printf()`的占位符使用`%ls`代表宽字符字符串，`%lc`代表单个宽字符。

```c
wchar_t *s = L"Hello, world!";
wchar_t c = L'B';
    
printf("%ls %lc\n", s, c);
```

下面的函数可以用于多字节字符与宽字符的转换。

- mbtowc()	将多字节字符转换为宽字符。
- wctomb()	将宽字符转换为多字节字符。
- mbstowcs()	将多字节字符串转换为宽字符串。
- wcstombs()	将宽字符串转换为多字节字符串。

下面是一个例子。

```c
#include <stdio.h>
#include <stdlib.h>
#include <wchar.h>
#include <string.h>
#include <locale.h>

int main(void)
{
    // Get out of the C locale to one that likely has the euro symbol
    setlocale(LC_ALL, "");

    // Original multibyte string with a euro symbol (Unicode point 20ac)
    char *mb_string = "The cost is \u20ac1.23";  // €1.23
    size_t mb_len = strlen(mb_string);

    // Wide character array that will hold the converted string
    wchar_t wc_string[128];  // Holds up to 128 wide characters

    // Convert the MB string to WC; this returns the number of wide chars
    size_t wc_len = mbstowcs(wc_string, mb_string, 128);

    // Print result--note the %ls for wide char strings
    printf("multibyte: \"%s\" (%zu bytes)\n", mb_string, mb_len);
    printf("wide char: \"%ls\" (%zu characters)\n", wc_string, wc_len);
}
```

运行上面的程序，会得到下面的结果。

```bash
multibyte: "The cost is €1.23" (19 bytes)
wide char: "The cost is €1.23" (17 characters)
```

上面程序的`mbstowcs()`用于将第二个参数的多字节字符串，转为第一个参数的宽字符串。

第一行表示多字节字符串占19个字节。第二行表示宽字符串有17个字符。

```c
mbstowcs(wc_string, mb_string, 128);
```

`mbstowcs()`返回宽字符串的长度（以字符为单位）。而且，事实上，它有一个特殊的模式，它只返回给定多字节字符串的字符长度：您只需传递NULL到目标，以及0要转换的最大字符数（该值被忽略）。

```c
setlocale(LC_ALL, "");
    
// The following string has 7 characters
size_t len_in_chars = mbstowcs(NULL, "天气不错", 0);
    
printf("%zu\n", len_in_chars);
```

上面示例是计算多字节字符串的字符个数。

同样的，将宽字符串转为多字节字符串，就要使用`wcstombs()`。

- wcslen()：宽字符串长度。
- fwprintf()：宽字符格式化输出到文件流。

下面输入输出函数通常包括在`stdio.h`和`wchar.h`。

- wprintf()	格式化的控制台输出。
- wscanf()	格式化的控制台输入。
- getwchar()	基于字符的控制台输入。
- putwchar()	基于字符的控制台输出。
- fwprintf()	格式化文件输出。
- fwscanf()	格式化文件输入。
- fgetwc()	基于字符的文件输入。
- fputwc()	基于字符的文件输出。
- fgetws()	基于字符串的文件输入。
- fputws()	基于字符串的文件输出。
- swprintf()	格式化字符串输出。
- swscanf()	格式化字符串输入。
- vfwprintf()	可变格式的文件输出。
- vfwscanf()	可变格式的文件输入。
- vswprintf()	可变格式的字符串输出。
- vswscanf()	可变格式的字符串输入。
- vwprintf()	可变格式的控制台输出。
- vwscanf()	可变格式的控制台输入。
- ungetwc()	将宽字符推回到输出流上。
- fwide()	获取或设置流多字节/宽方向。

宽字符类型转换函数。

通常包括<wchar.h>这些。

- wcstod()	将字符串转换为double.
- wcstof()	将字符串转换为float.
- wcstold()	将字符串转换为long double.
- wcstol()	将字符串转换为long.
- wcstoll()	将字符串转换为long long.
- wcstoul()	将字符串转换为unsigned long.
- wcstoull()	将字符串转换为unsigned long long.

字符串和内存复制函数

通常包括<wchar.h>这些。

- wcscpy()	复制字符串。
- wcsncpy()	复制字符串，长度限制。
- wmemcpy()	复制记忆。
- wmemmove()	复制可能重叠的内存。
- wcscat()	连接字符串。
- wcsncat()	连接字符串，长度限制。



此外，还有两个类型别名`char16_t`和`char32_t`，定义在头文件`uchar.h`。它们是无符号整数，使用确定的字节长度表示一个字符。当前的 C 实现如果定义了宏`__STDC_UTF_16__`，那么`char16_t`对应 UTF-16 编码；如果定义了宏`__STDC_UTF_32__`，那么`char32_t`对应 UTF-32 编码。

```c
// wchar_t 类型
L'a'

// char16_t 类型
u'a'

// char32_t 类型
U'a'

// UTF-8 类型
u8"ABC"
```

使用 utf-8 的前提是当前系统必须支持 utf-8 编码。否则，要用`\u`和`\U`。

```
char *s = u8"€123";
```

由于 C 语言的标准环境只支持基本字符，所以使用 Unicode 之前最好用`setlocale()`切换到本地环境。

```c
setlocale(LC_ALL, "");
```

或者在本地机器上明确指定 UTF-8 语言环境，并这样明确设置它。

```c
setlocale(LC_ALL, "en_US.UTF-8"); 
```

如果当前系统使用 UTF-16 或 UTF-32 编码，则可以使用`u`或`U`前缀。

```c
char16_t *s = u"Hello, world!";
char16_t c = u'B';
    
char32_t *t = U"Hello, world!";
char32_t d = U'B';
```

这些前缀这些值是以 UTF-16 还是 UTF-32 存储的？取决于实施。

但是你可以测试看看它们是否是。如果宏__STDC_UTF_16__or__STDC_UTF_32__被定义为 (to 1)，则表示这些类型分别包含 UTF-16 或 UTF-32。

UTF-16、UTF-32 与 多字节字符串之间的互相转换。

mbrtoc16()	将多字节字符转换为char16_t字符。
mbrtoc32()	将多字节字符转换为char32_t字符。
c16rtomb()	将char16_t字符转换为多字节字符。
c32rtomb()	将char32_t字符转换为多字节字符。

## 多字节字符方案

在这个方案中，每个字符的字节长度都不等，可以是一个字节，也可以是多个字节，对应 UTF-8 编码。UTF-8 字符使用1个到4个字节，表示一个字符。

- `MB_LEN_MAX`：任意支持地区的最大字节长度，定义在`limits.h`。
- `MB_CUR_MAX`：当前地区的最大字节长度，总是小于或等于`MB_LEN_MAX`，定义在`stdlib.h`。

## 转换方法

`wctomb()`函数（wide character to multibyte）用于将宽字符转为多字节字符。

```c
int wctomb(char* s, wchar_t wc);
```

```c
wchar_t wc = L'\x3B1';     // Greek lowercase alpha, α
char mbStr[10] = "";
int nBytes = 0;
nBytes = wctomb( mbStr, wc );
if( nBytes < 0)
    puts("Not a valid multibyte character in your locale.");
```

`wctomb()`的第一个参数是存储转换后字符的多字节数组，第二个参数是需要转换的宽字符。返回值是多字节字符存储所需的字节数量，这里是 2。

## mbtowc()

```c
int mbtowc(wchar_t* pwc, const char* s, size_t n);
```

## mblen()

```c
int mblen(const char* s, size_t n);
```

## 通用字符表示法

C 语言支持使用`\uXXXX`或`\uXXXXXXXX`，表示一个 Unicode 字符。小写的`u`后面是4位的16进制数，大写的`U`后面是8位的十六进制数。

