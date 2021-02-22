# 内存管理

C 语言内存管理的函数原型，都是在`<stdlib.h>`定义，使用这些函数之前，需要先加载这个头文件。

`void* malloc(size_t size)`：要求在 heap 里面分配连续的内存块，返回指向开始地址的指针。如果请求没有成功，返回 NULL。类型`size_t`是一个无符号长整数（`unsigned long`），表示所要求的内存块的字节长度。`malloc()`返回类型是`void*`，即一个指针，但是没有给出指向的数据类型。

`void free(void* block)`：释放`malloc()`所分配的内存代码块，将这块内存还给 Heap 以便重新使用。分配的内存块一旦释放，就不应该再次读取以前分配的这个内存块，也不应该释放第二次。

`void* realloc(void* block, size_t size)`：对一个给定的内存块，重新指定大小，可能更大或更小，返回一个指向新的内存块的指针。如果分配不成功，返回 NULL。

程序结束运行时，会自动释放占用的所有内存。所以，只有程序长时间运行或者占用太多内存时，才需要使用`free()`手动释放内存。

下面手动分配一个数组的内存块的写法。

```c
int* b;
b = (int*) malloc(sizeof(int) * 1000);
assert(b != NULL);

b[123] = 13;

free(b);
```

手动建立数组的好处是，可以在运行时调整数组的长度。

```c
b = realloc(b, sizeof(int) * 2000);
```

下面是手动为字符串分配内存的例子。

```c
#include <string.h>

char* MakeStringInHeap(const char* source) {
  char* newString;
  newString = (char*) malloc(strlen(source) + 1); // +1 for the '\0'
  assert(newString != NULL);
  strcpy(newString, source);
  return(newString);
}
```

