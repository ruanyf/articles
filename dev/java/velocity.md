# Apache Velocity

Apache Velocity是一个基于Java的模板引擎，它提供了一个模板语言去引用由Java代码定义的对象。

- 变量 $ 开头，若该变量之前未创建则自动声明
- 语句 # 开头
- 嵌套语句 需以 #end 结束

变量

```
#set($var=”var“)
#set($var=123)
#set($var=[1, 2, 3])
#set($var={”a“:1, ”b“:1})

```

\#if语句

```
#if
#else
#end

#if
#elseif
#else
#end

```

\#for语句

```

#foreach($item in $obj)
$item
#end

#foreach($item in $obj.entrySet())
$item.key : $item.value
#end

#foreach($key in $obj.keySet())
$key :$obj.get($key)
#end

#foreach($value in $obj.values())
$value
#end

```

\#include命令

引用本地文件，velocity不进行渲染。

```

#include(“test.txt”)
#include($var)

```

Web模板。

```html

## Velocity Hello World
<html>
    <body>
       #set( $foo = "Velocity" )
       ## followed by
       Hello $foo World!
    </body>
</html>

```

经过Velocity处理后会生成如下的HTML代码。

```html

<html>
    <body>
     Hello Velocity World!
    </body>
</html>

```
