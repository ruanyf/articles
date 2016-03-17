# 硬件操作

## df

`df`命令查看硬盘信息。

```bash
$ df
Filesystem 1K-blocks Used Available Use% Mounted on
/dev/sda2 15115452 5012392 9949716 34% /
/dev/sda5 59631908 26545424 30008432 47% /home
/dev/sda1 147764 17370 122765 13% /boot
```

## free

`free`命令查看内存占用情况。

```bash
$ free
 total used free shared buffers cached
Mem: 513712 503976 9736 0 5312 122916
-/+ buffers/cache: 375748 137964
Swap: 1052248 104712 947536
```

## dmidecode

`dmidecode`命令用于输出BIOS信息。

```bash
$ sudo dmidecode
```

以上命令会输出全部BIOS信息。为了便于查看，往往需要指定所需信息的类别。

- 0 BIOS
- 1 System
- 2 Base Board
- 3 Chassis 4 Processor
- 5 Memory Controller
- 6 Memory Module
- 7 Cache
- 8 Port Connector
- 9 System Slots
- 10 On Board Devices
- 11 OEM Strings
- 12 System Configuration Options
- 13 BIOS Language
- 14 Group Associations
- 15 System Event Log
- 16 Physical Memory Array
- 17 Memory Device
- 18 32-bit Memory Error
- 19 Memory Array Mapped Address
- 20 Memory Device Mapped Address
- 21 Built-in Pointing Device
- 22 Portable Battery
- 23 System Reset
- 24 Hardware Security
- 25 System Power Controls
- 26 Voltage Probe
- 27 Cooling Device
- 28 Temperature Probe
- 29 Electrical Current Probe
- 30 Out-of-band Remote Access
- 31 Boot Integrity Services
- 32 System Boot
- 33 64-bit Memory Error
- 34 Management Device
- 35 Management Device Component
- 36 Management Device Threshold Data
- 37 Memory Channel
- 38 IPMI Device
- 39 Power Supply

查看内存信息的命令如下。

```bash
$ sudo dmidecode -t 17
# 或者
$ dmidecode --type 17
```

以下是其他一些选项。

```bash
# 查看BIOS信息
$ sudo dmidecode –t 0

# 查看CPU信息
$ sudo dmidecode -t 4
```

`dmidecode`也支持关键词查看，关键词与类别的对应关系如下。

- bios 0, 13
- system 1, 12, 15, 23, 32
- baseboard 2, 10
- chassis 3
- processor 4
- memory 5, 6, 16, 17
- cache 7
- connector 8
- slot 9

查看系统信息的命令如下。

```bash
$ sudo dmidecode -t system
```

## lspci

`lspci`命令列出本机的所有PCI设备。

```bash
$ lspci
```

该命令输出信息的格式如下。

```bash
03:00.0 Unassigned class [ff00]: Realtek Semiconductor Co., Ltd. RTS5209 PCI Express Card Reader (rev 01)
```

输出信息一共分成三个字段。

- Field 1：PCI bus slot 的编号
- Field 2：PCI slot的名字
- Field 3：设备名和厂商名

如果想查看更详细信息，可以使用下面的命令。

```bash
$ lspci -vmm
```

## lsusb

`lsusb`命令用于操作USB端口。

下面命令列出本机所有USB端口。

```bash
$ lsusb
```

它的输出格式如下。

```bash
Bus 002 Device 003: ID 0781:5567 SanDisk Corp. Cruzer Blade
```

各个字段的含义如下。

- Bus 002 : bus编号
- Device 003：bus 002连接的第三个设备
- ID 0781:5567：当前设备的编号，冒号前是厂商编号，冒号后是设备编号
- SanDisk Corp. Cruzer Blade：厂商和设备名

找出本机有多少个USB接口可用。

```bash
$ find /dev/bus/
/dev/bus/
/dev/bus/usb
/dev/bus/usb/002
/dev/bus/usb/002/006
/dev/bus/usb/002/005
/dev/bus/usb/002/004
/dev/bus/usb/002/002
/dev/bus/usb/002/001
/dev/bus/usb/001
/dev/bus/usb/001/007
/dev/bus/usb/001/003
/dev/bus/usb/001/002
/dev/bus/usb/001/001
```

查看某个USB设备的详细情况。

```bash
$ lsusb -D /dev/bus/usb/002/005
```

查看所有设备的详细情况。

```bash
$ lsusb -v
```

查看USB端口的版本。

```bash
$ lsusb -v | grep -i bcdusb
```
