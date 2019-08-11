# sort 命令，uniq 命令

## sort 命令

`sort`命令用来列表排序，默认是字段顺序。

下面是一个排序前文件。

```bash
$ cat contacts.txt
bob Jones
Leslie Smith
Dana David
Susan Gee
Leonard Schmidt
Linda Gray
Terry Jones
Colin Doe
Jenny Case
```

现在，对列表排序。

```bash
$ sort contacts.txt
Bob Jones
Colin Doe
Dana David
Jenny Case
Leonard Schmidt
Leslie Smith
Linda Gray
Susan Gee
Terry Jones
```

`-r`参数按字母倒序排序。

```bash
$ sort -r contacts.txt
Terry Jones
Susan Gee
Linda Gray
Leslie Smith
Leonard Schmidt
Jenny Case
Dana David
Colin Doe
Bob Jones
```

`-k`参数指定按第几列排序。下面例子指定按第2列排序。

```bash
$ sort -k2 contacts.txt
Jenny Case
Dana David
Colin Doe
Susan Gee
Linda Gray
Bob Jones
Terry Jones
Leonard Schmidt
Leslie Smith
```

## uniq 命令

`uniq`命令可以从已经排序的文本，过滤掉重复的条目。
