# Docker 搭建微服务教程

## image 仓库的镜像网址



## mysql 容器

```bash
$ docker run --name wordpressdb -e MYSQL_ROOT_PASSWORD=password -d mysql:5.7

$ docker run --name wordpressdb \
--env MYSQL_ROOT_PASSWORD=password \
--env MYSQL_DATABASE=wordpress \
-d mysql:5.7
```

在后台运行。

```bash
$ docker container logs wordpressdb
```

```bash
$ docker run --name wordpress -v "$PWD/":/var/www/html php:5.6-apache
```

注意，记住容器返回的 IP 地址，只有使用这个 IP 地址才能访问容器。http://172.17.0.3/


```c
<?php 
phpinfo();
?>
```

```bash
$ docker run --name wordpress --link wordpressdb:mysql --volume "$PWD/":/var/www/html phpwithmysql
```


- Database Name	 wordpress
- Username	 root
- Password	password
- Database Host mysql

```bash
$ docker container stop wordpress
$ docker container stop wordpressdb

$ docker container rm wordpress
$ docker container rm wordpressdb
```

## Wordpress 官方镜像

```bash
$ docker run --name wordpressdb -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=wordpress -d mysql:5.7

$ docker run -e WORDPRESS_DB_PASSWORD=password -d --name wordpress --link wordpressdb:mysql  wordpress
```

查看 IP 地址。

```bash
$ docker inspect wordpress
```

两个问题：每次都要更换 IP 地址，本地无法修改文件。

```bash
$ docker container stop wordpress
$ docker container rm wordpress
```

```bash
$ docker run -e WORDPRESS_DB_PASSWORD=password -d --name wordpress --link wordpressdb:mysql -p 127.0.0.2:8080:80 --volume "$PWD/":/var/www/html  wordpress
```

访问这个端口 http://127.0.0.2:8080/ 然后，你每次在当前目录的修改，都会反映到容器里面。

然后，把这两个容器终止，并且删除。

## docker compose

Compose 是 Docker 公司推出的一个工具软件，可以管理多个 Docker 容器组成一个应用。你需要定义一个 YAML 格式的配置文件`docker-compose.yml`，写好多个容器之间的调用关系。然后，只要一个命令，就能同时启动这些容器。


```bash
$ docker-compose up
```

### 安装

Mac 和 Windows 在安装 docker 的时候，会一起安装 docker compose。Linux 系统下的安装参考官方文档。 https://docs.docker.com/compose/install/#install-compose

安装完成后，运行下面的命令。

```bash
$ docker-compose --version
```

$ docker-compose stop

### 示例

```bash
mysql:
    image: mysql:5.7
    environment:
     - MYSQL_ROOT_PASSWORD=password
     - MYSQL_DATABASE=wordpress
web:
    image: wordpress
    links:
     - mysql
    environment:
     - WORDPRESS_DB_PASSWORD=password
    ports:
     - "127.0.0.3:8080:80"
```

- MYSQL_ROOT_PASSWORD：环境变量 MYSQL 的根密码

访问 http://127.0.0.3:8080

增加本地目录的映射

让该目录可以被容器写入

```bash
$ sudo chmod -R 777 wordpress
```

```bash
mysql:
    image: mysql:5.7
    environment:
     - MYSQL_ROOT_PASSWORD=password
     - MYSQL_DATABASE=wordpress
web:
    image: wordpress
    links:
     - mysql
    environment:
     - WORDPRESS_DB_PASSWORD=password
    ports:
     - "127.0.0.3:8080:80"
    working_dir: /var/www/html
    volumes:
     - wordpress/wp-content/:/var/www/html/wp-content
```

## 参考链接

- [How to Manually Build Docker Containers for WordPress](https://www.sitepoint.com/how-to-manually-build-docker-containers-for-wordpress/), by Aleksander Koko
- [How to Use the Official Docker WordPress Image](https://www.sitepoint.com/how-to-use-the-official-docker-wordpress-image/), by Aleksander Koko
- [Deploying WordPress with Docker](https://www.sitepoint.com/deploying-wordpress-with-docker/), by Aleksander Koko