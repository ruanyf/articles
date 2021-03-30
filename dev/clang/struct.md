# Struct 命令

## 简介

除了内置的数据类型，C 语言允许使用`struct`命令自定义复杂的数据类型，将不同类型的值组合在一起。这对向函数传递多个数据很有用，也有利于增强代码的可读性。C 语言没有其他语言的对象（object）和类（class）的概念，我们可以将 Struct 结构视为只有属性、没有方法的类。

```clang
struct fraction {
  int numerator;
  int denominator;
};
```

上面示例定义了一个分数的数据类型，类型名叫做`struct fraction`，包含两个属性`numerator`和`denominator`。

注意，`struct`语句结尾的分号不能省略，否则很容易产生错误。

定义好了类型以后，就可以声明变量了。

```clang
struct fraction f1;

f1.numerator = 22;
f1.denominator = 7;
```

声明变量时，自定义的类型名前面，不要忘记加上`struct`关键字。变量的属性通过点（`.`）来表示。

除了逐一对属性赋值，也可以使用大括号，一次性对 Struct 结构赋值。

```c
struct car {
  char* name;
  float price;
  int speed;
};

struct car saturn = {"Saturn SL/2", 16000.99, 175};
```

注意，大括号里面的值的顺序，必须与 Struct 类型声明时的顺序一致。否则，必须为每个值指定属性名。

```c
struct car saturn = {.speed=172, .name="Saturn SL/2"};
```

上面示例中，初始化的属性少于声明时的属性，这时剩下的那些属性都会初始化为`0`。

## 自我引用

Struct 结构可以自我引用，即数据内部再次使用当前结构。比如，链条节点的结构就是自我引用。

```c
struct node {
  int data;
  struct node *next;
};
```

下面使用上面的结构，生成一个三个节点的链表。

```c
struct node *head;

// Hackishly set up a linked list (11)->(22)->(33)
head = malloc(sizeof(struct node));

head->data = 11;
head->next = malloc(sizeof(struct node));

head->next->data = 22;
head->next->next = malloc(sizeof(struct node));

head->next->next->data = 33;
head->next->next->next = NULL;

// Traverse it
for (struct node *cur = head; cur != NULL; cur = cur->next) {
  printf("%d\n", cur->data);
}
```

## 函数传參

Struct 结构传入函数时，一般会传入指针。

```c
void set_price(struct car* c, float new_price) {
  // 错误
  c.price = new_price;
  // 正确
  (*c).price = new_price;
}
```

上面示例中，参数`c`是一个 Struct 结构的指针。这时不能在指针上使用点运算符（`.`），去引用属性，而要先使用`*`运算符取出指针的值，然后再使用点运算符。

这样的写法很麻烦，C 语言就引入了一个新的箭头运算符，可以从 Struct 指针上直接获取属性。

```c
void set_price(struct car *c, float new_price) {
  c->price = new_price;
}
```

总结一下，Struct 变量使用点运算符（`.`）获取属性，Struct 指针使用箭头运算符（`->`）获取属性。

## 匿名 Struct

Struct 允许定义匿名结构，即省略结构名。

```c
struct {
  char *name;
  int leg_count, speed;
};
```

上面的数据结构，`struct`命令后面没有结构名，所以无法引用。

为了引用匿名结构，必须在定义的同时，声明对应的变量。

```c
struct {
  char *name;
  int leg_count, speed;
} a, b, c;

a.name = "antelope";
c.leg_count = 4;
```

上面示例的`a`、`b`、`c`就是变量名，它们的类型就是前面自定义的数据结构。

更常见的用法，是为匿名 Struct 结构指定一个别名。

```c
typedef struct {
  char* name;
  int leg_count, speed;
} animal;

animal a, b, c;
```

## Struct 的复制

Struct 变量可以使用赋值运算符（`=`），复制给另一个变量，这时会产生了一个原始值的复本。

```c
struct cat a, b;

b = a;
```

如果将 Struct 值传入函数，也是会产生一个值的复本。

