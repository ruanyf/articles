# Object 的类型

## 基本用法

对象的类型可以用大括号直接描述。

```typescript
const obj: {  
  x: number;
  y: number;  
} = { x: 1, y: 1 };
```

上面示例中，对象`obj`的类型就是在大括号里面，注明每个属性的类型。

注意，对象类型的每个属性后面，要使用分号结尾。

如果某个属性是可选的，需要在属性名后面加一个问号。

```typescript
const obj: {  
  x: number;
  y?: number;  
} = { x: 1 };
```

上面示例中，属性`y`是可选的。

`interface`关键字可以把类型描述提炼成一个接口。这样就很简洁，还可以复用。

```typescript
interface myObj {
  x: number;
  y: number;
}

const obj:myObj = { x: 1, y: 1 }; 
```

上面示例中，`interface`关键字定义了一个类型接口`myObj`，变量就可以直接指定为该类型。

对象的方法使用函数类型描述。

```typescript
interface myObj {
  x: number;
  y: number;
  add(x:number, y:number): number;
  // 或者写成
  // add: (x:number, y:number) => number;
}

const obj:myObj = { 
  x: 1, 
  y: 1, 
  add(x, y) {
    return x + y;
  } 
}; 
```

上面示例中，类型`myObj`有一个方法`add()`，需要定义它的参数类型和返回值类型。

JavaScript 有这样一种情况，函数除了直接调用，还可以作为对象使用，添加属性。

```javascript
function fn() {
  return 'hello';
}
fn.foo = 'bar';
```

上面示例中，`fn()`是一个函数，也是一个对象，可以添加属性`fn.foo`。它的类型写成下面这样。

```typescript
interface myFn {
  foo: string;
  (): string;
}

const fn:myFn = function () {
  return 'hello';
}
fn.foo = 'bar';
```

上面示例中，接口`myFn`里面的`(): string;`，就表示这个接口可以直接当作函数调用。圆括号表示执行该类型（即调用函数），返回值的类型是`string`。

由于任何函数都可以看作是可以执行的对象，这意味着函数的类型有两种写法，一种是函数的写法，一种是对象的写法。

```typescript
// 写法一
function myfn():string {
  return 'hello world';
}

// 写法二
var myfn: { (): string; } = 
  () => 'hello world';
```

上面示例定义函数类型时，采用了两种写法。写法一是把类型写成函数，写法二是把类型写成对象，两者是等价的。

对象类型也使用方括号读取属性。

```typescript
type User = {name: string, age: number}
type Name = User['name']
```

如果一个属性是可选的，属性名后面可以加问号（？）。

```typescript
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}
```

当一个属性是可选的，并且 strictNullChecks 设置打开以后，直接读取可选属性会报错。

```typescript
function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos; // 报错
  let yPos = opts.yPos; // 报错
  // ...
}
```

如果要使用，必须要检查一下是否为 undefined。

```typescript
function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;

  let yPos = opts.yPos === undefined ? 0 : opts.yPos;

  // ...
}
```

注意，目前没法为对象解构的参数指定类型，因为 JavaScript 为对象解构里面的冒号指定了用途。

```typescript
let { a: newName1, b: newName2 } = o;

// 等同于
let newName1 = o.a;
let newName2 = o.b;
```

上面示例中，冒号不是表示属性`a`和`b`的类型，而是指定新的变量名。如果要为`a`和`b`指定类型，不得不写成下面这样。

```typescript
let { a: newName1, b: newName2 }
  : { a: string; b: number } = o;
```

```typescript
function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
  render(shape); // 报错
  render(xPos); // 报错
}
```

上面示例中，参数解构里面的冒号，作用不是指定类型，而是为对应的参数名指定变量。所以，不存在 shape 变量，而是 shape 属性的值被赋值给了变量 Shape。

## 类型的兼容

类型只是规定了，本类型的值必须具有的特征。如果类型 A 满足类型 B 的特征，TypeScript 就认为前者兼容后者，或者说类型 A 是类型 B 的子类型（subtyping）。

```typescript
interface t1 {
  foo: number;
}

interface t2 {
  foo: number;
  bar: number;
}
```

上面示例中，类型`t1`必须具有属性`foo`，类型`t2`必须具有属性`foo`和`bar`，可以看到`t2`满足`t1`的特征。这时就可以说`t2`兼容`t1`，或者`t2`是`t1`的子类型。

兼容类型的值，可以赋值给另一个类型。

```typescript
const o2:t2 = { foo: 1, bar: 2};
const o1:t1 = o2; // 正确
```

上面示例中，对象`o2`的类型是`t2`，对象`o1`的类型是`t1`，两者并不是同一个类型。但是`o2`可以赋值给`o1`，并不会报错，原因就是类型`t2`兼容类型`t1`。

## type 命令

type 命令用来为类型起别名。

```typescript
type Point = {
  x: number;
  y: number;
};
 
// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

上面示例中，对象的类型被起了一个别名 Point。

任何类型都可以起别名。

```typescript
type ID = number | string;
```

## interface 命令

interface 命令定义类型接口。

```typescript
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

interface 可以使用 extends 关键字继承其他接口。

```typescript
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
 
interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

extends 关键字会从继承的接口里面拷贝属性类型，这样就不必重复书写。

extends 关键字还可以继承多个接口。

```typescript
interface Colorful {
  color: string;
}
 
interface Circle {
  radius: number;
}
 
interface ColorfulCircle extends Colorful, Circle {}
 
const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```

上面示例中，ColorfulCircle 就相当于 Colorful 和 Circle 两个接口合并了。

`&`运算符可以起到两个对象接口合并的作用。

```typescript
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
 
type ColorfulCircle = Colorful & Circle;

function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}
```

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

## type 命令与 interface 命令的区别

两者作用类似，几乎所有的 interface 命令都可以改写为 type 命令。

它们的区别主要是可扩展性。type 定义的类型别名，无法加新属性。

```typescript
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}

const bear = getBear();
bear.name;
bear.honey;
```

上面代码中，如果要为类型别名`Animal`添加一个属性，只能重新定义一个别名，并使用`&`运算符合并原来的别名。

interface 命令则是总是可以扩展。

```typescript
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}
```

上面示例中，如果要扩展接口，只要再用 interface 命令定义一次同名接口就可以了，它会自动跟原来的接口合并。

如果要为扩展后的接口起一个新的名字，则可以使用 extends 关键字。

```typescript
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear() 
bear.name
bear.honey
```

上面示例中，只要使用`extends`关键字，就能基于原来的接口进行扩展。

因为 inteface 的灵活性更高，所以建议优先使用 inteface，代替 type 命令。

## 类型断言

类型断言用于在一个大类型之中，指定更具体的类型。

它有两种写法。一种是使用 as 命令。

```typescript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

另一种是使用尖括号。

```typescript
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

注意，类型断言只能用于将大类型断言为其内部更小的类型，不能将小类型断言为更大的类型，或者更改大类型。

```typescript
const x = "hello" as number;
```

如果要更改大类型，可以使用两次 as 命令。

```typescript
const a = (expr as any) as T;
```

上面示例中， 变量 expr 先断言为 any 类型（即取消原有的类型），然后再断言为类型 T。

## readonly 修饰符

`readonly`是对象类型的属性修饰符。标记为`readonly`的属性只能在对象初始化期间赋值，此后就不能修改该属性。

```typescript
type Point = {
  readonly x: number;
  readonly y: number;
};

const p:Point = { x: 0, y: 0 };

p.x = 100; // 报错
```

上面示例中，类型`Point`的属性`x`和`y`都带有修饰符`readonly`，表示这两个属性只能在初始化期间，后面再修改就会报错。

## unknown 类型

`unknown`类型表示对象可以有未知属性。

```typescript
interface PrettierConfig {
  [prop: string]: unknown;
  printWidth?: number;
  tabWidth?: number;
  semi?: boolean;
}

// 不加 unknown 类型
const prettierConfig: PrettierConfig = {
  semicolons: true, // Error
};

// 添加 unknown 类型
const prettierConfig: PrettierConfig = {
  semicolons: true, // 正确
};
```

注意，一旦对象包含了指定属性，再指定其他属性，传入函数就不会报错。

```typescript
interface PrettierConfig {
  printWidth?: number;
  tabWidth?: number;
  semi?: boolean;
}

function createFormatter(config: PrettierConfig) {
  // ...
}

const prettierConfig = {
  printWidth: 100,
  semicolons: true,
};

const formatter = createFormatter(prettierConfig);
```
