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
