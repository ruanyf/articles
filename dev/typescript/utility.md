# 工具类型

TypeScript 提供了一些全局的工具类型。

## Partial

`Partial`是一个泛型，表示当前类型是类型变量的一个子集。

```typescript
interface Todo {
  title: string;
  description: string;
}
 
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

## Required

Required 是一个泛型，表示当前类型包含类型变量的所有属性，主要针对可选属性的情况。

```typescript
interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 };
const obj2: Required<Props> = { a: 5 }; // 报错
```

## Readonly

`Readonly<Type>`是一个泛型，表示类型变量的所有属性都是只读。

```typescript
interface Todo {
  title: string;
}
 
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};

todo.title = "Hello"; // 报错
```


## Record

`Record<Keys, Type>`表示一个对象类型，该对象的键名来自类型变量`keys`，键值来自类型变量`Type`。

```typescript
interface CatInfo {
  age: number;
  breed: string;
}
 
type CatName = "miffy" | "boris" | "mordred";
 
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
```

## Pick

`Pick<Type, Keys>`表示类型是从对象`Type`里面，挑选`Keys`指定的键名。

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```
