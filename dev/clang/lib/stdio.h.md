# stdio.h

头文件`stdio.h`定义了大量输入/输出函数的原型。

## tmpfile()

`tmpfile()`函数创建一个临时文件，该文件只在程序运行期间存在，除非手动关闭它。它的原型如下。

```c
FILE* tmpfile(void);
```

`tmpfile()`返回一个文件指针，可以用于访问该函数创建的临时函数。如果创建失败，返回一个空指针 NULL。

```c
FILE* tempptr;
tempptr = tmpfile();
```

`tmpfile()`有两个缺点。一是无法知道临时文件的文件名，二是无法让该文件成为永久文件。

## tmpnam()

`tmpname()`函数为临时文件生成一个名字。它的原型如下。

```c
char* tmpname(char* s);
```

它的参数可以是一个空指针 NULL，然后返回指向文件名字符串的指针。

```c
char* filename;
filename = tmpnam(NULL);
```

上面示例中，变量`filename`就是`tmpnam()`生成的文件名。

它的参数也可以是一个字符串变量，这时`tmpnam()`就会把文件名复制到这个变量里面，并返回指向该字符串变量的指针。

```c
char filename[L_tmpname];
tmpnam(filename);
```

上面示例中，`L_tmpname`是`stdio.h`定义的一个宏，指定了临时文件的文件名长度。

如果生成文件名失败，`tmpnam()`返回空指针 NULL。

## fflush()

`fflush()`用于清空缓存区。它接受一个文件指针作为参数，将缓存区内容写入该文件。

```c
fflush(fp);
```

如果不需要保存缓存区内容，则可以传入空指针 NULL。

```c
fflush(NULL);
```

如果清空成功，`fflush()`返回0，否则返回 EOF。

注意，`fflush()`一般只用来清空输出缓存区（比如写文件）。如果使用它来清空输入缓存区（比如读文件），属于未定义行为。

`fflush()`的一个用途是不等回车键，就强迫输出缓存区。大多数系统都是行缓存，这意味着只有遇到回车键，缓存区的内容才会输出，`fflush()`可以不等回车键，立即输出。

```c
for (int i = 9; i >= 0; i--) {
  printf("\r%d", i);
  fflush(stdout);
  sleep(1);
}
```

上面示例是一个倒计时效果，`\r`是回车键，表示每轮循环都会回到当前行的行首，等于删除上一轮循环的输出。`fflush(stdout)`表示立即将缓存输出到显示器，这一行是必需的，否则由于上一行的输出没有回车键，不会触发缓存输出，屏幕上不会显示任何内容，只会等到程序运行结束再一次性输出。

## setvbuf()

`setvbuf()`函数用于定义某个字节流应该如何缓存。它可以接受四个参数。

```c
int setvbuf(FILE* stream, char* buffer, int mode, size_t size)
```

第一个参数`stream`是文件流。

第二个参数`buffer`是缓存区的地址。

第三个参数`mode`指定缓存的行为模式，它是下面三个宏之一，这些宏都定义在`stdio.h`。

- `_IOFBF`：满缓存。当缓存为空时，才从流读入数据；当缓存满了，才向流写入数据。一般情况下，这是默认设置。
- `_IOLBF`：行缓存。每次从流读入一行数据，或向流写入一行数据，即以行为单位读写缓存。
- `_IONBF`：无缓存。不使用缓存区，直接读写设备。

第四个参数`size`指定缓存区的大小。较大的缓存区提供更好的性能，而较小的缓存区可以节省空间。

```c
char buffer[N];

setvbuf(stream, buffer, _IOFBF, N);
```

上面示例设置文件流`stream`的缓存区从地址`buffer`开始，大小为`N`，模式为`_IOFBF`。

`setvbuf()`的第二个参数可以为空指针 NULL。这样的话，`setvbuf()`会自己创建一个缓存区。

注意，`setvbuf()`的调用必须在对文件流执行任何操作之前。

如果调用成功，`setvbuf()`的返回值为`0`，否则返回非零值。

## setbuf()

`setbuf()`是`setvbuf()`的早期版本，也用来定义某个字节流的缓存区。

```c
void setbuf(FILE* stream, char* buffer)
```

它总是可以改写成`setvbuf()`。

```c
char buffer[BUFSIZ];

setbuf(stream, buffer);

// 等同于
setvbuf(stream, buffer, _IOFBF, BUFSIZ);
```

上面示例中，`BUFSIZ`是`stdio.h`定义的宏，表示缓存区的大小。

`setbuf()`函数没有返回值。

## feof()，ferror()，clearerr()

每个文件流都有两个与之相关的指示器。

- 错误指示器（error indicator）：记录是否发生错误。
- 文件结尾指示器（end-of-file indicator）：记录是否到达了文件末尾。

如果输入输出函数没有正常返回，从这两个指示器可以知道到底发生什么问题。

- 如果`ferror()`返回非零值，表示发生了读取错误或写入错误。
- 如果`feof()`返回非零值，表示到达了文件末尾。
- 如果`ferror()`和`feof()`返回的都是0，输入输出函数却报错了，那就说明发生了其他错误（可能是匹配错误）。

如果一切正常，`ferror()`和`feof()`都会返回零。

```c
if (fscanf(fp, "%d", &n) != 1) {
  if (ferror(fp)) {
    printf("io error\n");
  }
  if (feof(fp)) {
    printf("end of file\n");
  }
  fclose(fp);
}
```

上面示例中，当`fscanf()`函数报错时，通过检查`ferror()`和`feof()`，确定到底发生什么问题。

这两个指示器一旦设置以后，就会保持这种状态，可以用`clearerr()`清除它们。

```c
clearerr(fp);
```

上面示例中，`clearerr()`会将文件`fp`的两个指示器同时清除。

## ungetc()

`ungetc()`将从缓存里面读取的上一个字符，重新放回缓存。这对于需要了解下一个字符的操作很有用。

```c
while (isdigit()) {
  // ...
}
ungetc(ch, fp);
```

上面示例中，如果读取的字符不是数字，就将其放回缓存。

`ungetc()`返回放回缓存的字符。如果放回失败，返回 EOF。

## aligned_alloc()

很多系统有内存对齐的要求，即内存块的大小必须是某个值（比如64字节）的倍数，这样有利于提高处理速度。`aligned_alloc()`就用于分配满足内存对齐要求的内存块，它的原型如下。

```c
void* aligned_alloc(size_t alignment, size_t size);
```

它接受两个参数。

- alignment：整数，表示内存对齐的单位大小，一般是2的整数次幂（2、4、8、16……）。
- size：整数，表示内存块的大小。

分配成功时，它返回一个指针，指向新分配的内存块。分配失败时，返回 NULL。

```c
char* p = aligned_alloc(64, 256);
```

上面示例中，`aligned_alloc()`分配的内存块，单位大小是64字节，要分配的字节数是256字节。

