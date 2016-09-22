# 变量的声明

## 声明的结构

声明一个变量时，前面可以加上三类修饰词。

- 类型符（Type specifier）：变量的类型
- 储存符（Storage class）：变量储存在哪里
- 修饰符（Type qualifier）：一些其他属性

类型符有以下几种。

- void
- char
- short
- int
- long
- long long
- signed
- unsigned
- float
- double
- struct
- enum
- union

储存符有以下几种。

- extern
- static
- register
- auto
- typedef

类型符有以下几种。

- const
- volatile
- restrict

## 变量声明的解读规则

- 首先，找出变量名
- 然后，从后向前解读
- 圆括号具有最高优先级
- 变量后边如果有`[]`，表示数组；如果有`()`，表示函数。
- `*`表示`pointer to`，即“指向xxx的指针”。

`int (*x)[12];`是“x is a pointer to an array of 12 int”，而`int *x[12];`是“x is an array of 12 pointer to int”

## 储存符

`extern`表示，变量储存在外部，没有必要为它分配空间。通常用来表示，声明在不同文件里面的全局变量。

`static`对于全局变量和局部变量有不同含义。如果用于局部变量，表示在同一个函数的不同执行之间，保持它的值，不会随着每次执行而初始化。它的行为类似于全局变量，但只在函数内部可用。用于局部变量时，表示变量对于其他C文件并非全局可用，即该变量不会被链接（link）。总得来说，`static`声明的变量都是无法从它所在的源文件之外读取的。

`register`表示变量应该储存在寄存器之中。编译器不一定会遵守这个建议。对于`register`声明的变量，不能取它的地址，即不能使用`&`运算符。

`auto`表示这个变量的储存由编译器自主分配。它没有实际作用。因为只要不是`extern`，都是由编译器自主分配的。

`typedef`用来为某种类型声明一个别名。

```c
typedef int *xpto;
```

上面代码中，`xpto`就代表`int *`。

```c
xpto x;
```

前面不能再加其他修饰符。

```c
unsigned xpto x; /* 无效 */
```

## 修饰符

### const

`const`命令表示变量不可修改。

```c
int *const x
```

如果它的前面有`*`，表示指针变量`x`不可修改。

```c
int const *x
# 或者
const int *x
```

如果`const`在`*`前面，则表示`*x`所代表的那个值不可修改。

这两者可以结合起来。

```c
const char **const*const x;
```

### volatile

`volatile`表示它所声明的变量，可能不预期地发生变量，不受C的实现的控制，因此编译器不要对这类变量进行优化。硬件设备的编程中，这个命令很常用，表示。

```c
while (x,x) { ... }
```

上面代码中，如果`x`是一个`volatile`变量，则编译器会真的对`x`计算两次值。否则，编译器会将上面的代码优化如下。

```c
while (x) { ... }
```

### restrict

`restrict`命令表示它所声明的变量，是唯一接触到其所代表的内存区域的途径。这对编译器优化很有好处。

## 参考链接

- [The absolute, definitive guide to decipher C declarations](http://codinghighway.com/2013/12/29/the-absolute-definitive-guide-to-decipher-c-declarations/), by Filipe Gonçalves
