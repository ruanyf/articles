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

## 拼接函数

char* strcat(char* s1, const char* s2);

char* strncat(char* s1, const char* s2, size_t n);

`strcat()`将第二个参数字符串，追加到第一个参数字符串的末尾，删除第一个参数字符串结尾的空字符。这两个参数都必须是以空字符结尾的字符串。`strcat()`会在拼接后的字符串末尾添加空字符。

`strncat()`的行为与`strcat()`基本类似，只是它的第三个参数会限制复制的字符个数。它也会在拼接后的字符串末尾添加空字符，并且空字符不计入第三个参数。

## 比较函数

int memcmp(const void *str1, const void *str2, size_t n);

int strcmp(const char *str1, const char *str2);

int strcoll(const char *str1, const char *str2);

int strncmp(const char *str1, const char *str2, size_t n);

size_t strxfrm(char *dest, const char *src, size_t n);

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

## 搜索函数

```c
void *memchr(const void *str, int c, size_t n);

char *strchr(const char *str, int c);

size_t strcspn(const char *str1, const char *str2);

char *strpbrk(const char *str1, const char *str2);

char *strrchr(const char *str, int c);

size_t strspn(const char *str1, const char *str2);

char *strstr(const char *haystack, const char *needle);

char *strtok(char *str, const char *delim);
```

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

如果搜索不到目标字符，`strchr()`返回空指针。

`memchr()`函数与`strchr()`类似，但`memchr()`的第三个参数`n`会限定搜索的字符数，而不是遇到空字符后停止搜索。

```c
char* p;
char str[22] = "Form follows function.";

p = memchr(str, 'f', sizeof(str));
```

`memchr()`返回一个指针，指向目标字符第一次出现的位置。如果找不到目标字符，返回空指针。

`strrchr()`的作用与`strchr()`类似，但是它是反向搜索字符。

`strpbrk()`的第二个参数给定一组字符，搜索这一组字符里面，与第一个参数字符串最早匹配的任意一个字符。

`strspn()`和`strcspn()`会返回一个表示字符串中特定位置的整数（size_t 类型）。当给定一个需要搜索的字符串，以及一组需要搜索的字符时，`strspn()`返回字符串中第一个不属于该组字符的字符的下标，而`strcspn()`返回第一个属于该组字符的字符的下标。

`strstr()`在第一个参数字符串中，搜索第二个参数字符串。

```c
char* p;
char str[] = "Form follows function.";

p = strstr(str, "fun");
```

`strstr()`返回一个指向待搜索字符串第一个出现地址的指针。如果搜索不到，则返回空指针。

## 其他函数

void* memset(void* a, int c, size_t n);

size_t strlen(const char* s);

`memset()`将一个字符的多个副本存储到指定的内存区域。

```c
memset(p, ' ', N);
```

上面示例中，p 是一个指针，指向一个长度为 N 个字节的内存区域。这个函数将该块内存区域的每个字节，都存储一个空格。

`memset()`的一个用途，就是将数组成员全部初始化为0。

```c
memset(a, 0, sizeof(a));
```

`memset()`返回它的第一个参数（指针）。

`strlen()`返回字符串的长度，结尾的空字符忽略不计。

