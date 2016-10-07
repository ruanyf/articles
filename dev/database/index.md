# 数据库

## 如何选择noSQL数据库

第一个问题，你是否应该使用noSQL数据库，还是关系型数据库？

- 是否需要支持交易（Transaction），即操作的原子性？大多数noSQL数据库不支持交易。
- 是否需要记录之间立即保持一致（consistent），还是最终保持一致（eventual consistency）？
- 扩展是采用垂直扩展（vertical scaling）还是水平扩展（horizontal scaling）？
- 可用性？（会不会有宕机的时候？需要有热备份hot failover吗?)

一旦决定采用noSQL数据库，就要决定是采用键值对数据库（Key-Value），还是文档导向数据库（Document-oriented）？

键值对数据库适用于只有一个键的数据，就像一个哈希表，典型的应用是缓存数据。以下是常用的键值对数据库。

- Memcache：数据保存在内存之中，没有持久层，保存大型数据没有优势。
- Redis：数据保存在内存之中，可以备份到磁盘，非常快，除了键值对还支持数据结构，水平扩展比较难，只能垂直扩展。
- Aerospike：数据保存在内存和磁盘之中，非常快，可以水平扩展，自动热备份，企业级应用。

文档导向的数据库，更接近表结构（table），比较像事先不确定数据结构的关系型数据库的情况。以下是常用的noSQL数据库。

- MongoDB：速度快，功能强，支持热备份，水平扩增只支持读操作，支持高级查询，拆分比较困难，如果写入频繁，文档锁就成了一个问题。
- Couchbase：速度快，可以拆分成集群，而不是mongoDB的主从结构，热备份支持，可以水平扩展，学习曲线较大。

## 参考链接

- [How to choose a NoSQL database](http://engineering.snapdeal.com/how-to-choose-a-nosql-database-201502/)，by Prashant Parashar
