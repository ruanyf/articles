## SPL vs SQL 比较

提到 SQL 语言，大家一定耳熟能详，这是数据库的必备技能。但是，**它有一个最大痛点：不善于计算**。只要涉及计算，SQL 语句往往很复杂。

举例来说，现有某只股票的股价数据库，要求找出连续上涨的最长天数，请问 SQL 应该怎么写？

![](https://cdn.beekka.com/blogimg/asset/202310/bg2023101201.webp)

上面就是一种答案，可以看到难读难写，涉及多张中间表，大概精通 SQL 的高级工程师才写得出。

为什么 SQL 不善于计算？原因很简单，**它作为查询语言而发明**，名字就叫“结构化查询”（structured query），以关系模型为数学基础，底层就没有考虑做复杂计算。

偏偏数据处理和计算的需求越来越大，于是 OLAP（联机分析处理）和 OLTP（联机事务处理）等新技术就诞生了。它们的模式基于数据库，属于“数据库 + 计算层”，如果遇到海量数据，处理效率往往不高。

此外，还有另一种思路：**能不能改造数据库底层，让它善于计算呢？** 这就是 [SPL 语言](https://techwithmaddy.com/spl-a-faster-and-easier-alternative-to-sql)的由来，它把 SQL 的 Q（query 查询）换成了 P（process 数据处理），数学基础从关系模型变成了离散数学，把 **“数据存储 + 数据计算”做在一起**。

![](https://cdn.beekka.com/blogimg/asset/202310/bg2023101203.webp)

SPL 属于很新的概念，国内只有少数几家公司在做。网上有一个[“乾学院”](https://c.raqsoft.com.cn/)，是专门探讨 SPL 技术的中文社区，大家可以看看。

![](https://cdn.beekka.com/blogimg/asset/202310/bg2023101204.webp)

北京有一家创业公司，已经做出了一个开源实现，叫做 [esProc SPL](https://github.com/SPLware/esProc)，GitHub 已经有 2300+ star。这个产品有很多优点，我帮他们宣传一下，大家可以体验什么是 SPL。

**（1）写法简单。** 它使用可读的、描述性的语句，进行数据计算。比如，股票连续上涨的最长天数，它的写法要比 SQL 简单很多。

> stock_price  
> .sort(trade_date)  
> .group@i(closing_price < closing_price[-1])  
> .max(~.len())

**（2）计算快速。** 它使用离散数学模型，避免了关系型数据库的查询模型，不需要生成中间表，能够快速得到计算结果，并且资源占用少。

**（3）使用成本低。** 它不需要改造现有开发流程，本身采用Java 开发，可以独立运行，无缝集成到应用之中，不用部署服务，解释执行。

它提供标准 JDBC 接口，可以被 Java 应用集成调用。对于非 Java 应用，则提供 HTTP 的 RESTful 接口。

**（4）支持多种数据源**，包括 MySQL 等主流关系型数据库、NoSQL 数据库、文本文件，JSON 文件。它本身也有自己的数据引擎，也可以把数据存在它里面。

**（5）易于使用。** 为了适应国内的实际情况，加速推广，它有一个类似 Excel 的图形界面，输入指令就直接得到结果表格，学习成本低，便于快速上手。

![](https://cdn.beekka.com/blogimg/asset/202310/bg2023101205.webp)

很多大型企业已经是他们客户了，包括[银行](https://mp.weixin.qq.com/s/HAtBqPFkiwd_oTENQvNEjg)、[保险公司](https://mp.weixin.qq.com/s/xi-9evX9vU5027U8gkFs8A)、[国家天文台](https://c.raqsoft.com.cn/article/1658458664725)等等。

对数据处理感兴趣的朋友，除了 [esProc SPL 的仓库](https://github.com/SPLware/esProc)，欢迎关注他们的公号（扫描下方二维码）和[论坛](https://c.raqsoft.com.cn/domain/Support)。

![](https://cdn.beekka.com/blogimg/asset/202310/bg2023101206.webp)

