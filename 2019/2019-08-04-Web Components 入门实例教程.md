# Web Components 入门实例教程

组件是前端的发展方向，现在流行的 React 和 Vue 都是组件框架。

谷歌一直在推动浏览器的原生组件，即 Web Components API。相比第三方框架，这个 API 简单直接，符合直觉，不用加载任何外部模块，代码量小。目前，它还在不断发展，但已经可用于生产环境。

本文不是全面的教程，只能算 Web Component 的一个简单演示，让大家看一下怎么用它开发组件。

## 一、自定义元素

下图是一个用户卡片。

![](https://www.wangbase.com/blogimg/asset/201908/bg2019080405.jpg)

为了方便复用，把它做成组件。

```html
<user-card></user-card>
```

网页插入上面的代码，就会显示用户卡片。本文就演示这个组件的实现。

`<user-card>`这种用户自定义的 HTML 标签，称为自定义元素（custom element）。

根据规范，自定义元素的名称必须包含连词线，用来区别原生元素。所以，`<user-card>`不能写成`<usercard>`。

## 二、`customElements.define()`

自定义元素的特征和行为，需要开发者自己定义。首先，使用 JavaScript 定义一个类，所有`<user-card>`都会是这个类的实例。

```javascript
class UserCard extends HTMLElement {
  constructor() {
    super();
  }
}
```

上面代码中，`UserCard`就是自定义元素的类。注意，这个类的父类是`HTMLElement`，因此继承了 HTML 元素的特性。

接着，使用`customElements.define()`方法，告诉浏览器`<user-card>`标签与这个类关联。这个方法是浏览器原生提供的。

```javascript
window.customElements.define('user-card', UserCard);
```

目前为止，完整的代码是下面这样。

```html
<body>
  <user-card></user-card>
  <script>
    class UserCard extends HTMLElement {
      constructor() {
        super();
      }
    }
    window.customElements.define('user-card', UserCard);    
  </script>
</body>
```

## 三、自定义元素的内容

自定义元素`<user-card>`目前还是空的，下面在类里面给出这个元素的内容。

```javascript
class UserCard extends HTMLElement {
  constructor() {
    super();
    
    var image = document.createElement('img');
    image.src = 'https://semantic-ui.com/images/avatar2/large/kristy.png';
    image.classList.add('image');

    var container = document.createElement('div');
    container.classList.add('container');

    var name = document.createElement('p');
    name.classList.add('name');
    name.innerText = 'User Name';

    var email = document.createElement('p');
    email.classList.add('email');
    email.innerText = 'yourmail@some-email.com';

    var button = document.createElement('button');
    button.classList.add('button');
    button.innerText = 'Follow';

    container.append(name, email, button);
    this.append(image, container);
  }
}
```

上面代码中，构造函数内部的`this`代表自定义元素实例本身。

完成这一步以后，自定义元素内部的 DOM 结构就已经生成了。

## 四、`<template>`标签

使用 JavaScript 写上一节的 DOM 结构很麻烦，好在 Web Components API 提供了`<template>`标签，可以在它里面使用 HTML 定义 DOM。

```html
<template id="userCardTemplate">
  <img src="https://semantic-ui.com/images/avatar2/large/kristy.png" class="image">
  <div class="container">
    <p class="name">User Name</p>
    <p class="email">yourmail@some-email.com</p>
    <button class="button">Follow</button>
  </div>
</template>
```

然后，改写一下自定义元素的类，为自定义元素加载`<template>`。

```javascript
class UserCard extends HTMLElement {
  constructor() {
    super();
    
    var templateElem = document.getElementById('userCardTemplate');
    var content = templateElem.content.cloneNode(true);
    this.appendChild(content);
  }
}  
```

上面代码中，获取`<template>`节点以后，克隆了它的所有子元素，这是因为可能有多个自定义元素的实例，这个模板还要留给其他实例使用，所以不能直接移动它的子元素。

到这一步为止，完整的代码如下。

```html
<body>
  <user-card></user-card>
  <template>...</template>
  
  <script>
    class UserCard extends HTMLElement {
      constructor() {
        super();
        
        var templateElem = document.getElementById('userCardTemplate');
        var content = templateElem.content.cloneNode(true);
        this.appendChild(content);
      }
    }
    window.customElements.define('user-card', UserCard);    
  </script>
</body>
```

## 五、添加样式

自定义元素还没有添加样式，可以给它指定全局样式。

```css
user-card {
    display: flex;
    align-items: center;
    width: 450px;
    height: 180px;
    background-color: #d4d4d4;
    border: 1px solid #d5d5d5;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

user-card > .image {
    flex: 0 0 auto;
    width: 160px;
    height: 160px;
    vertical-align: middle;
    border-radius: 5px;
}

user-card > .container {
    box-sizing: border-box;
    padding: 20px;
    height: 160px;
}

user-card > .container > .name {
    font-size: 20px;
    font-weight: 600;
    line-height: 1;
    margin: 0;
    margin-bottom: 5px;
}

user-card > .container > .email {
    font-size: 12px;
    opacity: 0.75;
    line-height: 1;
    margin: 0;
    margin-bottom: 15px;
}

user-card > .container > .button {
    padding: 10px 25px;
    font-size: 12px;
    border-radius: 5px;
    text-transform: uppercase;
}
```

但是，作为组件，希望样式与代码封装在一起，因此可以把样式写在`<template>`里面。这样的好处是，样式只对自定义元素生效，不影响外部的全局样式。

```html
<template id="userCardTemplate">
  <style>
   :host {
     display: flex;
     align-items: center;
     width: 450px;
     height: 180px;
     background-color: #d4d4d4;
     border: 1px solid #d5d5d5;
     box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
     border-radius: 3px;
     overflow: hidden;
     padding: 10px;
     box-sizing: border-box;
     font-family: 'Poppins', sans-serif;
   }
   .image {
     flex: 0 0 auto;
     width: 160px;
     height: 160px;
     vertical-align: middle;
     border-radius: 5px;
   }
   .container {
     box-sizing: border-box;
     padding: 20px;
     height: 160px;
   }
   .container > .name {
     font-size: 20px;
     font-weight: 600;
     line-height: 1;
     margin: 0;
     margin-bottom: 5px;
   }
   .container > .email {
     font-size: 12px;
     opacity: 0.75;
     line-height: 1;
     margin: 0;
     margin-bottom: 15px;
   }
   .container > .button {
     padding: 10px 25px;
     font-size: 12px;
     border-radius: 5px;
     text-transform: uppercase;
   }
  </style>

  <img src="https://semantic-ui.com/images/avatar2/large/kristy.png" class="image">
  <div class="container">
    <p class="name">User Name</p>
    <p class="email">yourmail@some-email.com</p>
    <button class="button">Follow</button>
  </div>
</template>
```

上面代码中，`<template>`样式里面的`:host`伪类，指代自定义元素本身。

## 六、自定义元素的参数

`<user-card>`内容现在是给定的，为了方便使用，把它改成参数。

```html
<user-card
  image="https://semantic-ui.com/images/avatar2/large/kristy.png"
  name="User Name"
  email="yourmail@some-email.com"
></user-card>
```

`<template>`代码也相应改造。

```html
<template id="userCardTemplate">
  <style>...</style>
  
  <img class="image">
  <div class="container">
    <p class="name"></p>
    <p class="email"></p>
    <button class="button">Follow John</button>
  </div>
</template>
```

最后，改一下类的代码，把参数加到自定义元素里面。

```javascript
class UserCard extends HTMLElement {
  constructor() {
    super();
       
    var templateElem = document.getElementById('userCardTemplate');
    var content = templateElem.content.cloneNode(true);
    content.querySelector('img').setAttribute('src', this.getAttribute('image'));
    content.querySelector('.container>.name').innerText = this.getAttribute('name');
    content.querySelector('.container>.email').innerText = this.getAttribute('email');
    this.appendChild(content);
  }
}
window.customElements.define('user-card', UserCard);    
```

## 七、Shadow DOM

我们不希望用户能够看到`<user-card>`的内部代码，Web Component 允许内部代码隐藏起来，这叫做 Shadow DOM，即这部分 DOM 默认是隐藏的，开发者工具里面看不到。

自定义元素的`this.attachShadow()`方法开启 Shadow DOM，详见下面的代码。

```javascript
class UserCard extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow( { mode: 'closed' } );
    
    var templateElem = document.getElementById('userCardTemplate');
    var content = templateElem.content.cloneNode(true);
    content.querySelector('img').setAttribute('src', this.getAttribute('image'));
    content.querySelector('.container>.name').innerText = this.getAttribute('name');
    content.querySelector('.container>.email').innerText = this.getAttribute('email');

    shadow.appendChild(content);
  }
}
window.customElements.define('user-card', UserCard);
```

上面代码中，`this.attachShadow()`方法的参数`{ mode: 'closed' } `，表示 Shadow DOM 是封闭的，不允许外部访问。

至此，这个 Web Component 组件就完成了，完整代码可以访问[这里](https://glitch.com/edit/#!/user-card-demo?path=index.html:15:55)，可以看到还是很简单的，API 非常直接，不像第三方框架那样有复杂的 API。

## 八、参考链接

- [The anatomy of Web Components](https://itnext.io/the-anatomy-of-web-components-d6afedb81b37), Uday Hiwarale

（完）



