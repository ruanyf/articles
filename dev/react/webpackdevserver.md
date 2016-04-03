# WebpackDevServer

WebpackDevServer在脚本中调用时，第一个参数是Webpack的实例，第二个参数是配置对象。

```javascript
var server = new WebpackDevServer(webpack(config), {
  contentBase: './dev',
  publicPath: config.output.publicPath,
  hot: true
});

server.listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:3000');
});
```

- `contentBase`属性指定HTTP服务器对外访问的主目录，即源文件应该在这个目录。
- `publicPath`属性指定静态资源的目录，它是针对网站根目录的，而不是针对服务器根目录。比如，设定`publicPath: "/assets/"`和`file: "bundle.js"`以后，`bundle.js`的位置就是`/assets/bundle.js`。
