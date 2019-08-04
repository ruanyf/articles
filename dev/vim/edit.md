# 编辑

## 进入编辑模式

进入编辑模式，有以下几个方式。

- i 光标位于当前字符的前面（insert）
- a 光标位于当前字符的后面（append）
- I 光标位于当前行的行首
- A 光标位于当前行的行尾
- o 当前行的下方插入一行
- O 当前行的上方插入一行

## 删除

- x 删除当前字符
- 3x 删除当前字符及其后的两个字符。
- dd 删除当前行。
- 5dd 删除当前行及随后的四行文本。
- dj 删除当前行及下一行。
- dgg 删除文件开头到当前位置。
- `d/foo` 删除到下一个`/foo`的位置。
- dw 删除从光标位置开始到下一个单词的开头。
- dW  删除从光标位置开始到下一个单词的开头，并且不考虑标点符号。
- d$	删除从光标位置开始到当前行的行尾。
- d0	删除从光标位置开始到当前行的行首。
- d^	删除从光标位置开始到文本行的第一个非空字符。
- dG	删除从当前行到文件的末尾。
- d20G	删除从当前行到文件的第20行。
- J 删除本行行尾的换行符，即将本行与下一行连在一起。

## 撤销

- u 撤销上一个操作，即 undo
- ctrl + r 撤销前一个撤销，即redo
- U 行撤销，即撤销所有在当前行的编辑

## 改变

`c`跟`d`的作用相同，但是删除以后，会进入编辑模式，`d`还是停留在命令模式。所以，`d`是删除，`c`是改变。

- `cw` 删除单词
- `cc` 删除整行

## 缩进

- `>>` 缩进当前行
- `5>>` 连续缩进5行
- `>l` 缩进当前行
- `>j` 缩进当前行及下一行
- `>4k` 向上缩进4行
- `>gg` 缩进到文件开头
- `>}` 缩进到下一段的结尾。

`<`为减小缩进。

## 变为小写

- gu4j 接连4行变成小写
- gugg 当前位置到文件开头变为小写
- guG 当前位置到文件结尾变为小写
- gU 变为大写
- g~ 改变大小写。

## 当前行

`_`表示当前行。

- d_ to delete the current line
- c_ to delete it and enter insert mode
- y_ to yank it
- >_ to indent it
- gu_ to lowercase it
- gU_ to uppercase it
- g~_ to toggle its case

由于当前行操作很常见，所以重复也表示操作当前行。

- dd
- cc

## 当前词

`iw`表示当前词。

- diw to delete the word under the cursor
- ciw to delete it and enter insert mode
- yiw to yank it
- guiw to lowercase it
- gUiw to uppercase it
- g~iw to toggle its case

## 当前段落

`ip`表示当前段落。

- dip to delete the paragraph under the cursor
- cip to delete it and enter insert mode
- yip to yank it
- guip to lowercase it
- gUip to uppercase it
- g~ip to toggle its case

## 当前引用

`i"` refers to the text between the quotes, and `a"` refers to the same but also includes the quotes. Similarly you have `i'` and `a'`, `i(` and `a(`, `i[` and `a[`, `i{` and `a{`, `i<` and `a<`, and `i\`` and `a\``。

基本操作 d, c, y, gu, gU, g~, 

