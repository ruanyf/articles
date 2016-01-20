# Stream的用法

Bash接收输入和输出，是字符串的流（stream）形式完成的。这些流可以导向文件，或者导向另一个流。

Shell默认会打开三个文件。

- 文件0：名为`stdin`，标准输入
- 文件1：名为`stdout`，标准输出
- 文件2：名为`stderr`，标准错误输出

流的重定向操作符如下。

- `>`：重定向输出
- `>>`：将标准输出追加到一个文件
- `&>`：重定向输出和错误输出
- `<`：重定向输入
- `<<`：Here documents syntax
- `<<<`：Here strings

下面是一些例子。

```bash
# 将标准输出写入指定文件
ls -l > list.txt

# 追加标准输出到一个文件
ls -a >> list.txt

# 将标准错误写入一个文件
grep da * 2> errors.txt

# 从文件中读取内容
less < errors.txt

# 标准输出和标准错误追加到不同的文件
cmd >>file1 2>>file2

# 将标准输入和标准错误都追加到一个文件之中
cmd >>file.txt 2>&1

# Bash 4也支持下面的写法，效果与上一条命令相同
cmd &>> outfile
```

不仅可以将“流”重定向到文件，还可以使用`|`运算符，将`流`重定向到另一个命令。`|`运算符称为广告。

```bash
ls -l | grep .md$ | less
```
