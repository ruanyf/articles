# 中文字体网页开发指南

字体的选择，是网页开发的关键因素之一。

合适的字体，对网页的美观度（或可读性）有着举足轻重的影响。

![](http://image.beekka.com/blog/2014/bg2014071502.jpg)

![](http://image.beekka.com/blog/2014/bg2014071503.jpg)

![](http://image.beekka.com/blog/2014/bg2014071504.gif)

但是，相比[英文字体](http://www.ruanyifeng.com/blog/2008/06/typography_notes.html)，中文字体的网页开发有着极大的局限性。因为，一套中文字体最少也要有几千个字符，体积为几个MB；单单为了浏览网页，开发者不可能让用户去下载字体，只能依靠操作系统的预装字体。（*注：确实有[网站](http://cn.justfont.com/)提供中文字体的web服务，从技术角度，我认为这样做不可取。）

不同的操作系统、不同的版本预装不同的字体（因为版权），几乎没有交集。因此，大多数开发者索性忽略中文字体，让操作系统自行渲染，或者用图片呈现字体效果。

下面是目前中文字体的最佳实践，主要参考了[Kendra Schaefer](http://www.kendraschaefer.com/2012/06/chinese-standard-web-fonts-the-ultimate-guide-to-css-font-family-declarations-for-web-design-in-simplified-chinese/)的文章。

## 一、操作系统的预装字体

操作系统决定了开发者可以使用的字体。所以，第一步，我们必须了解操作系统到底提供哪些字体。

Windows操作系统：

- 黑体：SimHei
- 宋体：SimSun
- 新宋体：NSimSun
- 仿宋：FangSong
- 楷体：KaiTi
- 仿宋_GB2312：FangSong_GB2312
- 楷体_GB2312：KaiTi_GB2312
- 微软雅黑：Microsoft YaHei （Windows 7开始提供）

OS X操作系统：

- 冬青黑体: Hiragino Sans GB （SNOW LEOPARD开始提供）
- 华文细黑：STHeiti Light （又名STXihei）
- 华文黑体：STHeiti
- 华文楷体：STKaiti
- 华文宋体：STSong
- 华文仿宋：STFangsong

如果用户装了MicroSoft Office，还会多出一些字体。

- 隶书：LiSu
- 幼圆：YouYuan
- 华文细黑：STXihei
- 华文楷体：STKaiti
- 华文宋体：STSong
- 华文中宋：STZhongsong
- 华文仿宋：STFangsong
- 方正舒体：FZShuTi
- 方正姚体：FZYaoti
- 华文彩云：STCaiyun
- 华文琥珀：STHupo
- 华文隶书：STLiti
- 华文行楷：STXingkai
- 华文新魏：STXinwei

## 二、font-family命令

CSS的font-family命令，指定了网页元素所使用的字体。下面是一个例子。

```css

font-family: Georgia, "Times New Roman", "Microsoft YaHei", "微软雅黑", STXihei, "华文细黑", serif;

```

它的规则有三条。

> （1）优先使用排在前面的字体。
> 
> （2）如果找不到该种字体，或者该种字体不包括所要渲染的文字，则使用下一种字体。
> 
> （3）如果所列出的字体，都无法满足需要，则让操作系统自行决定使用哪种字体。

**根据这些规则，font-family应该优先指定英文字体，然后再指定中文字体。**否则，中文字体所包含的英文字母，会取代英文字体，这往往很丑陋。

![](http://image.beekka.com/blog/2014/bg2014071507.jpg)

上面图片中，红框内的英文字母，左边采用英文字体渲染，右边采用中文字体渲染，哪一种效果比较好，一目了然。

**为了保证兼容性，中文字体的中文名称和英文名称，应该都写入font-family。**比如，“微软雅虎”的英文名称是Microsoft YaHei。

此外，中文字体的中文名称，以及由多个单词组成的英文名称，应该放在双引号内。

## 三、 Windows平台和Mac平台

由于Windows和Mac的中文字体没有交叉，所以应该同时为两个平台指定字体。

常见的做法是，Windows平台指定“微软雅黑”（Microsoft YaHei），Mac平台指定“华文细黑”（STXihei）。 

## 四、衬线体和无衬线体

所谓“衬线体”（Serif），指的是笔画的末端带有衬线的字体。

就像英文字体一样，中文字体也可以分成“衬线体”和“无衬线体”（San-serif）。比如，对于繁体字来说，微软正黑（Microsoft JhengHei）是无衬线体，新细名体（PMingLiU）是衬线体。

![](http://image.beekka.com/blog/2014/bg2014071506.jpg)

对于简体字来说，微软雅黑（Microsoft yahei）是无衬线体，宋体（SimSun）是衬线体。

![](http://image.beekka.com/blog/2014/bg2014071508.jpg)

一般来说，衬线体装饰性强，往往用于标题；无衬线体清晰度好，往往用于正文。

## 五、几种常见中文字体

**（1）宋体（SimSun）**

最常见的中文字体，如果没有指定字体，操作系统往往选择它来渲染。很多人认为，这种字体并不美观。

![](http://image.beekka.com/blog/2014/bg2014071509.jpg)

**（2）微软雅黑（Microsoft YaHei）**

微软雅黑的美观度和清晰度都较好，可以作为网页的首选字体。它在Mac平台的对应字体是华文细黑（STXihei）。

但是，Windows XP没有预装这种字体，这时操作系统往往会选择黑体（Simhei）取代。

![](http://image.beekka.com/blog/2014/bg2014071510.jpg)

**（3）仿宋（FangSong）**

这种字体是衬线体，比宋体的装饰性更强。如果字号太小，会影响清晰度，所以只有在字号大于14px的情况下，才可以考虑这种字体。

它在Mac平台的对应字体是“华文仿宋”（STFangsong）。

![](http://image.beekka.com/blog/2014/bg2014071511.jpg)

**（4）楷体（KaiTi）**

楷体也是衬线体，装饰性与仿宋体接近，但是宽度更大，笔画更清楚一些。这种字体也不应该在小于14px的情况下使用。

它在Mac平台的对应字体是“华文楷体”（STKaiti）。

![](http://image.beekka.com/blog/2014/bg2014071512.jpg)

（完）




