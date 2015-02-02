# bash的用法

## bash环境

bash命令的x参数，进入调试环境。

```bash
$ bash -x <脚本文件名>
```

每次打开一个新的Bash窗口，就会执行.profile文件，作为窗口的初始化文件。

## 行编辑

命令行窗口可以使用以下的编辑命令。

- Control-A 移到行首
- Control-E 移到行尾
- Control-U 从光标位置删除到行首
- Control-K 从光标位置删除到行尾
- Ctrl-X Ctrl-E 打开编辑器，编辑行命令
- Ctrl-R 搜索输入命令的历史
- !! 重复上一个命令
- !$ 上一个命令中最后一个参数

## 语法结构

### if结构

```bash
if condition 
then
do something
else
do something else
fi
```

## 变量

- $0 特殊变量，表示上一个命令的输出结果，如果是0，表示运行成功。

test是判断命令，“[” 符号可用于代替test命令。

```bash
if test $? -eq 0 
then
fi
```

运算符

- -eq Is Equal To
- -ne Is Not Equal To
- -gt Is Greater Than
- -ge Is Greater Than or Equal To
- -lt Is Less Than
- -le Is Less Than or Equal To

字符串比较运算符

- == Is Equal To
- != Is Not Equal To
- < Is Less Than
- <= Is Less Than Or Equal To
- > Is Greater Than if
- >= Is Greater Than Or Equal To

## 实例

### 查看指定目录大小

```bash
#!/bin/bash
#Author Leo G

echo " Enter your directory: "
read x
du -sh "$x"
```

### 备份脚本

```bash
#!/bin/bash
#Author Leo G

rsync -avz  -e "ssh " /path/to/yourfile user@backupserver.com:/backup/

echo "backup for $(date) "| mail -s "backup complete" user@youremail.com
```
