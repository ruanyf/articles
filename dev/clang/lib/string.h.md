# string.h

`string.h`主要定义了很多字符串处理函数。

复制函数

void* memcpy(void* s1, const void* s2, size_t n);

void* memmove(void* s1, const void* s2, size_t n);

char* strcpy(char* s1, const char* s2);

char* strncpy(char* s1, const char* s2, size_t n);

这一类函数将字符串（字节）从一处内存复制到另一处。每个函数的第一个参数是目的内存的地址，第二个参数是源地址。所以函数都会返回第一个参数（指向目的内存的指针）。

`memcpy()`从源地址向目的地址复制 n 个字符（第三个参数），源地址和目的地址不能有重叠。

`memmove()`的行为与`memcpy()`类似，并且允许源地址与目的地址有重叠。

`strcpy()`将一个字符串从源地址复制到目的地址，包含结尾的空字符。`strncpy()`的行为与`strcpy()`类似，但是限定最多只能复制 n 个字符（第三个参数）。这两个函数的源地址和目的地址也不能有重叠。

`memcpy()`、`memmove()`、`strncpy()`都不要求字符串结尾有空字符，对任意内存块都可以工作。`strcpy()`会持续复制字符，直到遇到一个空字符为止，因此`strcpy()`仅适用于以空字符结尾的字符串。

下面是`memcpy()`拷贝 Struct 结构的例子。

```c
struct antelope my_antelope;
struct antelopy my_clone;

// ...

memcpy(&my_clone, &my_antelope, sizeof my_antelope);
```

上面示例中，将`my_antelope`的内存数据拷贝到`my_clone`所在的内存，这样就形成了一份一模一样的 Struct 拷贝。由于 Struct 类型的变量名不是指针，所以需要在变量名之前添加`&`运算符。


## 拼接函数

char* strcat(char* s1, const char* s2);

char* strncat(char* s1, const char* s2, size_t n);

`strcat()`将第二个参数字符串，追加到第一个参数字符串的末尾，删除第一个参数字符串结尾的空字符。这两个参数都必须是以空字符结尾的字符串。`strcat()`会在拼接后的字符串末尾添加空字符。

`strncat()`的行为与`strcat()`基本类似，只是它的第三个参数会限制复制的字符个数。它也会在拼接后的字符串末尾添加空字符，并且空字符不计入第三个参数。

## 比较函数

```c
int memcmp(const void *str1, const void *str2, size_t n);

int strcmp(const char *str1, const char *str2);

int strcoll(const char *str1, const char *str2);

int strncmp(const char *str1, const char *str2, size_t n);

size_t strxfrm(char *dest, const char *src, size_t n);
```

`memcmp()`、`strcmp()`、`strncmp()`比较两个字符数组的内容。`strcoll()`、`strxfrm()`在考虑地区差异时使用。

`memcmp()`、`strcmp()`、`strncmp()`这三个函数，将第一个参数字符串的每个字符，逐一与第二个参数字符串的每个字符比较，都是在遇到第一个不匹配的字符时返回。根据结束比较时，第一个参数字符串的字符是小于、等于、大于第二个参数字符串中的字符，而相应地返回负整数、0或正整数。

`memcpy()`包括第三个参数`n`，限制参与比较的字符个数，而且不关心空字符。

`strcmp()`会在任意一个字符数组中遇到空字符时停止比较，因此只能用来比较以空字符结尾的字符串。

`strncm()`结合了`memcpy()`和`strcmp()`的行为特点，当比较的字符数达到`n`个，或在其中任意一个字符串中遇到空字符时停止比较。

```c
char s1[] = {'b', 'i', 'g', '\0', 'c', 'a', 'r'};
char s2[] = {'b', 'i', 'g', '\0', 'c', 'a', 't'};

if (memcmp(s1, s2, 3) == 0) // true
if (memcmp(s1, s2, 4) == 0) // true
if (memcmp(s1, s2, 7) == 0) // false

if (strcmp(s1, s2) == 0) // true

if (strncmp(s1, s2, 3) == 0) // true
if (strncmp(s1, s2, 4) == 0) // true
if (strncmp(s1, s2, 7) == 0) // true
```

`memcmp()`比较第一个参数与第二个参数的指定字节。如果第一个参数较大，则返回一个大于0的值；如果两个参数相等，则返回0；如果第一个参数较小，则返回小于0的值。

```c
char s1[] = {'b', 'i', 'g', '\0', 'c', 'a', 'r'};
char s2[] = {'b', 'i', 'g', '\0', 'c', 'a', 't'};

if (memcmp(s1, s2, 3) == 0) // true
if (memcmp(s1, s2, 4) == 0) // true
if (memcmp(s1, s2, 7) == 0) // false
```

## 搜索函数

```c
void *memchr(const void *str, int c, size_t n);

char *strchr(const char *str, int c);

size_t strcspn(const char *str1, const char *str2);

char *strpbrk(const char *str1, const char *str2);

char *strrchr(const char *str, int c);

size_t strspn(const char *str1, const char *str2);

char *strstr(const char *haystack, const char *needle);

char* strtok(char* str, const char* delim);
```

**strchr()**

`strchr()`在字符串中搜索特定字符。

```c
char* p;
char str[] = "Form follows function.";

p = strchr(str, 'f');
```

`strchr()`会返回一个指针，指向`str`中第一个目标字符。如果想要多次搜索目标字符，可以继续使用下面的语句。

```c
p = strchr(p + 1, 'f');
```

如果搜索不到目标字符，`strchr()`返回空指针 NULL。

```c
if (strchr(string, character) == NULL) {
  printf("not found\n");
}
```

**strrchr()**

`strrchr()`的用法与`strchr()`类似，但是它是反向搜索字符，返回一个指针，指向最后一个出现的目标字符。

```c
const char* string = "A zoo has many animals including zebras";
int c = 'z';

printf("%s\n", strrchr(string, c)); // "zebras"
```

上面示例中，待搜索字符串里面最后一个出现的字符`z`，是出现在`zebras`里面。

**memchr()**

`memchr()`函数用来在一段内存里面搜索特定字节。它的第一个参数是一个指针，指向一个内存地址，第二个参数是目标字节值（即一个字符），第三个参数限定搜索的字节数。

如果搜索到了，就返回一个指针，指向该字节第一次出现的位置，否则返回空指针 NULL。

```c
char str[22] = "Form follows function.";

// 输出 follows function.
printf("%s\n", memchr(str, 'f', sizeof(str)));
```

上面示例中，`memchr()`返回字符数组`str`里面字符`f`首次出现的位置。返回结果作为字符串输出时，会一直输出到字符串结尾符号`\0`为止，所以结果就是“follows function.”。

**strpbrk()**

`strpbrk()`的第一个参数是待搜索字符串，第二个参数是一组目标字符，返回一个指针，指向待搜索字符串里面，第一个与任一个目标字符相匹配的字符。

```c
const char* string1 = "This is a test";
const char* string2 = "beware";

printf("%c\n", *strpbrk(string1, string2)); // 'a'
```

上面示例中，`strpbrk()`返回一个指针，指向待搜索字符串里面第一个出现的目标字符`a`。

**`strspn()`，`strcspn()`**

`strspn()`和`strcspn()`都接受两个参数，第一个参数是待搜索的字符串，第二个参数是一组目标字符组成的字符串。`strspn()`返回待搜索字符串中，第一个不属于目标字符的字符的位置，而`strcspn()`返回第一个属于目标符的字符的位置，类型都是 size_t 整数。

```c
const char* string1 = "The value is 3.14159";
const char* string2 = "1234567890";

strcspn(string1, string2) // 13
strspn(string1, string2) // 0
```

上面示例中，待搜索字符串是“The value is 3.14159”，它的第一个数字字符出现在13号位置，第一个非数字字符出现在0号位置。

如果待搜索字符串不包含目标字符，`strcspn()`返回第一个参数的长度。如果待搜索字符串不包含目标字符以外的字符，`strspn()`返回第一个参数的长度。

**strstr()**

`strstr()`在第一个参数字符串中，搜索第二个参数字符串。它返回一个指针，指向待搜索字符串里面，第一个出现的目标字符串。如果搜索不到，则返回空指针 NULL。

```c
char str[] = "Form follows function.";
printf("%s\n", strstr(str, "fun")); // "function."
```

上面示例中，待搜索字符串里面第一个出现的`fun`，是在`function`里面。`strstr()`返回的指针会指向`function`的起首字符`f`。

**strtok()**

`strtok()`用来将一个字符串按照指定的分隔符（delimiter），分解成一系列词元（tokens）。

它接受两个参数，第一个是待搜索的字符串，第二个参数是分隔符。它返回一个指针，指向分解出来的第一个词元，并将词元结束之处的分隔符替换成字符串结尾符号`\0`。如果要遍历所有词元，必须使用循环，参考下面的例子。

```c
#include <stdio.h>
#include <string.h>

int main(void) {
  char string[] = "This is a sentence with 7 tokens";
  char* tokenPtr = strtok(string, " ");

  while (tokenPtr != NULL) {
    printf("%s\n", tokenPtr);
    tokenPtr = strtok(NULL, " ");
  }
}
```

上面代码的输出结果如下。

```bash
This
is
a
sentence
with
7
tokens
```

`strtok()`的第一个参数如果是 NULL，则表示从上一次`strtok()`分解结束的位置，继续往下分解。

注意，`strtok()`会修改原始字符串，将所有分隔符都替换成字符串结尾符号`\0`。因此，最好生成一个原始字符串的拷贝，然后对这个拷贝执行`strtok()`。

## 其他函数

```c
void* memset(void* a, int c, size_t n);

size_t strlen(const char* s);
```

**memset()**

`memset()`将一段内存全部格式化为指定的字符值。它的第一个参数是一个指针，指向内存开始位置，第二个参数是待写入的字符值，第三个参数是一个整数，表示待格式化的字节数。

```c
memset(p, ' ', N);
```

上面示例中，p 是一个指针，指向一个长度为 N 个字节的内存区域。`memset()`将该块内存区域的每个字节，都存储一个空格字符。

下面是另一个例子。

```c
char string1[15] = "BBBBBBBBBBBBBB";

// 输出 bbbbbbbBBBBBBB
printf("%s\n", (char*) memset(string1, 'b', 7));
```

`memset()`的一个重要用途，就是将数组成员全部初始化为0。

```c
memset(arr, 0, sizeof(arr));
```

`memset()`的返回值是第一个参数（指针）。

**strerror()**

`strerror()`函数返回特定错误的说明字符串。

```c
char *strerror(int errornum);
```

它的参数是错误的编号，由`errno.h`定义。返回值是一个指向说明字符串的指针。

```c
// 输出 No such file or directory
printf("%s\n", strerror(2));
```

上面示例输出2号错误的说明字符“No such file or directory“。

**strlen()**

`strlen()`接受一个字符串作为参数，返回该字符串的长度，结尾的空字符忽略不计。

## 其他字符串函数

char *strchr(const char * s, int c);

如果s字符串中包含c字符，该函数返回指向s字符串首位置的指针（末尾的空字符也是字符串的一部分，所以在查找范围内）；如果在字符串s中未找到c字符，该函数则返回空指针。

char *strpbrk(const char * s1, const char * s2);

如果 s1 字符中包含 s2 字符串中的任意字符，该函数返回指向 s1 字符串首位置的指针；如果在s1字符串中未找到任何s2字符串中的字符，则返回空字符。

char *strrchr(const char * s, int c);该函数返回s字符串中c字符的最后一次出现的位置（末尾的空字符也是字符串的一部分，所以在查找范围内）。如果未找到c字符，则返回空指针。

char *strstr(const char * s1, const char * s2);

该函数返回指向s1字符串中s2字符串出现的首位置。如果在s1中没有找到s2，则返回空指针。


