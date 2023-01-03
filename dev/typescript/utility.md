# TypeScript 类型工具

TypeScript 提供了一些内置的类型工具，用来方便地处理各种类型，以及生成新的类型。

TypeScript 内置了17个类型工具，可以直接使用。

- `Awaited<T>`
- `ConstructorParameters<T>`
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
- ReturnType<T>
- InstanceType<T>
- ThisParameterType<T>
- OmitThisParameter<T>
- ThisType<T>

## `Awaited<Type>`

`Awaited<Type>`用来取出 Promise 的返回值类型，适合用在描述`then()`方法和 await 命令的参数类型。

```typescript
// string
type A = Awaited<Promise<string>>;
```

上面示例中，`Awaited<Type>`会返回 Promise 的返回值类型（string）。

它也可以返回多重 Promise 的返回值类型。

```typescript
// number
type B = Awaited<Promise<Promise<number>>>;
```

如果它的类型参数不是 Promise 类型，那么就会原样返回。

```typescript
// number | boolean
type C = Awaited<boolean | Promise<number>>;
```

上面示例中，类型参数是一个联合类型，其中的`boolean`会原样返回，所以最终返回的是`number|boolean`。

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

## `Exclude<UnionType, ExcludedMembers>`

`Exclude<UnionType, ExcludedMembers>`用来从联合类型`UnionType`里面，删除某些类型`ExcludedMembers`，组成一个新的类型返回。

```typescript
type T1 = Exclude<'a'|'b'|'c', 'a'>; // 'b'|'c'
type T2 = Exclude<'a'|'b'|'c', 'a'|'b'>; // 'c'
type T3 = Exclude<string|(() => void), Function>; // string
```

`Exclude<UnionType, ExcludedMembers>`的实现如下。

```typescript
type Exclude<T, U> = T extends U ? never : T;
```

上面代码中，等号右边的部分，表示先判断`T`是否兼容`U`，如果是的就返回`never`类型，否则返回当前类型`T`。由于`never`类型是任何其他类型的子类型，它跟其他类型组成联合类型时，可以直接将`never`类型从联合类型中“消掉”，因此`Exclude<T, U>`就相当于删除兼容的类型，剩下不兼容的类型。

## `Extract<Type, Union>`

`Extract<UnionType, Union>`用来从联合类型`UnionType`之中，提取指定类型`Union`，组成一个新类型返回。它与`Exclude<T, U>`正好相反。

```typescript
type T1 = Extract<'a'|'b'|'c', 'a'>; // 'a'
type T2 = Extract<'a'|'b'|'c', 'a'|'b'>; // 'a'|'b'
type T3 = Extract<'a'|'b'|'c', 'a'|'d'>; // 'a'
```

如果参数类型`Union`不包含在联合类型`UnionType`之中，则返回`never`类型。

```typescript
type T = Extract<string|number, boolean>; // never
```

`Extract<UnionType, Union>`的实现如下。

```typescript
type Extract<T, U> = T extends U ? T : never;
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

## `Omit<Type, Keys>`

`Omit<Type, Keys>`用来从对象类型`Type`中，删除指定的属性`Keys`，组成一个新的对象类型返回。

```typescript
interface A {
  x: number;
  y: number;
}

type T1 = Omit<A, 'x'>;       // { y: number }
type T2 = Omit<A, 'y'>;       // { x: number }
type T3 = Omit<A, 'x' | 'y'>; // { }
```

上面示例中，`Omit<Type, Keys>`从对象类型`A`里面删除指定属性，返回剩下的属性。

指定删除的键名`Keys`可以是对象类型`Type`中不存在的属性，但必须兼容`string|number|symbol`。

```typescript
interface A {
  x: number;
  y: number;
}

type T = Omit<A, 'z'>; // { x: number; y: number }
```

上面示例中，对象类型`A`中不存在属性`z`，所以就原样返回了。

`Omit<Type, Keys>`的实现如下。

```typescript
type Omit<T, K extends keyof any> 
  = Pick<T, Exclude<keyof T, K>>;
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

## `Partial<Type>`

`Partial<Type>`返回一个新类型，将参数类型`Type`的所有属性变为可选属性。

```typescript
interface A {
  x: number;
  y: number;
}
 
type T = Partial<A>; // { x?: number; y?: number; }
```

`Partial<Type>`的实现如下。

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

## `Pick<Type, Keys>`

`Pick<Type, Keys>`返回一个新的对象类型，第一个参数`Type`是一个对象类型，第二个参数`Keys`是`Type`里面被选定的键名。

```typescript
interface A {
  x: number;
  y: number;
}

type T1 = Pick<A, 'x'>; // { x: number }
type T2 = Pick<A, 'y'>; // { y: number }
type T3 = Pick<A, 'x'|'y'>;  // { x: number; y: number }
```

上面示例中，`Pick<Type, Keys>`会从对象类型`A`里面挑出指定的键名，组成一个新的对象类型。

指定的键名`Keys`必须是对象键名`Type`里面已经存在的键名，否则会报错。

```typescript
interface A {
  x: number;
  y: number;
}

type T = Pick<A, 'z'>; // 报错
```

上面示例中，对象类型`A`不存在键名`z`，所以报错了。

`Pick<Type, Keys>`的实现如下。

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

## `Readonly<Type>`

`Readonly<Type>`返回一个新类型，将参数类型的所有属性变为只读属性。

```typescript
interface A {
  x: number;
  y?: number;
}

// { readonly x: number; readonly y?: number; }
type T = Readonly<A>;
```

上面示例中，`y`是可选属性，`Readonly<Type>`不会改变这一点，只会让`y`变成只读。

`Readonly<Type>`的实现如下。

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

我们可以自定义类型工具`Mutable<Type>`，将参数类型的所有属性变成可变属性。

```typescript
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
```

上面代码中，`-readonly`表示去除属性的只读标志。

相应地，`+readonly`就表示增加只读标志，等同于`readonly`。因此，`ReadOnly<Type>`的实现也可以写成下面这样。

```typescript
type Readonly<T> = {
  +readonly [P in keyof T]: T[P];
};
```

`Readonly<Type>`可以与`Partial<Type>`结合使用，将所有属性变成只读的可选属性。

```typescript
interface Person {
  name: string;
  age: number;
}

const worker: Readonly<Partial<Person>> 
  = { name: '张三' };

worker.name = '李四'; // 报错
```

## `Record<Keys, Type>`

`Record<Keys, Type>`返回一个对象类型，参数`Keys`用作键名，参数`Type`用作键值类型。

```typescript
// { a: number }
type T = Record<'a', number>;
```

上面示例中，`Record<Keys, Type>`的第一个参数`a`，用作对象的键名，第二个参数`number`是`a`的键值类型。

参数`Keys`可以是联合类型，这时会依次展开为多个键。

```typescript
// { a: number, b: number }
type T = Record<'a'|'b', number>;
```

上面示例中，第一个参数是联合类型`'a'|'b'`，展开成两个键名`a`和`b`。

如果参数`Type`是联合类型，就表明键值是联合类型。

```typescript
// { a: number|string }
type T = Record<'a', number|string>;
```

参数`Keys`的类型必须兼容`string|number|symbol`，否则不能用作键名，会报错。

`Record<Keys, Type>`的实现如下。

```typescript
type Record<K extends string|number|symbol, T>
  = { [P in K]: T; }
```

## `Required<Type>`

`Required<Type>`返回一个新类型，将参数类型`Type`的所有属性变为必选属性。它与`Partial<Type>`的作用正好相反。

```typescript
interface A {
  x?: number;
  y: number;
}

type T = Required<A>; // { x: number; y: number; }
```

`Required<Type>`的实现如下。

```typescript
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

上面代码中，符号`-?`表示去除可选属性的“问号”，使其变成必选属性。

相对应地，符号`+?`表示增加可选属性的“问号”，等同于`?`。因此，前面的`Partial<Type>`的定义也可以写成下面这样。

```typescript
type Partial<T> = {
  [P in keyof T]+?: T[P];
};
```

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
