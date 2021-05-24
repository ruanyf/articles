# typedef 命令

`typedef`命令用来为某个类型起别名。

```c
typedef type name;
```

上面代码中，`type`代表类型名，`name`代表别名。

```c
typedef unsigned char BYTE;

BYTE c = 'z';
```

上面示例中，`typedef`命令为类型`unsign char`起别名`BYTE`。

`typedef`的主要好处，是更好的代码可读性。

```c
typedef char* STRING;

STRING name;
```

上面示例为字符指针起别名为`STRING`，以后使用`STRING`声明变量时，就可以轻易辨别该变量是字符串。

typedef 可以一次指定多个别名。

```c
typedef int antelope, bagel, mushroom;
```

`typedef`的另一个用处，是为 struct、union、enum 等命令定义的复杂数据结构创建别名，从而便于引用。

```c
typedef struct treenode* Tree;
```

上面示例中，`Tree`为`struct treenode*`的别名。

type 可以与 struct 命令联合使用，自定义数据类型的同时，为它起一个别名。

```c
typedef struct animal {
  char* name;
  int leg_count, speed;
} animal;
```

上面示例中，自定义数据类型时，同时使用`typedef`命令，为`struct animal`起了一个别名`animal`。

这种情况下，C 语言允许省略 struct 命令后面的类型名。

```c
typedef struct {
  char *name;
  int leg_count, speed;
} animal;
```

上面示例相当于为一个匿名的数据类型起了别名`animal`。

typedef 别名的另一个作用，就是方便以后为变量改类型，这有利于代码适配不同架构的计算机。

```c
typedef float app_float;

app_float f1, f2, f3;
```

上面示例中，变量`f1`、`f2`、`f3`的类型都是`float`。如果以后需要为它们改类型，只需要修改`typedef`语句即可。

```c
typedef long double app_float;
```

上面命令将变量`f1`、`f2`、`f3`的类型都改为`long double`。

typedef 也可以用来为数组起别名。

```c
typedef int five_ints[5];

five_ints x = {11, 22, 33, 44, 55};
```

