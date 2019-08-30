# React Hooks 入门教程

React 是主流的前端框架，16.8版本引入了一套新的 API，叫做 [React Hooks](https://reactjs.org/docs/hooks-reference.html)，颠覆了以前的用法。

这个 API 是 React 未来的发展方向，有必要深入理解它。本文谈谈我的理解，简单介绍它的用法，帮助大家快速上手。

阅读本文需要有 React 基础。如果你还不会用这个框架，可以先看一下[它的教程](https://github.com/ruanyf/react-demos)。

## 一、组件类的缺点

React 的核心是组件。16.8版本之前，组件的标准模式是类（class）。下面是一个组件类的标准写法。

```javascript
import React, { Component } from "react";

export default class Button extends Component {
  constructor() {
    super();
    this.state = { buttonText: "Click me, please" };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(() => {
      return { buttonText: "Thanks, been clicked!" };
    });
  }
  render() {
    const { buttonText } = this.state;
    return <button onClick={this.handleClick}>{buttonText}</button>;
  }
}
```

（点击查看[运行结果](https://codesandbox.io/s/funny-forest-ncv8b)）

<iframe src="https://codesandbox.io/embed/funny-forest-ncv8b?fontsize=14" title="funny-forest-ncv8b" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

上面的类是一个按钮。可以看到，代码是很“重”的，必须按照类的 API 组织代码。

React 应用由多个类按照层级，一层层构成。这在编程上导致了一些缺点。

Redux 作者 Dan Abramov [总结](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)了组件类的几个缺点。

> - 大型组件很难拆分和重构，也很难测试。
> - 组件使得业务逻辑分散在各个方法之中，导致有重复逻辑。比如，开发者必须在`componentDidMount`和`componentDidUpdate`这样的生命周期方法中，组织业务逻辑。
> - 组件类引入了复杂的编程模式，比如 render props 和高阶组件的用法。

## 二、函数组件

React 团队希望保持简单，组件不要变成一个复杂的容器，最好只是一个数据流的管道。开发者根据需要，把不同的管道组合在一起。

因此，他们更希望，组件是一个个简单函数，而不是复杂的类。

React 早就支持[函数写组件](https://reactjs.org/docs/components-and-props.html)。

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

上面就是一个函数组件。

这种写法有重大限制，必须是纯函数，不能包含状态，也不支持生命周期方法。因此，它不能取代类。

React Hooks 的设计目的，就是增强函数组件，可以完全不使用类的语法，就写出一个全功能的应用。

## 三、Hook 的含义

Hook 这个单词的意思是“钩子”。

**React 团队的想法是，组件尽量写成纯函数，如果需要外部功能和副效应，就用 React Hooks 把外部代码“钩”进来，像钩子一样。**

你需要什么功能，就使用什么钩子。React 默认提供了一些常用钩子，你也可以封装自己的钩子。

所有的钩子都是为函数引入外部功能，所以 React 约定，钩子一律使用`use`前缀命名，便于识别。你要使用 xxx 功能，钩子就命名为 usexxx。

下面介绍 React 默认提供的四个最常用的钩子。

> - useState()
> - useContext()
> - useReducer()

## 四、useState()：状态钩子

`useState()`用于为函数组件引入状态（state）。

本文前面那个组件类，使用`useState()`重写如下。

```javascript
import React, { useState } from "react";

export default function  Button()  {
  const  [buttonText, setButtonText] =  useState("Click me,   please");
  
  function handleClick()  {
    return setButtonText("Thanks, been clicked!");
  }

  return  <button  onClick={handleClick}>{buttonText}</button>;
}
```

（点击查看[运行结果](https://codesandbox.io/s/nifty-waterfall-4i2dq)）

<iframe src="https://codesandbox.io/embed/nifty-waterfall-4i2dq?fontsize=14" title="nifty-waterfall-4i2dq" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

上面代码中，首先， Button 组件是一个函数。它内部使用 React 提供的`useState()`钩子引入状态。

`useState()`这个函数接受状态的初始值，作为参数，上例的初始值是按钮文字。该函数返回一个数组，数组的第一个成员是一个变量（上例是`buttonText`），指向状态的当前值。第二个是一个函数，用来更新状态，约定是`set`前缀加上状态的变量名（上例是`setButtonText`）。

## 五、useContext()：共享状态钩子

如果需要在组件之间共享状态，可以使用`useContext()`。

现在有两个组件 Navbar 和 Messages，我们希望它们之间共享状态。

```html
<div className="App">
  <Navbar/>
  <Messages/>
</div>
```

第一步就是使用 React Context API，在组件外部建立一个 Context。

```javascript
const AppContext = React.createContext({});
```

组件封装代码如下。

```html
<AppContext.Provider value={{
  username: 'superawesome'
}}>
  <div className="App">
    <Navbar/>
    <Messages/>
  </div>
</AppContext.Provider>
```

上面代码中，`AppContext.Provider`提供了一个 Context 对象，这个对象可以被子组件共享。

Navbar 组件的代码如下。

```javascript
const Navbar = () => {
  const { username } = useContext(AppContext);
  return (
    <div className="navbar">
      <p>AwesomeSite</p>
      <p>{username}</p>
    </div>
  );
}
```

上面代码中，`useContext()`钩子函数用来接收 Context 对象，从中获取`username`属性。

Message 组件的代码也类似。

```javascript
const Messages = () => {
  const { username } = useContext(AppContext)

  return (
    <div className="messages">
      <h1>Messages</h1>
      <p>1 message for {username}</p>
      <p className="message">useContext is awesome!</p>
    </div>
  )
}
```

（点击查看[运行结果](https://codesandbox.io/s/react-usecontext-redux-0bj1v)）

<iframe src="https://codesandbox.io/embed/react-usecontext-redux-0bj1v?fontsize=14" title="react-useContext-redux" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## 六、useReducer()：action 钩子

React 本身不提供状态管理，通常需要使用外部的状态管理库。这方面最常用的库是 Redux。

Redux 的核心概念是，组件发出 action 与状态管理器通信。状态管理器收到 action 以后，使用 Reducer 函数算出新的状态（`(state, action) => newState`）。

`useReducers()`钩子用来为函数引入 Reducer 功能。

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

上面是`useReducer()`的基本用法，它接受 Reducer 函数和状态的初始值作为参数，返回一个数组。数组的第一个成员是状态的当前值，第二个成员是发送 action 的`dispatch`函数。

下面是一个计数器的例子。用于计算状态的 Reducer 函数如下。

```javascript
const myReducer = (state, action) => {
  switch(action.type)  {
    case('countUp'):
      return  {
        ...state,
        count: state.count + 1
      }
    default:
      return  state;
  }
}
```

组件代码如下。

```javascript
function App() {
  const [state, dispatch] = useReducer(myReducer, { count:   0 });
  return  (
    <div className="App">
      <button onClick={() => dispatch({ type: 'countUp' })}>
        +1
      </button>
      <p>Count: {state.count}</p>
    </div>
  );
}
```

（点击查看[运行结果](https://codesandbox.io/s/react-usereducer-redux-xqlet)）

<iframe src="https://codesandbox.io/embed/react-usereducer-redux-xqlet?fontsize=14" title="react-useReducer-redux" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## 七、useEffect()：副作用钩子

`useEffect()`用于引入具有副作用的操作，最常见的就是向服务器请求数据。以前，放在`componentDidMount`里面的代码，现在可以放在`useEffect()`。

`useEffect()`的用法如下。

```javascript
useEffect(()  =>  {
  // Async Action
}, [dependencies])
```

`useEffect()`可以接受两个参数。第一个参数是一个函数，异步操作的代码可以放在里面。第二个参数是一个数组，用于给出 Effect 的依赖项，只要这个数组发生变化，`useEffect()`就会执行。

第二个参数可以省略，这时每次组件重新渲染，就会执行`useEffect()`。

下面看一个例子。

```javascript
const Person = ({ personId }) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});

  useEffect(() => {
    setLoading(true); 
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId])

  if (loading === true) {
    return <p>Loading ...</p>
  }

  return <div>
    <p>You're viewing: {person.name}</p>
    <p>Height: {person.height}</p>
    <p>Mass: {person.mass}</p>
  </div>
}
```

上面代码中，每当组件参数`personId`发生变化，`useEffect()`就会执行。组件第一次渲染时，`useEffect()`也会执行。

（点击查看[运行结果](https://codesandbox.io/s/react-useeffect-redux-9t3bg)）

<iframe src="https://codesandbox.io/embed/react-useeffect-redux-9t3bg?fontsize=14" title="react-useEffect-redux" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## 八、创建自己的 Hooks

上例的 Hooks 代码还可以封装起来，变成一个自定义的 Hook，便于共享。

```javascript
const usePerson = (personId) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId]);  
  return [loading, person];
};
```  

上面代码中，`usePerson()`就是一个自定义的 Hook。

Person 组件就变成了下面的样子。

```javascript
const Person = ({ personId }) => {
  const [loading, person] = usePerson(personId);

  if (loading === true) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <p>You're viewing: {person.name}</p>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
    </div>
  );
};
```

（点击查看[运行结果](https://codesandbox.io/s/react-useeffect-redux-ghl7c)）

<iframe src="https://codesandbox.io/embed/react-useeffect-redux-ghl7c?fontsize=14" title="react-useEffect-redux" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## 九、参考链接

- [Can You Replace Redux with React Hooks?](https://chrisachard.com/replace-redux-with-react-hooks), Chris Achard
- [Why React Hooks?](https://tylermcginnis.com/why-react-hooks/), Tyler McGinnis
- [React Hooks Tutorial for Beginners](https://www.valentinog.com/blog/hooks/),  Valentino Gagliardi

（完）
