# enum

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

enum 的值，类型都是 number，里面的常量按照顺序赋值。

```typescript
enum Color {
    Red,     // 0
    Green,   // 1
    Blue     // 2
}
```

可以指定其中一个常量的值。

```typescript
enum Color {
    DarkRed = 3,  // 3
    DarkGreen,    // 4
    DarkBlue      // 5
}
```

```typescript
enum Color {
    Red,
    Green,
    Blue
}
var col = Color.Red;
col = 0; // Effectively same as Color.Red
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