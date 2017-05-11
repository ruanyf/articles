# Fish shell 入门教程

[命令行](https://zh.wikipedia.org/wiki/%E5%91%BD%E4%BB%A4%E8%A1%8C%E7%95%8C%E9%9D%A2)是程序员的必备技能。图形界面虽然好看，解决问题还是要靠命令行。

命令行由 Shell 提供。各种命令通过 Shell，传递给操作系统的内核。学习命令行就是在学习 Shell。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017050201.jpg)

Shell 有好几种，目前最常用是 [Bash](https://en.wikipedia.org/wiki/Bash_&lpar;Unix_shell&rpar;) 和 [zsh](https://en.wikipedia.org/wiki/Z_shell)。但是，在我看来，它们都不如 [Fish Shell](http://fishshell.com/) 好用。

五年前，我第一次尝试 Fish，感到很惊艳，一直用到现在。本文介绍 Fish 的主要特点，希望你也来尝试它。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017050202.jpg)

感谢[优达学城](https://cn.udacity.com/?utm_source=ruanyf&utm_medium=referral&utm_campaign=MLND02)对本文提供赞助，结尾处有他们的课程推荐。

## 一、简介
 
Fish 是“the <span style="font-weight: 700;">f</span>riendly <span style="font-weight: 700;">i</span>nteractive <span style="font-weight: 700;">sh</span>ell”的简称，最大特点就是方便易用。很多其他 Shell 需要配置才有的功能，Fish 默认提供，不需要任何配置。

如果你想拥有一个方便好用的 Shell，又不想学习一大堆语法，或者花费很多时间配置，那么你一定要尝试一下 Fish。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017050204.png)

## 二、安装

Ubuntu 和 Debian 的安装方法。

<blockquote><pre><code class="language-bash">
$ sudo apt-get install fish
</code></pre></blockquote>

Mac 的安装方法。

<blockquote><pre><code class="language-bash">
$ brew install fish
</code></pre></blockquote>

其他系统的安装请参考[官方网站](http://fishshell.com/#platform_tabs)。

## 三、启动与帮助

安装完成后，就可以启动 Fish。

<blockquote><pre><code class="language-bash">
$ fish
</code></pre></blockquote>

由于 Fish 的语法与 Bash 有很大差异，Bash 脚本一般不兼容。因此，我建议不要将 Fish 设为默认 Shell，而是每次手动启动它。

使用过程中，如果需要帮助，可以输入`help`命令。浏览器就会自动打开，显示在线文档。

<blockquote><pre><code class="language-bash">
$ help
</code></pre></blockquote>

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

<blockquote><pre><code class="language-bash">
$ vi[按下 Tab 键]

vi (Executable link, 2.7MB)
view (Vi IMproved, 一个程序员的文本编辑器)
viewer.py (Executable, 967B)
viewres  (Graphical class browser for Xt)
…and 12 more rows
</code></pre></blockquote>

这时，再按一次`tab`，就可以在这些命令之中选择。

除了补全命令，Fish 还可以补全参数。比如，`ls`命令的`-l`参数后面按下`Tab`键，就会显示可以连用的其他参数。

<blockquote><pre><code class="language-bash">
$ ls -l[按下 Tab 键]

-l1  (List one file per line)
-lA  (Show hidden except . and ..)  
-la  (Show hidden)
-lB  (Ignore files ending with ~)
…and 16 more rows```
</code></pre></blockquote>

Fish 还可以自动补全 Git 分支。

<blockquote style="font-size: initial;"><pre><code>
$ git checkout m<span style="color: gray">aster</span>
</code></pre></blockquote>

## 七、易懂的语法

Fish 的语法非常自然，一眼就能看懂。

`if`语句。

<blockquote><pre><code class="language-bash">
if grep fish /etc/shells
    echo Found fish
else if grep bash /etc/shells
    echo Found bash
else
    echo Got nothing
end
</code></pre></blockquote>

`switch`语句。

<blockquote><pre><code class="language-bash">
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
</code></pre></blockquote>

`while`循环。

<blockquote><pre><code class="language-bash">
while true
    echo "Loop forever"
end
</code></pre></blockquote>

`for`循环。

<blockquote><pre><code class="language-bash">
for file in *.txt
    cp $file $file.bak
end
</code></pre></blockquote>

## 八、函数

Fish 的函数用来封装命令，或者为现有的命令起别名。

<blockquote><pre><code class="language-bash">
function ll
    ls -lhG $argv
end
</code></pre></blockquote>

上面代码定义了一个`ll`函数。命令行执行这个函数以后，就可以用`ll`命令替代`ls -lhG`。其中，变量`$argv`表示函数的参数。

下面是另一个例子。

<blockquote><pre><code class="language-bash">
function ls
    command ls -hG $argv
end
</code></pre></blockquote>

上面的代码重新定义`ls`命令。注意，函数体内的`ls`之前，要加上`command`，否则会因为无限循环而报错。

## 九、提示符

`fish_prompt`函数用于定义命令行提示符（prompt）。

<blockquote><pre><code class="language-bash">
function fish_prompt
    set_color purple
    date "+%m/%d/%y"
    set_color FF0
    echo (pwd) '>'
    set_color normal
end
</code></pre></blockquote>

执行上面的函数以后，你的命令行提示符就会变成下面这样。

<blockquote><pre><code class="language-bash">
02/06/13
/home/tutorial > 
</code></pre></blockquote>

## 十、配置

Fish 的配置文件是`~/.config/fish/config.fish`，每次 Fish 启动，就会自动加载这个文件。

我们可以在这个文件里面写入各种自定义函数，它们会被自动加载。比如，上面的`fish_prompt`函数就可以写在这个文件里面，这样每次启动 Fish，就会出现自定义的提示符。

Fish 还提供 Web 界面配置该文件。

<blockquote><pre><code class="language-bash">
$ fish_config
</code></pre></blockquote>

输入上面的命令以后，浏览器就会自动打开本机的 8000 端口，用户可以在网页上对 Fish 进行配置，比如选择提示符和配色主题。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017050203.png)

（正文完）

---

下面是推广时间。

最近，Angela Zhu 在她的公众号发文[《怎样让自己成为不可替代的程序员？》](http://mp.weixin.qq.com/s?timestamp=1493558063&src=3&ver=1&signature=Da2dsb9cqdeBndI-g*22yHoy-*Kp3rcbntqOq9J8yOMlEqV3YTi8qmnYLzu-Hgt*uZxDvzQ25fXmJh5k3Uov371zC88SRl0K6LtDCefXziV8Visa5NbwKFFZCzdoHxvB7yR4vhqvth*B*gRwgiLkRIotEKmlvXWI09u1Xpi49Qk=)。

> “前些日子，突发奇想，在我的小密圈里提了这样一个问题：‘未来，什么样的程序员才是不可替代的?’”

曹政回复了一篇[《当我们追求不可替代……》](http://mp.weixin.qq.com/s?src=3&timestamp=1493558035&ver=1&signature=ACqPIwmLy3Q7-F46jJ38fJz1o4qvq4nnvZAtlspMrCweJQqfVPpA6HcdfCAJ72oGUcv2rQxImZ9gJZPWdzkVoOTYZQuUlzSlknoKfhRHJZ0Ds5BN4xgcYGgqifgH0BZ-Q4UkXPAHPE5A8KBNl50D0a8IOgfuOs8*SPMIpWAPfPQ=)。

> “从我的历史来说，我一直追寻的是让自己可替代，不论是去尽可能培养年轻的接班人，还是外部延聘比我更出色的技术高手。如果没有人可以接手我的系统，我设计的平台，我才会觉得紧张和不安。”

这个讨论涉及了很多问题。

> - 个人如何保持竞争力
> - 公司如何选人
> - 如何留住人才

这些问题没有标准答案。但是，有一点是肯定的：程序员必须勇于尝试、开拓和创新，在挑战和失败面前不放弃。

[优达学城](https://cn.udacity.com/?utm_source=ruanyf&utm_medium=referral&utm_campaign=MLND02)帮助你形成自己的竞争力。

[![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017050205.jpg)](https://cn.udacity.com/course/machine-learning-engineer-nanodegree--nd009-cn-advanced/?utm_source=ruanyf&utm_medium=referral&utm_campaign=MLND02)

[《机器学习（纳米学位）》](https://cn.udacity.com/course/machine-learning-engineer-nanodegree--nd009-cn-advanced/?utm_source=ruanyf&utm_medium=referral&utm_campaign=MLND02)课程的报名本周四（5月4日）截止，主讲人是大名鼎鼎的 [Sebastian Thrun](https://en.wikipedia.org/wiki/Sebastian_Thrun)，他是谷歌无人驾驶汽车项目的奠基人。感兴趣的朋友不要错过，如果试听不满意，一周内全额退款。

[![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017050206.jpg)](https://cn.udacity.com/course/machine-learning-engineer-nanodegree--nd009-cn-basic/?utm_source=ruanyf&utm_medium=referral&utm_campaign=MLND02)

优达学城还有一门[《机器学习入门课程》](https://cn.udacity.com/course/machine-learning-engineer-nanodegree--nd009-cn-basic/?utm_source=ruanyf&utm_medium=referral&utm_campaign=MLND02)，重点讲授编程基础和数学基础（线性代数、微积分和统计学），适合不知道如何入门的年轻朋友。

另外，还有[《无人驾驶汽车》](https://cn.udacity.com/drive/?utm_source=ruanyf&utm_medium=referral&utm_campaign=MLND02)、[《人工智能》](https://cn.udacity.com/ai/?utm_source=ruanyf&utm_medium=referral&utm_campaign=MLND02)、[《机器人工程师》](https://cn.udacity.com/robotics/?utm_source=ruanyf&utm_medium=referral&utm_campaign=MLND02)等课程，大家也可以关注。

（完）