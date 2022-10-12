# 类型运算

## never 类型

never 可以视为空集。

```typescript
type NeverIntersection = never & string; // Type: never
type NeverUnion = never | string; // Type: string
```

很适合在交叉类型中用作过滤。

```typescript
type OnlyStrings<T> = T extends string ? T : never;
type RedOrBlue = OnlyStrings<"red" | "blue" | 0 | false>;
// Equivalent to: "red" | "blue"
```

## unknown 类型

在联合类型中，unknown吸收所有类型。这意味着如果任何组成类型是unknown，则联合类型的计算结果为unknown。

```typescript
type UnionType1 = unknown | null; // unknown
type UnionType2 = unknown | undefined; // unknown
type UnionType3 = unknown | string; // unknown
type UnionType4 = unknown | number[]; // unknown
```

该规则的一个例外是any。如果至少有一种构成类型是any，则联合类型的计算结果为any：

```typescript
type UnionType5 = unknown | any; // any
```

在交叉类型中，每种类型都吸收unknown. 这意味着与任何类型相交unknown不会改变结果类型：

```typescript
type IntersectionType1 = unknown & null; // null
type IntersectionType2 = unknown & undefined; // undefined
type IntersectionType3 = unknown & string; // string
type IntersectionType4 = unknown & number[]; // number[]
type IntersectionType5 = unknown & any; // any
```

除非使用`as`断言，首先缩小类型`unknown`类型的范围，然后才可以用于其他类型。

```typescript
const value: unknown = "Hello World";
const someString: string = value as string;
const otherString = someString.toUpperCase(); // "HELLO WORLD"
```

## 交叉类型

```typescript
type Brightness = "dark" | "light";
type Color = "blue" | "red";
type BrightnessAndColor = `${Brightness}-${Color}`;
// Equivalent to: "dark-red" | "light-red" | "dark-blue" | "light-blue"
```

## 字符串操作类型

- Uppercase: Converts a string literal type to uppercase.
• Lowercase: Converts a string literal type to lowercase.
• Capitalize: Converts a first character of string literal type to uppercase.
• Uncapitalize: Converts a first character of string literal type to lowercase.

```typescript
type FormalGreeting = Capitalize<"hello.">; // Type: "Hello."
```