# enum

## 基本用法

enum 用来将一组相关的值，放在一个容器里面。

```typescript
enum CardSuit {
    Clubs,
    Diamonds,
    Hearts,
    Spades
}

// Sample usage
var card = CardSuit.Clubs;

// Safety
card = "not a member of card suit";
```

使用时，就按照对象属性的调用方式，调用 enum 成员。

```typescript
const enum Operator {  
    ADD,  
    DIV,  
    MUL,  
    SUB  
}

function compute(op: Operator, a: number, b: number) {  
  switch (op) {  
    case Operator.ADD:  
        // execute add  
        break;  
    case Operator.DIV:  
        // execute div  
        break;  
    // ...  
  }  
}
```

enum 的值，类型都是 number，里面的常量按照顺序赋值。

```typescript
enum Color {
    Red,     // 0
    Green,   // 1
    Blue     // 2
}
```

第一个成员的值默认为 0，后面的成员会在前一个成员的值的基础上加1。

可以指定其中一个常量的值。

```typescript
enum Color {
    DarkRed = 3,  // 3
    DarkGreen,    // 4
    DarkBlue      // 5
}
```

也可以每个成员都指定各自的值。

```typescript
enum Direction {
  Up = 1,
  Down = 4,
  Left = 5,
  Right = 3,
}
```

甚至每个成员可以指定为相同的值。

```typescript
enum Direction {
  Up = 1,
  Down = 1,
  Left = 1,
  Right = 1,
}
```

enum 设定的成员都是只读的，不能重新赋值。

```typescript
enum Color {
    Red,     // 0
    Green,   // 1
    Blue     // 2
}

Color.Red = 4; // 报错
```

上面示例中，重新为 enum 成员赋值会报错。

为了让这一点更醒目，通常会在 enum 关键字前面加上`const`修饰，表示这是常量。

```typescript
const enum Color {
    Red,     // 0
    Green,   // 1
    Blue     // 2
}
```

加上`const`，编译结果会直接将 enum 成员转为对应的值，这样会提高性能表现。

Enum 成员的整数值可以使用计算式，前提是编译时能够完成计算。

```typescript
enum Perm {
  UserRead     = 1 << 8, // bit 8
  UserWrite    = 1 << 7,
  UserExecute  = 1 << 6,
  GroupRead    = 1 << 5,
  GroupWrite   = 1 << 4,
  GroupExecute = 1 << 3,
  AllRead      = 1 << 2,
  AllWrite     = 1 << 1,
  AllExecute   = 1 << 0,
}

enum NoYesNum {
  No = 123,
  Yes = Math.random(), // OK
}
```

Enum 转换成 JavaScript 代码，会以对象表示，因此下面的代码不会报错。

```typescript
enum E {
  X,
  Y,
  Z,
}
 
function f(obj: { X: number }) {
  return obj.X;
}
 
// Works, since 'E' has a property named 'X' which is a number.
f(E);
```

TypeScript 的 enum 允许为常量的值，设为字符串。

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

```typescript
export enum EvidenceTypeEnum {
  UNKNOWN = '',
  PASSPORT_VISA = 'passport_visa',
  PASSPORT = 'passport',
  SIGHTED_STUDENT_CARD = 'sighted_tertiary_edu_id',
  SIGHTED_KEYPASS_CARD = 'sighted_keypass_card',
  SIGHTED_PROOF_OF_AGE_CARD = 'sighted_proof_of_age_card',
}

// Where `someStringFromBackend` will be '' | 'passport_visa' | 'passport' ... etc.
const value = someStringFromBackend as EvidenceTypeEnum; 

// Sample use in code
if (value === EvidenceTypeEnum.PASSPORT){
    console.log('You provided a passport');
    console.log(value); // `passport`
}
```

由于 Enum 不仅是一种类型，也是一种赋值，所以也可以写成赋值语句。

```typescript
// 写法一
enum Tristate {
    False,
    True,
    Unknown
}

// 写法二
const enum Tristate {
    False,
    True,
    Unknown
}
```

由于 TypeScript 对于类型是可以补充的，所以 Enum 可以分段定义。

```typescript
enum Color {
    Red,
    Green,
    Blue
}

enum Color {
    DarkRed = 3,
    DarkGreen,
    DarkBlue
}
```

注意，第二段 Enum 定义的第一个成员，必须给出初始化值，否则会跟第一段发生冲突，导致 TypeScript 编译时报错。

如果 Enum 成员的值不会改变，建议加上`const`命令，这样有利于提高运行性能。

```typescript
const enum MediaTypes {
  JSON = "application/json",
  XML = "application/xml",
}
```

一旦加上`const`命令时，运行时就不能再访问 Enum 结构了。如果有特殊需求，需要再访问，需要在编译时打开`preserveConstEnums`选项。

Enum 用于类型时，有一个缺点，就是输入任何整数都不会报错。

```typescript
enum NoYes { No, Yes }
function func(noYes: NoYes) {}
func(33);  // 未报错
```

使用字符串 Enum，就没有这个问题。

```typescript
enum NoYes { No='No', Yes='Yes' }

function func(noYes: NoYes) {}

func('abc'); // 报错
func('Yes'); // 报错
```

## 字符串枚举

除了设为数值，枚举成员的值也可以设为字符串。处理一组相关的字符串常量时，这种结构非常有用。

```typescript
enum MediaTypes {
  JSON = "application/json",
  XML = "application/xml",
}

fetch("https://example.com/api/endpoint", {
  headers: {
    Accept: MediaTypes.JSON,
  },
}).then(response => {
  // ...
});
```

字符串值不能使用表达式赋值。

```typescript
enum NoYesStr {
  No = 'No',
  // @ts-expect-error: Computed values are not permitted in
  // an enum with string valued members.
  Yes = ['Y', 'e', 's'].join(''),
}
```

Enum 成员也可以是字符串和数值混合赋值，形成异构枚举。

```typescript
enum Enum {
  One = 'One',
  Two = 'Two',
  Three = 3,
  Four = 4,
}
```

TypeScript 只支持数字和字符串作为枚举成员值，不允许使用其他值，比如 Symbol 值。

字符串值的下一个成员，必须赋值，否则报错。

```typescript
enum Enum {
  A,
  B,
  C = 'C',
  D = 'D',
  E , // 报错
  F,
}
```

## keyof

```typescript
enum HttpRequestKeyEnum {
  'Accept',
  'Accept-Charset',
  'Accept-Datetime',
  'Accept-Encoding',
  'Accept-Language',
}
// %inferred-type: "Accept" | "Accept-Charset" | "Accept-Datetime" |
// "Accept-Encoding" | "Accept-Language"
type HttpRequestKey = keyof typeof HttpRequestKeyEnum;
```

注意，这里的`typeof`不能忘记，否则`keyof HttpRequestKeyEnum`相当于`keyof number`。

```typescript
// %inferred-type: "toString" | "toFixed" | "toExponential" |
// "toPrecision" | "valueOf" | "toLocaleString"
type Keys = keyof HttpRequestKeyEnum;
```

## 反向映射

Enum 成员值为数值时，存在反向映射。

```typescript
enum Enum {
  A,
}
 
let nameOfA = Enum[0]; // "A"
```

上面示例中，可以从成员去取到值，也可以从值取到成员。这就叫反向映射。

这种情况只发生在成员值为数值的情况。如果成员值为字符串，则不存在反向映射。

```javascript
var NoYes;
(function (NoYes) {
  NoYes[NoYes["No"] = 0] = "No";
  NoYes[NoYes["Yes"] = 1] = "Yes";
})(NoYes || (NoYes = {}));
```

上面代码中，实际进行了两组赋值。

```javascript
NoYes["No"] = 0;
NoYes["Yes"] = 1;

NoYes[0] = "No";
NoYes[1] = "Yes";
```
