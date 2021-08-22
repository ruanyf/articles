# 剪贴板

Vim 的寄存器可以视为剪贴板，可以从里面读取或写入内容。

## 指定寄存器

下面是正常模式下的Here’s a command and a NORMAL mode keystroke to display and specify registers:

- `:registers` or `:reg`：显示所有寄存器及其内容。
- `"<reg>`：指定某一个寄存器。

写入指定寄存器（比如`"a`）的方法：

- Hit `"a` in NORMAL mode to specify what register you want to write on.
- Yank, change, or delete some content (for example by using dd in NORMAL mode) to write it to a.

读取指定寄存器（比如`"a`）的方法：

- Hit `"a` in NORMAL mode to specify what register you want to read.
- Use a put keystroke in NORMAL mode (for example p or P) to spit out the content of the register in your current buffer.

## 寄存器的种类

Vim 提供了10种寄存器。

1. The unnamed register (`"`) - Contain the last deleted, changed, or yanked content, even if one register was specified.
1. The numbered registers (from 0 to 9)
  - 0 contains the content of the last yank.
  - 1 to 9 is a stack containing the content you’ve deleted or changed.
  - Each time you delete or change some content, it will be added to the register 1.
  - The previous content of the register 1 will be assigned to register 2, the previoius content of 2 to 3…
  - When something is added to the register 1, the content of the register 9 is lost.
  - None of these registers are written if you’ve specified one before with the keystroke ".The numbered registers (from 0 to 9)
1. The small delete register (`-`)：Contains any deleted or changed content smaller than one line. It’s not written if you specified a register with `"`.
1. The named registers (range from `a` to `z`)：Vim will never write to them if you don’t specify them with the keystroke `"`. You can use the uppercase name of each register to append to it (instead of overwriting it).
1. The read only registers (`.`, `%` and `:`)
  - `.` contains the last inserted text.
  - `%` contains the name of the current file.
  - `:` contains the most recent command line executed.
1. The alternate buffer register (`#`)：Contain the alternate buffer for the current window.
1. The expression register (`=`)：Store the result of an expression. More about this register below.
1. The selection registers (`+` and `*`)
  - `+` is synchronized with the system clipboard.
  - `*` is synchronized with the selection clipboard (only on *nix systems).
1. The black hole register (`_`) - Everything written in there will disappear forever.
1. The last search pattern register (`/`) - This register contains your last search.

As you can see, even if you don’t specify any register with the keystroke ", the content you delete, change, or yank will automatically overwrite one (or multiple) of them. So if you don’t want the content you write to your registers to be silently overwritten by Vim, always write in the named registers.

Using a put command without specifying any register will spit the content of the unnamed register by default. But you might have this line in your vimrc:

```vim
clipboard=unnamedplus
```

In that case, the content you change, delete, or yank will go directly in the unnamed register and the + register.

## Using Registers in Insert Mode

The magical keystroke `"` is great for NORMAL mode, but what about spitting the content of a register in INSERT mode? For that, you can use `CTRL+R <reg>` to put the content of register `<reg>` in your current buffer.

For example, if you hit `CTRL+R %` in INSERT mode, you’ll put the content of the register `%` in your current buffer.

## The Insane Expression Register

If you don’t know the expression register, I’m about to revolution your life. I hope you’re ready.

Try this:

1. Switch to INSERT mode and hit the keystroke CTRL+r =. You’ll move to Vim’s command-line.
1. From there, you can type any Vimscript expression you want, like system("ls") we saw above.
1. Hit ENTER to run the expression, and you’ll see the output of the shell command ls directly inserted in your buffer!

You can call shell scripts that way too, and its output will be spit in your buffer. It’s slower than using pure Vimscript, but for small scripts it doesn’t really matter in practice. How crazy is that?

## help

- `:help registers`
- `:help clipboard`
- `:help clipboard-unnamed`
- `:help clipboard-unnamedplus`

## Link

- [A Vim Guide for Advanced Users](https://thevaluable.dev/vim-advanced/)
