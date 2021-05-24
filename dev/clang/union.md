# Union 结构

有时候，我们需要一种数据结构，不同的场合表示不同的数据类型。比如，只用一种数据结构表示水果的“量”，这种结构就需要有时是整数（6个苹果），有时是浮点数（1.5公斤草莓）。

C 语言提供了 Union 结构，用来自定义可以灵活变更的数据结构。它内部可以包含各种属性，但同一时间只能有一个属性。

```c
union quantity {
  short count;
  float weight;
  float volume;
};
```

上面示例中，`union`命令定义了一个包含三个属性的数据结构`quantity`。这个数据结构包含三个属性，但是同一时间只能取到一个属性。最后赋值的属性，就是可以取到值的那个属性。

使用时，需要声明一个该类型的变量。

```c
// 写法一
union quantity q;
q.count = 4;

// 写法二
union quantity q = {.count=4};

// 写法三
union quantity q = {4};
```

上面代码展示了为 Union 结构赋值的三种写法。最后一种写法不指定属性名，就会赋值给第一个属性。

```c
typedef union {
  short count;
  float weight;
  float volume;
} quantity;
```

上面示例中，`union`命令定义了一个包含三个属性的数据结构，`typedef`命令为它起别名为`quantity`。这个数据结构包含三个属性，但是同一时间只能取到一个属性。最后赋值的属性，就是可以取到值的那个属性。

```c
quantity q = {4};
// 等同于
quantity q = {.count=4};
// 等同于
quantity q;
q.count = 4;
```

上面代码展示了为 Union 结构赋值的三种写法。第一种写法不指定属性名，就会赋值给第一个属性。

这时，`q.count`可以取到值，另外两个属性取不到值。

```c
printf("count is %i\n", q.count); // count is 4
printf("weight is %f\n", q.weight); // 未定义行为
```

如果要让`q.weight`属性可以取到值，就要先为它赋值。

```c
q.weight = 0.5;
printf("weight is %f\n", q.weight); // weight is 0.5
```

一旦为其他属性赋值后，原先可以取到值的`q.count`属性就不再有效了。

Union 结构占用的内存长度，等于它内部最长属性的长度。这是将相同的内存空间，重用于不同类型数据的方法。

Union 结构的好处，主要是节省空间。为了表示不同的数据类型，原来你可能需要定义三个属性，但同时只用到一个。使用 Union，就可以节省两个属性的空间。

如果赋值时，没有写明为哪个属性赋值（比如写成`quantity q = {4}`），那么很可能忘记到底哪个属性有值，代码的可读性也不好，这时就可以使用 Enum 结构加以改进。

## Union 指针

Union 结构也支持指针运算符`->`。如果`ptr`是`myUnion`的指针，那么`ptr->count`等同于`myUnion.count`。

```c
union quantity {
  short count;
  float weight;
  float volume;
};

union quantity q;
q.count = 4;

union quantity* ptr;
ptr = &q;

int x;
x = ptr->count;
```

