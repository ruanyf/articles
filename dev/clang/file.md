# 文件操作

## C 语言的文件概念

C程序把输入看作是字节流，输入流来源于文件、输入设备（如键盘），或者甚至是另一个程序的输出。类似地，C程序把输出也看作是字节流，输出流的目的地可以是文件、视频显示等。

C 如何解释输入流或输出流取决于所使用的输入/输出函数。程序可以不做任何改动地读取和存储字节，或者把字节依次解释成字符，随后可以把这些字符解释成普通文本以用文本表示数字。

如果要在不损失精度的前提下保存或恢复数值数据，请使用二进制模式以及fread()和fwrite()函数。如果打算保存文本信息并创建能在普通文本编辑器查看的文本，请使用文本模式和函数（如getc()和fprintf()）。

## 文件指针

要访问文件，必须创建文件指针（类型是`FILE*`）并把指针与特定文件名相关联。随后的代码就可以使用这个指针（而不是文件名）来处理该文件。

C 语言提供一个 File 文件的数据结构，所有文件都要通过这个结构进行操作。

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

文件操作的原理是：第一步，fopen()函数不仅打开一个文件，还创建了一个缓冲区（在读写模式下会创建两个缓冲区）以及一个包含文件和缓冲区数据的结构。另外，fopen()返回一个指向该结构的指针，以便其他函数知道如何找到该结构。由于存在缓存区，一般说fopen()函数“打开一个流”。如果以文本模式打开该文件，就获得一个文本流；如果以二进制模式打开该文件，就获得一个二进制流。

这个结构通常包含一个指定流中当前位置的文件位置指示器。除此之外，它还包含错误和文件结尾的指示器、一个指向缓冲区开始处的指针、一个文件标识符和一个计数（统计实际拷贝进缓冲区的字节数）。

第二步是调用一个定义在stdio.h中的输入函数，如fscanf()、getc()或 fgets()。一调用这些函数，文件中的数据块就被拷贝到缓冲区中。缓冲区的大小因实现而异，一般是512字节或是它的倍数，如4096或16384（随着计算机硬盘容量越来越大，缓冲区的大小也越来越大）。

在初始化结构和缓冲区后，输入函数按要求从缓冲区中读取数据。在它读取数据时，文件位置指示器被设置为指向刚读取字符的下一个字符。由于stdio.h系列的所有输入函数都使用相同的缓冲区，所以调用任何一个函数都将从上一次函数停止调用的位置开始。

第三步，当输入函数发现已读完缓冲区中的所有字符时，会请求把下一个缓冲大小的数据块从文件拷贝到该缓冲区中。以这种方式，输入函数可以读取文件中的所有内容，直到文件结尾。函数在读取缓冲区中的最后一个字符后，把结尾指示器设置为真。于是，下一次被调用的输入函数将返回EOF。

输出函数以类似的方式把数据写入缓冲区。当缓冲区被填满时，数据将被拷贝至文件中。

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

ANSI C提供两种文件打开模式：二进制和文本。以二进制模式打开文件时，可以逐字节读取文件；以文本模式打开文件时，会把文件内容从文本的系统表示法映射为C表示法。对于UNIX和Linux系统，这两种模式完全相同。

成功打开文件以后，`fopen()`返回一个文件指针，其他函数可以用这个指针操作文件。文件指针是指向 FILE 结构的指针，FILE 是一个定义在 stdio.h 的派生类型。FILE 结构包含了操作文件的 I/O 函数所需要的文件信息。

Linux 系统默认提供三个已经打开的文件指针，指向系统的输入和输出。

- `stdin`（标准输入）：键盘。
- `stdout`（标准输出）：显示器。
- `stderr`（标准错误）

## fclose()

`fclose()`用来关闭已经使用`fopen()`打开的文件。它接受一个文件指针`fp`作为参数（`fclose(fp)`）。

如果成功关闭文件，`fclose()`函数返回`0`，否则返回 EOF（比如磁盘已满，或者出现 I/O 错误）。

```c
if (fclose(fp) != 0)
  printf("Something wrong.");
```

## getc()

`getc()`与`getchar()`类似，但是用来读取文件。

```c
// 从 fp 指向的文件读取一个字符
ch = get(fp);

// 从标准输入读取一个字符
ch = getc(fp);
```

## putc()

`putc()`与`putchar()`类似，但用于写入文件。它需要两个参数，第一个参数是待写入的字符，第二个参数是文件指针。

```c
// 把字符 ch 写入 fp 指定的文件
putc(ch, fp);
```

如果文件指针是`stdout`（标准输出），就等同于`putchar()`。

```c
putc(ch, fp);
// 等同于
putchar(ch);
```

## EOF 字符

C 语言规定，各种函数到达文件结尾处，要返回一个特殊字符 EOF。程序可以通过这个字符判断，是否读取完了文件流。

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

## fprint()

`fprint()`的用法与`printf()`类似，用于向文件写入内容。它的第一个参数必须是一个文件指针。

```c
fprintf(stderr, "Input %s is invalid\n", argv[0]);
```

上面示例向标准错误`stderr`输出一行提示。

## fscanf()

`fscanf()`用于按照给定的模式，从文件中读取内容，用法跟`scanf()`类似。它的第一个参数必须是文件指针。

由于`fscanf()`可以连续读取，所以通常放在循环里面。

```c
while(fscanf(fp, "%s", words) == 1)
  puts(words);
puts("Done!");
```

## rewind()

`rewind()`函数可以让程序指针回到文件开始处，它接受一个文件指针作为参数。

```c
rewind(fp);
```

## fgets()

`fgets()`用于从文件读取指定长度的字符串。

```c
fgets(char* buf, int STLEN, File* fp);
```

它的第一个参数`buf`是一个字符串变量，用于存放读取的内容。第二个参数`STLEN`指定读取的长度，第三个参数是一个 FILE 指针。

`fgets()`读取到第一个换行符之后，或者文件结尾，或者读取 STLEN - 1 个字符，然后会在末尾添加一个空字符，使之成为一个字符串。如果`fgets()`在读到字符上限之前已读完一整行，会把表示行结尾的换行符放在空字符前面。

`fgets()`函数在遇到 EOF 时将返回 NULL，可以利用这一机制检查是否到达文件结尾；如果未遇到 EOF 则之前返回传给它的字符串指针。

## fputs()

`fputs()`用于向文件写入字符串，和 puts()函数不同，它在写入字符串时不会在其末尾添加换行符。这是因为`fgets()`保留了换行符，所以`fputs()`就不添加了。

它接受两个参数，第1个参数是字符串指针变量，第2个参数是文件指针。

```c
fputs(buf, fp);
```

## fseek()

通常，输入函数getc()、fgets()、fscanf()和fread()都从文件开始处按顺序读取文件。然而， fseek()和ftell()函数让程序可以随机访问文件中的任意位置。

fseek()有3个参数，返回一个 int 类型的整数。

第1个参数是 FILE 指针，指向一个已经使用`fopen()`打开的文件。

第2个参数是偏移量（offset），表示从起始点开始要移动的距离。该参数必须是一个 long 类型的值，可以为正（前移）、负（后移）或 0 （保持不动）。

第3个参数是模式，该参数确定起始点。该参数是一个常量，可以取以下三个值。

- SEEK_SET 文件开始处
- SEEK_CUR 当前位置
- SEEK_END 文件末尾

```c
// 定位到文件开始处
fseek(fp, 0L, SEEK_SET);

// 定位到文件末尾
fseek(fp, 0L, SEEK_END);

// 从当前位置前移2个字节
fseek(fp, 2L, SEEK_CUR);

// 定位到文件第10个字节
fseek(fp, 10L, SEEK_SET);

// 定位到文件倒数第10个字节
fseek(fp, -10L, SEEK_END);
```

如果一切正常，`fseek()`的返回值为0；如果出现错误（如试图移动的距离超出文件的范围），其返回值为`-1`。

## ftell()

`ftell()`返回一个 long 类型的浮点数，表示当前指针所在的位置。文件的第1个字节到文件开始处的距离是0，以此类推。

`ftell()`主要用于 Unix 系统的文件，其他系统的二进制文件也可以用。非 Unix 系统的文本文件与 Unix 有很大不同，导致从文件开始处统计的字节数成为一个毫无意义的值。

```c
fseek(fp, 0L, SEEK_END);
last = ftell(fp);
```

上面命令先将指针定位到文件结尾，然后得到文件从开始处到结尾的字节数。

下面代码用来逆向输出文件的所有字节。

```c
for (count = 1L; count <= last; count++) {
  fseek(fp, -count, SEEK_END);
  ch = getc(fp);
}
```

## fgetpos()，fsetpos()

fseek()和 ftell()潜在的问题是，它们都把文件大小限制在 long 类型能表示的范围内。也许 20亿字节看起来相当大，但是随着存储设备的容量迅猛增长，文件也越来越大。鉴于此，ANSI C新增了两个处理较大文件的新定位函数：fgetpos()和 fsetpos()。这两个函数不使用 long 类型的值表示位置，它们使用一种新类型：fpos_t（代表file position type，文件定位类型）。

fpos_t类型不是基本类型，它根据其他类型来定义，它可以在文件中指定一个位置,


```c
int fgetpos(FILE * restrict stream, fpos_t * restrict pos);
```

调用该函数时，它把fpos_t类型的值放在pos指向的位置上，该值描述了文件中的一个位置。如果成功，fgetpos()函数返回0；如果失败，返回非0。

fsetpos()函数的原型如下：

```c
int fsetpos(FILE *stream, const fpos_t *pos);
```

调用该函数时，使用pos指向位置上的fpos_t类型值来设置文件指针指向该值指定的位置。如果成功，fsetpos()函数返回0；如果失败，则返回非0。fpos_t类型的值应通过之前调用fgetpos()获得。

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

## fwrite()

size_t fwrite(const void * restrict ptr, size_t size, size_t nmemb,FILE * restrict fp);

fwrite()函数把二进制数据写入文件。size_t是根据标准C类型定义的类型。指针ptr是待写入数据块的地址。size表示待写入数据块的大小（以字节为单位），nmemb表示待写入数据块的数量。和其他函数一样， fp指定待写入的文件。例如，要保存一个大小为256字节的数据对象（如数组），可以这样做：

```c
char buffer[256];

fwrite(buffer, 256, 1, fp);
```

以上调用把一块256字节的数据从buffer写入文件。

另举一例，要保存一个内含10个double类型值的数组。

```c
double earnings[10];

fwrite(earnings, sizeof(double), 10, fp);
```

以上调用把earnings数组中的数据写入文件，数据被分成10块，每块都是double的大小。

注意fwrite()原型中的const void * restrict ptr声明。fwrite()的一个问题是，它的第1个参数不是固定的类型。在ANSI C函数原型中，这些实际参数都被转换成指向void的指针类型，这种指针可作为一种通用类型指针。

fwrite()函数返回成功写入项的数量。正常情况下，该返回值就是 nmemb，但如果出现写入错误，返回值会比nmemb小。

## fread()

size_t fread(void * restrict ptr, size_t size, size_t nmemb,FILE * restrict fp);

fread()函数接受的参数和fwrite()函数相同。在fread()函数中，ptr是待读取文件数据在内存中的地址，fp指定待读取的文件。该函数用于读取被fwrite()写入文件的数据。例如，要恢复上例中保存的内含10个double类型值的数组，可以这样做：

double earnings[10];

fread(earnings, sizeof (double), 10, fp);

该调用把10个double大小的值拷贝进earnings数组中。

fread()函数返回成功读取项的数量。正常情况下，该返回值就是nmemb，但如果出现读取错误或读到文件结尾，该返回值就会比nmemb小。

## feof()，ferror()

```c
int feof(FILE *fp)

int ferror(FILE *fp)
```

如果标准输入函数返回 EOF，则通常表明函数已到达文件结尾。然而，出现读取错误时，函数也会返回EOF。feof()和ferror()函数用于区分这两种情况。当上一次输入调用检测到文件结尾时，`feof()`函数返回一个非零值，否则返回0。当读或写出现错误，`ferror()`函数返回一个非零值，否则返回0。

