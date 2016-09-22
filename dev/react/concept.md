# 基本概念

## 组件

UI使用数据结构表示。UI的变化，就是一种数据结构，变成另一种数据结构。

同样的数据结构，就得到同样的UI。这就是说，UI是一个纯函数。

```javascript
function NameBox(name) {
  return { fontWeight: 'bold', labelContent: name };
}
```

一个大的UI组件可以包含小的组件。

```javascript
function FancyUserBox(user) {
  return {
    borderStyle: '1px solid blue',
    childContent: [
      'Name: ',
      NameBox(user.firstName + ' ' + user.lastName)
    ]
  };
}
```

各种小组件可以组合成一个大组件（composition）。

同一个组件可以有内部状态，即有多种数据结构表示。

## 元素

在React中，类就是组件（component），`element`是描述组件实例的对象。

`element`并不是真的实例。Element上面不能调用任何方法。它只是实例的一个不可变（immutable）描述，带有两个属性：`type`和`props`。

如果`type`属性是一个字符串，`element`就代表一个DOM节点，`type`就是它的标签名，`props`是它的属性。

```javascript
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
}
```

上面代码对应下面的HTML代码结构。

```html
<button class='button button-blue'>
  <b>
    OK!
  </b>
</button>
```

`children`属性就是它的子元素。

如果`type`属性是函数或对应React组件的类。

```javascript
{
  type: Button,
  props: {
    color: 'blue',
    children: 'OK!'
  }
}
```

多个子组件可以组合放入`children`属性。

```javascript
const DeleteAccount = () => ({
  type: 'div',
  props: {
    children: [{
      type: 'p',
      props: {
        children: 'Are you sure?'
      }
    }, {
      type: DangerButton,
      props: {
        children: 'Yep'
      }
    }, {
      type: Button,
      props: {
        color: 'blue',
        children: 'Cancel'
      }
   }]
});
```

对应的JSX代码如下。

```javascript
const DeleteAccount = () => (
  <div>
    <p>Are you sure?</p>
    <DangerButton>Yep</DangerButton>
    <Button color='blue'>Cancel</Button>
  </div>
);
```

组件可以是一个类，也可以是返回一个类的函数。

```javascritpt
const Button = ({ children, color }) => ({
  type: 'button',
  props: {
    className: 'button button-' + color,
    children: {
      type: 'b',
      props: {
        children: children
      }
    }
  }
});
```

## element

`element`是一个描述组件如何显示在屏幕上的对象。`element`可以在`props`里面包含其他`element`。一旦创建，就不再发生变化。

`component`可以是一个带有`render`方法的类，也可以定义为一个函数。它总是接受`props`作为输入，在输出之中返回一个`element`树。

## 参考链接

- [React - Basic Theoretical Concepts](https://github.com/reactjs/react-basic), by sebmarkbage
