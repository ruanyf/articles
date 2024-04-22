# GitHub Oauth Login

## 简介

第一步：应用将用户导向 GitHub 登陆页，带上 client_id 和 state 参数。

```
https://github.com/login/oauth/authorize?
  client_id=${client_id}&
  response_type=code&
  scope=repo&
  redirect_uri=${window.location.origin}/integrations/github/oauth2/callback&
  state=${state}
```

第二步：用户确认身份后，GitHub 将用户导回应用，带上 code 和 state 参数。

第三步：应用服务器向 GitHub 申请 access_token，带上 code 、client_id、client_secret 参数。

第四步：GitHub 返回 access_token。

第五步：应用服务器拿到 access_token 后，向 GitHub API 申请数据。

```
Authorization: {access_token}
```

-- [参考链接](https://medium.com/@tony.infisical/guide-to-using-oauth-2-0-to-access-github-api-818383862591)

- [cloudflare-worker-github-oauth-login](https://github.com/gr2m/cloudflare-worker-github-oauth-login)

- [SSO JWT](https://github.com/Aralink/ssojwt)