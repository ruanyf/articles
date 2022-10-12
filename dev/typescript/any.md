# any 类型，unknown 类型，never 类型

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

### --noImplicitAny 编译选项

前一章说过，对于不写类型的标识符，TypeScript 会推断类型。但是，并非所有场合都能推断出类型，这时 TypeScript 就会认为类型是 `any`。

```typescript
function add(a, b) {
  return a + b;
}
```

上面示例中，函数`add()`的参数`a`和`b`没有注明类型，TypeScript 就会去推断类型，但是这个例子无法推断出来，TypeScript 就认为`a`和`b`的类型是`any`。

一旦类型设为`any`，TypeScript 就放弃对其进行类型检查，这就失去使用 TypeScript 的意义了。为了避免这种情况，TypeScript 提供了一个编译选项`--noImplicitAny`，只要打开这个选项，推断不出类型就会报错。

```bash
$ tsc --noImplicitAny myScript.ts
```

上面命令就使用了`--noImplicitAny`编译选项进行编译，这时上面的函数`add()`就会报错。

这时，如果想避免报错，就必须设置`a`和`b`的类型。

```typescript
function add(a:number, b:number) {
  return a + b;
}
```

当然，`a`和`b`显式设为类型`any`，也能避免报错，但是不要使用这种写法。

```typescript
function add(a:any, b:any) {
  return a + b;
}
```

## unknown 类型

为了解决`any`类型“污染”其他变量的问题，TypeScript 引入了`unknown`类型。它与`any`含义相同，表示类型不确定，但是使用上有一些限制。

首先，所有类型的值都可以分配给`unknown`类型。

```typescript
let value:unknown;

value = true;
value = 42;
value = 'Hello World';
value = [];
value = {};
value = Math.random; 
value = null;
value = undefined;
```

上面示例中，变量`value`的类型是`unknown`，可以赋值为各种类型的值。这与`any`的行为一致。

但是，`unknown`类型不能赋值给其他类型的变量（`any`类型和`unknown`类型除外）。

```typescript
let v:unknown = 123;

let v1:unknown = v; // 正确
let v2:any = v; // 正确

let v3:boolean = v; // 报错
let v4:number = v; // 报错
let v5:string = v; // 报错
let v6:object = v; // 报错
```

上面示例中，只有`any`类型和`unknown`类型的变量（`v1`和`v2`）可以赋值为变量`v`，其他类型的变量赋值为`v`都会报错。这就保证了`unknown`类型的值，只会局限在本类型的变量，不会扩散到其他类型的变量，从而克服了`any`的最大缺点。

其次，不能调用`unknows`类型的方法和属性，否则会报错。

```typescript
let v1:unknown = { foo: 123 };
v1.foo  // 报错

let v2:unknown = 'hello';
v2.trim() // 报错

let v3:unknown = n => n + 1;
v3() // 报错
```

上面示例中，调用`unknown`类型的属性和方法，或者直接执行`unknown`类型，都会报错。

再次，`unknown`类型能够进行的运算是有限的，只有比较运算（运算符`==`、`===`、`!=`、`!==`、`||`、`&&`、`?`）、取反运算（运算符`!`）、`typeof`运算符和`instanceof`运算符这几种，其他运算都会报错。

```typescript
let a:unknown = 1;
let b:unknown = a + 1; // 报错
let c:boolean = (a === 1); // 正确
```

上面示例中，`unknown`类型的变量`a`进行加法运算会报错，因为这是不允许的运算。但是进行比较运算就是可以的。

最后，只要经过“类型细化”（refine），`unknown`类型就可以赋值给其他类型。

```typescript
let a:unknown = 1;

if (typeof a === 'number') {
  let d = a + 10; // 正确
}
```

上面示例中，`unknown`类型的变量`a`经过`typeof`运算以后，能够确定实际类型是`number`，就能用于加法运算了。这就叫“类型细化”，就是将一个不确定的类型细化为更明确的类型。

这样设计的目的是，只有明确`unknown`变量的实际类型，才允许使用它，防止像`any`那样可以随意乱用，“污染”其他变量。

下面是另一个例子。

```typescript
function f1(value:unknown) {
  value * 5; // 报错

  if (value === 123) {
    value * 5; // 正确
  }
}

function f2(value:unknown) {
  value.length;  // 报错

  if (typeof value === 'string') { 
    value.length; // 正确
  }
}
```

上面示例中，直接使用`unknown`类型的变量就会报错，类型细化以后再使用，就不会报错。

总之，`unknown`可以看作是更安全的`any`，凡是需要设为`any`的地方，通常都应该优先考虑设为`unknown`。

## never 类型

类型也可能是空集，即不包含任何类型，TypeScript 把这种情况也当作一种类型，叫做`never`类型。

`never`类型表示不可能的类型，也就是不可能有任何值属于这个类型。

```typescript
let x: never;
```

上面示例中，变量`x`的类型是`never`，就不可能赋给它任何值，都会报错。

`never`类型的使用场景，主要是在一些类型运算之中，保证类型运算的完整性，详见后面章节。
