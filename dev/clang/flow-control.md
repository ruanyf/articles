# 流程控制

C 语言的程序是顺序执行的，即先执行前面的语句，再执行后面的语句。有一些特殊的语法结构提供了流程控制的功能，比如条件执行和循环执行。

## if 语句

`if`语句用于条件判断，当满足条件时，执行指定的语句。

```c
if (expression) statement
```

`if`后面的判断条件`expression`外面必须有圆括号，否则会报错。语句体部分如果只有一个语句，可以省略大括号，下面是一个例子。

```c
if (x == 10) printf("x is 10");
```

语句部分也可以写在单独一行。

```c
if (x == 10)
  printf("x is 10\n");
```

如果有多条语句，就需要把它们放在大括号里面，组成一个语句块。

```c
if (line_num == MAX_LINES) {
  line_num = 0;
  page_num++;
}
```

为了保持一致的代码风格，有时一条语句也会放在大括号里面，这样也便于以后添加语句。

```c
if (x == 10) {
  printf("x is 10\n");
}
```

`if`语句可以带有`else`分支，指定条件不成立时，所要执行的代码。

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

如果语句部分多余一行，同样可以把它们放在大括号里面。

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

条件表达式是`if`语句的简写，允许根据条件的值，执行两个操作之中的一个。

```c
expression1 ? expression2 : expression3
```

下面是一个例子。

```c
i > j ? i : j;
```

上面的代码等同于下面的`if`语句。

```c
if (i > j)
  return i;
else
  return j;
```

下面是求较小值的例子。

```c
min = (x < y) ? x : y;

// 等同于

if (x < y) {
  min = x;
}
else {
  min = y;
}
```

## switch 语句

switch 语句是一种特殊形式的 if...else 结构，用于判断条件有多个结果的情况。相比之下，if 结构只支持两个分支，而 switch 支持多个分支，比多重 if 的结构更加易读。

```c
switch (expression) {
  case expression: statement
  case expression: statement
  default: statement
}
```

下面是一个例子。

```c
switch (grade) {
  case 0:
    printf("False");
    break;
  case 1:
    printf("True");
    break;
  default:
    printf("Illegal");
}
```

上面示例中，根据变量`grade`不同的值，会执行不同的`case`分支。如果等于`0`，执行`case 0`的部分；如果等于`1`，执行`case 1`的部分；否则，执行`default`的部分。`default`表示处理以上所有`case`都不匹配的情况。

每个`case`部分的结尾，都应该有一个`break`语句，作用是跳出整个`switch`结构，不再往下执行。如果缺少`break`，就导致继续执行下一个`case`或`default`分支。

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

`while`语句用于循环结构，在满足条件时，不断进行循环执行指定的代码。

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

下面是一个例子。

```c
i = 0;

while (i < 10) {
  printf("i is now %d!\n", i);
  i++;
}

printf("All done!\n");
```

上面代码中，循环体会执行10次，每次将`i`增加`1`，直到等于`10`才退出循环。

只要条件为真，`while`会产生无限循环。下面是一种常见的无限循环的写法。

```c
while (1) {
  // ...
}
```

上面的示例虽然是无限循环，但是循环体内部可以用`break`语句跳出循环。

## do...while 结构

`do...while`结构是`while`的变体，它会先执行一次循环体，然后再判断是否满足条件。如果满足的话，就继续执行循环体，否则跳出循环。

```c
do statement
while (表达式);
```

注意，不管条件是否成立，循环体至少会执行一次。

```c
i = 10;

do --i;
while (i > 0);
```

上面的示例是`i`先减去1，再判断是否大于0。

如果循环部分有多条语句，就需要放在大括号里面。

```c
i = 10;

do {
  printf("i is %d\n", i);
  i++;
} while (i < 10);

printf("All done!\n");
```

上面例子中，变量`i`不满足小于`10`的条件，但是循环体还是会执行一次。

## for 语句

`for`语句是最常用的循环结构，通常用于精确控制循环次数。

```c
for (initialization; continuation; action)
  语句
```

`for`语句的条件部分有三个表达式。

- `initialization`：初始化表达式，用于初始化循环变量，只执行一次。
- `continuation`：判断表达式，只要为`true`，就会不断执行循环体。
- `action`：循环变量处理表达式，每次循环结束后执行，使得循环变量发生变化。

下面是一个例子。

```c
for (int i = 10; i > 0; i--)
  printf("i is %d\n", i);
```

上面示例中，循环变量在`for`的第一个表达式里面声明，表明该变量只用于本次循环。

条件部分的三个表达式，每一个都可以有多个语句，语句与语句之间使用逗号分隔。

```c
for (i = 0, j = 999; i < 10; i++, j--) {
  printf("%d, %d\n", i, j);
}
```

上面示例中，在初始化部分有两个语句，分别声明了变量`i`和`j`。

`for`的三个表达式都不是必需的，甚至可以全部省略，这会形成无限循环。

```c
for (;;) {
  printf("本行会无限循环地打印。\n" );
}
```

上面示例由于没有判断条件，就会形成无限循环。

## break 语句

`break`语句用于在循环体内部跳出循环，也可以用于`switch`语句。

```c
while(feeling_hungry) {
  eat_cake();
  if (feeling_sick) {
    break;
  }
  drink_coffee();
}
```

上面示例中，`break`命令可以跳出`while`循环。

注意，`break`命令只能跳出循环体和`switch`结构，不能跳出`if`结构。

## continue 语句

`continue`语句用于在循环体内部终止本次循环，进入下一轮循环。

```c
while(feeling_hungry) {
  if (not_lunch_yet) {
    continue;
  }
  eat_cake();
}
```

上面示例中，`continue`命令的作用是立即结束本次循环，不再执行后面的命令（`eat_cake()`），进入下一轮循环。

