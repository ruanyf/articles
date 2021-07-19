# typedef 命令

## 简介

`typedef`命令用来为某个类型起别名。

```c
typedef type name;
```

上面代码中，`type`代表类型名，`name`代表别名。

```c
typedef unsigned char BYTE;

BYTE c = 'z';
```

上面示例中，`typedef`命令为类型`unsign char`起别名`BYTE`。

typedef 可以一次指定多个别名。

```c
typedef int antelope, bagel, mushroom;
```

typedef 也可以用来为数组起别名。

```c
typedef int five_ints[5];

five_ints x = {11, 22, 33, 44, 55};
```

typedef 为函数起别名的写法如下。

```c
typedef signed char (*fp)(void);
```

上面示例中，类型别名`fp`是一个指针，代表函数`signed char (*)(void)`。

## 主要好处

`typedef`为类型起别名的好处，主要有下面几点。

（1）更好的代码可读性。

```c
typedef char* STRING;

STRING name;
```

上面示例为字符指针起别名为`STRING`，以后使用`STRING`声明变量时，就可以轻易辨别该变量是字符串。

（2）为 struct、union、enum 等命令定义的复杂数据结构创建别名，从而便于引用。

```c
struct treenode {
  // ...
}

typedef struct treenode* Tree;
```

上面示例中，`Tree`为`struct treenode*`的别名。

typedef 可以与 struct 命令联合使用，自定义数据类型的同时，为它起一个别名。

```c
typedef struct animal {
  char* name;
  int leg_count, speed;
} animal;
```

上面示例中，自定义数据类型时，同时使用`typedef`命令，为`struct animal`起了一个别名`animal`。

这种情况下，C 语言允许省略 struct 命令后面的类型名。

```c
typedef struct {
  char *name;
  int leg_count, speed;
} animal;
```

上面示例相当于为一个匿名的数据类型起了别名`animal`。

（3）typedef 方便以后为变量改类型。

```c
typedef float app_float;

app_float f1, f2, f3;
```

上面示例中，变量`f1`、`f2`、`f3`的类型都是`float`。如果以后需要为它们改类型，只需要修改`typedef`语句即可。

```c
typedef long double app_float;
```

上面命令将变量`f1`、`f2`、`f3`的类型都改为`long double`。

（4）可移植性

某一个值在不同计算机上的类型，可能是不一样的。

```c
int i = 100000;
```

上面代码在32位整数的计算机没有问题，但是在16位整数的计算机就会出错。

C 语言的解决办法，就是提供了一些类型别名，在不同计算机上会解释成不同类型，比如`ptrdiff_t`、`size_t`、`wchar_t`、`int32_t`等。

```c
int32_t i = 100000;
```

上面示例将变量`i`声明成`int32_t`类型，保证它在不同计算机上都是32位宽度，移植代码时就不会出错。

这一类的类型别名都是用 typedef 定义的。

```c
typedef long int ptrdiff_t;
typedef unsigned long int size_t;
typedef int wchar_t;
```

这些整数类型别名都放在头文件`stdint.h`，不同架构的计算机只需修改这个头文件即可，而无需修改代码。

因此，`typedef`有助于提高代码的可移植性，使其能适配不同架构的计算机。

