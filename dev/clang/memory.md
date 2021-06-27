# C 语言的内存管理

## 简介

C 语言的内存管理，分成两部分。一部分是系统管理的，另一部分是用户手动管理的。

系统管理的内存，主要是函数内部的变量（局部变量）。这部分变量在函数运行时进入内存，函数运行结束后自动从内存卸载。这些变量存放的区域称为”栈“（stack），”栈“所在的内存是系统自动管理的。

用户手动管理的内存，主要是程序运行的整个过程中都存在的变量（全局变量），这些变量需要用户手动从内存释放。如果使用后忘记释放，它就一直占用内存，直到程序退出，这种情况称为”内存泄漏“（memory leak）。这些变量所在的内存称为”堆“（heap），”堆“所在的内存是用户手动管理的。

## void 指针

void 指针指的是无类型的指针，即该指针可以指向任意类型的数据。很多函数的返回值就是 void 指针，比如下面的`malloc()`函数。

void 指针的作用是，其他所有类型指针都可以转为该指针，而该指针也可以转为其他类型的指针。

```c
int x = 10;

void* p = &x; // 整数指针转为 void 指针
int* q = p; // void 指针转为整数指针
```

上面示例中，整数指针和 void 指针可以互相转换。

注意，由于不知道 void 指针指向什么类型的值，所以不能用`*`运算符取出它指向的值。

```c
char a = 'X';
void* p = &a;

printf("%c\n", *p); // 报错
```

上面示例中，`p`是一个 void 指针，所以这时无法用`*p`取出指针指向的值。

## malloc()

`malloc()`函数用于分配内存，可以在“堆”里面分配一段连续的内存块。该函数的原型在头文件`stdlib.h`定义。

它接受一个非负整数作为参数，表示所要分配的内存字节数，返回一个 void 指针，指向分配好的内存块。如果分配没有成功，返回 NULL（不指向任何地方的指针）。

```c
void* malloc(size_t size)
```

由于`malloc()`函数不知道，将要存储在该块内存的数据是什么类型，所以它返回的指针是无类型的 void 指针。

由于 void 指针可以指向任意类型的内存数据，所以可以使用`malloc()`为任意类型的数据分配内存。常见的做法是先使用`sizeof()`函数，算出某种数据类型所需的字节长度，然后再将这个长度传给`malloc()`。

```c
int* p = malloc(sizeof(int));

*p = 12;
printf("%d\n", *p); // 12
```

上面示例中，先为整数类型分配一段内存，然后将整数`12`放入这段内存里面。这个例子其实不需要使用`malloc()`，因为 C 语言会自动为整数（本例是`12`）提供内存。

有时候为了增加代码的可读性，可以对`malloc()`返回的指针进行一次强制类型转换。

```c
int* p = (int*) malloc(sizeof(int));
```

上面代码将`malloc()`返回的 void 指针，强制转换成了整数指针。

由于`sizeof()`的参数可以是变量，所以上面的例子也可以写成下面这样。

```c
int* p = (int*) malloc(sizeof *p);
```

由于存在分配失败的可能，所以最好在使用内存之前检查一下，`malloc()`是否分配成功。

```c
int* p = malloc(sizeof(int));

if (p == NULL) {
  // 内存分配失败
}

// or
if (!p) {
  //...
}
```

上面示例中，通过判断返回的指针`p`是否为`NULL`，判断`malloc()`是否分配成功。`NULL`是一个宏，在包括`stdlib.h`等多个头文件里面都有定义，所以只要可以使用`malloc()`，就可以使用`NULL`。

`malloc()`最常用的场合，就是为数组和自定义数据结构分配内存。

```c
int* p = (int*) malloc(sizeof(int) * 10);

for (int i = 0; i < 10; i++)
  p[i] = i * 5;
```

上面示例中，`p`是一个整数指针，指向一段可以放置10个整数的内存，所以可以用作数组。

`malloc()`用来创建数组，有一个好处，就是它可以创建动态数组，即根据成员数量的不同，而创建长度不同的数组。

```c
int* p = (int*) malloc(n * sizeof(int));
```

上面示例中，`malloc()`可以根据变量`n`的不同，动态为数组分配不同的大小。

注意，`malloc()`不会对所分配的内存进行初始化，里面还保存着原来的值。如果没有初始化，就使用这段内存，可能从里面读到以前的值。所以，程序员要自己负责初始化，举例来说，字符串初始化的方法是使用`strcpy()`函数。

```c
char* p = malloc(4);
strcpy(p, "abc");

// or
*p = "abc";
```

上面示例中，字符指针`p`指向一段4个字节的内存，`strcpy()`将字符串“abc”拷贝进入这段内存。

## free()

`free()`用于释放`malloc()`函数分配的内存，将这块内存还给系统以便重新使用，否则这个内存块会一直占用到程序运行结束。

它的参数是`malloc()`返回的内存地址。该函数的原型定义在头文件`stdlib.h`里面。

```c
void free(void* block)
```

下面是一个例子。

```c
int* p = (int*) malloc(sizeof(int));

*p = 12;
free(p);
```

注意，分配的内存块一旦释放，就不应该再次操作已经释放的地址，也不应该再次使用`free()`对该地址释放第二次。

一个很常见的错误是，在函数内部分配了内存，但是函数调用结束时，没有使用`free()`释放内存。

```c
void gobble(double arr[], int n) {
  double* temp = (double*) malloc(n * sizeof(double));
  // ...
}
```

上面示例中，函数`gobble()`内部分配了内存，但是没有写`free(temp)`。这会造成函数运行结束后，占用的内存块依然保留，如果多次调用`gobble()`，就会留下多个内存块。并且由于指针`temp`已经消失了，也无法访问这些内存块，进行重复使用。

## calloc()

`calloc()`函数的作用与`malloc()`相似，也是分配内存块。该函数的原型在头文件`stdlib.h`定义。

两者的区别主要有两点：

（1）`calloc()`接受两个参数，第一个参数是数据类型的单位字节长度，第二个是该数据类型的数量。

（2）`calloc()`会将所分配的内存全部初始化为`0`。`malloc()`不会对内存进行初始化，初始化必须额外调用`memset()`函数。

```c
int *p = calloc(10, sizeof(int));

// 等同于
int *q = malloc(sizeof(int) * 10);
memset(q, 0, sizeof(int) * 10);
```

上面示例中，`calloc()`的一行代码，相当于下面两行`malloc()`代码。

`calloc()`的返回值也是一个 void 指针。分配失败时，返回 NULL。

`calloc()`分配的内存块，也要使用`free()`释放。

## realloc()

`realloc()`函数用于修改已经分配的内存块的大小，可以放大也可以缩小，返回一个指向新的内存块的指针。如果分配不成功，返回 NULL。该函数的原型在头文件`stdlib.h`定义。

```c
void* realloc(void* block, size_t size)
```

它接受两个参数，第一个是指向已经分配好的内存块的指针（由`malloc()`或`calloc()`或`realloc()`产生），第二个是该内存块的新大小，单位为字节。`realloc()`可能返回一个全新的指针（数据也会自动复制过去），也可能返回跟原来一样的指针（通常是这样，优先在原有内存块上进行缩减，尽量不移动数据）。

下面是一个例子，`b`是数组指针，`realloc()`动态调整它的大小。

```c
int* b;

b = malloc(sizeof(int) * 10);

b = realloc(b, sizeof(int) * 2000);
```

上面示例中，指针`b`原来指向10个成员的整数数组，使用`realloc()`调整为2000个成员的数组。这就是手动分配数组内存的好处，可以在运行时随时调整数组的长度。

`realloc()`的第一个参数可以是 NULL，这时就相当于新建一个指针。

```c
char* p = realloc(NULL, 3490);
// 等同于
char* p = malloc(3490);
```

如果`realloc()`的第二个参数是`0`，就会释放掉内存块。

由于有分配失败的可能，所以调用`realloc()`以后，最好检查一下它的返回值是否为 NULL。分配失败的情况下，原有内存块中的数据不会发生改变。

```c
float* new_p = realloc(p, sizeof(*p * 40));

if (new_p == NULL) {
  printf("Error reallocing\n");
  return 1;
}
```

注意，`realloc()`不会对内存块进行初始化。

## 受限指针

`restrict`关键字可以用在指针变量的声明，告诉编译器，某块内存区域只有该指针一种访问方式。这种指针称为“受限指针”（restrict pointer）。

```c
int* restrict p;
p = malloc(sizeof(int));
```

上面示例中，声明指针变量`p`时，加入了`restrict`关键字，使得`p`变成了受限指针。后面，`p`指向`malloc()`函数返回的一块内存区域，这意味着，该区域就只有通过`p`来访问，不存在其他访问方式。

```c
int* q;
q = p; // p 是受限指针
*q = 0; // 未定义行为
```

上面示例中，另一个指针`q`与受限指针`p`指向同一块内存，现在该内存有`p`和`q`两种访问方式。这就违反了对编译器的承诺，后面通过`*q`对该内存区域赋值，会导致未定义行为。

## memcpy()

`memcpy()`用于将一块内存拷贝到另一块内存。该函数的原型在头文件`string.h`定义。

```c
void* memcpy(void* restrict s1, void* restrict s2, size_t n);
```

上面代码中，`s1`是目标地址，`s2`是源地址，第三个参数`n`是要拷贝的字节数`n`。比如，如果要拷贝数组里面10个 double 类型的元素，`n`就等于`10 * sizeof(double)`，而不是`10`。该函数会将从`s2`开始的`n`个字节，拷贝到`s1`。

`s1`和`s2`都是 void 指针，表示这里不限制指针类型，各种类型的内存数据都可以。两者都有 restrict 关键字，表示两者不应该互相重叠。

`memcpy()`的返回值是第一个参数，即目标地址的指针。

因为`memcpy()`只是将一段内存的值，复制到另一段内存，所以不需要知道内存里面的数据是什么类型。下面是复制字符串的例子。

```c
#include <stdio.h>
#include <string.h>

int main(void) {
  char s[] = "Goats!";
  char t[100];

  memcpy(t, s, 7);  // 拷贝7个字节，包括终止符

  printf("%s\n", t);  // "Goats!"
}
```

上面示例中，字符串`s`所在的内存，被拷贝到字符数组`t`所在的内存。

下面是复制数值的例子。

```c
#include <stdio.h>
#include <string.h>

int main(void) {
  int a[] = {11, 22, 33};
  int b[3];

  memcpy(b, a, 3 * sizeof(int));

  printf("%d\n", b[1]);  // 22
}
```

下面是拷贝 Struct 结构的例子。

```c
struct antelope my_antelope;
struct antelopy my_clone;

// ...

memcpy(&my_clone, &my_antelope, sizeof my_antelope);
```

上面示例中，将`my_antelope`的内存数据拷贝到`my_clone`所在的内存，这样就形成了一份一模一样的 Struct 拷贝。由于 Struct 类型的变量名不是指针，所以需要在变量名之前添加`&`运算符。

使用 void 指针，也可以自己定义一个复制内存的函数。

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

上面示例中，不管传入的`dest`和`src`是什么类型的指针，将它们重新定义成一字节的 Char 指针，这样就可以逐字节进行复制。`*d++ = *s++`语句相当于先执行`*d = *s`（源字节的值复制给目标字节），然后各自移动到下一个字节。最后，返回复制后的`dest`指针，便于后续使用。

## memmove()

`memmove()`函数用于将一段内存数据移动到另一段内存。该函数的原型在头文件`string.h`定义。

```c
void* memmove(void* s1, void* s2, size_t n);
```

上面代码中，`s1`是目标地址，`s2`是源地址，`n`是要移动的字节数。`s1`和`s2`都是 void 指针，表示可以移动任何类型的内存数据，两者可以有重叠。

`memmove()`返回值是第一个参数，即目标地址的指针。

```c
int a[100];
// ...

memmove(&a[0], &a[1], 99 * sizeof(int));
```

上面示例中，从数组成员`a[1]`开始的99个成员，都向前移动一个位置。

下面是另一个例子。

```c
char x[] = "Home Sweet Home";

// 输出 Sweet Home Home
printf("%s\n", (char *) memmove(x, &x[5], 10));
```

上面示例中，从字符串`x`的5号位置开始的10个字节，就是“Sweet Home”，`memmove()`将其前移到0号位置，所以`x`就变成了“Sweet Home Home”。

