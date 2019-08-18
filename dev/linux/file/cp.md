# cp 命令

`cp`命令用于复制文件和目录。

## 基本用法

`cp`的一般用法如下。

```bash
$ cp [OPTIONS] SOURCE... DESTINATION
```

上面代码中，`SOURCE`表示一个或多个目标文件或目标目录，`DESTINATION`表示拷贝的目的地。

下面是一些例子。

```bash
$ cp file file_backup
$ cp file1 file2 backup_dir
```

如果`SOURCE`和`DESTINATION`都是一个文件，`cp`命令将第一个文件复制成第二个文件。如果目标文件存在，会被覆盖，否则将创建它。

如果`SOURCE`为多个文件或目录，`DESTINATION`则必须为已经存在的目录。这时，`SOURCE`所指定的文件和目录，将复制到`DESTINATION`目录中，保持原来的名称不变。

如果`SOURCE`和`DESTINATION`都是目录时，`cp`命令会将第一个目录复制到第二个目录中。

复制时，操作者必须具有源文件的读取权限和目标目录的写入权限，否则会报错。

## 复制目录

复制目录（包括其所有文件和子目录），使用`-R`或`-r`参数。

```bash
$ cp -R Pictures Pictures_backup
```

上面命令中，如果目标目录`Pictures_backup`不存在，则将创建该目录，并将`Pictures`里面的所有文件和子目录，复制到目标目录。

如果目标目录`Pictures_backup`已经存在，则源目录本身及其所有内容将复制到目标目录里面，即形成子目录`Pictures_backup/Pictures`。

`-T`参数表示，目标目录存在时，仅复制文件和子目录，而不复制源目录本身。

```bash
$ cp -RT Pictures Pictures_backup
```

另一种只复制目录内容而不是目录本身的方法，是使用通配符（`*`）。它的缺点是不会复制隐藏文件和目录（以`.`开头的文件和目录）。

```bash
$ cp -RT Pictures/* Pictures_backup/
```

## 参数

`-i`参数在覆盖同名文件之前，会要求操作者确认。默认操作是直接覆盖同名文件。

```bash
$ cp -i file.txt file_backup.txt
```

`-n`参数表示不覆盖同名文件。

```bash
$ cp -n file.txt file_backup.txt
```

`-p`参数可使得目标文件保留文件权限、所有权和时间戳。默认情况下，复制文件时，新文件将由运行该命令的用户拥有。

```bash
$ cp -p file.txt file_backup.txt
```

`-u`参数表示仅在源文件比目标文件更新时，才复制文件，否则就跳过。

```bash
$ cp -u file.txt file_backup.txt
```

`-v`参数表示输出操作过程。

```bash
$ cp -v file.txt file_backup.txt
'file.txt' -> 'file_backup.txt'
```


