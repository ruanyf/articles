# React 测试入门教程

越来越多的人，使用[React](http://www.ruanyifeng.com/blog/2015/03/react.html)开发Web应用。它的测试就成了一个大问题。

React的组件结构和JSX语法，不适用传统的测试工具，必须有新的测试方法和工具。

本文总结目前React测试的基本做法和最佳实践，手把手教你如何写React测试。

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016021201.png)

## 一、Demo应用

请先安装[Demo](https://github.com/ruanyf/react-testing-demo)。

```bash
$ git clone https://github.com/ruanyf/react-testing-demo.git
$ cd react-testing-demo && npm install
$ npm start
```

然后，打开 http://127.0.0.1:8080/，你会看到一个 Todo 应用。

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016021202.png)

接下来，我们就要测试这个应用，一共有5个测试点。

> 1. 应用标题应为“Todos”
> 2. Todo项的初始状态（“未完成”或“已完成”）应该正确
> 3. 点击一个Todo项，它就反转状态（“未完成”变为“已完成”，反之亦然）
> 4. 点击删除按钮，该Todo项就被删除
> 5. 点击添加按钮，会新增一个Todo项

这5个[测试用例](https://github.com/ruanyf/react-testing-demo/tree/master/test)都已经写好了，执行一下就可以看到结果。

```bash
$ npm test
```

下面就来看，测试用例应该怎么写。测试框架我用的是Mocha，如果你不熟悉，可以先读我写的[《Mocha教程》](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)。

## 二、测试工具库

React测试必须使用官方的[测试工具库](https://facebook.github.io/react/docs/test-utils.html)，但是它用起来不够方便，所以有人做了封装，推出了一些第三方库，其中Airbnb公司的[Enzyme](https://github.com/airbnb/enzyme)最容易上手。

这就是说，同样的测试用例至少有两种写法，本文都将介绍。

> - 官方测试工具库的写法
> - Enzyme的写法

## 三、官方测试工具库

我们知道，一个React组件有两种存在形式：虚拟DOM对象（即`React.Component`的实例）和真实DOM节点。官方测试工具库对这两种形式，都提供测试解决方案。

- **Shallow Rendering**：测试虚拟DOM的方法
- **DOM Rendering**: 测试真实DOM的方法

### 3.1 Shallow Rendering

Shallow Rendering （浅渲染）指的是，将一个组件渲染成虚拟DOM对象，但是只渲染第一层，不渲染所有子组件，所以处理速度非常快。它不需要DOM环境，因为根本加载进DOM。

首先，在测试脚本之中，引入官方测试工具库。

```javascript
import TestUtils from 'react-addons-test-utils';
```

然后，写一个 Shallow Rendering 函数，该函数返回的就是一个浅渲染的虚拟DOM对象。

```javascript
import TestUtils from 'react-addons-test-utils';

function shallowRender(Component) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component/>);
  return renderer.getRenderOutput();
}
```

第一个[测试用例](https://github.com/ruanyf/react-testing-demo/blob/master/test/shallow1.test.js)，是测试标题是否正确。这个用例不需要与DOM互动，不涉及子组件，所以使用浅渲染非常合适。

```javascript
describe('Shallow Rendering', function () {
  it('App\'s title should be Todos', function () {
    const app = shallowRender(App);
    expect(app.props.children[0].type).to.equal('h1');
    expect(app.props.children[0].props.children).to.equal('Todos');
  });
});
```

上面代码中，`const app = shallowRender(App)`表示对`App`组件进行“浅渲染”，然后`app.props.children[0].props.children`就是组件的标题。

你大概会觉得，这个属性的写法太古怪了，但实际上是有规律的。每一个虚拟DOM对象都有`props.children`属性，它包含一个数组，里面是所有的子组件。`app.props.children[0]`就是第一个子组件，在我们的例子中就是`h1`元素，它的`props.children`属性就是`h1`的文本。

第二个[测试用例](https://github.com/ruanyf/react-testing-demo/blob/master/test/shallow2.test.js)，是测试`Todo`项的初始状态。

首先，需要修改`shallowRender`函数，让它接受第二个参数。 

```javascript
import TestUtils from 'react-addons-test-utils';

function shallowRender(Component, props) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component {...props}/>);
  return renderer.getRenderOutput();
}
```

下面就是测试用例。

```javascript
import TodoItem from '../app/components/TodoItem';

describe('Shallow Rendering', function () {
  it('Todo item should not have todo-done class', function () {
    const todoItemData = { id: 0, name: 'Todo one', done: false };
    const todoItem = shallowRender(TodoItem, {todo: todoItemData});
    expect(todoItem.props.children[0].props.className.indexOf('todo-done')).to.equal(-1);
  });
});
```

上面代码中，由于[`TodoItem`](https://github.com/ruanyf/react-testing-demo/blob/master/app/components/TodoItem.jsx)是[`App`](https://github.com/ruanyf/react-testing-demo/blob/master/app/components/App.jsx)的子组件，所以浅渲染必须在`TodoItem`上调用，否则渲染不出来。在我们的例子中，初始状态反映在组件的`Class`属性（`props.className`）是否包含`todo-done`。

### 3.2 renderIntoDocument

官方测试工具库的第二种测试方法，是将组件渲染成真实的DOM节点，再进行测试。这时就需要调用`renderIntoDocument` 方法。

```javascript
import TestUtils from 'react-addons-test-utils';
import App from '../app/components/App';

const app = TestUtils.renderIntoDocument(<App/>);
```

`renderIntoDocument` 方法要求存在一个真实的DOM环境，否则会报错。因此，测试用例之中，DOM环境（即`window`, `document` 和 `navigator` 对象）必须是存在的。[jsdom](https://github.com/tmpvar/jsdom) 库提供这项功能。

```javascript
import jsdom from 'jsdom';

if (typeof document === 'undefined') {
  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = global.window.navigator;
}
```

将上面这段代码，保存在`test`子目录下，取名为 [`setup.js`](https://github.com/ruanyf/react-testing-demo/blob/master/test/setup.js)。然后，修改`package.json`。

```javascript
{
  "scripts": {
    "test": "mocha --compilers js:babel-core/register --require ./test/setup.js",
  },
}
```

现在，每次运行`npm test`，`setup.js` 就会包含在测试脚本之中一起执行。

第三个[测试用例](https://github.com/ruanyf/react-testing-demo/blob/master/test/dom1.test.js)，是测试删除按钮。

```javascript
describe('DOM Rendering', function () {
  it('Click the delete button, the Todo item should be deleted', function () {
    const app = TestUtils.renderIntoDocument(<App/>);
    let todoItems = TestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    let todoLength = todoItems.length;
    let deleteButton = todoItems[0].querySelector('button');
    TestUtils.Simulate.click(deleteButton);
    let todoItemsAfterClick = TestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    expect(todoItemsAfterClick.length).to.equal(todoLength - 1);
  });
});
```

上面代码中，第一步是将`App`渲染成真实的DOM节点，然后使用`scryRenderedDOMComponentsWithTag`方法找出`app`里面所有的`li`元素。然后，取出第一个`li`元素里面的`button`元素，使用`TestUtils.Simulate.click`方法在该元素上模拟用户点击。最后，判断剩下的`li`元素应该少了一个。

这种测试方法的基本思路，就是找到目标节点，然后触发某种动作。官方测试工具库提供多种方法，帮助用户找到所需的DOM节点。

> - [scryRenderedDOMComponentsWithClass](https://facebook.github.io/react/docs/test-utils.html#scryrendereddomcomponentswithclass)：找出所有匹配指定`className`的节点
> - [findRenderedDOMComponentWithClass](https://facebook.github.io/react/docs/test-utils.html#findrendereddomcomponentwithclass)：与`scryRenderedDOMComponentsWithClass`用法相同，但只返回一个节点，如有零个或多个匹配的节点就报错
> -  [scryRenderedDOMComponentsWithTag](https://facebook.github.io/react/docs/test-utils.html#scryrendereddomcomponentswithtag)：找出所有匹配指定标签的节点
> - [findRenderedDOMComponentWithTag](https://facebook.github.io/react/docs/test-utils.html#findrendereddomcomponentwithtag)：与`scryRenderedDOMComponentsWithTag`用法相同，但只返回一个节点，如有零个或多个匹配的节点就报错
> - [scryRenderedComponentsWithType](https://facebook.github.io/react/docs/test-utils.html#scryrenderedcomponentswithtype)：找出所有符合指定子组件的节点
> - [findRenderedComponentWithType](https://facebook.github.io/react/docs/test-utils.html#findrenderedcomponentwithtype)：与`scryRenderedComponentsWithType`用法相同，但只返回一个节点，如有零个或多个匹配的节点就报错
> - [findAllInRenderedTree](https://facebook.github.io/react/docs/test-utils.html#findallinrenderedtree)：遍历当前组件所有的节点，只返回那些符合条件的节点

可以看到，上面这些方法很难拼写，好在还有另一种找到DOM节点的替代方法。

### 3.3 findDOMNode

如果一个组件已经加载进入DOM，`react-dom`模块的`findDOMNode`方法会返回该组件所对应的DOM节点。

我们使用这种方法来写第四个[测试用例](https://github.com/ruanyf/react-testing-demo/blob/master/test/dom2.test.js)，用户点击Todo项时的行为。

```javascript
import {findDOMNode} from 'react-dom';

describe('DOM Rendering', function (done) {
  it('When click the Todo item，it should become done', function () {
    const app = TestUtils.renderIntoDocument(<App/>);
    const appDOM = findDOMNode(app);
    const todoItem = appDOM.querySelector('li:first-child span');
    let isDone = todoItem.classList.contains('todo-done');
    TestUtils.Simulate.click(todoItem);
    expect(todoItem.classList.contains('todo-done')).to.be.equal(!isDone);
  });
});
```

上面代码中，`findDOMNode`方法返回`App`所在的DOM节点，然后找出第一个`li`节点，在它上面模拟用户点击。最后，判断`classList`属性里面的`todo-done`，是否出现或消失。

第五个测试用例，是添加新的Todo项。

```javascript
describe('DOM Rendering', function (done) {
  it('Add an new Todo item, when click the new todo button', function () {
    const app = TestUtils.renderIntoDocument(<App/>);
    const appDOM = findDOMNode(app);
    let todoItemsLength = appDOM.querySelectorAll('.todo-text').length;
    let addInput = appDOM.querySelector('input');
    addInput.value = 'Todo four';
    let addButton = appDOM.querySelector('.add-todo button');
    TestUtils.Simulate.click(addButton);
    expect(appDOM.querySelectorAll('.todo-text').length).to.be.equal(todoItemsLength + 1);
  });
});
```

上面代码中，先找到`input`输入框，添加一个值。然后，找到`Add Todo`按钮，在它上面模拟用户点击。最后，判断新的Todo项是否出现在Todo列表之中。

`findDOMNode`方法的最大优点，就是支持复杂的CSS选择器。这是`TestUtils`本身不提供的。

## 四、Enzyme库

[Enzyme](https://github.com/airbnb/enzyme)是官方测试工具库的封装，它模拟了jQuery的API，非常直观，易于使用和学习。

它提供三种测试方法。

> - `shallow`
> - `render`
> - `mount`

### 4.1 shallow

[shallow](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md)方法就是官方的shallow rendering的封装。

下面是第一个[测试用例](https://github.com/ruanyf/react-testing-demo/blob/master/test/enzyme1.test.js#L6)，测试`App`的标题。

```javascript
import {shallow} from 'enzyme';

describe('Enzyme Shallow', function () {
  it('App\'s title should be Todos', function () {
    let app = shallow(<App/>);
    expect(app.find('h1').text()).to.equal('Todos');
  });
};
```

上面代码中，`shallow`方法返回`App`的浅渲染，然后`app.find`方法找出`h1`元素，`text`方法取出该元素的文本。

关于`find`方法，有一个注意点，就是它只支持简单选择器，稍微复杂的一点的CSS选择器都不支持。

```bash
component.find('.my-class'); // by class name
component.find('#my-id'); // by id
component.find('td'); // by tag
component.find('div.custom-class'); // by compound selector
component.find(TableRow); // by constructor
component.find('TableRow'); // by display name
```

### 4.2 render

[`render`](https://github.com/airbnb/enzyme/blob/master/docs/api/render.md)方法将React组件渲染成静态的HTML字符串，然后分析这段HTML代码的结构，返回一个对象。它跟`shallow`方法非常像，主要的不同是采用了第三方HTML解析库Cheerio，它返回的是一个Cheerio实例对象。

下面是第二个[测试用例](https://github.com/ruanyf/react-testing-demo/blob/master/test/enzyme1.test.js#L13)，测试所有Todo项的初始状态。

```javascript
import {render} from 'enzyme';

describe('Enzyme Render', function () {
  it('Todo item should not have todo-done class', function () {
    let app = render(<App/>);
    expect(app.find('.todo-done').length).to.equal(0);
  });
});
```

在上面代码中，你可以看到，`render`方法与`shallow`方法的API基本是一致的。 Enzyme的设计就是，让不同的底层处理引擎，都具有同样的API（比如`find`方法）。

### 4.3 mount

[`mount`](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md)方法用于将React组件加载为真实DOM节点。

下面是第三个[测试用例](https://github.com/ruanyf/react-testing-demo/blob/master/test/enzyme1.test.js#L21)，测试删除按钮。

```javascript
import {mount} from 'enzyme';

describe('Enzyme Mount', function () {
  it('Delete Todo', function () {
    let app = mount(<App/>);
    let todoLength = app.find('li').length;
    app.find('button.delete').at(0).simulate('click');
    expect(app.find('li').length).to.equal(todoLength - 1);
  });
});
```

上面代码中，`find`方法返回一个对象，包含了所有符合条件的子组件。在它的基础上，`at`方法返回指定位置的子组件，`simulate`方法就在这个组件上触发某种行为。

下面是第四个[测试用例](https://github.com/ruanyf/react-testing-demo/blob/master/test/enzyme1.test.js#L28)，测试Todo项的点击行为。

```javascript
import {mount} from 'enzyme';

describe('Enzyme Mount', function () {
  it('Turning a Todo item into Done', function () {
    let app = mount(<App/>);
    let todoItem = app.find('.todo-text').at(0);
    todoItem.simulate('click');
    expect(todoItem.hasClass('todo-done')).to.equal(true);
  });
});
```

下面是第五个[测试用例](https://github.com/ruanyf/react-testing-demo/blob/master/test/enzyme1.test.js#L35)，测试添加新的Todo项。

```javascript
import {mount} from 'enzyme';

describe('Enzyme Mount', function () {
  it('Add a new Todo', function () {
    let app = mount(<App/>);
    let todoLength = app.find('li').length;
    let addInput = app.find('input').get(0);
    addInput.value = 'Todo Four';
    app.find('.add-button').simulate('click');
    expect(app.find('li').length).to.equal(todoLength + 1);
  });
});
```

### 4.4 API

下面是Enzyme的一部分API，你可以从中了解它的大概用法。

> - `.get(index)`：返回指定位置的子组件的DOM节点
> - `.at(index)`：返回指定位置的子组件
> - `.first()`：返回第一个子组件
> - `.last()`：返回最后一个子组件
> - `.type()`：返回当前组件的类型
> - `.text()`：返回当前组件的文本内容
> - `.html()`：返回当前组件的HTML代码形式
> - `.props()`：返回根组件的所有属性
> - `.prop(key)`：返回根组件的指定属性
> - `.state([key])`：返回根组件的状态
> - `.setState(nextState)`：设置根组件的状态
> - `.setProps(nextProps)`：设置根组件的属性


（完）
