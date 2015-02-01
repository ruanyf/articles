# bash命令一览

### read

read命令将用户输入读入变量。

```bash
$ read x
```

### rename

为文件批量改名。

```bash

$ rename [-v -n -f] <pcre> <files>

```

- v 在标准输出显示改名过程
- n 模拟显示改名的结果，并不实际改名
- f 覆盖同名文件
- <pcre> 代表Perl-compatible regular expression (PCRE)，即改名的正则表达式，形式为's/old-name/new-name/'

```bash

$ rename 's/\.jpeg$/\.jpg/' *.jpeg

# 小写改成大写
$ rename 'y/A-Z/a-z/' *

$ rename -v 's/img_(\d{4})\.jpeg$/dan_$1\.jpg/' *.jpeg

```


