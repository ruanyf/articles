# 命令行环境

## 命令行参数

```bash
$ ./foo i like turtles
```

命令行环境传入的参数，C 语言会把它们放在一个数组里面。`main()`函数的参数可以接收到这个数组。

```c
#include <stdio.h>

int main(int argc, char* argv[]) {
  for (int i = 0; i < argc; i++) {
    printf("arg %d: %s\n", i, argv[i]);
  }
}
```

上面示例中，`main()`函数的第一个参数`argc`是参数的数量，由于程序名也被计算在内，所以严格说是参数数量 + 1。第二个参数`argv`是参数数组的指针。也就是说，`argc`可以看作数组`argv`的成员数量。

`char* argv[]`写法的含义是，`argv`是一个数组，这个数组的每个成员是一个字符串。由于字符串又是字符的数组，所以下面三种写法是等价的。

```c
// 写法一
int main(int argc, char* argv[])

// 写法二
int main(int argc, char** argv)

// 写法三
int main(int argc, char argv[][])
```

另一方面，每个命令行参数既可以写成`argv[i]`，也可以写成`*(argv + i)`。

上面程序的输出如下。

```bash
$ ./foo i like turtles
arg 0: ./foo
arg 1: i
arg 2: like
arg 3: turtles
```

可以看到，`argv`数组的第一个成员是命令本身。

利用`argc`，可以限定函数只能有多少个参数。

```c
#include <stdio.h>

int main(int argc, char** argv) {
  if (argc != 3) {
     printf("usage: mult x y\n");
     return 1;
  }

  printf("%d\n", atoi(argv[1]) * atoi(argv[2]));
  return 0;
}
```

另外，`argv`数组的最后一个成员是 NULL 指针（`argv[argc] == NULL`）。所以，参数的循环条件可以有另一种写法。

```c
for (char** p = argv; *p != NULL; p++) {
  printf("arg: %s\n", *p);
}
```

## 退出状态

C 语言规定，如果`main()`函数没有`return`语句，那么默认会添加一句`return 0`，即返回整数`0`。这就是为什么`main()`语句通常约定返回一个整数值，并且返回整数`0`表示程序运行成功。由此约定，如果返回非零值，就表示程序运行出了问题。

注意，只有`main()`会默认添加`return 0`，其他函数都没有这个机制。

C 语言标准库`<stdlib.h>`提供了两个常量，用来表示程序的退出状态。

- `EXIT_SUCCESS`：程序成功终止。
- `EXIT_FAILURE`：程序因错误而终止。

## 环境变量

C 语言提供了`getenv()`函数（原型在`<stdlib.h>`）用来读取命令行环境变量。

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
  char* val = getenv("HOME");  // Try to get the value

    // Check to make sure it exists
    if (val == NULL) {
        printf("Cannot find the HOME environment variable\n");
        return 1;
    }

    printf("Value: %s\n", val);
}
```

