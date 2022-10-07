# enum 类型

## 数值枚举

enum 是一种 TypeScript 引入的数据结构，创造一种新的类型，中文译为“枚举”。

它用来将一组相关的值或者常量，放在一个容器里面。

```typescript
enum Color {
  Red,     // 0
  Green,   // 1
  Blue     // 2
}
```

上面示例声明了一个 Enum 结构`Color`，里面包含三个成员`Red`、`Green`和`Blue`。第一个成员的值默认为整数`0`，第二个为`1`，第二个为`2`，以此类推。

使用时，就调用 Enum 的某个成员，与调用对象属性的写法一样。

```typescript
let color = Color.Green; // 1 
```

上面示例展示了 Enum 结构的基本用法。JavaScript 内部把 Enum 成员当作数值处理，这说明 Enum 不仅是类型，还是实际的功能代码。

注意，虽然变量`color`等于`1`，但是它的类型是 Color，而不是`number`。

事实上，Enum 是 TypeScript 为数不多的非类型语法之一。编译后，Enum 结构会转成 JavaScript 对象。

不过，Enum 的有用之处，不在于成员的值等于什么，或者说成员的值无所谓，而是成员的名字可以明确表示代码的语义，增加代码的可读性和可维护性。

```typescript
// 写法一
let color:number;

// 写法二
let color:Color;
```

上面示例中，写法二显然比写法一更清晰，表达变量`color`的类型到底是什么。

下面是另一个例子。

```typescript
enum Operator {  
  ADD,  
  DIV,  
  MUL,  
  SUB  
}

function compute(
  op:Operator,
  a:number,
  b:number
) {  
  switch (op) {  
    case Operator.ADD:  
      return a + b;
    case Operator.DIV:  
      return a / b;  
    case Operator.MUL:
      return a * b;
    case Operator.SUB:
      return a - b;  
  }  
}

compute(Operator.ADD, 1, 3) // 4
```

上面示例中，Enum 结构`Operator`的四个成员表示四则运算“加减乘除”。代码根本不需要用到这四个成员的值，只用成员名就够了。

Enum 也可以当作类型使用，就像上面例子的函数`compute()`的第一个参数`op`的类型。Enum 类型的好处是明确有哪些值可以用，而且 IDE 的参数提示有良好的可读性，这个例子就会提示有四个值可以用。

Enum 作用类型有一个缺点，就是输入任何数值都不报错。

```typescript
enum NoYes { 
  No,
  Yes 
}

function foo(noYes: NoYes) {
  // ...
}

func(33);  // 不报错
```

上面代码中，函数`foo`的参数`noYes`只有两个可用的值，但是输入任意数值，编译都不会报错。

Enum 成员的值除了用默认值，还可以显式设定。

```typescript
enum Color {
  Red = 0,
  Green = 1,
  Blue = 2
}
```

上面示例中，Enum 每个成员的值都是显式设定。

成员的值可以是任意数值。

```typescript
enum Color {
  Red = 90,
  Green = 0.5,
  Blue = 7
}
```

每个成员甚至可以指定为相同的值。

```typescript
enum Color {
  Red = 0,
  Green = 0,
  Blue = 0
}
```

如果只设定第一个成员的值，后面成员的值就会从这个值开始递增。

```typescript
enum Color {
  Red = 7,
  Green,  // 8
  Blue   // 9
}
```

Enum 成员的值也可以使用计算式。

```typescript
enum Perm {
  UserRead     = 1 << 8,
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
  Yes = Math.random(),
}
```

上面的写法都是正确的。

Enum 成员值都是只读的，不能重新赋值。

```typescript
enum Color {
  Red,
  Green,
  Blue
}

Color.Red = 4; // 报错
```

上面示例中，重新为 Enum 成员赋值就会报错。

为了让这一点更醒目，通常会在 enum 关键字前面加上`const`修饰，表示这是常量，不能再次赋值。

```typescript
const enum Color {
  Red,
  Green,
  Blue
}
```

加上`const`还有一个好处，就是编译为 JavaScript 代码后，代码中 Enum 成员会被替换成对应的值，这样能提高性能表现。

如果希望加上`const`命令后，运行时还能访问 Enum 结构（即不用常数替换 Enum 成员），需要在编译时打开编译器的`preserveConstEnums`参数。

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

## 枚举合并

多个同名的枚举声明会合并成一个枚举声明。在合并枚举声明时，只允许其中一个枚举声明的首个枚举成员省略初始值。：

```typescript
enum E {
    A,
}

enum E {
    B = 1,
}

enum E {
    C = 2,
}
```

此例中，第2行的首个枚举成员省略了初始值，因此TypeScript会自动计算初始值。第6行和第10行，必须为首个枚举成员定义初始值，否则将产生编译错误，因为编译器无法在多个同名枚举声明之间自动地计算枚举值。

枚举声明合并的另外一点限制是，多个同名的枚举声明必须同时为const枚举或非const枚举，不允许混合使用。

```typescript
// 正确
enum E0 {
    A,
}
enum E0 {
    B = 1,
}

// 正确
const enum E1 {
    A,
}
const enum E1 {
    B = 1,
}

// 编译错误
enum E2 {
    A,
}
const enum E2 {
    B = 1,
}
```

同一个 Enum 结构，允许分段定义。这很适合对外部代码进行补充。

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

上面示例中，Enum 结构`Color`的定义有两段，使用时两段定义会合并在一起。

注意，上例的第二段 Enum 定义的第一个成员，必须给出初始化值，否则会跟第一段发生冲突，导致 TypeScript 编译时报错。

使用字符串 Enum，就没有这个问题。

```typescript
enum NoYes { No='No', Yes='Yes' }

function func(noYes: NoYes) {}

func('abc'); // 报错
func('Yes'); // 报错
```

## 字符串枚举

枚举成员的值除了是数值，也可以是字符串。也就是说，Enum 也可以用作一组相关字符串的集合。

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

上面示例中，Enum 结构`Direction`就是字符串枚举，每个成员的值都是字符串。

注意，字符串枚举的成员值，必须显式设置。

```typescript
const enum MediaTypes {
  JSON = 'application/json',
  XML = 'application/xml',
}

const url = 'https://example.com/api/endpoint';

fetch(url , {
  headers: {
    Accept: MediaTypes.JSON,
  },
}).then(response => {
  // ...
});
```

上面示例中，`MediaTypes`就是一个字符串枚举。

枚举成员可以是字符串和数值混合赋值，形成异构枚举。

```typescript
enum Enum {
  One = 'One',
  Two = 'Two',
  Three = 3,
  Four = 4,
}
```

但是，TypeScript 只支持数值和字符串作为枚举成员值，不允许使用其他值（比如 Symbol 值）。

如果是异构枚举，字符串值的下一个成员，必须赋值，否则报错。

```typescript
enum Enum {
  A,
  B,
  C = 'C',
  D = 'D',
  E, // 报错
  F,
}
```

上面示例中，枚举成员`A`和`B`的值都是默认的数值，`C`和`D`是显式设置的字符串。这时后面的成员`E`必须显式赋值，否则报错。

注意，变量如果赋值为字符串 Enum，就不能再赋值为字符串，因为类型不兼容。

```typescript
enum Enum {
  One = 'One',
  Two = 'Two',
}

let s = Enum.One; // 类型为 Enum
s = 'One'; // 报错
```

上面示例中，变量`s`赋值为 Enum 以后，再赋值为字符串就报错。

由于这个特点，如果函数的参数类型是 Enum，传参时就要特别注意，不要直接传入字符串，而要传入 Enum 值。

前面说过，Enum 结构的成员值用处不大，既然已经有了数值枚举，为什么还要设计字符串枚举呢？一个原因是有时需要打印枚举的值（比如 Debug），数值枚举打印出来的都是数值，不如字符串枚举能够打印更多信息。

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

console.log(Direction.Left) // LEFT
```

上面示例中，从打印出来的值`LEFT`，就可以马上知道对应哪一个枚举成员，数值枚举就没有这个效果。

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

function move(where:Direction) {
  // ...
}

move('North') // 报错
```

上面示例中，函数`move`的参数`where`的类型是字符串枚举`Direction`。这就很清晰地表达了`where`如何取值。

一旦传入不在枚举之中的字符串，编译就会报错。这跟数值枚举不一样，传入不在枚举之中的数值，是不会报错的。

字符串枚举可以使用类型联合（union）代替。

```typescript
function move(
  where:'Up'|'Down'|'Left'|'Right'
) {
  // ...
 }
```

上面示例中，参数`where`的类型联合，效果跟前面的 Enum 类型是一样的。

注意，字符串枚举的成员值，不能使用表达式赋值。

```typescript
enum NoYes {
  No = 'No',
  // 报错
  Yes = ['Y', 'e', 's'].join(''),
}
```

上面示例中，成员`Yes`的值是一个字符串表达式，这是不允许的，所以报错。

## keyof 运算符

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

Enum 成员值为数值时，存在反向映射，即可以引用 Enum 成员的值，获得成员名。

```typescript
enum Weekdays {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}

console.log(Weekdays[3]) // Wednesday 
```

上面示例中，Enum 成员`Wednesday`的值等于3，可以从`3`取到成员名`Wednesday`，这就叫反向映射。

这种情况只发生在成员值为数值的情况。如果成员值为字符串，则不存在反向映射。

这是因为 TypeScript 会将上面的 Enum 结构，编译成下面的 JavaScript 代码。

```javascript
var Weekdays;
(function (Weekdays) {
    Weekdays[Weekdays["Monday"] = 1] = "Monday";
    Weekdays[Weekdays["Tuesday"] = 2] = "Tuesday";
    Weekdays[Weekdays["Wednesday"] = 3] = "Wednesday";
    Weekdays[Weekdays["Thursday"] = 4] = "Thursday";
    Weekdays[Weekdays["Friday"] = 5] = "Friday";
    Weekdays[Weekdays["Saturday"] = 6] = "Saturday";
    Weekdays[Weekdays["Sunday"] = 7] = "Sunday";
})(Weekdays || (Weekdays = {}));
```

上面代码中，实际进行了两组赋值，以第一个成员为例。

```javascript
Weekdays[
  Weekdays["Monday"] = 1
] = "Monday";
```

上面代码有两个赋值运算符（`=`），实际上等同于下面的代码。

```javascript
Weekdays["Monday"] = 1;
Weekdays[1] = "Monday";
```
