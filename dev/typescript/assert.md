# 类型断言

有些时候，TypeScript 对类型的处理，可能不是开发者想要的行为，毕竟开发者比编译器更了解自己的代码，这时 TypeScript 提供了一种手段，允许开发者手动更改类型，改变编译时的行为。

```typescript
type T = 'a'|'b'|'c';

let foo = 'a';

let bar:T = foo; // 报错
```

上面示例报错，原因是 TypeScript 推断 foo 的类型是`string`，而`bar`的类型是`'a'|'b'|'c'`，两者没有兼容关系。

解决方法就是进行类型断言，即在该位置临时修改某个值的类型，告诉编译器，`foo`的类型以断言为准，不需要进行推断了。

```typescript
type T = 'a'|'b'|'c';

let foo = 'a';
let bar:T = foo as T; // 正确
```

上面示例中，最后一行的`foo as T`表示告诉编译器，在当前行不需要推断`foo`的类型，直接把它当作类型`T`。

类型断言可以用来手动指定一个值的类型。

```typescript
<类型>值
// or
值 as 类型
```

```typescript
var str = '1' 
var str2:number = <number> <any> str   //str、str2 是 string 类型
console.log(str2)
```

当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 T。这是为了在进行类型断言时提供额外的安全性，完全毫无根据的断言是危险的，如果你想这么做，你可以使用 any。

它之所以不被称为类型转换，是因为转换通常意味着某种运行时的支持。但是，类型断言纯粹是一个编译时语法，同时，它也是一种为编译器提供关于如何分析代码的方法。

===

TypeScript程序中的每一个表达式都具有某种类型，编译器可以通过类型注解或者类型推断来确定表达式的类型。但有些时候，开发者比编译器更加清楚某个表达式的类型。

类型断言允许我们覆盖 TypeScript 为值计算的静态类型。这对于解决类型系统的限制很有用。

它相当于其他语言中的类型转换，但类型断言不会抛出异常，并且只用于静态检查，在运行时不做任何事情。

```typescript
// 无编译错误
const p0: { x: number } = { x: 0, y: 0 } as { x: number };
  
// 无编译错误
const p1: { x: number } = { x: 0, y: 0 } as { x: 0; y: 0 };
```

```typescript
const data: object = ['a', 'b', 'c']; // (A)

// @ts-expect-error: Property 'length' does not exist on type 'object'.
data.length; // (B)

assert.equal(
  (data as Array<string>).length, 3); // (C)
```

上面示例中，`['a', 'b', 'c']`会被 TypeScript 归类为对象，所以不能使用`length`属性。类型断言就将其指定为数组。

一般来说，类型断言应该少避免，因为它改变了 TypeScript 内置规则，有可能破坏静态检查。

类型推断可以暂时改变一个值的类型。

```typescript
interface Named {
  name: string;
}
function getName(obj: object): string {
  if (typeof (obj as Named).name === 'string') { // (A)
    return (obj as Named).name; // (B)
  }
  return '(Unnamed)';
}
```

使用类型断言之后，unknown 类型就可以作为所断言的类型使用。

```typescript
const value: unknown = "Hello World";
const someString: string = value as string;
const otherString = someString.toUpperCase(); // "HELLO WORLD"
```

请注意，TypeScript 不会执行任何特殊检查来确保类型断言确实有效。类型检查器假定您知道得更好，并相信您在类型断言中使用的任何类型都是正确的。

TypeScript 对下面的代码不会报错，但是运行时会报错。

```typescript
const value: unknown = 42;
const someString: string = value as string;
const otherString = someString.toUpperCase(); // BOOM
```

## `<T>`类型断言

TypeScript 允许采用类型断言的方式，强制改变类型，方法是在一个值前面加上尖括号（`<typeName>`）指定类型。

“<T>”类型断言的语法如下所示：

```typescript
<T>expr
```

在该语法中，T表示类型断言的目标类型；expr表示一个表达式。`<T>`类型断言尝试将expr表达式的类型转换为T类型。

```typescript
const username = document.getElementById('username');
 
if (username) {
    (<HTMLInputElement>username).value; // 正确
}
```

上面例子如果不使用断言，就会报错：属性'value'不存在于类型'HTMLElement'上。

在使用<T>类型断言时，需要注意运算符的优先级。在上例中，我们必须使用分组运算符来对username进行类型断言。如果没有使用分组运算符，那么是在对username.value进行类型断言。

```typescript
let str = '1';
let str2:number = <number><any> str;
console.log(str2) // "1"
```

上面示例中，变量`str2`的类型是数值，但是赋值为一个字符串`str`，正常情况下会报错。这时如果你确定需要这样赋值，可以强制指定`str`的类型为`<number><any>`。这样的话，TypeScript 就会认为`str`的类型是数值，尽管实际上它是一个字符串。

这种语法有一个前提，就是如果将类型`T1`指定为`T2`，那么需要`T1`是`T2`的子类型，或者`T2`是`T1`的子类型。

```typescript
const s1:number|string = 'hello';
const s2:number = <number>s1; 
```

指定类型并不是真的改变一个值的类型，而是提示编译器，应该如何处理这个值。

## as T 类型断言

as T类型断言与<T>类型断言的功能完全相同，两者只是在语法上有所区别。

```typescript
expr as T
```

在该语法中，as是关键字；T表示类型断言的目标类型；expr表示一个表达式。as T类型断言尝试将expr表达式的类型转换为T类型。

```typescript
const username = document.getElementById('username');

if (username) {
    (username as HTMLInputElement).value; // 正确
}
```

注意，此例中还是需要使用分组运算符，否则在访问value属性时会有语法错误。

下面我们来看一看<T>断言与as T断言的比较。

最初，TypeScript中只支持<T>类型断言。后来，React[1]框架开发团队在为JSX添加TypeScript支持时，发现<T>类型断言的语法与JSX的语法会产生冲突，因此，TypeScript语言添加了新的as T类型断言语法来解决两者的冲突。

当在TypeScript中使用JSX时，仅支持as T类型断言语法。除此之外，两种类型断言语法均可使用，开发者可以根据个人习惯或团队约定选择其一。目前主流的编码风格规范推荐使用as T类型断言语法。

## 类型断言的约束

类型断言不允许在两个类型之间随意做转换而是需要满足一定的前提。假设有如下as T类型断言（<T>断言同理）：

```typescript
expr as T
```

若想要该类型断言能够成功执行，则需要满足下列两个条件之一：

- expr表达式的类型能够赋值给T类型。
- T类型能够赋值给expr表达式的类型。

以上两个条件意味着，在执行类型断言时编译器会尝试进行双向的类型兼容性判定，允许将一个类型转换为更加精确的类型或者更加宽泛的类型。

```typescript
interface Point2d {
    x: number;
    y: number;
}

interface Point3d {
    x: number;
    y: number;
    z: number;
}

const p2d: Point2d = { x: 0, y: 0 };
const p3d: Point3d = { x: 0, y: 0, z: 0 };

// 可以将'Point2d'类型转换为'Point3d'类型
const p0 = p2d as Point3d;
p0.x;
p0.y;
p0.z;

// 可以将'Point3d'类型转换为'Point2d'类型
const p1 = p3d as Point2d;
p1.x;
p1.y;
```

此例中，将三维的点转换为二维的点可能不会有什么问题，但是编译器也允许将二维的点转换为三维的点，这可能导致产生错误的结果，因为在Point2d类型上不存在属性z。在程序中使用类型断言时，就相当于开发者在告诉编译器“我清楚我在做什么”，因此开发者也需要对类型断言的结果负责。

如果两个类型之间完全没有关联，也就是不满足上述的两个条件，那么编译器会拒绝执行类型断言。

```typescript
// 报错
let a: boolean = 'hello' as boolean;
```

少数情况下，在两个复杂类型之间进行类型断言时，编译器可能会无法识别出正确的类型，因此错误地拒绝了类型断言操作，又或者因为某些特殊原因而需要进行强制类型转换。那么在这些特殊的场景中可以使用如下变通方法来执行类型断言。该方法先后进行了两次类型断言，先将expr的类型转换为顶端类型unknown，而后再转换为目标类型。因为任何类型都能够赋值给顶端类型，它满足类型断言的条件，因此允许执行类型断言。

```typescript
expr as unknown as T

// 示例
const a = 1 as unknown as number;
```

除了使用unknow类型外，也可以使用any类型。但因为unknown类型是更加安全的顶端类型，因此推荐优先使用unknown类型。

```typescript
const a = 1 as any as number;
```

## as const 断言

TypeScript 有时会有一些出乎意料的报错。

```typescript
type Language = 
  |'JavaScript'
  |'TypeScript'
  |'Python';

function setLang(
  language: Language
) {
  /* ... */
}

let language = 'JavaScript';
setLang(language); // 报错
```

上面示例最后一行报错，原因在于函数`setLang()`的参数类型与变量`language`的类型不符。前者是一个联合类型，后者则是 TypeScript 推断的`string`类型。

为了解决两者类型不一致，至少有三种方法。

```typescript
// 方法一
let language:Language = 'JavaScript';
setLang(language);

// 方法二
const language = 'JavaScript';
setLang(language);

// 方法三
let language = 'JavaScript' as const;
setLang(language);
```

上面示例中，方法一是修改变量`language`的类型，方法二是将变量`language`变为常量，但是这样就无法再修改变量`language`了。方法三则是将`JavaScript`这个值的推断类型从`string`变为常量。

`as const`这种写法，跟在一个值后面，起到断言作用，告诉 TypeScript，推断类型时，可以将这个值推断为常量。

如果`const`声明的对象属性是文字表达式，这些属性的类型是`string`，而不是文字表达式的值。断言可以使得这些属性的类型变为所声明的值。

const类型断言是一种特殊形式的<T>类型断言和as T类型断言，它能够将某一类型转换为不可变类型。const类型断言有以下两种语法形式：

```typescript
expr as const

<const>expr
```

在该语法中，const是关键字，它借用了const声明的关键字；expr则要求是以下字面量中的一种：

- boolean字面量。
- string字面量。
- number字面量。
- bigint字面量。
- Enum 成员字面量。
- 数组字面量。
- 对象字面量。

注意，`as const`只能用在字面量后面，不能用在变量后面。

```typescript
let a1 = true;          
let a2 = true as const; 

a2 = false; // 报错
```

const类型断言会将expr表达式的类型转换为不可变类型，会缩小成 TypeScript 允许的最小类型。

```typescript
const v1 = {
 x: 1,
 y: 2,
}; // Type is { x: number; y: number; }

const v2 = {
 x: 1 as const,
 y: 2,
}; // Type is { x: 1; y: number; }

const v3 = {
 x: 1,
 y: 2,
} as const; // Type is { readonly x: 1; readonly y: 2; }
```

上面示例中，第二种写法是对`1`缩小类型，第三种写法是对`x: 1`缩小类型。

如果是数组，类型会变成只读元组。

```typescript
const a1 = [1, 2, 3]; // Type is number[]
const a2 = [1, 2, 3] as const; // Type is readonly [1, 2, 3]
```

如果expr为boolean字面量、string字面量、number字面量、bigint字面量或枚举成员字面量，那么转换后的结果类型为对应的字面量类型。

```typescript
let a1 = true;              // boolean
let a2 = true as const;     // true

let b1 = 'hello';           // string
let b2 = 'hello' as const;  // 'hello'

let c1 = 0;                 // number
let c2 = 0 as const;        // number

let d1 = 1n;                // number
let d2 = 1n as const;       // 1n

enum Foo {
    X,
    Y,
}
let e1 = Foo.X;            // Foo
let e2 = Foo.X as const;   // Foo.X
```

如果expr为数组字面量，那么转换后的结果类型为只读元组类型。

```typescript
let a1 = [0, 0];           // number[]
let a2 = [0, 0] as const;  // readonly [0, 0]
```

如果expr为对象字面量，那么转换后的结果类型会将对象字面量中的属性全部转换成只读属性。

```typescript
// { x: number; y: number; }
let a1 = { x: 0, y: 0 };

// { readonly x: 0; readonly y: 0; }
let a2 = { x: 0, y: 0 } as const;
```

```typescript
const HTTPRequestMethod = {
  CONNECT: "CONNECT" as "CONNECT",
  DELETE: "DELETE" as "DELETE",
  GET: "GET" as "GET",
  HEAD: "HEAD" as "HEAD",
  OPTIONS: "OPTIONS" as "OPTIONS",
  PATCH: "PATCH" as "PATCH",
  POST: "POST" as "POST",
  PUT: "PUT" as "PUT",
  TRACE: "TRACE" as "TRACE",
};

// 等同于
const HTTPRequestMethod = {
  CONNECT: "CONNECT",
  DELETE: "DELETE",
  GET: "GET",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  PATCH: "PATCH",
  POST: "POST",
  PUT: "PUT",
  TRACE: "TRACE",
} as const;

// 等同于
const HTTPRequestMethod: {
  readonly CONNECT: "CONNECT";
  readonly DELETE: "DELETE";
  readonly GET: "GET";
  readonly HEAD: "HEAD";
  readonly OPTIONS: "OPTIONS";
  readonly PATCH: "PATCH";
  readonly POST: "POST";
  readonly PUT: "PUT";
  readonly TRACE: "TRACE";
} = {
  CONNECT: "CONNECT",
  DELETE: "DELETE",
  GET: "GET",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  PATCH: "PATCH",
  POST: "POST",
  PUT: "PUT",
  TRACE: "TRACE",
};

// 等同于
enum HTTPRequestMethod {
  CONNECT = "CONNECT",
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  TRACE = "TRACE",
}
```

使用断言以后，就不能再修改属性的值了。

```typescript
HTTPRequestMethod.GET = "..."; // 报错
```

const 断言不限于字符串，其他值也可以用。

```typescript
const ORIGIN = {
  x: 0,
  y: 0,
} as const;

// 等同于
const ORIGIN: {
  readonly x: 0;
  readonly y: 0;
} = {
  x: 0,
  y: 0,
};
```

元组或数组也可以使用 const 断言。

```typescript
const ORIGIN = [0, 0] as const;
```

下例中，若想要解决`nums`报错，只需让编译器知道nums是有两个元素的元组类型即可，使用const断言是一种简单可行的方案。

```typescript
function add(x: number, y: number) {
  return x + y;
}

const nums = [1, 2] as const;
//    ~~~~
//    推断出的类型为'readonly [1, 2]'

const total = add(...nums); // 正确
```

使用const断言后，推断的nums类型为包含两个元素的元组类型，因此编译器有足够的信息能够判断出add函数调用是正确的。

## 添加全局变量

```typescript
window.__INITIAL_DATA__ = {
    userID: "536891193569405430",
  };

// 报错
const initialData = window.__INITIAL_DATA__;
```

window 没有这个属性。

解决方法

```typescript
const initialData = (window as any).__INITIAL_DATA__;
```

还可以进一步对 initialData 进行断言。

```typescript
type InitialData = {
  userID: string;
};

const initialData = (window as any).__INITIAL_DATA__ as InitialData;
```

当然，比较好的方法还是通过 interface 为 Window 类型添加属性。

```typescript
type InitialData = {
  userID: string;
};

interface Window {
  __INITIAL_DATA__: InitialData;
}

const initialData = window.__INITIAL_DATA__;
```

但是，上面的解决方法在模块里面不适用，必须写成下面这样。

```typescript
declare global {
  interface Window {
    __INITIAL_DATA__: InitialData;
  }
}

const initialData = window.__INITIAL_DATA__;
```

## !类型断言

TypeScript 会对下面的代码报错。

```typescript
const root = document.getElementById("root");

// 报错
// Object is possibly null
root.addEventListener("click", e => {
  /* ... */
});
```

上面代码中，root 变量的类型 HTMLElement | null，所以报错了。

为了防止这个错误，可以使用非空断言运算符，它在调用结尾加上后缀运算符`!`。

```typescript
const root = document.getElementById("root")!;

root.addEventListener("click", e => {
  /* ... */
});
```

非空断言运算符`!`告诉 TypeScript 假设返回的值document.getElementById()是非空且非未定义的（也称为“非空值”）。TypeScript 将排除类型null和undefined。

非空断言表示该值可能不是`undefined`或`null`。

非空类型断言运算符“!”是TypeScript特有的类型运算符，它是非空类型断言的一部分。非空类型断言能够从某个类型中剔除undefined类型和null类型。

```typescript
expr!
```

在该语法中，expr表示一个表达式，非空类型断言尝试从expr表达式的类型中剔除undefined类型和null类型。

当代码中使用了非空类型断言时，相当于在告诉编译器expr的值不是undefined值和null值。

```typescript
/**
 * --strictNullChecks=true
 */

function getLength(v: string | undefined) {
    if (!isDefined(v)) {
        return 0;
    }

    return v!.length;
}

function isDefined(value: any) {
    return value !== undefined && value !== null;
}
```

此例第6行，我们使用工具函数isDefined来判断参数v是否为undefined值或null值。如果参数v的值为undefined或null，那么直接返回0；否则，返回v的长度。由于一些限制，编译器无法识别出第10行中v的类型为string类型，而是仍然认为v的类型为“string | undefined”。此时，需要使用非空类型断言来告诉编译器参数v的类型不是undefined类型，这样就可以避免编译器报错。

当编译器遇到非空类型断言时，就会无条件地相信表达式的类型不是undefined类型和null类型。因此，不应该滥用非空类型断言，应当只在确定一个表达式的值不为空时才使用它，否则将存在安全隐患。

虽然非空类型断言也允许在非“--strictNullChecks”模式下使用，但没有实际意义。因为在非严格模式下，编译器不会检查undefined值和null值。

下面是另一个例子。

```typescript
const theName = 'Jane' as (null | string);

// @ts-expect-error: Object is possibly 'null'.
theName.length;

assert.equal(
  theName!.length, 4); // OK
```

上面示例中，变量加上感叹号后缀，表示该值非空。

非空断言运算符没有任何运行时表现。也就是说，TypeScript 编译器不会发出任何验证代码来验证表达式实际上是非空的。所以，比较保险的方法是手动检查一下类型。

```typescript
const root = document.getElementById("root");

if (root === null) {
  throw Error("Unable to find DOM element #root");
}

root.addEventListener("click", e => {
  /* ... */
});
```

非空断言符还可以进行赋值断言。如果打开了严格的属性初始化，有时 TypeScript 没有推断出属性初始化，就会报错。

```typescript
class Point1 {
  // @ts-expect-error: Property 'x' has no initializer and is not definitely
  // assigned in the constructor.
  x: number;

  // @ts-expect-error: Property 'y' has no initializer and is not definitely
  // assigned in the constructor.
  y: number;

  constructor() {
    this.initProperties();
  }
  initProperties() {
    this.x = 0;
    this.y = 0;
  }
}
```

这时就可以使用非空断言符，进行赋值断言。

```typescript
class Point2 {
  x!: number; // (A)
  y!: number; // (B)
  constructor() {
    this.initProperties();
  }
  initProperties() {
    this.x = 0;
    this.y = 0;
  }
}
```


## 断言函数

在程序设计中，断言表示一种判定。如果对断言求值后的结果为false，则意味着程序出错。

TypeScript 3.7引入了断言函数功能。断言函数用于检查实际参数的类型是否符合类型判定。若符合类型判定，则函数正常返回；若不符合类型判定，则函数抛出异常。基于控制流的类型分析能够识别断言函数并进行类型细化。

断言函数就是起到检查的作用，没有其他作用。

断言函数有以下两种形式：

```typescript
function assert(x: unknown): asserts x is T { }
// or
function assert(x: unknown): asserts x { }
```

在该语法中，“asserts x is T”和“asserts x”表示类型判定，它只能作为函数的返回值类型。asserts和is是关键字；x必须为函数参数列表中的一个形式参数名；T表示任意的类型；“is T”部分是可选的。若一个函数带有asserts类型判定，那么该函数就是一个断言函数。接下来将分别介绍这两种断言函数。

（1）asserts x is T

对于“asserts x is T”形式的断言函数，它只有在实际参数x的类型为T时才会正常返回，否则将抛出异常。例如，下例中定义了assertIsBoolean断言函数，它的类型判定为“asserts x is boolean”。这表示只有在参数x的值是boolean类型时，该函数才会正常返回，如果参数x的值不是boolean类型，那么assertIsBoolean函数将抛出异常。

```typescript
function assertIsBoolean(x: unknown): asserts x is boolean {
    if (typeof x !== 'boolean') {
        throw new TypeError('Boolean type expected.');
  }
}
```

（2）asserts x

对于“asserts x”形式的断言函数，它只有在实际参数x的值为真时才会正常返回，否则将抛出异常。例如，下例中定义了assertTruthy断言函数，它的类型判定为“asserts x”。这表示只有在参数x是真值时，该函数才会正常返回，如果参数x不是真值，那么assertTruthy函数将抛出异常。

```typescript
function assertTruthy(x: unknown): asserts x {
   if (!x) {
       throw new TypeError(
            `${x} should be a truthy value.`
        );
    }
}
```

在assertTruthy断言函数的函数体中，开发者需要按照约定的断言函数语义去实现断言函数。第2行使用了类型守卫，当参数x是假值时，函数抛出一个异常。

```typescript
function assertNonNullish<TValue>(
  value: TValue,
  message: string
): asserts value is NonNullable<TValue> {
  if (value === null || value === undefined) {
    throw Error(message);
  }
}
```

`asserts value is NonNullable<TValue>`返回类型注解就是所谓的断言签名。这个断言签名表明，如果函数正常返回（也就是说，如果它没有抛出错误），它就断言value参数的类型是NonNullable<TValue>. TypeScript 使用这条信息来缩小我们传递给value参数的表达式的类型。

下面是一个例子。返回值加了类型断言以后，TypeScript 就不会报错了。

```typescript
const root = document.getElementById("root");
assertNonNullish(root, "Unable to find DOM element #root");

root.addEventListener("click", e => {
  /* ... */
});
```

编译器将asserts类型判定视为void类型，这意味着断言函数的返回值类型是void。从类型兼容性的角度来考虑：undefined类型可以赋值给void类型；never类型是尾端类型，也可以赋值给void类型；当然，还有无所不能的any类型也可以赋值给void类型。除此之外，任何类型都不能作为断言函数的返回值类型（在严格类型检查模式下）。

```typescript
function f0(x: unknown): asserts x {
    if (!x) {
        // 相当于返回 never 类型，与 void 类型兼容
        throw new TypeError(
            `${x} should be a truthy value.`
        );
    }

    // 正确，隐式地返回 undefined 类型，与 void 类型兼容
}

function f1(x: unknown): asserts x {
    if (!x) {
        throw new TypeError(
            `${x} should be a truthy value.`
        );
    }

    // 正确
    return undefined;  // 返回 undefined 类型，与 void 类型兼容
}

function f2(x: unknown): asserts x {
    if (!x) {
        throw new TypeError(
            `${x} should be a truthy value.`
        );
    }

    return false;  // 编译错误！类型 false 不能赋值给类型 void
}

function f3(x: unknown): asserts x {
   if (!x) {
       throw new TypeError(
           `${x} should be a truthy value.`
        );
    }

    return null; // 编译错误！类型 null 不能赋值给类型 void
}
```

当程序中调用了断言函数后，其结果一定为以下两种情况之一：

- 断言判定失败，程序抛出异常并停止继续向后执行代码。
- 断言判定成功，程序继续向后执行代码。

基于控制流的类型分析能够利用以上的事实对调用断言函数之后的代码进行类型细化。

```typescript
function assertIsNumber(x: unknown): asserts x is number {
    if (typeof x !== 'number') {
        throw new TypeError(`${x} should be a number.`);
    }
}

function f(x: any, y: any) {
    x; // any
    y; // any

    assertIsNumber(x);
    assertIsNumber(y);

    x; // number
    y; // number
}
```

此例中，assertIsNumber断言函数用于确保传入的参数是number类型。f函数的两个参数x和y都是any类型。第8、9行还没有执行断言函数，这时参数x和y都是any类型。第14、15行，在执行了assertIsNumber断言函数后，编译器能够分析出当前位置上参数x和y的类型一定是number类型。因为如果不是number类型，那么意味着断言函数已经抛出异常并退出了f函数，不可能执行到第14和15行位置。

## 参考链接

- [Const Assertions in Literal Expressions in TypeScript](https://mariusschulz.com/blog/const-assertions-in-literal-expressions-in-typescript), Marius Schulz
- [Assertion Functions in TypeScript](https://mariusschulz.com/blog/assertion-functions-in-typescript), Marius Schulz