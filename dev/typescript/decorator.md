# TypeScript 装饰器

## 简介

装饰器（Decorator）是一种语法结构，用来修改类（class）的行为。

在语法上，装饰器就是一个普通函数，通过`@`前缀附加在所装饰的对象前面，在运行时自动执行。举例来说，有一个函数`Injectable()`当作装饰器使用，那么需要写成`@Injectable`，放在类的前面下。

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
function simpleDecorator(target:any) {
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

TypeScript 的装饰器是一个实验性功能，编译时需要在命令行打开`--experimentalDecorators`选项。

```bash
$ tsc --target ES5 --experimentalDecorators
```

除了`--experimentalDecorators`这个配置项目用来打开装饰器支持，还有另外一个配置项`--emitDecoratorMetadata`，用来产生一些元数据，供其他工具（比如 reflect-metadata ）使用。

这两个配置项可以在命令行设置，也可以在`tsconfig.json`文件里面进行设置。

```javascript
{
  "compilerOptions": {
    "target": "ES6",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

装饰器语法是 TypeScript 自己制定的，ECMAScript 相关标准还没有定稿。现在的标准草案与 TypeScript 的语法有很大差别，所以建议谨慎使用装饰器，如果不是非常必要，就暂时不要使用。

## 装饰器的种类

按照所装饰的不同对象，装饰器可以分成五类。

> - 类装饰器（Class Decorators）：用于类。
> - 属性装饰器（Property Decorators）：用于属性。
> - 方法装饰器（Method Decorators）：用于方法。
> - 存取器装饰器（Accessor Decorators）：用于类的 set 或 get 方法。
> - 参数装饰器（Parameter Decorators）：用于方法的参数。

下面是这五种装饰器一起使用的一个示例。

```typescript
@ClassDecorator() // （A）
class A {

  @PropertyDecorator() // （B）
  name: string;

  @MethodDecorator() //（C）
  fly(
    @ParameterDecorator() // （D）
    meters: number
  ) {
    // code
  }

  @AccessorDecorator() // （E）
  get egg() {
    // code
  }
  set egg(e) {
    // code
  }
}
```

上面示例中，A 是类装饰器，B 是属性装饰器，C 是方法装饰器，D 是参数装饰器，E 是存取器装饰器。

注意，构造方法没有方法装饰器，只有参数装饰器。

另外，装饰器只能用于类，要么应用于一个类，要么应用于一个类的内部成员，不能用于独立的函数。

```typescript
function Decorator() {
  console.log('In Decorator');
}

@Decorator // 报错
function decorated() {
  console.log('in decorated');
}
```

上面示例中，装饰器用于一个普通函数，这是无效的，结果报错。

## 类装饰器

类装饰器应用于类（class），用来改造类的构造函数。

类装饰器有唯一参数，就是构造函数。类装饰器如果有返回值，就会替换掉原来的构造函数。

类装饰器会在代码加载阶段执行，而且只会执行一次。

```typescript
function f(target:any) {
  console.log('apply decorator')
  return target;
}

@f
class A {}
// 输出：apply decorator
```

上面示例中，类`A`并没有新建实例，但是装饰器也会执行。

如果类装饰器需要其他参数，可以采取“工厂模式”，即返回一个装饰器函数。然后，调用装饰器的时候，就需要先执行一次工厂函数。

```typescript
function factory(info:string) {
  console.log('received: ', info);
  return function (target:any) {
    console.log('apply decorator');
    return target;
  }
}

@factory('log something')
class A {}
```

上面示例中，函数`factory()`的返回值才是装饰器，所以加载装饰器的时候，要先执行一次`@factory('log something')`，才能得到装饰器。这样做的好处是，可以加入额外的参数，本例是`info`。

类装饰器可以没有返回值，如果有返回值，就会替代所装饰的类的构造函数。由于 JavaScript 的类等同于构造函数，所以装饰器通常返回一个新的类。

```typescript
function decorator(target:object) {
  return class extends target {
    value = 123;  
  };
}

@decorator
class Foo {
  value = 456;
}

const foo = new Foo();
console.log(foo.value); // 123
```

上面示例中，装饰器`decorator`返回一个新的类，替代了原来的类。

上例的装饰器参数`target`类型是`object`，可以改成类，这样就更准确了。

```typescript
type constructorMixin = {
  new(...args: any[]): {}
};

function decorator<T extends constructorMixin> (
  target: T
) {
  return class extends target {
    value = 123;  
  };
}
```


下面是类装饰器的类型描述。

```typescript
type ClassDecorator = <TFunction extends Function>
  (target: TFunction) => TFunction | void;
```

下面是一个例子。

```typescript
type Consturctor = { new (...args: any[]): any };

function toString<T extends Consturctor>(BaseClass: T) {
  return class extends BaseClass {
    toString() {
      return JSON.stringify(this);
    }
  };
}

@toString
class C {
  public foo = "foo";
  public num = 24;
}

console.log(new C().toString())
// -> {"foo":"foo","num":24}
```

上面的示例为类加了一个`toString()`方法。

```typescript
@sealed
class BugReport {
  type = "report";
  title: string;
 
  constructor(t: string) {
    this.title = t;
  }
}

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
```

下面是一个例子。

```typescript
function withParam(path: string) {
    console.log(`outer withParam ${path}`);
    return (target: Function) => {
        console.log(`inner withParam ${path}`);
    };
}

@withParam('first')
@withParam('middle')
@withParam('last')
class ExampleClass {
}

/* 输出为
outer withParam first
outer withParam middle
outer withParam last
inner withParam last
inner withParam middle
inner withParam first
*/
```

下面是替换构造函数的例子。

```typescript
function Override<T extends { new(...args: any[]): {} }>(target: T) {
    return class extends target {
        area(w: number, h: number) {
            return {
                w, h, area: w * h
            };
        }
    }
}

@Override
class Overridden {

    area(w: number, h: number) {
        return w * h;
    }
}

console.log(new Overridden().area(5, 6));
console.log(new Overridden().area(6, 7));
```

下面是继承构造函数的例子。

```typescript
import * as util from 'util';

function LogClassCreate<T extends { new(...args: any[]): {}}>(target: T) {
    return class extends target {
        constructor(...args: any[]) {
            super(...args);
            console.log(`Create ${util.inspect(target)} with args=`, args);
        }
    }
}

@LogClassCreate
class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.height = height;
        this.width = width;
    }

    area() { return this.width * this.height; }
}

@LogClassCreate
class Circle {
    diameter: number;
    constructor(diameter: number) {
        this.diameter = diameter;
    }

    area() { return ((this.diameter / 2) ** 2) * (Math.PI); }
}

const rect1 = new Rectangle(3, 5);
console.log(`area rect1 ${rect1.area()}`);

const rect2 = new Rectangle(5, 8);
console.log(`area rect2 ${rect2.area()}`);

const rect3 = new Rectangle(8, 13);
console.log(`area rect3 ${rect3.area()}`);

const circ1 = new Circle(20);
console.log(`area circ1 ${circ1.area()}`);
```

这时，装饰器的行为就是下面这样。

```javascript
@decorator
class A {}

// 等同于
class A {}
A = decorator(A) || A;
```

也就是说，装饰器是一个对类进行处理的函数。装饰器函数的第一个参数，就是所要装饰的目标类。

```javascript
@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true
```

上面代码中，`@testable`就是一个装饰器。它修改了`MyTestableClass`这个类的行为，为它加上了静态属性`isTestable`。`testable`函数的参数`target`是`MyTestableClass`类本身。

```javascript
function testable(target) {
  // ...
}
```

上面代码中，`testable`函数的参数`target`，就是会被装饰的类。

如果觉得一个参数不够用，可以在装饰器外面再封装一层函数。

```javascript
function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true

@testable(false)
class MyClass {}
MyClass.isTestable // false
```

上面代码中，装饰器`testable`实际上有两个参数（`isTestable`和`target`），但是由于最终只能接受`target`这一个参数，所以必须先调用一次，接受参数`isTestable`，然后返回一个函数，由该函数接受参数`target`。

这种分次调用的写法，解决了装饰器接受多个参数的问题，同时也可以根据其他参数的不同（上例的`@testable(true)`和`@testable(false)`），来调整装饰器的行为，有着广泛的应用。

总之，`@`后面要么是一个函数名，要么是函数表达式，甚至可以写出下面这样的代码。

```typescript
@((constructor: Function) => {
    console.log(`Inline constructor decorator `, constructor);
})
class InlineDecoratorExample {
    // properties and methods
}
```

上面示例中，`@`后面是一个箭头函数，只用来输出信息，这也是合法的。

注意，装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，装饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数。

前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的`prototype`对象操作。

```javascript
function testable(target) {
  target.prototype.isTestable = true;
}

@testable
class MyTestableClass {}

let obj = new MyTestableClass();
obj.isTestable // true
```

上面代码中，装饰器函数`testable`是在目标类的`prototype`对象上添加属性，因此就可以在实例上调用。

下面是另外一个例子。

```javascript
// mixins.js
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}

// main.js
import { mixins } from './mixins.js'

const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // 'foo'
```

上面代码通过装饰器`mixins`，把`Foo`对象的方法添加到了`MyClass`的实例上面。可以用`Object.assign()`模拟这个功能。

```javascript
const Foo = {
  foo() { console.log('foo') }
};

class MyClass {}

Object.assign(MyClass.prototype, Foo);

let obj = new MyClass();
obj.foo() // 'foo'
```

实际开发中，React 与 Redux 库结合使用时，常常需要写成下面这样。

```javascript
class MyReactComponent extends React.Component {}

export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);
```

有了装饰器，就可以改写上面的代码。

```javascript
@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}
```

相对来说，后一种写法看上去更容易理解。

下面是利用装饰器，覆盖掉同名方法的例子。

```typescript
function Override<T extends { new(...args: any[]): {} }>(target: T) {
    return class extends target {
        area(w: number, h: number) {
            return {
                w, h, area: w * h
            };
        }
    }
}

@Override
class Overridden {
    area(w: number, h: number) {
        return w * h;
    }
}
```

利用上面这种覆盖的写法，可以实现打印功能。

```typescript
import * as util from 'util';

function LogClassCreate<T extends { new(...args: any[]): {}}>(target: T) {
    return class extends target {
        constructor(...args: any[]) {
            super(...args);
            console.log(`Create ${util.inspect(target)} with args=`, args);
        }
    }
}
```

类装饰器如果没有参数，会导致报错。

```typescript
function Decorator() {
    console.log('In Decorator');
}

// 报错
@Decorator
class FooClass {
    foo: string;
}
```

## 方法的装饰

装饰器不仅可以装饰类，还可以装饰类的方法。

```javascript
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}
```

上面代码中，装饰器`@readonly`用来装饰“类”的`name()`方法。

装饰器函数`readonly`一共可以接受三个参数。

- 第一个参数`target`：（对于类的静态方法）类的构造函数，或者（对于类的实例方法）类的原型。
- 第二个参数`propertyKey`：该方法的方法名，类型为字符串。
- 第三个参数`descriptor`：该方法的描述对象。

装饰器函数的返回值（如果有的话），就是修改后的该方法的描述对象。下面是它的类型签名。

```typescript
type MethodDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;
```

```typescript
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
 
  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}

function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}
```

上面示例中，装饰器`@enumerable()`装饰 Greeter 类的`greet()`方法，作用是修改该方法的描述对象的可遍历性属性`enumerable`。`@enumerable(false)`表示将该方法修改成不可遍历。

下面再看一个例子。

```typescript
function logger(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  descriptor.value = function (...args) {
    console.log('params: ', ...args);
    const result = original.call(this, ...args);
    console.log('result: ', result);
    return result;
  }
}

class C {
  @logger
  add(x: number, y:number ) {
    return x + y;
  }
}

const c = new C();
c.add(1, 2);
// -> params: 1, 2
// -> result: 3
```

```typescript
import * as util from 'util';

function logMethod(target: Object, propertyKey: string,
                   descriptor: PropertyDescriptor) {

    console.log(`logMethod`, {
        target, propertyKey, descriptor, 
        targetKeys: Object.getOwnPropertyNames(target),
        function: descriptor.value,
        funcText: descriptor.value.toString()
    });
}

class MethodExample {

    @logMethod
    method(x: number) {
        return x * 2;
    }
}

/* 输出
logMethod {
  target: {},
  propertyKey: 'method',
  descriptor: {
    value: [Function: method],
    writable: true,
    enumerable: false,
    configurable: true
  },
  targetKeys: [ 'constructor', 'method' ],
  function: [Function: method],
  funcText: 'method(x) {\n        return x * 2;\n    }'
}
*/
```

利用属性描述对象，可以获得所装饰的方法本身，下面是一个输出调试信息的例子。

```typescript
function MethodSpy(target: Object,
    propertyKey: string, descriptor: PropertyDescriptor) {

    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`MethodSpy before ${propertyKey}`, args);
        const result = originalMethod.apply(this, args);
        console.log(`MethodSpy after ${propertyKey}`, result);
        return result;
    }
}

class SpiedOn {

    @MethodSpy
    area(width: number, height: number) {
        return width * height;
    }

    @MethodSpy
    areaCircle(diameter: number) {
        return Math.PI * ((diameter / 2) ** 2);
    }
}
```



```javascript
function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);
```

装饰器第一个参数是类的原型对象，上例是`Person.prototype`，装饰器的本意是要“装饰”类的实例，但是这个时候实例还没生成，所以只能去装饰原型（这不同于类的装饰，那种情况时`target`参数指的是类本身）；第二个参数是所要装饰的属性名，第三个参数是该属性的描述对象。

另外，上面代码说明，装饰器（readonly）会修改属性的描述对象（descriptor），然后被修改的描述对象再用来定义属性。

下面是另一个例子，修改属性描述对象的`enumerable`属性，使得该属性不可遍历。

```javascript
class Person {
  @nonenumerable
  get kidCount() { return this.children.length; }
}

function nonenumerable(target, name, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}
```

下面的`@log`装饰器，可以起到输出日志的作用。

```javascript
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

const math = new Math();

// passed parameters should get logged now
math.add(2, 4);
```

上面代码中，`@log`装饰器的作用就是在执行原始的操作之前，执行一次`console.log`，从而达到输出日志的目的。

装饰器有注释的作用。

```javascript
@testable
class Person {
  @readonly
  @nonenumerable
  name() { return `${this.first} ${this.last}` }
}
```

从上面代码中，我们一眼就能看出，`Person`类是可测试的，而`name`方法是只读和不可枚举的。

下面是使用 Decorator 写法的[组件](https://github.com/ionic-team/stencil)，看上去一目了然。

```javascript
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss'
})
export class MyComponent {
  @Prop() first: string;
  @Prop() last: string;
  @State() isVisible: boolean = true;

  render() {
    return (
      <p>Hello, my name is {this.first} {this.last}</p>
    );
  }
}
```

如果同一个方法有多个装饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。

```javascript
function dec(id){
  console.log('evaluated', id);
  return (target, property, descriptor) => console.log('executed', id);
}

class Example {
    @dec(1)
    @dec(2)
    method(){}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1
```

上面代码中，外层装饰器`@dec(1)`先进入，但是内层装饰器`@dec(2)`先执行。

除了注释，装饰器还能用来类型检查。所以，对于类来说，这项功能相当有用。从长期来看，它将是 JavaScript 代码静态分析的重要工具。

## 属性的装饰

属性装饰器用来装饰属性，用法如下。

```typescript
class ContainingClass {
  @Decorator(?? optional parameters)
  name: type;
}
```

属性装饰器函数接受两个参数。

- 第一个参数：（对于类的普通属性）类的 prototype 对象，或者（对于类的静态属性）类的构造函数。
- 第二个参数：该属性的属性名，类型为字符串。

该装饰器不需要返回值。下面是它的类型签名。

```typescript
type PropertyDecorator =
  (target: Object, propertyKey: string | symbol) => void;
```

```typescript
function logProperty(target: Object, member: string): any {
    const prop = Object.getOwnPropertyDescriptor(target, member);
    console.log(`Property ${member} ${prop}`);
}

class PropertyExample {
    @logProperty
    name: string;
}
// 输出 Property name undefined
```

下面是一个例子。

```typescript
function ValidRange(min: number, max: number) {
    return (target: Object, member: string) => {
        console.log(`Installing ValidRange on ${member}`);
        let value: number;
        Object.defineProperty(target, member, {
            enumerable: true,
            get: function() {
                console.log("Inside ValidRange get");
                return value;
            },
            set: function(v: number) {
                console.log(`Inside ValidRange set ${v}`);
                if (v < min || v > max) {
                    throw new Error(`Not allowed value ${v}`);
                }
                value = v;
            }
        });
    }
}

// 输出 Installing ValidRange on year
class Student {
    @ValidRange(1900, 2050)
    year: number;
}

const stud = new Student();

// Inside ValidRange set 1901
stud.year = 1901;

// 先输出 Inside ValidRange set 1899
// 然后报错 Uncaught Error: Not allowed value 1899
stud.year = 1899;
```

## 存取器的装饰

装饰器可以用于类的存取器（accessor），所谓“存取器”指的是某个属性的取值器（getter）和存值器（setter）。

```typescript
class Example {

    #name: string;

    @Decorator
    set name(n: string) { this.#name = n; }
    get name() { return #name; }

    #width: number;
    #height: number;

    @Decorator
    get area() { return this.#width * this.#height; }
}
```

上面示例中，`@Decorator`装饰`name`属性的存值器和取值器，同时也装饰`area`属性的取值器。

存取方法的装饰器函数可以有三个参数。

- 第一个参数：（对于类的静态属性的存取方法）类的构造函数，或者（对于类的实例属性的存取方法）类的原型。
- 第二个参数：该属性的属性名。
- 第三个参数：该属性的描述对象。

装饰器的返回值（如果有的话），会作为该属性新的描述对象。它的类型签名与方法装饰器的类型签名是一样的。

```typescript
class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
 
  @configurable(false)
  get x() {
    return this._x;
  }
 
  @configurable(false)
  get y() {
    return this._y;
  }
}

function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  };
}
```

上面示例中，装饰器`@configurable(false)`关闭了所装饰属性（`x`和`y`）的描述对象的`configurable`属性（可配置性）。

TypeScript 不允许对同一个属性的存取器使用同一个装饰器，换句话说只能装饰一个，否则就会报错。

```typescript
// 报错
@Decorator
set name(n: string) { this.#name = n; }

@Decorator
get name() { return #name; }
```

上面的示例会报错，因为`@Decorator`不能同时装饰`name`的存值器和取值器

但是，下面的写法不会报错。

```typescript
@Decorator
set name(n: string) { this.#name = n; }
get name() { return #name; }
```

上面的示例不会报错，因为`@Decorator`只会装饰它后面第一个出现的存值器（`set name()`），并不装饰取值器（`get name()`）。

装饰器之所以不能同时用于同一个属性的存值器和取值器，原因是装饰器可以从属性的描述对象上面，同时拿到取值器和存值器，因此只调用一次就够了。

```typescript
descriptor: {
    get: [Function: get num],
    set: [Function: set num],
    enumerable: false,
    configurable: true
}
```

```typescript
function LogAccessor(target: Object, propertyKey: string,
  descriptor: PropertyDescriptor) {

    console.log(`LogAccessor`, {
        target, propertyKey, descriptor
  });
}

class Simple {

    #num: number;

    @LogAccessor
    set num(w: number) { this.#num = w; }
    get num() { return this.#num; }
}
```


下面的例子就是改写原始的存取器。

```typescript
function AccessorSpy<T>() {
    return function (target: Object, propertyKey: string,
                    descriptor: PropertyDescriptor) {

        const originals = {
            get: descriptor.get,
            set: descriptor.set
        };
        if (originals.get) {
            descriptor.get = function (): T {
                const ret: T = originals.get.call(this);
                console.log(`AccessorSpy get ${String(propertyKey)}`, ret);
                return ret;
            };
        }
        if (originals.set) {
            descriptor.set = function(newval: T) {
                console.log(`AccessorSpy set ${String(propertyKey)}`, newval);
                originals.set.call(this, newval);
            };
        }
    }
}
```

装饰器还可以用作属性的验证，如果赋值时不满足条件就报错。

```typescript
function Validate<T>(validator: Function) {
    return (target: Object, propertyKey: string,
        descriptor: PropertyDescriptor) => {
        
        const originals = {
            get: descriptor.get,
            set: descriptor.set
        };
        if (originals.set) {
            descriptor.set = function(newval: T) {
                console.log(`Validate set ${String(propertyKey)}`, newval);
                if (validator) {
                    if (!validator(newval)) {
                        throw new Error(`Invalid value for ${propertyKey} -- ${newval}`);
                    }
                }
                originals.set.call(this, newval);
            };
        }
    }
}

class CarSeen {

    #speed: number;

    @Validate<number>((speed: number) => {
        console.log(`Validate speed ${speed}`);
        if (typeof speed !== 'number') return false;
        if (speed < 10 || speed > 65) return false;
        return true;
    })
    set speed(speed) {
        console.log(`set speed ${speed}`);
        this.#speed = speed; }
    get speed() { return this.#speed; }

}
```

## 参数的装饰

参数装饰器用来装饰构造函数或者方法的参数。

```typescript
@ClassDecorator()
class A {
...
    @MethodDecorator()
    fly(
        @ParameterDecorator(?? optional parameters)
        meters: number
    ) {
        // code
    }
...
}
```

装饰参数时，装饰器接受三个参数。

- 第一个参数：（对于静态方法）类的构造函数，或者（对于类的实例方法）类的原型。
- 第二个参数：当前方法的方法名，类型为字符串。
- 第三个参数：当前参数在函数参数序列的位置（从0开始）。

该装饰器不需要返回值。下面是它的类型签名。

```typescript
type ParameterDecorator = (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => void;
```

```typescript
import * as util from 'util';

function logParameter(target: Object, propertyKey: string | symbol,
                        parameterIndex: number) {

    console.log(`logParameter ${target} ${util.inspect(target)} ${String(propertyKey)} ${parameterIndex}`);
}

class ParameterExample {

    member(@logParameter x: number,
           @logParameter y: number) {
        console.log(`member ${x} ${y}`);
    }
}

const pex = new ParameterExample();
pex.member(2, 3);
pex.member(3, 5);
pex.member(5, 8);
```

跟其他装饰器不同，参数装饰器主要用于输出信息，没有办法修改实例方法的行为。

## 装饰器的执行顺序

前面说过，装饰器只会执行一次，就是在代码解析时执行，哪怕根本没有调用类新建实例，也会执行，而且从此就不再执行了。

执行装饰器时，按照如下顺序执行。

1. 实例相关的装饰器。
1. 静态相关的装饰器。
1. 构造方法的参数装饰器。
1. 类装饰器。

请看下面的示例。

```typescript
function f(key:string):any {
  return function () {
    console.log('执行：', key);
  };
}

@f('类装饰器')
class C {
  @f('静态方法')
  static method() {}
  
  @f('实例方法')
  method() {}

  constructor(@f('构造方法参数') foo:any) {}
}
```

加载上面的示例，输出如下。

```typescript
执行： 实例方法
执行： 静态方法
执行： 构造方法参数
执行： 类装饰器
```

同一级装饰器的执行顺序，是按照它们的代码顺序。但是，参数装饰器的执行总是早于方法装饰器。

```typescript
function f(key:string):any {
  return function () {
    console.log('执行：', key);
  };
}

class C {
  @f('方法1')
  m1(@f('参数1') foo:any) {}

  @f('属性1')
  p1: number;

  @f('方法2')
  m2(@f('参数2') foo:any) {}

  @f('属性2')
  p2: number;
}
```

加载上面的示例，输出如下。

```typescript
执行： 参数1
执行： 方法1
执行： 属性1
执行： 参数2
执行： 方法2
执行： 属性2
```

上面示例中，实例装饰器的执行顺序，完全是按照代码顺序的。但是，同一个方法的参数装饰器，总是早于该方法的方法装饰器执行。

如果同一个方法或属性有多个装饰器，那么装饰器将顺序加载、逆序执行。

```typescript
function f(key:string):any {
  console.log('加载：', key);
  return function () {
    console.log('执行：', key);
  };
}

class C {
  @f('A')
  @f('B')
  @f('C')
  m1() {}
}
// 加载： A
// 加载： B
// 加载： C
// 执行： C
// 执行： B
// 执行： A
```

如果同一个方法有多个参数，那么参数也是顺序加载、逆序执行。

```typescript
function f(key:string):any {
  console.log('加载：', key);
  return function () {
    console.log('执行：', key);
  };
}

class C {
  method(
    @f('A') a:any,
    @f('B') b:any,
    @f('C') c:any,
  ) {}
}
// 加载： A
// 加载： B
// 加载： C
// 执行： C
// 执行： B
// 执行： A
```

## 为什么装饰器不能用于函数？

装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。

```javascript
var counter = 0;

var add = function () {
  counter++;
};

@add
function foo() {
}
```

上面的代码，意图是执行后`counter`等于 1，但是实际上结果是`counter`等于 0。因为函数提升，使得实际执行的代码是下面这样。

```javascript
var counter;
var add;

@add
function foo() {
}

counter = 0;

add = function () {
  counter++;
};
```

下面是另一个例子。

```javascript
var readOnly = require("some-decorator");

@readOnly
function foo() {
}
```

上面代码也有问题，因为实际执行是下面这样。

```javascript
var readOnly;

@readOnly
function foo() {
}

readOnly = require("some-decorator");
```

总之，由于存在函数提升，使得装饰器不能用于函数。类是不会提升的，所以就没有这方面的问题。

另一方面，如果一定要装饰函数，可以采用高阶函数的形式直接执行。

```javascript
function doSomething(name) {
  console.log('Hello, ' + name);
}

function loggingDecorator(wrapped) {
  return function() {
    console.log('Starting');
    const result = wrapped.apply(this, arguments);
    console.log('Finished');
    return result;
  }
}

const wrapped = loggingDecorator(doSomething);
```

## 多个装饰器的合成

多个装饰器可以应用于同一个对象。

```javascript
@f @g x
// 或者写成
@f
@g
x
```

多重装饰器的效果，类似于函数的合成。对于上例来说，就是执行`f(g(x))`。

编译器执行的时候，会从上到下先得到每个装饰器的最终值，然后再从下到上，将对象依次作用于每个装饰器。

```typescript
function withParam(path: string) {
    console.log(`outer withParam ${path}`);
    return (target: Function) => {
        console.log(`inner withParam ${path}`);
    };
}

@withParam('first')
@withParam('middle')
@withParam('last')
class ExampleClass {
}

/*
outer withParam first
outer withParam middle
outer withParam last
inner withParam last
inner withParam middle
inner withParam first
*/
```

```typescript
function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}
 
function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}
 
class ExampleClass {
  @first()
  @second()
  method() {}
}

// first(): factory evaluated
// second(): factory evaluated
// second(): called
// first(): called
```

上面示例中，先从上到下计算装饰器`@first()`和`@second()`的值，然后再从下到上将`method`作用于装饰器`@second()`和`@first()`。

## core-decorators.js

[core-decorators.js](https://github.com/jayphelps/core-decorators.js)是一个第三方模块，提供了几个常见的装饰器，通过它可以更好地理解装饰器。

**（1）@autobind**

`autobind`装饰器使得方法中的`this`对象，绑定原始对象。

```javascript
import { autobind } from 'core-decorators';

class Person {
  @autobind
  getPerson() {
    return this;
  }
}

let person = new Person();
let getPerson = person.getPerson;

getPerson() === person;
// true
```

**（2）@readonly**

`readonly`装饰器使得属性或方法不可写。

```javascript
import { readonly } from 'core-decorators';

class Meal {
  @readonly
  entree = 'steak';
}

var dinner = new Meal();
dinner.entree = 'salmon';
// Cannot assign to read only property 'entree' of [object Object]
```

**（3）@override**

`override`装饰器检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错。

```javascript
import { override } from 'core-decorators';

class Parent {
  speak(first, second) {}
}

class Child extends Parent {
  @override
  speak() {}
  // SyntaxError: Child#speak() does not properly override Parent#speak(first, second)
}

// or

class Child extends Parent {
  @override
  speaks() {}
  // SyntaxError: No descriptor matching Child#speaks() was found on the prototype chain.
  //
  //   Did you mean "speak"?
}
```

**（4）@deprecate (别名@deprecated)**

`deprecate`或`deprecated`装饰器在控制台显示一条警告，表示该方法将废除。

```javascript
import { deprecate } from 'core-decorators';

class Person {
  @deprecate
  facepalm() {}

  @deprecate('We stopped facepalming')
  facepalmHard() {}

  @deprecate('We stopped facepalming', { url: 'http://knowyourmeme.com/memes/facepalm' })
  facepalmHarder() {}
}

let person = new Person();

person.facepalm();
// DEPRECATION Person#facepalm: This function will be removed in future versions.

person.facepalmHard();
// DEPRECATION Person#facepalmHard: We stopped facepalming

person.facepalmHarder();
// DEPRECATION Person#facepalmHarder: We stopped facepalming
//
//     See http://knowyourmeme.com/memes/facepalm for more details.
//
```

**（5）@suppressWarnings**

`suppressWarnings`装饰器抑制`deprecated`装饰器导致的`console.warn()`调用。但是，异步代码发出的调用除外。

```javascript
import { suppressWarnings } from 'core-decorators';

class Person {
  @deprecated
  facepalm() {}

  @suppressWarnings
  facepalmWithoutWarning() {
    this.facepalm();
  }
}

let person = new Person();

person.facepalmWithoutWarning();
// no warning is logged
```

## 使用装饰器实现自动发布事件

我们可以使用装饰器，使得对象的方法被调用时，自动发出一个事件。

```javascript
const postal = require("postal/lib/postal.lodash");

export default function publish(topic, channel) {
  const channelName = channel || '/';
  const msgChannel = postal.channel(channelName);
  msgChannel.subscribe(topic, v => {
    console.log('频道: ', channelName);
    console.log('事件: ', topic);
    console.log('数据: ', v);
  });

  return function(target, name, descriptor) {
    const fn = descriptor.value;

    descriptor.value = function() {
      let value = fn.apply(this, arguments);
      msgChannel.publish(topic, value);
    };
  };
}
```

上面代码定义了一个名为`publish`的装饰器，它通过改写`descriptor.value`，使得原方法被调用时，会自动发出一个事件。它使用的事件“发布/订阅”库是[Postal.js](https://github.com/postaljs/postal.js)。

它的用法如下。

```javascript
// index.js
import publish from './publish';

class FooComponent {
  @publish('foo.some.message', 'component')
  someMethod() {
    return { my: 'data' };
  }
  @publish('foo.some.other')
  anotherMethod() {
    // ...
  }
}

let foo = new FooComponent();

foo.someMethod();
foo.anotherMethod();
```

以后，只要调用`someMethod`或者`anotherMethod`，就会自动发出一个事件。

```bash
$ bash-node index.js
频道:  component
事件:  foo.some.message
数据:  { my: 'data' }

频道:  /
事件:  foo.some.other
数据:  undefined
```

## Mixin

在装饰器的基础上，可以实现`Mixin`模式。所谓`Mixin`模式，就是对象继承的一种替代方案，中文译为“混入”（mix in），意为在一个对象之中混入另外一个对象的方法。

请看下面的例子。

```javascript
const Foo = {
  foo() { console.log('foo') }
};

class MyClass {}

Object.assign(MyClass.prototype, Foo);

let obj = new MyClass();
obj.foo() // 'foo'
```

上面代码之中，对象`Foo`有一个`foo`方法，通过`Object.assign`方法，可以将`foo`方法“混入”`MyClass`类，导致`MyClass`的实例`obj`对象都具有`foo`方法。这就是“混入”模式的一个简单实现。

下面，我们部署一个通用脚本`mixins.js`，将 Mixin 写成一个装饰器。

```javascript
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}
```

然后，就可以使用上面这个装饰器，为类“混入”各种方法。

```javascript
import { mixins } from './mixins.js';

const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // "foo"
```

通过`mixins`这个装饰器，实现了在`MyClass`类上面“混入”`Foo`对象的`foo`方法。

不过，上面的方法会改写`MyClass`类的`prototype`对象，如果不喜欢这一点，也可以通过类的继承实现 Mixin。

```javascript
class MyClass extends MyBaseClass {
  /* ... */
}
```

上面代码中，`MyClass`继承了`MyBaseClass`。如果我们想在`MyClass`里面“混入”一个`foo`方法，一个办法是在`MyClass`和`MyBaseClass`之间插入一个混入类，这个类具有`foo`方法，并且继承了`MyBaseClass`的所有方法，然后`MyClass`再继承这个类。

```javascript
let MyMixin = (superclass) => class extends superclass {
  foo() {
    console.log('foo from MyMixin');
  }
};
```

上面代码中，`MyMixin`是一个混入类生成器，接受`superclass`作为参数，然后返回一个继承`superclass`的子类，该子类包含一个`foo`方法。

接着，目标类再去继承这个混入类，就达到了“混入”`foo`方法的目的。

```javascript
class MyClass extends MyMixin(MyBaseClass) {
  /* ... */
}

let c = new MyClass();
c.foo(); // "foo from MyMixin"
```

如果需要“混入”多个方法，就生成多个混入类。

```javascript
class MyClass extends Mixin1(Mixin2(MyBaseClass)) {
  /* ... */
}
```

这种写法的一个好处，是可以调用`super`，因此可以避免在“混入”过程中覆盖父类的同名方法。

```javascript
let Mixin1 = (superclass) => class extends superclass {
  foo() {
    console.log('foo from Mixin1');
    if (super.foo) super.foo();
  }
};

let Mixin2 = (superclass) => class extends superclass {
  foo() {
    console.log('foo from Mixin2');
    if (super.foo) super.foo();
  }
};

class S {
  foo() {
    console.log('foo from S');
  }
}

class C extends Mixin1(Mixin2(S)) {
  foo() {
    console.log('foo from C');
    super.foo();
  }
}
```

上面代码中，每一次`混入`发生时，都调用了父类的`super.foo`方法，导致父类的同名方法没有被覆盖，行为被保留了下来。

```javascript
new C().foo()
// foo from C
// foo from Mixin1
// foo from Mixin2
// foo from S
```

## Trait

Trait 也是一种装饰器，效果与 Mixin 类似，但是提供更多功能，比如防止同名方法的冲突、排除混入某些方法、为混入的方法起别名等等。

下面采用[traits-decorator](https://github.com/CocktailJS/traits-decorator)这个第三方模块作为例子。这个模块提供的`traits`装饰器，不仅可以接受对象，还可以接受 ES6 类作为参数。

```javascript
import { traits } from 'traits-decorator';

class TFoo {
  foo() { console.log('foo') }
}

const TBar = {
  bar() { console.log('bar') }
};

@traits(TFoo, TBar)
class MyClass { }

let obj = new MyClass();
obj.foo() // foo
obj.bar() // bar
```

上面代码中，通过`traits`装饰器，在`MyClass`类上面“混入”了`TFoo`类的`foo`方法和`TBar`对象的`bar`方法。

Trait 不允许“混入”同名方法。

```javascript
import { traits } from 'traits-decorator';

class TFoo {
  foo() { console.log('foo') }
}

const TBar = {
  bar() { console.log('bar') },
  foo() { console.log('foo') }
};

@traits(TFoo, TBar)
class MyClass { }
// 报错
// throw new Error('Method named: ' + methodName + ' is defined twice.');
//        ^
// Error: Method named: foo is defined twice.
```

上面代码中，`TFoo`和`TBar`都有`foo`方法，结果`traits`装饰器报错。

一种解决方法是排除`TBar`的`foo`方法。

```javascript
import { traits, excludes } from 'traits-decorator';

class TFoo {
  foo() { console.log('foo') }
}

const TBar = {
  bar() { console.log('bar') },
  foo() { console.log('foo') }
};

@traits(TFoo, TBar::excludes('foo'))
class MyClass { }

let obj = new MyClass();
obj.foo() // foo
obj.bar() // bar
```

上面代码使用绑定运算符（::）在`TBar`上排除`foo`方法，混入时就不会报错了。

另一种方法是为`TBar`的`foo`方法起一个别名。

```javascript
import { traits, alias } from 'traits-decorator';

class TFoo {
  foo() { console.log('foo') }
}

const TBar = {
  bar() { console.log('bar') },
  foo() { console.log('foo') }
};

@traits(TFoo, TBar::alias({foo: 'aliasFoo'}))
class MyClass { }

let obj = new MyClass();
obj.foo() // foo
obj.aliasFoo() // foo
obj.bar() // bar
```

上面代码为`TBar`的`foo`方法起了别名`aliasFoo`，于是`MyClass`也可以混入`TBar`的`foo`方法了。

`alias`和`excludes`方法，可以结合起来使用。

```javascript
@traits(TExample::excludes('foo','bar')::alias({baz:'exampleBaz'}))
class MyClass {}
```

上面代码排除了`TExample`的`foo`方法和`bar`方法，为`baz`方法起了别名`exampleBaz`。

`as`方法则为上面的代码提供了另一种写法。

```javascript
@traits(TExample::as({excludes:['foo', 'bar'], alias: {baz: 'exampleBaz'}}))
class MyClass {}
```

## 元数据

装饰器会对所装饰的对象添加一些元数据。

## 参考链接

- [Deep introduction to using and implementing TypeScript decorators](https://techsparx.com/nodejs/typescript/decorators/introduction.html), by David Herron
- [Deep introduction to property decorators in TypeScript](https://techsparx.com/nodejs/typescript/decorators/properties.html), by David Herron
- [Deep introduction to accessor decorators in TypeScript](https://techsparx.com/nodejs/typescript/decorators/accessors.html), by David Herron