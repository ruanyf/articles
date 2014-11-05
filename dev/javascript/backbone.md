# Backbone.js的用法


## 事件接口

Backbone.js通过事件，达到各个函数之间的通信。

发布者是发布事件的对象，监听者是监听事件的对象，它们都必须部署事件接口。

监听者可以使用listenTo方法，监听发布者。

```javascript
subscriber.listenTo(publisher,eventname,callback);
```

发布者通过trigger方法触发指定事件。

```javascript
publisher.trigger(eventname,data1,data2);
```

事件一旦触发，监听者指定的回调函数立刻运行。

```javascript
callback(data1,data2);
```