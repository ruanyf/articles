# GitHub Actions 教程：定时发送天气邮件

2019年11月，GitHub 正式开放了 [GitHub Actions](https://github.com/features/actions) 这个功能，现在不用申请就能使用。

![](https://www.wangbase.com/blogimg/asset/201912/bg2019122208.jpg)

GitHub Actions 是一个 [CI/CD](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)（持续集成/持续部署）工具，但也可用作代码运行环境。功能非常强大，能够玩出许多花样。

我写的[《GitHub Actions 入门教程》](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html) 已经介绍了它的基本用法。本文紧接前一篇教程，给出一个简单实用的例子：每天定时运行一次脚本，获取天气预报，然后发送电子邮件。

完整代码可以从 GitHub 仓库 [ruanyf/weather-action](https://github.com/ruanyf/weather-action) 获取。

## 第一步：获取天气预报

网站 [wttr.in](http://wttr.in/) 支持命令行请求天气预报。

```bash
$ curl wttr.in
```

上面的命令会返回，你的 IP 地址所在位置的天气。

![](https://www.wangbase.com/blogimg/asset/201912/bg2019122118.jpg)

它还允许 URL 里面指定城市。

```bash
$ curl wttr.in/Shanghai
```

返回的数据可以通过[`curl`命令](https://www.ruanyifeng.com/blog/2019/09/curl-reference.html)的`-o`参数，保存成文件，以便后面发送。

```bash
$ curl -o result.html wttr.in/Shanghai
```

wttr. in 允许定制天气预报的格式和内容，详见[它的文档](https://github.com/chubin/wttr.in)，这里就不展开了。最后封装好的脚本`weather.sh`，完整代码看[这里](https://github.com/ruanyf/weather-action/blob/master/weather.sh)。

## 第二步：发送邮件

拿到天气预报以后，只要放在邮件里面，发出去就可以了。

我用的是网易 163 邮件的[免费发送服务](http://help.163.com/09/1223/14/5R7P3QI100753VB8.html)，需要在它的网站上开通，本地的配置请看下一步。

## 第三步：配置 GitHub Actions

触发 GitHub Actions  需要在项目仓库新建一个`.github/workflows`子目录，里面是 YAML 格式配置文件，文件名可以随便取。GitHub 只要发现配置文件，就会运行 Actions。

配置文件的第一部分是触发条件。

```bash
name: 'GitHub Actions Weather Bot'

on:
  push:
  schedule:
    - cron: '0 21 * * *'
```

上面代码中，`name`字段是配置文件的描述，`on`字段是触发条件。我们指定两种情况下触发，第一种是代码 Push 进仓库，第二种是[定时任务](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows#scheduled-events-schedule)，每天在国际标准时间21点（北京时间早上5点）运行。

接着，就是运行流程。

```bash
runs-on: ubuntu-latest
steps:
  - name: 'Checkout codes'
    uses: actions/checkout@v1
```

上面代码中，运行环境指定为最新版的 Ubuntu。流程的第一步是从代码仓库获取代码。

拿到代码以后，就可以获取天气预报了。

```bash
- name: 'Get weather report'
  run: bash ./weather.sh
```

上面代码中，`run`字段就是所要运行的命令。

最后，发送邮件。

```bash
- name: 'Send mail'
  uses: dawidd6/action-send-mail@master
  with:
    server_address: smtp.163.com
    server_port: 465
    username: ${{ secrets.MAIL_USERNAME }}
    password: ${{ secrets.MAIL_PASSWORD }}
    subject: Shanghai Weather Report
    body: file://result.html
    to: yifeng.ruan@gmail.com
    from: GitHub Actions
    content_type: text/html
```

上面代码中，发送邮件使用的是一个已经写好的 action，只要配几个参数就可以用。参数之中，邮件 SMTP 服务器的用户名和密码，使用的是加密变量，需要在项目的`settings/secrets`菜单里面设置。

完整的配置文件看[这里](https://github.com/ruanyf/weather-action/blob/master/.github/workflows/action.yml)。更具体的语法解释可以参考[《GitHub Actions 入门教程》](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)。

写好配置，推送到仓库以后，就可以每天清早收到一封天气预报邮件了。在这个基础上不难扩展，可以定时执行各种脚本（比如每5分钟检查一次某个网站是否在线），然后将结果发到指定的渠道，这里就有一个发到社交媒体 Telegram 的[例子](https://github.com/signalnerve/github-actions-weather-bot)。

（完）



