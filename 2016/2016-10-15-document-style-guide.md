# 中文技术文档的写作规范

很多人说，不知道怎么写文档，都是凭着感觉写。

网上也很少有资料，教你写文档。这已经影响了中文软件的发展。

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016101801.jpg)

英语世界里，文档非常受重视，许多公司和组织都有自己的文档规范，清楚地规定写作要求，比如[微软](https://www.microsoftpressstore.com/store/microsoft-manual-of-style-9780735648715)、[MailChimp](http://styleguide.mailchimp.com/)、[Apple](https://help.apple.com/asg/mac/2013/ASG_2013.pdf)、[Yahoo](https://www.amazon.com/dp/B003P8QDFU/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1)、[docker](https://docs.docker.com/opensource/doc-style/)、[Struts](https://struts.apache.org/docs/documentation-style-guide.html) 等等（维基百科有一份完整的[清单](https://en.wikipedia.org/wiki/List_of_style_guides)）。[中文的](https://github.com/ruanyf/document-style-guide/blob/master/docs/reference.md)也有不少，但都不令人满意，要么太简单，要么不太适用。

我就动手，参考上面的规范，也结合自己的实践，总结了一份简单的[《中文技术文档的写作规范》](https://github.com/ruanyf/document-style-guide)。

> 1. [标题](https://github.com/ruanyf/document-style-guide/blob/master/docs/title.md)
1. [文本](https://github.com/ruanyf/document-style-guide/blob/master/docs/text.md)
1. [段落](https://github.com/ruanyf/document-style-guide/blob/master/docs/paragraph.md)
1. [数值](https://github.com/ruanyf/document-style-guide/blob/master/docs/number.md)
1. [标点符号](https://github.com/ruanyf/document-style-guide/blob/master/docs/marks.md)
1. [章节结构](https://github.com/ruanyf/document-style-guide/blob/master/docs/structure.md)

我希望，这样可以抛砖引玉，让更多人重视文档，进而真正出现大家普遍接受的文档规范。

下面是关于写作风格的一个片段。欢迎提交 [Issue](https://github.com/ruanyf/document-style-guide/issues) 和 [PR](https://github.com/ruanyf/document-style-guide/pulls) 补充。

=================================

## 写作风格

（摘自[《中文技术文档的写作规范》](https://github.com/ruanyf/document-style-guide)）

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016101802.jpg)

如果使用了被动语态，应考虑更改为主动语态。

```
错误：假如此软件尚未被安装，

正确：假如尚未安装这个软件，
```

不使用非正式的语言风格。

```
错误：Lady Gaga 的演唱会真是酷毙了，从没看过这么给力的表演！！！

正确：无法参加本次活动，我深感遗憾。
```

用对“的”、“地”、“得”。

```
她露出了开心的笑容。
（形容词＋的＋名词）

她开心地笑了。
（副词＋地＋动词）

她笑得很开心。
（动词＋得＋副词）
```

使用代词时（比如“其”、“该”、“此”、“这”等词），必须明确指代的内容，保证只有一个含义。

```
错误：从管理系统可以监视中继系统和受其直接控制的分配系统。

正确：从管理系统可以监视两个系统：中继系统和受中继系统直接控制的分配系统。
```

名词前不要使用过多的形式词。

```
错误：此设备的使用必须在接受过本公司举办的正式的设备培训的技师的指导下进行。

正确：此设备必须在技师的指导下使用，且指导技师必须接受过由本公司举办的正式设备培训。
```

句子的长度尽量保持在20个字以内；20～29个字的句子，可以接受；39～39个字的句子，语义必须明确，才能接受；多于40个字的句子，在任何情况下都不能接受。

```
错误：本产品适用于从由一台服务器进行动作控制的单一节点结构到由多台服务器进行动作控制的并行处理程序结构等多种体系结构。

正确：本产品适用于多种体系结构。无论是由一台服务器（单一节点结构），还是由多台服务器（并行处理结构）进行动作控制，均可以使用本产品。
```

同样一个意思，尽量使用肯定句表达，不使用否定句表达。

```
错误：请确认没有接通装置的电源。

正确：请确认装置的电源已关闭。
```

避免使用双重否定句。

```
错误：没有删除权限的用户，不能删除此文件。

正确：用户必须拥有删除权限，才能删除此文件。
```

（正文完）

====================================

下面是推广时间。

今天推广的主角是[“海棠学院”](http://apeclass.cn/)，一个前端开发的在线教育平台。

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016101501.jpg)

创始人小河就是培训班出身，通过自身努力进入百度，深知自学者的苦恼：企业不愿意要培训班出来的学生，而学生不知道应该选哪一家培训机构。他创业的时候，立志要做一家靠谱的、有信誉、有口碑的在线教育公司。

“海棠学院”的很多讲师都有百度背景，开发过用户上亿的产品。为了做出最容易学会的课程，他们反复尝试，不惜放弃已经录好的500多个课时，推倒重来。功夫不负有心人，“海棠学院”现在已经取得了很好的成绩。

> - 两门免费课在腾讯课题排名[第一](https://ke.qq.com/course/149980)和[第三](https://ke.qq.com/course/151317)，已经稳定了两个月。
- 在[网易云课堂](http://study.163.com/course/courseMain.htm?courseId=1003225036)，[百度传课](http://www.chuanke.com/v7521771-188496-1055254.html)等平台也是名列前茅。
- 区别于别家，他们免费课的评价与报名人数真真实实，没有水分。

更难得的是，“海棠学院”是工程师的创业项目，甚至都没有市场销售人员，完全靠用户的口碑来推广。如果课程质量不好，他们马上就完蛋了。

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016101502.jpg)

现在，为了发展更多的用户，也是因为对课程很有信心，他们搞了一个[活动](http://apeclass.cn/99/index.html)，抛弃 “先付费、再学习” 的模式，让用户零成本体验他们提供高质量培训。

> 1. 只需要缴纳 99 元，即可感受海棠学院一周的课程，与正式学员享受一模一样的待遇（录播+直播+教学监管+技术辅导）。
1. 一周后，如果觉得不满意，99 元可以退款。
1. 如果想继续学下去，已经缴纳的 99 元可以抵扣学费，并且学费还可以再优惠 900 元。也就是说，参加这个活动比起直接报名，可以一共节省 999 元的学费。
1. **我的读者还可以使用独家优惠码"ruanyifeng"，学费再抵扣 300 元。**

整个课程一共需要 4.5 个月左右，涉及前端开发的各个方面，目标是通过一次系统的培训，你就能从事前端开发这项工作。遇到不懂的地方，可以重学，他们保证让你学会。

想从事前端开发，却不知道从何学起的朋友，不要错过这个机会。只需99元，就可以感受一下专业级、全方位的培训服务，如果不满意，99元还可以退款。

这个活动10月31日截止，因为当天就开课了，后面就恢复原价了。现在 就点击[这里](http://apeclass.cn/99/index.html)了解详情吧。

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016101503.jpg)

（完）
