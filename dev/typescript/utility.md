# 工具类型

TypeScript 提供了一些全局的工具类型，可以把它们看作是用来帮助生成类型的工具函数。

TypeScript 内置的16个工具类型如下，可以直接使用。

- Partial<T>
- Required<T>
- Readonly<T>
- Record<K, T>
- Pick<T, K>
- Omit<T, K>
- Exclude<T, U>
- Extract<T, U>
- NonNullable<T>
- Parameters<T>
- ConstructorParameters<T>
- ReturnType<T>
- InstanceType<T>
- ThisParameterType<T>
- OmitThisParameter<T>
- ThisType<T>

## `ConstructorParameters<T>`

`ConstructorParameters<Type>`提取构造函数的参数类型，组成一个元组类型。

该工具类型能够获取构造函数T中的参数类型，并使用参数类型构造一个元组类型。若类型T不是函数类型，则返回never类型。

```typescript
// [string, number]
02 type T0 = ConstructorParameters<new (x: string, y: number) => object>;
03 
04 // [(string | undefined)?]
05 type T1 = ConstructorParameters<new (x?: string) => object>;
06 
07 type T2 = ConstructorParameters<string>;   // 编译错误
08 type T3 = ConstructorParameters<Function>; // 编译错误
```

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

## `Exclude<T, U>`

`Exclude<UnionType, ExcludedMembers>`用来从联合类型里面，排除某些类型。

该工具类型能够从类型T中剔除所有可以赋值给类型U的类型。

```typescript
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | (() => void), Function>; // string
```

```typescript
// type T0 = "b" | "c"
type T0 = Exclude<"a" | "b" | "c", "a">;

// type T1 = "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;

// type T2 = string | number
type T2 = Exclude<string | number | (() => void), Function>;
```

`Exclude`的定义如下。

```typescript
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```

`never`类型是任何其他类型的子类型。因此，当never类型与其他类型组成联合类型时，可以直接将`never`类型从联合类型中“消掉”。

```typescript
T | never ≡ T
```

在分布式条件类型“Exclude<T, U>”中，若类型T能够赋值给类型U，则返回never类型；否则，返回类型T。这里巧妙地使用了never类型来从联合类型T中删除符合条件的类型。

```typescript
T = Exclude<string | undefined, null | undefined>

  = (string extends null | undefined ? never : string)
    |
    (null extends null | undefined ? never : null)

  = string | never

  = string
```

## `Extract<T, U>`

`Extract<UnionType, Union>`从联合类型之中，提取指定类型。它与`Exclude<T, U>`正好相反。

`Extract<T, U>`工具类型与“Exclude<T, U>”工具类型是互补的，它能够从类型T中获取所有可以赋值给类型U的类型。

该类型能够从联合类型T中挑选符合条件的类型。若类型T能够赋值给类型U，则返回T类型；否则，返回类型never。

```typescript
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>; // 'a'
type T1 = Extract<string | (() => void), Function>; // () => void
type T2 = Extract<string | number, boolean>;        // never
```

```typescript
type Extract<T, U> = T extends U ? T : never;
 
type T = Extract<string | number, number | boolean>;
//   ~
//   类型为number
```

```typescript
// type T0 = "a"
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
    
// type T1 = () => void
type T1 = Extract<string | number | (() => void), Function>;
```

## `InstanceType<T>`

`InstanceType<Type>`返回对象实例的类型。

该工具类型能够获取构造函数的返回值类型，即实例类型。

```typescript
class C {
    x = 0;
}
type T0 = InstanceType<typeof C>;         // C
 
type T1 = InstanceType<new () => object>; // object

type T2 = InstanceType<any>;              // any

type T3 = InstanceType<never>;            // any

type T4 = InstanceType<string>;           // 编译错误
type T5 = InstanceType<Function>;         // 编译错误
```

```typescript
class C {
  x = 0;
  y = 0;
}

// type T0 = C 
type T0 = InstanceType<typeof C>;
```

## `NonNullable<T>`

该工具类型能够从类型T中剔除null类型和undefined类型并构造一个新类型，也就是获取类型T中的非空类型。

`NonNullable<Type>`用来从某种类型中去除 undefined。

```typescript
// string | number
type T0 = NonNullable<string | number | undefined>;

// string[]
type T1 = NonNullable<string[] | null | undefined>;
```

```typescript
// type T0 = string | number
type T0 = NonNullable<string | number | undefined>;
     
// type T1 = string[]
type T1 = NonNullable<string[] | null | undefined>;
```

## `Omit<T, K>`

`Omit<Type, Keys>`用来从某种对象类型中，删除指定的属性。

`Omit<T, K>`工具类型与“Pick<T, K>”工具类型是互补的，它能够从已有对象类型中剔除给定的属性，然后构建出一个新的对象类型。“Omit<T, K>”工具类型中的类型参数T表示源对象类型，类型参数K提供了待剔除的属性名类型，但它可以为对象类型T中不存在的属性。

```typescript
interface A {
    x: number;
    y: number;
}

type T0 = Omit<A, 'x'>;       // { y: number }
type T1 = Omit<A, 'y'>;       // { x: number }
type T2 = Omit<A, 'x' | 'y'>; // { }
type T3 = Omit<A, 'z'>;       // { x: number; y: number }
```

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

```typescript
type User = {
  id: string;
  name: string;
  email: string;
};

type UserWithoutEmail = Omit<User, "email">;

// This is equivalent to:
type UserWithoutEmail = {
  id: string;
  name: string;
};
```

它的定义如下。

```typescript
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

## `OmitThisParameter<T>`

`OmitThisParameter<Type>`从函数类型中移除 this 参数。如果函数没有 this 参数，则返回函数类型。

该工具类型能够从类型T中剔除this参数类型，并构造一个新类型。在使用“Omit-ThisParameter<T>”工具类型时需要启用“--strictFunctionTypes”编译选项。

```typescript
/**
* --strictFunctionTypes=true
*/

function f0(this: object, x: number) {}
function f1(x: number) {}

// (x: number) => void
type T0 = OmitThisParameter<typeof f0>;

// (x: number) => void
type T1 = OmitThisParameter<typeof f1>;

// string
type T2 = OmitThisParameter<string>;
```

```typescript
function toHex(this: Number) {
  return this.toString(16);
}
 
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
 
console.log(fiveToHex());
```

## `Parameters<T>`

`Parameters<Type>`从函数类型里面提取参数类型，组成一个元组。

该工具类型能够获取函数类型T的参数类型并使用参数类型构造一个元组类型。

```typescript
type T0 = Parameters<() => string>;        // []

type T1 = Parameters<(s: string) => void>; // [string]
 
type T2 = Parameters<<T>(arg: T) => T>;    // [unknown]

type T4 = Parameters<
    (x: { a: number; b: string }) => void
>;                                         // [{ a: number, b: string }]

type T5 = Parameters<any>;                 // unknown[]

type T6 = Parameters<never>;               // never

type T7 = Parameters<string>;
//                   ~~~~~~~
//                   编译错误！string类型不符合约束'(...args: any) => any'

type T8 = Parameters<Function>;
//                   ~~~~~~~~
//                   编译错误！Function类型不符合约束'(...args: any) => any'
```

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

`Parameters<T>`可以提取某个模块内部没有输出的接口类型。

```typescript
interface SecretName {
 first: string;
 last: string;
}
interface SecretSanta {
 name: SecretName;
 gift: string;
}
export function getGift(name: SecretName, gift: string): SecretSanta {
 // ...
}
```

上面示例中，该模块只输出了`getGift()`，没有输出接口`SecretName`和`SecretSanta`。这时可以通过`Parameters<T>`和`ReturnType<T>`，拿到这两个接口的类型。

```typescript
type MySanta = ReturnType<typeof getGift>; // SecretSanta
type MyName = Parameters<typeof getGift>[0]; // SecretName
```

## `Partial<T>`

`Partial`是一个泛型，表示当前类型是类型变量的一个子集。

该工具类型能够构造一个新类型，并将实际类型参数T中的所有属性变为可选属性。

```typescript
interface A {
    x: number;
    y: number;
}
 
type T = Partial<A>; // { x?: number; y?: number; }
```

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

## `Pick<T, K>`

`Pick<Type, Keys>`表示类型是从对象`Type`里面，挑选`Keys`指定的键名。

该工具类型能够从已有对象类型中选取给定的属性及其类型，然后构建出一个新的对象类型。“Pick<T, K>”工具类型中的类型参数T表示源对象类型，类型参数K提供了待选取的属性名类型，它必须为对象类型T中存在的属性。

```typescript
interface A {
    x: number;
    y: number;
}

type T0 = Pick<A, 'x'>;        // { x: number }
type T1 = Pick<A, 'y'>;        // { y: number }
type T2 = Pick<A, 'x' | 'y'>;  // { x: number; y: number }

type T3 = Pick<A, 'z'>;
//                ~~~
//                编译错误：类型'A'中不存在属性'z'
```

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

```typescript
type UserWithoutEmail = Pick<User, UserKeysWithoutEmail>;

// This is equivalent to:
type UserWithoutEmail = Pick<User, "id" | "name">;

// This is equivalent to:
type UserWithoutEmail = {
  id: string;
  name: string;
};
```

Pick 在 lib.es5.d.ts 的定义如下。

```typescript
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

## `Readonly<T>`

`Readonly<Type>`是一个泛型，表示类型变量的所有属性都是只读。

该工具类型能够构造一个新类型，并将实际类型参数T中的所有属性变为只读属性。

```typescript
interface A {
    x: number;
    y: number;
}

// { readonly x: number; readonly y: number; }
type T = Readonly<A>;
```

```typescript
interface Todo {
  title: string;
}
 
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};

todo.title = "Hello"; // 报错
```
因为类型参数K是用作对象属性名类型的，所以实际类型参数K必须能够赋值给“string | number | symbol”类型，只有这些类型能够作为对象属性名类型。

## `Required<T>`

Required 是一个泛型，表示当前类型包含类型变量的所有属性，主要针对可选属性的情况。

该工具类型能够构造一个新类型，并将实际类型参数T中的所有属性变为必选属性。

```typescript
interface A {
    x?: number;
    y: number;
}

type T0 = Required<A>; // { x: number; y: number; }
```

```typescript
interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 };
const obj2: Required<Props> = { a: 5 }; // 报错
```

因为类型参数K是用作对象属性名类型的，所以实际类型参数K必须能够赋值给“string | number | symbol”类型，只有这些类型能够作为对象属性名类型。

## ReadonlyArray

`ReadonlyArray`指定数组为只读。

```typescript
const values: ReadonlyArray<string> = ["a", "b", "c"];

values[0] = "x"; // Type error
values.push("x"); // Type error
values.pop(); // Type error
values.splice(1, 1); // Type error
```

## `ReturnType<T>`

`ReturnType<Type>`提取函数类型的返回值类型。

该工具类型能够获取函数类型T的返回值类型。

```typescript
// string
type T0 = ReturnType<() => string>;

// { a: string; b: number }
type T1 = ReturnType<() => { a: string; b: number }>;

// void
type T2 = ReturnType<(s: string) => void>;

// {}
type T3 = ReturnType<<T>() => T>;

// number[]
type T4 = ReturnType<<T extends U, U extends number[]>() => T>;

// any
type T5 = ReturnType<never>;

type T6 = ReturnType<boolean>;   // 编译错误
type T7 = ReturnType<Function>;  // 编译错误
```

它可以从某个函数实现，提取返回值类型。

```typescript
function getUserInfo(userId: string) {
  // ...
  return {
    userId,
    name,
    age,
    height,
    weight,
    favoriteColor,
  };
}

type UserInfo = ReturnType<typeof getUserInfo>;
```

上面示例中，`getUserInfo()`是一个现有的函数实现，如果想拿到它的返回值类型，可以先使用`typeof getUserInfo`获取它的类型，再用`ReturnType<T>`提取出返回值类型。

注意，不能写成`ReturnType<getUserInfo>`，因为其中的`getUserInfo`是一个值，不是一个类型，而`ReturnType<T>`只接受类型作为参数。

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

## ReturnType

ReturnType 是一个预定义类，接受一个函数类型作为类型变量，得到该函数的返回值类型。

```typescript
type Predicate = (x: unknown) => boolean;

// type K = boolean
type K = ReturnType<Predicate>;
```

注意，ReturnType 只能接受函数类型作为参数，不能接受函数名作为参数。

```typescript
function f() {
  return { x: 10, y: 3 };
}

// 报错
type P = ReturnType<f>;
```

ReturnType 可以与 typeof 相结合，用于函数名。

```typescript
function f() {
  return { x: 10, y: 3 };
}

/* 等同于
type P = {
    x: number;
    y: number;
}
*/
type P = ReturnType<typeof f>;
```

## `ThisParameterType<T>`

`ThisParameterType<Type>`提取函数类型中 this 参数的类型，如果函数没有 this 参数，则类型为 unknown。

该工具类型能够获取函数类型T中this参数的类型，若函数类型中没有定义this参数，则返回unknown类型。在使用“ThisParameterType<T>”工具类型时需要启用“--strict-FunctionTypes”编译选项。

```typescript
/**
* --strictFunctionTypes=true
*/

function f0(this: object, x: number) {}
function f1(x: number) {}

type T0 = ThisParameterType<typeof f0>;  // object
type T1 = ThisParameterType<typeof f1>;  // unknown
type T2 = ThisParameterType<string>;     // unknown
```

```typescript
function toHex(this: Number) {
  return this.toString(16);
}
 
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}
```

## `ThisType<T>`

`ThisType<Type>`不返回类型，更像一个提示，表明此处的类型与 this 对象有关。

Note that the noImplicitThis flag must be enabled to use this utility.

该工具类型比较特殊，它不是用于构造一个新类型，而是用于定义对象字面量的方法中this的类型。如果对象字面量的类型是“ThisType<T>”类型或包含“ThisType<T>”类型的交叉类型，那么在对象字面量的方法中this的类型为T。在使用“ThisType<T>”工具类型时需要启用“--noImplicitThis”编译选项。

```typescript
/**
 * --noImplicitThis=true
 */

let obj: ThisType<{ x: number }> & { getX: () => number };

obj = {
    getX() {
        this; // { x: number }

        return this.x;
    },
};
```

此例中，使用交叉类型为对象字面量obj指定了“ThisType<T>”类型，因此obj中getX方法的this类型为“{ x: number; }”类型。

```typescript
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};
```

## 字符串工具类型

TypeScript 内置了四个字符串工具类型，专门用来操作字符串。这四个工具类型都定义在 TypeScript 自带的`.d.ts`文件里面。

### `Uppercase<StringType>`

`Uppercase<StringType>`将字符串的每个字符转为大写。

```typescript
type A = 'hello';

// "HELLO"
type B = Uppercase<A>;
```

上面示例中，`Uppercase<T>`将 hello 转为 HELLO。

### `Lowercase<StringType>`

`Lowercase<StringType>`将字符串的每个字符转为小写。

```typescript
type A = 'HELLO';

// "hello"
type B = Lowercase<A>;
```

上面示例中，`Lowercase<T>`将 HELLO 转为 hello。

### `Capitalize<StringType>`

`Capitalize<StringType>`将字符串的第一个字符转为大写。

```typescript
type A = 'hello';

// "Hello"
type B = Capitalize<A>;
```

上面示例中，`Capitalize<T>`将 hello 转为 Hello。

### `Uncapitalize<StringType>`

`Uncapitalize<StringType>` 将字符串的第一个字符转为小写。

```typescript
type A = 'HELLO';

// "hELLO"
type B = Uncapitalize<A>;
``` 

上面示例中，`Uncapitalize<T>`将 HELLO 转为 hELLO。

## 工具函数

```typescript
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;

// %inferred-type: "a" | "b"
type Result1 = Exclude<1 | 'a' | 2 | 'b', number>;

// %inferred-type: "a" | 2
type Result2 = Exclude<1 | 'a' | 2 | 'b', 1 | 'b' | 'c'>;

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;

// %inferred-type: 1 | 2
type Result1 = Extract<1 | 'a' | 2 | 'b', number>;

// %inferred-type: 1 | "b"
type Result2 = Extract<1 | 'a' | 2 | 'b', 1 | 'b' | 'c'>;
```