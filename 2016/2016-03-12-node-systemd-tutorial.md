# Node 应用的 Systemd 启动

前面的文章介绍了 Systemd 的[操作命令](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html)和[基本用法](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html)，今天给出一个实例，如何使用 Systemd 启动一个 Node 应用。

本文是独立的，不需要前面的教程作为预备知识。

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016031201.jpg?i=362820196)

# 一、克隆代码

首先，下载[示例库](https://github.com/ruanyf/node-systemd-demo)。

```bash
$ git clone https://github.com/ruanyf/node-systemd-demo.git
$ cd node-systemd-demo
```

示例脚本[`server.js`](https://github.com/ruanyf/node-systemd-demo/blob/master/server.js)非常简单，就是一个 HTTP 服务器。

```javascript
var http = require('http');

var hostname = '0.0.0.0';
var port = 5000;

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
}).listen(port, hostname, function () {
  console.log('Server running at http://%s:%s/', hostname, port);
});
```

## 二、修改配置文件

Systemd 启动上面这个脚本，需要一个配置文件[`node-server.service`](https://github.com/ruanyf/node-systemd-demo/blob/master/node-server.service)。这个文件的文件名可以随便取，但是后缀名必须是`.service`。

```bash
[Unit]
Description=node simple server

[Service]
ExecStart=[/path/to/node/executable] [path/to/node-systemd-demo]/server.js
Restart=always
User=[yourUserName]
Group=[yourUserGroup]
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=[/path/to/node-systemd-demo]

[Install]
WantedBy=multi-user.target
```

上面脚本里面，有五个地方出现了四个占位符。

> - `[/path/to/node/executable]`：node可执行文件的绝对路径
- `[path/to/node-systemd-demo]`：示例库的绝对路径
- `[yourUserName]`：你的用户名
- `[yourUserGroup]`：你的组名


你需要将上面这四个占位符，改成自己电脑的设置。下面是一个已经改好的例子。

```bash
[Unit]
Description=node simple server

[Service]
ExecStart=/usr/bin/node /tmp/node-systemd-demo/server.js
Restart=always
User=nobody
Group=nobody
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/tmp/node-systemd-demo

[Install]
WantedBy=multi-user.target
```

如果你不知道这几个占位符的值，下面的命令可以帮你找出来。

```bash
# node executable path
$ which node

# your user name
$ id -un

# your group name
$ id -gn
```

## 三、配置文件的解释

简单解释一下，上面的配置文件的几个参数。

`Unit`区块的`Description`字段，是服务的简单描述。

`Service`区块的字段含义如下。

> - `ExecStart`：启动命令
- `Restart`：如何重启。`always`表示如果进程退出，总是重启
- `Environment`：环境变量
- `WorkingDirectory`：工作目录

`Install`区块的`WantedBy`字段指定，设为开机启动时，该服务所在的 Target 是`multi-user.target`。

## 四、启动服务

现在将配置文件拷贝到 Systemd 之中。

```bash
$ sudo cp node-server.service /etc/systemd/system
```

接着，就启动服务。

```bash
# 重载配置文件
$ sudo systemctl daemon-reload

# 启动服务
$ sudo systemctl start node-server
```

访问 http://0.0.0.0:5000，应该看到网页显示“Hello World”。

## 五、查看状态

如果启动失败，或者想查看日志，就要执行下面的命令。

```bash
# 查看状态
$ sudo systemctl status node-server

# 查看日志
$ sudo journalctl -u node-server

# 实时输出最新日志
$ sudo journalctl --follow -u node-server
```

## 六、重启服务和停止服务

```bash
# 重启服务
$ sudo systemctl restart node-server

# 停止服务
$ sudo systemctl stop node-server
```

如果想设为开机启动，就要执行`systemctl enable`。

```bash
$ sudo systemctl enable node-server
```

## 七、Socket 激活

一般情况下，学到这里，应该就够用了。如果你还想体验一下 Systemd 的强大功能，请接着往下读。

我们知道，HTTP服务器启动在那里，终究是耗费资源的。那么能不能做到，只有 有人访问时，才启动服务，否则就关闭？

这在 Systemd 里面叫做“Socket 激活”。开发者可以指定 Socket 监听的端口，系统根据有没有收到请求，自动启动或关闭服务。不难想到，只要前面加一层负载均衡器，这就等同于实现了一个简单的云服务，即根据访问量，系统自动扩容或收缩。

下面就是“Socket 激活”的Demo。

## 八、安装依赖

首先，请确认前面启动的 Node 服务已经被关闭了，5000 端口已经释放出来了。

然后，打开启动脚本[`socket-server.js`](https://github.com/ruanyf/node-systemd-demo/blob/master/socket-server.js)，你会发现多出了两个模块：[`systemd`](https://www.npmjs.com/package/systemd) 和 [`autoquit`](https://www.npmjs.com/package/autoquit)。

```javascript
require('systemd');
require('autoquit');

var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
});

server.autoQuit({ timeOut: 60 });
server.listen('systemd');

console.log('Server running at http://0.0.0.0:5000/');
```

上面代码中，`systemd`模块用于添加“Socket 激活”，`autoquit`模块用于指定多少时间无人访问后，关闭 Node 服务，上面脚本是60秒。另外，还有一个[`journald`](https://www.npmjs.com/package/journald)模块，用于向 Systemd 日志添加内容，这个例子中没有使用。

现在，安装依赖。

```bash
$ npm install
```

## 九、改写配置文件

Socket 激活需要两个配置文件。

一个是[`node-socket-server.socket`](https://github.com/ruanyf/node-systemd-demo/blob/master/node-socket-server.socket)。

```bash
[Socket]
ListenStream=5000

[Install]
WantedBy=sockets.target
Status API Training Shop Blog About Pricing
```

另一个是[`node-socket-server.service`](https://github.com/ruanyf/node-systemd-demo/blob/master/node-socket-server.service)。

```bash
[Unit]
Description=node simple server (socket activation)

[Service]
ExecStart=[/path/to/node/executable] [path/to/node-systemd-demo]/socket-server.js
User=[yourUserName]
Group=[yourGroupName]
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=[/path/to/node-systemd-demo]
```

上面这个文件需要改写占位符。可以看到，由于不是开机启动，配置文件里面没有`Install`区块；由于不需要重启，也没有`Restart`字段。

改写后，将它们拷贝到 Systemd。

```bash
$ sudo cp node-socket-server.socket /etc/systemd/system
$ sudo cp node-socket-server.service /etc/systemd/system
```

## 十、启动 Socket 激活

然后，执行下面两个命令，启动 Socket 激活。

```
$ sudo systemctl daemon-reload
$ sudo systemctl start node-socket-server.socket
```

这个时候，检查一下状态。

```bash
$ sudo systemctl status node-socket-server.socket
● node-socket-server.socket
   Loaded: loaded (/etc/systemd/system/node-socket-server.socket; disabled)
   Active: active (listening) since 2016-03-10 20:36:41 CST; 7s ago
   Listen: [::]:5000 (Stream)

$ sudo systemctl status node-socket-server.service
● node-socket-server.service - node simple server (socket activation)
      Loaded: loaded (/etc/systemd/system/node-socket-server.service; disabled)
      Active: inactive (dead)
```

可以看到，`node-socket-server.socket`是激活的（active），而`node-socket-server.service`没有（inactive）。

这时访问 http://0.0.0.0:5000 ，会发现网页可以正常访问。

然后，再检查一下状态。

```bash
$ sudo systemctl status node-socket-server.socket
● node-socket-server.socket
   Loaded: loaded (/etc/systemd/system/node-socket-server.socket; disabled)
   Active: active (running) since 2016-03-10 20:36:41 CST; 1min 20s ago
   Listen: [::]:5000 (Stream)

$ sudo systemctl status node-socket-server.service
● node-socket-server.service - node simple server (socket activation)
   Loaded: loaded (/etc/systemd/system/node-socket-server.service; disabled)
   Active: active (running) since 2016-03-10 20:37:55 CST; 3min 11s ago
 Main PID: 1084 (node)
   CGroup: /system.slice/node-socket-server.service
           └─1084 node /home/ruanyf/project/node-systemd-demo/socket-server.js
```

这时，`socket`和`service`都激活了。

## 十一、停止服务

此时，如果手动停止 HTTP 服务器，Systemd 会发出一个警告。

```bash
$ sudo systemctl stop node-socket-server.service
Warning: Stopping node-socket-server.service, but it can still be activated by:
  node-socket-server.socket
```

上面的警告表示，Socket 依然是激活的，因此服务随时可能被重启，所以还需要关闭 Socket 激活。

```bash
$ sudo systemctl stop node-socket-server.socket
```

## 十二、参考链接

- Ruben Vermeersch, [Deploying Node.js with systemd](https://rocketeer.be/articles/deploying-node-js-with-systemd/)
- Mike MacCana, [How to deploy your node app on Linux, 2016 edition](https://certsimple.com/blog/deploy-node-on-linux)

（完）