# infer 关键字

`infer`关键字用来定义泛型里面推断出来的类型参数，而不是外部传入的类型参数。

它通常跟条件运算符一起使用，用在`extends`关键字后面的父类型之中。

```typescript
type Flatten<Type> =
  Type extends Array<infer Item> ? Item : Type;
```

上面示例中，`Type`是外部传入的类型参数，如果传入的是一个数组（`Array`），那么可以从该数组推断出它的成员类型，写成`infer Item`，表示`Item`这个类型参数是从当前信息中推断出来的。

一旦定义了`Item`，后面的代码就可以使用这个类型参数了。

下面是这个泛型`Flatten<Type>`的用法。

```typescript
// string
type Str = Flatten<string[]>;

// number
type Num = Flatten<number>;
```

上面示例中，第一个例子`Flatten<string[]>`传入的类型参数是`string[]`，可以推断出`Item`的类型是`string`，所以返回的是`string`。第二个例子`Flatten<number>`传入的类型参数是`number`，它不是数组，所以直接返回本身。

如果不用`infer`定义类型参数，那么就要传入两个类型参数。

```typescript
type Flatten<Type, Item> =
  Type extends Array<Item> ? Item : Type;
```

上面是不用`infer`的写法，每次使用`Fleatten`的时候，都要传入两个参数，就非常麻烦。

下面的例子使用`infer`，推断函数的参数类型和返回值类型。

```typescript
type ReturnPromise<T> =
  T extends (...args: infer A) => infer R 
  ? (...args: A) => Promise<R> 
  : T;
```

上面示例中，如果`T`是函数，就返回这个函数的 Promise 版本，否则原样返回。`infer A`表示该函数的参数类型为`A`，`infer R`表示该函数的返回值类型为`R`。

如果不使用`infer`，就不得不把`ReturnPromise<T>`写成`ReturnPromise<T, A, R>`，这样就很麻烦。

下面是`infer`提取对象指定属性的例子。

```typescript
type MyType<T> =
  T extends { 
    a: infer M,
    b: infer N 
  } ? [M, N] : never;

// [string, number]
type T = MyType<{ a: string; b: number }>; 
```

上面示例中，`infer`可以提取参数对象的属性`a`和属性`b`的值。

下面是`infer`通过正则匹配提取类型参数的例子。

```typescript
type Str = 'foo-bar';

type Bar = Str extends `foo-${infer rest}` ? rest : never // 'bar'
```

上面示例中，`rest`是从模板字符串提取的类型参数。
