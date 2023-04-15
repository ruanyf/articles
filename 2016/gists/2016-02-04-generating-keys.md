# 如何生成密钥

## OpenSSH

```bash
# 运行后，要求用户提供密钥文件名
# 然后在当前目录生成两个密钥文件
# id_rsa: 私钥文件
# id_rsa.pub: 公钥文件
$ ssh-keygen -t rsa -b 4096 -C "your.email@service.com"
```

## OpenSSL

```bash
# 首先，生成私钥，然后生成公钥
$ openssl genrsa -out private_key.pem 4096
$ openssl rsa -pubout -in private_key.pem -out public_key.pem
```

## GPG

```bash
$ gpg --gen-key
```

