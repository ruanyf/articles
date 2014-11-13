# Apache Velocity

Apache Velocity是一个基于Java的模板引擎，它提供了一个模板语言去引用由Java代码定义的对象。

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
