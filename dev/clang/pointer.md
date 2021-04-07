# 指针

## 简介

指针是一个值，这个值代表一个内存地址，因此相当于指向其他内存地址的路标。

字符`*`表示指针，通常跟着类型关键字的后面，表示指针指向的是什么类型的值。比如，`Char*`表示一个指向字符的指针，`struct fraction*`表示一个指向自定义类型`fraction`的指针。

```c
int* intPtr;
```

上面示例声明了一个变量`intPtr`，它是一个指针，指向的内存地址存放的是一个整数。

星号`*`可以放在变量名与类型关键字之间的任何地方，下面的写法都是等价的。

```c
int   *intPtr;
int * intPtr;
int*  intPtr;
```

本教程使用星号紧跟在类型关键字后面的写法。

如果指向自定义的数据结构（`struct`命令），那么指针写法如下。

```c
struct fraction* intFraction;
```

一个指针指向的可能还是指针，这时就要用两个星号`**`表示。

```c
int** foo;
```

上面示例表示变量`foo`是一个指针，指向的还是一个指针，第二个指针指向的则是一个整数。

下面是指针与`struct`命令结合的一个例子。

```c
struct node {
  int data;
  struct node* next;
};
```

上面示例表示，自定义类型`node`的属性`next`是一个指针，指向的是一个`node`类型的实例。事实上，链表就是这样实现的。

`*`这个符号还有一个作用，就是取出指针变量所指向的那个值。

```c
void increment(int *p) {
  *p = *p + 1;
}
```

如果一个指针不指向任何地址，可以将其设为 NULL，表示指针尚未初始：化。

```c
int *p;
p = NULL;
```

## & 运算符

`&`运算符用来取出一个变量所在的内存地址。

```c
int x = 1;
printf("x's address is %p\n", &x);
```

上面示例中，`x`是一个整数变量，`&x`就是这个变量的值所在的内存地址。`printf()`的`%p`是内存地址的占位符。

`&`运算符常用来为指针变量赋值。

```c
int* p;
int i;

p = &i;
*p = 13;
```

上面示例中，`p`是指针变量，`i`是整数变量。`&i`是`i`的内存地址，`p = &i`就表示`p`指向变量`i`。`*p`表示`p`指向的值，`*p = 13`表示`p`指向的值（即`i`）是`13`。运行上面的语句以后，变量`i`就会等于`13`。

注意，`p = &i`这一步是必需的。如果少了这一步，指针变量`p`没有初始化，可能指向任意一个内存地址。

```c
int* p;
*p = 13;
```

上面示例中，指针变量`p`声明后，并没有初始化，指向的是一个随机的内存地址。直接执行`*p = 13`，会导致随机地址包含的值被改成`13`，可能引发意想不到的错误。

因此要记住，如果对指针变量所指向的内存地址赋值，一定要先对指针变量赋值，使得指针变量指向那个地址，然后再对那个地址赋值。

## void 指针

void 指针指的是不限定指针指向什么类型的数据。某些函数的返回值就是 void 指针，比如`memcpy()`函数。

```c
void* memcpy(void* s1, void* s2, size_t n);
```

上面代码中，`s1`和`s2`之所以是`void*`，指的是各种类型的指针都可以。

因为`memcpy()`只是将一段内存的值，复制到另一段内存，所以不需要知道内存里面的数据是什么类型。下面是复制字符串的例子。

```c
#include <stdio.h>
#include <string.h>

int main(void)
{
    char s[] = "Goats!";
    char t[100];

    memcpy(t, s, 7);  // Copy 7 bytes--including the NUL terminator!

    printf("%s\n", t);  // "Goats!"
}
```

下面是复制数值的例子。

```c
#include <stdio.h>
#include <string.h>

int main(void)
{
    int a[] = {11, 22, 33};
    int b[3];

    memcpy(b, a, 3 * sizeof(int));  // Copy 3 ints of data

    printf("%d\n", b[1]);  // 22
}
```

复制自定义 Struct 数据结构的例子。

```c
struct antelope my_antelope;
struct antelopy my_clone_antelope;

// ...

memcpy(&my_clone, &my_antelope, sizeof my_antelope);
```

注意，由于不知道 void 指针指向什么类型的值，所以不能用`*`运算符取出它指向的值。

```c
char a = 'X';
void* p = &a;

printf("%c\n", *p); // 报错
```

上面示例中，`p`是一个 void 指针，所以这时无法用`*p`取出指针指向的值。

使用 void 指针，我们也可以自己定义一个复制内存的函数。

```c
void* my_memcpy(void* dest, void* src, int byte_count) {
  char* s = src;
  char* d = dest;

  while (byte_count--) {
    *d++ = *s++;
  }

  return dest;

}
```

上面示例中，不管传入的`dest`和`src`是什么类型的指针，将它们重新定义成一字节的 Char 指针，这样就可以逐字节进行复制。最后，返回复制后的`dest`指针，便于后续使用。

