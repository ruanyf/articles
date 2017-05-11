# .vimrc 配置文件

用户主目录下的`.vimrc`，是 Vim 的配置文件。

```
colorscheme badwolf         " 配色方案
syntax enable           " 打开语法处理
set tabstop=4       " 打开新文件时，遇到 tab 键等于4个空格
set softtabstop=4   " 编辑时按下 tab 键，相当于4个空格
set expandtab       " 将 tab 键变为空格键的快捷方式
set number              " 显示行号
set showcmd             " 在底部显示上一条命令
set cursorline          " 高亮光标所在的行
filetype indent on      " 指定文件类型相关的缩进
set wildmenu            " 打开底部命令行的自动补全
set lazyredraw          " 只在需要时重绘
set incsearch           " 打开边输入边搜索
set hlsearch            " 打开搜索结果高亮
set foldenable          " 打开折叠功能
```
