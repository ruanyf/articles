# OpenWrt 设置

## 树莓派安装原生系统

- [官方主页](https://openwrt.org/toh/raspberry_pi_foundation/raspberry_pi)

树莓派 wifi 可能需要修改国家代码

[官方主页](https://firmware-selector.openwrt.org/)下载原生系统。

- [教程 1](https://simplificandoredes.com/en/turn-the-raspberry-pi-into-a-wifi-router/)
- [教程 2](https://raspberrytips.com/openwrt-on-raspberry-pi/)

安装 WAN 接口后，不要忘了去 Firewall 打开数据包流向。

安装 openwrt 以后，按照[官方教程](https://forum.openwrt.org/t/howto-resizing-root-partition-on-x86-march-2023-edition/153398)，调整 root 分区大小。

设置 openwrt 下载源

```bash
https://dl.openwrt.ai/packages-23.05/aarch64_cortex-a53/
```

passwall 安装也可以参考下面仓库。

- https://github.com/MoetaYuko/openwrt-passwall-build
- https://github.com/lrdrdn/my-opkg-repo （[教程](https://tos.wiki/how-to-install-the-latest-luci-app-passwall/)）

安装 passwall 以后，卸载 dnsmasq，安装 dnsmasq-full。

```bash
$ opkg remove dnsmasq
$ opkg install dnsmasq-full
```

## 常用软件包

路由器架构：aarch64_generic

### passwall

仓库：https://github.com/MoetaYuko/openwrt-passwall-build

- luci-app-passwall_git-24.113.45209-e9b39cd_all.ipk
- luci-app-passwall2_git-24.117.45249-9cd6e04_all.ipk

1. Add new opkg key:

```sh
wget https://free.nchc.org.tw/osdn/storage/g/o/op/openwrt-passwall-build/passwall.pub
opkg-key add passwall.pub
```

2. Add opkg repository:

```sh
read release arch << EOF
$(. /etc/openwrt_release ; echo ${DISTRIB_RELEASE%.*} $DISTRIB_ARCH)
EOF
for feed in passwall_luci passwall_packages passwall2; do
  echo "src/gz $feed https://free.nchc.org.tw/osdn/storage/g/o/op/openwrt-passwall-build/releases/packages-$release/$arch/$feed" >> /etc/opkg/customfeeds.conf
done
```

3. Install package:

```sh
opkg update
opkg install luci-app-passwall
```

### ShadowSocksR Plus+

源码仓库：https://github.com/fw876/helloworld

luci-app-ssr-plus_git-24.113.45209-e9b39cd_all.ipk

### HelloWorld

源码仓库：https://github.com/jerrykuku/luci-app-vssr

luci-app-vssr_git-23.361.56158-91729a3_all.ipk

### OpenClash

luci-app-openclash_0.45.112-239_all.ipk