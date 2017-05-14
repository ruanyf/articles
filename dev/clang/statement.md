# 语句

语句（statement）用来执行某个命令，通常没有返回值。

## if 语句

`if`语句用于判断。

```c
if (expression) statement
```

下面是一个例子。

```c
if (line_num == MAX_LINES)
  line_num = 0;
```

多个语句组成的复合语句，必须写在大括号里面。

```c
if (line_num == MAX_LINES) {
  line_num = 0;
  page_num++;
}
```

`if`语句可以带有`else`语句。

```c
if (expression) statement
else statement
```

下面是一个例子。

```c
if (i > j)
  max = i;
else
  max = j;
```

`else`可以与另一个`if`语句连用。

```c
if (expression)
  statement
else if (expression)
  statement
...
else if (expression)
  statement
else
  statement
```

## while 语句

`while`语句在满足条件时，不断进行循环。

```c
while (expression)
  statement
```

下面是一个例子。

```c
while (i < n)
  i = i + 2;
```

只要条件为真，就会无限循环。下面是一种常见的写法。

```c
while (1) {
  // ...
}
```

## do 语句

`do`语句先执行一次循环体，然后再判断是否还要执行。

```c
do statement
while (表达式);
```

它与`while`语句的区别是，不管怎样，循环体至少会执行一次。

```c
do {
  --i;
} while (i > 0);
```

## for 语句

`for`语句通常用于精确控制循环次数。

```c
for (表达式1; 表达式2; 表达式)
  语句
```

下面是一个例子。

```c
for (i = 10; i > 0; i--)
  printf("%d\n", i):
```

循环变量可以在`for`的第一个表达式里面声明。

```c
for (int i = 0; i < n; i++)
```
