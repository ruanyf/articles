# infer

`type`定义的类型默认具有全局范围。要创建局部类型，可以使用`infer`关键字。

```typescript
type A = 'foo'; // global scope
type B = A extends infer C ? (
    C extends 'foo' ? true : false// *only* inside this expression, C represents A
) : never
```

`infer`还可以起到正则匹配的作用。

```typescript
type Str = 'foo-bar'
type Bar = Str extends `foo-${infer rest}` ? rest : never // 'bar'
```