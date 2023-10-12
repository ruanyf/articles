## SPL vs SQL 比较

SQL 的大名，大家一定听说过，这是必备的数据库技能。但是你未必知道，**它有一个最大痛点：不善于计算**。只要涉及计算，SQL 语句要么不好写，要么性能差。

有一个面试问题：找出某只股票连续上涨的最长天数，SQL 应该怎么写？

![](https://cdn.beekka.com/blogimg/asset/202310/bg2023101201.webp)

上面就是答案，涉及多张中间表，不是精通 SQL 的高级工程师，根本写不出来。

SQL 不善于计算的原因很简单，**它作为查询语言而发明**，名字就叫“结构化查询”（structured query），数学基础是关系模型，一开始就没有考虑要做复杂计算。

近年来，数据处理和计算的需求越来越大，于是 OLAP（联机分析处理）和 OLTP（联机事务处理）这样的新技术就诞生了。它们基于数据库，属于“数据库 + 计算层”，如果遇到海量数据，处理效率往往不高。

但是，还有另一种思路：**能不能改造数据库底层，让它善于计算呢？** 这就是 [SPL 语言](https://techwithmaddy.com/spl-a-faster-and-easier-alternative-to-sql)的由来，它把 SQL 的 Q（query 查询）换成了 P（process 数据处理），数学基础从关系模型变成了离散数学，把 **“数据存储 + 数据计算”做在了一起**。

![](https://cdn.beekka.com/blogimg/asset/202310/bg2023101203.webp)

SPL 属于新概念，网上有一个中文论坛[“乾学院”](https://c.raqsoft.com.cn/)，里面全是 SPL 相关知识，大家可以看看。

![](https://cdn.beekka.com/blogimg/asset/202310/bg2023101204.webp)

国内目前只有一家公司，在研发和推广 SPL 技术，创始人据说是来自清华大学计算机系的奥林匹克数学竞赛的金牌得主。

他们已经做出了自己的 SPL 实现，并向社会开源了，叫做 [esProc SPL](https://github.com/SPLware/esProc)，GitHub 已经有 2300+ star。这个产品有很多优点，我帮他们宣传一下，把 SPL 传播出去。

**（1）写法简单。** 它使用可读的、描述性的语句，进行数据计算。比如，股票连续上涨的最长天数，它的写法要比 SQL 简单很多。

> stock_price  
> .sort(trade_date)  
> .group@i(closing_price < closing_price[-1])  
> .max(~.len())

**（2）计算快速。** 它使用离散数学，避免了关系型数据库的查询模型，不需要生成中间表，能够快速得到计算结果，并且资源占用少。

**（3）使用成本低。** 它不需要改造现有开发流程，本身采用Java 开发，可以独立运行，无缝集成到应用之中，不用部署服务，解释执行。

它提供标准 JDBC 接口，可以被 Java 应用集成调用。对于非 Java 应用，则提供 HTTP 的 RESTful 接口。

**（4）支持多种数据源**，包括 MySQL 等主流关系型数据库、NoSQL 数据库、文本文件，JSON 文件。它本身也有自己的数据引擎，也可以把数据存在它里面。

**（5）易于使用。** 为了适应国内的实际情况，加速推广，它有一个类似 Excel 的图形界面，输入指令就直接得到结果表格，学习成本低，便于快速上手。

![](https://cdn.beekka.com/blogimg/asset/202310/bg2023101205.webp)

很多大型企业已经是他们客户了，包括[银行](https://mp.weixin.qq.com/s/HAtBqPFkiwd_oTENQvNEjg)、[保险公司](https://mp.weixin.qq.com/s/xi-9evX9vU5027U8gkFs8A)、[国家天文台](https://c.raqsoft.com.cn/article/1658458664725)等等。

对数据处理感兴趣的朋友，除了 [esProc SPL 的仓库](https://github.com/SPLware/esProc)，也欢迎关注他们的公号（扫描下方二维码）和[论坛](https://c.raqsoft.com.cn/domain/Support)。

![](https://cdn.beekka.com/blogimg/asset/202310/bg2023101206.webp)

