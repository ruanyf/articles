# Context的用法

`Context`是用于解决组件层层传递参数的问题。

```javascript
var Button = React.createClass({
  render: function() {
    return (
      <button style={{background: this.props.color}}>
        {this.props.children}
      </button>
    );
  }
});

var Message = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.text} <Button color={this.props.color}>Delete</Button>
      </div>
    );
  }
});

var MessageList = React.createClass({
  render: function() {
    var color = "purple";
    var children = this.props.messages.map(function(message) {
      return <Message text={message.text} color={color} />;
    });
    return <div>{children}</div>;
  }
});
```

上面的代码需要层层传递`color`参数，这很不方便。`context`属性可以解决这个问题。

首先，改写根组件。

```javascript
var MessageList = React.createClass({
  childContextTypes: {
    color: React.PropTypes.string
  },
  getChildContext: function() {
    return {color: "purple"};
  },
  render: function() {
    var children = this.props.messages.map(function(message) {
      return <Message text={message.text} />;
    });
    return <div>{children}</div>;
  }
});
```

上面代码中，根组件添加`childContextTypes`和`getChildContext`属性，React自动将`context`信息传向子树上的所有组件。

然后，子组件获取`context`属性。

```javascript
var Button = React.createClass({
  contextTypes: {
    color: React.PropTypes.string
  },
  render: function() {
    return (
      <button style={{background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
});
```

子组件通过定义`contextTypes`属性，可以获取`context`对象上的信息。如果`contextTypes`属性没有定义，那么`this.context`将是一个空对象。

如果组件内部定义了`contextTypes`方法，那么生命周期方法会接收到一个额外的参数`context`对象。

```javascript
void componentWillReceiveProps(
  object nextProps, object nextContext
)

boolean shouldComponentUpdate(
  object nextProps, object nextState, object nextContext
)

void componentWillUpdate(
  object nextProps, object nextState, object nextContext
)

void componentDidUpdate(
  object prevProps, object prevState, object prevContext
)
```

无状态的函数组件也能够引用`context`对象，如果`contextTypes`被定义成函数的一个属性。

```javascript
function Button(props, context) {
  return (
    <button style={{background: context.color}}>
      {props.children}
    </button>
  );
}
Button.contextTypes = {color: React.PropTypes.string};
```

只要`state`或`props`发生变化，`getChildContext`就会被调用。后代组件就会接收到一个新的`context`对象。

```javascript
var MediaQuery = React.createClass({
  getInitialState: function(){
    return {type:'desktop'};
  },
  childContextTypes: {
    type: React.PropTypes.string
  },
  getChildContext: function() {
    return {type: this.state.type};
  },
  componentDidMount: function(){
    var checkMediaQuery = function(){
      var type = window.matchMedia("(min-width: 1025px)").matches ? 'desktop' : 'mobile';
      if (type !== this.state.type){
        this.setState({type:type});
      }
    };

    window.addEventListener('resize', checkMediaQuery);
    checkMediaQuery();
  },
  render: function(){
    return this.props.children;
  }
});
```

`context`属性有点像全局变量，轻易不能使用，你应该宁可将参数一层层显式传给子组件。

最佳的使用场合是传递用户的语言选择、样式选择，否则这些值就要被当作全局变量传入组件。

不要使用`context`将你的Modal数据传给组件。显式传递更容易理解。使用`context`将造成组件的强耦合，代码难以复用。
