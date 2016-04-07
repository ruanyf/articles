# XSS攻击

XSS攻击（Cross-site scripting）通常指的是通过利用网页开发时留下的漏洞，通过巧妙的方法注入恶意指令代码到网页，使用户加载并执行攻击者恶意制造的网页程序。这些恶意网页程序通常是JavaScript，但实际上也可以包括Java，VBScript，ActiveX，Flash或者甚至是普通的HTML。攻击成功后，攻击者可能得到更高的权限（如执行一些操作）、私密网页内容、会话和cookie等各种内容。

## 同源政策

JavaScript 脚本最大的作用是操作浏览器，但是为了安全，浏览器对脚本行为做了很多限制。

其中，最重要的限制就是”同源政策“（same-origin policy），这是浏览器安全的基石。很多开发者都知道这一点，但又了解得不全面。

本文详细介绍”同源政策“的各个方面，以及如何规避它的各种方法。

## 一、什么是”同源政策“？

1995年，同源政策由 Netscape 公司引入浏览器。此后，所有其他浏览器都遵守了这种做法。

一开始，同源政策指的是，A网页设置的 Cookie，B网页不能打开，除非这两个网页“同源”。

所谓“同源”指的是”三个相同“。

- 协议相同：如果A网页是HTTP协议，B网页也必须是这个协议
- 域名相同：A和B的一级域名必须相同，二级域名和三级域名也必须相同（如果有的话）
- 端口相同：如果A网页是80端口，B网页也必须是这个端口

比如，A网页是`http://www.example.com/dir/page.html`，那么它的同源情况如下。

- `http://www.example.com/dir2/other.html`：同源
- `http://example.com/dir/other.html`：不同源
- `http://v2.www.example.com/dir/other.html`：不同源
- `http://www.example.com:81/dir/other.html`：不同源

这个政策的目的，主要是为了保证用户信息的安全，防止恶意的网站窃取数据。

请设想这样一种情况，A网页是一个银行网站，用户登录以后，又去浏览其他网站。如果其他网站可以读取A网站的 Cookie，会发生什么？

很显然，如果 Cookie 包含隐私（比如存款总额），这些信息就会泄漏。更可怕的是，Cookie 往往用来保存用户的登录状态，如果用户没有退出登录，其他网站就可以冒充用户，为所欲为。因为浏览器同时还规定，提交表单不受同源政策的限制。

由此可见，”同源政策“是必需的，否则 Cookie 可以共享，互联网就毫无安全可言了。

## 二、同源政策的发展

随着互联网的发展，“同源政策”越来越严格。

目前，如果非同源，共有三种行为受到限制。

（1） Cookie、LocalStorage 和 IndexDB 无法跨域读取。

（2） 其他窗口的DOM，无法跨域获得，典型的是 iframe 窗口和`window.open`打开的窗口。

（3） AJAX 请求不能跨域发送。

虽然这些限制是必要的，但是有时很不方便，合理的用途也无法完成。

下面详细介绍，如何合理规避上面三种限制。

## 三、Cookie

如果只是二级域名不同，浏览器允许通过设置`document.domain`共享 Cookie。

举例来说，A网页是`http://w1.example.com`，B网页是`http://w2.example.com`，那么只要设置相同的`document.domain`，两个网页就可以共享Cookie。

```javascript
document.domain = 'example.com';
```

然后，A网页通过脚本设置一个 Cookie。

```javascript
document.cookie = "test1=hello";
```

B网页就可以读到这个 Cookie。

```javascript
var allCookie = document.cookie;
```

很不幸，LocalStorage 和 IndexDB 无法通过任何方法，规避同源政策。

## 四、iframe

如果两个网页不同源，就无法拿到对方的DOM。典型情况是`iframe`窗口和`window.open`方法打开的窗口，它们与主窗口无法通信。

举例来说，主窗口运行下面的命令，如果`iframe`窗口不是同源，就会报错。

```javascript
document.getElementById("myIFrame").contentWindow.document
// Uncaught DOMException: Blocked a frame from accessing a cross-origin frame.
```

反之亦然，子窗口获取主窗口的DOM也会报错。

```javascript
window.parent.document.body
// 报错
```

如果两个窗口一级域名相同，只是二级域名不同，那么设置上一节介绍的`document.domain`属性，就可以规避同源政策，拿到DOM。

除此之外，目前有三种方法，可以解决跨域窗口的通信问题。

- 片段识别符（fragment identifier）
- window.name
- 跨文档通信API（Cross-document messaging）

## 五、片段识别符

片段标识符（fragment identifier）指的是，URL的`#`号后面的部分，比如`http://example.com/x.html#fragment`的`#fragment`。如果只是改变片段标识符，页面不会重新刷新。

利用这一点，主窗口可以把信息，放在子窗口URL的 fragment identifier 里面，传给子窗口。

```javascript
var src = originURL + '#' + data;
document.getElementById('myIFrame').src = src;
```

子窗口通过监听`hashchange`事件得到通知。

```javascript
window.onhashchange = checkMessage;

function checkMessage() {
  var message = window.location.hash;
  // ...
}
```

同样的，子窗口也可以改变主窗口的 fragment identifier。

```javascript
parent.location.href= target + “#” + hash;
```

## 六、window.name

浏览器窗口有`window.name`属性。这个属性的最大特点是，无论是否同源，只要在同一个窗口里，前一个网页设置了这个属性，后一个网页可以读取它。

主窗口先打开一个不同源的子窗口，然后子窗口将信息写入`window.name`属性。

```javascript
window.name = data;
```

接着，子窗口跳回一个与主窗口同域的网址。

```javascript
location = 'http://parent.url.com/xxx.html';
```

然后，主窗口就可以读取`window.name`了。

```javascript
var data = document.getElementById('myFrame').contentWindow.name;
```

这种方法的优点是，`window.name`容量很大，可以放置非常长的字符串；缺点是必须监听子窗口`window.name`属性的变化，影响网页性能。

## 七、window.postMessage

上面两种方法都属于破解，HTML5为了解决这个问题，引入了一个全新的API：跨文档通信 API（Cross-document messaging）。

父窗口`http://aaa.com`向子窗口`http://bbb.com`发消息。

```javascript
var popup = window.open('http://aaa.com', 'title');
popup.postMessage('Hello World!', 'http://aaa.com');
```

`postMessage`方法的第一个参数是具体的信息内容，第二个参数是指定发送的域名，`*`表示不限制域名，向所有域名发送。

子窗口也可以向主窗口发送 Message。

```javascript
window.opener.postMessage('Nice to see you', 'http://bbb.com');
```

父窗口和子窗口都可以通过`message`事件，监听对方的消息。

```javascript
window.addEventListener('message', function(e) {
  console.log(e.data);
},false);
```

PostMessage API的事件对象`event`，还提供了以下三个属性。

- `event.source`：发送消息的窗口
- `event.origin`: 消息发向的网址
- `event.data`: 消息内容

子窗口回应父窗口发来的消息。

```javascript
window.addEventListener('message', receiveMessage);
function receiveMessage(event) {
  event.source.postMessage('Nice to see you!', '*');
}
```

还是用上面的例子，父窗口`aaa.com`过滤子窗口`bbb.com`发来的消息。

```javascript
window.addEventListener('message', receiveMessage);

function receiveMessage(event) {
  if (event.origin !== 'http://bbb.com') return;
  if (event.data === 'Hello World') {
      event.source.postMessage('Hello', event.origin);
  } else {
    console.log(event.data);
  }
}
```

## 八、LocalStorage

利用PostMessage API，实际可以在两个窗口之间，交换LocalStorage内容。

下面是一个例子，主窗口写入iframe窗口的iframe。

```javascript
window.onmessage = function(e) {
  if (e.origin !== 'http://bbb.com') {
    return;
  }
  var payload = JSON.parse(e.data);
  localStorage.setItem(payload.key, JSON.stringify(payload.data));
};
```

上面代码中，子窗口将父窗口发来的消息，写入LocalStorage。

父窗口发送消息的代码如下。

```javascript
window.onload = function() {
  var win = document.getElementsByTagName('iframe')[0].contentWindow;
  var obj = { name: 'Jack' };
  win.postMessage(JSON.stringify({key: 'storage', data: obj}), 'http://bbb.com');
};
```

加强版的子窗口接收消息的代码如下。

```javascript
window.onmessage = function(e) {
  if (e.origin !== 'http://bbb.com') return;
  var payload = JSON.parse(e.data);
  switch (payload.method) {
    case 'set':
      localStorage.setItem(payload.key, JSON.stringify(payload.data));
      break;
    case 'get':
      var parent = window.parent;
      var data = localStorage.getItem(payload.key);
      parent.postMessage(data, 'http://aaa.com');
      break;
    case 'remove':
      localStorage.removeItem(payload.key);
      break;
  }
};
```

加强版的父窗口发送消息代码。

```javascript
window.onload = function() {
  var win = document.getElementsByTagName('iframe')[0].contentWindow;
  var obj = { name: 'Jack' };
  // 存入对象
  win.postMessage(JSON.stringify({key: 'storage', method: 'set', data: obj}), 'http://bbb.com');
  // 读取对象
  win.postMessage(JSON.stringify({key: 'storage', method: "get"}), "*");
  window.onmessage = function(e) {
    if (e.origin != 'http://aaa.com') return;
    // "Jack"
    console.log(JSON.parse(e.data).name);
  };
};
```

## 八、AJAX

AJAX也有三种方法规避同源政策。

- JSONP
- WebSocket
- CORS

Cross-Origin Resource Sharing

The second technique for relaxing the same-origin policy is standardized under the name Cross-Origin Resource Sharing. This standard extends HTTP with a new Origin request header and a new Access-Control-Allow-Origin response header. It allows servers to use a header to explicitly list origins that may request a file or to use a wildcard and allow a file to be requested by any site.

(3)Cross-document messaging

Another new technique, cross-document messaging allows a script from one page to pass textual messages to a script on another page regardless of the script origins. Calling the postMessage() method on a Window object asynchronously fires an "onmessage" event in that window, triggering any user-defined event handlers. A script in one page still cannot directly access methods or variables in the other page, but they can communicate safely through this message-passing technique.

## AJAX通信限制的规避

（1）JSONP

JSONP allows a page to receive JSON data from a different domain by adding a <script> element to the page which loads a JSON response with a callback from different domain.

http://www.qnimate.com/index.html

```javascript
function dynamicLoad() {
  var script= document.createElement('script');
  script.type= 'text/javascript';
  script.src= 'http://www.qscutter.com/ajaxdata.js';
  document.getElementById("body").appendChild(script);
}

function parseJSON(JSONdata) {
  console.log(JSONdata.name);
}

dynamicLoad();
```

http://www.qscutter.com/ajaxdata.js

parseJSON({"Name": "Narayan Prusty", "Profession": "Programmer"})

（2）CORS

```javascript
    //XMLHttpRequest2 is required for CORS Request
    CROSObject = new XMLHttpRequest();
    //setting this variable to true allows sending and receiving of cokkies.
    CROSObject.withCredentials = true;
    CROSObject.open("GET", "http://www.qscutter.com/ajaxData.php");

    CROSObject.onload = function() {alert(CROSObject.responseText);};
    CROSObject.onerror = function() {alert("There was an error")};

    CROSObject.send();
```

<?php

//Access-Control-Allow-Origin contains the response to be valid for
//requests from specific domain. set it to * for all domains. Its
//a must include header
header("Access-Control-Allow-Origin: http://www.qnimate.com");

//If withCredentials is set to true then this header needs to be
//included otherwise remove this header.
header("Access-Control-Allow-Credentials: true");

//If you want getResponseHeaders() to access other headers rather
//than the basic ones than include this header with the accessiable
//headers names.
header("Access-Control-Expose-Headers: Access-Control-Allow-Credentials, Access-Control-Allow-Origin");

echo "Response text";
?>

WebSockets

Modern browsers will permit a script to connect to  WebSocket address without applying the same-origin policy. However, these browsers recognize when a WebSocket URI is used, and insert an Origin: header into the request that indicates the origin of the script requesting the connection. To ensure cross-site security, the WebSocket server must compare the header data against a whitelist of origins permitted to receive a reply.

Cookie

setcookie("cookiename", "cookievalue", "100000000", "\", "qnimate.com");

Workarounds

To enable developers to, in a controlled manner, circumvent the same-origin policy, a number of "hacks" such as using the fragment identifier（主要用于iframe，主窗口和子窗口通过改变对方的井号标识符通信） or the window.name （一个页面改变窗口的window.name，供另一个页面读取。）property have been used to pass data between documents residing in different domains. With the HTML5 standard, a method was formalized for this: the postMessage interface, which is only available on recent browsers. JSONP can also be used to enable Ajax-like calls to other domains.

```javascript
var localStorageData = window.document.getElementById("myFrame").contentWindow.name;
```

## CORS

CORS是一个W3C标准，允许域名不相同的服务器和客户端之间进行通信。

JSONP只能发GET请求，而CORS允许任何类型的请求。

