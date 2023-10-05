# Cloudflare Worker 路由

```javascript
import { Router } from 'itty-router';
import lookup from './src/handlers/lookup';
import webhook from './src/handlers/webhook';

// Create a new router
const router = Router();

router.post("/lookup", lookup);
router.post("/webhook", webhook);

router.all("*", () => new Response("404, not found!", { status: 404 }))

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})
```
