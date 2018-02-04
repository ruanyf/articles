# Docker 入门教程

2013年 [Docker](https://www.docker.com/) 发布，从那时起，它就广受瞩目，被认为是最重要的新工具之一，可能会改变软件开发的整个流程。

由于这个工具很新，许多人并不清楚它是什么，到底要解决什么问题，好处又在哪里？本文就来帮助大家理解 Docker，告诉你如何将它用在日常开发之中。

## 一、环境配置的难题

软件开发最麻烦的事情之一，就是环境配置。软件依赖于环境，但是每一台计算机的环境都不尽相同，一方面是操作系统的设置，另一方面是依赖的各种库和组件，只有这两方面都配置正确，软件才能正确运行。

举例来说，如果安装一个 Python 应用，你的计算机必须有 Python 引擎，然后还必须安装依赖，配置环境变量。如果遇到某些老旧的模块与当前环境不兼容，那就很麻烦了。开发者常常会说：“它在我的机器上可以跑了”（It works on my machine），言下之意就是，在其他机器上很可能跑不了。

环境配置要花掉很多时间，还无法保证每次都能解决问题。很早就有人提出，能不能带环境安装？也就是说，安装的时候，把开放时的环境一模一样地复制过来。

## 二、虚拟机

## Docker 是什么

Docker 是容器，提供软件的运行环境，与底层系统隔离。比虚拟机更轻量级。2013年开源

> Docker 可以将应用与它的依赖打包在一个虚拟容器之中。应用在这个虚拟容器里运行，就好像在真实的物理机上运行一样。因此，就可以在一台机器上同时提供多种环境。

有了 Docker，你不用安装任何依赖，只需要安装 Docker，它会帮你创建一个虚拟容器，让应用跑在这个容器里面，与外部隔绝。因此，就不用担心环境问题，不存在不兼容的情况，因为 Docker 就是一个虚拟环境，让应用可以跑起来。

## 虚拟机的缺点

- 占用大量资源，实际又用不到
- 大量的多余步骤，比如需要设置根用户、权限，还需要登录等等
- 启动慢。启动一个操作系统需要多久，启动一个虚拟机就需要多久。

## 容器的优点

- 它就是一个物理机的进程，而不是虚拟机内部的进程，所以启动快。
- 它只占用用到的资源，不占用那些没有用到的资源，所以比虚拟机占用的资源少得多，因为虚拟机需要启动完整的操作系统。
- 多个容器可以共享资源，虚拟机都是独享资源。

## 名词解释

### Linux 容器

容器（container）提供一个与物理机隔离的虚拟系统。里面可以提供各种依赖，让应用可以带着环境安装，更方便地运行起来。

容器看上去很像虚拟机（virtual machine），但是容器并不是完整的操作系统，不会复制整个操作系统，仅仅复制用到的组件。这大大提高了表现，以及减少容器的大小，运行起来很快。它的进程就是运行在物理机的进程，外面多了一层[保护层](https://opensource.com/article/18/1/history-low-level-container-runtimes)，而不是运行在虚拟机的进程。

有了容器，就可以保证在一台计算机上写的程序，在另一台计算机也能跑起来。它对开发者和系统管理员都有吸引力。对于开发者来说，不用关心运行环境了，只要本机能跑起来，就有办法在其他机器上跑起来。另一方面，还可以在自己的机器上，随时起一个环境，测试其他人的程序，对自己的机器毫无影响。

相比虚拟机，容器的启动和运行速度都比较快。所以，很适合用来持续集成。

Docker 是最有名的容器实现。让用户可以更方便地创建和使用容器。它的好处是让你可以很容易地将应用放在容器里面，并且可以对容器版本管理、复制、分享、修改，就像管理普通的代码，运行和部署起来也方便。也就是说，Docker 是一个方便好用的容器解决方案。

容器本身是一个可执行文件，称为 image 文件。它把应用和依赖都包含在这个文件里面。

容器是 image 文件的运行实例，或者说容器加载进入内存。一个正在运行的 Docker 就构成了一个容器（container）。

下面的命令可以列出所有正在运行的容器。

```bash
$ docker ps
```

容器之间可以共享资源，虚拟机是独占资源，是一个完整的操作系统。所以，Docker 是轻量级。

## image 文件

image 文件是一个二进制文件。它的生成要依赖一个配置文件 Dockerfile 文件。Dockerfile 文件配置好了容器的虚拟环境。这个环境里面，文件系统和网络接口是虚拟的，与物理机的文件系统和网络接口是隔离的，必须分配资源给这些虚拟资源。因此，需要在 Dockefile 里面定义容器与物理机的映射（map）。

image 文件是可以运行的，它运行后形成的实例就是 Docker 容器。

image 文件是保存后的容器，容器是正在运行的 image 文件。

## Dockerfile 文件

image 文件是一个配置文件，用来创建 Docker 容器。image 文件可以继承，通常来说，一个 image 文件往往是继承另一个 image 文件，然后加上一些个性化设置。举例来说，你可以在 Ubuntu image 的基础上，加上 Apache 服务器，形成你的 image。


```
# Use an official Python runtime as a parent image
FROM python:2.7-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
```

## 安装

https://docs.docker.com/engine/installation/

Docker 有两个版本：社区版（Community Edition，缩写为 CE）和企业版（Enterprise Edition，缩写为 EE）。企业版包含了一些收费服务，一般情况下用不到。下面的介绍都针对社区版。

Docker CE 的安装请参考官方文档。

- [Mac](https://docs.docker.com/docker-for-mac/install/)
- [Windows](https://docs.docker.com/docker-for-windows/install/)
- [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- [Debian](https://docs.docker.com/install/linux/docker-ce/debian/)
- [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/)
- [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)
- [其他 Linux 发行版](https://docs.docker.com/install/linux/docker-ce/binaries/)


```bash
$ docker version
```

Docker 需要用户具有 sudo 权限，为了避免每次命令都输入`sudo`，可以把用户加入 Docker 用户组。https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user

```bash
$ sudo groupadd docker
$ sudo usermod -aG docker $USER
```

## hello world

```bash
$ docker run hello-world

Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
ca4f61b1923c: Pull complete
Digest: sha256:ca0eeb6fb05351dfc8759c20733c91def84cb8007aa89a5bf606bc8b315b9fc7
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```
上面代码中，发现本地没有`hello-world`镜像，就从官方仓库下载。

```bash
$ sudo service docker restart
```
列出所有的 image 文件

```bash
$ sudo docker image ls
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
hello-world         latest              f2a91732366c        2 months ago        1.85kB

# 正在运行的 image
# 等同于 docker ps
$ docker container ls

# 所有 container，包括已经退出运行的 container
$ docker container ls -all
```

## 创建 image 文件

在 Dockerfile 目录里面，可以创建 image 文件。

```bash
$ docker build -t friendlyhello .
```

`-t`参数用于为镜像指定名字。

运行下面的命令，就可以看到这个镜像了。

```bash
$ docker images

REPOSITORY            TAG                 IMAGE ID
friendlyhello         latest              326387cea398
```

运行这个镜像。

```bash
$ docker run -p 4000:80 friendlyhello
```

`-p`参数表示端口的映射，物理机的 4000 端口映射到容器的 80 端口。因此，访问 http://localhost:4000 会映射到容器的 80 端口。
 

## 发布镜像

镜像可以发布，与其他人共享。

首先，去 https://hub.docker.com/  或 https://cloud.docker.com 注册一个账户。然后，用下面的命令登录。

```bash
$ docker login
```

然后，为 image 标注版本。

```bash
$ docker tag <imageName> <username>/<repository>:<tag>

# 实例
$ docker tag friendlyhello john/get-started:part2
```

或者，重新构建一下 image 文件。

```bash
$ docker build -t [USERNAME]/hello-world .
```

再次查看最新的 image 文件。

```bash
 $ docker images
 REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
friendlyhello            latest              d9e555c53008        3 minutes ago       195MB
john/get-started         part2               d9e555c53008        3 minutes ago       195MB
python                   2.7-slim            1c7128a655f6        5 days ago          183MB
```

发布镜像

```bash
$ docker push username/repository:tag
$ docker push [USERNAME]/hello-world
```

发布成功以后，登录 https://hub.docker.com/ ，就可以看到已经发布的镜像。

然后，就可以在本地运行远程镜像。

```bash
$ docker run -p 4000:80 username/repository:tag
```

## 实例：Node 应用的 Docker 用法

创建 Dockerfile 文件

```bash
// 基础镜像
// 基础镜像都放在 Dockerhub
FROM node:8.4

// 拷贝当前目录到镜像的 /app 目录
COPY . /app

// 指定工作目录
WORKDIR /app

// 执行 npm install 命令
RUN ["npm", "install"]

// 开放 3000 端口
EXPOSE 3000/tcp

// 启动应用
CMD ["npm", "start"]
```

```
FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node index.js
EXPOSE 8081
```

[`run`](https://docs.docker.com/engine/reference/builder/#run)命令是 image 构建的一个步骤，它的运行结果会保存进 image 文件。一个  Dockerfile 文件可以有多个 RUN 命令，它们会一个个按步骤运行。

[`cmd`](https://docs.docker.com/engine/reference/builder/#cmd) 是 docker 容器运行以后，在容器内部执行的 Shell 命令。一个 Dockerfile 文件只能有一个`cmd`命令。启动 docker 容器的时候，`cmd`命令可以被覆盖，比如` docker run $image $other_command`.

下面是一个例子。

```bash
FROM ubuntu
MAINTAINER David Weinstein <david@bitjudo.com>

# install our dependencies and nodejs
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get -y install python-software-properties git build-essential
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get -y install nodejs

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/app
ADD . /opt/app

EXPOSE 3000

CMD ["node", "server.js"]
```

新建一个`.dockerignore`文件。

```bash
node_modules
npm-debug.log
```

新建 image。

```bash
$ docker build -t koa-demo:0.0.1 .
$ docker build -t hello-world .

# create a repository named “tutorial” and tag it with 0.0.1
$ docker build -t tutorial:0.0.1 .
```

创建基于镜像的容器，开始运行容器。

```bash
# create a container based on the tutorial:0.0.1 image
# name it ‘demo’
# -d 在后台运行
# -p switch that maps port 3000 on the host machine (your local machine) to the exposed port on the container (formatted like [host port]:[container port]). This will allow you to go to http://localhost:3000 on your machine and be viewing the container’s response on that same port.
$ docker run -p 3000:3000 -d --name demo tutorial:0.0.1
$ docker run -p 49160:8080 -d <your username>/node-web-app
$ docker run -p 8081:8081 hello-world
$ docker run -it nginx:latest /bin/bash

$ docker run --rm -it -p 3000:3000 --name demo koa-demo:0.0.1 /bin/bash
```

`docker run`命令运行指定的  docker image 文件。`-i`表示采用互动模式，`-t`表示新建一个 tty shell，shell 设定为`/bin/bash`，一旦容器里面的 bash shell 退出，容器就会停止运行。

```bash
root@1d357b2706c2:/app# node demos/01.js
```

然后，访问 http://127.0.0.1:3000 ，看到 Not Found。

然后，按下 Ctrl + C，终止应用运行。

然后，按下 Ctrl + D 或输入 exit， 终止 Docker 容器运行。

查看 docker 容器的输出。

```bash
# Get container ID
$ docker ps

# Print app output
$ docker logs [containerID]
```

进入 docker 容器。

```bash
# Enter the container
$ docker exec -it [containerID] /bin/bash
```

```bash
$ curl -I 127.0.0.1:3000
HTTP/1.1 404 Not Found
Date: Sun, 04 Feb 2018 07:50:15 GMT
Connection: keep-alive
```

停止 docker 运行。

```bash
$ docker kill [containID]
```

docker container 停止运行以后，并不会删除。可以手动将 container 删除。

```bash
$ docker container ls -all
$ docker rm [containerID]
```



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