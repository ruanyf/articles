# Symbol

Symbol 是一种原始类型的值，类似于字符串，但是每个值都是不同的。

TypeScript 里面，Symbol 的类型使用`symbol`表示。

```typescript
let sym1: symbol = Symbol();
```

为了突出每个 Symbol 值都是独一无二的，`symbol`有一个子类型`unique symbol`，通常使用这个子类型。

```typescript
declare const sym1: unique symbol;
```

注意，`unique symbol`类型的变量，必须是`const`变量，或者只用于类的`readonly static`属性。

```typescript
// 正确
const sym2: unique symbol = Symbol();

// 报错
let sym2: unique symbol = Symbol();

// 正确
class C {
  static readonly StaticSymbol: unique symbol = Symbol();
}
```

如果直接比较两个 Symbol 值，TypeScript 会报错，因为它们肯定是不相等的。

```typescript
const sym2 = Symbol();
const sym3 = Symbol();
 
// 报错
if (sym2 === sym3) {
  // ...
}
```

