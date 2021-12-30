# 函数的类型注释

函数的前部参数有可能为空，这时要注明有可能为`undefined`。

```typescript
function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}
```

上面示例中，参数`values`有可能为空，所以这里要用`if`判断检查一下，`values`是否有值。

