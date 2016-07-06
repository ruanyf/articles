# Stream的用法

Bash接收输入和输出，是字符串的流（stream）形式完成的。这些流可以导向文件，或者导向另一个流。

Shell默认会打开三个文件。

- 文件0：名为`stdin`，标准输入
- 文件1：名为`stdout`，标准输出
- 文件2：名为`stderr`，标准错误输出

流的重定向操作符如下。

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

## 管道命令

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
