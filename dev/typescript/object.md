# Object 的类型

## 基本用法

对象的类型可以用字面量直接描述。

```typescript
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}
```

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
function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
  render(shape); // 报错
  render(xPos); // 报错
}
```

上面示例中，参数解构里面的冒号，作用不是指定类型，而是为对应的参数名指定变量。所以，不存在 shape 变量，而是 shape 属性的值被赋值给了变量 Shape。

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

## readonly

readonly 是对象类型的属性修饰符，表示该属性在运行时不能修改。

```typescript
interface SomeType {
  readonly prop: string;
}
 
function doSomething(obj: SomeType) {
  // 报错
  obj.prop = "hello";
}
```
