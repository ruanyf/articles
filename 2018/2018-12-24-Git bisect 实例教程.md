# git bisect 实例教程

`git bisect`是一个很有用的命令，用来查找哪一次代码提交引入了错误。

![](https://www.wangbase.com/blogimg/asset/201812/bg2018122402.png)

它的原理很简单，就是将代码提交的历史，按照两分法进行不断定位。所谓“两分法”，就是将代码历史一分为二，确定问题出在前半部分，还是后半部分，不断执行这个过程，直到范围缩小到某一次代码提交。

本文通过一个实例，解释如何使用这个命令。

下面是一个[代码库](https://github.com/bradleyboy/bisectercise)，请将它克隆到本地。

```bash
$ git clone git@github.com:bradleyboy/bisectercise.git
$ cd bisectercise
```

这个库是一个网页`index.html`，我们在浏览器打开这个网页。

```bash
$ open index.html
```

![](https://www.wangbase.com/blogimg/asset/201812/bg2018122401.png)

网页上是一个计数器，有两个按钮。点击`+`号按钮，可以看到计数器没有递增，反而出现递减，这说明代码有问题。现在，就要来查找，到底哪一次代码提交，引入了错误。

首先，检查一下代码提交历史。

```bash
$ git log --pretty=oneline
```

可以看到，这个库一共有101次提交。其中，第一次提交的哈希是`4d83cf`。

接下来，开始用`git bisect start`命令查错，这时要指定差错的范围。它的格式如下。

```bash
$ git bisect start [终点] [起点]
```

这个例子里面，“终点”就是最新的提交，可以用`HEAD`表示；“起点”就是第一次提交`4d83cf`。当然，完全可以指定其他的提交，作为起点或终点，只要能保证，错误就是这段范围里面就可以。

```bash
$ git bisect start HEAD 4d83cf
```

执行上面的命令以后，代码库就会切换到中间的那一次提交的状态，本例是第51次提交。

刷新浏览器，点击`+`按钮，发现可以正常递增。这时，使用`git bisect good`命令，告诉 Git 第51次提交没有问题。

```bash
$ git bisect good
```

既然第51次提交没有问题，就意味着错误是在后半段引入的。Git 就自动将代码库，切换到后半段的中点第76次提交。

刷新浏览器，点击`+`按钮，发现不能正常递增。这时，使用`git bisect bad`命令，告诉 Git 第76提交有问题。

```bash
$ git bisect bad
```

接下来，不断重复这个过程，直到成功找到出问题的那一次提交为止。这时，Git 会给出如下的提示。

```bash
b47892 is the first bad commit
```

找出了哪一次提交出问题，就可以[检查代码](https://github.com/bradleyboy/bisectercise/commit/b47892adec22ee3b0330aff37cbc5e695dfb99d6)，确定具体是什么错误。

然后，使用`git bisect reset`命令，退出`git bisect`，回到最新一次的代码提交。

```bash
$ git bisect reset
```

接着，就可以修复错误了。

（完）
