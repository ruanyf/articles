# Enum 类型

Enum 类型是一组整数常量，特点是每个常量都有自己的名称。

```c
enum {
  ONE=1,
  TWO=2
};

printf("%d %d", ONE, TWO);  // 1 2
```

上面示例中，`enum`是一个关键字，后面跟着一个代码块，常量就在代码内声明。`ONE`和`TWO`就是两个 Enum 常量。

常量之间使用逗号分隔。最后一个常量后面的尾逗号，可以省略，也可以保留。

```c
enum {
  ONE=1,
  TWO=2,
}
```

Enum 内部的常量名，可以不是大写，但是通常都使用大写。

Enum 类型的值只能是整数，不能是其他类型。因此，任何可以使用整数的场合，都可以使用 Enum 常量。

Enum 会自动编号，因此可以不必为常量赋值。C 语言会自动从0开始编号，自动递增，为常量赋值。

```c
enum {
  SHEEP,  // Value is 0
  WHEAT,  // Value is 1
  WOOD,   // Value is 2
  BRICK,  // Value is 3
  ORE     // Value is 4
};

printf("%d %d\n", SHEEP, BRICK);  // 0 2
```

Enum 常量可以是不连续的值。

```c
enum {
  X=2,
  Y=18,
  Z=-2
};
```

Enum 常量可以是同一个值。

```c
enum {
  X=2,
  Y=2,
  Z=2
};
```

如果一组常量之中，有些指定了值，有些没有指定。那么，没有指定值的常量会从上一个指定了值的常量，开始自动递增赋值。

```c
enum {
      A,    // 0, default starting value
      B,    // 1
      C=4,  // 4, manually set
      D,    // 5
      E,    // 6
      F=3   // 3, manually set
      G,    // 4
      H     // 5
}
```

Enum 的作用域与变量相同。如果是在顶层声明，那么在整个文件内都有效；如果是在代码块内部声明，则只对该代码块有效。

比起使用`int`声明常量，Enum 声明的好处是更清晰地表示代码意图。

## 类型名

Enum 类型允许为这个类型起一个名称。

```c
enum resource {
  SHEEP,
  WHEAT,
  WOOD,
  BRICK,
  ORE
};

enum resource r = BRICK;
```

上面示例中，Enum 类型的名称是`enum resource`。注意，不是`resource`。变量声明时，就使用这个类型名。

另一种方法是使用`typedef`命令，为 Enum 类型起别名。

```c
typedef enum {
  SHEEP,
  WHEAT,
  WOOD,
  BRICK,
  ORE
} RESOURCE;

RESOURCE r = BRICK;
```

上面示例中，`RESOURCE`是 Enum 类型的别名。声明变量时，使用这个别名即可。

还有一种不常见的写法，就是声明 Enum 类型时，在同一行为变量赋值。

```c
enum {
        SHEEP,
        WHEAT,
        WOOD,
        BRICK,
        ORE
} r = BRICK, s = WOOD;

// 或者

enum resource {   // <-- type is now "enum resource"
        SHEEP,
        WHEAT,
        WOOD,
        BRICK,
        ORE
} r = BRICK, s = WOOD;
```
