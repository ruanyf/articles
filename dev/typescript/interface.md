# interface 接口

很多面向对象的编程语言都有 interface 语法结构，用来表示对象必须实现的属性和方法。TypeScript 也提供了 interface 命令。

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}
```

上面的示例定义了一个接口`Person`，它相当于对象的模板。任何实现这个接口的对象，都必须部署接口定义的属性`firstName`、`lastName`和`age`，并且必须符合规定的类型。

对象实现这个接口就很简单，只要指定对象的类型为该接口即可。

```typescript
const p:Persion = {
  firstName: 'John',
  lastName: 'Smith',
  age: 25
};
```

## 接口合并

多个同名接口会合并成一个接口。

每个接口的非函数成员应该是唯一的。如果它们不是唯一的，则必须属于同一类型。如果接口都声明了同名但类型不同的非函数成员，编译器将发出错误。

```typescript
interface Box {
  height: number;
  width: number;
}
interface Box {
  scale: number;
}
let box: Box = { height: 5, width: 6, scale: 10 };
```

如果有同名函数，接口合并后，每个同名函数都被视为描述同一函数的重载。注意，后面的接口比前面的接口具有更高的优先级。

```typescript
interface Cloner {
  clone(animal: Animal): Animal;
}
interface Cloner {
  clone(animal: Sheep): Sheep;
}
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}

// 等同于
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}
```

但是，如果参数的类型是单个具体的值，那么接口合并后，这些单个值类型的接口会冒泡到最上方。

```typescript
interface Document {
  createElement(tagName: any): Element;
}
interface Document {
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
  createElement(tagName: string): HTMLElement;
  createElement(tagName: "canvas"): HTMLCanvasElement;
}

// 等同于
interface Document {
  createElement(tagName: "canvas"): HTMLCanvasElement;
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
  createElement(tagName: string): HTMLElement;
  createElement(tagName: any): Element;
}
```