# xMonad的用法

xMonad是一款平铺式窗口管理器（Tiling window manager），即能够以一定顺序，自动将多个应用程序窗口平铺放置在桌面上。

## xMonad

xMonad是用Haskell语言开发的。但是即使对Haskell语言所知甚少，但是也能很顺利地使用。

运行下面的语句，安装xMonad。

```bash
$ sudo apt-get install xmonad xmobar
```

安装完成后，退出再重新登录，选择xMonad会话。登录后，你会看到一个完全空白的桌面，这说明xMonad起作用了。

第一个打开的应用程序，从占据桌面的左边区域，这称为“主区域”（main area），即该窗口占据最大的一个区域。以后打开的应用程序，都会占据右边的区域。
 
### 操作
 
- alt + shift + enter打开一个终端窗口。
- alt + shift + c 关闭当前窗口
- alt + j 顺时针选择焦点窗口
- alt + k 逆时针选择焦点窗口
- alt + shift + j 顺时针移动焦点窗口
- alt + shift + k 逆时针移动焦点窗口
- alt + , 增加主方框中的窗口数量
- alt + . 减少主方框中的窗口数量
- alt + enter 使得焦点窗口与主区域窗口互换位置
- alt + l 和 alt + h 调整焦点窗口大小
- alt + space 切换显示模式，依次为主区域在左边、主区域在桌面上方，主区域占据整个桌面。
- 移动弹出窗口，可以按住alt键，拖动它。
- alt + shift + q  退出xMonad。

### 工作区

xMonad提供9个工作区，使用alt+1 ~9切换。 XMonad启动后，默认处于工作区1  。

如果要将一个程序移到不同的工作区，先用alt + j/k，将其变成焦点窗口，然后使用 alt + shift + [1-9]，将其移到所要的工作区。

### 窗口悬浮

- alt + 鼠标左键拖拽, 可以使一个窗口悬浮
- alt + 鼠标中键, 使得悬浮窗口前端显示
- alt + 鼠标右键拖拽, 修改悬浮窗口大小
- 鼠标所在的位置将成为窗口的右下角
- alt + t 可以使窗口取消悬浮

### 双显示器

默认情况，工作区1显示在主显示器，工作区2显示在第二个显示器。 如果要将工作区在显示器之间移动，按alt + 2 或者 alt + 1。使用alt + shift + 1，将焦点窗口移到主显示器；alt + shift + 2，将焦点窗口移到第二个显示器。

- alt + w 焦点移到左显示器
- alt + e 焦点移到右显示器

### 配置

在主目录下新建一个.xmonad目录，然后在这个目录下新建一个xmonad.hs文件。

alt + q 重新运行配置文件

## XMobar

在主目录下，建立一个.xmobarrc文件。

```bash
Config { font = "-*-Fixed-Bold-R-Normal-*-13-*-*-*-*-*-*-*"
, bgColor = "black"
, fgColor = "grey"
, position = Top
, lowerOnStart = True
, commands = [ Run Weather "EGPN" ["-t","<station>: <tempC>C","-L","18","-H","25","--normal","green","--high","red","--low","lightblue"] 36000
             , Run Network "eth0" ["-L","0","-H","32","--normal","green","--high","red"] 10
             , Run Network "eth1" ["-L","0","-H","32","--normal","green","--high","red"] 10
             , Run Cpu ["-L","3","-H","50","--normal","green","--high","red"] 10
             , Run Memory ["-t","Mem: <usedratio>%"] 10
             , Run Swap [ ] 10
             , Run Date "%a %b %_d %Y %H:%M:%S" "date" 10
             ]
, sepChar = "%"
, alignSep = "}{"
, template = "%cpu% | %memory% * %swap% | %eth0% }{ %EGPN% | <fc=#ee9a00>%date%</fc>"
}
```

## dmenu

dmenu提供一个菜单条，可以快速启动应用程序。它从$PATH变量指定的路径中，寻找应用程序。

安装方法。

```bash
$ sudo apt-get install dmenu
```

运行dmenu。

```bash
$ dmenu_run
```

一般来说，需要为这个命令定义一个快捷键，通常是Alt+p。按这个键，就可以启动dmenu菜单条。

XFCE4环境下定义一个快捷键。   [Desktop Entry]
   Encoding=UTF-8
   Name=xmonad
   Comment=This session starts xmonad
   Exec=/usr/local/bin/xmonad
   Type=Application

- Select Menu | Settings | Settings Manager from the main menu
- Click the Keyboard icon in the Settings Manager
- Click the Application Shortcuts tab
- Click Add
- Write dmenu_run in the command box that appears
- When prompted for the short cut keys, press Super and Space (or the combination you prefer)
- If the combination is in use, you will see an error message and be invited to type another
- Click OK and close the Settings Manager and Keyboard windows
- Test your new shortcut

## Yeganesh

[Yeganesh](http://dmwit.com/yeganesh/)对dmenu再包装，优先返回最常用的程序。

首先，安装dmenu，然后安装cabal-install，可以运行`cabal快捷键 --help`查看是否已经安装cabal。确定`$HOME/.cabal/bin`已经加入了$PATH变量的路径中，寻找可执行文件。

运行下面的命令安装yeganesh。
   [Desktop Entry]
   Encoding=UTF-8
   Name=xmonad
   Comment=This session starts xmonad
   Exec=/usr/local/bin/xmonad
   Type=Application
```bash
$ cabal install yeganesh
``` 

运行yeganesh，最常用的程序排在最前面。

```bash
$ yeganesh -x 
```

## 参考链接

- [How-to: Set up XMonad & XMobar on Ubuntu](http://www.huntlycameron.co.uk/2010/11/how-to-set-up-xmonad-xmobar-ubuntu/)：入门介绍
