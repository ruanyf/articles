# 生命周期方法

## 执行顺序

首次挂载组件时，按如下顺序执行。

- getDefaultProps
- getInitialState
- componentWillMount
- render
- componentDidMount

卸载组件时，按如下顺序执行。

- componentWillUnmount

重新挂载组件时，按如下顺序执行。
- getInitialState
- componentWillMount
- render
- componentDidMount

再次渲染组件时，组件接受到父组件传来的新参数，按如下顺序执行。

- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

如果组件自身的 state 更新了，按如下顺序执行。

1. shouldComponentUpdate
1. componentWillUpdate
1. render
1. componentDidUpdate

## shouldComponentUpdate

`shouldComponentUpdate`方法会在每次重新渲染之前，自动调用。它返回一个布尔值，决定是否应该进行此次渲染。默认为`true`，表示进行渲染，如果为`false`，就表示中止渲染。

下面是父元素组件`Color`的代码。

```javascript
getInitialState: function () {
  return {
    colors: new Immutable.List(this.props.colors)
  };
},

_addColor: function (newColor) {
  this.setState({
    colors = this.state.colors.push(newColor)
  });
},

render: function () {
  return (
    <div>
      <ColorList colors={this.state.colors} />
      <ColorForm addColor={this._addColor} />
    </div>
  );
}
```

上面代码中，父组件`Color`向子组件`ColorList`传入参数`this.state.colors`。每当父组件的`this.state.colors`变动时，子组件就会重新渲染，这时子组件的`shouldComponentUpdate`就会自动调用。

```javascript
shouldComponentUpdate: function (nextProps, nextState) {
  return nextProps.colors !== this.props.colors;
}
```

上面是子组件的`shouldComponentUpdate`方法，它接受两个参数，第一个是本次传入的新参数对象`nextProps`，第二个是新的状态对象`nextState`。在方法内部，`this.props`和`this.state`表示当前（没有重新渲染之前）的参数对象和状态对象。

## componentWillReceiveProps

`componentWillReceiveProps`方法在父组件每次要求当前组件重新渲染时调用，它在当前组件的`render()`之前调用。它只在父组件更新 `props`时执行，当前组件本身调用`setState`而引发重新渲染，是不会执行这个方法的。在此方法中调用 setState 是不会二次渲染的。

`componentWillReceiveProps`在`shouldComponentUpdate`和`componentWillUpdate`之前调用。

在`componentWillReceiveProps`之中，可以调用`setState`方法。而`componentWillUpdate`是一个方法，用来回应state的变化。

这个方法可以用来在`render()`调用之前，对props进行调整，然后通过`this.setState()`设置state。老的props可以用`this.props`拿到。

```javascript
componentWillReceiveProps: function(nextProps) {
  this.setState({
    likesIncreasing: nextProps.likeCount > this.props.likeCount
  });
}
```

父组件操作子组件的基本流程如下。

- 父组件向子组件传入一个新参数
- 子组件在`componentWillReceiveProps`方法里面处理新的参数，必要时调用`setState`方法
- 子组件在`componentWillUpdate`方法里面处理新的state，但是一般来说，只使用`componentWillReceiveProps`方法就足够了

下面是一个父组件。

```javascript
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

var ADayInTheLife = React.createClass({
  getInitialState: function () {
    return {
      doing: "isCoding"
    };
  },

  handleButtonClick: function () {
    var activities = ["isCoding", "isEating", "isSleeping"];
    var randAct = rand(activities);
    this.setState({
      doing: randAct
    });
  },

  render: function () {
    return (
      <div>
        <button onClick={this.handleButtonClick}>Next Activity</button>
        <Jake activity={this.state.doing} />
      </div>
    );
  }

});

React.render(<ADayInTheLife />, document.body);
```

上面代码中，父组件`ADayInTheLife`会更新子组件`Jake`。

下面是子组件`Jake`的代码。

```javascript
var Jake = React.createClass({

  getDefaultProps: function () {
    return {
      activity: "nothingYet"
    };
  },

  getInitialState: function () {
    return {
      thinking: "nothing yet"
    };
  },

  calcThinking: function (activity) {
    var thoughts = {
      isCoding: "yay, code",
      isEating: "yum, code",
      isSleeping: "where's the code?"
    };

    this.setState({
      thinking: thoughts[activity]
    })
  },

  componentWillReceiveProps: function (nextProps) {
    this.calcThinking(nextProps.activity);
  },

  render: function () {
    return <div>Jake: <b>{this.props.activity}</b> and thinking "{this.state.thinking}".</div>;
  }
});
```

上面代码中，每次父组件要求`Jake`重新渲染，`componentWillReceiveProps`方法就会被调用。它执行`calcThinking`方法，再执行`setState`方法，使得`Jake`根据新的state完成渲染。

## componentWillMount

`componentWillMount`方法在第一次渲染之前调用。它只会执行一次，在浏览器和服务器都会执行。一般用来对`props`和`state`进行初始化处理。

```javascript
  getInitialState: function() {
    return {
      items: this.props.initialItems || [],
      sort: this.props.config.sort || { column: "", order: "" },
      columns: this.props.config.columns
    };
  },
  componentWillMount: function() {
    this.loadData(this.props.dataSource);
  },
  loadData: function(dataSource) {
    if (!dataSource) return;

    $.get(dataSource).done(function(data) {
      console.log("Received data");
     this.setState({items: data});
     }.bind(this)).fail(function(error, a, b) {
      console.log("Error loading JSON");
     });
  },
```

上面代码中，`getInitialState`为首次渲染设置默认参数。在首次渲染之前，会执行`componentWillMount`方法。该方法内部调用`loadData`方法，发出AJAX请求。这个请求有可能成功，也有可能不成功，而且不知道需要多久才能完成。在AJAX请求返回结果，执行`setState`方法设置新的state之前，该组件将以默认值渲染。所以，使用`getInitialState`方法设置默认参数的意义就在这里。

注意，该方法之中不能调用`setState`。
