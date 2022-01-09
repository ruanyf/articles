# 字符串类型

## 字符串的操作类型

TypeScript 内置了一些可用于字符串操作的类型。

Uppercase<StringType> 将字符串中的每个字符转换为大写版本。

```typescript
type Greeting = "Hello, world"
// 等同于 type ShoutyGreeting = "HELLO, WORLD"
type ShoutyGreeting = Uppercase<Greeting>
 
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
// 等同于 type MainID = "ID-MY_APP"
type MainID = ASCIICacheKey<"my_app">
```

`Lowercase<StringType>` 将字符串中的每个字符转换为等效的小写字母。

```typescript
type Greeting = "Hello, world"
// 等同于 type QuietGreeting = "hello, world"
type QuietGreeting = Lowercase<Greeting>
         
type ASCIICacheKey<Str extends string> = `id-${Lowercase<Str>}`
// 等同于 type MainID = "id-my_app"
type MainID = ASCIICacheKey<"MY_APP">
```

`Capitalize<StringType>`将字符串中的第一个字符转换为等效的大写字母。

```typescript
type LowercaseGreeting = "hello, world";
// 等同于 type Greeting = "Hello, world"
type Greeting = Capitalize<LowercaseGreeting>;
```

`Uncapitalize<StringType>` 将字符串中的第一个字符转换为等效的小写字母。

```typescript
type UppercaseGreeting = "HELLO WORLD";
// 等同于 type UncomfortableGreeting = "hELLO WORLD"
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
``` 
