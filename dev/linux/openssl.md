# OpenSSL的用法

生成私钥

```bash
# 密钥位数 1024
# 对称加密算法 des3
# 生成的密钥文件 server.enc.key
$ openssl genrsa -des3 -out server.enc.key 1024
```

解除密钥的pass-phrase保护

```bash
$ openssl rsa -in server.enc.key -out server.key
```

生成证书

```bash
# 生成的证书文件 server.csr
$ openssl req -new -key server.enc.key -out server.csr
$ openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

# 另一个例子：生成自签名证书
$ openssl req -sha256 -new -key my-private-key.pem -out csr.pem
$ openssl x509 -req -days 365 -in csr.pem -signkey my-private-key.pem -out my-certificate.pem
```

## 验证证书

查看客户端证书。

```bash
$ openssl s_client -connect www.alipay.com:443 -showcerts
```

使用自定义证书连接。

```bash
openssl s_client \
  -connect my-fake-service.com:443 \
  -CAfile /Users/Integralist/.pki/custom-ca.pem \
  -cert /Users/Integralist/.pki/Certificate.pem \
  -key /Users/Integralist/.pki/Certificate.key \
  -showcerts
```

