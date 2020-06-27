打开一个文档，输入 50%，按下回车键，就自动跳到文档一半的地方。# 标准输入和输出

## 简介

命令行接收输入和输出，是字符串的流（stream）形式完成的。这些流可以导向文件，或者导向另一个流。

命令行默认会打开三个流，输入和输出分布在这三个流中。这三个流默认指向三个文件。

- 文件0：名为`stdin`，标准输入（stdin）
- 文件1：名为`stdout`，标准输出（stdout）
- 文件2：名为`stderr`，标准错误输出（stderr）

默认情况下，标准输入用来接收用户的键盘传输。标准输出和标准错误以文本形式显示在用户终端上。这三个流统称为标准流。

## 标准输入

标准输入用来将数据从用户传送到程序。默认情况下，程序会从键盘接收输入。接收到 EOF（文件结束符）时，终止标准输入。

举例来说，`cat`命令用来将用户的输入写入硬盘文件。

```bash
$ cat
```

上面例子中，键入`cat`以后，系统就开始等待用户通过标准输入传入数据。这时，用户从键盘键入的任何文件，都会被`cat`命令写入文件，同时会在标准输入上显示。如果要结束输入，就要从键盘输入 EOF，方法是按下 Ctrl + d。

```bash
1
2
3
Ctrl + d
```

## 标准输出

标准输出用于导出程序生成的数据，默认是显示在终端。

`echo`命令的作用就是将指定内容显示到标准输出。

```bash
$ echo hello
hello
```

## 标准错误

标准错误用于导出程序产生的错误，默认是显示在终端。

```bash
$ ls not_existed
ls: 无法访问'not_existed': 没有那个文件或目录
```

上面命令中，`not_existed`是一个不存在的路径，`ls`命令的报错信息就通过标准错误显示在屏幕。

## 重定向

Linux 允许将文件流重定向。操作符如下。

- `>` ：标准输出重定向
- `<`：标准输入重定向
- `2>`：标准错误重定向

下面的例子将`cat`命令的结果重定向到一个文件。

```bash
cat > write_to_me.txt
1
2
3
ctrl-d
```

`2>文件`模式将命令的标准错误流重定向到文件，从而覆盖现有内容。

```bash
$ ls not_existed 2> ls_log.txt
```

这将重定向由无效目录名称引起的错误，并将其写入log.txt。

追加到文件结尾。

- `>>` -标准输出
- `<<` -标准输入
- `2>>` -标准错误

```bash
cat >> write_to_me.txt
a
b
c
ctrl-d
```


- `>`：重定向输出
- `>>`：将标准输出追加到一个文件
- `&>`：重定向标准输出和错误输出到同一个文件
- `&>>`: 重定向标准输出和错误输出追加到同一个文件
- `m>&n`：文件描述符`m`重定向到文件描述符`n`
- `m>>&n`：文件描述符`m`重定向追加到文件描述符`n`
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

注意，下面两种写法效果是不同的。

```bash
# 第一种写法
$ command 2>&1 >output.txt

# 第二种写法
$ command >output.txt 2>&1
```

上面第一种写法，`stderr`重定向到`stdout`的当前位置，然后`stdout`重定向到`output.txt`，但是第二次重定向仅仅影响`stdout`，影响不到`stderr`。第二种写法中，`stderr`重定向到`stdout`的当前位置，即`output.txt`。因为`stderr`的重定向晚于`stdout`的重定向，所以`stderr`不会输出到屏幕上。

如果想彻底忽略某种输出，可以将其重定向到空文件`/dev/null`。

```bash
$ ls x* z* 2>/dev/null
```

上面命令不会输出错误。

## `/dev/null`

命令> / dev / null

/ dev / null是一个特殊文件，用于丢弃重定向到该文件的所有数据。它用于丢弃不需要的标准输出，否则可能会干扰命令或脚本的功能。发送到/ dev / null的所有输出都将被丢弃。
将来，您可能会发现在编写Shell脚本时将标准输出和标准错误重定向到/ dev / null的做法。

```bash
ls > /dev/null
```

该命令通过将命令ls返回的标准输出流传递给 / dev / null来丢弃它。

## 管道命令

管道命令用于将前一个命令的标准输出，重定向到后一个命令的标准输入。

```bash
$ ls | less
```

上面例子将`ls`的输出重定向到`less`命令的输入。

尽管管道的功能似乎与`>`和`>>`（标准输出重定向）的功能相似，但区别在于管道将数据从一个命令重定向到另一个命令，而`>`和`>>`仅用于重定向到文件。

不仅可以将“流”重定向到文件，还可以使用`|`运算符，将`流`重定向到另一个命令。`|`运算符称为管道。

```bash
ls -l | grep .md$ | less
```

如果一个命令的参数必须是标准输入，可以使用`cat`命令将文件内容导出为标准输出，然后使用管道命令将其导向要求标准输入的命令。

许多命令在文件名参数的位置，使用连词线`-`，表示这里的输入来自标准输入，而不是来自文件。也就是说，根据上下文，连词号解释成标准输入或标准输出。

```bash
$ bunzip2 -c somefile.tar.bz2 | tar -xvf -
```

凡是使用`-`表示标准输入或标准输出的场合，都可以使用`/dev/stdin`和`/dev/stdout`替代。

`2|`表示只用管道传递标准错误。

可以将多个命令，组合成管道操作的一个阶段，然后将这些命令的所有输出，都导向管道的下一个阶段。圆括号表示这些在子shell运行，大括号比较这些命令在当前shell运行。大括号与其他内容之间有一个空格，而圆括号是操作符不必有空格。

```bash
$ (ls -lrS /usr/bin; du /usr/bin) | tail -n 3
-rwxr-xr-x.   1 root root    10669512 Sep 18 10:41 mysql
-rwxr-xr-t.   1 root root    15148768 Sep 14 05:11 emacs-24.5
386296   /usr/bin
:$ { ls -lrS /usr/bin; du /usr/bin; } | tail -n 3
-rwxr-xr-x.   1 root root    10669512 Sep 18 10:41 mysql
-rwxr-xr-t.   1 root root    15148768 Sep 14 05:11 emacs-24.5
386296   /usr/bin
```

## tee 命令

`tee`命令将命令的标准输出重定向到文件并覆盖其内容。然后，它在终端中显示重定向的输出。如果该文件尚不存在，它将创建一个新文件。

在此模式的上下文中，`tee`通常用于查看程序的输出，同时将其保存到文件中。

```bash
$ wc /etc/magic | tee magic_count.txt
```

这会将魔术文件（由Linux Shell用于确定文件类型）中字符，行和单词的计数通过管道传递到tee命令，然后将wc的输出沿两个方向分割，并将其发送到终端显示和magic_count .txt文件。对于tee命令，请想象字母T。字母的底部是初始数据，顶部是在两个不同方向（标准输出和终端）分开的数据。

可以使用多个管道在多个命令和/或过滤器之间重定向输出。

## xargs

如果希望用一个命令的输入或者文件内容，作为另一个命令的参数而不是标准输入，管道命令不能用于这个场合，必须用下面的方法解决。

- `xargs`命令
- 带有`-exec`参数的`find`命令
- 命令替换（Command substitution）

`xargs`命令读取标准输入，然后将其作为指定命令的参数进行执行。如果没有提供命令，就使用`echo`命令。

```bash
$ cat text1
1 apple
2 pear
3 banana
$ xargs<text1
1 apple 2 pear 3 banana
```

上面命令中，输出显示为一行，这是因为`xargs`将换行符改成了空格符，每个空格分隔的词都会被当作一个参数。`xargs`默认会传递尽可能多的参数，可以用`-n`或`--max-args`参数改变这个参数。

```bash
$ xargs<text1 echo "args >"
args > 1 apple 2 pear 3 banana
$ xargs --max-args 3 <text1 echo "args >"
args > 1 apple 2
args > pear 3 banana
$ xargs -n 1 <text1 echo "args >"
args > 1
args > apple
args > 2
args > pear
args > 3
args > banana
```

如果空格放在引号之中，`xargs`就不会转换这个空格。

```bash
$ echo '"4 plum"' | cat text1 -
1 apple
2 pear
3 banana
"4 plum"
$ echo '"4 plum"' | cat text1 - | xargs -n 1
1
apple
2
pear
3
banana
4 plum
```

`xargs`命令默认将参数加在命令的行尾，如果想放在其他位置，可以用`-I`参数指定一个替代符。执行的时候，该替代符会被真实参数替代。使用`-I`参数时，多行输入会将每一行当作一整个参数，可以使用`-L`改变这个行为，即`-I`的默认使用`-L 1`。

```bash
$ xargs -I XYZ echo "START XYZ REPEAT XYZ END" <text1
START 1 apple REPEAT 1 apple END
START 2 pear REPEAT 2 pear END
START 3 banana REPEAT 3 banana END

$ xargs -IX echo "<X><X>" <text2
<9 plum><9 plum>
<3 banana><3 banana>
<10 apple><10 apple>

$ cat text1 text2 | xargs -L2
1 apple 2 pear
3 banana 9 plum
3 banana 10 apple
```

## 使用 find 命令的 exec 参数

`find`命令的`-exec`参数，类似于`xargs`命令使用管道提供参数。

```bash
$ find text[12] -exec cat text3 {} \;
This is a sentence. This is a sentence. This is a sentence.
1 apple
2 pear
3 banana
This is a sentence. This is a sentence. This is a sentence.
9 plum
3 banana
10 apple
```

必须使用`{}`表示文件名的位置，`find`不会自动将文件名添加到命令末尾。

必须使用转义后的分号`\;`（`';'`或`";"`也可）结束命令。

每行输入的文件，命令执行一次。
