# cron 定时任务

cron 任务设置在输出对象的 scheduled 属性。

```javascript
export default {
  async scheduled(event, env, ctx) {
    // ...
  },
};
```