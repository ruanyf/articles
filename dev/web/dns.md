# DNS 原理

“DNS 服务器”又称为`resolver`，它知道“根域名服务器”（root name server）的位置。发出请求的时候，客户端首先会向“DNS 服务器”发出请求。

对于客户端来说，“DNS 服务器”的网址要么是自动分配的（DHCP机制），要么是事先指定的。

DNS服务器在`/etc/resolv.conf`文件里面指定“根域名服务器”位置。

DNS服务器有一个根域名服务器列表，里面保存所有根域名服务器的IP网址。下面是一个[例子](http://www.cyberciti.biz/faq/unix-linux-update-root-hints-data-file/)。

```
; formerly NS.INTERNIC.NET
;
.                        3600000  IN  NS    A.ROOT-SERVERS.NET.
A.ROOT-SERVERS.NET.      3600000      A     198.41.0.4
A.ROOT-SERVERS.NET.      3600000      AAAA  2001:503:BA3E::2:30
;
; formerly NS1.ISI.EDU
;
.                        3600000      NS    B.ROOT-SERVERS.NET.
B.ROOT-SERVERS.NET.      3600000      A     192.228.79.201
;
; formerly C.PSI.NET
;
.                        3600000      NS    C.ROOT-SERVERS.NET.
C.ROOT-SERVERS.NET.      3600000      A     192.33.4.12
; formerly NS.INTERNIC.NET
;
.                        3600000  IN  NS    A.ROOT-SERVERS.NET.
A.ROOT-SERVERS.NET.      3600000      A     198.41.0.4
A.ROOT-SERVERS.NET.      3600000      AAAA  2001:503:BA3E::2:30
;
; formerly NS1.ISI.EDU
;
.                        3600000      NS    B.ROOT-SERVERS.NET.
B.ROOT-SERVERS.NET.      3600000      A     192.228.79.201
;
; formerly C.PSI.NET
;
.                        3600000      NS    C.ROOT-SERVERS.NET.
C.ROOT-SERVERS.NET.      3600000      A     192.33.4.12
```

根据这个列表，DNS 服务器会同时向所有的根域名服务器发出查询请求。最先返回查询结果的根域名服务器，将被DNS服务器缓存，在指定时间内不再发出查询请求。上面的列表中，指定这个时间是`3600000`秒（1000个小时）。

接下来，DNS 服务器将向根域名服务器发出查询请求，询问`www.example.com`的IP地址。顶级域名服务器返回“.com 域名服务器”的IP地址。DNS服务器又向“.com 域名服务器”发出查询请求，询问`www.example.com`的IP地址。

域名分成层级，首先是顶层域名，简写为`TLD`（top-level domain），然后是次级域名，简写为`SLD`。Each period in a 'domain' is actually a 'level'. Hence extensions such as .com or .us are considered a TLD (top-level domain). This also explains why an SLD is named so: because it sits at a 'secondary' level (it sits 'below' the TLD).

```bash
$ whois integralist.co.uk
```

查询域名的注册情况。

`host`命令可以看作`dig`命令的简化版本，返回当前请求域名的IP地址。

```bash
$ host www.integralist.co.uk
```

`host`命令也可以用于逆向查询，即从IP地址查询域名。

```bash
$ host 192.30.252.153
```

上面的命令等同于`dig -x <ip>`。

`nslookup`命令用于互动式地查询IP地址。

```bash
$ nslookup
> integralist.co.uk
Server:   192.168.1.1
Address:  192.168.1.1#53

Non-authoritative answer:
Name: integralist.co.uk
Address: 192.30.252.153
```

## 域名的记录类型

记录类型（record type）指的是不同类型的查询，会返回不同的IP地址。

- NS：为了安全起见，一般至少应该设置两台name server
- A：address record，为了提供冗余性，同一个域名可以提供多条A记录。
- MX：Mail eXchange 邮件记录，为了提供冗余性，同一个域名可以有多条MX记录
- CNAME：指向另一个域名
- PTR：逆向查询，可以用于防止垃圾邮件，即验证邮件的发送服务器，是否真的有这个域名。

```bash
$ dig mx bbc.co.uk +short
```

每条记录都有一个TTL值（Time to Live），表示缓存的有效期，单位为秒。

## 参考链接

- Mark McDonnell，[DNS 101](http://www.integralist.co.uk/posts/dnsbasics.html)
