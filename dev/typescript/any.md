# any 类型，unknown 类型

## any 类型

any 类型是 TypeScript 提供的一种基本类型，表示这个值可能是任意类型。

```typescript
let x:any;

x = 1;
x = 'foo';

let value: any;

value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = Math.random; // OK
value = null; // OK
value = undefined; // OK
value = new TypeError(); // OK
value = Symbol("type"); // OK
```

上面示例中，变量`x`的类型是`any`，表示它的值可以是任意类型，赋值为数值或字符串，都不会报错。

`any`类型的变量，不仅可以接受任何类型的值，也可以赋值给其他任何类型的变量。

```typescript
let x:any = 'hello';

let y:number;
y = x; // 不会报错
```

上面示例中，变量`x`是`any`类型，赋值给数值类型的`y`并不会报错，哪怕`x`的值是一个字符串。

`any`类型的值可以赋值给其他类型的变量，也就是说，其他所有类型实际上都包含了 any 类型。它可以看作是 TypeScript 其他所有类型的父类型，或者其他所有类型都是`any`的子类型。

如果变量的类型是`any`，该变量可以作为对象使用，访问它的任意属性，也可以作为函数使用，直接调用它。

```typescript
let x:any = 'hello';

x.foo(); // 不会报错 
x(); // 不会报错
x.bar = 100; // 不会报错
```

上面代码不会报错的原因是，将变量类型设为`any`，实际上会关闭对它的类型检查。只要没有句法错误，无论代码怎么写，TypeScript 都不会出现编译错误。

TypeScript 假设，开发者自己知道怎么使用`any`类型的值，所以不对`any`类型进行任何限制，怎么使用都可以。

```typescript
let value: any;

value.foo.bar; // OK
value.trim(); // OK
value(); // OK
new value(); // OK
value[0][1]; // OK
```

`any`的其他使用注意点如下。

（1）类型设为`any`等于不设类型，失去了使用 TypeScript 的意义，完全不建议使用，除非是为以前的复杂 JavaScript 代码做类型适配。

（2）如果开发者不指定变量类型，并且 TypeScript 不能从上下文推断出变量类型时，编译器就会默认该变量类型为`any`。

```typescript
// 等同于 y:any;  
var y;

// 等同于 z:{ a:any; b:any; };
var z: { a; b; };

// 等同于 f(x:any):void
function f(x) {   
  console.log(x);  
}
```

注释指令`// @ts-ignore`也可以关闭类型检查。

## unknown

`unknown`可以看作是更安全的`any`，它也表示任何类型，但是有着更多的限制。

一般来说，可以设为`any`的地方，都应该优先考虑设为`unknown`。

所有类型的值都可以分配给 unknown 类型的变量。

```typescript
let value: unknown;

value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = Math.random; // OK
value = null; // OK
value = undefined; // OK
value = new TypeError(); // OK
value = Symbol("type"); // OK
```

然后，你要使用这个值时，都必须进行类型缩小，明确它到底是什么类型，才能读取。

（1）unknown 类型不能赋值给其他类型，只有`unknown`本身和`any`类型除外。

```typescript
let value: unknown;

let value1: unknown = value; // OK
let value2: any = value; // OK
let value3: boolean = value; // Error
let value4: number = value; // Error
let value5: string = value; // Error
let value6: object = value; // Error
let value7: any[] = value; // Error
let value8: Function = value; // Error
```

与`any`相比，这样就保证了不确定类型的值，只会局限在`unknown`类型的变量，不会扩散到其他类型的变量。

使用判断语句，明确 unknown 变量的类型以后，就可以将它赋值给其他变量。

```typescript
let value: unknown;

if (typeof value === 'number') {
  let value4: number = value;
}
```

（2）不能调用它的方法和属性。

TypeScript 对`unknown`类型非常严格，假设它不存在任何属性和方法，也不能调用。这导致下面的操作都会报错。

```typescript
let value: unknown;

value.foo.bar; // Error
value.trim(); // Error
value(); // Error
new value(); // Error
value[0][1]; // Error
```

这导致使用 unknown 类型之前，开发者必须手动检查它的值是什么类型，然后才能用。

```typescript
function isString(v:unknown):string {
  if (typeof v === 'string') {
    return v;
  }
  return 'not string';
}
```

也就是说，必须先进行类型检查，然后再使用`unknown`。

```typescript
function func(value: unknown) {
  // 报错
  value.toFixed(2);

  // 正确
  (value as number).toFixed(2); // OK
}

function func(value: unknown) {
  // 报错
  value * 5;

  if (value === 123) { // 正确
    value * 5; // OK
  }
}

function func(value: unknown) {
  // 报错
  value.length;

  if (typeof value === 'string') { 
    // 正确
    value.length; // OK
  }
}
```

上面示例中，如果直接使用`unknown`类型的变量就会报错，进行类型检查以后再使用，就不会报错。

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

`unknown`类型不能用作大多数运算符的操作数，因为如果不知道值的类型，大多数运算符不太可能产生有意义的结果。`unknows`类型值唯一可以使用的运算符是四个相等和不相等运算符。

```typescript
===
==
!==
!=
```

除非使用`as`断言，首先缩小类型`unknows`类型的范围，然后才可以用于其他类型。

```typescript
const value: unknown = "Hello World";
const someString: string = value as string;
const otherString = someString.toUpperCase(); // "HELLO WORLD"
```
