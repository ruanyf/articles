# 信用卡支付表单的设计

互联网发展到今天，只有很少几件事，网下比网上方便，比如信用卡支付。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071801.jpg)

网下只要把信用卡往POS机划一下即可，根本不需要其他步骤，完全零输入。网上使用信用卡，却必须填入一连串号码，一个都不能填错，然后再点击提交按钮。

苹果公司正在努力，通过Apple Pay，让手机替代信用卡。以后支付的时候，你只要划一下手机就可以了。但是，在这一天变成现实之前，我们仍然必须在网页上，使用信用卡支付表单。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071802.jpg)

设计师[Gabriel Tomescu](https://medium.com/user-experience-design-1/the-anatomy-of-a-credit-card-payment-form-32ec0e5708bb)发表了一篇文章，介绍如何设计一个易用的支付表单，我觉得很有启发。

1.

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071803.png)

先展示一下，设计完成后的表单，这里是[Demo](https://s3.amazonaws.com/gabe-cc-form/index.html)。

2.

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071804.png)

接受哪些信用卡，有三个设计方案，最后选择了顶部显示。

3.

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071805.png)

支付金额不采用输出框，减少对用户的压力。只有按下Edit键，才会显示一个输入框。另外，支付按钮上同时显示金额，用来确认。

4.

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071806.png)

输入卡号的时候，会根据第一位数字，显示是哪家的信用卡。

5.

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071807.png)

“过期日期”完全按照卡上的格式填写，避免有些用户搞不清，哪两位是年，哪两位是月。

6.

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071808.png)

安全码有一个提示按钮，会弹出图形说明。

7.

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071809.png)

为了显示支付是安全的，提交按钮上会有一个加密图标。

8.

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071810.png)

支付提交后的成功页面。

9.

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071811.png)

输入出错提示。

10.

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071812.png)

支付出错提示。最后一种情况，当前卡是一张无效卡，用户必须换一张卡支付，这时所有输入框会被清空，让用户重新输入。

11.

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071813.png)

对于小型的屏幕，输入框会简化。

（完）
