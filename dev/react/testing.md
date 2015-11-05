# React测试

React组件至少有两个方面需要测试。

- 给定属性（property)和状态（state），会渲染出什么结果？
- 对于渲染的结果，进行某种输入（用户的互动），有没有可能从状态A转化成状态B？

第一类测试可以称为测试结构，第二类测试可以称之为测试行为。

推荐的工具集

- Shallow rendering
- Regular test utilities and jsdom when needed
- mocha + jsdom + expect + expect-jsx + babel-plugin-rewire

## 测试结构：真实DOM测试

`mocha-jsdom`模块让你可以在`describe`方法内部或者全局环境，使用`jsdom()`方法，将Node.js环境模拟成一个浏览器环境，支持所有DOM和浏览器的API，让`window`、`document`、`history`等等变量在全局环境下可用。

`jsdom`的参数`useEach`表示，这些全局变量绑定Mocha的`beforeEach`/`afterEach`方法，而不是`before`/`after`方法，默认等于`false`。

`react-addons-test-utils`模块是React官方提供的测试工具库。它的`renderIntoDocument`方法，接受一个React组件作为参数，将其渲染成Document对象上面的一个真实DOM结构，但是不会将其插入文档。这个方法执行的前提是`window`、`window.document`和`window.document.createElement`必须在调用React之前，就在全局范围之中可以拿到。否则，React会认为无法拿到DOM，然后诸如`setState`这样的方法就不可用。

`react-dom`模块的`findDOMNode`方法，它接受一个React组件作为参数。如果该组件已经加到了DOM，那么该方法返回对应的浏览器之中的真实DOM。这个方法主要用于从真实方法取值，比如表单项的值。大多数情况，从组件的`ref`属性可以拿到真实DOM，不一定要使用`findDOMNode`方法。如果`render`方法返回`null`或`false`，`findDOMNode`方法也会返回`null`。

`findDOMNode()`只对已经加载的组件有效（即已经放入DOM），否则会报错。

```javascript
import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';
import jsdom from 'mocha-jsdom';
import expect from 'expect';

class Label extends React.Component {
  render() {
    return <span>Hello {this.props.name}</span>;
  }
}

class Button extends React.Component {
  render() {
    return <div><Label name={this.props.name} /></div>;
  }
}

describe('Real dom test', () => {
  jsdom({useEach: true});

  it('works', () => {
    let component = renderIntoDocument(<Button name="John" />);
    let DOMNode = findDOMNode(component);
    expect(
      DOMNode.querySelector('span')
        .textContent
    ).toEqual('Hello John');
  });
});
```

例二。

```javascript
import React from 'react';
import {
   renderIntoDocument,
  findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';
import jsdom from 'mocha-jsdom';
import expect from 'expect';

class Label extends React.Component {
  render() {
    return <span>Hello {this.props.name}</span>;
  }
}

class Button extends React.Component {
  render() {
    return <div><Label name={this.props.name} /></div>;
  }
}

describe('Real Test Utilities', () => {
  jsdom({useEach: true});

  it('works', () => {
    let component = renderIntoDocument(<Button name="John" />);
    expect(
      findRenderedDOMComponentWithTag(component, 'span')
        .textContent
    ).toEqual('Hello John');
  });
});
```

例三。

```javascript
import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';

class Label extends React.Component {
  render() {
    return <span>Hello {this.props.name}</span>;
  }
}

class Button extends React.Component {
  render() {
    return <div><Label name={this.props.name} /></div>;
  }
}

describe('Shallow rendering', () => {
  it('works', () => {
    let renderer = createRenderer();
    renderer.render(<Button name="John" />);
    let actualElement = renderer.getRenderOutput();
    let expectedElement = <div><Label name="John" /></div>;
    expect(actualElement).toEqual(expectedElement);
  });
});
```

## 测试行为

```javascript
import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';

class Label extends React.Component {
  render() {
    return <span>Hello {this.props.name}</span>;
  }
}

class Button extends React.Component {
  render() {
    return <div onClick={this.props.click}><Label name={this.props.name} /></div>;
  }
}

describe('Shallow rendering on* handlers', () => {
  it('works', () => {
    let renderer = createRenderer();
    let hasClicked = false;
    let click = () => hasClicked = true;
    renderer.render(<Button name="John" click={click} />);
    renderer.getRenderOutput().props.onClick();
    expect(hasClicked).toBe(true);
  });
});
```

## 参考链接

- Vincent Voyer, [Our journey through React component unit testing](http://slides.com/vvo/react-component-unit-testing/)
- Marcin Grzywaczewski, [Approaches to testing React components - an overview](http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/)
