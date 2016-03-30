# 组件

## 概述

React通过“组件”（component），构成一个页面。

组件通常是下面的样子。

```javascript
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
  }
}
```

组件有以下属性。

- `this.props` 组件的参数
- `this.state` 组件的状态

### setState

组件的状态，通过`setState`方法改变。每当`state`发生变化，`render`方法就会自动调用，从而更新组件。

`setState`方法可以接受第二个参数，当状态改变成功后，立即调用。

```javascript
this.setState(
  {...},
  () => console.log('set state!')
)
```

### ref

`ref`属性可以指定一个回调函数，在组件加载到DOM之后调用。

```javascript
<input type="text"
      ref={
        (e) => e ? e.selectionStart = this.props.task.length : null
      }
      autoFocus={true}
      defaultValue={this.props.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />;
```

`ref`属性也可以设为一个字符串，比如`ref="input"`，然后通过`this.refs.input`引用。

## 子组件

父组件内部的组件，称为子组件。

```html
<Parent><Child /></Parent>
```

上面代码中，`Parent`是父组件，`Child`是子组件。

`Parent`可以通过`this.props.children`属性，读取子组件。

同级而且同类型的每个子组件，应该有一个`key`属性，用来区分。

```javascript
  render: function() {
    var results = this.props.results;
    return (
      <ol>
        {results.map(function(result) {
          return <li key={result.id}>{result.text}</li>;
        })}
      </ol>
    );
  }
```

上面代码中，子组件`li`的`key`用来区分每一个不同的子组件。
