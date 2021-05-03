# 修饰符

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

## const

`const`修饰符表示变量不可修改，即声明了一个常量。

```c
const double PI = 3.14159;
```

上面示例里面的`const`，表示变量`PI`的值不能修改。如果修改的话，编译器会报错。

对于数组，`const`表示数组成员不能修改。

```c
const int arr = {1, 2, 3, 4};
```

上面示例中，`const`使得数组`arr`的成员无法修改。

如果函数接受数组作为参数，那么函数体内有可能会修改掉数组的成员。这时，可以在函数声明的时候，加入`const`修饰符，使得参数数组无法修改。

```c
void find(const int* arr, int n);
```

上面示例中，函数`find`的参数数组`arr`有`const`修饰，就无法修改数组成员。

对于指针变量，`const`有两种写法，含义是不一样的。如果`const`在`*`前面，则表示`*x`（指针指向的那个值）不可修改。

```c
// const 表示 *x 不能修改
int const *x
# 或者
const int *x
```

如果`const`在`*`后面，表示指针变量`x`（指针包含的地址）不可修改。

```c
// const 表示 x 不能修改
int* const x
```

这两者可以结合起来。

```c
const char* const x;
```

上面示例中，指针变量`x`指向一个字符串。两个`const`意味着，`x`的地址以及`x`指向的字符串，都不能修改。

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

### volatile

`volatile`修饰符表示所声明的变量，可能不预期地发生变化（即其他程序可能会更改它的值），不受 C 的实现的控制，因此编译器不要对这类变量进行优化。硬件设备的编程中，这个修饰符很常用。

`volatile`的语法与`const`一致。

```c
volatile int foo;
volatile int* bar;
```

它的目的是防止编译器的优化，请看下面的例子。

```c
int foo = x;
// 其他不改变 x 的语句
int bar = x;
```

上面代码中，由于变量`foo`和`bar`都等于`x`，而且`x`的值也没有发生变化，所以编译器可能会把`x`放入缓存，直接从缓存读取值（而不是从 x 的原始内存位置），为`foo`和`bar`赋值。如果`x`被设定为`volatile`，编译器就不会把它放入缓存，每次都从原始位置去取`x`的值，因为在两次读取之间，其他程序可能会改变`x`。

### restrict

`restrict`修饰符允许编译器优化某些代码。它只能用于指针，表明该指针是访问数据的唯一方式。

```c
int* restrict pt = (int*) malloc(10 * sizeof(int));
```

上面示例中，`restrict`表示变量`pt`是访问 malloc 所分配内存的唯一方式。

下面例子的变量`foo`，就不能使用`restrict`修饰符。

```c
int foo[10];
int* bar = foo;
```

上面示例中，变量`foo`指向的内存，可以用`bar`访问，因此就不能将`foo`设为 restrict。

如果编译器知道某块内存只能用一个方式访问，可能可以更好地优化代码，因为不用担心其他地方会修改值。

