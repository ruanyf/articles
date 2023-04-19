# opkg

opkg 是 Openwrt 的命令行包管理器。

https://openwrt.org/docs/guide-user/additional-software/opkg

- opkg update	从 OpenWrt 包存储库中获取可用包列表。
- opkg list	显示可用包及其描述的列表。
- opkg list | grep -e <search>	按包名称或其描述中的搜索词过滤列表。
- opkg install <packages>	安装一个包。
- opkg remove <packages>	卸载以前安装的软件包。