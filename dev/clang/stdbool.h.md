# stdbool.h

`stdbool.h`头文件定义了 bool 类型，还提供了`true`和`false`两个宏，分别表示`0`和`1`。

下面是判断一个数是否为质数的程序。

```c
#include <stdio.h>
#include <stdbool.h>

int main(void) {
  unsigned long num;
  unsigned long div;
  bool isPrime = true;

  num = 64457;

  for (div = 2; (div * div) <= num; div++) {
   if (num % div == 0) isPrime = false;
  }

  if (isPrime) {
    printf("%lu is prime.\n", num);
  } else {
    printf("%lu is not prime.\n", num);
  }

  return 0;
}
```
