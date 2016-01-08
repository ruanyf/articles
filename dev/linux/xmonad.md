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

xMonad的所有操作，都要通过一个特殊的键。这个键一般是alt，但可以修改成其他键。

- alt + shift + enter打开一个终端窗口。
- alt + j 顺时针选择焦点窗口
- alt + k 逆时针选择焦点窗口
- alt + shift + j 顺时针移动焦点窗口
- alt + shift + k 逆时针移动焦点窗口
- alt + enter 使得焦点窗口与主区域窗口互换位置
- alt + l 和 alt + h 调整焦点窗口大小
- alt + space 切换显示模式，依次为主区域在左边、主区域在桌面上方，主区域占据整个桌面。
- 移动某个窗口，可以按住alt键，拖动它。
- alt + shift + q  退出xMonad。

修改这个操作键，可以在配置文件`~/.xmonad/xmonad.hs`之中，做如下设置，将其修改为Win键。

```bash
modMask = mod4Mask
```

### 工作区

xMonad提供9个工作区，使用`alt+1`到`alt+9`切换。 XMonad启动后，默认处于工作区1  。

如果要将一个程序移到不同的工作区，先用`alt + j`或`alt + k`，将其变成焦点窗口，然后使用`alt + shift + [1-9]`，将其移到所要的工作区。

### 双显示器

使用多显示器时，每个显示器会分配到一个工作区。xmonad启动时，工作区1在显示器1，工作区2在显示器2，以此类推。

有两种方法可以切换显示器。

- `mod + 1, 2, 3, ...0`切换到指定工作区。如果指定工作区当前不可见，那么当前焦点屏幕会变为该工作区。如果指定工作区位于当前可见的某个屏幕，然后当前焦点屏幕与指定工作区所在的屏幕会互换。
- `mod + w, e, r`切换到指定屏幕，对工作区无影响，仅仅改变焦点

多显示器配置工具：Xinerama、TwinView、 xrandr。另外，arandr是xrandr是GUI界面，可以单独使用。

- mod-{w,e,r} 显示器之间切换焦点，比如`mod + w`转移焦点到左显示器，`mod + e`转移焦点到右显示器。
- shift-mod-{w,e,r} 移动当前窗口到指定显示器。`mod + shift + w`将当前窗口移到右显示器，`mod + shift + e`将当前窗口移到右显示器。

默认，工作区1显示在主显示器，工作区2显示在第二个显示器。 如果要将工作区在显示器之间移动，按`alt + 2` 或者`alt + 1`。

首先查看本机的monitor设置。

```bash
$ xrandr -q
Screen 0: minimum 320 x 200, current 1920 x 1080, maximum 8192 x 8192
eDP1 connected primary 1920x1080+0+0 (normal left inverted right x axis y axis) 309mm x 175mm
   1920x1080     60.02*+  59.93  
   1680x1050     59.95    59.88  
   1600x1024     60.17  
   1400x1050     59.98  
   1280x1024     60.02  
   1440x900      59.89  
   1280x960      60.00  
   1360x768      59.80    59.96  
   1152x864      60.00  
   1024x768      60.00  
   800x600       60.32    56.25  
   640x480       59.94  
HDMI1 connected (normal left inverted right x axis y axis)
   1920x1080     60.00 +  50.00    59.94  
   1920x1080i    60.00    50.00    59.94  
   1680x1050     59.88   
   1400x1050     59.95  
   1600x900      59.98  
   1280x1024     75.02    60.02  
   1440x900      59.90  
   1280x800      59.91  
   1152x864      75.00  
   1280x720      60.00    50.00    59.94  
   1024x768      75.08    60.00  
   800x600       75.00    60.32  
   720x576       50.00  
   720x480       60.00    59.94  
   640x480       75.00    60.00    59.94  
   720x400       70.08  
DP1 disconnected (normal left inverted right x axis y axis)
HDMI2 disconnected (normal left inverted right x axis y axis)
```

打开双屏和单屏的Bash脚本。

```bash
# set dual monitors
dual () {
    xrandr --output edp1 --primary --right-of HDMI1 --output HDMI1 --auto
}

# set exactly alike monitors
same () {
  xrandr --output HDMI1 --auto
}

# set single monitor
single () {
    xrandr --output HDMI1 --off
}
```

参考链接

- [Dual screens, multi monitors : tips and tricks?](https://www.reddit.com/r/xmonad/comments/ndww5/dual_screens_multi_monitors_tips_and_tricks/)

### 配置

在主目录下新建一个.xmonad目录，然后在这个目录下新建一个xmonad.hs文件。

alt + q 重新运行配置文件

## xmonad.hs

```
import XMonad
import XMonad.Hooks.DynamicLog
import XMonad.Hooks.ManageDocks
import XMonad.Util.Run(spawnPipe)
import XMonad.Util.EZConfig(additionalKeys)
import System.IO

main = do
    xmproc <- spawnPipe "xmobar"

    xmonad $ defaultConfig
        { manageHook = manageDocks <+> manageHook defaultConfig
        , layoutHook = avoidStruts  $  layoutHook defaultConfig
        , logHook = dynamicLogWithPP xmobarPP
                        { ppOutput = hPutStrLn xmproc
                        , ppTitle = xmobarColor "green" "" . shorten 50
                        }
        , modMask = mod4Mask     -- Rebind Mod to the Windows key
        } `additionalKeys`
        [ ((mod4Mask .|. shiftMask, xK_z), spawn "xscreensaver-command -lock; xset dpms force off")
        , ((controlMask, xK_Print), spawn "sleep 0.2; scrot -s")
        , ((0, xK_Print), spawn "scrot")
        ]
```

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
- [Xmonad Tutorial for Beginning Beginners](http://beginners-guide-to-xmonad.readthedocs.org/en/latest/configure_xmobar.html)
