# NetworkManager 程序

`NetworkManager`是 Linux 系统网络配置的守护程序。

用户可以通过桌面 GUI（Gnome，KDE，nm-applet），文本用户界面（nmtui），命令行（nmcli），文件和 Web 控制台（Cockpit）以多种方式配置此工具。Network Manager 提供D-Bus接口和库（libnm），以使API可供应用程序使用。

## nmcli

`nmcli`是 NetworkManager 的命令行工具。

`nmcli device`列出所有网络设备。

```bash
$ nmcli device
DEVICE   TYPE       STATE           CONNECTION
enp1s0   ethernet   connected       ether-enp1s0
enp7s0   ethernet   disconnected    --
enp8s0   ethernet   disconnected    -- 
```

上面命令中，NetworkManager已在系统上检测到三个以太网设备。只有第一个，`enp1s0`应用了一个活动连接。

如果希望 NetworkManager 暂时停止使用一台设备，则无需将其关闭，可以使用下面的命令。

```bash
$ nmcli device set enp8s0 managed no
$ nmcli device
DEVICE   TYPE       STATE          CONNECTION
enp1s0   ethernet   connected      ether-ens3
enp7s0   ethernet   disconnected   --
enp8s0   ethernet   unmanaged      --
```

使用上面命令，系统重启后，网络设备会恢复生效。

`nmcli`列出所有网络设备的详细信息。

```bash
$ nmcli
enp1s0: connected to enp1s0
      "Red Hat Virtio"
      ethernet (virtio_net), 52:54:00:XX:XX:XX, hw, mtu 1500
      ip4 default
      inet4 192.168.122.225/24
      route4 0.0.0.0/0
      route4 192.168.122.0/24
      inet6 fe80::4923:6a4f:da44:6a1c/64
      route6 fe80::/64
      route6 ff00::/8

enp7s0: disconnected
      "Intel 82574L"
      ethernet (e1000e), 52:54:00:XX:XX:XX, hw, mtu 1500

enp8s0: unmanaged
      "Red Hat Virtio"	
      ethernet (virtio_net), 52:54:00:XX:XX:XX, hw, mtu 1500
```

`nmcli connection`列出所有可用的网络连接。

```bash
$ nmcli connection
NAME                 UUID                                  TYPE       DEVICE
ether-enp1s0         23e0d89e-f56c-3617-adf2-841e39a85ab4  ethernet   enp1s0
Wired connection 1   fceb885b-b510-387a-b572-d9172729cf18  ethernet   --
Wired connection 2   074fd16d-daa6-3b6a-b092-2baf0a8b91b9  ethernet   --
```

上面代码中，输出显示`ether-enp1s0`应用于设备的唯一活动连接enp1s0。还存在另外两个连接，但它们不活动。

要停用连接，即取消配置关联的设备，只需指示 NetworkManager 关闭连接。例如，要停用ether-enp1s0连接：

```bash
$ nmcli connection down ether-enp1s0
```

要将其激活，请重新配置设备。

```bash
$ nmcli connection up ether-enp1s0
```

要查看特定连接的详细信息，可以使用下面的命令。

```bash
$ nmcli connection show ether-enp1s0
connection.id:                     ether-enp1s0
connection.uuid:                   23e0d89e-f56c-3617-adf2-841e39a85ab4
connection.stable-id:              --
connection.type:                   802-3-ethernet
connection.interface-name:         enp1s0
connection.autoconnect:            yes
connection.autoconnect-priority:   -999
connection.autoconnect-retries:    -1 (default)
connection.auth-retries:           -1
connection.timestamp:              1559320203
connection.read-only:              no
[...]
```

列出所有可用的 Wifi。

```bash
$ nmcli device wifi list
```

连接到指定的 Wifi。

```bash
$ nmcli device wifi connect my_wifi password <password>
```

## 参考链接

- [Becoming friends with NetworkManager](https://www.redhat.com/sysadmin/becoming-friends-networkmanager), Francesco Giudici
