# Redux的用法

## 基本原则

所有状态存放在一个地方。

## Reducer

Reducer描述状态如何变化。它不改变原来的状态，每次都生成一个新的状态。

```javascript
function exampleReducer(state, action) {
  return state.changedBasedOn(action)
}
```
