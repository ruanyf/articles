# Graphviz 的用法

## 简介

Graphviz（Graph Visualization Software的缩写）是贝尔实验室开发的一个开源的工具包，它使用一个特定的DSL(领域特定语言):dot作为脚本语言，然后使用布局引擎来解析此脚本，并完成自动布局。graphviz提供丰富的导出格式，如常用的图片格式，SVG，PDF格式等。

graphviz中包含了众多的布局器：

- dot 默认布局方式，主要用于有向图
- neato 基于spring-model(又称force-based)算法
- twopi 径向布局
- circo 圆环布局
- fdp 用于无向图

graphviz的设计初衷是对有向图/无向图等进行自动布局，开发人员使用dot脚本定义图形元素，然后选择算法进行布局，最终导出结果。

## 安装

```bash
$ sudo apt-get install graphviz
```

## 用法

命令格式

```bash
$ ＜cmd＞ ＜inputfile＞ -T ＜format＞ -o ＜outputfile＞

# 例子
$ dot -T png g3.gv -o g3.png
```

其输出格式包括PostScript，PDF，SVG，PNG，含注解的文本等等。

graphviz包含3中元素，图，顶点和边。每个元素都可以具有各自的属性，用来定义字体，样式，颜色，形状等。

### 无向图

在最简单的应用中，DOT语言可以用来描述一张无向图。无向图显示了对象间最简单的关系，例如人之间的友谊。使用关键字graph开始一张无向图的定义，并用大括号包含要描述的节点，双连字号（--）被用来描述节点间的关系。另外，一行的末尾需要加上分号（;）。

```
graph graphname {
  a -- b -- c;
  b -- d;
}
```

![](http://www.ruanyifeng.com/blogimg/asset/wangdoc/g1.png)

### 有向图

类似于无向图，DOT语言也可以用来描述一张有向图，类似于流程图和树状图。其语法与无向图相似，但要在图的最开始使用关键字'digraph'，并用箭头（->）表示节点直接的关系。

```
digraph graphname {
  a -> b -> c;
  b -> d;
}
```

DOT语言中，可以对节点和边添加不同的属性。这些属性可以控制节点和边的显示样式，例如颜色，形状和线形。可以在语句和句尾的分号间放置一对方括号，并在其中中放置一个或多个属性-值对。多个属性可以被逗号和空格（, ）分开。节点的属性被放置在只包含节点名称的表达式后。

```
graph graphname {
  // label属性可以改变节点的显示名称
  a [label="Foo"];
  // 节点形状被改变了
  b [shape=box, style="filled", color="black", fillcolor="chartreuse"];
  // a-b边和b-c边有相同的属性
  a -- b -- c [color=blue];
  b -- d [style=dotted];
}
```

![](http://www.ruanyifeng.com/blogimg/asset/wangdoc/g3.png)

添加节点和连线的样式。

```
digraph abc{
  node [shape="record"];
  edge [style="dashed"];
}
```

官方文档列出了所有[属性](http://www.graphviz.org/content/attrs)和[形状](http://www.graphviz.org/content/node-shapes)。

下面是几个顶层属性。

```
graph graphname {
  rankdir=LR; // 图形从左到右
  a -- b;
  b -- c;
  b -- d;
  d -- a;
};
```

### 注释

DOT语言支持C语言与C++风格的单行与多行注释。另外，也支持Shell脚本风格的以#开头的注释。

```
// 单行注释
/* 多行
   注
   释 */
# 如此的行也会被忽略。
```

## 参考链接

- [使用DOT语言和Graphviz绘图(翻译)](http://casatwy.com/shi-yong-dotyu-yan-he-graphvizhui-tu-fan-yi.html)
