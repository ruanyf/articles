# 用户管理

## id命令

`id`命令用于查看指定用户的用户名和组名。

```bash
# 返回UID
$ id -u [UserName]

# 返回GID
$ id -g [UserName]

# 返回用户名
$ id -un [UserName]

# 返回组名
$ id -gn [UserName]
```

上面的命令，如果省略用户名，则返回当前用户的信息。
