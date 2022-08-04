# DNS 查询原理详解

只有通过 DNS 查询，得到域名的 IP 地址，才能访问网站。

那么，DNS 查询到底是怎么完成的？本文通过实例，详细介绍背后的步骤。

![](https://cdn.beekka.com/blogimg/asset/202208/bg2022080102.webp)

## 一、DNS 服务器

域名对应的 IP 地址，都保存在 DNS 服务器。

我们输入域名，浏览器就会在后台，自动向 DNS 服务器发出请求，获取对应的 IP 地址。这就是 DNS 查询。

![](https://cdn.beekka.com/blogimg/asset/202208/bg2022080103.webp)

举例来说，我输入 `es6.ruanyifeng.com` 这个域名，浏览器就要向 DNS 服务器查询，它的 IP 地址是什么，然后向该 IP 发出访问请求。

网上有很多公用的 DNS 服务器，这篇文章选择 Cloudflare 公司提供的 1.1.1.1 进行演示。

![](https://cdn.beekka.com/blogimg/asset/202208/bg2022080104.webp)

## 二、dig 命令

命令行工具 dig 可以跟 DNS 服务器互动，我们就用它演示 DNS 查询。如果你还没有安装，可以搜一下安装方法，在 Linux 系统下是非常容易的。

它的查询语法如下（美元符号`$`是命令行提示符）。

<blockquote><pre><code class="language-bash">
$ dig @[DNS 服务器] [域名]
</code></pre></blockquote>

向 1.1.1.1 查询域名，就执行下面的命令。

<blockquote><pre><code class="language-bash">
$ dig @1.1.1.1 es6.ruanyifeng.com
</code></pre></blockquote>

正常情况下，它会输出一大堆内容。

![](https://cdn.beekka.com/blogimg/asset/202208/bg2022080105.webp)

在其中找到 ANSWER SECTION 这个部分，它给出了查询的答案，域名对应的 IP 地址是 104.198.14.52。

## 三、域名的树状结构

你可能会问，难道 DNS 服务器（比如 1.1.1.1）保存了世界上所有域名（包括二级域名、三级域名）的 IP 地址？

当然不是。DNS 是一个分布式系统，1.1.1.1 只是用户查询入口，它也需要再向其他 DNS 服务器查询，才能获得最终的 IP 地址。

要说清楚 DNS 完整的查询过程，就必须了解 **域名是一个树状结构**。

最顶层的域名是根域名（root），然后是顶级域名（top-level domain，简写 TLD），再是一级域名、二级域名、三级域名。

![](https://cdn.beekka.com/blogimg/asset/202208/bg2022080106.webp)

**（1）根域名**

所有域名的起点都是根域名，它写作一个点`.`，放在域名的结尾。因为这部分对于所有域名都是相同的，所以就省略不写了，比如`example.com`等同于`example.com.`（结尾多一个点）。

你可以试试，任何一个域名结尾加一个点，浏览器都可以正常解读。

**（2）顶级域名**

根域名连接到顶级域名。它分成两种：通用顶级域名（gTLD，比如 .com 和 .net）和国别顶级域名（ccTLD，比如 .cn 和 .us）。

顶级域名由国际域名管理机构 ICANN 控制，它委托商业公司管理 gTLD，委托各国管理自己的国别域名。

**（3）一级域名**

一级域名就是你在某个顶级域名下面，自己注册的域名。比如，`ruanyifeng.com`就是我在顶级域名`.com`下面注册的。

**（4）二级域名**

二级域名是一级域名的子域名，是域名拥有者自行设置的，不用得到许可。比如，`es6` 就是 `ruanyifeng.com` 的二级域名。

## 四、域名的逐级查询

这种树状结构的意义在于，**只有上级域名，才知道下一级域名的 IP 地址，需要逐级查询。** 

每一级域名都有自己的 DNS 服务器，存放下级域名的 IP 地址。

所以，如果想要查询二级域名 `es6.ruanyifeng.com` 的 IP 地址，需要三个步骤。

> 第一步，查询根域名服务器，获得顶级域名服务器`.com`（又称 TLD 服务器）的 IP 地址。
> 
> 第二步，查询 TLD 服务器 `.com`，获得一级域名服务器 `ruanyifeng.com` 的 IP 地址。
> 
> 第三步，查询一级域名服务器 `ruanyifeng.com`，获得二级域名 `es6` 的 IP 地址。

下面依次演示这三个步骤。

## 五、根域名服务器

根域名服务器全世界一共有13台（都是服务器集群）。它们的域名和 IP 地址如下。

![](https://cdn.beekka.com/blogimg/asset/202208/bg2022080107.webp)

根域名服务器的 IP 地址是不变的，集成在操作系统里面。

操作系统会选其中一台，查询 TLD 服务器的 IP 地址。

<blockquote><pre><code class="language-bash">
$ dig @192.33.4.12 es6.ruanyifeng.com
</code></pre></blockquote>

上面示例中，我们选择`192.33.4.12`，向它发出查询，询问`es6.ruanyifeng.com`的 TLD 服务器的 IP 地址。

dig 命令的输出结果如下。

![](https://cdn.beekka.com/blogimg/asset/202208/bg2022080108.webp)

因为它给不了 `es6.ruanyifeng.com` 的 IP 地址，所以输出结果中没有 ANSWER SECTION，只有一个 AUTHORITY SECTION，给出了`com.`的13台 TLD 服务器的域名。

下面还有一个 ADDITIONAL SECTION，给出了这13台 TLD 服务器的 IP 地址（包含 IPv4 和 IPv6 两个地址）。

## 六、TLD 服务器

有了 TLD 服务器的 IP 地址以后，我们再选一台接着查询。

<blockquote><pre><code class="language-bash">
$ dig @192.41.162.30 es6.ruanyifeng.com
</code></pre></blockquote>

上面示例中，192.41.162.30 是随便选的一台 .com 的 TLD 服务器，我们向它询问 `es6.ruanyifeng.com` 的 IP 地址。

返回结果如下。

![](https://cdn.beekka.com/blogimg/asset/202208/bg2022080109.webp)

它依然没有 ANSWER SECTION 的部分，只有 AUTHORITY SECTION，给出了一级域名 ruanyifeng.com 的两台 DNS 服务器。

下面的 ADDITIONAL SECTION 就是这两台 DNS 服务器对应的 IP 地址。

## 七、一级域名的 DNS 服务器

第三步，再向一级域名的 DNS 服务器查询二级域名的 IP 地址。

<blockquote><pre><code class="language-bash">
$ dig @172.64.32.123 es6.ruanyifeng.com
</code></pre></blockquote>

返回结果如下。

![](https://cdn.beekka.com/blogimg/asset/202208/bg2022080110.webp)

这次终于有了 ANSWER SECTION，得到了最终的二级域名的 IP 地址。

至此，三个步骤的 DNS 查询全部完成。

## 八、DNS 服务器的种类

总结一下，上面一共提到了四种服务器。

> - 1.1.1.1
> - 根域名服务器
> - TLD 服务器
> - 一级域名服务器

它们都属于 DNS 服务器，都用来接受 DNS 查询。但是作用不一样，属于不同的类别。

### 8.1 递归 DNS 服务器

后三种服务器只用来查询下一级域名的 IP 地址，而 1.1.1.1 则把分步骤的查询过程自动化，方便用户一次性得到结果，所以它称为**递归 DNS 服务器**（recursive DNS server），即可以自动递归查询。

我们平常说的 DNS 服务器，一般都是指递归 DNS 服务器。它把 DNS 查询自动化了，只要向它查询就可以了。

它内部有缓存，可以保存以前查询的结果，下次再有人查询，就直接返回缓存里面的结果。所以它能加快查询，减轻源头 DNS 服务器的负担。

### 8.2 权威 DNS 服务器

一级域名服务器的正式名称叫做**权威域名服务器**（Authoritative Name Server）。

“权威”的意思是域名的 IP 地址由它给定，不像递归服务器自己做不了主。我们购买域名后，设置 DNS 服务器就是在设置该域名的权威服务器。

### 8.3 四种 DNS 服务器

综上所述，DNS 服务器可以分成四种：

> - 根域名服务器
> - TLD 服务器
> - 权威域名服务器
> - 递归域名服务器 

它们的关系如下图。

![](https://cdn.beekka.com/blogimg/asset/202208/bg2022080112.webp)

知道了 DNS 查询的原理，完全可以自己写一个 DNS 的递归服务器，这是不难的。网上有很多参考资料，有兴趣的话，大家可以试试看。

![](https://cdn.beekka.com/blogimg/asset/202208/bg2022080111.webp)

## 九、参考网址

- [Building a Recursive DNS Resolver](https://timothya.com/blog/dns/), Timothy Andrew
- [Authoritative Vs Recursive DNS: What You Need To Know](https://www.dnsfilter.com/blog/authoritative-vs-recursive-dns), Serena Raymond
- [DNS 服务器类型](https://www.cloudflare.com/zh-cn/learning/dns/dns-server-types/)，Cloudflare 

（完）