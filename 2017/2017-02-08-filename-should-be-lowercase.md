# 为什么文件名要小写？

上周，[《中文技术文档写作规范》](https://github.com/ruanyf/document-style-guide)加入了文件的命名规则。

> “文件名建议只使用小写字母，不使用大写字母。”
>
> “为了醒目，某些说明文件的文件名，可以使用大写字母，比如`README`、`LICENSE`。”

网友看见了，就[提问](https://github.com/ruanyf/document-style-guide/commit/22db946f22cdce12cde4e264344e8223abfafcd5#commitcomment-20691431)为什么文件名要小写？ 

说实话，虽然这是 Linux 传统，我却从没认真想过原因。赶紧查资料，结果发现四个很有说服力的理由，支持这样做。

下面就是这四个理由。另外，文后我还会发布前端培训的消息。

## 一、可移植性

Linux 系统是大小写敏感的，而 Windows 系统和 Mac 系统正好相反，大小写不敏感。一般来说，这不是大问题。

但是，如果两个文件名只有大小写不同，其他都相同，跨平台就会出问题。比如，`foobar`、`Foobar`、`FOOBAR`和`fOObAr`，Windows 系统会把它们都当作`foobar`，你可能没办法打开后面三个文件。

另一方面，在 Mac 系统上开发时，有时会疏忽，写错大小写。

```javascript
// 正确文件名是 MyModule.js
const module = require('./myModule');
```

上面的代码在 Mac 上面可以运行，因为 Mac 认为`MyModule.js`和`myModule.js`是同一个文件。但是，一旦代码到服务器运行就会报错，因为 Linux 系统找不到`myModule.js`。

因此，如果所有的文件名都采用小写，可以保证项目有良好的可移植性。。

## 二、易读性

小写文件名通常比大写文件名更易读，比如`accessibility.txt`就比`ACCESSIBILITY.TXT`易读。

有人习惯使用[驼峰命名法](http://www.ruanyifeng.com/blog/2007/06/camelcase.html)，单词的第一个字母大写，其他字母小写。这种方法的问题是，如果遇到全部是大写的缩略词，就会不适用。

比如，一个姓李的纽约特警，无论写成`NYPoliceSWATLee`还是`NyPoliceSwatlee`，都怪怪的，还是写成`ny-police-swat-lee`比较容易接受。

## 三、易用性

某些系统会生成一些预置的用户目录，采用首字母大写的目录名。比如，Ubuntu 在用户主目录会默认生成`Downloads`、 `Pictures`、`Documents`等目录。Mac 系统更过分，一部分系统目录也是大写的，比如`/Library/Audio/Apple Loops/`。

另外，某些常见的配置文件或说明文件，也采用大写的文件名，比如`Makefile`、`INSTALL`、`CHANGELOG`、`.Xclients`和`.Xauthority`。

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

最后，大写字母需要按下 Shift 键，如果文件名小写，就不用碰这个键了，不仅节省体力，还可以提高打字速度。

程序员长时间使用键盘，每分钟少按几次 Shift，一天下来就可以省掉很多手指动作。长年累月，也是对自己身体的一种保护。

结合以上四个理由，就可以很有把握地说，文件名全部使用小写字母和连词线（all-lowercase-with-dashes），是一种值得推广的正确做法。

---

下面是推广时间。