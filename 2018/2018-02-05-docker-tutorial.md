# Docker 入门教程

从2013年发布至今， [Docker](https://www.docker.com/) 一直广受瞩目，被认为是最重要的新工具之一，可能会改变软件行业。

但是，许多人并不清楚它到底是什么，要解决什么问题，好处又在哪里？本文就来详细解释，帮助大家理解 Docker，还带有通俗易懂的编写实例，教你如何将它用于日常开发。

## 一、环境配置的难题

软件开发最麻烦的事情之一，就是环境配置。每一台计算机的环境都不尽相同，你怎么知道自家的软件，能在用户的计算机上跑起来？用户必须保证两件事：操作系统的设置，各种库和组件的安装。只有它们都正确，软件才能运行。

举例来说，你要安装一个 Python 应用，首先计算机必须有 Python 引擎，然后还必须有各种依赖，可能还要配置环境变量。如果某些老旧的模块与当前环境不兼容，那就麻烦了。开发者常常会说：“它在我的机器可以跑了”（It works on my machine），言下之意就是，其他机器很可能跑不了。

环境配置如此麻烦，换一台机器，就要重来一次，旷日费时。终于有一天，有人想到了一个根本的解决方案：能不能带环境安装？也就是说，安装的时候，把开发环境一模一样地复制过来。

## 二、虚拟机

虚拟机（virtual machine）是一种特殊的软件，可以在一种操作系统里面运行另一种操作系统，比如在 Windows 系统里面运行 Linux 系统。应用程序对此毫无感知，因为虚拟机看上去跟真实系统一模一样，而对于底层系统来说，虚拟机就是一个普通文件，不需要了就删掉，对系统的其他部分毫无影响。

看上去，虚拟机能够完美解决环境配置问题：用户可以通过虚拟机还原软件的开发环境。但是，这个方案有几个缺点。

（1）资源占用多

内存和硬盘空间分配给虚拟机以后，其他程序就不能使用这些资源了。假定虚拟机运行需要 4G 内存，那么底层系统可用的内存就会少掉 4G。更糟糕的是，应用程序真正使用的内存可能只有一点点，但也无法减少分配给虚拟机的内存。

（2）冗余步骤多

虚拟机是完整的操作系统，一些系统级别的操作步骤，往往无法跳过，比如用户登录。

（3）启动慢

启动操作系统需要多久，启动虚拟机就需要多久。发出命令后，可能要等几分钟，应用程序才能真正运行起来。

## 三、Linux 容器

由于虚拟机存在这些缺点，Linux 内核开始发展另一种虚拟化技术：Linux 容器（Linux Containers，缩写为 LXC）。

Linux 容器不是模拟一个完整的操作系统，而是对进程进行隔离，或者说，在正常进程的外面套了一个[保护层](https://opensource.com/article/18/1/history-low-level-container-runtimes)。对于容器里面的进程来说，它接触到的各种资源都是虚拟的，从而实现与底层系统的隔离。由于容器是进程级别的，相比虚拟机有很多优势。

（1）启动快

容器里面的应用，直接就是底层系统的一个进程，而不是虚拟机内部的进程。所以，启动容器相当于启动本机的一个进程，而不是启动一个操作系统，速度就快很多。

（2）资源占用少

容器只占用所用到的资源，不占用那些没有用到的资源，而虚拟机由于是完整的操作系统，不可避免要占用所有资源。另外，多个容器可以共享资源，虚拟机都是独享资源。

（3）体积小

容器只要包含用到的组件即可，而虚拟机是整个操作系统的打包，所以容器文件比虚拟机文件要小很多。

总之，容器有点像轻量级的虚拟机，能够提供虚拟化的环境，但是成本开销小得多。

## 四、Docker 是什么？

Docker 属于 Linux 容器的一种封装，提供简单易用的接口。它是目前最流行的 Linux 容器解决方案。

Docker 将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。因此，一台物理机可以同时提供多种环境。有了 Docker，就不用担心环境问题。只要保证虚拟环境正确，就能让应用跑起来。

总体来说，Docker 的接口相当简单，用户可以方便地创建和使用容器，把自己的应用放入容器。容器还可以进行版本管理、复制、分享、修改，就像管理普通的代码一样。

## 五、Docker 的用途

Docker 的主要用途，目前有三大类。

第一类是提供一次性的环境，比如本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。

第二类是提供弹性的云服务，因为 Docker 容器可以随开随关，很适合动态扩容和缩容。

第三类是组建微服务架构。通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构。

## 六、Docker 的安装

Docker 是一个开源的商业产品，有两个版本：社区版（Community Edition，缩写为 CE）和企业版（Enterprise Edition，缩写为 EE）。企业版包含了一些收费服务，个人开发者一般用不到。下面的介绍都针对社区版。

Docker CE 的安装请参考官方文档。

> - [Mac](https://docs.docker.com/docker-for-mac/install/)
> - [Windows](https://docs.docker.com/docker-for-windows/install/)
> - [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
> - [Debian](https://docs.docker.com/install/linux/docker-ce/debian/)
> - [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/)
> - [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)
> - [其他 Linux 发行版](https://docs.docker.com/install/linux/docker-ce/binaries/)

安装完成后，运行下面的命令，验证是否安装成功。

```bash
$ docker version
# 或者
$ docker info
```

Docker 需要用户具有 sudo 权限，为了避免每次命令都输入`sudo`，可以把用户加入 Docker 用户组（参考[官方文档](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user)）。

```bash
$ sudo usermod -aG docker $USER
```

还有一点，Docker 是服务器——客户端架构。命令行运行`docker`命令的时候，需要本机有 Docker 服务。如果这项服务没有启动，可以用下面的命令启动（参考[官方文档](https://docs.docker.com/config/daemon/systemd/)）。

```bash
# service 命令的用法
$ sudo service docker start

# systemctl 命令的用法
$ sudo systemctl start docker
```

## 六、image 文件

用户必须有 image 文件，才能生成 Docker 容器。image 文件可以看作是容器的模板。Docker 根据 image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。

image 是二进制文件，应用程序和程序的依赖都包含在这个文件里面。image 文件可以继承，实际开发中，一个 image 文件往往是在另一个 image 文件的基础上，加上一些个性化设置。举例来说，你可以在 Ubuntu image 的基础上，加上 Apache 服务器，形成你的 image。

下面的命令可以列出本机的所有 image 文件。

```bash
$ docker image ls
```

如果要删除 image 文件，可以使用[`docker image rm`](https://docs.docker.com/engine/reference/commandline/image_rm/)命令。

```bash
$ docker image rm [imageName]
```

image 文件是通用的，一台机器的 image 文件拷贝到另一台机器，照样可以使用。一般来说，为了节省时间，我们应该尽量使用别人制作好的 image 文件，而不是自己制作。即使要定制，也应该基于别人的 image 文件进行加工，而不是从零开始制作。

为了方便共享，image 文件制作完成后，可以上传到网上的仓库。Docker 的官方仓库 [Docker Hub](https://hub.docker.com/) 是最重要、最常用的 image 仓库。

## 七、实例：hello world

下面，我们通过最简单的 image 文件“[hello world”](https://hub.docker.com/r/library/hello-world/)，感受一下 Docker。

首先，运行下面的命令，将 image 文件从仓库抓取到本地。

```bash
$ docker pull library/hello-world
```

上面代码中，`docker pull`是抓取 image 文件的命令。`library/hello-world`是 image 文件在仓库里面的位置，其中`library`是 image 文件所在的组，`hello-world`是 image 文件的名字。

由于 Docker 官方提供的 image 文件，都放在[`library`](https://hub.docker.com/r/library/)组里面，所以它的是默认组，可以省略。因此，上面的命令可以写成下面这样。

```bash
$ docker pull hello-world
```

抓取成功以后，就可以在本机看到这个 image 文件了。

```javascript
$ docker image ls
```

现在，可以运行这个 image 文件了。

```bash
$ docker run hello-world
```

`docker run`命令会从 image 文件，生成一个正在运行的容器实例。

注意，`docker run`具有自动抓取 image 文件的功能。如果发现本地没有指定的 image 文件，就会从仓库自动抓取。因此，前面的`docker pull`命令并不是必需的步骤。

如果运行成功，你会在屏幕上读到下面的输出。

```bash
$ docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

... ...
```

输出这段提示以后，`hello world`就会停止运行。

有些容器提供的是服务，比如 Ubuntu 的 image。

```bash
$ docker run -it ubuntu bash
```

上面命令运行以后，就可以在命令行体验 Ubuntu 了。这个命令的`-it`参数的具体含义，后文再介绍。

如果容器提供是服务（就像上面那行命令），启动后就会一直运行，不会自动停止，除非手动中断。下面就是停止容器运行的命令[`docker container kill`](https://docs.docker.com/engine/reference/commandline/container_kill/)。

```bash
$ docker container kill [containID]
```

## 八、容器文件

image 文件生成的容器实例，本身也是一个文件，称为容器文件。也就是说，一旦`docker run`命令生成容器实例以后，就会同时存在 image 文件和容器文件。而且关闭容器并不会删除容器文件，只是容器停止运行而已。

下面的命令可以列出本机所有的容器文件。

```bash
# 列出正在运行的容器
$ docker container ls

# 列出所有容器，包括停止运行的容器
$ docker container ls --all
```

上面命令的输出结果之中，容器的 ID 比较有用。很多地方都需要提供这个 ID，比如上一节停止容器运行的`docker kill`命令。

停止运行的容器文件，依然会占据硬盘空间，可以使用[`docker container rm`](https://docs.docker.com/engine/reference/commandline/container_rm/)命令删除。

```bash
$ docker container rm [containerID]
```

运行上面的命令之后，再使用`docker container ls`命令，就会发现被删除的容器文件已经消失了。

## 九、Dockerfile 文件

学会使用 image 文件以后，接下来的问题就是，如何可以生成 image 文件？如果你要推广自己的软件，那么势必要自己做 image 文件。

这就需要用到 Dockerfile 文件。它是一个文本文件，用来配置 image。Docker 根据 这个文件生成二进制的 image 文件。

下面通过一个实例，演示如何编写 Dockerfile 文件。

## 十、实例：制作自己的 Docker 容器

下面我以 [koa-demos](http://www.ruanyifeng.com/blog/2017/08/koa.html) 项目为例，介绍怎么写 Dockerfile 文件，实现让用户在 Docker 里面运行 Koa 框架。

### 10.1 编写 Dockerfile 文件

首先，在项目的根目录下，新建一个文本文件，文件名为`.dockerignore`，在里面写入下面的[内容](https://github.com/ruanyf/koa-demos/blob/master/.dockerignore)。

```bash
.git
node_modules
npm-debug.log
```

上面代码表示，这两个路径要排除，不要打包进入 image 文件。如果你没有路径要排除，这个文件可以不新建。

然后，在项目的根目录下，新建一个文本文件，文件名为 Dockerfile，在里面写入下面的[内容](https://github.com/ruanyf/koa-demos/blob/master/Dockerfile)。

```bash
FROM node:8.4
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
```

上面代码一共五行，含义如下。

> - `FROM node:8.4`：该 image 文件基于官方的 node image，冒号表示标签，这里标签是`8.4`，即8.4版本的 node。
> - `COPY . /app`：将当前目录下的所有文件（除了`.dockerignore`排除的路径），都拷贝进入 image 文件的`/app`目录。
> - `WORKDIR /app`：指定接下来的工作路径为`/app`。
> - `RUN npm install`：在`/app`目录下，运行`npm install`命令安装依赖。注意，安装后所有的依赖，都将打包进入 image 文件。
> - `EXPOSE 3000`：将容器 3000 端口暴露出来， 允许外部连接这个端口。

### 10.2 创建 image 文件

有了这个 Dockerfile 文件以后，就可以使用`docker build`命令创建 image 文件了。

```bash
$ docker build -t koa-demo .
# 或者
$ docker build -t koa-demo:0.0.1 .
```

上面代码中，`-t`参数用来指定 image 文件的名字，后面还可以用冒号指定标签。最后的那个点表示 Dockerfile 文件所在的路径，上例是当前路径，所以是一个点。

如果运行成功，下面的命令就可以看到新生成的 image 文件`koa-demo`了。

```bash
$ docker image ls
```

### 10.3 生成容器

`docker run`命令运行这个 image 文件，就可以生成容器。

```bash
$ docker run -p 8000:3000 -it koa-demo /bin/bash
# 或者
$ docker run -p 8000:3000 -it koa-demo:0.0.1 /bin/bash
```

上面命令的各个部分含义如下：

> - `-p`参数：容器的 3000 端口映射到本机的 8000 端口。
> - `-it`参数：容器的 Shell 映射到当前的 Shell，然后你在本机窗口输入的命令，就会传入容器。
> - `koa-demo:0.0.1`：image 文件的名字（如果有标签，还需要提供标签）。
> - `/bin/bash`：容器启动以后，内部第一个执行的命令。这里是启动 Bash，保证用户可以使用 Shell。

如果一切正常，运行上面的命令以后，就会返回一个命令行提示符。

```bash
root@66d80f4aaf1e:/app#
```

这表示你已经在容器里面了，返回的提示符就是容器内部的 Shell 提示符。

执行下面的命令。

```bash
root@66d80f4aaf1e:/app# node demos/01.js
```
如果没有报错，那么 Koa 框架已经运行起来了。打开本机的浏览器，访问 http://127.0.0.1:8000，网页显示“Not Found”，这是因为这个 [demo](https://github.com/ruanyf/koa-demos/blob/master/demos/01.js) 没有写路由。

这个例子中，Node 进程运行在 Docker 容器的虚拟环境里面，进程接触到的文件系统和网络接口都是虚拟的，与本机的文件系统和网络接口是隔离的，因此需要定义容器与物理机的端口映射（map）。

现在，在容器的命令行下，按下 Ctrl + c 停止 Node 进程，然后按下 Ctrl + d （或者输入 exit）退出容器。除此以外，还可以用下面的方式停止容器运行。

```bash
# 在本机的另一个终端窗口
# 查出容器的 ID
$ docker container ls

# 停止指定的容器运行
$ docker container kill [containerID]
```

容器停止运行之后，并不会消失。需要用下面的命令删除容器文件。

```bash
# 查出容器的 ID
$ docker container ls --all

# 删除指定的容器文件
$ docker container rm [containerID]
```

`docker run`命令的`--rm`参数，可以在容器退出运行后，自动删除容器文件。

```bash
$ docker run --rm -p 8000:3000 -it koa-demo /bin/bash
```

### 10.4 CMD 命令

上一节的例子里面，容器启动以后，需要手动输入命令`node demos/01.js`。我们可以把这个命令写在 Dockerfile 里面，这样容器启动以后，这个命令就已经执行了，不用再手动输入了。

```bash
FROM node:8.4
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
CMD node demos/01.js
```

上面的 Dockerfile 里面，多了最后一行`CMD node demos/01.js`，它表示容器启动后自动执行`node demos/01.js`。

你可能会问，`RUN`命令与`CMD`命令的区别在哪里？简单说，`RUN`命令在 image 文件的构建阶段执行，执行结果都会打包进入 image 文件；`CMD`命令则是在容器启动后执行。另外，一个 Dockerfile 可以包含多个`RUN`命令，但是只能有一个`CMD`命令。

注意，指定了`CMD`命令以后，`docker run`命令就不能附加命令（比如前面的`/bin/bash`）了，否则它会覆盖`CMD`命令。现在，启动容器可以使用下面的命令。

```bash
$ docker run --rm -p 8000:3000 -it koa-demo:0.0.1
```

### 10.5 发布 image 文件

容器运行成功后，就确认了 image 文件的有效性。这时，我们就可以考虑把 image 文件分享到网上，让其他人使用。

首先，去 [hub.docker.com](https://hub.docker.com/)  或 [cloud.docker.com](https://cloud.docker.com) 注册一个账户。然后，用下面的命令登录。

```bash
$ docker login
```

接着，为本地的 image 标注用户名和版本。

```bash
$ docker tag [imageName] [username]/[repository]:[tag]
# 实例
$ docker tag koa-demos:0.0.1 ruanyf/koa-demos:0.0.1
```

不标注用户名，重新构建一下 image 文件，也是可以的。

```bash
$ docker build -t [username]/[repository]:[tag] .
```

最后，发布 image 文件。

```bash
$ docker push [username]/[repository]:[tag]
```

发布成功以后，登录 hub.docker.com，就可以看到已经发布的 image 文件。

## 十一、其他有用的命令

docker 的主要用法就是上面这些，此外还有一些命令，也非常有用。

`docker logs`命令用来查看 docker 容器的输出，即容器里面的标准输入。如果`docker run`命令运行容器的时候，没有使用`-it`参数，就要用这个命令查看输出。

```bash
$ docker logs [containerID]
```

`docker exec`命令用于进入 docker 容器。如果`docker run`命令运行容器的时候，没有使用`-it`参数，就要用这个命令进入容器。

```bash
$ docker exec -it [containerID] /bin/bash
```

`docker cp`命令用于从正在运行的 Docker 容器里面，将文件拷贝到本机。下面是拷贝到当前目录的写法。

```bash
$ docker cp [containID]:[/path/to/file] .
```

（完）

## 附录：Docker 常用命令清单

你可以在 [Docker 商店](http://store.docker.com/)出售或购买 image 文件，也可以免费分享给其他人。所有的镜像保存在 Docker 仓库（registry ）里面。

### docker build

`docker build`命令用于从 Dockerfile 文件生成 image 文件。

```bash
$ docker build -t mongodb .

# 通过冒号指定 image 的标签
$ docker build -t tutorial:0.0.1 .
```

上面命令将当前目录下的 Dockerfile 文件，生成名为`mongodb`的 image 文件。

### docker container

`docker container`命令用于处理 docker 容器。

```bash
# 发现容器 ID
$ docker container ls

# 停止容器运行
$ docker container stop <containerID>
```

### docker exec

`docker exec`命令用于在 docker 容器里面运行 bash 命令。

```bash
$ docker exec -it [containerID] /bin/bash
```

### docker help

`docker help`命令显示帮助信息。

```bash
$ docker help
```

### docker image

`docker image`命令用于处理 image 文件。

```bash
# 从 Dockerfile 构建 image 文件
$ docker image build <path>

# 列出本地 image 文件
$ docker image ls
$ docker image list
```

### docker images

`docker images`命令列出所有本地的 image 文件。

```bash
$ docker images
```

### docker kill

`docker kill`命令用于关闭正在运行的 Docker 容器。

```bash
$ docker kill <containerID>
```

### docker logs

`docker logs`命令打印 docker 容器的输出。

```bash
$ docker logs <containerID>
```

### docker ps

`docker ps`命令列出正在运行的 docker 容器。

```bash
$ docker ps
```

### docker pull

`docker pull`命令从仓库抓取 image 文件到本地。

```bash
$ docker pull ubuntu
$ docker pull nginx:latest
```

默认就是抓取 latest 标签。

### docker push

`docker push`命令将本地 image 文件推送到仓库。

### docker rm

`docker rm`命令删除本机的 docker 容器。

```bash
$ docker rm [containID]
```

### docker run

`docker run`命令运行 image 文件，创建一个 Docker 容器。

```bash
$ docker run <imageName>
```

如果镜像文件不是本地的，该命令会自动从默认仓库抓取到本地。

```bash
$ docker run -it -p 127.0.0.1:27017:27017 -v $(pwd)/db:/data/db mongodb
```

`-d`参数在后台运行容器。

```bash
$ docker run -d -p 4000:80 friendlyhello
```

上面命令里面的参数作用如下。

- `-it` 将 docker 容器连接终端，然后按下 Ctrl + c 能杀死 docker 容器的进程。
- `-p 127.0.0.1:27017:27017` 将容器里面的 27017 端口映射到物理机的127.0.0.1:27017` on the host
- `-v $(pwd)/db:/data/db` 将容器里面的`/data/db`目录映射到物理机的`$(pwd)/db` 
`--rm` this piece of housekeeping removes the container after the shell exits
`-it` makes an interactive and attached terminal
`--hostname=$(hostname)-devel` sets the hostname inside the container, but appends 'devel' to help distinguish
`-v $HOME:$HOME` mounts current home directory to the same inside the container
`-v $SSH_AUTH_SOCK:$SSH_AUTH_SOCK` mounts an active ssh agent socket inside the container
`--env SSH_AUTH_SOCK` pass in the ssh agent environment variable
`--env PATH=...` cleans the PATH slate
`--workdir $(pwd)` starts the bash shell in the same directory as current working directory (e.g. ~/src/my/big/project/)
`${1+"$@"}` makes additional flags to `devel` land here in the function

### docker tag

`docker tag`命令用来为 image 文件打上标签。

```bash
$ docker tag <imageName> <username>/<repository>:<tag>
```

### docker version

`docker version`命令用来查看 Docker 的版本。

```bash
$ docker version
```

## 参考链接

- https://docs.docker.com/get-started/