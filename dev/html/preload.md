# preload

某些情况下，你需要浏览器预加载某些资源，也就是先把资源缓存下来，等到使用的时候，就不用再从网上下载了，立即就能使用。预加载指令可以做到这一点。

```html
<link rel="preload">
```

注意，区分这个命令与`prefetch`命令。

```html
<link rel="prefetch">
```

`prefetch`主要用于缓存浏览器下一轮循环需要用到的资源，而`preload`用于缓存当前循环需要用到的资源，而且下载是立即开始的，即优先级较高。

另外，`preload`还有两个优点：一是允许指定预加载资源的类型，二是允许`onload`事件的回调函数。不过，`preload`的`onload`事件不会阻塞浏览器的`onload`事件，除非页面中显式指定加载这个资源。

它的主要用途就是，加载那些浏览器稍后会用到的资源，比如JavaScript脚本和CSS样式表里面加载的资源。

它的格式如下。

```html
<link rel="preload" href="late_discovered_thing.js" as="script">
```

下面是预加载字体文件的写法。

```html
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

`as`属性指定加载资源的类型，主要有以下几种。

- "script"
- "style"
- "image"
- "media"
- "document"

如果不指定`as`属性，或者它的值是浏览器不认识的，那么浏览器会以较低的优先级下载这个资源。

`preload`命令也可以使用JavaScript操作。

```javascript
var preload = document.createElement("link");
link.href = "myscript.js";
link.rel = "preload";
link.as = "script";
document.head.appendChild(link);
```

注意，预加载的JavaScript脚本并不会执行，只是缓存了。真正使用的时候，还要再加载一次。

```javascript
var script = document.createElement("script");
script.src = "myscript.js";
document.body.appendChild(script);
```

为了解决加载两次的问题，有人提出了一个很酷的写法。

```html
<link rel="preload" as="style" href="async_style.css" onload="this.rel='stylesheet'">
```

下面代码中，`onload`指定的回调函数会在脚本下载完成后执行，立即插入页面。

插入JavaScript脚本的一行式写法如下。

```html
<link rel="preload" as="script" href="async_script.js"
onload="var script = document.createElement('script');
        script.src = this.href;
        document.body.appendChild(script);">
```

`preload`命令还支持条件加载。

```html
<link rel="preload" as="image" href="map.png" media="(max-width: 600px)">

<link rel="preload" as="script" href="map.js" media="(min-width: 601px)">
```

上面代码中，如果屏幕宽度在600像素以下，则只加载第一个资源，否则就加载第二个资源。
