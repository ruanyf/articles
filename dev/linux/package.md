# 软件包管理

搜索

```bash
$ apt-cache search search_string

$ yum search search_string
```

安装

```bash
$ apt-get install package_name
$ yum install package_name
```

安装本地软件包文件。

```bash
$ dpkg --install package_file
$ rpm -i package_file
```

卸载软件

```bash
$ apt-get remove package_name
$ yum erase package_name
```

更新软件。

```bash
$ apt-get update; apt-get upgrade
$ yum update
```

从本地软件包文件更新。

```bash
$ dpkg --install package_file
$ rpm -U package_file
```

列出所安装的软件包。

```bash
$ dpkg --list
$ rpm -qa
```

查看是否安装了指定软件包。

```bash
$ dpkg --status package_name
$ rpm -q package_name
```

查看软件包的说明信息。

```bash
$ apt-cache show package_name
$ yum info package_name
```

查看某个文件属于哪个软件包。

```bash
$ dpkg --search file_name
$ rpm -qf file_name
```

