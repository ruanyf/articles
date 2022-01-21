# namespace

namespace 用来定一个名称空间，其内部的所有变量和函数，都必须在这个名称空间里面使用。

```typescript
namespace Utility {
    export function log(msg) {
        console.log(msg);
    }
    export function error(msg) {
        console.error(msg);
    }
}

// usage
Utility.log('Call me');
Utility.error('maybe!');
```

它转换后的 JavaScript 代码如下。

```typescript
(function (Utility) {

// Add stuff to Utility

})(Utility || (Utility = {}));
```

也就是说，namespace 其实相当于 JavaScript 的一个对象，内部的变量是对象的属性，内部的方法是对象的方法。

namespace 可以嵌套，比如`Utility.Messaging`可以表示名称空间 Utility 下面，还有一个子名称空间 Messaging。

namespace 与模块的作用是一致的，区别是一个文件只能有一个模块，但是可以有多个 namespace。完全可以把模块，看成单个的 namespace，所以 namespace 的用处并不是很大。而且，模块是 JavaScript 的合法语法，namespace 是 TypeScript 添加的语法，编译时必须进行转换，所以建议总是使用模块，替代 namespace。
