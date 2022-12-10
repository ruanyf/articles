# TypeScript 的 ES6 类型

## `Map<K, V>`

```typescript
let map2 = new Map(); // Key any, value any
let map3 = new Map<string, number>(); // Key string, value number
```

## `Set<T>`

## `Promise<T>`

## Generator 函数

Generator 函数返回一个迭代器 Iterator，属于`IterableIterator<T>`类型，其中`T`是每一轮`yield`语句获得的值（即`value`属性）。

```typescript
function* createNumbers(): IterableIterator<number> {
let n = 0
while (1) {
yield n++
}
}
let numbers = createNumbers()
numbers.next()
 // evaluates to {value: 0, done: false}
numbers.next()
 // evaluates to {value: 1, done: false}
numbers.next()
 // evaluates to {value: 2, done: false}
```

