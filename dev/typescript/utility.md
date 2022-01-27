# 工具类型

TypeScript 提供了一些全局的工具类型，可以把它们看作是用来帮助生成类型的工具函数。

## Partial

`Partial`是一个泛型，表示当前类型是类型变量的一个子集。

```typescript
interface Todo {
  title: string;
  description: string;
}
 
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

## Required

Required 是一个泛型，表示当前类型包含类型变量的所有属性，主要针对可选属性的情况。

```typescript
interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 };
const obj2: Required<Props> = { a: 5 }; // 报错
```

## Readonly

`Readonly<Type>`是一个泛型，表示类型变量的所有属性都是只读。

```typescript
interface Todo {
  title: string;
}
 
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};

todo.title = "Hello"; // 报错
```


## Record

`Record<Keys, Type>`表示一个对象类型，该对象的键名来自类型变量`keys`，键值来自类型变量`Type`。

```typescript
interface CatInfo {
  age: number;
  breed: string;
}
 
type CatName = "miffy" | "boris" | "mordred";
 
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
```

## Pick

`Pick<Type, Keys>`表示类型是从对象`Type`里面，挑选`Keys`指定的键名。

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

## Omit

`Omit<Type, Keys>`用来从某种对象类型中，删除指定的属性。

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
 
type TodoPreview = Omit<Todo, "description">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};

type TodoInfo = Omit<Todo, "completed" | "createdAt">;
 
const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};
```

## Exclude

`Exclude<UnionType, ExcludedMembers>`用来从联合类型里面，排除某些类型。

```typescript
// type T0 = "b" | "c"
type T0 = Exclude<"a" | "b" | "c", "a">;

// type T1 = "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;

// type T2 = string | number
type T2 = Exclude<string | number | (() => void), Function>;
```

## Extract

`Extract<UnionType, Union>`从联合类型之中，提取指定类型。

```typescript
// type T0 = "a"
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
    
// type T1 = () => void
type T1 = Extract<string | number | (() => void), Function>;
```

## NonNullable

`NonNullable<Type>`用来从某种类型中去除 undefined。

```typescript
// type T0 = string | number
type T0 = NonNullable<string | number | undefined>;
     
// type T1 = string[]
type T1 = NonNullable<string[] | null | undefined>;
```

## Parameters

`Parameters<Type>`从函数类型里面提取参数类型，组成一个元组。

```typescript
declare function f1(arg: { a: number; b: string }): void;
 
// type T0 = []
type T0 = Parameters<() => string>;     

// type T1 = [s: string]
type T1 = Parameters<(s: string) => void>;

// type T2 = [arg: unknown]
type T2 = Parameters<<T>(arg: T) => T>;
     
/* type T3 = [arg: {
    a: number;
    b: string;
}]
*/
type T3 = Parameters<typeof f1>;
     
// type T4 = unknown[]
type T4 = Parameters<any>;
     
// type T5 = never
type T5 = Parameters<never>;

// 报错
type T6 = Parameters<string>;

// 报错
type T7 = Parameters<Function>;
```

## ConstructorParameters

`ConstructorParameters<Type>`提取构造函数的参数类型，组成一个元组类型。

```typescript
// type T0 = [message?: string]
type T0 = ConstructorParameters<ErrorConstructor>;
     
// type T1 = string[]
type T1 = ConstructorParameters<FunctionConstructor>;
     
// type T2 = [pattern: string | RegExp, flags?: string]
type T2 = ConstructorParameters<RegExpConstructor>;
     
// type T3 = unknown[]
type T3 = ConstructorParameters<any>;
```

## ReturnType

`ReturnType<Type>`提取函数类型的返回值类型。

```typescript
// type T0 = string 
type T0 = ReturnType<() => string>;

// type T1 = void
type T1 = ReturnType<(s: string) => void>;
     
// type T2 = unknown
type T2 = ReturnType<<T>() => T>;
     
// type T3 = number[]
type T3 = ReturnType<<T extends U, U extends number[]>() => T>;
     
declare function f1(): { a: number; b: string };
type T4 = ReturnType<typeof f1>;
/*     
type T4 = {
    a: number;
    b: string;
}
*/
```

## InstanceType

`InstanceType<Type>`返回对象实例的类型。

```typescript
class C {
  x = 0;
  y = 0;
}

// type T0 = C 
type T0 = InstanceType<typeof C>;
```

## ThisParameterType

`ThisParameterType<Type>`提取函数类型中 this 参数的类型，如果函数没有 this 参数，则类型为 unknown。

```typescript
function toHex(this: Number) {
  return this.toString(16);
}
 
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}
```

## OmitThisParameter

`OmitThisParameter<Type>`从函数类型中移除 this 参数。如果函数没有 this 参数，则返回函数类型。

```typescript
function toHex(this: Number) {
  return this.toString(16);
}
 
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
 
console.log(fiveToHex());
```

## ThisType

`ThisType<Type>`不返回类型，更像一个提示，表明此处的类型与 this 对象有关。

Note that the noImplicitThis flag must be enabled to use this utility.

```typescript
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};
```

## 字符串类型方法

- `Uppercase<StringType>`
- `Lowercase<StringType>`
- `Capitalize<StringType>`
- `Uncapitalize<StringType>`