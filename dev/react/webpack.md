# Webpack的用法

## 模块调用

Webpack 可以在脚本中调用，它是一个构造函数，接受一个配置对象作为参数，生成Webpack实例。

```javascript
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

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
