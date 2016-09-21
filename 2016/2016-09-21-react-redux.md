# React-Redux 教程

前两篇教程介绍了 Reduc 的[基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)和[异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)，今天是最后一部分，介绍如何在 React 项目中使用 Redux。

首先声明， 不看这篇教程，你也完全可以在 React 里面使用 Redux。前面介绍的 API 已经够用了，只是不怎么方便。为了方便使用，Redux 的作者封装了一个库 [React-Redux](https://github.com/reactjs/react-redux)，本文主要介绍这个库的用法。

所以，实际项目中，你要权衡一下，到底是直接使用 Redux，还是使用 React-Redux。后者虽然提供了一点便利，但是需要学习额外的 API，并且要遵守它的组件拆分规范。

## 一、UI 组件和容器组件

React-Redux 将所有组件分成两大类：UI 组件（presentational component）和容器组件（container component）。

所谓 UI 组件，有以下几个特征。

> - 只负责 UI 的呈现
- 没有状态（即不使用`this.state`这个变量）
- 所有数据都由参数（`this.props`）提供
- 不使用任何 Redux 的 API

下面是一个 UI 组件的例子。

```javascript
const Title =
  value => <h1>{value}</h1>;
```

UI 组件又称为“纯组件”，即不含任何状态，像纯函数一样，纯粹由参数决定它的值。容器组件则恰恰相反，是一个有状态的组件。

这样区分的目的，是为了将组件按照功能分类：UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。你也许会问，如果一个组件既有 UI 又有业务逻辑，那怎么办？

回答是，所有组件都可以写成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，然后将数据传给后者，由后者渲染出视图。

React-Redux 规定，所有的 UI 组件都由用户提供，它负责自动生成容器组件。也就是说，用户决定视觉层，状态管理则是全部交给 Redux。

## 二、conect()

React-Redux 提供`connect`方法，用于从 UI 组件生成容器组件。`connect`的意思，就是将这两种组件连起来。

```javascript
import { connect } from 'react-redux'
const VisibleTodoList = connect()(TodoList);
```

上面代码中，`TodoList`是 UI 组件，`VisibleTodoList`就是由 React-Redux 自动生成的容器组件。

但是，这个容器组件无法使用，因为没有定义业务逻辑，只是 UI 组件的一个单纯的包装层。

仔细分析一下，所谓业务逻辑，无非就是定义两方面的内容。

> （1）输入：外部的数据（又称状态）如何转换为 UI 组件的参数
> 
> （2）输出：用户发出的动作（Action）如何从 UI 组件传出去。

因此，`connect`方法的完整 API 如下。

```javascript
import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
```

上面代码中，`connect`方法接受两个参数：`mapStateToProps`和`mapDispatchToProps`。它们定义了 UI 组件的业务逻辑。前者负责将外部的数据映射到 UI 组件的参数，后者负责将 UI 组件与用户的互动映射成 Action。

### 三、mapStateToProps

`mapStateToProps`是一个函数。它的作用就是像它的名字那样，建立一个从（外部的） State 到（UI 组件的）Props 的映射关系。

它应该返回一个对象，里面的每一个键值对就是一个映射。请看下面的例子。

```javascript
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
```

上面代码中，`mapStateToProps`是一个函数，它接受 State 作为参数，返回一个对象。这个对象有一个`todos`属性，它同时也是 UI 组件的参数，后面的`getVisibleTodos`是一个函数，可以从 State 算出 `todos` 参数的值。

下面就是`getVisibleTodos`的代码，就是定义运算逻辑，如何从 Redux 的 Store 算出 UI 组件的`todos`参数。

```javascript
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}
```

`mapStateToProps`会订阅 Store，每当 State 更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。

`mapStateToProps`的第一个参数总是`state`对象，还可以使用第二个参数，代表容器组件的`props`对象。

```javascript
// 容器组件的代码
//    <FilterLink filter="SHOW_ALL">
//      All
//    </FilterLink>

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
```

这种情况下，如果容器组件得到了新的参数，也会引发 UI 组件重新渲染。

如果`connect`方法省略了`mapStateToProps`参数，那么子组件就不会订阅Store，就是说 Store 的更新不会引起子组件的更新。

## 四、mapDispatchToProps

`mapDispatchToProps`是`connect`函数的第二个参数，用来建立 UI 组件的参数到`store.dispatch`方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。

如果`mapDispatchToProps`是一个函数，会得到`dispatch`和`ownProps`（容器组件的`props`对象）两个参数。

```javascript
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  };
}
```

从上面代码可以看到，`mapDispatchToProps`作为函数，应该返回一个对象，它的每个属性都对应 UI 组件的参数需要发出怎样的 Action。

如果`mapDispatchToProps`是一个对象，它的每个属性的键名也是对应 UI 组件的参数，键值应该是一个函数，会被当作 Action creator ，生成 Action 以后由 Redux 自动发出。举例来说，上面的`mapDispatchToProps`写成对象就是下面这样。

```javascript
const mapDispatchToProps = {
  onClick: (filter) => {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
}
```

## 五、Provider

`connect`方法生成容器组件以后，需要让它拿到`state`对象，才能生成 UI 组件的参数。

一种解决方法是将`state`对象作为参数，传入容器组件。但是，这样做比较麻烦，尤其是容器组件可能在较深的层级，一级级将`state`传下去就很麻烦。

React-Redux 提供一个`Provider`组件，可以让容器组件拿到`state`。

```javascript
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

上面代码中，使用`Provider`在跟组件外面包了一层以后，里面的每个容器组件默认都可以拿到`state`。

`Provider`的原理是利用了`React`组件的`context`属性，请看它的源码。

```javascript
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}
```

上面代码中，`store`作为所有子组件的上下文对象，传了下去。然后，容器组件从`context`拿到`store`。

```javascript
class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    // ...
  }
}

VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
}
```

`React-Redux`自动生成的容器组件，就类似上面这样，可以自动拿到`store`。

## 六、实例：计数器

下面是一个计数器组件，注意它是一个纯的 UI 组件。

```javascript
class Counter extends Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}
```

上面代码中，这个组件有两个参数：`value`和`onIncreaseClick`。前者需要从`state`计算得到，后者是向外发出 Action。
 
下面，我们定义它们对`state`的映射。

```javascript
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Action Creator
const increaseAction = { type: 'increase' }
```

然后，生成容器组件。

```javascript
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
```

接着，定义这个组件的 Reducer。

```javascript
// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}
```

最后，生成`store`对象，并使用`Provider`在根组件外面包一层。

```javascript
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(
  todoApp,
  persistedState
);

store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos,
  })
}, 1000))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

 完整的代码看[这里](https://github.com/jackielii/simplest-redux-example/blob/master/index.js)。

## 七、React-Router

使用`React-Router`的项目，与其他项目没有不同之处，也是使用`Provider`在`Router`外面包一层，毕竟`Provider`的唯一功能就是传入`store`对象。

```javascript
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);
```

（完）