# 数组的类型

如果数组可以放各种类型的数据，则可以使用`any`表示成员的类型。

```typescript
arr: any[]
```

## 扩展运算符

扩展运算符（`...`）只能用于元组和 rest 数组，用于普通数组会报错。

```typescript
const args = [8, 5];

// 报错
const angle = Math.atan2(...args);
```

最简单的解决方法如下。

```typescript
// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);
```