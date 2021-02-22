# 预处理器（Preprocessor）

C 语言编译器在编译程序之前，会先使用预处理器（preprocessor）处理代码。所以，C 语言提供了一些预处理器专用的语法。

## #define

`#define`命令定义替换模式，会将源码里面给定的词替换成另一个词。

```c
#define MAX 100
```

上面示例定义将源码里面的`MAX`，全部替换成`100`。

## #include

`#include`命令用于编译时插入其他源码文件，常用于包含头文件（后缀名为`.h`的文件），即包含函数原型的文件。

```c
#include "foo.h" // 包含用户提供的头文件

#include <foo.h> // 包含系统提供的头文件
```

## #if...#else

`#if...#else`命令用于控制哪些行可以被编译，常常与`#define`配合使用。

```c
#define FOO 1

#if FOO
  aaa
  aaa
#else
  bbb
  bbb
```

上面示例中，由于`FOO`等于1，所以`aaa`会进入编译，`bbb`会被省略。如果`FOO`等于0，结果就会正好倒过来。

## #pragma once

`#pragma once`用来解决一个头文件被包含多次的问题。
