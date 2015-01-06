# Angular.js的用法

Angular的典型句法之一。

```html
<div ng-bind=”username” ></div>
```

## 模板

```html

<ul> 
    <li ng-repeat="framework in frameworks" title="{{framework.description}}">               
                  {{framework.name}} 
    </li> 
</ul>

```

## 双向绑定

```html

<input ng-model="user.name" type="text" />
Hello {{user.name}}!

```
