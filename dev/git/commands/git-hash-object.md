# git hash-object

`git hash-object`命令计算一个文件的git对象ID，即SHA1的哈希值。

```bash

$ echo "hello" | git hash-object --stdin
$ echo "hola" | git hash-object -w --stdin

```

参数

- w 将对象写入对象数据库
- stdin 表示从标准输入读取，而不是从本地文件读取。

