# infer

`type`定义的类型默认具有全局范围。要创建局部类型，可以使用`infer`关键字。

```typescript
type A = 'foo'; // global scope
type B = A extends infer C ? (
    C extends 'foo' ? true : false// *only* inside this expression, C represents A
) : never
```

下面的例子判断某种类型是否为函数，如果是的就使用`infer`获取函数的参数和返回值。

```typescript
type ReturnPromise<T> =
  T extends (...args: infer A) => infer R 
  ? (...args: A) => Promise<R> 
  : T;
```

上面示例中，判断`T`是否为函数，如果是的，返回这个函数的 Promise 版本，否则原样返回。`infer A`表示函数的参数，`infer R`表示函数的返回值，然后在表达式的后半部分就可以使用`A`和`R`这两个类型变量。

如果不使用`infer`，就不得不把`ReturnPromise<T>`写成`ReturnPromise<T, A, R>`，这样就很麻烦。

我们可以把`ReturnPromise<T>`这个工具类用在将一个对象的方法转为异步方法。

```typescript
type Promisify<T> = {
[P in keyof T]: ReturnPromise<T[P]>;
};

interface SyncService {
  baseUrl: string;
  getA(): string;
}

class AsyncService implements Promisify<SyncService> {
  baseUrl: string; 

  getA(): Promise<string> {
    return Promise.resolve('');
  }
}
```

上面示例中，`SyncService`是一个同步接口，`Promisify<SyncService>`是它的异步版，每个同步方法都转成异步方法，但是该方法的参数和返回值不变。类`AsyncService`就部署了这个异步版接口。

`infer`还可以起到正则匹配的作用。

```typescript
type Str = 'foo-bar'
type Bar = Str extends `foo-${infer rest}` ? rest : never // 'bar'
```

infer 表示让 TypeScript 推断这个类型参数。

```typescript
T extends infer U ? U : Y;
```

上例中，使用infer声明定义了可推断的类型变量U。当编译器解析该条件类型时，会根据T的实际类型来推断类型变量U的实际类型。

```typescript
type CT<T> = T extends Array<infer U> ? U : never;

type T = CT<Array<number>>;    // number
```

上例中，条件类型“CT<T>”定义了一个可推断的类型变量U，它表示数组元素的类型。第3行，当使用数组类型“Array<number>”实例化“CT<T>”条件类型时，编译器将根据“Array<number>”类型来推断“Array<infer U>”类型中类型变量U的实际类型，推断出来的类型变量U的实际类型为number类型。

我们可以使用条件类型和`infer`类型变量来获取某个函数的返回值类型。

```typescript
type ReturnType<
   T extends (...args: any) => any
> = T extends (...args: any) => infer R ? R : any;
```

下面是例子。

```typescript
type F = (x: number) => string;
 
type T = ReturnType<F>;    // string
```

在条件类型中，允许定义多个infer声明。例如，下例中存在两个infer声明，它们定义了同一个推断类型变量U：

```typescript
type CT<T> =
   T extends { a: infer U; b: infer U } ? U : never;

type T = CT<{ a: string; b: number }>; // string | number
```

同时，在多个infer声明中也可以定义不同的推断类型变量。例如，下例中的两个infer声明分别定义了两个推断类型变量M和N：

```typescript
type CT<T> =
  T extends { a: infer M; b: infer N } ? [M, N] : never;

type T = CT<{ a: string; b: number }>; // [string, number]
```