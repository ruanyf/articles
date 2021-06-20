# math.h

`math.h`这个头文件包含了很多数学函数的原型。

三角函数

- `double acos(double x)`： Returns the angle (0 to π radians) whose cosine is x
- `double asin(double x)`： Returns the angle (—π/2 to π/2 radians) whose sine is x
- `double atan(double x)`： Returns the angle (−π/2 to π/2 radians) whose tangent is x
- `double atan2(double y,double x)`： Returns the angle (−π to π radians) whose tangent is y / x
- `double cos(double x)`：Returns the cosine of x (x in radians)
- `double sin(double x)`：Returns the sine of x (x in radians)
- `double tan(double x)`： Returns the tangent of x (x in radians)

`acos()`、`asin()`、`atan()`函数中的角度，都以弧度为单位（1弧度=180/π=57.296度）。

```c
cos(PI/4) // 0.707107
```

双曲函数

- `double cosh(double x);`
- `double sinh(double x);`
- `double tanh(double x);`

指数函数和对数函数

- `double exp(double x)`： Returns the exponential function of x (ex)
- `double frexp(double value, int* exp)`
- `double ldexp(double x, int exp)`
- `double log(double x)`： Returns the natural logarithm of x
- `double log10(double x)`： Returns the base 10 logarithm of x
- `double modf(double value, double* iptr)`

`exp()`函数返回 e 的幂。

```c
exp(3.0) // 20.0855
```

`log()`是`exp()`的逆运算，计算以 e 为底的对数。

`log10()`计算以 10 为底的对数。

```c
log(20.0855) // 3.0
log10(10000) // 3.0
```

`modf()`函数将一个 double 类型的值拆解成两部分。它接受两个参数，第一个参数是一个 double 类型的浮点数，第二个参数是一个 double 变量指针。`modf()`将第一个参数的整数部分，存入第二个参数变量，并返回小数部分。

```c
// int_part 的值是 3.0
modf(3.14159, &int_part); // 返回 0.14159
```

`frexp()`将浮点数拆成小数部分`f`和指数部分`n`，使得原始值等于`f x 2^n`，其中`f`要么等于0，要么是一个在 0.5 到 1 之间的值。该函数返回`f`，并将`n`存入第二个参数的整数变量。

```c
// exp 的值是 4
frexp(12.0, &exp) // 返回 0.75

// exp 的值是 -1
frexp(0.25, &exp) // 返回 0.5
```

`ldexp()`是`frexp()`的逆运算，将`f x 2^n`的小数部分`f`和整数部分`n`，合成一个浮点数，即返回`f x 2^n`的值。

```c
ldexp(0.75, 4) // 返回 12.0
ldexp(0.5, -1) // 返回 0.25
```

其他函数

- `double pow(double x, double y)`：Returns x to the y power
- `double sqrt(double x)`：Returns the square root of x
- `double cbrt(double x)`：Returns the cube root of x
- `double ceil(double x)`： Returns the smallest integral value not less than x
- `double fabs(double x)`： Returns the absolute value of x
- `double floor(double x)`： Returns the largest integral value not greater than x



下面是一个例子。

```h
#include <math.h>

#define RAD_TO_DEG (180/(4 * atan(1)))
```

C 标准专门为 float 类型和 long double 类型提供了标准函数，即在原函数名前加上`f`或`l`后缀。因此，`sqrtf()`是`sqrt()`的 float 版本，`sqrtl()`是`sqrt()`的 long double 版本。

