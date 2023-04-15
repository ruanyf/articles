# React 应用的架构

## 简单应用

简单的React应用，可以不使用任何架构，直接从`state`生成`view`。

```javascript
let state = initial
render(view(state), element)
```

`state`的变化，由`setState`方法或生命周期方法决定。

这种方法的缺点，主要是`state`的变化之间没有联系，难以追踪。

## Redux架构

`Redux`架构由`action`来触发`state`变化，新的`state`必须在当前`state`的基础上生成。

```javascript
let state = initial
let reduce = (state, action) => {}

function step(action){
  // possible side effects //
  state = reduce(state, action)
  render(view(state), element)
}

// then call `step` on every `action`
```

只要给定当前`state`和`action`，就能得到下一步的`state`，因此`state`的变化完全是有序可控的。

但是，Redux架构没对如何从数据源读写`state`做规定。

## Relay 架构

Relay架构的核心思想是，`state`必须从数据源读取，即`render(view(model.read(query)), element)`。

```bash
let read = (state, query, params) => {}
let mutate = (state, action) => {}

let model = { read, mutate }

// initial read/render
let state = model.read(view.query)
render(view(state), element)

function step(action){
  if(action.type === 'setQuery'){
    query = action.payload
    step({ type: 'read' })
  }
  else if(action.type === 'read'){
    state = merge(state, model.read(action.query || view.query))
  }
  else if(action.type === 'mutate') {
    model.mutate(action)
    if(action.query){
      step({ type: 'read', query: action.query})
    }
  }
  render(view(state), element)
}
```

上面代码中，`model.read`是远程读取，`model.mutate`是远程写入。`query`是GraphQL格式的查询语句，当前`state`实际上是写在`query`里面的。

来源：https://gist.github.com/threepointone/964ce9780a168a10e1bb

（完）

