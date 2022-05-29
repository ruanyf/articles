# 类型映射

TypeScript 可以将现有的类型转换为新的类型。具体的做法是遍历数据结构（即对象类型），逐一按照映射规则，将其转成另一个类型。

下面是一个原始类型。

```typescript
interface Point {
  x: number;
  y: number;
}
```

我们希望将上面的类型`Point`变成一个无法修改的只读类型。

```typescript
interface FrozenPoint {
  readonly x: number;
  readonly y: number;
}
```

上面示例中，每个属性之前都加了关键词`readonly`，表明该属性不能修改。可以想象，如果有很多属性，这样写起来就很麻烦，一旦属性改名或删除，修改类型定义也很麻烦。

有了类型映射，就可以将原始类型映射成另一个类型。

```typescript
type ReadonlyPoint<T> = {
  readonly [P in keyof T]: T[P];
};

// 等同于
type ReadonlyPoint = {
  readonly [P in keyof Point]: Point[P];
};

// 等同于
interface ReadonlyPoint {
  readonly x: number;
  readonly y: number;
}
```

上面示例中，原始类型`T`的每个属性都被映射成`readonly`。

下面是用法。

```typescript
interface Point {
  x: number;
  y: number;
}

type FrozenPoint<T> = {
  readonly [P in keyof T]: T[P];
};

const freezenObj:FrozenPoint<Point> = Object.freeze({ x: 0, y: 0 });

// 报错
freezenObj.x = 42;
```

上面示例中，`freezenObj`是原始对象`{x: 0, y: 0}`的属性冻结版本。一旦冻结，再去修改属性`freezenObj.x`就会报错。

因为使用了范型，我们可以把这个属性冻结的类型映射，写成一个通用类型。只要将具体的类型代入范型，就会得到属性冻结的版本。

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyPoint = Readonly<Point>;
```

下面是更多的类型映射的例子。

```typescript
/**
 * Make all properties in T optional
 */
// 部分类型映射
type Partial<T> = {
  [P in keyof T]?: T[P];
};

/**
 * From T pick a set of properties K
 */
// 指定发生映射的属性
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * Make all properties in T nullable
 */
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

/**
 * Turn all properties of T into strings
 */
type Stringify<T> = {
  [P in keyof T]: string;
};
```

类型映射还可以结合使用。

```typescript
type X = Readonly<Nullable<Stringify<Point>>>;
// type X = {
//     readonly x: string | null;
//     readonly y: string | null;
// };
```


```typescript
type User = {
    name: string,
    age: number
}

type StringifyProp<T> = {
    [K in keyof T]: string
}

type UserWithStringProps = StringifyProp<User> // { name: string; age: string; }
```

还可以过滤掉某些属性。比如下面的例子是只保留值为字符串的属性。

```typescript
type User = {
    name: string,
    age: number
}

type FilterStringProp<T> = {
    [K in keyof T as T[K] extends string ? K : never]: string
}

type FilteredUser = FilterStringProp<User> // { name: string }
```

## `Partial<T>`

`Partial<T>`是 TypeScript 预定义的工具类型，用来将对象类型的所有属性都变成可选属性。

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

```typescript
interface TodoItem {
   description: string | undefined;
   priority: "high" | "medium" | "low" | undefined;
}

type PartialTodoItem = Partial<TodoItem>;

// 正确
const foo:TodoItem = {};
// 报错
const bar:PartialTodoItem = {};
```

## `Required<T>`

`Required<T>`是 TypeScript 内置的工具类型，用来将对象类型的所有属性（包括可选属性）变成必备类型。

```typescript
interface TodoItem {
   description: string | undefined;
   priority?: "high" | "medium" | "low" | undefined;
}

type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

上面定义中，符号`-?`表示去除可选属性的问号（`？`），使其变成必备属性。

与其相对应，`+?`表示将属性变成可选属性，等同于`?`。因此，前面的`Partial<T>`的定义也可以写成下面这样。

```typescript
type Partial<T> = {
  [P in keyof T]+?: T[P];
};
```

```typescript
type RequiredTodoItem = Required<TodoItem>;
// {
//   description: string;
//   priority: "high" | "medium" | "low";
// }
```

上面示例中，经此转换之后，`priority`属性不再是可选的。

## `Readonly<T>`

`Required<T>`是 TypeScript 内置的工具类型，用来将对象类型的所有属性变成只读。

```typescript
interface TodoItem {
   description: string | undefined;
   priority?: "high" | "medium" | "low" | undefined;
}

type ReadonlyTodoItem = Readonly<TodoItem>;
// {
//   readonly description?: string | undefined;
//   readonly priority?: "high" | "medium" | "low" | undefined;
// }

const todo: ReadonlyTodoItem = {
  description: "Mow the lawn",
  priority: "high",
};

// 报错
todo.priority = "medium";
```

我们可以自定义工具类型`Mutable<T>`，将对象类型的只读属性变成可变属性。

```typescript
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
```

上面定义中，`-readonly`表示去除属性的只读。

```typescript
const todo: Mutable<ReadonlyTodoItem> = {
  description: "Mow the lawn",
  priority: "high",
};

todo.priority = "medium";
```

类似的，将属性变成只读，就是写成`+readonly`，等同于`readonly`。

```typescript
type Readonly<T> = {
  +readonly [P in keyof T]: T[P];
};
```

## 参考链接

- [Mapped Type Modifiers in TypeScript](https://mariusschulz.com/blog/mapped-type-modifiers-in-typescript), Marius Schulz
