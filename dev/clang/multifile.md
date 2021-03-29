# 多文件项目

## 简介

实际开发中，一个软件项目通过包含多个源码文件，编译时再将它们编译为一个可执行文件。

假定一个项目有两个源码文件`foo.c`和`bar.c`，其中`foo.c`是入口文件，`bar.c`定义了一个函数。编译时需要将它们一起编译。

```c
$ gcc -o foo foo.c bar.c
```

`bar.c`的源码如下。

```c
// File bar.c

int add(int x, int y) {
  return x + y;
}
```

`foo.c`调用了`bar.c`定义的`add()`函数。

```c
// File foo.c
#include <stdio.h>

int main(void) {
  printf("%d\n", add(2, 3));  // 5!
}
```

但是，编译器不知道`add()`的类型声明，编译时会有警告。所以，最好在`foo.c`里面加入`add()`的类型声明。

```c
// File foo.c
#include <stdio.h>

int add(int, int);  // Add the prototype

int main(void) {
  printf("%d\n", add(2, 3));  // 5!
}
```

如果每个文件都要写类型声明，一旦需要修改就很麻烦。通常的做法是新建一个专门的头文件`bar.h`，放置所有在`bar.c`里面定义的函数的类型声明。

```c
// File bar.h

int add(int, int);
```

然后使用`include`命令，在`foo.c`里面加入这个头文件`bar.h`即可。

```c
// File foo.c

#include <stdio.h>

#include "bar.h"  // Include from current directory

int main(void) {
    printf("%d\n", add(2, 3));  // 5!
}
```

## 处理重复包含

由于一个头文件里面，还可以包含其他头文件，因此有可能产生循环包含。比如，`a.h`包含了`b.h`，`b.h`又反过来包含了`a.h`。

为了避免循环包含，通常的做法是设置一个预处理器变量。一旦发现这个变量存在，就不再继续包含了。

```c
// File bar.h
#ifndef BAR_H   // If BAR_H isn't defined...

#define BAR_H   // Define it (with no particular value)

int add(int, int);

#endif          // End of the #ifndef BAR_H
```

上面示例在头文件中，使用`#ifndef`和`#endif`设置了一个条件判断，只有`BAR_H`这个变量未定义的情况，才会执行判断体的代码。其中就使用`#define`命令定义了一个预处理器变量`BAR_H`。

## 编译成对象文件

对于多个源文件的项目，另一个做法是将每个文件编译成单独的对象文件。

```c
$ gcc -c foo.c     # produces foo.o
$ gcc -c bar.c     # produces bar.o
```

最后，再将所有对象文件通过链接，合并成一个可执行文件。

```c
$ gcc -o foo foo.o bar.o
```

这样做的最大好处就是，如果你修改了一个文件，那么只需要重新编译该文件的对象文件，然后再把所有对象文件链接在一起，而不需要从头编译整个项目。对于大型项目，前一种做法可以快很多，能够节省大量时间。

