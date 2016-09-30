# 常用组件

## 对话框

显示屏幕居中的对话框。

```html
<div id="dialog">
  <p>I am the dialog's content</p>
  <button type="button">close dialog</button>
</div>
```

```css
#dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 200px;
  transform: translate3d(-50%,-50%,0);
  background: white;
  border: 100% solid rgba(0, 0, 0, 2.5);
}

#dialog:before {
  content: "";
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 999;

  /* fade in */
  transition: opacity 0.2s ease-in-out;
}

#dialog[hidden] {
  /*
    [hidden] usually sets display:none, which we
    need to revert in order to allow animations
  */
  display: block;
  /*
    actually hide the element,
    making its contents unaccessible
  */
  visibility: hidden;
  /*
    make sure the element is out of viewport
  */
  transform: translate3d(0px, -1px, 0px) scale(0);
  /*
    delay transform until animations are done
  */
  transition:
    visibility 0s linear 0.2s,
    transform 0s linear 0.2s;
}
```

## 参考链接

- [Accessible dialog tutorial](https://allyjs.io/tutorials/accessible-dialog.html)
