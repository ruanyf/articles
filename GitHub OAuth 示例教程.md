# GitHub OAuth 示例教程

这组 OAuth 系列教程，第一篇介绍了基本概念，第二篇介绍了它的四种方式，今天演示如何通过 OAuth 获取真实数据。

现在，很多网站登录时，允许使用外部网站的身份。

![](https://d13njzr7tvlzz9.cloudfront.net/wp-content/uploads/2015/04/social-login-signup.png)

这里的实现方式，就可以是 OAuth。下面以 GitHub 为例，写一个最简单的应用，演示如何获取用户资料。

首先，你的应用必须去 GitHub 登记一下。访问这个[网址](https://github.com/settings/applications/new)，填写表单。

应用的名称可以随便起，主页 URL 填写 http://localhost:8080，授权后的跳转网址填写 [http://localhost:8080/oauth/redirect](http://localhost:8080/oauth/redirect)。然后，提交表单，GitHub 应该会返回客户端 ID（client ID）和客户端密钥（client secret）。
