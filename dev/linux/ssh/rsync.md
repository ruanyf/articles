# rsync

rsync 是一个 Linux 应用程序，用来在两台计算机或者两个路径之间同步文件。它名称里面的`r`就是指 remote，rsync 其实就是“远程同步”（remote sync）的意思。

虽然它不是 SSH 的一部分，但是涉及到远程操作，而且会用到 SSH，所以也放在这里介绍。

与其他文件传输工具（如 FTP 或 scp）不同，rsync 先检查发送方和接收方上的文件，仅传输同步它们所需的文件。

## 基本用法

rsync 命令一般情况下需要安装。

```bash
# Debian
$ sudo apt-get install rsync

# Arch Linux
$ sudo pacman -S rsync
```

默认情况下，rsync 只确保发送方的源目录的所有文件（明确排除的文件除外）都复制到目标目录。它不会使两个目录保持相同，并且不会删除文件。如果要使得目标目录成为源目录的镜像副本，则必须使用`--delete`参数，这会删除只存在于目标目录、不存在于源目录的文件。

```bash
$ rsync -a /source/path /target/path
```

上面的命令会创造一个完全备份。如果目标路径不存在，就会新建。

`-a`参数表示递归复制。

注意，`/home/user/dir/`和`/home/usr/dir`不一样。没有最后的斜杠，rsync 将复制整个目录。如果带有最后斜杠，则会拷贝目录下的所有内容，而不会新建这个目录。

有时，我们希望同步时排除某些文件或目录，这时可以用`--exclude`参数指定排除文件的模式。多个模式可以用多个`--exclude`参数。

```bash
$ rsync -av --exclude=*.txt /mnt/data/source/ /run/media/egdoc/destination
```

上面命令排除了所有 TXT 文件。

另一个方法是将所有排除文件的模式，写入一个文件，每个模式一行，然后用`--exclude-from`参数指定这个文件。

## 登录远程服务器

```bash
$ rsync -avze ssh /home/user/directory/ user@remote.host.net:/home/user/directory/
```

上面命令中，`-e`参数表示使用 SSH 进行远程登录。

除了使用 SSH，如果另一台服务器安装并运行了 rsync 守护程序，则可以直接拷贝。rsync 默认会尝试`rsync://`协议（默认端口873），服务器地址与目标目录之间使用双冒号分隔`::`。

```bash
$ rsync -av /mnt/data/source/ 192.168.122.32::module/destination
```

上面地址中的`module`并不是实际路径名，而是 rsync 守护程序指定的一个资源名，由管理员分配。

如果想知道 rsync 守护程序分配的所有可用的 module 列表，可以执行下面命令。

```bash
$ rsync rsync://192.168.122.32
```

除了使用双冒号，也可以直接用`rsync://`协议指定地址。

```bash
$ rsync -av /mnt/data/source/ rsync://192.168.122.32/module/destination
```

## 增量备份

rsync 的最大特点就是它可以完成增量备份，也就是只复制有变动的文件。

具体做法是，第一次同步是全量备份，所有文件复制后保存在一个基准目录，以后每一次同步都是增量备份，只复制有变动的文件，将它们保存在一个最新目录。这个最新目录之中，也是包含所有文件，但只有那些变动过的文件存在于该目录，其他没有变动的文件都是指向基准目录的硬链接。

`--link-dest`参数用来指定同步时的基准目录。

```bash
$ rsync -a --delete --link-dest /compare/path /source/path /target/path
```

上面命令中，`-a`是保存文件的元信息，`--delete`是删除源目录不存在的文件。`-link-dest`参数指定一个基准目录`/compare/path`，然后源文件路径`/source/path`跟这个路径进行比较，找出变动的文件，将它们拷贝到目标路径`/target/path`。那些没变动的文件则会生成硬链接。第一次备份时是全量备份，后面就都是增量备份了。

下面是一个脚本示例，备份用户的主目录。

```bash
#!/bin/bash

# A script to perform incremental backups using rsync

set -o errexit
set -o nounset
set -o pipefail

readonly SOURCE_DIR="${HOME}"
readonly BACKUP_DIR="/mnt/data/backups"
readonly DATETIME="$(date '+%Y-%m-%d_%H:%M:%S')"
readonly BACKUP_PATH="${BACKUP_DIR}/${DATETIME}"
readonly LATEST_LINK="${BACKUP_DIR}/latest"

mkdir -p "${BACKUP_DIR}"

rsync -av --delete \
  "${SOURCE_DIR}/" \
  --link-dest "${LATEST_LINK}" \
  --exclude=".cache" \
  "${BACKUP_PATH}"

rm -rf "${LATEST_LINK}"
ln -s "${BACKUP_PATH}" "${LATEST_LINK}"
```

上面脚本中，上一次备份的目录`${BACKUP_DIR}/${DATETIME}`是基准目录，每一次同步都会生成一个新目录，然后将`${BACKUP_DIR}/latest`指向这个新目录，再删除上一次备份的目录。由于`--link-dest`对于那些没有变动的文件，生成的是硬链接，而不是软链接，即使删除基准目录，那些文件依然可以访问。

## 配置项

`-a`、`--archive`参数表示存档模式，保存所有的元数据，比如修改时间（modification time）、权限、所有者，并且软链接也会拷贝成软链接。

`--delete`参数删除只存在于目标目录、不存在于源目标的文件，即保证目标目录是源目标的镜像。

```bash
$ rsync -avH --delete /etc username@192.168.0.1:backup
```

`--dry-run`参数显示将要执行的操作，哪些文件会被拷贝或删除，而并不执行实际的操作。

`-e`参数指定使用 SSH 登录远程服务器。

```bash
$ rsync -av -e ssh /mnt/data/source/ username@192.168.122.32:/home/username/destination
```

`--exclude`参数指定排除不进行复制的文件，比如`--exclude="*.iso"`。rsync 会复制“点”开头的隐藏文件，如果要排除隐藏文件，可以这样写`--exclude=".*/"`。

`-h`参数表示以人类可读的格式输出。

`--progress`参数表示显示进展。

`-v`参数表示输出细节。`-vv`表示输出更详细的信息，`-vvv`表示输出最详细的信息。

`-z`参数用于压缩数据。

## 参考链接

- [Mirror Your Web Site With rsync](https://www.howtoforge.com/mirroring_with_rsync), Falko Timme
- [Examples on how to use Rsync](https://linuxconfig.org/examples-on-how-to-use-rsync-for-local-and-remote-data-backups-and-synchonization), Egidio Docile
- [How to create incremental backups using rsync on Linux](https://linuxconfig.org/how-to-create-incremental-backups-using-rsync-on-linux), Egidio Docile
