# 文件操作

C 语言有一个 File 文件的数据结构，所有文件都要通过这个结构进行操作。

```c
#include <stdio.h>

int main(void) {
  FILE* fp;
  fp = fopen("hello.txt", "r");

  char c = fgetc(fp);
  printf("%c\n", c);

  fclose(fp);
}
```

- `fopen()`：打开文件，返回一个 File 指针。如果出错，返回 NULL。
- `fgetc()`：读取一个字符。
- `fclose()`：关闭文件，参数为 File 指针。

下面是一个统计文件字符数的程序。

```c
#include <stdio.h>
#include <stdlib.h> // 提供 exit() 的原型

int main(void) {
  int ch;
  FILE *fp;
  unsigned long count = 0;

  if ((fp = fopen("hello.txt", "r")) == NULL) {
    printf("Can't open file!\n");
    exit(EXIT_FAILURE);
  }

  while ((ch = getc(fp)) != EOF) {
    putc(ch, stdout);
    count++;
  }

  fclose(fp);
  printf("File has %lu characters.\n", count);

  return 0;
}
```

## fopen()

`fopen()`函数用来打开文件。该函数的原型定义在头文件`stdio.h`。

它的第一个参数是文件名，第二个参数是打开文件的模式，主要有以下模式。

- `r`：读模式。
- `w`：写模式，把现有文件的长度截为0，如果文件不存在，则创建该文件。
- `a`：写模式，在现有文件末尾添加内容，如果文件不存在，则创建该文件。
- `r+`：以更新模式打开文件（即可以读写文件）。
- `w+`：以更新模式打开文件（即可以读写文件）。如果文件存在，把现有文件的长度截为0，如果文件不存在，则创建该文件。
- `a+`：以更新模式打开文件（即可以读写文件）。如果文件存在，在现有文件末尾添加内容，如果文件不存在，则创建该文件。

除了上面模式，还有两个后缀。

- `b`：以二进制模式而不是文本模式，打开文件。比如，`rb`是打开二进制文件。注意，Unix 系统和 Linux 系统下，文件模式只有一种，加不加`b`效果都一样。
- `x`：如果文件已经存在，则打开文件失败，并且以独占模式打开，打开后不再允许其他程序或线程访问当前文件。比如，`wx`是所写的文件已经存在，就会报错。

成功打开文件以后，`fopen()`返回一个文件指针，其他函数可以用这个指针操作文件。文件指针是指向 FILE 结构的指针，FILE 是一个定义在 stdio.h 的派生类型。FILE 结构包含了操作文件的 I/O 函数所需要的文件信息。

## EOF 字符

文件结尾是一个特殊字符 EOF。可以通过这个字符判断，是否读取完文件流。

```c
#include <stdio.h>

int main(void) {
  FILE *fp;

  fp = fopen("hello.txt", "r");
  char c;

  while ((c = fgetc(fp)) != EOF)
    printf("%c", c);

  fclose(fp);
}
```

如果要一行行读取文件，可以参考下面的例子。

```c
#include <stdio.h>

int main(void) {
  FILE *fp;
  char s[1024];  // 数组必须足够大，足以放下一行
  int linecount = 0;

  fp = fopen("quote.txt", "r");

  while (fgets(s, sizeof s, fp) != NULL)
    printf("%d: %s", ++linecount, s);

  fclose(fp);
}
```

- `fgets()`：读取一行。

`fscanf()`用于解析文件，前提是知道文件的结构。

`fscanf()`函数在读取时会跳过空格，并EOF在文件结束或错误时返回。

```c
#include <stdio.h>

int main(void) {
    FILE* fp;
    char name[1024];  // Big enough for any line this program will encounter
    float length;
    int mass;

    fp = fopen("whales.txt", "r");

    while (fscanf(fp, "%s %f %d", name, &length, &mass) != EOF)
      printf("%s whale, %d tonnes, %.1f meters\n", name, mass, length);

    fclose(fp);
}
```

## 写入文件

`fgetc()`，`fgets()`和`fscanf()`用于读取文件。`fputc()`，`fputs()`和`fprintf()`用于写入文件。

```c
#include <stdio.h>

int main(void) {
  FILE* fp;
  int x = 32;

  fp = fopen("output.txt", "w");

  fputc('B', fp);
  fputc('\n', fp);
  fprintf(fp, "x = %d\n", x);
  fputs("Hello, world!\n", fp);

  fclose(fp);
}
```

上面示例产生的文件如下。

```c
B
x = 32
Hello, world!
```

如果将上面示例修改一行`fp = stdout;`，那么所有写入文件的内容，都会出现在屏幕上面。

## 二进制文件的读写

打开文件的最大区别是您必须"b"在模式下添加 。也就是说，要读取二进制文件，请以"rb"模式打开它。要写入文件，请在"wb"模式下打开它。

因为它是字节流，并且字节流可以包含NUL字符，并且NUL字符是C中的字符串结尾标记，所以人们很少使用fprintf()-and-friends函数对二进制文件进行操作。

相反，最常见的功能是fread()和fwrite()。该函数读取指定数量的字节并将其写入流。

```c
#include <stdio.h>

int main(void) {
  FILE* fp;
  unsigned char bytes[] = {5, 37, 0, 88, 255, 12};

  fp = fopen("output.bin", "wb");  // wb mode for "write binary"!

    // In the call to fwrite, the arguments are:
    //
    // * Pointer to data to write
    // * Size of each "piece" of data
    // * Count of each "piece" of data
    // * FILE*

  fwrite(bytes, sizeof(char), sizeof bytes, fp);

  fclose(fp);
}
```

上面示例写入的文件，使用十六进制编辑器打开，会是下面的内容。

```c
05 25 00 58 ff 0c
```

读取该文件。

```c
#include <stdio.h>

int main(void) {
  FILE* fp;
  unsigned char c;

  fp = fopen("output.bin", "rb"); // rb for "read binary"!

  while (fread(&c, sizeof(char), 1, fp) > 0)
    printf("%d\n", c);
}
```

运行后，得到如下结果。

```c
5
37
0
88
255
12
```
