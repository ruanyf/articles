# 文件处理

## find 命令

```bash
# 找出某个目录下面所有文件，然后删除
$ find /some/path -type f -delete
# 或者
$ find /some/path -type f -exec rm -f {} \;

# 找出某个目录下面指定类型的文件，然后删除
$ find /some/path -type f -iname "*.txt" -exec rm -f {} \;
```
