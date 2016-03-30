# 文本处理

## cat

`cat`可以文件的内容，显示在标准输出。

```bash
$ cat text1
1 apple
2 pear
3 banana
```

它也可以同时输出多个文件内容。

```bash
$ cat text1 text2
```

它与重定向结合，就可以合并多个文件。

```bash
# 合并文本文件
$ cat text* > text.all

# 合并二进制文件
$ cat movie.mpeg.0* > movie.mpeg
```

如果调用`cat`命令时没有任何参数，它将读取标准输入，然后显示到标准输出。按下`Ctrl + d`，将会结束`cat`读取标准输入。利用这一点，可以将键盘输入写入指定文件，按下`Ctrl + d`结束输入。

```bash
$ cat > lazy_dog.txt
```

## sort

`sort`命令将文本文件的所有行排序后输出。

```bash
$ ls /bin /usr/bin | sort | less
```

## uniq

`uniq`命令在排序后的行中，删除所有重复的行，保证所有输出没有重复。

```bash
$ ls /bin /usr/bin | sort | uniq | less
```

如果只想看重复的行，就要使用`-d`参数。

```bash
$ ls /bin /usr/bin | sort | uniq -d | less
```

`-V`参数可以按版本号排列（从小到大）。

```bash
$ sort -V input.txt
1.0.15
1.3.0
2.1.2
3.0.0
```

`-rV`参数可以按版本号逆序排列。

```bash
$ sort -rV input.txt
3.0.0
2.1.2
1.3.0
1.0.15
```

## wc

`wc`命令输出一个文本文件的统计信息（word count），一共有三个值，分别为行数、词数和字节数。

```bash
$ wc ls-output.txt
 7902 64566 503634 ls-output.txt
```

如果使用`-l`参数，则只输出行数。

```bash
$ ls /bin /usr/bin | sort | uniq | wc -l
 2728
```

## head

`head`命令返回文本文件的头部，默认显示10行。

`-n`参数指定显示的行数。

```bash
$ head -n 5 ls-output.txt
```

## tail

`tail`命令返回文本文件的尾部，默认显示10行。

`-n`参数指定显示的行数。

```bash
$ tail -n 5 ls-output.txt
```

`-f`会实时追加显示新增的内容，常用于实时监控日志，按`Ctrl + c`停止。

```bash
$ tail -f /var/log/messages
```

## grep

`grep`命令用于在指定文件之中，搜索符合某个模式的行。

```bash
$ ls /bin /usr/bin | sort | uniq | grep zip
```

上面命令搜索所有输出中包含`zip`的行。

参数的含义。

- `-i` 忽略大小写
- `-v` 只返回不符合模式的行

