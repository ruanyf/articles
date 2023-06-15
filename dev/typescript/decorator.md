# TypeScript 装饰器

## 简介

装饰器（Decorator）是一种语法结构，用来修改类（class）的行为。

在语法上，装饰器有如下几个特征。

（1）第一个字符（或者说前缀）是`@`，后面是一个表达式。

（2）`@`后面的表达式，必须是一个函数（或者执行后可以得到一个函数）。

（3）这个函数接受所修饰对象的一些相关值作为参数。

（4）这个函数要么不返回值，要么返回一个新对象取代所修饰的目标对象。

举例来说，有一个函数`Injectable()`当作装饰器使用，那么需要写成`@Injectable`，然后放在某个类的前面。

```typescript
@Injectable class A {
  // ...
}
```

上面示例中，由于有了装饰器`@Injectable`，类`A`的行为在运行时就会发生改变。

下面就是一个最简单的装饰器。

```typescript
function simpleDecorator() {
  console.log('hi');
}

@simpleDecorator
class A {} // "hi"
```

上面示例中，函数`simpleDecorator()`用作装饰器，附加在类`A`之上，后者在代码解析时就会打印一行日志。

编译上面的代码会报错，提示没有用到装饰器的参数。现在就为装饰器加上参数，让它更像正式运行的代码。

```typescript
function simpleDecorator(
  target:any,
  context:any
) {
  console.log('hi, this is ' + target);
  return target;
}

@simpleDecorator
class A {} // "hi, this is class A {}" 
```

上面的代码就可以顺利通过编译了，代码含义这里先不解释。大家只要理解，类`A`在执行前会先执行装饰器`simpleDecorator()`，并且会向装饰器自动传入参数就可以了。

相比使用子类改变父类，装饰器更加简洁优雅，缺点是不那么直观，功能也受到一些限制。所以，装饰器一般只用来为类添加某种特定行为。

```javascript
@frozen class Foo {

  @configurable(false)
  @enumerable(true)
  method() {}

  @throttle(500)
  expensiveMethod() {}
}
```

上面示例中，一共有四个装饰器，一个用在类本身（`@frozen`），另外三个用在类的方法（`@configurable`、`@enumerable`、`@throttle`）。它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能。

## 装饰器的版本

TypeScript 从早期开始，就支持装饰器。但是，装饰器的语法后来发生了变化。ECMAScript 标准委员会最终通过的语法标准，与 TypeScript 早期使用的语法有很大差异。

目前，TypeScript 5.0 同时支持两种装饰器语法。标准语法可以直接使用，传统语法需要打开`--experimentalDecorators`编译参数。

```bash
$ tsc --target ES5 --experimentalDecorators
```

本章介绍装饰器的标准语法，下一章介绍传统语法。

## 装饰器的结构

装饰器函数的类型定义如下。

```typescript
type Decorator = (
  value: DecoratedValue,
  context: {
    kind: string;
    name: string | symbol;
    addInitializer(initializer: () => void): void;

    // Don’t always exist:
    static: boolean;
    private: boolean;
    access: {get: () => unknown, set: (value: unknown) => void};
  }
) => void | ReplacementValue; // only fields differ
```

上面代码中，`Decorator`是装饰器的类型定义。它是一个函数，接受`value`和`context`两个参数。

其中，`value`参数是所装饰的对象，`context`是装饰器的上下文对象。

`context`对象有以下属性。

（1）`kind`：字符串，表示装饰器类型，可能取以下的值。

- 'class'
- 'method'
- 'getter'
- 'setter'
- 'accessor'
- 'field'

这表示一共有六种类型的装饰器。

（2）`name`：字符串或者 Symbol 值，所装饰对象的名字，比如类名、属性名等。

（3）`addInitializer()`：函数，为所装饰对象添加初始化方法。该函数的参数是一个没有返回值的函数，会自动执行。

## 方法装饰器

方法装饰器用来装饰类的方法（method）。

```typescript
class C {
  @trace
  toString() {
    return 'C';
  }
}

function trace(decoratedMethod) {
  // Returns a function that replaces `decoratedMethod`.
}
```

方法装饰器的实质是执行下面的操作。

```typescript
class C {
  toString() {
    return 'C';
  }
}

C.prototype.toString = trace(C.prototype.toString);
```

如果装饰器返回一个新的函数，就会替代所装饰的对象。

```typescript
function replaceMethod() {
  return function () {
    return `How are you, ${this.name}?`;
  }
}

class Person {
  constructor(name) {
    this.name = name;
  }

  @replaceMethod
  hello() {
    return `Hi ${this.name}!`;
  }
}

const robin = new Person('Robin');

robin.hello() // 'How are you, Robin?'
```

上面示例中，装饰器`@replaceMethod`返回的函数，就成为了新的`hello()`方法。

下面是装饰器`addInitializer()`方法的例子。

```typescript
function collect(
  value,
  {name, addInitializer}
) {
  addInitializer(function () {
    if (!this.collectedMethodKeys) {
      this.collectedMethodKeys = new Set();
    }
    this.collectedMethodKeys.add(name);
  });
}

class C {
  @collect
  toString() {}

  @collect
  [Symbol.iterator]() {}
}

const inst = new C();
inst.@collect // new Set(['toString', Symbol.iterator])
```

上面示例中，装饰器`@collect`会将所装饰的成员名字，加入一个 Set 集合`collectedMethodKeys`。

## 属性装饰器

属性装饰器用来装饰定义在类顶部的属性（field）。

下面的例子是通过属性装饰器，获取属性的存取器函数。

```typescript
let acc;

function exposeAccess(
  value, {access}
) {
  acc = access;
}

class Color {
  @exposeAccess
  name = 'green'
}

const green = new Color();
green.name // 'green'

acc.get.call(green) // 'green'

acc.set.call(green, 'red');
green.name // 'red'
```

上面示例中，`@exposeAccess`是`name`属性的装饰器，它的第二个参数就是`name`的上下文对象，其中`access`属性包含了取值器（`get`）和存值器（`set`），可以对`name`属性进行取值和赋值。