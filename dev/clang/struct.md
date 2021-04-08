# Struct 命令

## 简介

C 语言内置的数据类型，除了最基本的几种原始类型，只有数组属于复合类型，且只能包含相同类型的数据，并不够用。实际开发中，主要有下面两种情况，需要更灵活强大的复合类型。

- 复杂的物体需要使用多个变量描述，这些变量都是相关的，最好有某种机制将它们联系起来。
- 某些函数需要传入多个参数，如果一个个按照顺序传入，非常麻烦，最好能组合成一个复合数据传入。

为了解决这些问题，C 语言提供了`struct`命令，允许自定义复合数据类型，将不同类型的值组合在一起。这样不仅为编程提供方便，也有利于增强代码的可读性。C 语言没有其他语言的对象（object）和类（class）的概念，Struct 结构很大程度上提供了对象和类的功能，可以将它视为只有属性、没有方法的类。

下面是`struct`命令自定义数据类型的一个例子。

```clang
struct fraction {
  int numerator;
  int denominator;
};
```

上面示例定义了一个分数的数据类型`fraction`，包含两个属性`numerator`和`denominator`。

注意，`struct`语句结尾的分号不能省略，否则很容易产生错误。

定义好了类型以后，就可以声明变量了。

```clang
struct fraction f1;

f1.numerator = 22;
f1.denominator = 7;
```

声明变量时，类型名前面，不要忘记加上`struct`关键字。也就是说，必须使用`struct fraction`声明变量，不能只用`fraction`。变量的属性通过点（`.`）来表示。

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

声明变量以后，可以修改某个属性的值。

```c
struct car saturn = {.speed=172, .name="Saturn SL/2"};
saturn.speed = 168;
```

上面示例将`speed`属性的值改成`168`。

`typedef`命令可以为 Struct 结构指定一个别名，这样使用起来更简洁。

```c
typedef struct cell_phone {
  int cell_no;
  float minutes_of_charge;
} phone;

phone p = {5551234, 5};
```

上面示例中，`phone`就是`struct cell_phone`的别名。

## Struct 的复制

Struct 变量可以使用赋值运算符（`=`），复制给另一个变量，这时会生成一个全新的副本。系统会分配一块新的内存空间，大小与原来的变量相同，把每个属性都复制过去，即原样生成了一份数据。

```c
struct cat a, b;

b = a;
```

上面示例中，变量`b`是变量`a`的副本，两个变量的值是各自独立的。

下面是另一个例子。

```c
struct car saturn = {"Saturn SL/2", 16000.99, 175};

struct car brick = saturn;
```

上面示例中，变量`saturn`赋值给另一个变量`brick`，这时`brick`就是一个数据副本。注意，Struct 的某个属性如果是字符串（比如上例的`Saturn SL/2`），那么复制的不是字符串本身，而是字符串的指针，因为 Struct 内部保存的是字符串指针。

## 函数传參

如果将 Struct 变量传入函数，函数内部得到的是一个原始值的副本。

```c
#include <stdio.h>

struct turtle {
  char* name;
  char* species;
  int age;
};

void happy(struct turtle t) {
  t.age = t.age + 1;
}

int main() {
  struct turtle myTurtle = {"MyTurtle", "sea turtle", 99};
  happy(myTurtle);
  printf("Age is %i\n", myTurtle.age); // 输出 99
  return 0;
}
```

上面示例中，函数`happy()`传入的是一个 Struct 变量（`happy(myTurtle)`），函数内部有一个自增操作。但是，执行完`happy()`以后，函数外部的`age`属性值根本没变。原因就是函数内部得到的是 Struct 变量的副本，改变副本影响不到函数外部的原始数据。

通常情况下，开发者希望传入函数的是同一份数据，函数内部修改数据以后，会反映在函数外部，这时就需要将 Struct 变量的指针传入函数。通过指针来修改 Struct 属性，就可以影响到函数外部。

Struct 指针传入函数的写法如下。

```c
void happy(struct turtle* t) {
}
```

上面代码中，`t`是 Struct 结构的指针。这样的话，调用函数时就必须传入指针。

```c
happy(&myTurtle);
```

函数内部也必须使用`(*t).age`的写法，从指针拿到 Struct 结构本身。

```c
void happy(struct turtle* t) {
  (*t).age = (*t).age + 1;
}
```

上面示例中，`(*t).age`不能写成`*t.age`，后者假设`t.age`是一个指针，然后取`t.age`对应的值，会出现无法预料的结果。现在，重新编译执行整个示例，`happy()`内部对 Struct 结构的操作，就会反映到函数外部。

可以看到，`(*t).age`这样的写法很麻烦。C 语言就引入了一个新的箭头运算符（`->`），可以从 Struct 指针上直接获取属性，大大增强了代码的可读性。

```c
void happy(struct turtle* t) {
  t->age = t->age + 1;
}
```

总结如下，对于 Struct 变量名，使用点运算符（`.`）获取属性；对于 Struct 变量指针，使用箭头运算符（`->`）获取属性。

## Struct 的嵌套

Struct 结构的成员可以是另一个 Struct 结构。

```c
struct breed {
  char* name;
  int kinds;
};

struct fish {
  char* name;
  int age;
  struct species breed;
};
```

上面示例中，`fish`的属性`breed`是另一个 Struct 结构`species`。

赋值的时候，就要使用双重圆括号。

```c
struct fish shark = {"shark", 9, {"Selachimorpha", 500}};
// 等同于
struct breek myBreed = {"Selachimorpha", 500};
struct fish shark = {"shark", 9, myBreed};

printf("Shark's species is %s", shark.breed.name);
```

上面示例中，引用`breed`属性的内部属性，要使用两次点运算符（`shark.breed.name`）。

Struct 结构内部不仅可以引用其他结构，还可以自我引用，即结构内部引用当前结构。比如，链表结构的节点就可以写成下面这样。

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

## 位字段

Struct 可以用来定义二进制位组成的数据结构，对于操作底层的二进制数据非常有用。

```c
typedef struct {
  unsigned int low_pass_vcf:1;
  unsigned int filter_coupler:1;
  unsigned int reverb:1;
  unsigned int sequential:1;
} synth;
```

上面代码中，每个属性后面的`:1`，表示指定这些属性只占用一个二进制位。
