# 轻松学会 React 钩子：以  useEffect() 为例

五年多前，我写过 [React 系列教程](http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html)。不用说，内容已经有些过时了。

![](https://www.wangbase.com/blogimg/asset/202009/bg2020091318.jpg)

我本来不想碰它们了，觉得框架一直在升级，教程写出来就会过时。

![](https://www.wangbase.com/blogimg/asset/202009/bg2020091319.jpg)

但是，最近我逐渐体会到 React 钩子（hooks）非常好用，重新认识了 React 这个框架，觉得应该补上关于钩子的部分。

![](https://www.wangbase.com/blogimg/asset/202009/bg2020091317.jpg)

下面就来谈谈，怎样正确理解钩子，并且深入剖析最重要的钩子之一的`useEffect()`。内容会尽量通俗，让不熟悉 React 的朋友也能看懂。欢迎大家参考我以前写的[《React 框架入门》](http://www.ruanyifeng.com/blog/2015/03/react.html)和[《React 最常用的四个钩子》](http://www.ruanyifeng.com/blog/2019/09/react-hooks.html)。

> 本文得到了 **开课吧** 的支持，结尾有 React 视频学习资料。希望通过视频来系统学习 React 的同学，可以关注。

## 一、React 的两套 API

以前，React API 只有一套，现在有两套：类（class）API 和基于函数的钩子（hooks） API。

![](https://www.wangbase.com/blogimg/asset/202009/bg2020091407.jpg)

任何一个组件，可以用类来写，也可以用钩子来写。下面是类的写法。

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

再来看钩子的写法，也就是函数。

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

这两种写法，作用完全一样。初学者自然会问：“我应该使用哪一套 API？”

官方[推荐](https://reactjs.org/docs/hooks-faq.html#should-i-use-hooks-classes-or-a-mix-of-both)使用钩子（函数），而不是类。因为钩子更简洁，代码量少，用起来比较“轻”，而类比较“重”。而且，钩子是函数，更符合 React 函数式的本质。

下面是类组件（左边）和函数组件（右边）代码量的比较。对于复杂的组件，差的就更多。

![](https://www.wangbase.com/blogimg/asset/202009/bg2020091320.jpg)

但是，钩子的灵活性太大，初学者不太容易理解。很多人一知半解，很容易写出混乱不堪、无法维护的代码。那就不如使用类了。因为类有很多强制的语法约束，不容易搞乱。

## 二、类和函数的差异

严格地说，类组件和函数组件是有差异的。不同的写法，代表了不同的编程方法论。

**类（class）是数据和逻辑的封装。** 也就是说，组件的状态和操作方法是封装在一起的。如果选择了类的写法，就应该把相关的数据和操作，都写在同一个 class 里面。

![](https://www.wangbase.com/blogimg/asset/202009/bg2020091408.jpg)

**函数一般来说，只应该做一件事，就是返回一个值。** 如果你有多个操作，每个操作应该写成一个单独的函数。而且，数据的状态应该与操作方法分离。根据这种理念，React 的函数组件只应该做一件事情：返回组件的 HTML 代码，而没有其他的功能。

![](https://www.wangbase.com/blogimg/asset/202009/bg2020091409.jpg)

还是以上面的函数组件为例。

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

这个函数只做一件事，就是根据输入的参数，返回组件的 HTML 代码。这种只进行单纯的数据计算（换算）的函数，在函数式编程里面称为 **“纯函数”**（pure function）。

## 三、副效应是什么？

看到这里，你可能会产生一个疑问：如果纯函数只能进行数据计算，那些不涉及计算的操作（比如生成日志、储存数据、改变应用状态等等）应该写在哪里呢？

函数式编程将那些跟数据计算无关的操作，都称为 “副效应” **（side effect）** 。如果函数内部直接包含产生副效应的操作，就不再是纯函数了，我们称之为不纯的函数。

![](https://www.wangbase.com/blogimg/asset/202009/bg2020091410.jpg)

纯函数内部只有通过间接的手段（即通过其他函数调用），才能包含副效应。

## 四、钩子（hook）的作用

说了半天，那么钩子到底是什么？

一句话，**钩子（hook）就是 React 函数组件的副效应解决方案，用来为函数组件引入副效应。** 函数组件的主体只应该用来返回组件的 HTML 代码，所有的其他操作（副效应）都必须通过钩子引入。

由于副效应非常多，所以钩子有许多种。React 为许多常见的操作（副效应），都提供了专用的钩子。

- `useState()`：保存状态
- `useContext()`：保存上下文
- `useRef()`：保存引用
- ……

上面这些钩子，都是引入某种特定的副效应，而 **`useEffect()`是通用的副效应钩子** 。找不到对应的钩子时，就可以用它。其实，从名字也可以看出来，它跟副效应（side effect）直接相关。

![](https://www.wangbase.com/blogimg/asset/202009/bg2020091411.jpg)

## 五、useEffect() 的用法

`useEffect()`本身是一个函数，由 React 框架提供，在函数组件内部调用即可。

举例来说，我们希望组件加载以后，网页标题（`document.title`）会随之改变。那么，改变网页标题这个操作，就是组件的副效应，必须通过`useEffect()`来实现。

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

`useEffect()`的作用就是指定一个副效应函数，组件每渲染一次，该函数就自动执行一次。组件首次在网页 DOM 加载后，副效应函数也会执行。

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

如果第二个参数是一个空数组，就表明副效应参数没有任何依赖项。因此，副效应函数这时只会在组件加载进入 DOM 后执行一次，后面组件重新渲染，就不会再次执行。这很合理，由于副效应不依赖任何变量，所以那些变量无论怎么变，副效应函数的执行结果都不会改变，所以运行一次就够了。

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

上面例子中，`useState()`用来生成一个状态变量（`data`），保存获取的数据；`useEffect()`的副效应函数内部有一个 async 函数，用来从服务器异步获取数据。拿到数据以后，再用`setData()`触发组件的重新渲染。

由于获取数据只需要执行一次，所以上例的`useEffect()`的第二个参数为一个空数组。

## 八、useEffect() 的返回值

副效应是随着组件加载而发生的，那么组件卸载时，可能需要清理这些副效应。

`useEffect()`允许返回一个函数，在组件卸载时，执行该函数，清理副效应。如果不需要清理副效应，`useEffect()`就不用返回任何值。

```javascript
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);
```

上面例子中，`useEffect()`在组件加载时订阅了一个事件，并且返回一个清理函数，在组件卸载时取消订阅。

实际使用中，由于副效应函数默认是每次渲染都会执行，所以清理函数不仅会在组件卸载时执行一次，每次副效应函数重新执行之前，也会执行一次，用来清理上一次渲染的副效应。

## 九、useEffect() 的注意点

使用`useEffect()`时，有一点需要注意。如果有多个副效应，应该调用多个`useEffect()`，而不应该合并写在一起。

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

上面的例子是错误的写法，副效应函数里面有两个定时器，它们之间并没有关系，其实是两个不相关的副效应，不应该写在一起。正确的写法是将它们分开写成两个`useEffect()`。

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

## 十、参考链接

- [React useEffect: 4 Tips Every Developer Should Know](https://medium.com/swlh/useeffect-4-tips-every-developer-should-know-54b188b14d9c), Helder Esteves
- [Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html), React
- [How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data), Robin Wieruch
 
（正文完）

## React 系统视频

对于每个想进大厂的前端开发者来说，React 是绕不过的坎，面试肯定会问到，业务也很可能会用。不懂一点 React 技术栈，大大降低了个人竞争力。

退一步说，即使你用不到 React，但是它的很多思想已经影响到了整个业界，比如虚拟 DOM、JSX、函数式编程、immutable 的状态、单向数据流等等。懂了 React，面对其他轮子时，你也能得心应手。

但是，大家都知道 React 学习曲线比较陡峭，不少人抱怨：苦苦学了1个多月却进展缓慢怎么办？

别着急，这里有一份开课吧的 **《React 原理剖析 + 组件化》** 系统视频。不仅讲解了原理，还包括了综合性的实战项目，里面用到了 react-router、redux、react-redux、antd 等 React 全家桶。

![](https://www.wangbase.com/blogimg/asset/202009/bg2020090302.jpg)

访问[这个链接](https://wx.kaikeba.com/vip_course/afzg70hmbg/i5ct6cht4p?tenant=wx5046bc7413796142)，或者微信扫描下面的二维码，就可以免费领取。

![](https://www.wangbase.com/blogimg/asset/202009/bg2020091412.jpg)

（完）
