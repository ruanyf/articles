# 国产大模型动态：周更模型来了，Doubao Seed Evolving 与 DeepSeek V4 Flash 测评

## 一、

国产模型最近的热点，莫过于 Kimi K3。

它是7月17日发布，距今不过三周，好像还在眼前。但在 AI 的世界，其实已经过去了很久。

就在这段时间里面，又出现了很多新的国产模型。

- 7月31日，[DeepSeek V4 Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) 正式版发布。
- 7月31日，视频模型 [Seedance 2.5](https://seed.bytedance.com/en/seedance2_5) 发布。
- 8月3日，开源视频模型 [MiniMax H3](https://www.minimaxi.com/blog/minimax-h3) 发布。
- 豆包 Seed 大模型转为 [Seed Evolving](https://ark.volcengine.com/region:cn-beijing/promotion/model?agentMode=close&modelName=doubao-seed-evolving) 模型。

上面四个模型，都很有特点，值得大家深入了解。今天，我就来谈谈其中那两个通用模型—— DeepSeek V4 Flash 和 豆包 Seed Evolving。

尤其是[豆包 Seed Evolving](https://ark.volcengine.com/region:cn-beijing/promotion/model?agentMode=close&modelName=doubao-seed-evolving)，就我所知，它是**史上第一个周更的模型**。

## 二、

我们熟悉的大模型跟其他软件一样，都带有版本号，过一段时间发布一个新版本。

但是，还有另一种软件的发布方式“滚动发布”（rolling release），就是软件始终在不间断更新，任何时候安装，不用指定版本号，始终安装的是当天的最新版本，典型就是 Linux 的几个发行版。

“滚动发布”这种模式，其实很适合大模型。因为大多数用户其实不在意模型的版本，只想始终使用某个型号最新最强的版本。如果时不时就要手动更改模型 ID，就很烦人。

某些大公司的 Coding Plan，会提供一个特殊 ID，自动指向模型的最新版本。但是，就模型本身而言，我好像没听说哪个模型会自动更新，始终是最新版本。

豆包 Seed Evolving 恰恰就是这样的模型。它的前身是豆包 Seed 2.1 Pro 模型，就在上个月，他们突然改变做法，把名字改成 Evolving（意思是“进化”），不再发布版本号，而是以周为单位持续更新。

你调用这个模型，永远是最新版。官方的介绍是“一次接入，无感升级，零迁移成本”，再也不用手动更改版本号，模型本身“能力不断进化，体验不断升级”。

## 三、

再来说 DeepSeek V4 Flash。它跟豆包 Seed Evolving 一样是通用模型，能够完成各种类型的任务。

不同之处是，它不具备视觉能力，本身不能理解图像和视频，但是 Seed 模型具备视觉能力。

Deep V4 Flash 属于 V4 系列模型的一个轻量级版本，参数规模 284B，激活参数 13B。这种参数规模非常小（尤其是激活参数），意味着计算量不大，因此本地安装相对容易。

但是，以这种小规模参数而言，它的性能却非常强劲。它在4月发布过预览版，7月31日的正式版性能有了大幅提升。在 [Artificical Ananysis 网站](https://artificialanalysis.ai/#intelligence)上，它排名所有模型的第12位，与 GPT 5.6 Luna 和 Gemini 3.6 Flash 持平。

但是，它的[单任务成本](https://artificialanalysis.ai/#price-and-cost)是所有模型最低的，几乎是 Claude Fable 5 的1%。因此，**单单看这个榜单，DeepSeek V4 Flash 堪称目前“最强轻量级模型”**。

另一方面，豆包 Seed Evovling 是闭源模型，没有公开参数规模和架构。它是字节 Seed 团队的主力模型，也是豆包 App 背后的大模型，性能也非常强。

它作为通用模型，主打三大能力。首先，视觉能力不用说，这是它的强项，可以参考同家族 Seedance 模型的火爆。其次，Coding 能力，包括复杂仓库修复、跨文件修改、真实功能开发等等。最后，Agent 能力可以操作各种工具，检索信息。

DeepSeek V4 Flash 和豆包 Seed Evolving 都是 1M 的上下文窗口，有较强的长程任务能力，Token 效率高，运行成本低。

下面就来实际看一下，这两个模型的表现。

## 四、网页动画测试《愤怒的小鸟》

第一个测试，生成 2D 网页游戏[《愤怒的小鸟》](https://github.com/ruanyf/ai-test-case#Case03)。

豆包 Seed Evolving

DeepSeek V4 Flash

这两个实现都不错，可以正常游戏，没有逻辑性错误，就是具体细节的差异。我感觉，豆包 Seed Evolving 游戏行性好一些，DeepSeek V4 Flash 的用户界面更美观一点。

回想一年前，我测这个项目，那时的模型表现惨不忍睹，不是不可玩，就是界面丑陋。一次生成就 OK 的模型，寥寥无几，质量也不行。仅仅过了一年，情况就完全变了，现在这两个通用模型能有这样的表现，只能说进步神速，不敢想再过一年，大模型能发展成什么样。

## 五、3D 动画测试

先测一个比较简单的，要求在网页上生成一个[三维魔方](https://github.com/ruanyf/ai-test-case#case09)，使用动画形式，一步步展示自动打乱和还原魔方的过程。

豆包 Seed Evolving 

DeepSeek V4 Flash

两个魔方的实现效果都不错，相差不大，很难说哪个更好一点。只能说这种算法可视化的题目，对现在的大模型已经太简单了。

下面测一个更难的题目，要求生成一个 [Doom 式的迷宫场景](https://github.com/ruanyf/ai-test-case#case10)，有天花板、地板和砖墙，以第一人称视角，可以用 WASD 四个键上下左右移动。

Doubao Seed Evolving

DeepSeek V4 Flash

这两个实现都比较一般，生成的迷宫非常初级，天花板、地板、砖墙没有还原出来，跟我测过的一些顶级模型有差距，看来复杂的 3D 场景不是这两个通用模型的长处。

## 六、空间想象能力

我又让模型生成流行的“鹈鹕骑自行车”的画面，不过要求使用 GLSL 语言生成 3D 场景，考验模型的空间想象能力。

生成的代码放到 [shardtoy.com](https://www.shadertoy.com/) 进行在线编译就能看到渲染结果。

Doubao Seed Evolving

DeepSeek V4 Flash

Seed Evolving 的结果出乎意料得好，超过了我以前测的任何模型，包括 Fable 5。其实 DeepSeek V4 Flash 的结果也还可以，但比不上前者。

## 七、Agent 能力

我首先也测一下它们的 Agent 能力，也就是操作工具的能力。

我在网上找了一个 WordPress 的 [Demo 网站](https://www.softaculous.com/demos/WordPress)，你可以在上面试用 WordPress 的各种功能。

![](https://cdn.beekka.com/blogimg/asset/202608/bg2026080902.webp)

网页右上角有管理后台的用户名和密码。

![](https://cdn.beekka.com/blogimg/asset/202608/bg2026080903.webp)

我要求大模型根据网页提示，登陆管理后台，发布内容。我的提示词如下。

> 写一篇如何使用 WordPress 的介绍文章，然后访问后面的网址，根据页面的管理员用户名和密码，登录后台，将文章发布出来，并返回发布后的网址。https://www.softaculous.com/demos/WordPress

Doubao Seed Evolving



DeepSeek V4 Flash（[发布网址](https://demos2.softaculous.com/WordPressjm7tw1ooni/)）

![](https://cdn.beekka.com/blogimg/asset/202608/bg2026080904.webp)

![](https://cdn.beekka.com/blogimg/asset/202608/bg2026080905.webp)

## 模型简介

Coding 和 Agent能力 正在成为  语言模型的核心竞争力， 每一位开发者都渴望以最快速度，得到最新最强的模型。今天开始， 火山方舟还将为广发开发者提供一张"不断更新"的模型卡片：Doubao-Seed-Evolving。 

模型能力的发展速度不断加快， 大家也希望模型像产品一样快速迭代。Seed-Evolving就是这样一个模型。  我们会聚焦Coding和Agent场景，高频升级。 持续使用Seed-Evolving的开发者，将感受到肉眼可见的模型进步速度。 

Evolving模型特点
- 能力持续进化，体验不断升级：保持周级迭代节奏，持续开放最新模型能力，让每次更新都带来可感知的效果提升
- 聚焦 Coding & Agent 场景深度优化：围绕代码生成、工程开发、工具调用、任务规划与长程执行等真实场景持续优化
- 一次接入，无感升级，零迁移成本：使用统一 Model ID，新版本自动生效，无需切换 Model ID、迁移 Endpoint 或调整调用方式。

## 模型参数

https://ark.volcengine.com/region:cn-beijing/model/detail?name=doubao-seed-evolving

结尾引导到 https://ark.volcengine.com/region:cn-beijing/promotion/model?agentMode=close&modelName=doubao-seed-evolving

1M 上下文 
单月套餐 9.9元
- 长程任务能力增强：在持续时间更长、步骤更多、依赖关系更复杂的任务中表现更稳定，在开发者众测质量评分中超越 Doubao-Seed-2.1-pro
- Tokens 效率提升：对比 Doubao-Seed-2.1-pro 消耗 tokens 更少、工具调用轮次更简洁，整体效率更高
- 「体验奖励计划」现已开放，参与即享调用 成本立减20%！
- Coding 工程能力大幅提升
- Agent 检索能力显著增强
- 幻觉控制能力明显改善
