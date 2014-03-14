开发网站的时候，常常需要自己配置Linux服务器。

本文记录配置Linux服务器的初步流程，也就是系统安装完成后，下一步要做的事情。这主要是我自己的总结和备忘，如果有遗漏，欢迎大家补充。

下面的操作针对Debian/Ubuntu系统，其他Linux系统也类似，就是部分命令稍有不同。

![](http://image.beekka.com/blog/2014/bg2014031401.jpg)

## 第一步：root用户登录

首先，使用root用户登录远程主机（假定IP地址是128.199.209.242）。

<blockquote><pre><code class="language-bash">
ssh root@128.199.209.242

</code></pre></blockquote>

这时，命令行会出现警告，表示这是一个新的地址，存在安全风险。键入yes，表示接受。然后，就应该可以顺利登入远程主机。

接着，修改root用户的密码。

<blockquote><pre><code class="language-bash">
passwd

</code></pre></blockquote>

## 第二步：新建用户

首先，添加一个用户组（这里假定为admin用户组）。

<blockquote><pre><code class="language-bash">
addgroup admin

</code></pre></blockquote>

然后，添加一个新用户（假定为bill）。

<blockquote><pre><code class="language-bash">
useradd -d /home/bill -s /bin/bash -m bill 

</code></pre></blockquote>

上面命令中，参数d指定用户的主目录，参数s指定用户的shell，参数m表示如果该目录不存在，则创建该目录。

接着，设置新用户的密码。

<blockquote><pre><code class="language-bash">
passwd bill 

</code></pre></blockquote>

将新用户（bill）添加到用户组（admin）。

<blockquote><pre><code class="language-bash">
usermod -a -G admin bill 

</code></pre></blockquote>

接着，为新用户设定sudo权限。

<blockquote><pre><code class="language-bash">
visudo 

</code></pre></blockquote>

visudo命令会打开sudo设置文件/etc/sudoers，找到下面这一行。

<blockquote><pre><code class="language-bash">
root    ALL=(ALL:ALL) ALL

</code></pre></blockquote>

在这一行的下面，再添加一行。

<blockquote><pre><code class="language-bash">
root    ALL=(ALL:ALL) ALL
bill    ALL=(ALL) NOPASSWD: ALL

</code></pre></blockquote>

上面的NOPASSWD表示，切换sudo的时候，不需要输入密码，我喜欢这样比较省事。如果出于安全考虑，也可以强制要求输入密码。

<blockquote><pre><code class="language-bash">
root    ALL=(ALL:ALL) ALL
bill    ALL=(ALL:ALL) ALL

</code></pre></blockquote>

然后，先退出root用户的登录，再用新用户的身份登录，检查到这一步为止，是否一切正常。

<blockquote><pre><code class="language-bash">
exit
ssh bill@128.199.209.242

</code></pre></blockquote>

## 第三步：SSH设置

首先，确定本机有SSH公钥（一般是文件~/.ssh/id_rsa.pub），如果没有的话，使用ssh-keygen命令生成一个（可参考我写的[SSH教程](http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)）。

在本机上另开一个shell窗口，将本机的公钥拷贝到服务器的authorized_keys文件。

<blockquote><pre><code class="language-bash">
cat ~/.ssh/id_rsa.pub | ssh bill@128.199.209.242 'mkdir -p .ssh && cat - >> ~/.ssh/authorized_keys'

# 或者在服务器端，运行下面命令

echo "ssh-rsa [your public key]" > ~/.ssh/authorized_keys

</code></pre></blockquote>

然后，进入服务器，编辑SSH配置文件/etc/ssh/sshd_config。

<blockquote><pre><code class="language-bash">
sudo cp /etc/ssh/sshd_config ~
sudo nano /etc/ssh/sshd_config

</code></pre></blockquote>

在配置文件中，将SSH的默认端口23改掉，可以改成从1025到65536之间的任意一个整数（这里假定为25000）。

<blockquote><pre><code class="language-bash">
Port 25000

</code></pre></blockquote>

然后，检查几个设置是否设成下面这样，确保去除前面的#号。

<blockquote><pre><code class="language-bash">
Protocol 2

PermitRootLogin no
PermitEmptyPasswords no
PasswordAuthentication no

RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
  
UseDNS no

</code></pre></blockquote>

上面主要是禁止root用户登录，以及禁止用密码方式登录。

接着，在配置文件的末尾，指定允许登陆的用户。

<blockquote><pre><code class="language-bash">
AllowUsers bill

</code></pre></blockquote>

保存后，退出文件编辑。

接着，改变authorized_keys文件的权限。

<blockquote><pre><code class="language-bash">
sudo chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh/

</code></pre></blockquote>

然后，重启SSHD。

<blockquote><pre><code class="language-bash">
sudo service ssh restart

# 或者

sudo /etc/init.d/ssh restart

</code></pre></blockquote>

下面的一步是可选的。在本机~/.ssh文件夹下创建config文件，内容如下。

<blockquote><pre><code class="language-bash">
Host s1
HostName 128.199.209.242
User bill
Port 25000

</code></pre></blockquote>

最后，在本机另开一个shell窗口，测试SSH能否顺利登录。

<blockquote><pre><code class="language-bash">
ssh s1

</code></pre></blockquote>

## 第四步：运行环境配置

首先，检查服务器的区域设置。

<blockquote><pre><code class="language-bash">
locale

</code></pre></blockquote>

如果结果不是en_US.UTF-8，建议都设成它。

<blockquote><pre><code class="language-bash">
sudo locale-gen en_US en_US.UTF-8 en_CA.UTF-8
sudo dpkg-reconfigure locales

</code></pre></blockquote>

然后，更新软件。

<blockquote><pre><code class="language-bash">
sudo apt-get update
sudo apt-get upgrade

</code></pre></blockquote>

最后，再根据需要，做一些安全设置，比如搭建防火墙，关闭HTTP、HTTPs、SSH以外的端口，再比如安装Fail2Ban，详细可参考这篇[《Securing a Linux Server》](http://spenserj.com/blog/2013/07/15/securing-a-linux-server/)。

（完）