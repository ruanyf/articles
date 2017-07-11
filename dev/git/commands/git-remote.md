# git remote

为远程仓库添加别名。

```bash
$ git remote add john git@github.com:johnsomeone/someproject.git

# 显示所有的远程主机
$ git remote -v

# 列出某个主机的详细信息
$ git remote show name
```

`git remote`命令的实质是在`.git/config`文件添加下面的内容。

```
$ git remote add bravo ../bravo
```

```
[remote "bravo"]
    url = ../bravo/
```

