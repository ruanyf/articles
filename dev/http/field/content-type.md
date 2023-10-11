# content-type 字段

`content-type`字段表示返回的数据类型。与 Accept 字段一样，字段值用 type/subtype 形式赋值。

（1）返回 HTML 页面

```http
text/html;charset=UTF-8
```

参数 charset 使用 iso-8859-1 或 euc-jp 等字符集进行赋值。

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

## 发送表单

```http
"Content=Type": "application/x-www-form-urlencoded"
```