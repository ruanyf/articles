# 时间管理

## timedatectl 命令

`timedatectl`命令用来控制系统的时间和日期。

不使用任何参数时，会显示当前的时间和日期。

```bash
$ timedatectl
      Local time: Wed 2017-11-15 15:58:33 UTC
  Universal time: Wed 2017-11-15 15:58:33 UTC
        RTC time: Wed 2017-11-15 15:58:32
       Time zone: UTC (UTC, +0000)
     NTP enabled: yes
NTP synchronized: yes
 RTC in local TZ: no
      DST active: n/a
```

上面字段的含义如下。

- Local time：当前的本地日期和时间
- Universal time：当前 UTC 时间
- RTC time：当前的真实时间
- Time zone：系统时区
- NTP enabled：是否启用了 NTP 
- NTP synchronized：NTP 时间是否已同步。
- RTC in local TZ：RTC 是否在配置的系统时区维护
- DST active：启用夏令时或不启用

`timedatectl list-timezones`命令列出所有可用的时区。

```bash
$ timedatectl list-timezones
Africa/Abidjan
Africa/Accra
Africa/Addis_Ababa
Africa/Algiers
Africa/Asmara
Africa/Bamako
```

`timedatectl set-timezone`命令用来设置时区。

```bash
$ sudo timedatectl set-timezone Australia/Sydney
```

`timedatectl set-time`命令用来手动设置时间。

```bash
$ timedatectl set-time "2018-01-01 12:12:12"
```
