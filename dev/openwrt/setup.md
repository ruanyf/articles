# OpenWrt 设置

软件包下载：https://op.supes.top/packages/

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