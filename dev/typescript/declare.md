# declare 命令

declare 命令用来表示，某个变量的类型声明由其他文件给出，不在当前文件声明，相当于放置了一个占位符。

举例来说，浏览器脚本会使用`document`对象，该对象是浏览器内置的，不是脚本定义的。所以，可以使用`declare`命令，表示`document`对象由外部定义。TypeScript 默认提供的定义文件`lib.d.ts`，给出了`document`的类型声明。

```typescript
declare var document;  
document.title = "Hello"; 
```

如果 TypeScript 如果找到`document`的外部定义，就会假定它的类型是`any`。