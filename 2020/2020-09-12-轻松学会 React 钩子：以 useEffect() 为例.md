# 轻松学会 React 钩子：以  useEffect() 为例

五年多前，我写过 [React 系列教程](http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html)。不用说，内容已经有些过时了。

我本来不想碰它们了，觉得框架一直在升级，教程写出来就会过时。但是，最近我逐渐体会到 React 钩子（hooks）非常好用，重新认识了这个框架，觉得应该补上关于钩子的部分。

下面就来谈谈，钩子到底是什么，怎样使用才是正确的，并且深入剖析最重要的钩子之一的`useEffect()`。我的目标是讲得尽量通俗，让不熟悉 React 的朋友也能看懂。以前写的《React 框架入门》和[《React 最常用的四个钩子》](http://www.ruanyifeng.com/blog/2019/09/react-hooks.html)，大家也可以参考。

## 一、React 的两套 API

React 现在有两套 API：类（class）和基于函数的钩子（hooks）。任何一个组件，既可以用类来写，也可以用钩子来写。

类的写法。

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

钩子的写法，也就是函数的写法。

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

这两种写法，作用完全一样。初学者自然会问：“我应该使用哪一套 API？”

官方[推荐](https://reactjs.org/docs/hooks-faq.html#should-i-use-hooks-classes-or-a-mix-of-both)使用钩子（函数），而不是类。因为钩子更简洁，代码量少，用起来比较“轻”，而类比较“重”。而且，钩子是函数，更符合 React 函数式的本质。

但是，钩子的灵活性太大，初学者不太容易理解。很多人一知半解，很容易写出混乱不堪、无法维护的代码。那就不如使用类了。因为类有很多强制的语法约束，不容易搞乱。

## 二、类和函数的差异

严格地说，类和函数是有差异的。选择不同的写法，代表了不同的编程方法论。

**类（class）是数据和逻辑的封装。** 也就是说，组件的状态和操作方法是封装在一起的。如果选择了类的写法，就应该把相关的数据和操作，都写在同一个组件类里面。

**函数一般来说，只应该做一件事。** 如果你有多个操作，每个操作应该写成一个单独的函数。如果选择了函数的写法，组件函数就只应该做一件事情。

还是以上面的函数组件为例。

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

这个函数只做一件事，就是根据输入的参数，返回组件的代码。这种只进行数据计算的函数，在函数式编程里面称为 **“纯函数”**（pure function）。

## 三、副效应是什么？

看到这里，你可能会产生一个疑问：如果纯函数只能进行数据计算，那些相关的操作（比如生成日志、储存数据、改变应用状态等等）写在哪里呢？

**函数式编程将那些跟数据计算无关的操作，都称为 “副效应”（side effect）。** 函数如果会产生副效应，就不再是纯函数了。

纯函数内部必须通过间接的手段（通过其他函数调用），才能包含副效应。

## 四、钩子（hook）的作用

**钩子（hook）是 React 团队设计的副效应解决方案，用来为函数组件引入副效应。**

如果采用钩子 API，函数组件的主体只应该用来渲染组件本身，所有的副效用都必须通过钩子引入。

钩子有许多种，`useEffect()`方法就是通用的副效应引入方法，其他钩子都是引入某种特定的副效应。比如，`useState()`用来保存状态，`useContext()`用来保存上下文，`useRef()`用来保存引用等等。其实，从`useEffect`这个名字就可以看出来它跟副效应（side effect）直接相关。

## 五、useEffect() 的用法

`useEffect()`是一个函数，由 React 框架提供，在函数组件内部调用。

下面通过一个例子，讲解它的用法。举例来说，我们希望组件加载以后，网页标题会随之改变。那么，改变网页标题这个操作，就是组件的副效应，必须通过`useEffect()`来实现。

```javascript
import React, { useEffect } from 'react';

function Welcome(props) {
  useEffect(() => {
    document.title = '加载完成';
  });
  return <h1>Hello, {props.name}</h1>;
}
```

上面例子中，`useEffect()`的参数是一个函数，它就是所要完成的副效应（改变网页标题）。组件加载以后，React 就会执行这个函数。（[查看运行结果](https://codesandbox.io/s/interesting-dubinsky-dx6oq?file=/src/index.js)）


具体来说，`useEffect()`的作用就是指定一个副效应函数，每次组件渲染完成以后，该函数都会自动执行，包括组件首次在网页 DOM 载完成后也会执行。

## 六、useEffect() 的第二个参数

有时候，我们不希望`useEffect()`每次渲染都执行，这时可以使用它的第二个参数，使用一个数组指定副效应函数的依赖项，只有依赖项发生变化，才会重新渲染。

```javascript
function Welcome(props) {
  useEffect(() => {
    document.title = `Hello, ${props.name}`;
  }, [props.name]);
  return <h1>Hello, {props.name}</h1>;
}
```

上面例子中，`useEffect()`的第二个参数是一个数组，指定了第一个参数（副效应函数）的依赖项（`props.name`）。只有该变量发生变化时，副效应函数才会执行。

如果第二个参数是一个空数组，就表明副效应参数没有任何依赖项。因此，副效应函数只会在组件加载进入 DOM 后，运行一次，后面组件重新渲染不会再次执行。这是很合理的，因为这时副效应不依赖任何变量，这意味着，无论那些变量怎么变，副效应函数的执行结果都不会改变，所以运行一次就够了。

## 七、useEffect() 的用途

只要是副效应，都可以使用`useEffect()`引入。它的常见用途有下面几种。

- 获取数据（data fetching）
- 事件监听或订阅（setting up a subscription）
- 改变 DOM（changing the DOM）
- 输出日志（logging）

下面是从远程服务器获取数据的例子。（[查看运行结果](https://codesandbox.io/s/intelligent-yonath-olihz?file=/src/index.js)）

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
function App() {
  const [data, setData] = useState({ hits: [] });
 
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=redux',
      );
 
      setData(result.data);
    };
 
    fetchData();
  }, []);
 
  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}
 
export default App;
```

上面例子中，`useEffect()`的副效应函数内部有一个 async 函数，用来从远程服务器异步获取数据。拿到数据以后，再用`setData()`触发组件的重新渲染。

由于获取数据与组件内部变量无关，只需要执行一次，所以上例的`useEffect()`的第二个参数为一个空数组。

## 八、useEffect() 的返回值

副效应是由于组件加载而产生的，那么组件卸载时，可能需要清理这些副效应。

`useEffect()`允许返回一个函数，在组件卸载时，执行该函数，清理副效应。如果不需要清理，`useEffect()`就不用返回任何值。

```javascript
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);
```

上面例子中，`useEffect()`在组件加载时订阅了一个事件，并且返回一个清理函数，在组件卸载时取消订阅。

React 的设计是，清理函数不仅会在组件卸载时运行一次，而且组件每次重新渲染之前，都会运行一次，用来清理上一次渲染的副效应。

## 九、useEffect() 的注意点

如果有多个副效应，就调用多次`useEffect()`，而不是合并在一起。

```javascript
function App() {
  const [varA, setVarA] = useState(0);
  const [varB, setVarB] = useState(0);
  useEffect(() => {
    const timeoutA = setTimeout(() => setVarA(varA + 1), 1000);
    const timeoutB = setTimeout(() => setVarB(varB + 2), 2000);

    return () => {
      clearTimeout(timeoutA);
      clearTimeout(timeoutB);
    };
  }, [varA, varB]);

  return <span>{varA}, {varB}</span>;
}
```

上面的例子中，副效应函数是两个定时器，它们之间并没有关系，其实是两个不相关的副效应，不应该写在一起，而应该分开写成两个副效应函数。

```javascript
function App() {
  const [varA, setVarA] = useState(0);
  const [varB, setVarB] = useState(0);
  
  useEffect(() => {
    const timeout = setTimeout(() => setVarA(varA + 1), 1000);
    return () => clearTimeout(timeout);
  }, [varA]);

  useEffect(() => {
    const timeout = setTimeout(() => setVarB(varB + 2), 2000);

    return () => clearTimeout(timeout);
  }, [varB]);

  return <span>{varA}, {varB}</span>;
}
```

（完）
