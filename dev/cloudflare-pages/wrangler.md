# 本地开发工具 wrangler

wrangler 是用于 Cloudflare Pages 本地开发的命令行工具。

## 安装

它的安装命令如下。

```bash
$ npm install wrangler --save-dev
```

安装完成后，查看一下它的版本。

```bash
# 或者 wrangler version
$ wrangler --version
```

## 用法

在你的项目中运行 Pages 的 Web 服务。

```bash
$ npx wrangler pages dev <静态资源目录>
```

它会在8788（`http://localhost:8788`）端口起一个 Web 服务器。

如果你的框架有自己的启动命令，则 wrangler 使用下面的形式调用。

```bash
$ npx wrangler pages dev -- <COMMAND>
```

上面的命令会同时起两个服务，一个是你的框架的服务，另一个是 Wrangler 的服务。

如果需要 HTTPs，就要使用`--local-protocol=https`参数。

```bash
$ npx wrangler pages dev --local-protocol=https <DIRECTORY-OF-ASSETS>
```

如果与框架配合使用，则需要指定 Node.js 证书路径，使用环境变量`NODE_EXTRA_CA_CERTS`。

```bash
$ NODE_EXTRA_CA_CERTS=<PATH_TO_CERTIFICATE> npx wrangler pages dev --local-protocol=https -- <COMMAND>
```