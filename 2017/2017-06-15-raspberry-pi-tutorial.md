# 树莓派新手入门教程

[树莓派](https://www.raspberrypi.org/)（Raspberry Pi）是学习计算机知识、架设服务器的好工具，价格低廉，可玩性高。

本文根据我的亲身经验，介绍如何从零开始，搭建一个树莓派服务器，控制 LED 灯。

## 一、型号

树莓派是一块电路板，也是一个迷你电脑。目前，最新的型号有两个。

（1）Raspberry Pi 3代 B 型 

（2）Raspberry Pi zero （含 zero w）

虽然后者比较便宜，但是少了许多接口（比如只有一个 USB 口），CPU 和内存都比较低，配件也少，因此推荐购买第3代的 B 型。本文以下的介绍都是针对这个型号。

## 二、配件

树莓派本身只是一个主机。要运行起来，必须有配件。

（1）电源

Micro USB 接口的手机充电器，就可以充当电源，但输出必须是 5V 电压、至少 2A 电流。我使用一个充电宝，当电源也没问题。

（2）Micro SD 卡

树莓派不带硬盘，外部插入的 Micro SD 卡就是硬盘。最小容量8G，推荐使用16G和32G的卡。

（3）显示器

树莓派有 HDMI 输出，具有 HDMI 接口的显示设备都能当作显示器。如果有 HDMI 转 VGA 的转接线，那么 VGA 显示器也可以。我用的是一个 7 寸的液晶监视器。

不过，显示器只在安装系统的时候需要，如果能够 [SSH](http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html) 登录，显示器完全是不必要的。如果你买的是装好系统的树莓派（即配有带系统的 Micro SD 卡），而且只用作服务器，那么可以不卖显示器。

（4）无线键鼠

3代 B 型树莓派内置蓝牙，所以 USB 无线键鼠和蓝牙无线键鼠都可以用。

就像上面说的，如果树莓派已经带有系统，而且只当作服务器，无线键鼠也可以不配。

## 三、电子元件

后文的实验需要一些电子元件。如果不做那个实验，下面的元件可以不买。

（1）面包板（一块）

（2）连接线（若干）

注意，连接线必须一端是公头，一端是母头。

另外，最好也准备一些两端都是公头的连接线，不过不是必须。

（3）LED 二极管（若干）

（4）270欧姆的电阻（若干）

## 四、安装系统

如果商家已经装好系统，可以跳过这一步，否则你需要自己安装操作系统。

官方提供的操作系统是 [Raspbian](https://www.raspberrypi.org/downloads/raspbian/)，这是 Debian 系统的定制版。官方还提供一个安装器 [NOOBS](https://www.raspberrypi.org/documentation/installation/noobs.md)，建议通过它来安装 Raspbian，相对简单一点。

> 1. 格式化 Micro SD 卡为 FAT 格式（[操作指导](https://www.raspberrypi.org/documentation/installation/noobs.md)）。
> 1. [下载 NOOBS](https://www.raspberrypi.org/downloads/noobs/)。
> 1. 将下载得到的`NOOBS.zip`，解压到 Micro SD 卡的根目录。
> 1. 将 Micro SD 卡插入树莓派底部的卡槽，接通电源，启动系统。

正常情况下，按照屏幕上的提示，一路回车，就能装好系统。

## 五、SSH 登录

安装系统后，树莓派就可以上网了（Wifi 或者网线）。这时，你要看一下它的局域网 IP 地址，可以使用下面的命令。

```bash
$ sudo ifconfig
```

然后，就可以从另一台电脑 SSH 登录树莓派。下面的命令是在局域网的另一台电脑上执行的。

```bash
$ ssh pi@192.168.1.5
```

上面代码中，`192.168.1.5`是我的树莓派的地址，你要换成你的地址。树莓派的默认用户是`pi`。

树莓派会提示你输入密码。`pi`的默认密码是`raspberry`。正常情况下，这样就可以登录树莓派了。

这时，树莓派就是标准的远程服务器了，可以进行各种服务器[操作](http://www.ruanyifeng.com/blog/2014/03/server_setup.html)了，比如修改密码。

```bash
$ passwd
```

以及添加一个新用户。

```bash
$ sudo useradd -d /home/bill -s /bin/bash -m bill 
$ sudo passwd bill
```

上面代码中，新用户的用户名是`bill`，可以改成你要的用户名。

另外，后面的实验还需要将用户加入`gpio`用户组。

```bash
$ sudo adduser pi gpio
```

上面的代码表示将用户`pi`加入`gpio`用户组。

## 六、安装 Node

我们的服务器使用 JavaScript 语言，必须先安装 Node。

根据[这篇文章](http://thisdavej.com/beginners-guide-to-installing-node-js-on-a-raspberry-pi/#install-node)、使用下面的命令安装 Node。

```bash
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt install nodejs
```

正常情况下，Node 8.x 版就已经安装成功了。

```bash
$ node -v
v8.1.0
```

## 七、点亮 LED

下面根据 Jonathan Perkin 的[文章](http://www.perkin.org.uk/posts/a-nodejs-powered-8-bit-cpu-part-one.html)，介绍使用树莓派开展电子实验。

首先，树莓派提供了一组对外的 IO 接口，称为 GPIO（ General-purpose input/output）。

它的 40 个脚的定义如下图。

注意，左上角的第1针（3.3V）是一个方块，其他针脚都是圆的。将树莓派翻过来，背后可以看到 GPIO 有一个角是方的，通过这种方法就可以确认哪一个针眼是3.3V。

接下来，取出面包板。本质上，面包板就是几根导线，上面开了许多可以连到导线的孔。`+`极和`-`极是两根垂直的导线，标着`1`、`5`、`10`这些数字的行，每一行都是一根水平的导线。导线与导线之间互不连接，另外，面包板的左右两半也是互不连接的。

然后，按照下面的图，将树莓派、面包板、LED 灯、电阻连起来。

上图中，红色导线表示电流的正极，从3.3V的针眼连到面包板。黑色导线表示电流的负极，从 GPIO 第三排地线（ground）的针眼连到面包板。这两根导线连到面包板的哪个眼并没有硬性规定，但必须保证能组成一个完整的电路（上图的箭头流向）。

注意，LED 二极管也有正负极，长脚表示正极，短脚表示负极。电阻没有正负极。

连接完成后，打开树莓派的电源，LED 灯泡应该就会亮起来了。

## 八、LED 控制脚本

下面，我们使用 Node 脚本控制 LED。

首先，将正极的导线从1号针脚（3.3V）拔出，查到第6排的11号针脚（上图的 GPIO 17）。这个针脚的电流是脚本可以控制的。

然后，在树莓派上新建一个实验目录。

```bash
$ mkdir led-demo
$ cd led-demo
```

接着，新建`package.json`，并安装控制 GPIO 的 Node 模块[`rpio`](https://www.npmjs.com/package/rpio)。

```bash
$ npm init -y
$ npm install -S rpio
```

然后，新建一个脚本[`led-on.js`](https://github.com/ruanyf/rpio-led-demo/blob/master/led-on.js)。

```javascript
// led-on.js
var rpio = require('rpio');

// 打开 11 号针脚（GPIO17) 作为输出
rpio.open(11, rpio.OUTPUT);

// 指定 11 号针脚输出电流（HIGH）
rpio.write(11, rpio.HIGH);
```

运行这个脚本，应该就会看到 LED 灯泡变亮了。

```bash
$ node led-on.js
```

再新建一个[`led-off.js`](https://github.com/ruanyf/rpio-led-demo/blob/master/led-off.js)脚本。

```javascript
// led-off.js
var rpio = require('rpio');

rpio.open(11, rpio.OUTPUT);

// 指定 11 号针脚停止输出电流（LOW）
rpio.write(11, rpio.LOW);
```

运行这个脚本，LED 灯泡应该就会熄灭了。

```bash
$ node led-off.js
```

有了这个脚本，让 LED 闪烁就变得轻而易举了。新建一个[`led-blink.js`](https://github.com/ruanyf/rpio-led-demo/blob/master/led-blink.js)脚本。

```javascript
// led-blink.js
var rpio = require('rpio');
rpio.open(11, rpio.OUTPUT);

function blink() {
  rpio.write(11, rpio.HIGH);
  setTimeout(function ledoff() {
    rpio.write(11, rpio.LOW);
  }, 50);
}

setInterval(blink, 100);
```

上面的脚本让 LED 每秒闪烁10次。

## 九、HTTP 服务器

虽然控制 LED 是一个很简单的功能，但是已经可以用它做不少事了。比如，我们可以在树莓派上架设一个 HTTP 服务器，每当有人访问这个服务器，LED 就亮一下。

首先，在刚才的目录里面装一个服务器模块。

```bash
$ npm install -S server
```

然后，新建一个脚本`server.js`（完整代码看[这里](https://github.com/ruanyf/rpio-led-demo/blob/master/serve.js)）。

```javascript
// server.js
var server = require('server');
var { get } = server.router;

// ...

server({ port: 8080 }, [
  get('/' ,  ctx => {
    console.log('a request is coming...');
    blink();
  }),
]);

console.log('server starts on 8080 port');
```

接着，运行这个脚本。

```bash
$ node server.js
```

然后，打开另一个命令行终端，访问8080端口，就会 LED 闪了一下。

```bash
$ curl http://localhost:8080
```

类似的用途还有很多，比如测试用例运行失败，LED 长亮，或者组装一个[8位的加法器](http://www.perkin.org.uk/posts/a-nodejs-powered-8-bit-cpu-part-two.html)，大家可以自己实验。

（完）