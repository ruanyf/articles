# 证书登录

## 证书登录的优点

密钥登录有两个前提。

- 用户必须记录要访问的所有服务器的公钥指纹。
- 服务器必须保存允许进入的所有用户的公钥。

这对于多用户、多服务器的大型机构很不方便。如果有员工离职，需要将他的公钥从每台服务器删除。

SSH 证书：由受信任实体（称为证书颁发机构（CA））签名的公钥。这意味着不再需要复制密钥，用户和服务器仅需同意信任哪个CA。

- 证书必须是 CA 颁发。
- 证书必须捆绑公钥。
- 证书提供到期时间。

当用户尝试访问服务器时，不需要用户和服务器提前知道彼此的公钥。相反，它们交换其证书并验证它们是否由同一证书颁发机构（CA）签名。

可以生成一个证书中心（CA），并使得远程主机信任 CA，这样就不用将本机的公钥上传到服务器了。

证书登录有一些优点。

- 证书具有有效期，到期会自动失效，而公钥是没有有效期的。可以有效期很短的证书，这样可以进一步提高安全性。
- 证书对多个主机、多个账户都有效，不必将每个用户的公钥都上传到服务器，这样比较省事。

## 证书登录的过程

第一步，客户端和服务器都将自己的公钥，发给 CA。

CA 使用客户端的公钥，制作客户端证书，发给客户端；使用服务器公钥，制作服务器证书，发给服务器。

第二步，客户端登录服务器时，将自己的证书发给服务器。

第三步，服务器检查客户端证书是否有效，是否由信任的 CA 发布。

第四步，服务器将服务器证书发给客户端。

第五步，客户端检查服务器证书是否有效，是否由信任的 CA 发布。

第六步，双方建立连接。

## 操作过程

### 生成 CA 密钥

生成 CA 的密钥。

```bash
$ ssh-keygen -t ecdsa-sk -f sk-user-ca -O resident -C [security key ID]
```

- `-C` 注释

生成密钥文件`sk-user-ca`（私钥）、`sk-user-ca.pub`（公钥）。

生成 CA 签署客户端证书的密钥

```bash
$ ssh-keygen -t rsa -f ~/.ssh/ca_user_key
```

生成 CA 签署服务器证书的密钥。

```bash
$ ssh-keygen -t rsa -f ~/.ssh/ca_host_key
```

```bash
# CA 签发服务器证书的密钥
$ ssh-keygen -t rsa -b 4096 -f host_ca -C host_ca

# CA 签发客户端证书的密钥
$ ssh-keygen -t rsa -b 4096 -f user_ca -C user_ca
```

### CA 签发服务器证书

生成服务器的密钥

```bash
$ ssh-keygen -f ssh_host_rsa_key -N '' -b 4096 -t rsa
```

上面命令会在当前目录，生成`ssh_host_rsa_key`（私钥）和`ssh_host_rsa_key.pub`（公钥）。

使用 CA 的密钥`host_ca`为服务器的密钥`ssh_host_rsa_key.pub`签发证书。

```bash
$ ssh-keygen -s host_ca -I host.example.com -h -n host.example.com -V +52w ssh_host_rsa_key.pub
```

上面的命令生成了服务器证书`ssh_host_rsa_key-cert.pub`。

- `-s`：指定签署证书的密钥。
- `-I`：身份字符串，可以随便设，方便区分证书。将来可以使用这个字符吊销公钥。
- `-h`：指定该证书是服务器证书，而不是客户端证书。
- `-n host.example.com`：指定以逗号分隔的主体列表，证书是针对该域名，即客户端连接到的服务器主机名。如果已设置 DNS，也就是服务器的域名。
- `-V +52w`：指定证书的有效期，这里为52周（一年）。默认情况下，证书是永远有效的。强烈建议使用该参数，并且有效期最好短一点，最长不超过52周。

### 服务器安装证书

将`ssh_host_rsa_key`（私钥）和`ssh_host_rsa_key.pub`（公钥）、`ssh_host_rsa_key.pub`这三个文件，复制到服务器，设置权限，存储在`/etc/ssh`目录。

然后，将下面一行添加到`/etc/ssh/sshd_config`文件。

```bash
HostCertificate /etc/ssh/ssh_host_rsa_key-cert.pub
```

重新启动 sshd。

```bash
$ sudo systemctl restart sshd
```

### 客户端信任 CA 服务器公钥

CA 的公钥需要添加到 known_hosts 文件中。

先获取`host_ca.pub`文件的内容，将其添加`@cert-authority *.example.com`到开头，然后将内容附加到`~/.ssh/known_hosts`：

```bash
@cert-authority *.example.com ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDwiOso0Q4W+KKQ4OrZZ1o1X7g3yWcmAJtySILZSwo1GXBKgurV4jmmBN5RsHetl98QiJq64e8oKX1vGR251afalWu0w/iW9jL0isZrPrmDg/p6Cb6yKnreFEaDFocDhoiIcbUiImIWcp9PJXFOK1Lu8afdeKWJA2f6cC4lnAEq4sA/Phg4xfKMQZUFG5sQ/Gj1StjIXi2RYCQBHFDzzNm0Q5uB4hUsAYNqbnaiTI/pRtuknsgl97xK9P+rQiNfBfPQhsGeyJzT6Tup/KKlxarjkMOlFX2MUMaAj/cDrBSzvSrfOwzkqyzYGHzQhST/lWQZr4OddRszGPO4W5bRQzddUG8iC7M6U4llUxrb/H5QOkVyvnx4Dw76MA97tiZItSGzRPblU4S6HMmCVpZTwva4LLmMEEIk1lW5HcbB6AWAc0dFE0KBuusgJp9MlFkt7mZkSqnim8wdQApal+E3p13d0QZSH3b6eB3cbBcbpNmYqnmBFrNSKkEpQ8OwBnFvjjdYB7AXqQqrcqHUqfwkX8B27chDn2dwyWb3AdPMg1+j3wtVrwVqO9caeeQ1310CNHIFhIRTqnp2ECFGCCy+EDSFNZM+JStQoNO5rMOvZmecbp35XH/UJ5IHOkh9wE5TBYIeFRUYoc2jHNAuP2FM4LbEagGtP8L5gSCTXNRM1EX2gQ== host_ca
```

该值`*.example.com`是模式匹配，表示该证书应可信任，以标识您连接到的任何具有*.example.com- 域的主机（例如host.example.com上述主机）。表示连接到这些域名的服务器，只要有该 CA 签发的证书，就可以信任。

这是证书的适用主机名的逗号分隔列表，因此，如果您在此处使用IP地址或SSH配置条目，则可以将其更改为类似host1,host2,host3或1.2.3.4,1.2.3.5适当的名称。

然后，就可以使用证书，登录远程服务器了。

### CA 签发客户端证书

生成客户端密钥。

```bash
$ ssh-keygen -f user-key -b 4096 -t rsa
```

上面命令会生成`user-key`（私钥）和`user-key.pub`（公钥）。

签发客户端证书。

```bash
$ ssh-keygen -s user_ca -I gus@gravitational.com -n ec2-user,gus -V +1d user-key.pub
```

`-n`表示该证书只对登录用户`ec2-user`和`gus`生效。

上面命令会生成客户端证书`user-key-cert.pub`。

- `-s user_ca`：指定用于签名的CA私钥
- `-I gus@gravitational.com`：身份字符串，可以随意指定，将来可以使用该值撤销这个证书。
- `-n ec2-user,gus`：指定以逗号分隔的委托人列表，该证书将对身份验证有效，即* nix用户应被允许以此证书登录。在我们的示例中，我们为该证书提供对ec2-user和的访问权限gus。
- `-V +1d`：指定证书的有效期，在这种情况下+1d为1天，默认为永远有效。

查看证书的细节。

```bash
$ ssh-keygen -L -f user-key-cert.pub
```

### 服务器信任 CA 的客户端公钥

签署证书后，还需要告诉服务器它应该信任用户CA签署的证书。为此，请将 CA 的`user_ca.pub`文件复制到服务器并存储在`/etc/ssh`。修复与目录中其他公钥文件匹配的权限，然后将下面的行添加到`/etc/ssh/sshd_config`：

```bash
TrustedUserCAKeys /etc/ssh/user_ca.pub
```

然后，重新启动 sshd。

```bash
$ systemctl restart sshd
```

现在，服务器已配置为信任在连接时出示由用户CA颁发的证书的任何人。如果您的证书与私钥在同一目录中（-i例如`ssh -i /home/gus/user-key ec2-user@host.example.com`，用`-i`标志指定），则在连接服务器时将自动使用该证书。

### 创建证书

```bash
$ ssh-keygen -s sk-user-ca -I test-key -n ubuntu -V -5m:+5m emergency
```

`-n`：添加用户名，上面例子中，用户名是`ubuntu`。如果添加多个用户名，需要用逗号分隔 `-n ubuntu,carl,ec2-user`

下面是创建客户端证书。

```bash
$ ssh-keygen -s ca_user_key -I certificate_ID id_rsa.pub
```

上面命令中，`-s`表示用于签署证书的 CA 私钥，`-I`表示一个身份字符串`certificate_ID`，可以是任何字母数字值，它以零终止字符串存储在证书中。所述certificate_ID每当证书用于识别记录和废止证书时，它也被使用。较长的值会使日志难以阅读，因此将主机名用作主机证书，将用户名用作用户证书是安全的选择。

下面是创建服务器证书。

```bash
$ ssh-keygen -s ca_host_key -I certificate_ID -h ssh_host_rsa_key.pub
```

上面命令中，`-s`是 CA 签署服务器证书的公钥。`-I`是主机名，用来区别不同的证书，可以是任意字符串。`-h`指定生成的主机证书`ssh_host_rsa_key.pub`。

为证书加上权限。

```bash
$ chmod 600 emergency-cert.pub
```

查看刚刚生成的公钥。

```bash
# ls -l /etc/ssh/ssh_host*
-rw-------. 1 root root  668 Jul  9  2014 /etc/ssh/ssh_host_dsa_key
-rw-r--r--. 1 root root  590 Jul  9  2014 /etc/ssh/ssh_host_dsa_key.pub
-rw-------. 1 root root  963 Jul  9  2014 /etc/ssh/ssh_host_key
-rw-r--r--. 1 root root  627 Jul  9  2014 /etc/ssh/ssh_host_key.pub
-rw-------. 1 root root 1671 Jul  9  2014 /etc/ssh/ssh_host_rsa_key
-rw-r--r--. 1 root root  382 Jul  9  2014 /etc/ssh/ssh_host_rsa_key.pub
```

检查刚刚制作好的证书。

```bash
$ step ssh inspect emergency-cert.pub

emergency-cert.pub
        Type: ecdsa-sha2-nistp256-cert-v01@openssh.com user certificate
        Public key: ECDSA-CERT SHA256:EJSfzfQv1UK44/LOKhBbuh5oRMqxXGBSr+UAzA7cork
        Signing CA: SK-ECDSA SHA256:kLJ7xfTTPQN0G/IF2cq5TB3EitaV4k3XczcBZcLPQ0E
        Key ID: "test-key"
        Serial: 0
        Valid: from 2020-06-24T16:53:03 to 2020-06-24T16:03:03
        Principals:
                ubuntu
        Critical Options: (none)
        Extensions:
                permit-X11-forwarding
                permit-agent-forwarding
                permit-port-forwarding
                permit-pty
                permit-user-rc
```

上面例子中，公钥是emergencey您创建的密钥，签名CA是`sk-user-ca`。

创建客户端公钥。

```bash
$ ssh-keygen -s ca_user_key -I user_name -Z user_name -V -start:+end id_rsa.pub
```

生成的证书是`id_rsa-cert.pub`。`-Z`参数用于将用户名添加到证书中。下面是它的使用格式。

```bash
-Z "name1[,name2,...]"
```

客户端的`~/.ssh/authorized_keys`文件添加 CA 的公钥。

```bash
# vi ~/.ssh/authorized_keys
# A CA key, accepted for any host in *.example.com
@cert-authority principals="name1,name2" *.example.com ssh-rsa AAAAB5Wm.
```

现在尝试登录。

```bash
$ ssh -i emergency ubuntu@my-hostname
ubuntu@my-hostname:~$
```

### 服务器添加证书

将 CA 的用户证书签署公钥，发到服务器。

```bash
$ scp ~/.ssh/ca_user_key.pub root@host_name.example.com:/etc/ssh/
```

服务器 SSHD 的配置文件`/etc/ssh/sshd_config`加上 CA 证书的公钥，表示信任这个 CA。

```bash
TrustedUserCAKeys /etc/ssh/ca_user_key.pub
```

然后将生成的证书公钥`sk-user-ca.pub`，加到`/etc/ssh/sshd_config`文件里面。

在每个主机上，编辑`/etc/ssh/sshd_config`，指定用于验证用户证书的 CA 公钥，主机的私钥和主机的证书：

```bash
# Path to the CA public key for verifying user certificates
TrustedUserCAKeys /etc/ssh/ssh_user_key.pub

# Path to this host's private key and certificate
HostKey /etc/ssh/ssh_host_ecdsa_key
HostCertificate /etc/ssh/ssh_host_ecdsa_key-cert.pub
```

重新启动 SSHD 服务器。

```bash
$ sudo systemctl sshd restart
# 或者
$ sudo service sshd restart
```

CA 服务器证书的公钥内容。

```bash
$ cat ~/.ssh/ca_host_key.pub
ssh-rsa  AAAAB5Wm.== root@ca-server.example.com
```

在每个客户端的`~/.ssh/known_hosts`，添加一行以指定用于验证主机证书的 CA 公钥。CA 签署服务器证书的公钥`ca_host_key.pub`

```bash
@cert-authority *.example.com ecdsa-sha2-nistp256 AAAAE...=
```

```bash
# vi /etc/ssh/ssh_known_hosts
# A CA key, accepted for any host in *.example.com
@cert-authority *.example.com ssh-rsa AAAAB5Wm.
```

`ssh-rsa AAAAB5Wm.`是`ca_host_key.pub`文件的内容。

生成本机的密钥

```bash
$ ssh-keygen -t ecdsa -f emergency
```

对于远程用户认证，CA密钥可以每用户为可信的被标记~/.ssh/authorized_keys使用文件cert-authority指令或全球使用由所述的装置TrustedUserCAKeys中指令/etc/ssh/sshd_config的文件。对于远程主机身份验证，CA密钥可以在/etc/ssh/known_hosts文件中全局标记为受信任，也可以在文件中按用户标识~/.ssh/ssh_known_hosts。


## 参考链接

- [SSH Emergency Access](https://smallstep.com/blog/ssh-emergency-access/), Carl Tashian
- [Using OpenSSH Certificate Authentication](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/deployment_guide/sec-using_openssh_certificate_authentication), Red Hat Enterprise Linux Deployment Guide
- [How to SSH Properly](https://gravitational.com/blog/how-to-ssh-properly/), Gus Luxton

