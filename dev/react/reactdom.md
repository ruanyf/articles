# ReactDOM

`ReactDOM`只有三个方法。

- findDOMNode
- unmountComponentAtNode
- render

## findDOMNode()

`findDOMNode`方法用于获取真实的DOM元素。

```javascript
componentDidMount() {
  // this 为当前组件的实例
  const dom = ReactDOM.findDOMNode(this);
}
```

该方法只对已经挂载的组件有效，因此一般只在`componentDidMount`和`componentDidUpdate`方法中使用。

## render()

`render`方法用于将组件挂载到真实DOM之中。

```javascript
ReactComponent render(
  ReactElement element,
  DOMElement container,
  [function callback]
)
```

该方法把元素挂载到指定的DOM节点，并且返回该组件的实例。如果是无状态组件，`render`会返回`null`。当组件挂载完毕，会执行回调函数。



