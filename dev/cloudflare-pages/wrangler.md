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

## 登录 cloudflare 账户

```bash
$ wrangler login 
```

## 创建 worker 项目

```bash
$ npx wrangler generate <NEW_PROJECT_NAME> <GITHUB_REPO_URL>
```

- new-project-name：要创建的项目目录名
- github-repo-url：用作模板的 GitHub 仓库，参考[该地址](https://github.com/cloudflare/workers-sdk/tree/main/templates)。

## 测试 Worker

下面命令可以当前目录的 worker 脚本，起一个服务。

```bash
$ npx wrangler dev
```

运行上面命令以后，就可以去`http://localhost:8787`访问本地服务。

## 部署 worker

将当前脚本部署到 Cloudflare。

```bash
$ npx wrangler deploy
```

你的 woker 就会部署到如下域名`<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`。

## 测试

端对端测试，使用 Wrangler 的 unstable_dev API。

```bash
const { unstable_dev } = require("wrangler");

describe("Worker", () => {
  let worker;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.js", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("should return Hello World", async () => {
    const resp = await worker.fetch();
    if (resp) {
      const text = await resp.text();
      expect(text).toMatchInlineSnapshot(`"Hello World!"`);
    }
  });
});
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