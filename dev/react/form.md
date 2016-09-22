# 表单

下面的例子是如何获取输入框的值。

```javascript
var Message = React.createClass({
  getInitialState: function() {
    return { message: this.props.message };
  },

  _messageChange: function(e) {
    this.setState({ message: e.target.value });
  },

  render: function() {
    return (
      <div>
        <span>Message: {this.state.message}</span>
        <br />
        Message: <input type="text"
          value={this.state.message}
          onChange={this._messageChange} />
      </div>
    );
  },
});
```

上面代码中，输入框的内容一旦发生变化，就会调用`onChange`属性指定的监听函数，该函数的参数会得到事件对象。从事件对象`e.target.value`就可以得到输入框的值。
