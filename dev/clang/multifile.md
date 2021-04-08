# 多文件项目

## 简介

一个软件项目往往包含多个源码文件，编译时需要将这些文件编译为一个可执行文件。

假定一个项目有两个源码文件`foo.c`和`bar.c`，其中`foo.c`是入口文件。

```c
// File foo.c
#include <stdio.h>

int main(void) {
  printf("%d\n", add(2, 3));  // 5!
}
```

上面代码中，文件`foo.c`调用了函数`add()`，后者是在`bar.c`里面定义的。

```c
// File bar.c

int add(int x, int y) {
  return x + y;
}
```

编译时需要将它们一起编译，下面命令的`-o`参数指定编译后生成的二进制可执行文件的文件名。

```c
$ gcc -o foo foo.c bar.c
# 更省事的写法
$ gcc -o foo *.c
```

上面命令运行后，会发出警告，原因是编译器在处理`foo.c`的过程中，不知道`add()`的类型。因此，最好修改一下`foo.c`，加入`add()`的类型声明。

```c
// File foo.c
#include <stdio.h>

int add(int, int);  // Add the prototype

int main(void) {
  printf("%d\n", add(2, 3));  // 5!
}
```

现在再编译就没有警告了。但是，你可能马上就会想到，如果多个文件都使用同一个函数，那么每个文件都需要加入函数类型的声明，一旦需要修改函数类型（比如改变函数参数的数量），就会非常麻烦。所以，通常的做法是新建一个专门的头文件`bar.h`，放置所有在`bar.c`里面定义的函数的类型声明。

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

上面代码中，`#include <stdio.h>`表示加入系统提供的头文件`stdio.h`，尖括号表示该文件的位置是系列目录；`#include "bar.h"`表示加入用户自己提供的头文件`bar.h`，这个文件没有放在尖括号里面，就表示它与当前源码文件在同一个目录。

另外，如果当前文件使用其他文件定义的变量，可以使用`extern`修饰词注明。

```c
extern int myVar;
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

## 多文件的编译

多个源码文件的项目，编译时需要所有文件一起编译。哪怕只是修改了一行，也需要从头编译，非常耗费时间。

为了节省时间，通常的做法是使用 GCC 的`-c`参数，将每个源码文件单独编译为对象文件（object file）。对象文件不是可执行文件，只是编译过程中的一个阶段性产物，文件名与源码文件相同，但是后缀名变成了`.o`。

```c
$ gcc -c foo.c # 生成 foo.o
$ gcc -c bar.c # 生成 bar.o
# 更省事的写法
$ gcc -c *.c
```

上面命令为源码文件`foo.c`和`bar.c`，分别生成对象文件`foo.o`和`bar.o`。

最后，再次使用`gcc`命令，将所有对象文件通过链接，合并生成一个可执行文件。

```c
$ gcc -o foo foo.o bar.o
# 更省事的写法
$ gcc -o foo *.o
```

这样做的最大好处就是，如果你修改了一个源码文件，那么只需要重新生成该源码文件的对象文件，其他的所有对象文件都可以继续使用原来的，把它们重新合并生成可执行文件。这样依赖，速度会快很多，能够节省大量时间。

## make 命令

大型项目的编译，如果全部手动完成，是非常麻烦的，容易出错。一般会使用专门的自动化编译工具，比如 make。它是一个命令行工具，有一个配置文件 makefile，定义了所有的编译依赖关系。

它可以指定多个编译目标，每个编译目标需要知道两件事：

- 依赖项（生成目标需要用到哪些文件）
- 生成命令（生成该目标用到哪些指令）

比如，对象文件`foo.o`是一个编译目标，它的依赖项是`foo.c`，生成命令是`gcc -c foo.c`。

配置文件 makefile 由多个编译目标组成。

```c
foo.o: foo.c
  gcc -c foo.c

bar.o: bar.c
  gcc -c bar.c

foo: foo.o bar.o
  gcc -o foo foo.o bar.o
```

上面是 makefile 的一个示例文件。它包含三个编译目标（`foo.o`、`bar.o`和`foo`），每个编译目标之间使用空行分隔。编译目标的第一行使用冒号注明依赖项，第二行注明生成命令。注意，第二行的缩进必须使用 Tab 键，如果使用空格键会报错。

编译时，只要输入下面的命令即可。

```c
$ make foo
```

上面示例中，make 工具会先确认编译目标`foo`是否存在。

（1）`foo`不存在：继续检查依赖项`foo.o`和`bar.o`是否存在，如果这两个对象文件也不存在，首先就会生成这两个依赖项。然后，再使用生成命令`gcc -o foo foo.o bar.o`，生成编译目标`foo`。

（2）`foo`存在：，Make 就会一层层检查依赖项的时间戳，在上次编译之后是否发生过变动。如果没有任何变动，就意味着不需要重新编译。如果有变动，则只重新编译发生变动的文件。

比如，我们只修改了`foo.c`，没有修改`bar.c`。运行`make foo`命令以后，Make 发现`bar.c`没有变动，因此不用重新生成`bar.o`，只需要重新生成`foo.o`。最后，将`foo.o`和`bar.o`重新链接，生成新的可执行文件`foo`。

Make 的最大好处就是自动处理编译过程，只重新编译变动过的文件，因此大大节省了时间。

