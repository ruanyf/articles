# stdlib.h

## atoi()

`atoi()`函数将字符串类型的字母和数字，转换为整数。

它接受一个字符串作为参数。

```c
char s[3] = "10";
int times = atoi(s);
```

不是参数是数字开头的字符串，`atoi()`会只转换数字部分，比如`atoi("42regular")`会返回整数`42`。如果首字符不是数字，比如“hello world”，则会返回`0`。

## atof()

`atof()`函数将字符串转换成 double 类型的值。

`atol()`函数把字符串转换成 long 类型的值。它们的工作原理和atoi()类似。

strtol() 把字符串转换成long类型的值

strtoul()把字符串转换成unsigned long类型的值

strtod()把字符串转换成double类型的值。

这些函数的智能之处在于识别和报告字符串中的首字符是否是数字。而且，strtol()和strtoul()还可以指定数字的进制。

```c
char* end;

long value = strtol("0xff", &end, 16);
printf("%ld\n", value); // 255
printf("%s\n", end); // 无内容

value = strtol("0xffxx", &end, 16);
printf("%ld\n", value); // 255
printf("%s\n", end); // xx
```

上面示例中，`strtol()`的第一个参数是读取的字符串，第二个参数是解析结束时剩下的无法解析的字符串，第三个参数是解析所采用的进制。

