# must-revalidate

must-revalidate 字段只用于服务器回应。

它主要规定，即使在断网的情况下，也不能用过期的缓存，一定要获取服务器端的最新版本。因为这时断网，浏览器会返回` 504 (Gateway Timeout) `。

HTTP 协议允许，断网是使用过期的缓存，`must-revalidate`主要防止这种情况。