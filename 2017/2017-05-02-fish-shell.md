# Fish shell 入门教程

[命令行](https://zh.wikipedia.org/wiki/%E5%91%BD%E4%BB%A4%E8%A1%8C%E7%95%8C%E9%9D%A2)是程序员的必备技能。图形界面虽然好看，解决问题还是要靠命令行。

命令行由 Shell 提供。各种命令通过 Shell，传递给操作系统的内核。学习命令行就是在学习 Shell。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017050201.jpg)

Shell 有好几种，目前最常用是 [Bash](https://en.wikipedia.org/wiki/Bash_&lpar;Unix_shell&rpar;) 和 [zsh](https://en.wikipedia.org/wiki/Z_shell)。但是，在我看来，它们都不如 [Fish Shell](http://fishshell.com/) 好用。

五年前，我第一次尝试 Fish，感到很惊艳，一直用到现在。本文介绍 Fish 的主要特点，希望你也来尝试它。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017050202.jpg)

## 一、简介
 
Fish 是“the <span style="font-weight: 700;">f</span>riendly <span style="font-weight: 700;">i</span>nteractive <span style="font-weight: 700;">sh</span>ell”的简称，最大特点就是方便易用。很多其他 Shell 需要配置才有的功能，Fish 默认提供，不需要任何配置。

如果你想拥有一个方便好用的 Shell，又不想学习一大堆语法，或者花费很多时间配置，那么你一定要尝试一下 Fish。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017050204.png)

## 二、安装

Ubuntu 和 Debian 的安装方法。

```bash
$ sudo apt-get install fish
```

Mac 的安装方法。

```bash
$ brew install fish
```

其他系统的安装请参考[官方网站](http://fishshell.com/#platform_tabs)。

## 三、启动与帮助

安装完成后，就可以启动 Fish。

```bash
$ fish
```

由于 Fish 的语法与 Bash 有很大差异，Bash 脚本一般不兼容。因此，我建议不要将 Fish 设为默认 Shell，而是每次手动启动它。

使用过程中，如果需要帮助，可以输入`help`命令。浏览器就会自动打开，显示在线文档。

```bash
$ help
```

## 四、彩色显示

进入 Fish 以后，你注意到的第一件事，可能就是它默认彩色显示。

<blockquote style="font-size: initial;"><pre><code>
# 无效命令为红色
$ <span style="color:red;">mkd</span>

# 有效命令为蓝色
$ <span style="color: blue;">mkdir</span>
</code></pre></blockquote>

有效路径会有下划线。

<blockquote style="font-size: initial;"><pre><code>
$ cat <span style="text-decoration: underline;">~/somefi</span> 
</code></pre></blockquote>

上面代码表示，存在以`~/somefi`开头的路径。如果没有下划线，你就知道这个路径不存在。

## 五、自动建议

Fish 会自动在光标后面给出建议，表示可能的选项，颜色为灰色。

<blockquote style="font-size: initial;"><pre><code>
# 命令建议
$ /bin/h<span style="color: gray;text-decoration: underline;">o</span><span style="color: gray;">stname</span>

# 参数建议
$ grep --i<span style="color: gray;">gnore-case</span>

# 路径建议
$ ls <span style="color: blue;text-decoration: underline;">no</span><span style="color: gray;">de_modules</span>
</code></pre></blockquote>

如果采纳建议，可以按下`→`或`Control + F`。如果只采纳一部分，可以按下`Alt + →`。

## 六、自动补全

输入命令时，Fish 会自动显示匹配的上一条历史记录。

<blockquote style="font-size: initial;"><pre><code>
$ g<span style="color: gray;">it commit -m "feat: first commit"</span>
</code></pre></blockquote>

如果没有匹配的历史记录，Fish 会猜测可能的结果，自动补全各种输入。比如，输入`pyt`再按下`Tab`，就会自动补全为`python`命令。

如果有多个可能的结果，Fish 会把它们都列出，还带有简要介绍。

```bash
$ vi[按下 Tab 键]

vi (Executable link, 2.7MB)
view (Vi IMproved, 一个程序员的文本编辑器)
viewer.py (Executable, 967B)
viewres  (Graphical class browser for Xt)
…and 12 more rows
```

这时，再按一次`tab`，就可以在这些命令之中选择。

除了补全命令，Fish 还可以补全参数。比如，`ls`命令的`-l`参数后面按下`Tab`键，就会显示可以连用的其他参数。

```bash
$ ls -l[按下 Tab 键]

-l1  (List one file per line)
-lA  (Show hidden except . and ..)  
-la  (Show hidden)
-lB  (Ignore files ending with ~)
…and 16 more rows```
```

Fish 还可以自动补全 Git 分支。

<blockquote style="font-size: initial;"><pre><code>
$ git checkout m<span style="color: gray">aster</span>
</code></pre></blockquote>

## 七、易懂的语法

Fish 的语法非常自然，一眼就能看懂。

`if`语句。

```bash
if grep fish /etc/shells
    echo Found fish
else if grep bash /etc/shells
    echo Found bash
else
    echo Got nothing
end
```

`switch`语句。

```bash
switch (uname)
case Linux
    echo Hi Tux!
case Darwin
    echo Hi Hexley!
case FreeBSD NetBSD DragonFly
    echo Hi Beastie!
case '*'
    echo Hi, stranger!
end
```

`while`循环。

```bash
while true
    echo "Loop forever"
end
```

`for`循环。

```bash
for file in *.txt
    cp $file $file.bak
end
```

## 八、函数

Fish 的函数用来封装命令，或者为现有的命令起别名。

```bash
function ll
    ls -lhG $argv
end
```

上面代码定义了一个`ll`函数。命令行执行这个函数以后，就可以用`ll`命令替代`ls -lhG`。其中，变量`$argv`表示函数的参数。

下面是另一个例子。

```bash
function ls
    command ls -hG $argv
end
```

上面的代码重新定义`ls`命令。注意，函数体内的`ls`之前，要加上`command`，否则会因为无限循环而报错。

## 九、提示符

`fish_prompt`函数用于定义命令行提示符（prompt）。

```bash
function fish_prompt
    set_color purple
    date "+%m/%d/%y"
    set_color FF0
    echo (pwd) '>'
    set_color normal
end
```

执行上面的函数以后，你的命令行提示符就会变成下面这样。

```bash
02/06/13
/home/tutorial > 
```

## 十、配置

Fish 的配置文件是`~/.config/fish/config.fish`，每次 Fish 启动，就会自动加载这个文件。

我们可以在这个文件里面写入各种自定义函数，它们会被自动加载。比如，上面的`fish_prompt`函数就可以写在这个文件里面，这样每次启动 Fish，就会出现自定义的提示符。

Fish 还提供 Web 界面配置该文件。

```bash
$ fish_config
```

输入上面的命令以后，浏览器就会自动打开本机的 8000 端口，用户可以在网页上对 Fish 进行配置，比如选择提示符和配色主题。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017050203.png)

（正文完）
