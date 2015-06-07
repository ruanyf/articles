# Appium的用法

## Appium服务器的配置

```javascript
exports.local = {
  host: 'localhost',
  port: 4723
};
```

## 测试环境配置

真机配置。

```javascript
var realDriverCfg = {
  browserName: '',
  'appium-version': '1.3',
  platformName: 'iOS',
  platformVersion: '8.3', // 这里要填写本机安装的模拟器版本
  deviceName: 'iPhone Simulator',
  udid: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  app: 'com.xudafeng.hybrid-sample-ios' //这里是 bundleId
};
```

模拟器的配置。

```javascript
var simulatorDriverCfg = {
  'appium-version': '1.3',
  platformName: 'iOS',
  platformVersion: '8.1',
  deviceName: 'iPhone Simulator',
  app: path.resolve('./apps/hybrid_sample_ios.app.zip')
};
```
