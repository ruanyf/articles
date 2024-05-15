# Bulma 框架

## class 名字

（1）实体类：button

（2）颜色类（6个）

- is-primary（绿）
- is-link（深蓝）
- is-info（浅蓝）
- is-success（绿）
- is-warning（黄）
- is-danger（红）

（3）尺寸类（3个）

- is-small
- is-medium
- is-large

（4）其他

- is-outlined
- is-loading
- is-inverted
- is-link
- [disabled]

## bulma 模块

（1）基础模块

- @use "bulma/sass/base";
- @use "bulma/sass/themes";

（2）元素模块

- @use "bulma/sass/elements/button";
- @use "bulma/sass/elements/title";

（3）组件模块

- @use "bulma/sass/components/message";

（4）布局模块

- @use "bulma/sass/grid/columns";

## 布局

基本布局

```html
<div class="columns">
  <div class="column">1</div>
  <div class="column">2</div>
  <div class="column">3</div>
  <div class="column">4</div>
  <div class="column">5</div>
</div>
```

columns 在手机上默认垂直堆叠。

响应式布局的5个断点类。

- mobile: up to 768px
- tablet: from 769px
- desktop: from 1024px
- widescreen: from 1216px
- fullhd: from 1408px

针对设备宽度的3个区间类

- tablet-only：Between 769px and 1023px
- desktop-only：Between 1024px and 1215px
- widescreen-only：Between 1216px and 1407px

其他类

- touch：below 1024px
- until-widescreen：below 1216px
- until-fullhd：below 1408px

## Element

- block
- box
- button，buttons
- content
- delete
- icon，icon-text
- image
- notification 
- progress
- table
- tag，tags
- title，subtitle

## Component

- breadcrumb
- card
- dropdown
- menu
- message
- modal，modal-card
- navbar，navbar-dropdown
- Pagination
- Panel
- Tabs

## form

- field
- label
- control
- help
- 