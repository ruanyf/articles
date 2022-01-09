# 运算符

## keyof

keyof 运算符接受一个对象类型作为参数，返回该对象的键名的 Union 集合。

```typescript
type Point = { x: number; y: number };

type P = keyof Point;
```

上面示例中，类型 P 的值为`"x" | "y"`。

如果键名指定类型为`number`或`string`，那么`keyof`会返回这些类型。

```typescript
type Arrayish = { [n: number]: unknown };

// 等同于 type A = number
type A = keyof Arrayish;
```

keyof 还可以用于映射类型，即将一个类型的属性逐一映射成其他值。

```typescript
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

/* 等同于
type FeatureOptions = {
    darkMode: boolean;
    newUserProfile: boolean;
}
*/
type FeatureOptions = OptionsFlags<FeatureFlags>;
```

下面的例子是去掉 readonly 修饰符。

```typescript
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};
 
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

/* 等同于
type UnlockedAccount = {
    id: string;
    name: string;
}
*/
type UnlockedAccount = CreateMutable<LockedAccount>;
```

下面的例子是让可选属性变成必有的属性。

```typescript
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
 
type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

/* 等同于
type User = {
    id: string;
    name: string;
    age: number;
}
*/
type User = Concrete<MaybeUser>;
```

## typeof 运算符

`typeof`运算符可以用于定义类型。它接受一个值作为参数，这个值可以是各类类型的值，typeof 会返回值的类型。

```typescript
let s = "hello";

// let n: string
let n: typeof s;
```

为了避免运行时的类型推断，TypeScript 规定，typeof 的参数只能是标识符，不能是需要运算的表达式。

```typescript
// 报错
let shouldContinue: typeof msgbox("Are you sure you want to continue?");
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

## 索引访问类型

索引访问类型（indexed access type）指的是计算类型的时候，TypeScript 会查找另一种类型的属性（又称“索引”）。

```typescript
type Person = { age: number; name: string; alive: boolean };

// 等同于 type Age = number
type Age = Person["age"];
```

索引访问类型是一种类型，可以用于所有的类型计算。

```typescript
// type I1 = string | number
type I1 = Person["age" | "name"];
     
// type I2 = string | number | boolean 
type I2 = Person[keyof Person];
     

 
type AliveOrName = "alive" | "name";
// type I3 = string | boolean
type I3 = Person[AliveOrName];
```

对于数组，可以使用 number 作为数组的索引。

```typescript
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
 
/* 等同于
type Person = {
    name: string;
    age: number;
}
*/
type Person = typeof MyArray[number];
```

注意，类型校验是在编译时发生的，所以不能有运行时的计算，除非使用 typeof。

```typescript
const key = "age";
// 报错
type Age = Person[key];

// 正确写法
type Age = Person["Age"];
type Age = Person[typeof key];

type key = "age";
type Age = Person[key];
```