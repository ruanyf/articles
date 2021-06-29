# 文件操作

## 文件指针

C 语言定义了一个 FILE 数据结构，记录了操作文件的所需要的信息。该结构定义在头文件`stdio.h`，系统提供的文件操作函数，都要通过这个结构进行操作。每操作一个文件，就要定义一个指向该文件的 FILE 指针。

```c
FILE* fp1;
```

上面示例定义了一个 FILE 指针`fp1`。

要访问文件，必须创建文件指针（类型是`FILE*`）并把指针与特定文件名相关联。随后的代码就可以使用这个指针（而不是文件名）来处理该文件。

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

`fopen()`函数用来打开文件。所有文件操作的第一步，都是使用`fopen()`打开这个文件。该函数的原型定义在头文件`stdio.h`。

```c
FILE* fopen(char* filename, char* mode);
```

它接受两个参数。第一个参数是文件名(可以包含路径)，第二个参数是模式字符串，指定对文件执行的操作，比如`r`表示读取文件。

```c
fp = fopen("in.dat", "r");
```

成功打开文件以后，`fopen()`返回一个 FILE 指针，其他函数可以用这个指针操作文件。如果无法打开文件（比如文件不存在或没有权限），会返回空指针 NULL。所以，执行`fopen()`以后，最好判断一下，有没有执行成功。

```c
fp = fopen("hello.txt", "r");

if (fp == NULL) {
  printf("Can't open file!\n");
  exit(EXIT_FAILURE);
}
```

上面示例中，如果`fopen()`返回一个空指针，程序就会报错。

`fopen()`的模式字符串有以下几种。

- `r`：读模式，只用来读取数据。如果文件不存在，返回 NULL 指针。
- `w`：写模式，只用来写入数据。如果文件存在，文件长度会被截为0，然后再写入；如果文件不存在，则创建该文件。
- `a`：写模式，只用来在文件尾部追加数据。如果文件不存在，则创建该文件。
- `r+`：读写模式。如果文件存在，指针指向文件开始处，可以在文件头部添加数据。如果文件不存在，返回 NULL 指针。
- `w+`：读写模式。如果文件存在，文件长度会被截为0，然后再写入数据。这种模式实际上读不到数据，反而会擦掉数据。如果文件不存在，则创建该文件。
- `a+`：读写模式。如果文件存在，指针指向文件结尾，可以在现有文件末尾添加内容。如果文件不存在，则创建该文件。

上面的模式，还可以添加后缀。

- `b`：以二进制模式（而不是文本模式）打开文件。比如，`rb`是读取二进制数据，`wb`是写入二进制数据。
- `x`：独占模式（exclusive）。如果文件已经存在，则打开文件失败；否则新建文件，打开后不再允许其他程序或线程访问当前文件。比如，`wx`表示以独占模式写入文件，如果文件已经存在，就会打开失败。

二进制模式和文本模式的区别是，以二进制模式打开文件时，可以逐字节地以原始二进制数据的形式读写文件；以文本模式打开文件时，写文件是按照编码，将字符转成二进制数据再写入文件，读文件是读取二进制数据，再转成字符返回。

## 标准流

Linux 系统默认提供三个已经打开的文件，它们的指针如下。

- `stdin`（标准输入）：默认来源为键盘。
- `stdout`（标准输出）：默认目的地为显示器。
- `stderr`（标准错误）：默认目的地为显示器。

Linux 系统里面的文件，不仅仅是数据文件，也可以是设备。所以，文件指针`stdin`默认是把键盘看作一个文件，读取这个文件，就能获取用户的键盘输入。同理，`stdout`和`stderr`默认是把显示器看作一个文件，将程序的运行结果写入这个文件，用户就能看到运行结果了。它们的区别是，`stdout`负责写入程序的正常运行结果，`stderr`负责写入程序的报错信息。

这三个输入和输出渠道，是 Linux 默认提供的，所以分别称为标准输入（stdin）、标准输出（stdout）和标准错误（stderr）。因为它们的实现是一样的，都是文件流，所以合称为“标准流”。

Linux 允许改变这三个文件流绑定的设备，这称为重定向（redirection）。

如果标准输入不绑定键盘，而是绑定文件，可以在文件名前面加上小于号`<`，跟在程序名后面。这叫做“输入重定向”（input redirection）。

```bash
$ demo < in.dat
```

上面示例中，`demo`程序里面的`stdin`，将从文件`in.dat`获取数据。

如果标准输出绑定一个数据文件，而不是显示器，可以在文件名前加上大于号`>`，跟在程序名后面。这叫做“输出重定向”（output redirection）。

```bash
$ demo > out.dat
```

上面示例中，`demo`程序里面的`stdout`，会向文件`out.dat`写入数据。

输出重定向`>`会先擦去`out.dat`的所有内容，然后再写入。如果希望写入的信息追加在`out.dat`的结尾，可以使用`>>`符号。

```bash
$ demo >> out.dat
```

标准错误的重定向符号是`2>`。

```bash
$ demo > out.dat 2> err.txt
```

上面示例中，`demo`程序里面的`stderr`，会向文件`err.txt`写入报错信息。

输入重定向和输出重定向，可以结合在一条命令里面。

```bash
$ demo < in.dat > out.dat

// or
$ demo > out.dat < in.dat
```

重定向还有另一种情况，就是将一个程序的标准输出`stdout`，作为另一个程序的标准输入`stdin`，这时要使用`|`符号。

```bash
$ random | sum
```

上面示例中，`random`程序的输出，会作为`sum`程序的输入。

## fclose()

`fclose()`用来关闭已经使用`fopen()`打开的文件。它接受一个文件指针`fp`作为参数。

```c
int fclose(FILE* stream);
```

如果成功关闭文件，`fclose()`函数返回`0`，否则返回 EOF（比如磁盘已满，或者出现 I/O 错误）。EOF 是一个定义在`stdio.h`里面的宏。

```c
if (fclose(fp) != 0)
  printf("Something wrong.");
```

## freopen()

`freopen()`用于新打开一个文件，直接关联到某个已经打开的文件指针。这样可以复用文件指针。

```c
FILE* fopen(char* filename, char* mode, FILE stream);
```

它跟`fopen()`相比，就是多出了第三个参数，表示要复用的文件指针。其他两个参数都一样，分别是文件名和打开模式。

```c
freopen("output.txt", "w", stdout);
printf("hello");
```

上面示例将文件`output.txt`关联到`stdout`，此后向`stdout`写入的内容，都会写入`foo.txt`。由于`printf()`默认就是输出到`stdout`，所以运行上面的代码以后，文件`output.txt`会被写入`hello`。

`freopen()`的返回值是它的第三个参数（文件指针）。如果打开失败，会返回空指针 NULL。

## fgetc()，getc()

`fgetc()`和`getc()`用于从文件读取一个字符。它们的用法跟`getchar()`类似，区别是`getchar()`只用来从`stdin`读取，而这两个函数是从文件读取。

```c
ch = fgetc(fp);
ch = getc(fp);
```

`fgetc()`与`getc()`的用法是一样的，都只有文件指针一个参数。两者的区别是，`getc()`一般用宏来实现，而`fgetc()`是函数实现，所以前者的性能可能更好一些。注意，变量`ch`的类型应该是`int`，而不是`char`，因为返回值里面会有 EOF，而 EOF 往往等于`-1`。

下面是读取文件的例子。

```c
#include <stdio.h>

int main(void) {
  FILE *fp;
  fp = fopen("hello.txt", "r");

  int c;
  while ((c = getc(fp)) != EOF)
    printf("%c", c);

  fclose(fp);
}
```

上面示例中，`getc()`依次读取文件的每个字符，将其放入变量`c`，直到读到文件结尾，返回 EOF，循环终止。

EOF 是`stdin.h`定义的一个宏，值等于`-1`。因为`getc()`、`fgetc()`返回的是字符的 ASCII 值，不可能等于负数。如果返回负数，就知道遇到了 EOF，到达了文件结尾。上例中，变量`c`的类型是`int`，而不是`char`，也是因为有可能等于负值，所以设为`int`更好一些。

这两个函数的返回值都是它们读取的字符，如果读取失败，返回 EOF。

## fputc()，putc()

`fputc()`和`putc()`用于向文件写入一个字符。它们的用法跟`putchar()`类似，区别是`putchar()`是向`stdout`写入，而这两个函数是向文件写入。

```c
fputc(ch, fp);
putc(ch, fp);
```

`fputc()`与`putc()`的用法是一样，都是两个参数，第一个参数是待写入的字符，第二个参数是文件指针。它们的区别是，`putc()`通常是使用宏来实现，而`fputc()`只作为函数来实现，所以理论上，`putc()`的性能会好一点。

写入成功时，它们返回写入的字符，否则返回 EOF。

## fprintf()

`fprintf()`用于向文件写入格式化字符串，用法与`printf()`类似。区别是`printf()`总是写入`stdout`，而`fprintf()`则是写入指定的文件，它的第一个参数必须是一个文件指针。

```c
int fprintf(FILE* stream, const char* format, ...)
```

下面是一个例子。

```c
fprintf(fp, "Sum: %d\n", sum);
```

下面是向`stderr`输出错误信息的例子。

```c
fprintf(stderr, "Something number.\n");
```

上面示例向标准错误`stderr`输出一行提示。

## fscanf()

`fscanf()`用于按照给定的模式，从文件中读取内容，用法跟`scanf()`类似。区别是`scanf()`总是从`stdin`读取数据，而`fscanf()`是从文件读入数据，它的第一个参数必须是文件指针。

```c
int fscanf(FILE* stream, const char* format, ...);
```

下面是一个例子。

```c
fscanf(fp, "%d%d", &i, &j);
```

上面示例中，`fscanf()`从文件`fp`里面，读取两个整数，放入变量`i`和`j`。

使用`fscanf()`的前提是知道文件的结构，它的占位符解析规则与`scanf()`完全一致。由于`fscanf()`可以连续读取，直到读到文件尾，或者发生错误（读取失败、匹配失败），才会停止读取，所以`fscanf()`通常放在循环里面。

```c
while(fscanf(fp, "%s", words) == 1)
  puts(words);
```

上面示例中，`fscanf()`依次读取文件的每个词，将它们一行打印一个，直到文件结束。

`fscanf()`的返回值是赋值成功的变量数量，如果赋值失败会返回 EOF。

## fgets()

`fgets()`用于从文件读取指定长度的字符串。

```c
char* fgets(char* str, int STRLEN, File* fp);
```

它的第一个参数`str`是一个字符串指针，用于存放读取的内容。第二个参数`STRLEN`指定读取的长度，第三个参数是一个 FILE 指针，指向要读取的文件。

`fgets()`读取 STRLEN - 1 个字符之后，或者遇到换行符与文件结尾，就会停止读取，然后在已经读取的内容末尾添加一个空字符`\0`，使之成为一个字符串。注意，`fgets()`会读取换行符（`\n`），一起放进字符串。

如果`fgets`的第三个参数是`stdin`，就可以读取标准输入。

```c
fgets(str, sizeof(str), stdin);
```

读取成功时，`fgets()`的返回值是它的第一个参数，即指向字符串的指针，否则返回空指针 NULL。

`fgets()`可以用来读取文件的一行，下面是读取文件所有行的例子。

```c
#include <stdio.h>

int main(void) {
  FILE* fp;
  char s[1024];  // 数组必须足够大，足以放下一行
  int linecount = 0;

  fp = fopen("hello.txt", "r");

  while (fgets(s, sizeof s, fp) != NULL)
    printf("%d: %s", ++linecount, s);

  fclose(fp);
}
```

上面示例中，每一行都是先打印行号，然后打印该行的内容。

## fputs()

`fputs()`用于向文件写入字符串，和`puts()`函数不同，它在写入字符串时不会在其末尾添加换行符。这是因为`fgets()`保留了换行符，所以`fputs()`就不添加了。

它接受两个参数，第一个参数是字符串指针，第二个参数是要写入的文件指针。

```c
fputs(str, fp);
```

写入成功时，`fputs()`返回一个非负整数，否则返回 EOF。

## fwrite()

`fwrite()`用来一次性写入较大的数据块，主要用途是把内存里面的数组写入文件。

```c
size_t fwrite(const void* ptr, size_t size, size_t nmemb, FILE* fp);
```

它接受四个参数。

- `ptr`：内存数组的地址。
- `size`：每个数组成员的大小，单位字节。
- `nmemb`：数组成员的数量。
- `fp`：要写入的文件指针。

注意，`fwrite()`原型的第一个参数类型是`void*`，这是一个无类型指针，编译器会自动将参数指针转成`void*`类型。正是由于`fwrite()`不知道数组成员的类型，所以才需要知道每个成员的大小和成员数量。

`fwrite()`函数的返回值是成功写入的数组成员的数量（注意不是字节数）。正常情况下，该返回值就是第三个参数`nmemb`，但如果出现写入错误，只写入了一部分成员，返回值会比`nmemb`小。

要将整个数组`arr`写入文件，可以采用下面的写法。

```c
fwrite(
  arr,
  sizeof(arr[0]),
  sizeof(arr) / sizeof(arr[0]),
  fp
);
```

上面示例中，`sizeof(a[0])`是每个数组成员占用的字节，`sizeof(a) / sizeof(a[0])`是整个数组的成员数量。

下面的例子是将一个大小为256字节的字符串写入文件。

```c
char buffer[256];

fwrite(buffer, 1, 256, fp);
```

上面示例中，数组`buffer`每个成员是1个字节，一共有256个成员。由于`fwrite()`是连续内存复制，所以写成`fwrite(buffer, 256, 1, fp)`也能达到目的。

`fwrite()`没有规定一定要写入整个数组，只写入数组的一部分也是可以的。

任何类型的数据都可以看成是1字节数据组成的数组，或者是一个成员的数组，所以`fwrite()`实际上可以写入任何类型的数据，而不仅仅是数组。比如，`fwrite()`可以将一个 Struct 结构写入文件保存。

```c
fwrite(&s, sizeof(s), 1, fp);
```

上面示例中，`s`是一个 Struct 结构指针，可以看成是一个成员的数组。注意，如果`s`的属性包含指针，存储时需要小心，因为保存指针可能没意义，还原出来的时候，并不能保证指针指向的数据还存在。

由于二进制文件可能包含空字符`\0`，这是 C 语言的字符串结尾标记，所以读写二进制文件，不适合使用文本读写函数（比如`fprintf()`等），而适合使用`fread()`和`fwrite()`这两个函数。

```c
#include <stdio.h>

int main(void) {
  FILE* fp;
  unsigned char bytes[] = {5, 37, 0, 88, 255, 12};

  fp = fopen("output.bin", "wb");
  fwrite(bytes, sizeof(char), sizeof(bytes), fp);
  fclose(fp);
}
```

上面示例中，写入二进制文件时，`fopen()`要使用`wb`模式打开，表示二进制写入。`fwrite()`可以把数据解释成单字节数组，因此它的第二个参数是`sizeof(char)`，第三个参数是数组的总字节数`sizeof(bytes)`。

这个例子写入的文件`output.bin`，使用十六进制编辑器打开，会是下面的内容。

```c
05 25 00 58 ff 0c
```

`fwrite()`还可以连续写入数据。

```c
struct clientData myClient = {1, 'foo bar'};

for (int i = 1; i <= 100; i++) {
  fwrite(&myClient, sizeof(struct clientData), 1, cfPtr);
}
```

上面示例中，`fwrite()`连续将100条数据写入文件。

## fread()

`fread()`用于一次性从文件读取较大的数据块，主要用途是将文件内容读入一个数组。

```c
size_t fread(void* ptr, size_t size, size_t nmemb, FILE* fp);
```

它接受四个参数，与`fwrite()`完全相同。

- `ptr`：内存数组的地址。
- `size`：数组的成员数量。
- `nmemb`：每个数组成员的大小。
- `fp`：文件指针。

要将文件内容读入数组`arr`，可以采用下面的写法。

```c
fread(
  arr,
  sizeof(arr[0]),
  sizeof(arr) / sizeof(arr[0]),
  fp
);
```

下面的例子是，将文件内容读入一个10个成员的双精度浮点数数组。

```c
double earnings[10];
fread(earnings, sizeof (double), 10, fp);
```

上面示例中，每个数组成员的大小是`sizeof(double)`，一个有10个成员。

`fread()`函数的返回值是成功读取的数组成员的数量。正常情况下，该返回值就是第三个参数`nmemb`，但如果出现读取错误或读到文件结尾，该返回值就会比`nmemb`小。所以，检查`fread()`的返回值是非常重要的。

`fread()`和`fwrite()`可以配合使用。在程序终止之前，使用`fread()`将数据保存进文件，下次运行时再用`fwrite()`将数据还原进入内存。

下面是读取上一节生成的二进制文件`output.bin`的例子。

```c
#include <stdio.h>

int main(void) {
  FILE* fp;
  unsigned char c;

  fp = fopen("output.bin", "rb");
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

## feof()，ferror()

`feof()`判断文件的内部指针是否指向文件结尾。如果已经到达文件结尾，就会返回一个非零值（表示 true），否则返回`0`（表示 false）。

```c
int feof(FILE *fp);
```

诸如`fgetc()`这样的输入函数，如果返回 EOF，有两种可能，一种可能是已读取到文件结尾，另一种可能是出现读取错误。`feof()`可以用来判断到底是那一种情况。

`feof()`也可以配合文件输入函数，循环读取整个文件。请看下面的示例。

```c
int num;
char name[50];

FILE* cfPtr = fopen("clients.txt", "r");

while (!feof(cfPtr)) {
  fscanf(cfPtr, "%d%s\n", &num, name);
  printf("%d %s\n", num, name);
}

fclose(cfPtr);
```

上面示例通过循环判断`feof()`是否读到文件结尾，从而实现读出整个文件内容。

`feof()`为真时，可以通过`fseek()`、`rewind()`、`fsetpos()`函数改变内部指针的位置，从而清除这个函数的状态。

## ferror()，clearerr()

文件操作函数如果执行失败，就会设置`ferror()`的状态为出错。所以，可以通过这个函数，判断前面的文件操作是否成功。如果前面的操作出现任何读写错误，`ferror()`就会返回真（非零值），否则返回`0`。出错状态可以用`clearerr()`函数重置。

```c
int ferror(FILE* fp);
void clearerr(FILE* fp);
```

`ferror()`和`clearerr()`都接受文件指针作为参数。

下面是一个例子。

```c
FILE* fp = fopen("file.txt", "w");
char c = fgetc(fp);

if (ferror(fp)) {
  printf("读取文件：file.txt 时发生错误\n");
}

clearerr(fp);
```

上面示例中，`fgetc()`尝试读取一个以”写模式“打开的文件，读取失败就会返回 EOF，调用`ferror()`就可以知道上一步操作出错了。处理完以后，再用`clearerr()`清除出错状态。

## remove()

`remove()`函数用于删除文件，它接受文件名作为参数。

```c
remove("foo.txt");
```

上面示例删除了`foo.txt`文件。

如果删除成功，`remove()`返回`0`，否则返回非零值。

注意，删除文件必须是在文件关闭的状态下。如果是用`fopen()`打开的文件，必须先用`fclose()`关闭后再删除。

## rename()

`rename()`函数用于文件改名，它接受文件名作为参数。

```c
rename("foo.txt", "bar.txt");
```

上面示例将`foo.txt`改名为`bar.txt`。

如果改名成功，`rename()`返回`0`，否则返回非零值。

注意，改名后的文件不能与现有文件同名。另外，如果要改名的文件已经打开了，必须先关闭，然后再改名，对打开的文件进行改名会失败。

## fseek()

每个打开的文件都有一个内部指针，记录当前开始读取的文件位置（file position）。通常，输入函数`getc()`、`fgets()`、`fscanf()`和`fread()`等都从文件开始处按顺序读取文件，即文件位置的内部指针指向文件开始处。

但是，有时候会希望从文件内部的指定位置开始读取，即文件位置的内部指针要移到指定位置。`fseek()`函数就可以实现这个目的，移动文件的内部指针。

```c
int fseek(FILE* stream, long int offset, int whence);
```

`fseek()`接受3个参数。

- `stream`：文件指针。
- `offset`：距离基准的字节数。类型为 long int，可以为正值（向文件末尾移动）、负值（向文件开始处移动）或 0 （保持不动）。
- `whence`：位置基准，用来确定计算起点。它的值是以下三个宏（定义在`stdio.h`）：`SEEK_SET`（文件开始处）、`SEEK_CUR `（内部指针的当前位置）、`SEEK_END`（文件末尾）

请看下面的例子。

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

上面示例中，`fseek()`的第二个参数为 long 类型，所以移动距离必须加上后缀`L`，将其转为 long 类型。

下面的示例逆向输出文件的所有字节。

```c
for (count = 1L; count <= last; count++) {
  fseek(fp, -count, SEEK_END);
  ch = getc(fp);
}
```

注意，`fseek()`最好只用来操作二进制文件，不要用来读取文本文件。因为文本文件的字符有不同的编码，某个位置的准确字节数不容易确定。

正常情况下，`fseek()`的返回值为0。如果发生错误（如移动的距离超出文件的范围），返回值为非零值（比如`-1`)。

## ftell()

`ftell()`函数返回文件内部指针的当前位置。

```c
long int ftell(FILE* stream);
```

它接受一个文件指针作为参数。返回值是一个 long 类型的整数，表示内部指针的当前位置，即文件开始处到当前位置的字节数，`0`表示文件开始处。如果发生错误，`ftell()`返回`-1L`。

`ftell()`可以跟`fseek()`配合使用，先记录内部指针的位置，一系列操作过后，再用`fseek()`返回原来的位置。

```c
long file_pos;
file_pos = ftell(fp);
// 一系列文件操作之后
fseek(fp, file_pos, SEEK_SET);
```

下面的例子先将指针定位到文件结尾，然后得到文件开始处到结尾的字节数。

```c
fseek(fp, 0L, SEEK_END);
last = ftell(fp);
```

注意，`ftell()`最好只用于二进制文件，不要用于文本文件。因为对于文本文件，`ftell()`返回的不一定是准确的字节数。

## fgetpos()，fsetpos()

`fseek()`和`ftell()`有一个潜在的问题，那就是它们都把文件大小限制在 long int 类型能表示的范围内。20亿字节看起来相当大，但是随着存储设备的容量迅猛增长，文件也越来越大，有可能会超出这个范围。鉴于此，C 语言新增了两个处理大文件的新定位函数：`fgetpos()`和`fsetpos()`。

```c
int fgetpos(FILE* stream, fpos_t* pos);
int fsetpos(FILE* stream, const fpos_t* pos);
```

`fgetpos()`会将文件内部指针的当前位置，存储在变量`pos`指针。它接受两个参数，第一个是文件指针，第二个存储内部指针位置的变量。

`fsetpos()`会将文件内部指针的位置，设置在变量`pos`指定的地址。注意，变量`pos`必须是通过调用`fgetpos()`方法获得的。`fsetpos()`的两个参数与`fgetpos()`是一样的。

表示文件内部指针位置的变量`pos`，属于一种新类型`fpos_t`（file position type 的缩写，文件定位类型）。它不一定是整数，也可能是一个 Struct 结构。

```c
fpos_t file_pos;
fgetpos(fp, &file_pos);
// 一系列文件操作之后
fsetpos(fp, &file_pos);
```

上面示例中，先用`fgetpos()`获取内部指针的位置，后面再用`fsetpos()`恢复指针的位置。

调用成功时，`fgetpos()`和`fsetpos()`都会返回`0`，否则返回非零值。

## rewind()

`rewind()`函数可以让文件的内部指针回到文件开始处，它接受一个文件指针作为参数。

```c
void rewind(FILE* stream);
```

`rewind(fp)`基本等价于`fseek(fp, 0L, SEEK_SET)`，唯一的区别是`rewind()`没有返回值，而且会清除当前文件的错误指示器。

