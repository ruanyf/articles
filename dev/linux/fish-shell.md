# Fish Shell的用法

## prompt

fish有一个函数fish_prompt，该函数的输出内容就是命令行提示符。

```bash
function fish_prompt
        echo "New Prompt % "
end
```

可以将该文件存入设置目录，变成自动运行。

```bash
cat ~/.config/fish/functions/fish_prompt.fish
function fish_prompt
        echo (pwd) '> '
end
```

实例一。

```bash
function fish_prompt
  set_color $fish_color_cwd
  echo -n (prompt_pwd)
  set_color normal
  echo -n ' > '
end
```

实例二。

```bash
function fish_prompt
  set_color white
  echo -n (date "+%H:%M:%S ")
  set_color magenta
  echo -n (pwd)
  set_color cyan
  echo -n ' $ '
  set_color normal
end
```

set_color命令只支持以下值：black, red, green, brown, yellow, blue, magenta, purple, cyan, white and normal。
