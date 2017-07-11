# git tag

`git tag`命令用于为 commit 打标签。Tag 分两种：普通tag和注解tag。只有annotated tag 才會產生 object。

```bash
$ git tag tmp # 生成.git/refs/tags/tmp
$ git tag -a release
$ git tag -a [VERSION] -m "released [VERSION]"
```

上面代码表示为当前commit打上一个带注解的标签，标签名为release。

普通标签的写法。

```bash
$ git tag 1.0.0
$ git push --tags

$ git tag v0.0.1
$ git push origin master --tags
```
