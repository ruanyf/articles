# stddef.h

`stddef.h`提供了常用类型和宏的定义，但没有声明任何函数。

这个头文件定义的类型如下。

- ptrdiff_t：指针相减运算时，返回结果的数据类型。
- size_t：`sizeof`运算符返回的类型。
- wchar_t：一种足够大、能容纳各种字符的类型。

以上三个类型都是整数类型，其中`ptrdiff_t`是有符号整数，`size_t`是无符号整数。

`stddef.h`定义了两个宏。

- NULL：空指针。
- offsetof：一个带参数的宏，接受两个参数。第一个参数是 Struct 结构，第二个参数是该结构的一个属性。`offsetof`宏会计算 Struct 结构的起点到指定属性之间的字节数。

```c
struct s {
  char a;
  int b[2];
  float c;
}
```

对于上面这个 Struct 结构，`offsetof(struct s, a)`一定等于`0`，因为`a`属性是结构的第一个属性，与结构自身的地址相同。`b`和`c`的偏移量，取决于不同系统是否会有属性对齐。如果系统为`a`属性分配1个字节，那么`offsetof(struct s, b)`是1（与起点相隔一个字节），`offsetof(struct s, c)`是9（与起点相隔9个字节）；如果为`a`属性分配4个字节，那么`offsetof(struct s, b)`和`offsetof(struct s, c)`分别是4和12。这个宏对于直接操作 Struct 结构的内存地址，很有用。

