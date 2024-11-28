
## 邮件发送地址测试

4、[2024年如何搭建邮件发送服务器](https://www.xomedia.io/blog/a-deep-dive-into-email-deliverability/)（英文）

![](https://cdn.beekka.com/blogimg/asset/202404/bg2024040103.webp)

为了减少垃圾邮件，从今年4月1日开始，Gmail 等几家大型邮件服务商，会验证邮件的发信地址是否可信。

本文介绍一些基本情况，并给出 SPF、DKIM 和 DMARC 三种验证机制的各种相关链接。

为了防止垃圾邮件，邮件发送服务器现在必须配置 DKIM、SPF、SpamAssassin 等机制。

这个仓库是 [SPF、DKIM 和 DMARC 的简单解释](https://github.com/nicanorflavier/spf-dkim-dmarc-simplified)。

下面是一些工具，用来测试邮件服务器是否正确配置。

- [Learn DMARC](https://www.learndmarc.com/)
- [maile-tester](https://www.mail-tester.com/)
- [DKIM Test](https://www.appmaildev.com/en/dkim)
- [DMARC Verified](https://dmarcverified.com/) 
- [MXtoolbox](https://mxtoolbox.com/SuperTool.aspx)
- [DKIMValidator.com](https://dkimvalidator.com/)

![](https://cdn.beekka.com/blogimg/asset/202405/bg2024051103.webp)

基本上，他们就是提供一个一次性邮件地址。你向这个地址发信，他们就能验证邮件服务器跟垃圾邮件的匹配度。