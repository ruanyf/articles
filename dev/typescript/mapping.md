# 类型映射

## 概念

映射（mapping）指的是将一种类型按照映射规则，转换成另一种对象类型。

映射规则的写法如下。

```typescript
{ [P in K]: T }
```

对于对象或接口，`K`可以变成下面这样。

```typescript
{ [P in keyof T]: X }
```

其中，`K`的类型应该是`string | number | symbol`。

下面是一个例子。

```typescript
// { x: boolean }
type MappedObjectType = { [P in 'x']: boolean };

// { 0: boolean }
type MappedObjectType = { [P in 0]: boolean };

const s: unique symbol = Symbol();

// { [s]: boolean }
type MappedObjectType = { [P in typeof s]: boolean };
```

下面是属性名是表达式的例子。

```typescript
// { [x: string]: boolean }
type MappedObjectType = { [P in string]: boolean };

// { [x: number]: boolean }
type MappedObjectType = { [P in number]: boolean };
```

映射很适合转变对象的类型，具体做法是取出对象的属性名。

```typescript
type T = { a: string; b: number };
 
// { a: boolean; b: boolean;  }
type M = { [P in keyof T]: boolean };
```

上面示例中，先取出类型`T`的所有属性名，然后对这些属性名逐一遍历，在新的对象类型`M`创建同名属性`a`和`b`，并将它们的类型设为`boolean`类型。

下面是复制原始类型的例子。

```typescript
type T = { a: string; b: number };
 
// { a: string; b: number; }
type M = { [P in keyof T]: T[P] };
```

所有属性改成可选属性的例子。

```typescript
type T = { a: string; b: number };

// { a?: string; b?: number; }
type OptionalT = { [P in keyof T]?: T[P] };
```

事实上，TypeScript 提供了一个内置的工具类型`Partial<T>`来实现这个功能。`Partial<T>`的定义就是下面这样。

```typescript
/**
* 将T中的所有属性标记为可选属性
*/
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 用法
type T = { a: string; b: number };

// { a?: string; b?: number; }
type OptionalT = Partial<T>;
```

所有属性变成只读（readonly）属性。

```typescript
type T = { a: string; b: number };
 
// { readonly a: string; readonly b: number; }
type ReadonlyT = { readonly [P in keyof T]: T[P] };
```

上面示例中，使用`readonly`修饰符将所有属性标记为只读属性。由于这个功能十分常用，所以TypeScript内置了一个工具类型`Readonly<T>`来实现这个功能，它的的定义如下。

```typescript
/**
* 将T中的所有属性标记为只读属性
*/
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

它的用法如下。

```typescript
type T = { a: string; b: number };
 
// { readonly a: string; readonly b: number; }
type ReadonlyT = Readonly<T>;
```

在映射中，原始对象的`readonly`修饰符和`?`修饰符，都会原样拷贝。

```typescript
type T = { a?: string; readonly b: number };

// { a?: string; readonly b: number; }
type HMOT = { [P in keyof T]: T[P] };
```

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

## 自定义映射

```typescript
function filterBy<T, P extends keyof T>(
  property: P,
  value: T[P],
  array: T[]
) {
  return array.filter(item => item[property] === value);
}

interface Person {
  name: string;
  age: number;
}
const persons: Person[] = [
  { name: 'John', age: 32 },
  { name: 'Mary', age: 33 },
];

filterBy('name', 'John', persons)
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
interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

const worker: Person = {name: "John", age: 22};

function doStuff(
  person: Readonly<Person>
) {
  person.age = 25; // 报错
}
```

TypeScript 对 Readonly 的定义如下。

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

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

`Readonly<T>`与`Partial<T>`可以结合使用。

```typescript
interface Person {
  name: string;
  age: number;
}

const worker1: Readonly<Partial<Person>> 
= {name: "John"};

worker1.name = "Mary"; // 报错
```

## 添加和移除修饰符

映射操作无法删除属性已有的修饰符。TypeScript 引入了两个新的修饰符用来精确控制添加或移除映射属性的`?`修饰符和`readonly`修饰符。

下面的映射例子，修饰符就是保留的。

```typescript
type T = { a?: string; readonly b: number };
 
// { a?: string; readonly b: number; }
type HMOT = { [P in keyof T]: T[P] };
```

使用内置的工具类型也是如此。

```typescript
type T = {
    a?: string;
    readonly b: number;
    c: boolean;
};
 
// { a?: string; readonly b: number }
type SomeOfT = Pick<T, 'a' | 'b'>;
```

TypeScript 引入了两个新的修饰符。

- `+`修饰符，为映射属性添加`?`修饰符或`readonly`修饰符。
- `–`修饰符，为映射属性移除`?`修饰符或`readonly`修饰符。

`+`修饰符和`–`修饰符应用在`?`修饰符和`readonly`修饰符之前。它们的语法如下所示：

```typescript
{ -readonly [P in keyof T]-?: T[P] }
{ +readonly [P in keyof T]+?: T[P] }
```

如果要将已有对象类型的所有属性转换为必选属性，则可以使用“Required<T>”工具类型。“Required<T>”类型的定义如下所示

```typescript
type Required<T> = { [P in keyof T]-?: T[P] };
```

下面是一个例子。

```typescript
type T = {
  a?: string | undefined | null;
  readonly b: number | undefined | null;
};
 
// {
//     a: string | null;
//     readonly b: number | undefined | null;
// }
type RequiredT = Required<T>;
```

注意，“–”修饰符仅作用于带有“?”和readonly修饰符的属性。编译器在移除属性a的“?”修饰符时，同时会移除属性类型中的undefined类型，但是不会移除null类型，因此RequiredT类型中属性a的类型为“string | null”类型。由于属性b不带有“?”修饰符，因此此例中的“–”修饰符对属性b不起作用，也不会移除属性b中的undefined类型。

对于“+”修饰符，明确地添加它与省略它的作用是相同的，因此通常省略。例如，“+readonly”等同于“readonly”

```typescript
type ReadonlyPartial<T> = {
  +readonly [P in keyof T]+?: T[P]
};

// 等同于：

type ReadonlyPartial<T> = {
    readonly [P in keyof T]?: T[P]
};
```

## 参考链接

- [Mapped Type Modifiers in TypeScript](https://mariusschulz.com/blog/mapped-type-modifiers-in-typescript), Marius Schulz
