# TypeScript 类型运算符

TypeScript 提供强大的类型运算能力，可以使用各种类型运算符，对已有的类型进行计算，得到新类型。

## keyof 运算符

### 简介

keyof 是一个单目运算符，接受一个对象类型作为参数，返回该对象的所有键名组成的联合类型。

```typescript
type MyObj = {
  foo: number,
  bar: string,
};

type Keys = keyof MyObj; // 'foo'|'bar'
```

上面示例中，`keyof MyObj`返回`MyObj`的所有键名组成的联合类型，即`'foo'|'bar'`。

下面是另一个例子。

```typescript
interface T {
  0: boolean;
  a: string;
  b(): void;
}

type KeyT = keyof T; // 0 | 'a' | 'b'
```

由于 JavaScript 对象的键名只有三种类型，所以对于任意键名的联合类型就是`string|number|symbol`。

```typescript
// string | number | symbol
type KeyT = keyof any;
```

对于上面三种类型以外的类型使用 keyof 运算符，返回`never`类型，表示不可能有这样类型的键名。

```typescript
type KeyT = keyof object;  // never
```

上面示例中，由于不可能有`object`类型的键名，所以`keyof object`返回`never`类型。

如果对象属性名是索引类型，keyof 会返回属性名的索引类型。

```typescript
// 示例一
interface T {
  [prop: number]: number;
}

// number
type KeyT = keyof T;

// 示例二
interface T {
  [prop: string]: number;
}

// string|number
type KeyT = keyof T;
```

上面的示例二，`keyof T`返回的类型是`string|number`，原因是 JavaScript 属性名为字符串时，包含了属性名为数值的情况，因为数值属性名会自动转为字符串。

如果 keyof 运算符用于数组或元组类型，得到的结果可能出人意料。

```typescript
// 返回 number | "0" | "1" | "2"
// | "length" | "pop" | "push" | ···
type Result = keyof ['a', 'b', 'c'];
```

上面示例中，keyof 会返回数组的所有属性名，包括字符串属性名和继承的属性名。

对于联合类型，keyof 返回成员共有的键名。

```typescript
type A = { a: string; z: boolean };
type B = { b: string; z: boolean };

// 'z'
type KeyT = keyof (A | B); 
```

对于交叉类型，keyof 返回所有键名。

```typescript
type A = { a: string; x: boolean };
type B = { b: string; y: number };

// 返回 'a' | 'x' | 'b' | 'y'
type KeyT = keyof (A & B); 

// 相当于
keyof (A & B) ≡ keyof A | keyof B
```

keyof 取出的是键名组成的联合类型，如果想取出键值组成的联合类型，可以像下面这样写。

```typescript
type MyObj = {
  foo: number,
  bar: string,
};

type Keys = keyof MyObj;

type Values = MyObj[Keys]; // number|string
```

上面示例中，`Keys`是键名组成的联合类型，而`MyObj[Keys]`会取出每个键名对应的键值类型，组成一个新的联合类型，即`number|string`。

### keyof 运算符的用途

keyof 运算符往往用于精确表达对象的属性类型。

举例来说，取出对象的某个指定属性的值，JavaScript 版本可以写成下面这样。

```typescript
function prop(obj, key) {
  return obj[key];
}
```

上面这个函数添加类型，只能写成下面这样。

```javascript
function prop(
  obj:object, key:string
):any {
  return obj[key];
}
```

上面的类型声明有两个问题，一是无法表示参数`key`与参数`obj`之间的关系，二是返回值类型只能写成`any`。

有了 keyof 以后，就可以解决这两个问题，精确表达返回值类型。

```javascript
function prop<Obj, K extends keyof Obj>(
  obj:Obj, key:K
):Obj[K] {
  return obj[key];
}
```

上面示例中，`K extends keyof Obj`表示`K`是`Obj`的一个属性名，传入其他字符串会报错。返回值类型`Obj[K]`就表示`K`这个属性值的类型。

keyof 的另一个用途是用于属性映射，即将一个类型的所有属性逐一映射成其他值。

```typescript
type NewProps<Obj> = {
  [Prop in keyof Obj]: boolean;
};

// 用法
type MyObj = { foo: number; };

// 等于 { foo: boolean; }
type NewObj = NewProps<MyObj>;
```

上面示例中，类型`NewProps`是类型`Obj`的映射类型，前者继承了后者的所有属性，但是把所有属性值类型都改成了`boolean`。

下面的例子是去掉 readonly 修饰符。

```typescript
type Mutable<Obj> = {
  -readonly [Prop in keyof Obj]: Obj[Prop];
};

// 用法
type MyObj = {
  readonly foo: number;
}

// 等于 { foo: number; }
type NewObj = Mutable<MyObj>;
```

上面示例中，`[Prop in keyof Obj]`是`Obj`类型的所有属性名，`-readonly`表示去除这些属性的只读特性。对应地，还有`+readonly`的写法，表示添加只读属性设置。

下面的例子是让可选属性变成必有的属性。

```typescript
type Concrete<Obj> = {
  [Prop in keyof Obj]-?: Obj[Prop];
};

// 用法
type MyObj = {
  foo?: number;
}

// 等于 { foo: number; }
type NewObj = Concrete<MyObj>;
```

上面示例中，`[Prop in keyof Obj]`后面的`-?`表示去除可选属性设置。对应地，还有`+?`的写法，表示添加可选属性设置。

## in 运算符

JavaScript 语言中，`in`运算符用来确定对象是否包含某个属性名。

```javascript
const obj = { a: 123 };

if ('a' in obj) 
  console.log('found a');
```

上面示例中，`in`运算符用来判断对象`obj`是否包含属性`a`。

`in`运算符的左侧是一个字符串，表示属性名，右侧是一个对象。它的返回值是一个布尔值。

TypeScript 语言的类型运算中，`in`运算符有不同的用法，用来取出（遍历）联合类型的每一个成员类型。

```typescript
type U = 'a'|'b'|'c';

type Foo = {
  [Prop in U]: number;
};
// 等同于
type Foo = {
  a: number,
  b: number,
  c: number
};
```

上面示例中，`[Prop in U]`表示依次取出联合类型`U`的每一个成员。

上一小节的例子也提到，`[Prop in keyof Obj]`表示取出对象`Obj`的每一个键名。

## 方括号运算符

方括号运算符（`[]`）用于取出对象的键值类型，比如`T[K]`会返回对象`T`的属性`K`的类型。

```typescript
type Person = {
  age: number;
  name: string;
  alive: boolean;
};

// Age 的类型是 number
type Age = Person['age'];
```

上面示例中，`Person['age']`返回属性`age`的类型，本例是`number`。

方括号的参数如果是联合类型，那么返回的也是联合类型。

```typescript
type Person = {
  age: number;
  name: string;
  alive: boolean;
};

// number|string
type T = Person['age'|'name'];

// number|string|boolean
type A = Person[keyof Obj];
```

上面示例中，方括号里面是属性名的联合类型，所以返回的也是对应的属性值的联合类型。

如果对象的属性是索引类型，那么方括号运算符的参数可以是属性名的类型。

```typescript
type Obj = {
  [key:string]: number,
};

// number
type T = Obj[string];
```

上面示例中，`Obj`的属性名是字符串的索引类型，所以可以写成`Obj[string]`，代表所有字符串属性名，返回的就是它们的类型`number`。

这个语法对于数组也适用，可以使用`number`作为方括号的参数。

```typescript
// MyArray 的类型是 { [key:number]：string }
const MyArray = ['a','b','c'];

// 等同于 (typeof MyArray)[number]
// 返回 string
type Person = typeof MyArray[number];
```

上面示例中，`MyArray`是一个数组，它的类型实际上是属性名的数值索引，而`typeof MyArray[number]`的`typeof`运算优先级高于方括号，所以返回的是所有数值键名的键值类型`string`。

注意，方括号里面不能有值的运算。

```typescript
type Age = Person['a' + 'g' + 'e']; // 报错
```

上面示例中，方括号里面是字符串的连接运算，所以会报错。

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