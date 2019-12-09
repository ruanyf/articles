# Wifi 网络

## 查看 Wifi 网络

```bash
$ nmcli dev wifi
```

`-f`参数可以显示完整信息。

```bash
$ nmcli -f ALL dev wifi
```

`-m`参数可以指定多行格式显示。

```bash
$ nmcli -m multiline -f ALL dev wifi
```

`rescan`选项可以重新扫描网络。

```bash
$ nmcli dev wifi rescan
```

`wavemon`软件也可以查看 Wifi 网络。

```bash
# debian, ubuntu
$ sudo apt install wavemon

# fedora
$ sudo dnf install wavemon
```

运行`wavemon`。

```bash
$ sudo wavemon
```


