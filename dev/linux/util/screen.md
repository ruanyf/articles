# Screen

Screen 是一个对话（session）管理器。它允许多个用户共享一个 session，也可以下次登录时回到上次的 session。

```bash
# 新建 session
$ screen -S foobar

# 同一个用户在其他终端，进入这个 session
$ screen -x foobar
```


