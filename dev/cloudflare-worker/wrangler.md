# wrangler 工具软件

wrangler 是一个命令行工具，用于在本地开发 Cloudflare worker 应用。

## 安装

首先，全局安装 wrangler。

```bash
$ npm install -g wrangler
```

安装完成后，检查一下版本。

```bash
$ npx wrangler --version
```

然后，通过 wrangler 登录 Cloudflare。

```bash
$ wrangler login
```

## 新建项目

通过`npm create`命令，根据项目模板建立自己的项目。

```bash
$ npm create cloudflare@latest -- --template <SOURCE>
```

wrangler 现有的模板，参见网址 https://github.com/cloudflare/workers-sdk/tree/main/templates。

最简的项目可以用模板`woker`。

```bash
$ npm create cloudflare@latest -- --template cloudflare/workers-sdk/templates/worker
```

新建项目的过程中，会询问项目名，然后将这个名字做目录名。

新建项目目录后，还会自动安装项目依赖。

如果项目需要路由，可以用模板`worker-router`。

```bash
$ npm create cloudflare@latest -- --template cloudflare/workers-sdk/templates/worker
```

## 项目开发

项目新建完成后，可以进入项目目录，使用`npx wrangler dev`命令在本地运行一下，查看效果。

```bash
$ npx wrangler dev
```

开发完成后，可以使用 wrangler 将项目部署到 cloudflare 上面。

```bash
$ npx wrangler deploy
```

然后，就可以在`<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`上预览项目。

---

建立一个项目目录，然后进入该目录。

```bash
$ npm install wrangler --save-dev
```



启动本地服务器

```bash
$ npx wrangler dev
# 或者
$ npx wrangler version
# 或者
$ npx wrangler -v
```

更新

```bash
$ npm install wrangler@latest
```

启动服务器

```bash
$ npx wrangler dev
```

使用远程资源

```bash
$ npx wrangler dev --remote
```


## 添加环境变量

环境变量添加在`wrangler.toml`文件的`[vars]`部分。

```ini
name = "my-worker-dev"

[vars]
API_HOST = "example.com"
API_ACCOUNT_ID = "example_user"
SERVICE_X_DATA = { URL = "service-x-api.dev.example", MY_ID = 123 }
```

环境变量可以在 fetch 事件处理函数的`env`参数上读取。

```javascript
export default {
  async fetch(request, env, ctx) {
    return new Response(`API host: ${env.API_HOST}`);
  }
}
```

还可以为不同环境指定不同的环境变量。

```ini
name = "my-worker-dev"

[env.staging.vars]
API_HOST = "staging.example.com"
API_ACCOUNT_ID = "staging_example_user"
SERVICE_X_DATA = { URL = "service-x-api.dev.example", MY_ID = 123 }

[env.production.vars]
API_HOST = "production.example.com"
API_ACCOUNT_ID = "production_example_user"
SERVICE_X_DATA = { URL = "service-x-api.prod.example", MY_ID = 456 }
```

环境变量除了在`wrangler.toml`文件添加，还可以在 Cloudflare 官网后台添加。

## 秘密变量

开发时，秘密变量定义在项目根目录的`.dev.vars`文件，采用`KEY=VALUE`的形式。

```javascript
SECRET_KEY=valueAPI_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

上线时，采用`wrangler secret put`命令，写入秘密变量。`<KEY>`是键名，输入命令后会提示输入键值。

```bash
$ npx wrangler secret put <KEY>
```

除了命令行，也可以在后台管理面板输入秘密变量。

删除键值使用命令`wrangler secret delete`。

```bash
$ npx wrangler secret delete <KEY>
```

使用秘密变量的方法，与使用环境变量没有区别。