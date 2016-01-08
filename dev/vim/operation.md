# Vim操作

## 命令格式

vim的命令采用下面的格式。

```
[OPERATOR][NUMBER][MOTION]
```

Operator是动词。

- d – Delete (等同于cut命令)
- c – Change
- y – Yank
- p – Insert last deleted text after cursor (put command)
- r – Replace
- v - 可视化选择

Motion表示操作的上下文。

- w – 直到下一个单词的起始位置前面。
- s - sentence
- p - paragraph
- t - tag
- b - block
- e – 直到当前单词的最后一个位置。
- $ – 直到当前行的最后一个位置。
- ) – 下一个句子的开始。
- ( – 当前句子的开始。
- } – 下一段的开始。
- { – 当前段的开始。
- ] – 下一段部分（section）的开始
- `[` – 当前部分（section）的开始
- `H` – 当前屏幕的顶部行
- `L` – 当前屏幕的最后一行

Count是可选的，表示command和motion的重复次数。

- i - inside
- a - around
- NUM: number (e.g.: 1, 2, 10)

实例

- dw 删除一个词
- d4w 删除四个词
- d$ 删除当前行
- dd 删除当前行（d$的快捷方式）
- d2$ 删除两行
- cis - Change inside sentence，删除当前句子，并进入insert模式
- yip - yank inside paragrah 复制当前段落

## 撤销命令

- u 撤销上个命令

## 移动光标

- h – Left
- k – Up
- l – Right
- j – Down
- G 移动到文件最后一行
- 123 + G 跳到指定行
- gg 移动到文件第一行
- ctrl + g 查看当前文件总行数
- % 移动到当前代码区块的开始/结尾（匹配`()`，`[]`，`{}`）

## 插入文字

- i 当前位置前面
- a 当前位置后面
- o 当前行下方新增一行
- O 当前行上方新增一行

## 删除

- x 删除当前字符

## 搜索，替换

- :/cat 搜索光标位置后面
- :?dogs 搜索光标位置前面
- n 移动到下一个匹配
- N 移动到上一个匹配
- :s/cat/dog 只替换下一个
- :s/cat/dog/g 替换所有

## 执行shell命令

- :!ls -al

## 复制，粘贴，剪切

### 选择文本

- v+光标移动 （按字符选择）高亮选中所要的文本，然后进行各种操作（比如，d表示删除）。
- V （按行选择）
- v+选中的内容+c 更改选中的文字

### 复制：y(ank)

- y 用v命令选中文本后，用y进行复制
- yy 复制当前行，然后用p进行复制
- 5yy 复制从当前行开始的5行
- y_ 等同于yy
- Y 等同于yy
- yw 复制当前单词
- y$ 从当前位置复制到行尾
- y0 从当前位置复制到行首
- y^ 从当前位置复制到第一个非空白字符
- yG 从当前行复制到文件结束
- y20G 从当前行复制到第20行
- y?bar 复制至上一个出现bar的位置

### 粘贴

- p 在光标位置之后粘贴
- P 在光标位置之前粘贴

### 剪切

- v + 选中的内容 + d 剪切

### 剪贴板

（1） 简单复制和粘贴

vim提供12个剪贴板，它们的名字分别为vim有11个粘贴板，分别是`0`、`1`、`2`、`...`、`9`、`a`、`“`。如果开启了系统剪贴板，则会另外多出两个：`+`和`*`。使用`:reg`命令，可以查看各个粘贴板里的内容。

```bash
:reg
```

在vim中简单用y只是复制到`“`（双引号)粘贴板里，同样用p粘贴的也是这个粘贴板里的内容。

（2）复制和粘贴到指定剪贴板

要将vim的内容复制到某个粘贴板，需要退出编辑模式，进入正常模式后，选择要复制的内容，然后按"Ny完成复制，其中N为粘贴板号（注意是按一下双引号然后按粘贴板号最后按y），例如要把内容复制到粘贴板a，选中内容后按"ay就可以了。

要将vim某个粘贴板里的内容粘贴进来，需要退出编辑模式，在正常模式按"Np，其中N为粘贴板号。比如，可以按"5p将5号粘贴板里的内容粘贴进来，也可以按"+p将系统全局粘贴板里的内容粘贴进来。

（3）系统剪贴板

Vim支持系统剪贴板，需要打开clipboard功能。使用下面的命令，检查当前版本的Vim，是否支持clipboard。

```bash
$ vim --version
```

如果不支持的话，需要安装图形化界面的vim（即gvim），或者重新编译vim。

```bash
$ sudo apt-get install gvim
正在读取软件包列表... 完成
正在分析软件包的依赖关系树
正在读取状态信息... 完成
Package gvim is a virtual package provided by:
  vim-gtk 2:7.4.488-7
  vim-gnome 2:7.4.488-7
  vim-athena 2:7.4.488-7
You should explicitly select one to install.

E: Package 'gvim' has no installation candidate

$ sudo apt-get install vim-gnome
```

另一种方法，是安装vim-gui-common。

```bash
$ sudo apt-get install vim-gui-common
```

安装以后，可以用命令行界面，启动gvim，这时可用系统剪贴板。

```bash
$ gvim -v
```

星号（`*`）和加号（`+`）粘贴板是系统粘贴板。在windows系统下， * 和 + 剪贴板是相同的。对于 X11 系统， * 剪贴板存放选中或者高亮的内容， + 剪贴板存放复制或剪贴的内容。打开clipboard选项，可以访问 + 剪贴板；打开xterm_clipboard，可以访问 * 剪贴板。 * 剪贴板的一个作用是，在vim的一个窗口选中的内容，可以在vim的另一个窗口取出。

复制到系统剪贴板
- `"*y`
- `"+y`
- `"+2yy` – 复制两行
- `{Visual}"+y` - copy the selected text into the system clipboard
- `"+y{motion}` - copy the text specified by {motion} into the system clipboard
- `:[range]yank +` - copy the text specified by `[range]` into the system clipboard

剪切到系统剪贴板
- `"+dd` – 剪切一行

从系统剪贴板粘贴到vim
- `"*p`
- `"+p`
- `Shift+Insert`
- `:put +` - Ex command puts contents of system clipboard on a new line
- `<C-r>`+ - From insert mode (or commandline mode)

`"+p`比 Ctrl-v 命令更好，它可以更快更可靠地处理大块文本的粘贴，也能够避免粘贴大量文本时，发生每行行首的自动缩进累积，因为`Ctrl-v`是通过系统缓存的stream处理，一行一行地处理粘贴的文本。

## 多窗口

垂直切分窗口，Ctrl-w + s 或者使用下面的命令。

```bash
:split <文件名>
```

水平切分窗口，Ctrl-w + v 或者使用下面的命令。

```bash
:vsplit <文件名>
```

如果省略文件名，则打开的是当前文件。

切换窗口的命令。

- Ctrl-w +  Ctrl-w
- Ctrl-w + direction key

## vimrc文件配置

打开语法高亮

```bash
:syntax on
```

禁止使用箭头键。

```bash
nnoremap <Left> :echoe "Use h"<CR>
nnoremap <Right> :echoe "Use l"<CR>
nnoremap <Up> :echoe "Use k"<CR>
nnoremap <Down> :echoe "Use j"<CR>
```

在窗口间移动。

```bash
nnoremap <c-j> <c-w>j
nnoremap <c-k> <c-w>k
nnoremap <c-h> <c-w>h
nnoremap <c-l> <c-w>l
```

## 命令行模式

```bash
# 列出所有buffer
:ls

# 列出所有buffer（包括不可见buffer）
:ls!

# 在当前窗口打开一个新的文件，
# 新建一个buffer，原有文件成为不可见buffer
:e file1

# 新建一个未命名的buffer，然后将其存为 /tmp/foo
:enew
:w /tmp/foo
```

## 插件

- [Markdown语法高亮](https://github.com/plasticboy/vim-markdown)

### dmw多窗口管理

网址：http://www.vim.org/scripts/script.php?script_id=4186

窗口按下面方式组织。

```
================= 
|      |     S1 | 
|      |==========
|  M   |     S2 | 
|      |========== 
|      |     S3 | 
================= 
```

操作
- CTRL-N 在[M]区域创建一个新窗口，将以前的窗口都堆在[S]区域
- CTRL-C 关闭当前窗口
- CTRL-J 跳到下一个窗口（顺时针方向）
- CTRL-K 跳到前一个窗口（逆时针方向）
- CTRL-F 将当前窗口放入[M]区域，并将其他窗口放在[S]区域

## 提示行操作

- :w: write your changes to the file
- :q!: get out of vim (quit), but without saving your changes (!)
- :wq: write your changes and exit vim
- :saveas ~/some/path/: save your file to that locationvim
- ZZ: a faster way to do :wq
