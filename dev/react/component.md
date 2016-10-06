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

React原生提供的组件，都是HTML语言已经定义的标签，比如`<div>`、`<h1>`、`<p>`等等。这些组件的首字母必须小写。用户自定义的组件，首字母必须大写，比如`<MyTitle>`。

也可以采用命名空间的方式，引用组件。

```javascript
const App = () => (
  <MUI.RaisedButton label="Default" />
);
```

组件有以下属性。

- `this.props` 组件的参数
- `this.state` 组件的状态

`props`和`state`的主要区别是，`state`是组件私有的内部参数，不应暴露到外部。这就是为什么父组件或者外部使用者，不能操作子组件的state（即`setState`方法只能在当前组件内部使用）。

### setState

组件的状态，通过`setState`方法改变。每当`state`发生变化，`render`方法就会自动调用，从而更新组件。

它接受一个对象作为参数，这个对象会被合并进入`this.state`，然后重新渲染组件。

```javascript
this.setState({mykey: 'my new value'});
```

它也可以接受一个函数作为参数，该函数执行后返回的对象会合并进`this.state`。

```javascript
this.setState(function (previousState, currentProps) {
  return {myInteger: previousState.myInteger + 1};
});
```

从上面代码可以看到，回调函数的参数是更新的状态和当前的参数对象。

`this.setState`这个方法是异步的，即`this.state`的变化，要在该方法执行后一段时间才能看到。这一点需要特别引起注意。

```javascript
class Select extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {selection: 0};
  }

  render() {
    return (
      <ul>
        <li onClick={() => this.onSelect(1)}>1</li>
        <li onClick={() => this.onSelect(2)}>2</li>
        <li onClick={() => this.onSelect(3)}>3</li>
      </ul>
    )
  }

  onSelect(value) {
    this.setState({selection: value});
    console.log(this.state.selection);
  }
}
```

上面代码中，每次点击会触发`this.setState`方法，但是`this.state`并没有立即改变，返回的仍然是上一次的值。

所以，`setState`方法可以接受一个回调函数当作第二个参数，当状态改变成功、组件重新渲染后，立即调用。

```javascript
this.setState(
  {...},
  () => console.log('set state!')
)
```

`this.setState`总是会引起组件的重新渲染，除非`shouldComponentUpdate()`方法返回`false`。有时`this.setState`设置的状态在`render`方法中并没有用到，即不改变 UI 的呈现，但是这时也会引起组件的重新渲染。

### defaultProps

`defaultProps`用来指定`props`的默认值。

```javascript
class Account extends Component {
  static defaultProps = {
    email: '',
    gender: '',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { name, email, gender } = this.props;
    return (
      <div className="mod-account">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Gender: {gender}</p>
      </div>
    )
  }
}
```

注意，这时`constructor`方法里面，不能再对设置了默认值的属性赋值，否则会报错。

### ref

`ref`属性可以指定一个回调函数，在组件加载到DOM之后调用。

```javascript
  render: function() {
    return <TextInput ref={(c) => this._input = c} />;
  },
  componentDidMount: function() {
    this._input.focus();
  },
```

`ref`作为一个函数，它的参数就是组件加载后生成的 DOM 节点。

下面是另外一个例子。

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
