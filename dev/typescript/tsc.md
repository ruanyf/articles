# tsc 命令和 TypeScript 配置

## module

`module`参数指定编译的输出格式。

```bash
$ tsc --module commonjs Test.ts
```

它可以接受以下值。

- commonjs：供 Node.js 使用
- amd：供 require.js 使用

## strictNullChecks

如果 strictNullChecks 设为 off，那些等于null或undefined的值仍然可以正常访问，并且null或undefined可以分配给任何类型的属性。推荐总是打开该设置。

如果 strictNullChecks on，如果值为null 或undefined 时，您需要在对该值使用方法或属性之前测试这些值。

```typescript
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

--noImplicitAny：当无法推断一个变量时发出一个错误（或者只能推断为一个隐式的 any 类型），你可以通过显式添加 :any 的类型注解，来让它成为一个 any 类型。

--strictPropertyInitialization 实例的属性都需要在构造函数里面初始化。

```typescript
// 报错
class BadGreeter {
  name: string;
}

// 正确
class GoodGreeter {
  name: string; 
  constructor() {
    this.name = "hello";
  }
}
```

如果确实打算在其他地方初始化，可以使用赋值断言运算符。

```typescript
class OKGreeter {
  name!: string;
}
```