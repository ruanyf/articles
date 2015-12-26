# Apache的用法

## 安装

```bash
$ apt-get install apache2
```

它的配置文件在`/etc/apache2`。

- apache2.conf：主配置文件
- ports.conf：指定虚拟主机监听的端口
- conf.d/：该目录用于配置某些特定的细节，比如SSL配置和安全配置
- sites-available/：该目录包含所有的虚拟主机配置。注意，这里是可以用的配置，而并非实际激活的配置。
- sites-enabled/：该目录包含实际使用的虚拟主机，通常是指向`sites-available`目录的符号链接。
- `mods-[enabled,available]/`：这些目录的功能与对应的site目录类似，用来定义可加载的模块。

## apache2.conf

`/etc/apache2/apache2.conf`文件是Apache的主配置文件。

该文件分成三部分。

- Apache主进程的配置
- 默认服务器的配置（`Include`命令加载）
- 虚拟主机的配置（`Include`命令加载）

`Include`命令允许Apache读取其他配置文件，加入当前文件。

下面是全局配置的一些主要配置项。

（1）Timeout

`Timeout`设置处理每个请求的最长时间，默认为300秒，可以调低为30到60秒。

（2）KeepAlive

`KeepAlive`设置同一个客户端的每个连接是否保持打开，即是否一个连接可以发送多个请求，默认为"On"。如果设置为“Off”，就必须为每个请求新建连接，这可能会影响服务器性能。

（3）MaxKeepAliveRequests

`MaxKeepAliveRequests`设置每个连接处理多少个请求之后才会关闭。这个设置比较高，会使得Apache向每个连接发送更多的内容。如果这个值设为0，就允许每个连接处理无限数量的请求。

（4）KeepAliveTimeout

`KeepAliveTimeout`设置上一个请求处理结束后，要等待下一个请求多少秒。如果过了这个时间，没有任何新的请求，则当前连接关闭。

下一次，再有请求过来，就会重新建立一个连接。

（5）MPM Configuration

`MPM`意为“多进程处理模块”（Multi-Processing Module）。

## 虚拟主机的设置

默认的虚拟主机设置文件，是`sites-available`目录的`default`文件。

```bash
<VirtualHost *:80>
        ServerAdmin webmaster@localhost

        DocumentRoot /var/www
        <Directory />
                Options FollowSymLinks
                AllowOverride None
        </Directory>
        <Directory /var/www/>
                Options Indexes FollowSymLinks MultiViews
                AllowOverride None
                Order allow,deny
                allow from all
        </Directory>
. . .
```

上面代码的第一行，处理所有网卡的80端口（http端口）的请求。

`ServerAdmin`参数设置一个Email地址，用作服务器发生故障时的联系人。

如果使用这个文件作为虚拟主机设置的模板，需要添加一个`ServerName`定义，指定域名或IP地址。

如果添加`ServerAlias`参数，可以使得一个虚拟主机配置，适应多个域名。这可以用来为同样的内容，提供多个路径的访问。比如，用于在同一个域名前面，加上`www`的二级域名。

`DocumentRoot`设置该虚拟主机能够访问的内容的路径，默认值是`/var/www`。

虚拟主机设置之中，还有对不同路径请求的设置。上面第一个设置的路径是`/`，即根路径。这是基本设置，对其他路径的访问都适用。为了安全起见，你可以修改默认配置，对访问设置一些限制。

```bash
<Directory />
	Options FollowSymLinks
	AllowOverride None
	Order Deny,Allow
	Deny from All
</Directory>
```

上面代码设置，如果请求不符合后续的所有指定的路径，则不允许该请求。

下面一个路径定义是针对`/var/www`，这个路径是HTTP可以访问的文档路径，所以设为`allow from all`，覆盖上面对`/`的定义。

`AllowOverride`参数用于指定是否允许当前目录下的“.htaccess“文件改变该设置。

`Alias`设置一个URL对应特定路径的请求。`ScriptAlias`作用类似，但用于指定路径之中有可执行文件。

```bash
Alias /content/ /path/to/content/
```

上面代码允许对`example.com/content/`的请求，访问到`/path/to/content/`路径。当然，该路径必须使用上面的设置，允许访问。

一旦设置好虚拟主机配置，就可以使用下面的命令，新建一个符合连接，从`sites-available`目录现有的文件，连到`sites-enabled`目录。

```bash
$ sudo a2ensite virtual_host_file_name
```

加载一个站点以后，使用下面的命令让Apache重启，让配置生效。

```bash
$ sudo service apache2 reload
```

下面命令可以从`sites-enabled`目录，移除符号链接设置。

```bash
$ sudo a2dissite virtual_host_file_name
```

移除以后，也需要重启一下Apache。

模块可以用`a2enmod`命令加载，`a2dismod`命令移除。它们与`a2ensite`命令和`a2dissite`命令的用法是一致的。

## 操作

### 配置文件生效



### 查看已安装的模块

```bash
$ /usr/sbin/apache2 -l

Compiled in modules:
  core.c
  mod_log_config.c
  mod_logio.c
  prefork.c
  http_core.c
  mod_so.c
```

## 参考链接

- Justin Ellingwood, [How To Configure the Apache Web Server on an Ubuntu or Debian VPS](https://www.digitalocean.com/community/tutorials/how-to-configure-the-apache-web-server-on-an-ubuntu-or-debian-vps)
