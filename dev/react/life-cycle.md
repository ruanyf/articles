# 生命周期方法

## componentWillReceiveProps

`componentWillReceiveProps`方法在父组件每次要求当前组件重新渲染时调用，它在当前组件的`render()`之前调用。

`componentWillReceiveProps`在`componentWillUpdate`之前调用。

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

`componentWillMount`方法在第一次渲染之前调用。它只会执行一次，在浏览器和服务器都会执行。

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
