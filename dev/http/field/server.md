# Server 字段

Server 只用于服务器的回应。它告知客户端当前服务器上安装的 HTTP 服务器应用程序的信息。不单单会标出服务器上的软件应用名称，还有可能包括版本号和安装时启用的可选项。

```http
# 例一
Server: Apache/2.2.17 (Unix)

# 例二
Server: Apache/2.2.6 (Unix) PHP/5.2.5
```