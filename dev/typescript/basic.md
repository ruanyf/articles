# TypeScript 教程

## interface

`interface`命令用来描述对象的类型组成。

```javascript
interface User {
  name: string;
  id: number;
}

const user = {
  name: "Hayes",
  id: 0,
};
```

下面是使用`interface`命令定义对象实例的例子。

```javascript
interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);
```

## 类型

TypeScript 的内置类型与 JavaScript 一致。

- number
- string
- bigint
- boolean
- symbol
- null
- undefined
- object

此外，还提供了一些特殊类型。

- unknown	the top type.
- never	the bottom type.
- object literal	eg { property: Type }
- void	a subtype of undefined intended for use as a return type.
- T[]	mutable arrays, also written Array<T>
- [T, T]	tuples, which are fixed-length but mutable
- (t: T) => U	functions

### Union

Union 类型（联合）表示有多个可能的类型，或者有限的值。

type 命令用来定义简单类型的变量。

```javascript
type MyBool = true | false;
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

function getLength(obj: string | string[]) {
  return obj.length;
}
```

### Generics

Generics（范型）用来描述数组包含的值。

```javascript
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```

泛型可以在类型里面使用变量。

```javascript
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

declare const backpack: Backpack<string>;
```

上面代码中，`Type`就是一个变量，具体的值由声明实例时的类型决定。
