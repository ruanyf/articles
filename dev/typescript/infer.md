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