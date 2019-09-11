# GitHub Actions 入门教程

[GitHub Actions](https://github.com/features/actions) 于2018年10月[推出](https://github.blog/changelog/2018-10-16-github-actions-limited-beta/)，使得 GitHub 在代码托管之外，还具有了[持续集成](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)的功能。

我这几天一直在试用，觉得这个功能非常强大，与其他持续集成服务（比如 [Travis CI](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)）有所不同，玩法更多。

本文不是完整的教程，只是一个简单的演示，通过 GitHub Actions 将一个 React 应用发布到 [GitHub Pages](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)，大家可以看看怎么使用这个服务。

## 一、GitHub Actions 是什么？

大家知道，持续集成由很多操作组成，比如抓取代码、运行测试、登录远程服务器，发布到第三方服务等等。GitHub 把这些操作就称为 Actions。

很多操作在不同项目里面是类似的，完全可以共享。GitHub 注意到了这一点，想出了一个很秒的点子。它允许开发者把每个操作写成单独的脚本文件，存放到代码仓库，使得其他开发者可以引用。

如果你需要某个 action，不必自己写复杂的脚本，直接引用他人写好的 action 即可，整个持续集成过程，就变成了一个 actions 的组合。这就是 GitHub Actions 最特别的地方。

GitHub 做了一个[官方市场](https://github.com/marketplace?type=actions)，可以搜索到他人提交的actions。另外，还有一个 [awesome actions](https://github.com/sdras/awesome-actions) 的仓库，也可以找到不少 action。

![](https://www.wangbase.com/blogimg/asset/201909/bg2019091105.jpg)

本质上，actions 就是一个普通的代码仓库，因此可以使用`userName/repoName`的语法引用 action。比如，`actions/setup-node`就表示`github.com/actions/setup-node`这个[仓库](https://github.com/actions/setup-node)。事实上，GitHub 官方的 actions 都放在 [github.com/actions](https://github.com/actions) 里面。

既然 actions 是代码仓库，当然就有版本的概念，可以引用某个具体版本的 action。下面都是合法的 action 引用，用的就是 Git 的指针概念，详见[官方文档](https://help.github.com/en/articles/about-actions#versioning-your-action)。

```bash
actions/setup-node@74bc508 # 指向一个 commit
actions/setup-node@v1.0    # 指向一个标签
actions/setup-node@master  # 指向一个分支
```

## 二、基本概念

GitHub Actions 有一些自己的术语。

（1）**workflow** （工作流程）：持续集成一次运行的过程，就是一个 workflow。

（2）**job** （任务）：每个 workflow 由一个或多个 jobs 构成，它的含义是，一次持续集成的运行可以完成多个任务。

（3）**step**（步骤）：每个 job 由多个 step 构成。

（4）**action** （动作）：每个 step 可以依次执行多个 action。

## 三、workflow 文件

GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库的`.github/workflows`目录中。

workflow 文件采用 [YAML 格式](http://www.ruanyifeng.com/blog/2016/07/yaml.html)，文件名可以任意取，但是后缀名统一为`.yml`，比如`foo.yml`。一个库可以有多个 workflow 文件。GitHub 只要发现`.github/workflows`目录里面有`.yml`文件，就会运行 actions。

workflow 的字段非常多，详见[官方文档](https://help.github.com/en/articles/workflow-syntax-for-github-actions)。下面是一些主要字段。

**（1）`name`**

这个字段是 workflow 的名称。如果省略该字段，默认为当前 workflow  的文件名。

```bash
name: GitHub Actions Demo
```

**（2）`on`**

`on`字段指定触发当前 workflow 的条件，通常是某些事件。

```bash
on: push
```

上面代码指定，`push`事件时触发 workflow。

`on`字段也可以是事件的数组。

```bash
on: [push, pull_request]
```

上面代码指定，`push`事件或`pull_request`事件都可以触发 workflow。

完整的事件列表，查看[官方文档](https://help.github.com/en/articles/events-that-trigger-workflows)。除了代码库事件，GitHub Actions 也支持外部事件触发，也可以按指定时间运行。


**（3）`on.<push|pull_request>.<tags|branches>`**

指定`push`和`pull_request`事件时，可以同时限定在某个分支或标签上触发。

```bash
on:
  push:
    branches:    
      - master
```

上面代码指定`master`分支发生`push`事件时，才会触发。

**（4）`jobs.<job_id>.name`**

workflow 文件的主体是`jobs`字段，表示要执行的一项或多项任务。

`jobs`字段里面，可以自己指定每一项任务的`job_id`。每个`job_id`里面的`name`，是任务的说明。

```yaml
jobs:
  my_first_job:
    name: My first job
  my_second_job:
    name: My second job
```

上面代码的`jobs`字段包含两项任务，`job_id`分别是`my_first_job`和`my_second_job`。

**（5）`jobs.<job_id>.needs`**

`needs`字段指定当前任务的依赖关系，即运行顺序。

```yaml
jobs:
  job1:
  job2:
    needs: job1
  job3:
    needs: [job1, job2]
```

上面代码中，`job1`必须在`job2`开始之前成功完成，而`job3`等待`job1`和`job2`都完成后，才能运行。任务的运行顺序依次为：`job1`、`job2`、`job3`。

**（6）`jobs.<job_id>.runs-on`**

`runs-on`字段指定运行所需要的虚拟机环境。它是必填字段。目前可用的虚拟机如下。

> -   `ubuntu-latest`，`ubuntu-18.04`或`ubuntu-16.04`
> -   `windows-latest`，`windows-2019`或`windows-2016`
> -   `macOS-latest`或`macOS-10.14`

下面代码指定虚拟机环境为`ubuntu-18.04`。

```yaml
runs-on: ubuntu-18.04
```

**（7）`jobs.<job_id>.steps`**

`steps`字段指定每个 Job 的运行步骤，可以有一个或多个步骤。

每个步骤都可以指定以下三个字段。

> - `jobs.<job_id>.steps.name`：当前步骤的名称。
> - `jobs.<job_id>.steps.run`：当前步骤运行的命令或者 action。
> - `jobs.<job_id>.steps.env`：当前步骤所需的环境变量。

下面是一个完整的 workflow 文件的范例。

```yaml
name: Greeting from Mona
on: push

jobs:
  my-job:
    name: My Job
    runs-on: ubuntu-latest
    steps:
    - name: Print a greeting
      env:
        MY_VAR: Hi there! My name is
        FIRST_NAME: Mona
        MIDDLE_NAME: The
        LAST_NAME: Octocat
      run: |
        echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.
```

上面代码中，`steps`字段只包括一个步骤。该步骤先注入四个环境变量，然后执行一条 Bash 命令。

## 四、实例：React 项目发布到 GitHub Pages

下面是一个实例，通过 GitHub Actions 将一个 React 项目构建后发到 GitHub Pages。演示代码都在[这个仓库](https://github.com/ruanyf/github-actions-demo)里面，发布后的示例网址为[ruanyf.github.io/github-actions-demo](https://ruanyf.github.io/github-actions-demo)。

首先，GitHub Actions 目前还处在测试阶段，需要到[这个网址](https://github.com/features/actions/signup/)申请测试资格。申请以后，可能需要几天才能通过。据说，2019年11月就会默认打开。

获得资格后，仓库顶部的菜单会出现`Actions`一项。

![](https://www.wangbase.com/blogimg/asset/201909/bg2019091106.jpg)

第二步，这个示例需要将构建成果发到 GitHub 仓库，因此需要 GitHub 密钥。按照[官方文档](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)，生成一个密钥。然后，将这个密钥储存到当前仓库的`Settings/Secrets`里面。

![](https://www.wangbase.com/blogimg/asset/201909/bg2019091107.jpg)

这是储存秘密的环境变量的地方。每个变量的名字可以随便起，这里用的是`ACCESS_TOKEN`。

第三步，本地计算机使用[`create-react-app`](https://github.com/facebook/create-react-app)，生成一个标准的 React 应用。

```bash
$ npx create-react-app github-actions-demo
$ cd github-actions-demo
```

第四步，在这个仓库的`.github/workflows`目录，生成一个 workflow 文件，名字可以随便取，这个示例是`ci.yml`。

我们选用一个别人已经写好的 action：[JamesIves/github-pages-deploy-action](https://github.com/marketplace/actions/deploy-to-github-pages)，它提供了范例的 workflow 文件，直接拷贝过来就行了（查看[源码](https://github.com/ruanyf/github-actions-demo/blob/master/.github/workflows/ci.yml)）。

```yaml
name: GitHub Actions Build and Deploy Demo
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: Build and Deploy
      uses: JamesIves/github-pages-deploy-action@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        BRANCH: gh-pages
        FOLDER: build
        BUILD_SCRIPT: npm install && npm run build
```

上面代码有几点需要注意。

> 1. 整个流程在`master`分支发生`push`事件时触发。
> 1. 只有一个`job`，运行在虚拟机环境`ubuntu-latest`。
> 1. 第一步是获取源码，使用的 action 是`actions/checkout`。
> 1. 第二步是构建和部署，使用的 action 是`JamesIves/github-pages-deploy-action`。
> 1. 第二步需要四个环境变量，分别指定 GitHub 密钥、发布分支、构建成果所在目录、构建脚本。其中，密钥是秘密变量，需要写在双括号里面。

第五步，保存上面的文件后，将整个仓库推送到 GitHub。

GitHub 发现了这个仓库的 workflow 文件以后，就会自动运行。你可以在网站上实时查看[构建日志](https://github.com/ruanyf/github-actions-demo/commit/24fbf6a875351297f31434fd44bc3146accf9e59/checks)，日志默认保存30天。

![](https://www.wangbase.com/blogimg/asset/201909/bg2019091108.jpg)

等到 workflow 运行结束，访问 [GitHub Page](https://ruanyf.github.io/github-actions-demo/)，会看到构建成果已经发上网了。

![](https://www.wangbase.com/blogimg/asset/201909/bg2019091109.jpg)

以后，每次修改后推送源码，GitHub Actions 都会自动运行，将最新修改构建发送网。

## 五、参考链接

- [GitHub Pages 官方文档](https://help.github.com/en/categories/automating-your-workflow-with-github-actions)
- [Github Actions for web apps](https://lukeboyle.com/blog-posts/2019/08/github-actions-for-web-apps/), Luke Boyle
- [My First Week With GitHub Actions](https://medium.com/@adam.zolyak/my-first-week-with-github-actions-5d92de4c4851), Adam Zolyak

（完）
