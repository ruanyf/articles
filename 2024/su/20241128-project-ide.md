# 无代码 AI 应用开发教程：工作流模式详解

## 一、引言

一个月前，我写了一篇[《AI 开发的捷径：工作流模式》](https://www.ruanyifeng.com/blog/2024/10/coze.html)，引起了很多读者的兴趣。

大家都觉得，AI 应用是开发者的机会，而**图形化、低代码/无代码、不需要编程基础的“工作流模式”**，正是 AI 应用开发的入门途径。

![](https://cdn.beekka.com/blogimg/asset/202412/bg2024120115.webp)

但是，我的那篇文章只介绍概念，没有操作步骤。我收到很多反馈，读者朋友实际动手时，遇到了困难，有些地方不理解，做不下去。

今天就是后续，我详细演示，一步步图解，**没有编程基础，如何搭建一个最简单的 AI 应用**。只要你跟着做，就能做出来。

## 二、开发工具

这篇教程使用的开发工具是[扣子（Coze）](https://www.coze.cn/)，所有操作都在它的浏览器 IDE（集成开发环境）中完成，

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024112706.webp)

选择扣子（Coze），主要原因有三个。

（1）它是国产的 AI 应用开发平台，字节跳动的产品，界面、文档、客服都是中文。

（2）它有无代码编辑器 Project IDE，包含组件拖拽的 UIBuilder，可以生成全功能的前端界面，上手门槛相对低。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113001.webp)

同时，它也提供后端数据库，可以数据读写。

（3）它可以免费使用（不超过使用额度），发布上线都不收费，适合新手练习。

## 三、示例项目

我们要做的示例项目，是一个最简单的 AI 应用“AI 文言文生成器”。

大家先看[最后成品](https://www.coze.cn/s/iD9phd7R/)，可以点进去试用。

![](https://cdn.beekka.com/blogimg/asset/202412/bg2024120114.webp)

输入一段汉语白话文，点击按钮，AI 就会自动生成文言文。

架构上，它非常简单：前端是一个网页表单，将用户的输入发送给后端的 AI 模型，并展示后端的返回结果。

**开发时，我们先让后端的 AI 模型跑起来，然后做一个网页，将它们连起来就可以了。**

扣子的方便之处在于，前后端的生成都可以图形化操作：后端是编排工作流的节点，前端是通过 UIBuilder 的界面拖拽组件生成。

下面就是开发步骤。为了保证大家跟得上，我会写得比较详细，看起来有点长，但是实际操作是很快的，熟练的话，10分钟就能从零到完成。

## 四、创建项目

第一步是开发的准备工作，先创建 AI 应用。

（1）访问[扣子官网](https://www.coze.cn/)，点击右上角的“基础版登录”。（基础版只比专业版少一些企业级功能，普通用户完全够用。）

![](https://cdn.beekka.com/blogimg/asset/202412/bg2024120116.webp)

（2）登录后的个人主页，点击左侧菜单的“工作空间”。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113003.webp)

工作空间里面，有“项目开发”和“资源库”两个页面。进入“项目开发”，可以看到你所有的项目。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113004.webp)

（3）点击右上角的“创建”按钮，会跳出一个弹框。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113005.webp)

上面有两个选项，“创建智能体”就是创建一个传统的 AI 聊天，“创建应用”则是创建一个自定义界面的 AI 应用。

（4）选择“创建应用”，这时会让你选择应用模版，点击“创建空白应用”。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113006.webp)

接着，输入项目的名称，这里是“AI 文言生成器”。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113007.webp)

至此，项目创建完成，系统会自动进入“AI 文言生成器”的应用主页（下图），正式的开发工作就要开始了。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113008.webp)

## 五、业务逻辑

应用主页的最上方，有“业务逻辑”和“用户界面”两个分页，默认是“业务逻辑”。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113009.webp)

这一节就讲解如何创建业务逻辑，也就是后端的 AI 模型。

我们采用工作流模式，即将业务逻辑编排成一个个节点。

（1）点击左侧菜单的“工作流”后面的“+”号，选择“新建工作流”。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113010.webp)

输入工作流的名称和描述。（注意，名称只能是英文字母、数字和下划线，本例是 classical_chinese_creator。）

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113011.webp)

（2）工作流创建成功后，名称会出现在左侧菜单的“工作流”标签下方。点击它，就会进入该工作流的“节点编排”画布。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113012.webp)

画布上，默认有“开始”和“结束”两个节点。

（3）点击下方的“添加节点”，添加一个新节点，类型设为“大模型”。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113013.webp)

然后，将这三个节点连起来。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113014.webp)

（4）配置“开始”节点。双击该节点，在配置框增加一个 content 变量，表示用户的输入内容。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113015.webp)

（5）配置“大模型”节点。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113016.webp)

模型：可以按自己需要选择，这里保持默认值。

输入：将原来的 input 参数改名为 content，并跟“开始节点”的 content 连接起来。

系统提示词：输入以下内容，用来设定大模型的行为。

```markdown
# 角色
你是一个专业的汉语文言文作者，能够准确地将用户输入的汉语白话文内容改写为文言文，不进行随意扩写。

## 技能
### 技能 1：文言文写作
1. 当用户提供一段汉语白话文时，迅速将其改写成文言文。
2. 确保改写后的文言文的准确性和完整性。

## 限制：
- 只进行文言文改写，不回答与文言文改写无关的问题。
- 严格按照用户提供的汉语白话文进行改写，不得擅自增加内容。
```

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113017.webp)

用户提示词：输入以下内容，作为给系统的直接命令。

```markdown
将用户输入的汉语白话文{{content}}改写成文言文。
```

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113018.webp)

上面文本中的`{{content}}`，表示插入输入参数 content 的内容。

输出：将输出格式改为“文本”。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113019.webp)

（6）配置“结束”节点。首先点击配置框上部的“返回文本”。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113020.webp)

输出变量：将 output 参数关联“大模型”节点的 output 参数。

回答内容：输入`{{output}}`（指代 output 变量的内容），并打开“流式输出”（即打字机效果）。

至此，整个工作流的搭建全部完成，可以单击画布右上角绿色的“试运行”按钮，测试工作流是否正常运行。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113021.webp)

在 content 参数，输入测试内容，比如“今天天气很好”。

然后，点击下方的运行按钮，就可以得到运行结果（今日，天善）。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113022.webp)

如果一切正常，就可以开始搭建用户界面。

## 六、用户界面的搭建：页面布局

（1）点击进入画布上方的“用户界面”分页。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113023.webp)

（2）在右侧菜单的组件面板，找到布局组件 > 容器组件，将其拖入中间的画布，作为页面的标题区域。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113024.webp)

系统自动将这个容器命名为 Div1，双击进行配置。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113026.webp)

尺寸：宽度为100%，高度为 60px。

布局：排列方向为“横向”。

样式：去除背景色，将边框设为灰色（#E2E8F0）。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113027.webp)

（3）在 Div1 下方，再拖入一个容器组件，系统自动命名为 Div2，用作功能区域。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113028.webp)

配置基本一样：尺寸部分，宽度和高度都设为填充容器；布局部分，排列方向为横向；样式部分，去除背景色。

（4）在 Div2 内部的左侧部分，拖入一个容器组件 Div3，用作用户输入区域。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113029.webp)

宽度设为50%，高度设为 550px，样式删除背景色。

（5）在 Div2 内部的右侧部分，拖入一个容器组件 Div4，用作展示结果区域。

宽度设为50%，高度设为 550px，样式删除背景色。

至此，页面布局如下图。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024113030.webp)

## 七、用户界面的搭建：页面细化

做好布局后，下一步完善页面细节。

（1）在 Div1 内部，拖入推荐组件 > 文本组件，作为标题文本。

![](https://cdn.beekka.com/blogimg/asset/202412/bg2024120102.webp)

标题内容设为“AI 文言文生成器”，字号改成24，字重为粗体。

![](https://cdn.beekka.com/blogimg/asset/202412/bg2024120101.webp)

（2）在 Div3 中拖入一个表单组件，删除不需要的元素，只剩下文本输入框和按钮。

![](https://cdn.beekka.com/blogimg/asset/202412/bg2024120103.webp)

表单组件：宽度和高度都设为填充容器，并删除边框。

文本输入框：拉伸高度，宽度设为填充容器，标签和占位文案设为“输入汉语白话文”。

按钮：文本改为“生成文言文”。

完成后的表单效果如下图。

![](https://cdn.beekka.com/blogimg/asset/202412/bg2024120104.webp)

（3）在 Div4 中拖入一个展示组件 > Markdown 组件，作为展示文言文区域。

![](https://cdn.beekka.com/blogimg/asset/202412/bg2024120105.webp)

删除 Markdown 组件的已有内容，改成“###### 生成结果”。高度和宽度改为填充容器，圆角设为10，内边距设为20，边框设为灰色（#CBD5E1）。

至此，页面细化完成，单击属性面板上方的预览，查看效果。

![](https://cdn.beekka.com/blogimg/asset/202412/bg2024120106.webp)

## 八、用户界面的搭建：配置事件

页面外观做完后，要配置事件，将后端的业务逻辑与用户界面联系起来。

（1）点击“生成文言文”按钮，在配置面板切换到“事件”，点击“新建”。

![](https://cdn.beekka.com/blogimg/asset/202412/bg2024120107.webp)

![](https://cdn.beekka.com/blogimg/asset/202412/bg2024120108.webp)

事件类型设为“点击时”，执行动作设为“调用 Workflow”，workflow 设为已经创建好的“classical_chinese_creator”，并将工作流的入参`content`设为文本输入框的值 {{ Textarea1.value }}。

（2）配置生成结果区域，展示工作流的返回结果。

选中 Markdown 组件，点击“内容”栏的扩展按钮。

![](https://cdn.beekka.com/blogimg/asset/202412/bg2024120109.webp)

扩展面板中，在`###### 生成结果`后面添加一行，插入工作流的返回结果` {{ classical_chinese_creator.data }}`。

![](https://cdn.beekka.com/blogimg/asset/202412/bg2024120110.webp)

完成所有配置后，单击右上角“预览”按钮，测试整体效果。

![](https://cdn.beekka.com/blogimg/asset/202412/bg2024120114.webp)

如果一切正常，这个 AI 应用就算开发完成了。

## 九、应用发布

开发完成后，就可以发布该应用，让其他人也可以使用。

点击右上角“发布”按钮，版本号设为 v0.0.1，发布平台设为发布到扣子商店。

![](https://cdn.beekka.com/blogimg/asset/202412/bg2024120113.webp)

至此大功告成，“[AI 文言生成器](https://www.coze.cn/s/iD9phd7R/)”就登录扣子商店，向世界公开了。

## 十、总结

大家可以根据这个示例，改变输入 AI 模型的提示，让它做不同的任务，就能变化出很多不同功能的应用。

比如，官方的“[AI 翻译](https://www.coze.cn/docs/guides/app_quickstart)”示例，就是让 AI 把用户输入的中文译成其他语言，跟“AI 文言文生成器”异曲同工。

除了文本生成，扣子还提供许多其他能力，比如抓取外部数据、数据库读写等，从而可以做出更强大的 AI 应用。

总之，**“工作流模式”使用图形化界面搭建一个 AI 应用，简单而便捷**，随时查看效果，一键发布，值得大家尝试。

（此处有分割线。）

最后是一个活动预告。

扣子邀请我，参加**12月19日在上海举行的“扣子开发者日”的线下活动**，也欢迎大家参加。

届时，字节的 AI 工程师会跟大家面对面交流，如何开发和推广 AI 应用。这是很好的学习交流、获取资源的机会。

扫描下方海报二​维码，现在就可以线下报名参加，或者线上预约直播。

![](https://cdn.beekka.com/blogimg/asset/202411/bg2024112809.webp)

（完）
