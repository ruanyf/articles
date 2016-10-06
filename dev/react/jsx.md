# JSX 语法

## 概述

组件的最外层，只能有一个标签。因为，一个组件就相当于调用一个构造函数，如果有多个标签，就变成一个组件对应多个构造函数了。

组件的标签一定要闭合。只要有开标签，就一定要有闭标签，比如`<div>`一定要有对应的`</div>`。没有子元素的标签，必须写成自闭合形式（比如`<img/>`），如果写成单个的`<img>`就会报错。

JSX会对HTML字符串转义。如果不希望被转义，可以采用下面的写法。

```javascript
<div dangerouslySetInnerHTML={{__html: 'cc &copy; 2015'}} />
```

## 注释

JSX的注释，采用`/* ... */`的形式。

在子组件的位置，注释必须放入大括号。

```javascript
const App = <div> {/* 这是注释 */} </div>;
```

在属性的位置，也可以放置注释。

```javascript
<Person
  /* 多行
  注释 */
  name={name}
/>
```

## 属性

属性有三种写法。

```javascript
// 写法一
const component = <Component name={name} value={value} />;

// 写法二
const component = <Component />;
component.props.name = name;
component.props.value = value;

// 写法三
const data = { name: 'foo', value: 'bar' };
const component = <Component {...data} />;
```

组件的属性，基本上与HTML语言定义的属性名一致。但是，下面两个属性名因为是JavaScript关键字，因此改用下面的名字。

- `class`：改为`className`
- `for`：改为`htmlFor`

如果要向原生组件提供自定义属性，要写成`data-`前缀。

```javascript
<div data-attr="xxx">content</div>
```
