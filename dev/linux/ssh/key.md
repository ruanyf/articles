# SSH 密钥登录

ssh 默认采用密码登录，这种方法有很多缺点，简单的密码不安全，复杂的密码不容易记忆，每次手动输入也很麻烦。密钥登录是更好的解决方案。

## 密钥是什么

密钥（key）是一个特别大的质数。对称加密只需要一个密钥，非对称加密需要两个密钥成对使用，分为公钥（public key）和私钥（private key）。

ssh 密钥登录采用的就是非对称加密，每个用户都使用自己的密钥登录。其中，私钥必须私密保存，不能泄漏；公钥则是公开的，可以对外发送。它们的关系是，公钥和私钥是一一对应的，每一个私钥都有且仅有一个对应的公钥，反之亦然。

如果数据使用公钥加密，那么只有使用对应的私钥才能解密，其他密钥都不行；反过来，如果使用私钥加密（这个过程一般称为“签名”），也只有使用对应的公钥解密。

## 密钥登录的过程

SSH 密钥登录分为以下的步骤，整个流程是自动的。

第一步，将你的公钥放入远程服务器的指定位置。

第二步，服务器收到用户 SSH 登录的请求，发送一些随机数据给用户，要求用户证明自己的身份。

第三步，客户端收到服务器发来的数据，使用私钥对数据进行签名，然后再发还给服务器。

第四步，服务器收到客户端发来的加密签名后，使用对应的公钥解密，然后跟原始数据比较。如果一致，就允许用户登录。

## `ssh-key`命令：生成密钥

`ssh-keygen`命令用来生成密钥（公钥和私钥）。

`-t`参数用来指定密钥的加密算法，一般会选择`dsa`算法或`rsa`算法。注意，这个参数没有默认值。

```bash
$ ssh-keygen -t dsa
Generating public/private dsa key pair.
Enter file in which to save the key (/home/username/.ssh/id_dsa):  press ENTER
Enter passphrase (empty for no passphrase): ********
Enter same passphrase again: ********
Your identification has been saved in /home/username/.ssh/id_dsa.
Your public key has been saved in /home/username/.ssh/id_dsa.pub.
The key fingerprint is:
14:ba:06:98:a8:98:ad:27:b5:ce:55:85:ec:64:37:19 username@shell.isp.com
```

上面例子中，指定使用`dsa`加密算法生成密钥。执行`ssh-keygen`命令以后，会让用户输入密钥的保存位置。如果直接按回车键，密钥就会保存成`~/.ssh/id_dsa`文件，这个是私钥，同时还会生成对应的公钥文件`~/.ssh/id_dsa.pub`。用户的密钥一般都放在主目录的`.ssh`目录里面。

如果选择`rsa`算法，生成的密钥文件默认就会是`~/.ssh/id_rsa`（私钥）和`~/.ssh/id_rsa.pub`。

接着，软件会询问你，是否要为私钥文件设定密码保护（passphrase）。这样的话，即使入侵者拿到私钥，还是需要破解密码。如果为了方便，不想设定密码保护，可以直接按回车键，密码就会为空。软件还会让你再输入一次密码，两次输入必须一致。这里“密码”的英文单词是 passphrase，这是为了避免与 Linux 账户的密码单词 password 混淆。

最后，就会生成私钥和公钥，屏幕上还会列出公钥的指纹，以及对应的用户名和主机名作为注释。

公钥文件和私钥文件都是文本文件，可以用文本编辑器看一下它们的内容。公钥文件的内容类似下面这样。

```bash
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEAvpB4lUbAaEbh9u6HLig7amsfywD4fqSZq2ikACIUBn3GyRPfeF93l/
weQh702ofXbDydZAKMcDvBJqRhUotQUwqV6HJxqoqPDlPGUUyo8RDIkLUIPRyq
ypZxmK9aCXokFiHoGCXfQ9imUP/w/jfqb9ByDtG97tUJF6nFMP5WzhM= smith@client.net
```

注意，公钥只有一行。因为它太长了，所以上面分成三行显示。

下面的命令可以列出用户所有的公钥。

```bash
$ ls -l ~/.ssh/id_*.pub
```

`ssh-keygen`命令除了`-t`，还有以下的配置项。

**（1）`-b`**

`-b`参数指定密钥的二进制位数。这个参数值越大，密钥就越不容易破解，但是加密解密的计算开销也会加大。

一般来说，`-b`至少应该是`1024`，更安全一些可以设为`2048`或者更高。

**（2）`-C`**

`-C`参数可以为密钥文件指定新的注释，格式为`username@host`。

下面命令生成一个4096位 RSA 加密算法的密钥对，并且给出了用户名和主机名。

```bash
$ ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"
```

**（3）`-N`**

`-N`参数用于指定私钥的密钥（passphrase）。

```bash
$ ssh-keygen -t dsa -N secretword
```

**（4）`-p`**

`-p`参数用于重新指定私钥的密码（passphrase）。

**（5）`-f`**

`-f`参数指定生成的私钥文件。

```bash
$ ssh-keygen -t dsa -f mykey
```

上面命令会在当前目录生成私钥文件`mykey`和公钥文件`mykey.pub`。

## 手动上传公钥

公钥必须上传到服务器，才能使用公钥登录。

OpenSSH 规定，用户公钥保存在服务器的`~/.ssh/authorized_keys`文件。你要登录到服务器的哪个用户，就保存在该用户的主目录中。只要把公钥添加到这个文件之中，就相当于公钥上传到服务器了。每个公钥占据一行。如果该文件不存在，可以手动创建。

用户可以手动编辑该文件，把公钥粘贴进去，也可以执行下面的命令。

```bash
$ cat ~/.ssh/id_rsa.pub | ssh user@host "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

注意，`authorized_keys`文件的权限要设为`644`，即只有文件所有者才能写。如果权限设置不对，SSH 服务器可能会拒绝读取该文件。

```bash
$ chmod 755 ~/.ssh
$ chmod 644 ~/.ssh/authorized_keys
```

只要公钥上传到服务器，下次登录时，OpenSSH 就会自动采用密钥登录，不再提示输入密码。

```bash
$ ssh -l username shell.isp.com
Enter passphrase for key '/home/you/.ssh/id_dsa': ************
Last login: Mon Mar 24 02:17:27 2014 from ex.ample.com
shell.isp.com>
```

上面例子中，SSH 客户端使用私钥之前，会要求用户输入密码（passphrase），用来解开私钥。

## ssh-copy-id 命令：自动上传公钥

OpenSSH 自带一个`ssh-copy-id`命令，可以自动将公钥拷贝到远程服务器的`~/.ssh/authorized_keys`文件。如果`~/.ssh/authorized_keys`文件不存在，`ssh-copy-id`会自动创建该文件。

```bash
$ ssh-copy-id -i key_file user@host
```

上面命令中，`-i`参数用来指定公钥文件。如果省略用户名，默认为当前的本机用户名。执行完以后，公钥就会拷贝到服务器。

注意，公钥文件可以不指定路径和`.pub`后缀名，`ssh-copy-id`会自动在`~/.ssh`目录里面寻找。

```bash
$ ssh-copy-id -i id_rsa user@host
```

上面命令中，公钥文件会自动匹配到`~/.ssh/id_rsa.pub`。

`ssh-copy-id`会采用密码登录，系统会提示输入远程服务器的密码。

注意，`ssh-copy-id`是直接将公钥添加到`authorized_keys`文件的末尾。如果`authorized_keys`文件的末尾不是一个换行符，会导致新的公钥添加到前一个公钥的末尾，两个公钥连在一起，使得它们都无法生效。所以，如果`authorized_keys`文件已经存在，使用`ssh-copy-id`命令之前，务必保证`authorized_keys`文件的末尾是换行符（假设该文件已经存在）。

## ssh-agent 命令，ssh-add 命令

### 基本用法

私钥设置了密码以后，每次使用都必须输入密码，有时让人感觉非常麻烦，尤其是连续使用`scp`命令远程拷贝文件的情况。`ssh-agent`命令就是为了解决这个问题而设计的，它让用户在整个 Bash 对话（session）之中，只在第一次使用 SSH 命令时输入密码，然后将私钥保存在内存中，后面都不需要再输入私钥的密码了。

首先，使用下面的命令新建一次命令行对话。

```bash
$ ssh-agent bash
```

上面命令中，如果你使用的命令行环境不是 Bash，可以用其他的 Shell 命令代替。比如`zsh`和`fish`。

如果想在当前对话启用`ssh-agent`，可以使用下面的命令。

```bash
$ eval `ssh-agent`
```

上面命令中，`ssh-agent`会自动在后台运行，并将需要设置的环境变量输出在屏幕上，类似下面这样。

```bash
$ ssh-agent
SSH_AUTH_SOCK=/tmp/ssh-barrett/ssh-22841-agent; export SSH_AUTH_SOCK;
SSH_AGENT_PID=22842; export SSH_AGENT_PID;
echo Agent pid 22842;
```

`eval`命令的作用，就是运行`ssh-agent`命令的输出，设置环境变量。

然后，在新建的对话里面，使用`ssh-add`命令添加默认的私钥（`~/.ssh/id_rsa`，`~/.ssh/id_dsa`，`~/.ssh/id_ecdsa`，`~/.ssh/id_ed25519`）。

```bash
$ ssh-add
Enter passphrase for /home/you/.ssh/id_dsa: ********
Identity added: /home/you/.ssh/id_dsa (/home/you/.ssh/id_dsa)
```

上面例子中，添加私钥时，会要求输入密码。以后，在这个对话里面再使用密钥时，就不需要输入私钥的密码了。

如果`ssh-agent`命令要退出，可以直接退出子 Shell，也可以使用下面的命令。

```bash
$ ssh-agent -k
```

### `ssh-add`命令

`ssh-add`命令也可以用来将指定的私钥，加入`ssh-agent`。

```bash
$ ssh-add my-other-key-file
```

上面的命令中，`my-other-key-file`就是用户指定的私钥文件。

`ssh-add`命令有如下的参数。

（1）`-d`

`-d`参数从内存中删除指定的私钥。

```bash
$ ssh-add -d name-of-key-file
```

（2）`-l`

`-l`参数列出所有已经添加的私钥。

```bash
$ ssh-add -l
```

（3）`-D`

`-D`参数从内存中删除已经添加的私钥。

```bash
$ ssh-add -D
```

## 关闭密码登录

为了安全性，启用密钥登录之后，最好关闭服务器的密码登录。

对于 OpenSSH，具体方法就是打开服务器 sshd 的配置文件`/etc/ssh/sshd_config`，将`PasswordAuthentication`这一项设为`no`。

```bash
PasswordAuthentication no
```

修改配置文件以后，不要忘了重新启动 sshd，否则不会生效。

