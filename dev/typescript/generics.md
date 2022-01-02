# 泛型

有些函数可以接受各种类型的参数，返回值的类型与参数类型相关。

any 可以表达这种情况。

```typescript
function firstElement(arr: any[]): any {
  return arr[0];
}
```

但是，any 实际上取消了类型检查，并不是一个很理想的方式。

这时，可以引入类型变量的概念，来解决这个问题，进行更精确的描述。

```typescript
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

先在函数名后面，使用尖括号定义要用到的类型变量`Type`。Type 就是变量名，可以随便起，大写或小写都没关系，不过类型变量名一般都采用首字母大写，表示这代表一种类型。

然后，将参数类型定义为`Type[]`，即数组`arr`的成员类型时变量 Type。然后，返回值是 Type 或 undefined，即返回值的类型与参数类型相关，参数类型是 Type，返回值类型也是 Type，两者是一致的，至于 Type 到底是什么类型，这里并不重要。

泛型主要用来描述变量之间的依赖关系，可以理解为引入了表示类型的变量。

```typescript
function reverse<T>(items: T[]): T[] {
    var toreturn = [];
    for (let i = items.length - 1; i >= 0; i--) {
        toreturn.push(items[i]);
    }
    return toreturn;
}
```

```typescript
class Queue<T> {
  private data = [];
  push(item: T) { this.data.push(item); }
  pop(): T | undefined { return this.data.shift(); }
}
```

可以同时使用多个类型变量。

```typescript
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
 
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
```

类型变量可以继承对象。

```typescript
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
```

类型指定也可以用于泛型。

```typescript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

// 错误
const arr = combine([1, 2, 3], ["hello"]);

// 正确
const arr = combine<string | number>([1, 2, 3], ["hello"]);
```

上面示例中，类型指定将 Type 指定为`string | number`。

泛型虽然灵活，但是容易将类型注释写得很复杂，大大降低了代码可读性，所以必须谨慎使用，尤其要防止写出复杂难懂的泛型注释。

一个规则是如果类型变量在类型注释里面只出现一次，那么它很可能是不必要的。

```typescript
// 不必要
function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}

// 正确
function greet(s: string) {
  console.log("Hello, " + s);
}
```
