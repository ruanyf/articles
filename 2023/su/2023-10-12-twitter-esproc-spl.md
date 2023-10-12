## esProc SPL 的推特

SQL 只要涉及计算，要么不好写，要么性能差。我看到一篇文章，提出一个面试问题：https://mp.weixin.qq.com/s/LHSlD4OJ_k4E_6gbI5OTFg

> 请写出 SQL，找出股价连续上涨的最长天数。

答案是图一，真的有点吓人。文章的意思是，SQL 只是一种数据查询语言，以关系模型作为数学基础，本质就不适合复杂计算。

他们提出一种新解法，我觉得很有意思，把数据库的数学基础改成离散数学，从而实现“数据查询 + 数据计算”一体化。他们把这种新的语言叫做 SPL（图二），即 SQL 的 Q（查询）改成了 P（数据处理）。

他们甚至还写出了 Java 实现，放在 GitHub 上面，叫做 esProc SPL，可以直接运行，已经有2300 star（图三）。https://github.com/SPLware/esProc 具体用法和讨论区见中文官网（图四）。http://www.scudata.com.cn/

