# Object 的类型

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