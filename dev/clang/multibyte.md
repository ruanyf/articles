# 多字节字符

C 语言诞生的时候，只考虑了英语字符，使用7位的 ASCII 码。字符集使用一个字节表示，就可以了。但是，一旦引入非英语的语种，一个字节就不够了，字符集必须使用多个字节表示。

1994年，C 语言的标准进行了拓展，支持多字节字节，并且引入了两种支持方案。

（1）宽字符方案（wide character），每个字符使用相同的字节长度存储。

（2）多字节字符方案（multibyte character），一个字符采用一个或多个字节存储。

## 宽字符方案

类型别名`wchat_t`表示宽字符，定义在头文件`stddef.h`里面。它也是一个整数类型，长度为16位或32位，足以容纳所有字符，每个值对应相应的 Unicode 的码点。

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

此外，还有两个类型别名`char16_t`和`char32_t`，定义在头文件`uchar.h`。它们是无符号整数，使用确定的字节长度表示一个字符。当前的 C 实现如果定义了宏`__STDC_UTF_16__`，那么`char16_t`对应 UTF-16 编码；如果定义了宏`__STDC_UTF_32__`，那么`char32_t`对应 UTF-32 编码。

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

