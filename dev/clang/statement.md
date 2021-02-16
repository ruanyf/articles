# 语句

语句（statement）用来执行某个命令，通常没有返回值。

C 语言使用大括号`{}`，将多个语句组成一个语法块。

## if 语句

`if`语句用于判断。

```c
if (expression) statement
```

判断表达式外面必须有圆括号，否则会报错。语句体部分如果只有一个语句，可以省略大括号，下面是一个例子。

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

## 三元运算符 ?:

C 语言有一个三元表达式`?:`，可以用作`if...else`的简写形式。

```c
<expression1> ? <expression2> : <expression3>
```

这个操作符的含义是，表达式`expression1`如果为`true`（非0值），就执行`expression2`，否则执行`expression3`。


下面是求较小值的例子。

```c
min = (x < y) ? x : y;

# 等同于

if (x < y) {
  min = x;
}
else {
  min = y;
}
```

## switch 语句

switch 语句是一种特殊形式的 if 结构，用于多个分支的情况，if 判断只能支持两个分支。

如果一个表达式可能有多个整数值，那么就可以使用 switch 语句，不同的返回值跳到不同的代码块。

```c
switch (<expression>) {
  case <value1>:
    <statement>
    break;
  case <value2>:
    <statement>
    break;
  case <value3>:
  case <value4>:
    <statement>
    break;
  default: // optional
    <statement>
}
```

switch 语句后面的表达式`expression`，要放在圆括号里面，否则会报错。case 语句用来对应表达式`expression`的不同整数值，后面用冒号指定要执行的代码。default 语句用来指定前面的 case 都不匹配的情况，必须放在所有 case 的后面，否则后面的 case 都不会执行到。default 的部分是可选的，如果没有这部分的话，遇到所有的 case 都不匹配表达式的值的情况，就会直接跳出整个 switch 代码块。

这里需要注意的是 break 语句，它只能放在 case 代码分支里面，用来跳出整个 switch 代码块。这个语句非常重要，如果没有的话，就会接着执行下一个 case。上面的例子里面，`value3`的 case 后面没有任何语句，直接连着下一个 case，这时这两个 case 可以看成是一体的，如果`expression`的返回值是`value3`，就会接着执行`value4`的 case。

## while 语句

`while`语句用来在满足条件时，不断进行循环。

```c
while (expression)
  statement
```

上面的代码中，如果表达式`expression`为`true`，就会执行`statement`语句，否则就不执行。

下面是一个例子。

```c
while (i < n)
  i = i + 2;
```

上面的示例当`i`小于`n`，`i`就会增加2。

如果循环体有多个语句，就需要使用大括号将这些语句组合在一起。

```c
while (expression) {
  statements;
}
```

只要条件为真，`while`会产生无限循环。下面是一种常见的无限循环的写法。

```c
while (1) {
  // ...
}
```

上面的示例虽然是无限循环，但是循环体内部可以用`break`语句跳出循环。

## do...while 结构

`do...while`结构是`while`的变体，先执行一次循环体，然后再判断是否满足条件，只要满足就继续执行循环体，否则跳出循环。

```c
do statement
while (表达式);
```

注意，不管条件是否成立，循环体至少会执行一次。

```c
do {
  --i;
} while (i > 0);
```

上面的示例是`i`先减去1，再判断是否大于0。

## for 语句

`for`语句通常用于精确控制循环次数，也是最常用的循环结构。

```c
for (initialization; continuation; action)
  语句
```

`for`语句的条件部分有三个表达式。第一个表达式`initialization`是初始化表达式，用于初始化循环变量，只执行一次；第二个表达式`continuation`是判断表达式，只要为`true`，就会不断执行循环体；第三个表达式`action`是循环变量处理表达式，每次循环结束后执行，使得循环变量发生变化。

下面是一个例子。

```c
for (int i = 10; i > 0; i--) {
  <statement>
}
```

上面示例中，循环变量在`for`的第一个表达式里面声明，表明该变量只用于本次循环。

`for`的三个表达式都不是必需的，甚至可以全部省略，这会形成无限循环。

```c
for (;;) {
  <statement>
}
```

上面示例由于没有判断条件，就会形成无限循环。

条件部分的每个表达式，都可以有多个语句，每个语句之间使用逗号分隔，以最后一个语句的返回值，作为整个表达式的返回值。

## break 语句

`break`语句用于在循环体内部跳出循环，也可以用于`switch`语句。

## continue 语句

`continue`语句用于在循环体内部终止本次循环，进入下一轮循环。

