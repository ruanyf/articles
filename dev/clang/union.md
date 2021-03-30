# Union 结构

Union 是一种自定义的数据结构。它内部可以包含各种字段，但是同时只能有一个字段存在，即最后赋值的那个字段。

Union 占用的字节长度，等于它内部最长字段的长度。这是将相同的内存空间，重用于不同类型数据的方法。

```c
union foo {
  int a, b, c, d, e, f;
        float g, h;
        char i, j, k, l;
};
```

下面是上面这个数据结构的用法。

```c
union foo x;

x.a = 12;
printf("%d\n", x.a);  // OK--x.a was the last thing we stored into

x.g = 3.141592;
printf("%f\n", x.g);  // OK--x.g was the last thing we stored into

printf("%d\n", x.a);  // Unspecified behavior!
```

上面示例中，最后输出的`x.a`是一个不正确的值，因为原来的值已经被`x.g`覆盖了。
