# locale.h

`locale.h`设置程序适用的地区，主要影响以下的行为。

- 数字格式
- 货币格式
- 字符集
- 日期和时间格式

它设置了以下几个宏。

- LC_COLLATE：影响字符串比较函数。
- LC_CTYPE：影响字符函数。
- LC_MONETARY：影响货币格式。
- LC_NUMERIC：影响数字格式。
- LC_TIME：影响时间格式。

## setlocale()

`setlocale()`设置当前的地区。

```c
char* setlocal(int category, const char* locale);
```

它接受两个参数。第一个参数表示所影响的类型，如果值为上面五个宏之一，则只影响该类别，如果值为`LC_ALL`，则影响所有类别。第二个参数只可能为`"C"`（正常模式）或`""`（本地模式）。

任意程序开始时，都隐含下面的调用。

```c
setlocale(LC_ALL, "C");
```

`setlocale()`的返回值是一个字符串指针，表示新地区。

## localeconv()

`localeconv()`用来获取当前地区的详细信息。

```c
struct lconv* localeconv(void);
```
