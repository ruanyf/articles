# 类型映射

TypeScript 可以将现有的类型转换为新的类型。具体的做法是遍历数据结构（即对象类型），逐一按照映射规则，将其转成另一个类型。

```typescript
type User = {
    name: string,
    age: number
}

type StringifyProp<T> = {
    [K in keyof T]: string
}

type UserWithStringProps = StringifyProp<User> // { name: string; age: string; }
```

还可以过滤掉某些属性。比如下面的例子是只保留值为字符串的属性。

```typescript
type User = {
    name: string,
    age: number
}

type FilterStringProp<T> = {
    [K in keyof T as T[K] extends string ? K : never]: string
}

type FilteredUser = FilterStringProp<User> // { name: string }
```