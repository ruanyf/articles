# Symbol

Symbol 是一种原始类型的值，类似于字符串，通过`Symbol()`函数生成，得到的每个值都是独一无二的。在 TypeScript 里面，Symbol 的类型使用`symbol`表示。

```typescript
let x:symbol = Symbol();
let y:symbol = Symbol();

x === y // false
```

上面示例中，变量`x`和`y`的类型就是`symbol`，它们是不相等的。

`symbol`类型包含所有 Symbol 值，如果要写出一个类型，表示某一个具体的 Symbol 值就很困难，因为 Symbol 值不存在字面量，必须通过变量来引用。比如，类型`5`只包含单个数值`5`，但是写不出这种只包含单个 Symbol 值的类型。

为了解决这个问题，TypeScript 设计了`symbol`的一个子类型`unique symbol`，表示单个的、指定的 Symbol 值。

```typescript
const x:unique symbol = Symbol(); // 正确
let y:unique symbol = Symbol(); // 报错
```

上面示例中，`unique symbol`类型表示某个特定的 Symbol 值，只能使用`const`命令赋值，如果使用`let`命令赋值，就会报错。

unique symbol 是一个值，如果想获取它代表的类型。若想要获取特定的“unique symbol”值的类型，则需要使用typeof类型查询，否则将无法引用其类型。

```typescript
const a: unique symbol = Symbol();

const b: typeof a = a;
```

`const`命令赋值时，变量类型默认就是`unique symbol`，所以类型可以省略不写。

```typescript
const x:unique symbol = Symbol(); 
// 等同于
const x = Symbol();
```

注意，两个`unique symbol`的值属于不同类型，不能互相比较。

```typescript
const x:unique symbol = Symbol();
const y:unique symbol = Symbol();

x === y // 报错
```

上面示例中，变量`x`和`y`虽然类型都写成`unique symbol`，但是其实属于不一样的类型。类型不同，就不能互相比较，所以就报错了。可以参考下面的例子来理解。

```typescript
const x:'hello' = 'hello';
const y:'world' = 'world';

x === y // 报错
```

上面示例中，变量`x`和`y`都是字符串，但是类型都是单个值，所以它们的类型不同，不能互相比较。这跟`unique symbol`类型不能互相比较，是一个原因。

`unique symbol`类型除了用在`const`变量的赋值，还可以用在类的`readonly static`属性。

```typescript
class C {
  static readonly foo:unique symbol = Symbol();
}
```

上面示例中，静态只读属性`foo`的类型就是`unique symbol`。注意，这时`static`和`readonly`两个限定符缺一不可。

## symbol 类型

symbol类型使用symbol关键字来表示。

```typescript
const s0: symbol = Symbol();
const s1: symbol = Symbol.for('foo');
const s2: symbol = Symbol.hasInstance;
```

symbol类型不同于其他原始类型，它不存在字面量形式。为了能够将一个Symbol值视作表示固定值的字面量，TypeScript引入了“unique symbol”类型。“unique symbol”类型使用“unique symbol”关键字来表示。

```typescript
const s0: unique symbol = Symbol();
const s1: unique symbol = Symbol.for('s1');
```

“unique symbol”类型的主要用途是用作接口、类等类型中的可计算属性名。因为如果使用可计算属性名在接口中添加了一个类型成员，那么必须保证该类型成员的名字是固定的，否则接口定义将失去意义。

下例中，允许将“unique symbol”类型的常量x作为接口的类型成员，而symbol类型的常量y不能作为接口的类型成员，因为symbol类型不止包含一个可能值：

```typescript
const x: unique symbol = Symbol();
const y: symbol = Symbol();

interface Foo {
    [x]: string; // 正确

    [y]: string;
//  ~~~
//  错误：接口中的计算属性名称必须引用类型为字面量类型
//  或'unique symbol'的表达式
}
```

TypeScript选择将一个Symbol值与声明它的标识符绑定在一起，并通过绑定了该Symbol值的标识符来表示“Symbol字面量”。这种设计的前提是要确保Symbol值与标识符之间的绑定关系是不可变的。因此，TypeScript中只允许使用const声明或readonly属性声明来定义“unique symbol”类型的值。

```typescript
// 必须使用const声明
const a: unique symbol = Symbol();

interface WithUniqueSymbol {
    // 必须使用readonly修饰符
    readonly b: unique symbol;
}

class C {
    // 必须使用static和readonly修饰符
    static readonly c: unique symbol = Symbol();
}
```

此例第1行，常量a的初始值为Symbol值，其类型为“unique symbol”类型。在标识符a与其初始值Symbol值之间形成了绑定关系，并且该关系是不可变的。这是因为常量的值是固定的，不允许再被赋予其他值。标识符a能够固定表示该Symbol值，标识符a的角色相当于该Symbol值的字面量形式。

如果使用let或var声明定义“unique symbol”类型的变量，那么将产生错误，因为标识符与Symbol值之间的绑定是可变的。

如果同一个 unique symbol 值赋给多个变量，就会报错。

```typescript
const a: unique symbol = Symbol();
const b: unique symbol = Symbol('desc');

const c: unique symbol = a;
//    ~
//    错误：a的类型与c的类型不兼容

const d: unique symbol = b;
//    ~
//    错误：b的类型与d的类型不兼容
```

但是，我们知道使用相同的参数调用“Symbol.for()”方法实际上返回的是相同的Symbol值。因此，可能出现多个“unique symbol”类型的值实际上是同一个Symbol值的情况。由于设计上的局限性，TypeScript目前无法识别出这种情况，因此不会产生编译错误，开发者必须要留意这种特殊情况。

```typescript
const a: unique symbol = Symbol.for('same');
const b: unique symbol = Symbol.for('same'); 
```

此例中，编译器会认为a和b是两个不同的Symbol值，而实际上两者是相同的。

在设计上，每一个“unique symbol”类型都是一种独立的类型。在不同的“unique symbol”类型之间不允许相互赋值；在比较两个“unique symbol”类型的值时，也将永远返回false。

```typescript
const a: unique symbol = Symbol();
const b: unique symbol = Symbol();

if (a === b) {
//  ~~~~~~~
//  该条件永远为false

    console.log('unreachable code');
}
```

由于“unique symbol”类型是 symbol类型的子类型，因此可以将“unique symbol”类型的值赋值给symbol类型。

```typescript
const a: unique symbol = Symbol();
const b: symbol = a;
```

如果程序中未使用类型注解来明确定义是symbol类型还是“unique symbol”类型，那么TypeScript会自动地推断类型。

```typescript
// a和b均为'symbol'类型，因为没有使用const声明
let a = Symbol();
let b = Symbol.for('');

// c和d均为'unique symbol'类型
const c = Symbol();
const d = Symbol.for('');

// e和f均为'symbol'类型，没有使用Symbol()或Symbol.for()初始化
const e = a;
const f = a;
```