# 基本知识

## docker-compose.yml

项目根目录下的`docker-compose.yml`文件，是项目的Docker配置文件。

```
#  version 2 of the Docker Compose file format
version: '2'

# sets up a persistable filesystem volume
volumes:
    database_data:
        driver: local

services:
  # create a container called nginx,
  # which can be referred to by the other containers using the hostname nginx.
  # It will use the latest, official, Docker Nginx container image
  # as the base for the container.
  nginx:
      image: nginx:latest
      # port 80 in the container to port 8080 on our host machine
      # access our application by navigating to http://localhost:8080
      ports:
          - 8080:80
      # copy ./docker/nginx/default.conf from the local filesystem
      # to /etc/nginx/conf.d/default.conf in the container’s filesystem
      volumes:
          - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf
      # the container gets access to a filesystem volume in the PHP container
      volumes_from:
          - php
  php:
      build: ./docker/php/
      expose:
          - 9000
      volumes:
          - .:/var/www/html
```

## Dockerfile

```
FROM nodesource/node:4

RUN mkdir -p /home/nodejs/app
WORKDIR /home/nodejs/app

COPY . /home/nodejs/app
RUN npm install --production

CMD ["node", "index.js"]
```

上面代码的含义如下。

```
FROM nodesource/node:4
```

上面代码指定Dockerfile的镜像，表示是NodeSource维护的Node镜像，4.x版本。

```
RUN mkdir -p /home/nodejs/app
WORKDIR /home/nodejs/app
```

上面命令新建一个工作目录，`WORKDIR`类似于`cd`命令，用来指定工作目录。

```
COPY . /home/nodejs/app
```

上面命令将Dockerfile所在目录的文件，拷贝到指定目录。

```
RUN npm install --production
```

上面命令安装项目的依赖。

```
CMD ["node", "index.js"]
```

上面命令在命令行下执行指定命令。

最后，执行下面的命令。

```bash
$ docker build -t myapp
```

上面命令会执行前面的`Dockerfile`文件，进行镜像构建，并且指定镜像名为`myapp`。

构建完成后，可以用下面的命令启动镜像。

```bash
$ docker run -it "myapp"
```

上面命令中的`-it`参数，表示绑定本机的标准输出/标准输入/标准错误。

你还可以将镜像发送到网站，分享给其他人。

```bash
$ docker login
Username: your_user_name
Password:
Email: your_email@foo.bar
Login Successful!
$ docker push “your_user_name/myapp”
```
