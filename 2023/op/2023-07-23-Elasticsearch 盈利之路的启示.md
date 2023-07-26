## Elasticsearch 的启示

上月的“红帽事件”，说明开源软件的“客服模式”行不通，我在[上一期](http://www.ruanyifeng.com/blog/2023/07/weekly-issue-263.html)已经写了自己的看法。

开源软件如何赚钱？

我一直思考这个问题，觉得行业的发展、个人的前途，都跟它有关系。

![](https://cdn.beekka.com/blogimg/asset/202307/bg2023072304.webp)

我现在的看法是，**只有一种模式是可行的**，开源软件可以成功商业化，那就是 Elasticsearch 的模式。

![](https://cdn.beekka.com/blogimg/asset/202307/bg2023072305.webp)

Elasticsearch 是著名的搜索软件，市场份额非常大，很多大型网站的背后都是它。

2004年，以色列程序员谢伊·巴农（Shay Banon）为了方便妻子查找菜谱，写了一个简单的搜索工具，这就是 Elasticsearch 的由来。

![](https://cdn.beekka.com/blogimg/asset/202307/bg2023072306.webp)

一开始，Elasticsearch 采用最宽松的 Apache 许可证，几乎没有任何限制，你怎么用都可以。

后来，谢伊·巴农拿了风投，成立了公司，雇了程序员，就必须有收入，否则公司就要裁员关门。

**他想到的办法，就是提供云服务**。你不必搭建搜索了，我搭建好了，你买了就能用。这样你比较省心，我也有收入了。

![](https://cdn.beekka.com/blogimg/asset/202307/bg2023072307.webp)

但是，他万万没有想到，这种模式也行不通。原因是**开源软件不是独占性的，如果你的软件太成功，其他人也可以提供服务**，而且卖得更便宜，最终把你打败，拿到更大的市场份额。

Elasticsearch 倒霉的地方在于，遇到的竞争对手是亚马逊，世界第一的云服务商。

亚马逊不花一分钱，拿到 Elasticsearch 的代码，搭建搜索服务出售，很快就让原始作者没生意了。

![](https://cdn.beekka.com/blogimg/asset/202307/bg2023072308.webp)

眼看公司有挂掉的风险，Elasticsearch 做出了一个石破天惊的决定。

2021年，谢伊·巴农宣布，放弃 Apache 许可证，改用新的许可证：代码依然开源，但是不允许用户销售该软件的云服务，除非你愿意公开整个服务端。（注意，是整个服务端，不仅是搜索的部分。）

这摆明了，就是不允许亚马逊再卖搜索服务了。作为业界老大，亚马逊当然咽不下这口气。它索性撕破脸，把 Elasticsearch 的代码分叉，开始维护自己的版本，起名为[OpenSearch](https://aws.amazon.com/cn/opensearch-service/)，继续采用 Apache 许可证，让社区无偿使用，双方就对着干了。

![](https://cdn.beekka.com/blogimg/asset/202307/bg2023072601.webp)

现在还看不出来谁赢谁输，但是不管怎样，Elasticsearch 有了起码的生存保障，收入稳定下来了。你要用正宗的搜索服务，只有买他家的。

我认为，**这是目前唯一可行的开源软件商业模式**。

有人把它叫做“[开源核心模式](https://handbook.opencoreventures.com/open-core-business-model)”：代码的核心功能是开源的，可以免费使用，但是存在某些限制，比如云服务是独家的，或者某些插件和周边工具是闭源的，需要付费。

目前，采用这种模式的知名开源软件，除了 Elasticsearch，还有 MongoDB。

**开源软件创业，建议就采用这种模式**。你同时维护两个版本：一个是开源的社区版，让大家免费使用，积累用户和口碑；另一个是收费的企业版，拥有更多功能和客服支持。
