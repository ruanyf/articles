# 函数

## 简介

函数是一段可以重复执行的代码。它可以接受不同的参数，返回对应的值。

下面就是一个函数的例子。

```c
int plus_one(int n) {
  return n + 1;
}
```

上面的示例中，声明了一个函数`plus_one()`。函数声明时，首先需要给出返回值的类型，上例是`int plus_one`，表示该函数的返回值是一个整数。函数名后面的括号里面，需要声明参数的类型和参数名，`plus_one(int n)`表示这个函数有一个整数参数`n`。

注意，函数声明的结尾不需要加分号。

调用函数只要在函数名后面加上括号就可以了，参数放在括号里面，就像下面这样。

```c
int a = plus_one(13);
// a 等于 14
```

函数必须声明后使用，否则会报错。也就是说，一定要在使用`plus_one()`之前，声明这个函数。像下面这样写，编译时会报错。

```c
int a = plus_one(13);

int plus_one(int n) {
  return n + 1;
}
```

上面代码中，在调用`plus_one()`之后，才声明这个函数，导致编译时会报错。

没有返回值的函数，声明时要用`void`关键字表示返回值的类型。没有参数的函数，声明时要用`void`关键字表示参数类型。

```c
void myFunc(void) {
  // ...
}
```

上面的`myFunc()`函数，既没有返回值，调用时也不需要参数。

函数可以调用自身，这就叫做递归（recursion）。下面是斐波那契数列的例子。

```c
unsigned long Fibonacci(unsigned n) {
  if (n > 2)
    return Fibonacci(n - 1) + Fibonacci(n - 2);
  else
    return 1;
}
```

上面示例中，函数`Fibonacci()`调用了自身。

下面是两个变量交换值的例子。

```c
void Swap(int* x, int* y){
  int temp;
  temp = *x;
  *x = *y;
  *y = temp;
}

int a = 1;
int b = 2;
Swap(&a, &b);
```

上面示例由于没有返回值，使用`void`关键字表示函数返回类型，并且也没有`return`命令。

```c
static int Twice(int num) {
  int result = num * 2;
  return(result);
}
```

上面示例中，`static`关键字表示该函数只能在当前文件里使用，如果没有这个关键字，其他文件也可以使用这个函数，但是提供原型。`int`表示函数返回值的类型，`Twice`是函数名，`int num`表示函数参数`num`的类型是`int`。函数体内部，`return`命令用来返回值。

## 传值引用

如果函数的参数是一个变量，那么调用时，传入的是这个变量的值的副本，而不是变量本身。

```c
void increment(int a) {
  a++;
}

int main(void) {
  int i = 10;
  increment(i);
}
```

上面示例中，调用`increment(i)`以后，`main`函数里面的`i`不会发生变化，因为在函数`increment`里面递增是`i`的副本。

注意，`Swap`函数的参数传入的是变量指针，而不是变量本身。这是因为 C 语言的函数参数是传值的，即传入的是参数变量的拷贝，而不是参数本身，所以如果写成下面这样，直接传入参数变量本身，是不会生效的。

```c
void Swap(int x, int y) {
  int temp;
  temp = x;
  x = y;
  y = temp;
}

int a = 1;
int b = 2;
Swap(a, b); // 无效
```

上面的写法不会产生交换变量值的效果，因为传入的变量是原始变量`a`和`b`的拷贝，不管函数体怎么操作，都影响不了原始变量。

## 函数名是指针

C 语言的函数名，本质上是函数体的指针。它很特殊，一方面调用函数时，其实可以在函数名前面加上星号（`*`）。

```c
myFunction(string)
// 等同于
(*myFunction)(string)
```

另一方面，`&`运算符也可以取到函数的地址。

```c
find(myFunction)
// 等同于
find(&myFunction)
```

当然，为了简洁易读，函数名前面一般情况都不加`*`和`&`。

由于这种矛盾，下面两种写法都能从函数指针运行一个函数。

```c
void ToUpper(char*);
void ToLower(char*);
void (*pf)(char*);

char str[] = "hello";

// 写法一
pf = ToUpper;
(*pf)(str);

// 写法二
pf = ToLower;
pf(str);
```

上面代码中，`pf`是一个函数指针，不管前面加不加`*`，都能通过指针运行一个函数。

## main() 函数

C 语言规定，`main()`是程序的入口函数，即程序总是先执行`main()`函数。因此，每个程序至少应该有一个`main()`函数，如果没有该函数，程序就无法启动。

通常，`main()`返回一个整数值。根据惯例，返回`0`表示程序运行成功，返回非零整数表示程序运行出现了问题。系统根据`main()`的返回值，确定程序是否运行成功。

## 函数原型

前面说过，函数必须先声明，后使用。由于程序总是先运行`main()`函数，导致所有其他函数都必须在`main()`函数之前声明。

```c
int func1(void) {
}

int func2(void) {
}

int main(void) {
  func1();
  func2();
  return 0;
}
```

上面代码中，`main()`函数必须在最后声明，否则编译时会报错，找不到`func1()`或`func2()`的声明。

这样写不是很方便，因为`main()`是整个程序的入口，也是主要逻辑，放在最前面比较好。C 语言提供的解决方法是，只要在程序开头处给出函数原型，函数就可以先使用、后声明。

所谓函数原型，就是只给出函数的返回值类型和参数类型信息。

```c
int twice(int num);

int main(int num) {
  return twice(num);
}

int twice(int num) {
  return 2 * num;
}
```

上面示例中，函数`twice()`是在`main()`后面，但是先给出了函数原型，所以可以正确编译。

函数原型只需要给出返回值和参数的类型信息即可，所以可以省略参数名。

```c
int twice(int num);
// 等同于
int twice(int);
```

上面两种原型的写法，都是合法的。

注意，函数原型必须以分号结尾。

如果脚本使用不在当前文件定义的函数，那么需要先给出函数的原型，然后才能使用该函数。

函数原型是返回值的类型 + 函数名 + 参数类型，不包括函数体，最后以分号结尾。

```c
int Twice(int num);
void Swap(int* a, int* b);
```

只要先给出原型，函数就可以先使用、后声明。所以，有些程序员在脚本头部，给出当前脚本使用的所有函数的原型，即使这个函数是在当前脚本定义的也是如此。

```c
int foo(void);

int main(void) {
  int i;
  i = foo();
}

int foo(void) {
  return 3490;
}
```

上面示例中，只要先给出函数`foo()`的原型，就可以先使用这个函数，后给出函数定义。

## 说明符

C 语言提供了一些说明符，让函数内部的变量用法变得更加明确。

### extern 说明符

有时候，函数内部会用到外部声明的变量。为了明确表示，某个变量是外部声明的，C 语言允许在函数体内部使用`extern`对这个变量加以说明，表示自己会用到这个变量。

```c
int foo;
int bar[10];

int main(void) {
  extern int foo;
  extern int bar[];
}
```

上面示例中，函数`main()`内部的两条变量声明是可选的，表明这两个变量是函数体外部声明的。有了它们以后，就可以明确知道，函数的运行依赖这两个外部变量。另外，由于外部声明了`bar`数组的长度，内部声明时就可以省略长度。

### static 说明符

默认情况下，每次调用函数时，函数的内部变量都会重新初始化，不会保留上一次运行的值。`static`说明符可以改变这种行为。

`static`用于函数内部声明变量时，表示该变量只需要初始化一次，不需要在每次调用时都进行初始化。也就是说，它的值在两次调用之间保持不变。

```c
#include <stdio.h>

void counter(void) {
  static int count = 1;  // 只初始化一次
  printf("%d\n", count);
  count++;
}

int main(void) {
  counter();  // 1
  counter();  // 2
  counter();  // 3
  counter();  // 4
}
```

上面示例中，函数`counter`的内部变量`count`，使用`static`说明符声明，表面这个变量只初始化一次，以后每次调用时都会使用上一次的值，造成递增的效果。

### const 说明符

函数参数里面的`const`说明符，表示函数内部不得修改该参数变量。

```c
void foo(const struct fraction* fract);
```

上面示例中，函数参数`fract`前面的`const`说明符，表示函数体内部不会修改`fract`所指向的结构体的值。

