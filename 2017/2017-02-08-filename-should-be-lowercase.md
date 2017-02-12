# 为什么文件名要小写？

上周，[《中文技术文档写作规范》](https://github.com/ruanyf/document-style-guide)加入了文件的命名规则。

> “文件名建议只使用小写字母，不使用大写字母。”
>
> “为了醒目，某些说明文件的文件名，可以使用大写字母，比如`README`、`LICENSE`。”

网友看见了，就[提问](https://github.com/ruanyf/document-style-guide/commit/22db946f22cdce12cde4e264344e8223abfafcd5#commitcomment-20691431)为什么文件名要小写？ 

说实话，虽然这是 Linux 传统，我却从没认真想过原因。赶紧查资料，结果发现四个很有说服力的理由，支持这样做。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017021001.png)

下面就是这四个理由。另外，文后我还会发布一条前端培训的消息。

## 一、可移植性

Linux 系统是大小写敏感的，而 Windows 系统和 Mac 系统正好相反，大小写不敏感。一般来说，这不是大问题。

但是，如果两个文件名只有大小写不同，其他都相同，跨平台就会出问题。

> - `foobar`
> - `Foobar`
> - `FOOBAR`
> - `fOObAr`

上面四个文件名，Windows 系统会把它们都当作`foobar`。如果它们同时存在，你可能没办法打开后面三个文件。

另一方面，在 Mac 系统上开发时，有时会疏忽，写错大小写。

```javascript
// 正确文件名是 MyModule.js
const module = require('./myModule');
```

上面的代码在 Mac 上面可以运行，因为 Mac 认为`MyModule.js`和`myModule.js`是同一个文件。但是，一旦代码到服务器运行就会报错，因为 Linux 系统找不到`myModule.js`。

如果所有的文件名都采用小写，就不会出现上面的问题，可以保证项目有良好的可移植性。

## 二、易读性

小写文件名通常比大写文件名更易读，比如`accessibility.txt`就比`ACCESSIBILITY.TXT`易读。

有人习惯使用[驼峰命名法](http://www.ruanyifeng.com/blog/2007/06/camelcase.html)，单词的第一个字母大写，其他字母小写。这种方法的问题是，如果遇到全部是大写的缩略词，就会不适用。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017021002.jpg)

比如，一个姓李的纽约特警，无论写成`NYPoliceSWATLee`还是`NyPoliceSwatlee`，都怪怪的，还是写成`ny-police-swat-lee`比较容易接受。

## 三、易用性

某些系统会生成一些预置的用户目录，采用首字母大写的目录名。比如，Ubuntu 在用户主目录会默认生成`Downloads`、 `Pictures`、`Documents`等目录。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017021003.png)

Mac 系统更过分，一部分系统目录也是大写的，比如`/Library/Audio/Apple Loops/`。

另外，某些常见的配置文件或说明文件，也采用大写的文件名，比如`Makefile`、`INSTALL`、`CHANGELOG`、`.Xclients`和`.Xauthority`等等。

所以，用户的文件都采用小写文件名，就很方便与上面这些目录或文件相区分。

如果你打破砂锅问到底，为什么操作系统会采用这样的大写文件名？原因也很简单，因为早期 Unix 系统上，`ls`命令先列出大写字母，再列出小写字母，大写的路径会排在前面。因此，如果目录名或文件名是大写的，就比较容易被用户首先看到。

## 四、便捷性

文件名全部小写，还有利于命令行操作。比如，某些命令可以不使用`-i`参数了。

```bash
# 大小写敏感的搜索
$ find . -name abc
$ locate "*.htmL"

# 大小写不敏感的搜索
$ find . -iname abc
$ locate -i "*.HtmL"
```

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017021004.png)

另外，大写字母需要按下 Shift 键，多多少少有些麻烦。如果文件名小写，就不用碰这个键了，不仅省事，还可以提高打字速度。

程序员长时间使用键盘，每分钟少按几次 Shift，一天下来就可以省掉很多手指动作。长年累月，也是对自己身体的一种保护。

综上所述，文件名全部使用小写字母和连词线（all-lowercase-with-dashes），是一种值得推广的正确做法。

---

下面是推广时间。

如果大家还有印象，以前我[介绍过](http://www.ruanyifeng.com/blog/2016/10/document_style_guide.html#promotion)一家前端开发的在线教育平台["海棠学院"](http://apeclass.cn/1212/index.html?utm_source=ruanyifeng)。

他们的特色就是保证课程质量，不吹牛，非常低调地将所有精力，都投入课程准备和学员的悉心指导，让学员循序渐进、多敲多练，掌握前端编程，做出好的项目。如果你想投入前端行业，或者了解互联网技术，他们是一个不错的选择。

[![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016101501.jpg)](http://apeclass.cn/1212/index.html?utm_source=ruanyifeng)

根据我的提议，创始人张小河[收集]了(http://apeclass.cn/article/191)前几期学员的反馈。

> “身为一个应届生，接触前端完全是因为不喜欢自己的专业，又到了就业的时节，想想自己还是对互联网比较感兴趣，从网上了解了一下互联网各个方面的工作，发现自己对前端比较感兴趣，由此而入了坑......（[全文](http://apeclass.cn/article/192)）”

现在，2017年[春季班](http://apeclass.cn/1212/index.html)开始招生了。和上次冬季班一样，依然是**0成本入学**，只需要缴纳 99 元，即可感受一周的课程，享受完全正式的待遇（录播 + 直播 + 教学监管 + 技术辅导）。一周后，如果觉得不满意，99 元可以退款。

不管你最后是否报名，只要参加培训，都可以免费获得一份[前端学习资料](http://apeclass.cn/1212/index.html)。

[![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017021005.png)](http://apeclass.cn/1212/index.html)

春季班定在3月初开课，名额已经不多了。想从事前端开发，却不知道从何学起的朋友，不要错过这个机会，点击[这里](http://apeclass.cn/1212/index.html)，了解详情吧。

（完）