# math.h

`math.h`这个头文件包含了很多数学函数的原型。

- `double acos(double x)`： Returns the angle (0 to π radians) whose cosine is x
- `double asin(double x)`： Returns the angle (—π/2 to π/2 radians) whose sine is x
- `double atan(double x)`： Returns the angle (−π/2 to π/2 radians) whose tangent is x
- `double atan2(double y,double x)`： Returns the angle (−π to π radians) whose tangent is y / x
- `double cos(double x)`：Returns the cosine of x (x in radians)
- `double sin(double x)`：Returns the sine of x (x in radians)
- `double tan(double x)`： Returns the tangent of x (x in radians)
- `double exp(double x)`： Returns the exponential function of x (ex)
- `double log(double x)`： Returns the natural logarithm of x
- `double log10(double x)`： Returns the base 10 logarithm of x
- `double pow(double x, double y)`：Returns x to the y power
- `double sqrt(double x)`：Returns the square root of x
- `double cbrt(double x)`：Returns the cube root of x
- `double ceil(double x)`： Returns the smallest integral value not less than x
- `double fabs(double x)`： Returns the absolute value of x
- `double floor(double x)`： Returns the largest integral value not greater than x

上面函数中的角度，都以弧度为单位（1弧度=180/π=57.296度）。

下面是一个例子。

```h
#include <math.h>

#define RAD_TO_DEG (180/(4 * atan(1)))
```

C 标准专门为 float 类型和 long double 类型提供了标准函数，即在原函数名前加上`f`或`l`后缀。因此，`sqrtf()`是`sqrt()`的 float 版本，`sqrtl()`是`sqrt()`的 long double 版本。

