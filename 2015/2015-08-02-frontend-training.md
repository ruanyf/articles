# 从零开始学前端

## 什么是前端？

这个课程是前端开发培训，首先要知道，什么是前端？

网页是服务器发送的，但用户在浏览器里打开。因此，网站开发可以分成两部分：服务器端编程和浏览器端编程。

**传统上，针对浏览器的编程，称为前端开发。**

当然，前端的含义现在大大扩展，移动端编程和Node.js的编程，往往也算入前端，但我们这个课程只教浏览器编程。

## 前端的组成

用户在浏览器里看到的，只是一张网页。但是实际上，他同时消费了三样东西。

> - 内容：文字、图片、视频等等
> - 排版：网页的外观样式
> - 互动：对网页的操控，比如检查表单

前端开发就是由这三个部分组成，每个部分都对应一项专门的技术。

> - HTML：结构化文档，提供网页内容
> - CSS：样式表，负责网页外观
> - JavaScript：浏览器脚本，负责控制浏览器的行为

浏览器将这三样东西合在一起，就构成了用户看到的网页。

我们这个课程就是要教会大家这三项技术。

## 浏览器的工作原理

虽然浏览器是非常复杂的软件，但是用起来很简单。

> 1. 用户在地址栏键入网址，或者点击网页上的链接
> 2. 浏览器向服务器发出请求
> 3. 服务器向浏览器发送回应
> 4. 浏览器将服务器送来的HTML文档、CSS样式表、JavaScript脚本，合并成一张网页，显示给用户 

看明白了吗？前端开发只要准备好HTML文档、CSS样式表、JavaScript脚本这三样东西，将它们放在服务器上，浏览器能够取得，就可以了。

## 浏览器的工作过程

虽然HTML文档、CSS样式表、JavaScript脚本这些名字听上去很专业，实际上它们都是最普通的文本文件。任何一种文字编辑器，都可以编写。

那么，文本文件怎么就变成了网页呢？这个可就复杂了。

**（1）第一阶段：HTML文档解析**

收到服务器发送的HTML文档后，浏览器在内存中，将HTML文档拆分成一个树状结构，称为DOM树。

**（2）第二阶段：CSS渲染**

浏览器发现，DOM树的某些节点是CSS样式表或JavaScript脚本，于是向服务器请求这两样东西。

收到CSS样式表之后，浏览器将其解析成各种样式规则，套用到指定的DOM节点上，让它们具有视觉外观。这个过程称为”渲染“（rendering）。

![](http://www.html5rocks.com/en/tutorials/internals/howbrowserswork/webkitflow.png)

**（3）第三阶段：脚本执行**

收到JavaScript脚本之后，浏览器会立刻运行这个脚本，对网页进行各种处理。

经过这三个阶段，浏览器将最终生成的网页，显示给用户，用户开始浏览。

没看懂这个过程？没关系，后面的课程，这些东西都会详细讲解的。

## 复习材料

好了，第一讲就到这里为止。

下周开始，我们会辅导大家，动手开发一张真实的网页。请大家回去以后，找时间学习下面的内容。

学习材料

- [浏览器如何工作？](http://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
- [蚂蚁体验技术学院的视频](http://atit.alipay.net/index.php?r=themeDetail/newIndex&id=198)

第一课

- [Web概述](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=824)
- [HTML基础](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=824)
- [学习HTML](http://xue.alibaba-inc.com/trs/mediaDetail.htm?spm=0.0.0.0.zQTjKE&mediaUid=3d390552-b301-4af2-a0df-5c56eb2f6133)
- [前端工具：PS及图片处理](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=815)
- [前端工具：调试工具](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=812)

第二课

- [CSS基础概述](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=780)
- [CSS选择器](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=780)
- [CSS属性：布局](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=782)
- [CSS属性：内容](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=783)
- [CSS布局实战](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=818)
- [学习CSS](http://xue.alibaba-inc.com/trs/mediaDetail.htm?spm=0.0.0.0.jWocwm&mediaUid=a2e19a1e-1a40-42e0-9383-d9eca8854f17)

第三课

- [JavaScript基础](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=809)
- [JavaScript进阶](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=811)
- [jQuery与DOM编程](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=817)

第四课

- [JavaScript实战](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=810)
- [CSS进阶](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=808)

第五周

- [前端工具：构建](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=814)
- [uisvr使用指南](http://atit.alipay.net/index.php?r=courseDetail/index&courseid=823)

（完）
