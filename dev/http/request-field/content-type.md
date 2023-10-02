# content-type

`content-type`字段表示返回的数据类型。

（1）返回 HTML 页面

```
text/html;charset=UTF-8
```

（2）返回 JSON 数据

```
application/json;charset=UTF-8
```

（3）返回 CSS 样式表。

```
text/css
```

（4）multipart/form-data，分块传送

```http
Content-Type: multipart/form-data; boundary=AaB03x
　
--AaB03x

Content-Disposition: form-data; name=&quot;field1&quot;
　
Joe Blow
--AaB03x

Content-Disposition: form-data; name=&quot;pics&quot;; filename=&quot;file1.txt&quot;
Content-Type: text/plain
　
...（file1.txt的数据）...
--AaB03x--
```

## 返回图像

```http
"Content-Type": "image/png"
```
