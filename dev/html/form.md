# Form表单

form表单的encrypt属性，指定了表单数据提交到服务器的`content type`类型。这个属性可以取以下类型的值。

- application/x-www-form-urlencoded：默认类型，控件名和控件值都要转义（空格转为加号，非数字和非字母转为%HH的形式，换行转为CR LF），控件名和控件值之间用等号分隔。控件按照出现顺序排列，控件之间用&分隔。

- multipart/form-data：主要用于提交文件、非ASCII字符和二进制数据。这个类型用于提交大文件时，会将文件分成多块传送，每一块的HTTP头信息都有Content-Disposition属性，值为form-data，以及一个name属性，值为控件名。

```bash
Content-Disposition: form-data; name="mycontrol"
```

下面是上传文件的表单。

```html
<FORM action="http://server.com/cgi/handle"
       enctype="multipart/form-data"
       method="post">
   <P>
   What is your name? <INPUT type="text" name="submit-name"><BR>
   What files are you sending? <INPUT type="file" name="files"><BR>
   <INPUT type="submit" value="Send"> <INPUT type="reset">
 </FORM>
```

实际发送的数据格式如下。

```html
Content-Type: multipart/form-data; boundary=AaB03x

   --AaB03x
   Content-Disposition: form-data; name="submit-name"

   Larry
   --AaB03x
   Content-Disposition: form-data; name="files"; filename="file1.txt"
   Content-Type: text/plain

   ... contents of file1.txt ...
   --AaB03x--
```

## input元素

input元素有`formaction`属性，用来强制当前表单跳转到指定的URL，而不是表单的`action`属性指定的URL。

```html
<form action="http://e1.com">
  <input type=submit value=Submit ↵
     formaction="http://e2.com">
</form>
```

上面代码中，如果点击提交按钮，表单会跳转到`e2.com`，而不是`e1.com`。它的主要用途是一个表单可以提交到多个目的地。

该属性对具有提交作用的元素都有效，比如`<input type=submit>`、`<input type=image>`和`<button>`。

