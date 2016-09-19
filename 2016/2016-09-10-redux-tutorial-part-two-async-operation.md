
#Redux 入门教程（二）：中间件与异步操作

上一篇文章，我介绍了 Redux 的[基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)。

基本想法很简单，只有三步：用户发出 Action，触发 Reducer 函数算出新的 State，导致 View 重新渲染。但是，一个关键问题没有解决：异步操作怎么办？

Action 发出以后，Reducer 立即执行算出 State，这叫做同步；Action 发出以后，过一段时间再执行 Reducer，这就是异步。Redux 架构之中，怎么才能让异步操作结束后，Reducer 自动执行呢？

Redux 的基本架构不足以解决这个问题，必须引入新的工具：中间件（middleware）。

## 一、中间件的概念

为了理解中间件，让我们站在框架设计者的角度思考问题：如果要添加功能，你会在哪个步骤添加？

（1）Reducer 是一个纯函数，只承担计算 State 的功能，不合适承担其他功能，也承担不了，因为理论上，纯函数不能进行读写操作。

（2）View 与 State 是一一对应的，可以看作是 State 的视觉层，也不合适承担其他功能。

（3）Action 是一个存放数据的对象，即消息的载体，只能被别人操作，自己不能进行任何操作。

想来想去，只有发送 Action 的这个步骤，即`store.dispatch()`方法内部可以添加功能。

举例来说，如果要添加日志功能，把 Action 和 State 打印出来，可以对`store.dispatch`进行如下改造。

```javascript
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action);
  next(action);
  console.log('next state', store.getState());
}
```

上面代码中，对`store.dispatch`进行了封装，在发送 Action 前后添加打印功能。这就是中间件的雏形。

简单说，中间件就是一个函数，对`store.dispatch`方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。

## 二、中间件的用法

本教程不涉及如何编写中间件，因为常用的中间件都有现成的，只要引用别人写好的模块即可。比如，上一节的日志中间件，就有现成的[redux-logger](https://github.com/evgenyrodionov/redux-logger)模块。

我们只看怎么使用中间件。

```javascript
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
const logger = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(logger)
);
```

上面代码中，`redux-logger`提供一个生成器`createLogger`，可以生成日志中间件`logger`。然后，将它放在`applyMiddleware`方法之中，传入`createStore`方法，就可以完成对`store.dispatch()`方法的功能增强。

这里有两点需要注意：

（1）本教程的第一部分介绍过，`createStore`方法可以接受整个应用的初始状态作为参数，如果那样的话，`applyMiddleware`就是第三个参数了。

```javascript
const store = createStore(
  reducer,
  initial_state,
  applyMiddleware(logger)
);
```

（2）如果有多个中间件，就要依次传入`applyMiddleware`方法。

```javascript
const store = createStore(
  reducer,
  applyMiddleware(thunk, promise, logger)
);
```

上面代码中，`applyMiddleware`方法有三个参数，就表示有三个中间件需要执行。有的中间件有次序要求，所以使用前要查一下文档。比如，`logger`就一定要放在最后，否则输出结果会不正确。

## 三、applyMiddlewares()

看到这里，你可能会问，`applyMiddlewares`这个方法到底是干什么的？

它是 Redux 提供的原生方法，主要作用是将所有中间件组成一个数组，依次执行。下面是它的源码。

```javascript
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer);
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {...store, dispatch}
  }
}
```

上面代码中，所有中间件被放进了一个数组`chain`，然后嵌套执行，在`store.dispatch`上面添加各种功能。另外，可以看到，中间件内部（`middlewareAPI`）可以拿到`getState`和`dispatch`这两个方法。

## 四、异步操作的基本思路

理解了中间件以后，就可以处理异步操作了。

异步操作的关键在于，它要发出三种 Action，而同步操作只要发出一种 Action 即可。

> - 操作发起时的 Action
> - 操作成功时的 Action
> - 操作失败时的 Action

以向服务器取出数据为例，三种 Action 可以有两种不同的写法。

```javascript
// 写法一：名称相同，参数不同
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }

// 写法二：名称不同
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }
```

State 也要进行改造，反映不同的状态。下面是一个例子。

```javascript
let state = {
  // ... 
  isFetching: true,
  didInvalidate: true,
  lastUpdated: 'xxxxxxx'
};
```

上面代码中，State 里面有一个属性`isFetching`，表示是否在抓取数据。`didInvalidate`表示数据是否过时，`lastUpdated`表示上一次更新时间。

现在，整个异步操作的思路就很清楚了。

> - 操作发起时，送出一个 Action，触发 State 更新为“正在操作”的状态，导致 View 的重新渲染
- 操作有了结果后，再送出一个 Action，触发 State 更新为“操作结束”状态，导致 View 再一次重新渲染

## 五、redux-thunk 中间件

从上一节的分析可以看到，一次异步操作至少要送出两个 Action：用户触发第一个 Action，这个跟同步操作一样，没有问题；那么如何才能在操作结束时，系统自动送出第二个 Action 呢？

奥秒就在 Action Creator 之中。

```javascript
class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch, selectedPost } = this.props
    dispatch(fetchPosts(selectedPost))
  }

// ...
```

上面代码是一个异步组件的例子。加载成功后（`componentDidMount`方法），它送出了（`dispatch`方法）一个 Action，向服务器要求数据 `fetchPosts(selectedSubreddit)`。这里的`fetchPosts`就是 Action Creator。

下面就是`fetchPosts`的代码，关键之处就在里面。

```javascript
const fetchPosts = postTitle => (dispatch, getState) => {
  dispatch(requestPosts(postTitle));
  return fetch(`/some/API/${postTitle}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(postTitle, json)));
  };
};

// 使用方法
store.dispatch(fetchPosts('reactjs'));
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
);
```

上面代码中，`fetchPosts`是一个Action Creator（动作生成器），返回一个函数。这个函数执行后，先发出一个动作`requestPosts`（这也是一个 Action Creator），然后进行异步操作，拿到结果后，先将结果转成 JSON 格式，然后再发出一个 Action `receivePosts`。

上面代码中，有几个地方需要注意。

（1）`fetchPosts`返回了一个函数，而普通的 Action Creator 默认返回一个对象。

（2）返回的函数接受`dispatch`和`getState`这两个 Redux 方法作为参数，普通的 Action Creator 接受 Action 的内容作为参数。

（3）在返回的函数之中，先发出一个 `requestPosts(postTitle)`的 Action，表示操作开始。

（4）异步操作结束之后，再发出一个`receivePosts(postTitle, json)`的 Action，表示操作结束。

这样的处理，就解决了自动发送第二个 Action 的问题。但是，又带来了一个新的问题，Action 是由`store.dispatch`方法发送的。而`store.dispatch`方法正常情况下，参数只能是对象，不能是函数。

这时，就要使用中间件[`redux-thunk`](https://github.com/gaearon/redux-thunk)。

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
```

上面代码使用`redux-thunk`中间件，改造`store.dispatch`，使得后者可以接受函数作为参数。

因此，异步操作的第一种解决方案就是，写出一个返回函数的 Action Creator，然后使用`redux-thunk`中间件改造`store.dispatch`

## 六、redux-promise 中间件

既然 Action Creator 可以返回函数，当然也可以返回其他值。另一种异步操作的解决方案，就是让 Action Creator 返回一个 Promise 对象。

这就需要使用`redux-promise`中间件。

```javascript
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(promiseMiddleware)
); 
```

然后，Action Creator 有两种写法。写法一，返回值是一个 Promise 对象。

```javascript
const fetchPosts = 
  (dispatch, postTitle) => new Promise(function (resolve, reject) {
     dispatch(requestPosts(postTitle));
     return fetch(`/some/API/${postTitle}.json`)
       .then(response => {
         type: 'FETCH_POSTS',
         payload: response.json()
       });
});
```

写法二，Action 对象的`payload`属性是一个 Promise 对象。这需要从`redux-actions`模块引入[`createAction`](https://github.com/acdlite/redux-actions)方法，并且写法也要变成下面这样。

```javascript
import { createAction } from 'redux-actions';

class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch, selectedPost } = this.props
    // 发出同步 Action
    dispatch(requestPosts(selectedPost));
    // 发出异步 Action
    dispatch(createAction(
      'FETCH_POSTS', 
      fetch(`/some/API/${postTitle}.json`)
        .then(response => response.json())
    ));
  }
```

上面代码中，第二个`dispatch`方法发出的是异步 Action，只有等到操作结束，这个 Action 才会实际发出。注意，`createAction`的第二个参数必须是一个 Promise 对象。

看一下`redux-promise`的[源码](https://github.com/acdlite/redux-promise/blob/master/src/index.js)，就会明白它内部是怎么操作的。

```javascript
export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result }),
          error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          }
        )
      : next(action);
  };
}
```

从上面代码可以看出，如果 Action 本身是一个 Promise，它 resolve 以后的值应该是一个 Action 对象，会被`dispatch`方法送出（`action.then(dispatch)`），但 reject 以后不会有任何动作；如果 Action 对象的`payload`属性是一个 Promise 对象，那么无论 resolve 和 reject，`dispatch`方法都会发出 Action。

（完）

## 参考链接

- [10 Tips for Better Redux Architecture](https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44), by Eric Elliott