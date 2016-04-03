# 静态方法

## React.createElement

`React.createElement`方法用来生成一个React组件实例。它的第一个参数是React组件类，第二个参数是一个对象，表示生成实例的参数。

```javascript
React.createElement(Layout, {
  title: 'React Static Site',
  children: 'Hello World'
});
```

## ReactDOMServer.renderToString

`react-dom/server`模块`renderToString`方法，用来将一个React组件转成HTML字符串，一般用于服务器渲染。

如果`ReactDOM.render()`在一个已经完成服务器渲染的DOM节点上面挂载React组件，那么该组件不会挂载，只会添加事件监听到这个DOM节点。

## ReactDOMServer.renderToStaticMarkup

`ReactDOMServer.renderToStaticMarkup`方法与`renderToString`方法非常像，除了不会生成React专用的一些属性，比如`data-react-id`。
