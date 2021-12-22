# 类

## 概述

在类的内部，首先给出实例属性的类型注释，然后再定义方法。

```typescript
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
}
```

上面示例中，实例属性`x`和`y`的类型是`number`。

类本身也是一个类型，比如上面例子的类`Point`本身就是一个类型，方法`add()`的参数就是`Point`类型。

继承的时候，只需要给出新增属性的类型注释，不需要给出继承属性的类型注释。

```typescript
class Point3D extends Point {
    z: number;
    constructor(x: number, y: number, z: number) {
        super(x, y);
        this.z = z;
    }
    add(point: Point3D) {
        var point2D = super.add(point);
        return new Point3D(point2D.x, point2D.y, this.z + point.z);
    }
}
```

上面示例中，实例属性`z`是`Point3D`新增的属性，所以需要给出类型注释。实例属性`x`和`y`是继承的属性，不用重复给出类型注释了。

## 使用 inteface

另一种给出 Class 类型注释的方法，就是使用 interface。这时要使用 implements 关键字。

```typescript
interface Point {
    x: number;
    y: number;
    z: number; // New member
}

class MyPoint implements Point { // ERROR : missing member `z`
    x: number; y: number;
}
```

## 访问修饰符

TypeScript 提供了三个访问修饰符（access modifiers），控制类的成员的可访问性：`public`、`private`和`protected`。

`public`是公开属性，实例可以获取的属性。

`private`是私有属性，只能在定义它的类内部使用，实例和子类都不能读取。

`protected`也是私有属性，实例无法读取该属性，但是子类可以读取。

```typescript
class FooBase {
    public x: number;
    private y: number;
    protected z: number;
}

var foo = new FooBase();
foo.x; // okay
foo.y; // ERROR : private
foo.z; // ERROR : protected

class FooChild extends FooBase {
    constructor() {
      super();
        this.x; // okay
        this.y; // ERROR: private
        this.z; // okay
    }
}
```

上面示例中，实例只能访问属性`x`，不能访问属性`y`和`z`。子类可以访问属性`x`和`z`，但不能访问属性`y`。

如果不注明，默认的访问修饰符是`public`。

有些实例属性，是由构造函数的参数传入的。这样等于要给出两次类型注释，一次在类的头部，另一次在构造函数的参数里面，这有一点累赘。所以，TypeScript 提供了一种简写形式。

```typescript
class Foo {
    public x: number;
    constructor(x:number) {
        this.x = x;
    }
}

// 等同于
class Foo {
    constructor(public x:number) {
    }
}
```

上面示例的简写形式，自动将`public x`声明为实例属性。

## abstract

`abstrct`也是一个修饰符，不仅可以用于类的成员，也可以用于类本身。

它表明这个类不能实例化，必须用子类继承后，对子类实例化。也就是说，抽象类只用于定义类的原型，必须继承后使用。

`abstract`的作用是，确保一系列相关的子类拥有跟基类相同的接口。

```typescript
abstract class FooCommand {}

class BarCommand extends FooCommand {}

// 报错
const fooCommand: FooCommand = new FooCommand(); 

// 正确
const barCommand = new BarCommand(); 
```

如果抽象类的属性前面加上`abstract`，就表明子类必须给出该方法的实现。

```typescript
abstract class FooCommand {
  abstract execute(): string;
}

// 报错
class BarErrorCommand  extends FooCommand {} 

// 正确
class BarCommand extends FooCommand {
  execute() {
    return `Command Bar executed`;
  }
}
```