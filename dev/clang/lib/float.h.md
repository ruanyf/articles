# float.h

`float.h`定义了浮点数类型 float、double、long double 的一些宏，规定了这些类型的范围和精度。

`FLT_ROUNDS`：当前浮点数加法的四舍五入方向。它有以下可能的值。

- -1：不确定。
- 0：向零舍入。
- 1：向最近的整数舍入。
- 2：向正无穷方向舍入。
- 3：向负无穷方向舍入。

`FLT_RADIX`：科学计数法的指数部分的底（base），一般总是2。

有效数字的个数

- `FLT_MANT_DIG`
- `DBL_MANT_DIG`
- `LDBL_MANT_DIG`

有效数字的个数（十进制）。

- `FLT_DIG`
- `DBL_DIG`
- `LDBL_DIG`

科学计数法的指数部分的最小次幂（负数）

- `FLT_MIN_EXP`
- `DBL_MIN_EXP`
- `LDBL_MIN_EXP`

科学计数法的指数部分的十进制最小次幂（负数）

- `FLT_MIN_10_EXP`
- `DBL_MIN_10_EXP`
- `LDBL_MIN_10_EXP`

科学计数法的指数部分的最大次幂

- `FLT_MAX_EXP`
- `DBL_MAX_EXP`
- `LDBL_MAX_EXP`

科学计数法的指数部分的十进制最大次幂

- `FLT_MAX_10_EXP`
- `DBL_MAX_10_EXP`
- `LDBL_MAX_10_EXP`

最大值

- `FLT_MAX`
- `DBL_MAX`
- `LDBL_MAX`

最小的正值

- `FLT_MIN`
- `DBL_MIN`
- `LDBL_MIN`

两数之间可表示的最小差值（最小精度）

- `FLT_EPSILON`
- `DBL_EPSILON`
- `LDBL_EPSILON`

`DECIMAL_DIG`：十进制有效位数。

`FLT_EVAL_METHOD`：浮点数的运算方法。它可能有以下值。

- -1：不确定。
- 0：在当前类型中运算。
- 1：float 和 double 类型的运算使用 double 类型的范围和精度求值。
- 2：所有浮点数类型的运算使用 long double 类型的范围和精度求值。

