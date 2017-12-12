# 图像与滤波

我对图像处理很有兴趣，写过好几篇这方面的博客（[1](http://www.ruanyifeng.com/blog/2012/11/gaussian_blur.html)，[2](http://www.ruanyifeng.com/blog/2013/03/similar_image_search_part_ii.html)，[3](http://www.ruanyifeng.com/blog/2011/07/principle_of_similar_image_search.html)，[4](http://www.ruanyifeng.com/blog/2016/07/edge-recognition.html)）。

前几天读到一篇[文章](https://medium.com/statuscode/filtering-images-using-web-audio-api-276555cca6ad)说，**图像其实是一种波，所有波的算法都可以用于图像**。这个角度很新颖，我以前从未想过。

一旦从波入手，很多图像处理的算法问题就很容易理解。下面就是我的学习笔记。

## 一、图像为什么是波？

我们知道，图像是像素点的集合。下图是一张 400 x 400 的图片，一共包含了 16 万个像素点。

每个像素点的颜色，可以用红、绿、蓝、透明度四个值描述，大小范围是`[0, 255]`，使用 [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas) 就可以拿到这些值。

如果把每一行所有像素（上例是400个）的红、绿、蓝的值，依次画成三条曲线，就可以得到下面的图形。

可以看到，每条曲线都在不停的上下波动。有些区域的波动比较小，有些区域突然出现了急剧波动（比如 54 和 324 这两点）。

对比一下图像就能发现，曲线波动较大的地方，也是图像出现突变的地方。这说明波动与图像是紧密关联的。**图像本质上就是各种色彩波的叠加。**

## 二、频率

图像就是色彩的波动：波动大，色彩急剧变化；波动小，色彩平滑过渡。

频率（frequency）是波动快慢的指标，单位时间内波动次数越多，频率越高，反之越低。

上图是函数`sin(Θ)`的图形，在`2π`的周期内完成了一次波动，频率就是1。

上图是函数`sin(2Θ)`的图形，在`2π`的周期内完成了两次波动，频率就是2。

所以，色彩剧烈变化的地方，就是图像的高频区域；色彩平滑过渡的地方，就是低频区域。

## 三、滤波器

物理学对波的研究已经非常深入，提出了很多处理波的方法。其中有一种就是滤波器（filter），即过滤掉某些波，保留另一些波。

下面是两种常见的滤波器。

- [低通滤波器](https://baike.baidu.com/item/%E4%BD%8E%E9%80%9A%E6%BB%A4%E6%B3%A2)（lowpass）：减弱或阻隔高频信号，保留低频信号
- [高通滤波器](https://baike.baidu.com/item/%E9%AB%98%E9%80%9A%E6%BB%A4%E6%B3%A2)（highpass）：减弱或阻隔低频信号，保留高频信号

上图是原始曲线（橙色）和经过低通滤波`lowpass`的曲线（蓝色）。可以看到，蓝色曲线的波动比橙色曲线小很多。

上图是原始曲线（红色）和经过高通滤波`highpass`的曲线（蓝色）。可以看到，红色曲线波动较小的地方，蓝色曲线的波动变大了。

## 四、图像的滤波

浏览器实际上包含了滤波器的实现，因为 [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) 里面定义了[声波的滤波](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/type)。因此可以通过浏览器，将`lowpass`和`highpass`运用于图像。

`lowpass`使得图像的高频区域变成低频，即色彩变化剧烈的区域变得平滑，也就是出现模糊效果。

`highpass`正好相反，过滤了低频，只保留那些变化最剧烈的区域，也就是图像里面的物体边缘，所以常用于边缘识别。

下面这个[网址](http://fellipe.com/demos/lena-js/)，可以将滤波器拖到图像上，产生过滤后的效果。

浏览器实现滤波的范例代码，可以看这个[仓库](https://github.com/rssilva/web-audio-image-filtering)。

（完）