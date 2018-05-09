# 根域名的知识

域名是互联网的基础设施，只要上网就会用到。

它还是一门利润丰厚的生意，所有域名每年都必须交注册费，这是很大的一笔钱。

这些钱交到了哪里？到底谁控制域名的价格？为什么有的域名注册费很贵，有的便宜？……今天，我就来谈谈这些与根域名（root domain）相关的知识。

![](http://www.ruanyifeng.com/blogimg/asset/2018/bg2018050901.jpg)

## 一、ICANN

全世界域名的最高管理机构，是一个叫做 [ICANN](https://www.icann.org/) （Internet Corporation for Assigned Names and Numbers）的组织。它的总部在美国加州。

![](http://www.ruanyifeng.com/blogimg/asset/2018/bg2018050902.jpg)

它原来是美国商务部下面的一个非盈利机构，所以有人说，美国政府控制了全世界的域名，这种说法是有根据的。2016年，美国政府宣布，ICANN 不再隶属于商务部，成为一个自我管理的独立机构。但是可想而知，美国政府依然对它有绝对影响。

ICANN 负责管理全世界域名系统的运作。它的一项主要工作，就是规定顶级域名（top level domain，简写为 TLD）。

## 二、TLD

所谓顶级域名（TLD），就是最高层级的域名。简单说，就是网址的最后一个部分。比如，网址`www.example.com`的顶级域名就是`.com`。

ICANN 就负责规定，哪些字符串可以当作顶级域名。截至2015年7月，顶级域名共有1058个。

它们可以分成两类。一类是一般性顶级域名（gTLD），比如`.com`、`.net`、`.edu`、`.org`、`.xxx`等等，共有700多个。另一类是国别顶级域名（ccTLD），代表不同的国家和地区，比如`cn`（中国）、`io`（英属印度洋领地）、`cc`（ 科科斯群岛）、`tv`（图瓦卢）等，共有300多个。

## 三、顶级域名托管商

ICANN 自己不会去管理这些顶级域名，因为根本管不过来。想想看，顶级域名有1000多个，每个顶级域名下面都有许多批发商，如果每个都要管，就太麻烦了。

ICANN 的政策是，每个顶级域名都找一个托管商，该域名的所有事项都由托管商负责。ICANN 只与托管商联系，这样管理起来就容易多了。举例来说，`cn`域名的托管商就是[中国互联网络信息中心](http://www.cnnic.net.cn/)（CNNIC），它决定了`cn`域名的各种政策。

目前，世界最大的顶级域名托管商是美国的 [Verisign](https://www.verisign.com/) 公司。

## 四、Verisign

![](http://www.ruanyifeng.com/blogimg/asset/2018/bg2018050903.jpg)

Verisign 是一家商业公司，总部在美国维吉尼亚州。它托管了`.com`、`.net` 、`.name`、`.gov`这四个一般性顶级域名，以及`.cc`和`.tv`这两个国别顶级域名。另外，`.edu`和`.jobs`的后台管理工作，也外包给了它。

它对`.com`和`.net`的独家垄断是历史形成的。最早的时候， Network Solutions 公司接受美国国家科学基金会的委托，管理顶级域名。2000年，Verisign 收购了这家公司，继承了域名业务。2003年，Verisign 卖掉了域名注册业务，只保留顶级域名管理。也就是说，它只做域名批发，不做域名零售了。

2010年，Verisign 又把网站安全和加密证书业务卖给了 Symantec 公司。后者又在2017年把这项业务卖给了 DigiCert。

## 五、ICANN 与 Verisign 打官司

按理说，Verisign 是 ICANN 最大的托管商，两家的关系应该很好才对。事实却是它们的关系很差，甚至还打过官司。

原因在于，ICANN 是政府支持的非盈利机构，不以盈利为目标，而 Verisign 是一家商业公司，追求利润最大化，每年必须交大量的托管费给前者。两家的矛盾就源于此。

2003年，Verisign 推出了一项新业务 Site Finder，用户访问没有注册过的`.com`或`.net`域名，都会被导向 Verisign 的网站。这意味着，它事实上拥有了所有没有注册过的`.com`和`.net`域名。 几天之内，Verisign 就挤入了全世界的前10大网站。

ICANN 要求 Verisign 立刻停止该业务，否则将终止域名托管合同。Verisign 屈服了，停止了这项业务，但是接着就把 ICANN 告上了法庭，要求法庭理请两者之间的合同，ICANN 到底有没有权力干涉它的业务。
 
2006年底，它们达成了庭外和解。ICANN 同意延长 Verisign 的顶级域名托管合同，并且同意 Verisign 向消费者收取的单个域名注册费的上限，从6美元提高到了7.85美元。这个费用标准，一直沿用到了今天，你去注册一个`.com`或`.net`域名，所交的钱有0.18美元是 ICANN 收取的管理费，7.85美元是 Verisign 收取的托管费，其余的钱就是域名零售商的费用。

![](http://www.ruanyifeng.com/blogimg/asset/2018/bg2018050904.png)

如果一个`.com`或`.net`域名售价10美元，ICANN 和 Verisign 合计拿走8.03美元。

后来，Verisign 的顶级域名托管合同又延长过两次，当前合同要到2024年才会到期。

表面上看，ICANN 让 Verisign 获得了巨额垄断利润。（曾经有公司提出，只要让它来托管`.com`域名，单个域名的托管费，可以降低到每年1美元。）但是实际上，ICANN 通过另一种方式在发挥市场的力量，那就是它不断提高顶级域名的数量和品种。如果你觉得`.com`域名太贵，你完全可以申请其他的顶级域名，有 1000多个顶级域名任你选择。

## 六、根域名

由于 ICANN 管理着所有的顶级域名，所以它是最高一级的域名节点，被称为根域名（root domain）。在有些场合，`www.example.com`被写成`www.example.com.`，即最后还会多出一个点。这个点就是根域名。

理论上，所有域名查询都必须先查询根域名，因为只有根域名才能告诉你，某个顶级域名由哪台服务器管理。事实上也确实如此，ICANN 维护着一张列表，里面记载着顶级域名和对应的托管商。

比如，我要访问`www.example.com`，就必须先询问 ICANN 的根域名列表，它会告诉我`.com`域名由 Verisign 托管，我必须去找 Verisign，它会告诉我`example.com`服务器在哪里。

再比如，我要访问`abc.xyz`，也必须先去询问根域名列表，它会告诉我`.xyz`域名由 CentralNic 公司托管。根域名列表还记载，`.google`由谷歌公司托管，`.apple`由苹果公司托管等等。

由于根域名列表很少变化，大多数 DNS 服务商都会提供它的缓存，所以根域名的查询事实上不是那么频繁。

## 七、DNS 根区

根域名列表的正式名称是 [DNS 根区](https://en.wikipedia.org/wiki/DNS_root_zone)（DNS root zone），ICANN 官网可以[查看](https://www.iana.org/domains/root/files)这个[根区文件](https://www.internic.net/domain/root.zone)。

该文件保存所有顶级域名的托管信息，所以非常大，超过2MB。

举例来说，顶级域名`.com`可以查到13个域名服务器。

```
com.			172800	IN	NS	a.gtld-servers.net.
com.			172800	IN	NS	b.gtld-servers.net.
com.			172800	IN	NS	c.gtld-servers.net.
com.			172800	IN	NS	d.gtld-servers.net.
com.			172800	IN	NS	e.gtld-servers.net.
com.			172800	IN	NS	f.gtld-servers.net.
com.			172800	IN	NS	g.gtld-servers.net.
com.			172800	IN	NS	h.gtld-servers.net.
com.			172800	IN	NS	i.gtld-servers.net.
com.			172800	IN	NS	j.gtld-servers.net.
com.			172800	IN	NS	k.gtld-servers.net.
com.			172800	IN	NS	l.gtld-servers.net.
com.			172800	IN	NS	m.gtld-servers.net.
```

也就是说，`.com`域名的解析结果，可以到这个13个服务器的任一台查询。细心的读者可能发现，这些服务器本身也是使用域名（比如`a.gtld-servers.net.`）标识，那么还得去查询它们指向的服务器，这样很容易造成循环查询。

因此，DNS 根区还会同时提供这些服务器的 IP 地址（IPv4 和 IPv6）。

```
a.gtld-servers.net.	172800	IN	A	192.5.6.30
a.gtld-servers.net.	172800	IN	AAAA	2001:503:a83e:0:0:0:2:30
b.gtld-servers.net.	172800	IN	A	192.33.14.30
b.gtld-servers.net.	172800	IN	AAAA	2001:503:231d:0:0:0:2:30
c.gtld-servers.net.	172800	IN	A	192.26.92.30
c.gtld-servers.net.	172800	IN	AAAA	2001:503:83eb:0:0:0:0:30
... ...
```

## 八、根域名服务器

保存 DNS 根区文件的服务器，就叫做 DNS 根域名服务器（root name server）。

由于早期的 DNS 查询结果是一个512字节的 UDP 数据包。这个包最多可以容纳13个服务器的地址，因此就规定全世界有13个根域名服务器，编号从`a.root-servers.net`一直到`m.root-servers.net`。

这13台根域名服务器由12个组织独立运营。其中，Verisign 公司管理两台根域名服务器：A 和 J。每家公司为了保证根域名服务器的可用性，会部署多个节点，比如单单 Verisign 一家公司就部署了104台根域名服务器（2016年1月数据）。

所以，根域名服务器其实[不止13台](https://www.icann.org/news/blog/there-are-not-13-root-servers)。据统计，截止2016年1月，全世界共有 517 台根域名服务器。你可以在 http://root-servers.org 这个网站查到所有根域名服务器的信息。

根域名服务器虽然有域名，但是最少必须知道一台的 IP 地址，否则就会陷入循环查询。一般来说，本机都保存一份根域名服务器的 IP 地址的缓存，叫做 [name.cache](https://www.internic.net/zones/named.cache) 文件。 

```
A.ROOT-SERVERS.NET。3600000 A 198.41.0.4
A.ROOT-SERVERS.NET。3600000 AAAA 2001：503：ba3e :: 2：30

B.ROOT-SERVERS.NET。3600000 A 199.9.14.201
B.ROOT-SERVERS.NET。3600000 AAAA 2001：500：200 :: b

C.ROOT-SERVERS.NET。3600000 A 192.33.4.12
C.ROOT-SERVERS.NET。3600000 AAAA 2001：500：2 :: c

... ...
```

这个文件记录了13台根域名服务器的 IP 地址。

## 九、参考链接

- [What actually happens when you buy a domain name?](https://taimur.me/domain-names/), by Taimur
- [ICANN](https://en.wikipedia.org/wiki/ICANN), by Wikipedia
- [Verisign](https://en.wikipedia.org/wiki/Verisign), by Wikipedia
- [DNS root zone](https://en.wikipedia.org/wiki/Root_name_server), by Wikipedia
- [Root Name Server](https://en.wikipedia.org/wiki/Root_name_server), by Wikipedia

（完）

