# 蒙特卡罗方法入门

本文通过五个例子，介绍[蒙特卡罗方法](https://en.wikipedia.org/wiki/Monte_Carlo_method)（Monte Carlo Method）。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015072601.jpg)

## 一、概述

蒙特卡罗方法是一种计算方法。原理是通过大量随机样本，去了解一个系统，进而得到所要计算的值。

它非常强大和灵活，又相当简单易懂，很容易实现。对于许多问题来说，它往往是最简单的计算方法，有时甚至是唯一可行的方法。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015072602.jpg)

它诞生于上个世纪40年代美国的“曼哈顿计划”，名字来源于赌城蒙特卡罗，象征概率。

## 二、π的计算

第一个例子是，如何用蒙特卡罗方法计算圆周率π。

正方形内部有一个相切的圆，它们的面积之比是π/4。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015072611.jpg)

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015072603.jpg)

现在，在这个正方形内部，随机产生10000个点（即10000个坐标对 (x, y)），计算它们与中心点的距离，判断是否落在圆的内部。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015072604.jpg)

如果这些点均匀分布，那么圆内的点应该占到所有点的 π/4，因此将这个比值乘以4，就是π的值。通过R语言[脚本](https://github.com/alexhwoods/alexhwoods.com/blob/master/Machine%20Learning/Monte%20Carlo/EstimatingPi.R)随机模拟30000个点，π的估算值与真实值相差0.07%。

## 三、积分的计算

上面的方法加以推广，就可以计算任意一个积分的值。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015072610.gif)

比如，计算函数 y = x<sup>2</sup> 在 [0, 1] 区间的积分，就是求出下图红色部分的面积。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015072605.jpg)

这个函数在 (1,1) 点的取值为1，所以整个红色区域在一个面积为1的正方形里面。在该正方形内部，产生大量随机点，可以计算出有多少点落在红色区域（判断条件 y &lt; x<sup>2</sup>）。这个比重就是所要求的积分值。

用Matlab模拟100万个随机点，结果为0.3328。

## 四、交通堵塞

蒙特卡罗方法不仅可以用于计算，还可以用于模拟系统内部的随机运动。下面的例子模拟单车道的交通堵塞。

根据 Nagel–Schreckenberg 模型，车辆的运动满足以下规则。

> - 当前速度是 v 。
> - 如果前面没车，它在下一秒的速度会提高到 v + 1 ，直到达到规定的最高限速。
> - 如果前面有车，距离为d，且 d &lt; v，那么它在下一秒的速度会降低到 d - 1 。
> - 此外，司机还会以概率 p 随机减速， 将下一秒的速度降低到 v - 1 。

在一条直线上，随机产生100个点，代表道路上的100辆车，另取概率 p 为 0.3 。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015072606.png)

上图中，横轴代表距离（从左到右），纵轴代表时间（从上到下），因此每一行就表示下一秒的道路情况。

可以看到，该模型会随机产生交通拥堵（图形上黑色聚集的部分）。这就证明了，单车道即使没有任何原因，也会产生交通堵塞。

## 五、产品厚度

某产品由八个零件堆叠组成。也就是说，这八个零件的厚度总和，等于该产品的厚度。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015072607.jpg)

已知该产品的厚度，必须控制在27mm以内，但是每个零件有一定的概率，厚度会超出误差。请问有多大的概率，产品的厚度会超出27mm？

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015072608.png)

取100000个随机样本，每个样本有8个值，对应8个零件各自的厚度。计算发现，产品的合格率为99.9979%，即百万分之21的概率，厚度会超出27mm。

## 六、证券市场

证券市场有时交易活跃，有时交易冷清。下面是你对市场的预测。

- 如果交易冷清，你会以平均价11元，卖出5万股。
- 如果交易活跃，你会以平均价8元，卖出10万股。
- 如果交易温和，你会以平均价10元，卖出7.5万股。

已知你的成本在每股5.5元到7.5元之间，平均是6.5元。请问接下来的交易，你的净利润会是多少？

取1000个随机样本，每个样本有两个数值：一个是证券的成本（5.5元到7.5元之间的均匀分布），另一个是当前市场状态（冷清、活跃、温和，各有三分之一可能）。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015072609.png)

模拟计算得到，平均净利润为92, 427美元。

## 七，参考链接

- [Introduction To Monte Carlo Methods](http://alexhwoods.com/2015/07/25/introduction-to-monte-carlo-methods/)，by Alex Woods
- [Monte Carlo Simulation Tutorial](http://www.solver.com/monte-carlo-simulation-example)
- [蒙特卡罗（Monte Carlo）方法简介](http://blog.sciencenet.cn/blog-324394-292355.html)，by 王晓勇
- [蒙特卡罗（Monte Carlo）模拟的一个应用实例](http://blog.sina.com.cn/s/blog_7e4eb7870100r3tn.html)

（完）

