# 类型运算

## keyof

keyof 是一个键名查询运算符，列出了对象类型或接口的所有属性名组成的联合类型，属性名之间使用`|`分隔。

```typescript
interface Person {
  name: string;
  age: number;
}

type propNames = keyof Person; // "name" | "age"

type propTypes = Person[propNames]; // string | number
```

```typescript
interface T {
    0: boolean;
    a: string;
    b(): void;
}

// 0 | 'a' | 'b'
type KeyofT = keyof T;
```

```typescript
type Obj = {
  0: 'a',
  1: 'b',
  prop0: 'c',
  prop1: 'd',
};

// %inferred-type: 0 | 1 | "prop0" | "prop1"
type Result = keyof Obj;
```

JavaScript 的对象是一个容器，可以放置任何类型的数据。有时候，需要知道某个对象所包含数据的所有类型。

```javascript
const todo = {
  id: 1,
  text: "Buy milk",
  due: new Date(2016, 11, 31),
};
```

上面示例中，对象`todo`包括三个属性，它们的类型依次是数值（number）、字符串（string）、日期（Date）。

keyof 运算符可以返回这个对象的所有键名。

```typescript
type TodoKeys = keyof Todo; // "id" | "text" | "due"
```

由于 JavaScript 键名只能是字符串和 Symbol 值，对于数组还有数值类型。所以，键名的联合类型就是`string | number |symbol`。

```typescript
type KeyofT = keyof any;       // string | number | symbol

interface T {
    [prop: number]: number;
}

// number
type KeyofT = keyof T;

interface T {
    [prop: string]: number;
}

// string | number
type KeyofT = keyof T;
```

顺便提一下，对unknown类型使用索引类型查询时，结果类型固定为never类型。

```typescript
type KeyofT = keyof unknown;  // never
```

注意，如果想要在对象类型中声明属性名为symbol类型的属性，那么属性名的类型必须为“unique symbol”类型，而不允许为symbol类型。

```typescript
const s: unique symbol = Symbol();
interface T {
    [s]: boolean;
}

// typeof s
type KeyofT = keyof T;
```

元组的返回结果可能出人意料。

```typescript
应用于keyof元组类型的结果可能有些出乎意料：

// number | "0" | "1" | "2" | "length" | "pop" | "push" | ···
type Result = keyof ['a', 'b', 'c'];
```

对于联合类型，keyof 返回共有的键名。

```typescript
type A = { a: string; z: boolean };
type B = { b: string; z: boolean };

type KeyofT = keyof (A | B);  // 'z'
```

对于交叉类型，返回所有键名。

```typescript
type A = { a: string; x: boolean };
type B = { b: string; y: number };

type KeyofT = keyof (A & B); // 'a' | 'x' | 'b' | 'y'


// 相当于
keyof (A & B) ≡ keyof A | keyof B
```

下面是交集类型和联合类型的 keyof 差异。

```typescript
type A = { a: number, shared: string };
type B = { b: number, shared: string };

// %inferred-type: "a" | "b" | "shared"
type Result1 = keyof (A & B);

// %inferred-type: "shared"
type Result2 = keyof (A | B);
```

keyof 运算符的一个作用，就是取出某个属性的类型。

```typescript
function getProperty<T, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}
```

上面示例中，`K extends keyof T`表示`K`是`T`的一个属性名，函数`getProperty()`的返回值`T[K]`就表示`K`这个属性值的类型。

下面是一个例子。

```javascript
function prop(obj, key) {
  return obj[key];
}
```

上面这个`prop()`函数，如果要加上类型注释，只能写成下面这样。

```javascript
function prop(obj: {}, key: string):any {
  return obj[key];
}
```

上面示例中，函数`prop()`返回值没法事先给出，只能写成`any`，因为`obj[key]`可能是任意值。

```javascript
const todo = {
  id: 1,
  text: "Buy milk",
  due: new Date(2016, 11, 31),
};

const id = prop(todo, "id"); // any
const text = prop(todo, "text"); // any
const due = prop(todo, "due"); // any
```

这时使用 keyof 运算符，就可以给出准确描述类型。

```typescript
function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

上面示例中，TypeScript 现在可以推断函数`prop()`的返回类型是`T[K]`。

```javascript
const todo = {
  id: 1,
  text: "Buy milk",
  due: new Date(2016, 11, 31),
};

const id = prop(todo, "id"); // number
const text = prop(todo, "text"); // string
const due = prop(todo, "due"); // Date
```

这时，如果传递一个`todo`对象上不存在的键名，TypeScript 就会报错。

```typescript
const foo = prop(todo, "bar"); // 报错
```

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

## in 运算符

JavaScript 语言中，`in`运算符用来确定对象是否包含某个属性名。

```javascript
const obj = { a: 123 };

if ('a' in obj) 
  console.log('found a');
```

上面示例中，`in`运算符用来判断对象`obj`是否包含属性`a`。

`in`运算符的左侧是一个字符串，表示属性名，右侧是一个对象。它的返回值是一个布尔值。

TypeScript 语言中，`in`运算符继承了这种用法。

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal:Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}
```

上面示例中，`in`运算符通过判断参数`animal`是否具有`swim`属性，确定`animal`到底属于哪一种类型。

in 运算符遍历 Union 类型里面的每一个类型。

```typescript
interface DataEntry<T> {
  key: T;
  value: string;
}

type DataKey = "location" | "name" | "year";

type DataEntryGetters = {
[K in DataKey as `get${Capitalize<K>}`]: () => DataEntry<K>;
};
// Equivalent to:
// {
//
 getLocation: () => DataEntry<"location">;
//
 getName: () => DataEntry<"name">;
//
 getYear: () => DataEntry<"year">;
// }
```

```typescript
type DataKey = "location" | "name" | "year";
type ExistenceChecks = {
[K in `check${Capitalize<DataKey>}`]: () => boolean;
};
// Equivalent to:
// {
//
 checkLocation: () => boolean;
//
 checkName: () => boolean;
//
 checkYear: () => boolean;
// }
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

在计算类型的时候，`T[K]`会返回该属性的类型。

```typescript
type Person = { age: number; name: string; alive: boolean };

// 等同于 type Age = number
type Age = Person["age"];
```

```typescript
type Obj = {
  0: 'a',
  1: 'b',
  prop0: 'c',
  prop1: 'd',
};

// %inferred-type: "a" | "b"
type Result1 = Obj[0 | 1];

// %inferred-type: "c" | "d"
type Result2 = Obj['prop0' | 'prop1'];

// %inferred-type: "a" | "b" | "c" | "d"
type Result3 = Obj[keyof Obj];
```

```typescript
type Obj = {
  [key: string]: RegExp, // (A)
};

// %inferred-type: string | number
type KeysOfObj = keyof Obj;

// %inferred-type: RegExp
type ValuesOfObj = Obj[string];
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

## extends...?: 条件运算符

extends 还可以当作运算符，起到判断作用，这称为条件类型（conditional type）。

```typescript
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
 
// 等同于 type Example1 = number
type Example1 = Dog extends Animal ? number : string;

// 等同于 type Example2 = string
type Example2 = RegExp extends Animal ? number : string;
```

上面示例中，extends 判断左侧的类型是否继承自右侧的类型。如果是的，返回 true，否则返回 false。

条件运算符可以根据当前类型是否符合某种条件，返回不同的类型。

```typescript
T extends U ? X : Y
```

上面式子中的`extends`用来判断，类型`T`是否继承了类型`U`，即是否能够赋值给类型`U`。这里的`T`和`U`可以是任意类型。

如果`T`能够赋值给类型`U`，表达式的结果为类型`X`，否则结果为类型`Y`。

```typescript
// string
type T0 = true extends boolean ? string : number;

// number
type T1 = string extends boolean ? string : number;
```

条件类型实际意义很小，因为条件类型中的所有类型都是固定的，因此结果类型也是固定的。实际应用中，条件类型通常与类型参数结合使用。

```typescript
type TypeName<T> = T extends string
    ? 'string'
    : T extends number
    ? 'number'
    : T extends boolean
    ? 'boolean'
    : T extends undefined
    ? 'undefined'
    : T extends Function
    ? 'function'
    : 'object';

type T0 = TypeName<'a'>;         // 'string'
type T1 = TypeName<0>;           // 'number'
type T2 = TypeName<true>;        // 'boolean'
type T3 = TypeName<undefined>;   // 'undefined'
type T4 = TypeName<() => void>;  // 'function'
type T5 = TypeName<string[]>;    // 'object'
```

如果实际类型参数T是联合类型“A | B”，那么分布式条件类型会被展开。示例如下：

```typescript
T ≡ A | B

T extends U ? X : Y
    ≡ (A extends U ? X : Y) | (B extends U ? X : Y)
```

举例来说，有两个类`Cat`和`Animal`，它们的关系是`class Cat extends Animal`，那么`Cat extends Animal`就为真，而`Animal extends Cat`就为伪。

```typescript
function getProducts<T>(id?: T):
T extends number ? Product : Product[]
```

上面示例中，函数`getProducts()`的返回值类型，取决于类型参数`T`是否为数值，如果是的，返回`Product`，否则返回`Product[]`。

下面就是这个函数的实现。

```typescript
class Product {
  id: number;
}

const getProducts = function<T>(id?: T):
T extends number ? Product : Product[] {
  if (typeof id === 'number') {
    return { id: 123 } as any;
  } else {
    return [{ id: 123 }, {id: 567}] as any;
  }
}

const result1 = getProducts(123);
const result2 = getProducts();
```

上面示例的`as any`表示关闭 TypeScript 的类型推断，开发者自己保证类型正确。不这样写会编译报错，因为 TypeScript 无法推断返回值符合条件式的类型。

```typescript
«Type2» extends «Type1» ? «ThenType» : «ElseType»
```

如果Type2可赋值给Type1，则此类型表达式的结果为ThenType。否则，它是ElseType。

```typescript
type Wrap<T> = T extends { length: number } ? [T] : T;

// %inferred-type: [string]
type A = Wrap<string>;

// %inferred-type: RegExp
type B = Wrap<RegExp>;
```

类似 TypeScript 的三元运算符，TypeScript 也可以写多重判断。

```typescript
type LiteralTypeName<T> =
  T extends undefined ? "undefined" :
  T extends null ? "null" :
  T extends boolean ? "boolean" :
  T extends number ? "number" :
  T extends bigint ? "bigint" :
  T extends string ? "string" :
  never;

// %inferred-type: "bigint"
type Result1 = LiteralTypeName<123n>;

// %inferred-type: "string" | "number" | "boolean"
type Result2 = LiteralTypeName<true | 1 | 'a'>;
```

## is 运算符

`is`运算符用来缩小函数返回值的类型。

```typescript
function isFish(
  pet:Fish|Bird
):pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

上面示例中，函数`isFish()`的返回值类型为`pet is Fish`，表示如果参数`pet`类型为`Fish`，则返回`true`，否则返回`false`。

`is`运算符总是用于描述函数的返回值类型，写法采用`parameterName is Type`的形式，即左侧为当前函数的参数名，右侧为某一种类型。它返回一个布尔值，表示左侧参数是否属于右侧的类型，特别适合描述判断参数类型的函数。


TypeScript允许自定义类型保护函数。类型守卫函数是指在函数返回值类型中使用了类型谓词的函数。

```typescript
x is T
```

在该语法中，x为类型守卫函数中的某个形式参数名；T表示任意的类型。从本质上讲，类型谓词相当于boolean类型。

类型谓词表示一种类型判定，即判定x的类型是否为T。当在if语句中或者逻辑表达式中使用类型守卫函数时，编译器能够将x的类型细化为T类型。

```typescript
type A = { a: string };
type B = { b: string };

function isTypeA(x: A | B): x is A {
   return (x as A).a !== undefined;
}

function isTypeB(x: A | B): x is B {
   return (x as B).b !== undefined;
}
```

在类型谓词“x is T”中，x可以为关键字this，这时它叫作this类型守卫。this类型守卫主要用于类和接口中，它能够将方法调用对象的类型细化为T类型。

```typescript
class Teacher {
    isStudent(): this is Student {
        return false;
    }
}

class Student {
    grade: string;

    isStudent(): this is Student {
        return true;
    }
}

function f(person: Teacher | Student) {
    if (person.isStudent()) {
        person.grade; // Student
    }
}
```

此例中，isStudent方法是this类型守卫，能够判定this对象是否为Student类的实例对象。第16行，在if语句中使用了this类型守卫后，编译器能够将if分支中person对象的类型细化为Student类型。

注意，类型谓词“this is T”只能作为函数和方法的返回值类型，而不能用作属性或存取器的类型。

`is`运算符常用于类型守卫（type guard）。类型守卫是一种特殊函数，返回一个布尔值，用于在运行时检查某个值是否为指定类型。

```typescript
function isString(value:unknown): value is string {
  return typeof value === "string"
}

// Type guards can also be declared as function expression
const isStringExp = (value: unknown):value is string =>
  typeof value === "string"
```

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