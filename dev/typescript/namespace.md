# namespace

## 基本用法

namespace 用来定一个名称空间，其内部的所有变量和函数，都必须在这个名称空间里面使用。如果要在命名空间以外使用，就必须用`export`命令在内部指定接口。

```typescript
namespace Utility {
    export function log(msg) {
        console.log(msg);
    }
    export function error(msg) {
        console.error(msg);
    }
}

// usage
Utility.log('Call me');
Utility.error('maybe!');
```

它转换后的 JavaScript 代码如下。

```typescript
(function (Utility) {

// Add stuff to Utility

})(Utility || (Utility = {}));
```

也就是说，namespace 其实相当于 JavaScript 的一个对象，内部的变量是对象的属性，内部的方法是对象的方法。

注意，namespace 既是一种类型，也是一个指，会保留在编译后的 JavaScript 代码里面。

namespace 可以嵌套，比如`Utility.Messaging`可以表示名称空间 Utility 下面，还有一个子名称空间 Messaging。

namespace 与模块的作用是一致的，区别是一个文件只能有一个模块，但是可以有多个 namespace。完全可以把模块，看成单个的 namespace，所以 namespace 的用处并不是很大。而且，模块是 JavaScript 的合法语法，namespace 是 TypeScript 添加的语法，编译时必须进行转换，所以建议总是使用模块，替代 namespace。

## 输出的加载

namespace 可以使用`export`命令输出，供其他文件使用。

```typescript
// shapes.ts

export namespace Shapes {
  export class Triangle {
    /* ... */
  }
  export class Square {
    /* ... */
  }
}
```

加载时，使用`import`命令加载。

```typescript
// shapeConsumer.ts
import { Shapes } from "./shapes";
let t = new Shapes.Triangle();
```

但是，更好的写法是采用标准模块的输出和加载。

```typescript
// shapes.ts
export class Triangle {
  /* ... */
}
export class Square {
  /* ... */
}

// shapeConsumer.ts
import * as shapes from "./shapes";
let t = new shapes.Triangle();
```

## 合并

多个同名的 namespace 也会自动合并。

```typescript
namespace Animals {
  export class Zebra {}
}
namespace Animals {
  export interface Legged {
    numberOfLegs: number;
  }
  export class Dog {}
}

// 等同于
namespace Animals {
  export interface Legged {
    numberOfLegs: number;
  }
  export class Zebra {}
  export class Dog {}
}
```

## 实例

下面是一个字符串验证器的代码。

```typescript
interface StringValidator {
  isAcceptable(s: string): boolean;
}
let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;
class LettersOnlyValidator implements StringValidator {
  isAcceptable(s: string) {
    return lettersRegexp.test(s);
  }
}
class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

// 分隔线
// ---------------------

let strings = ["Hello", "98052", "101"];
// Validators to use
let validators: { [s: string]: StringValidator } = {};
validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();
// Show whether each string passed each validator
for (let s of strings) {
  for (let name in validators) {
    let isMatch = validators[name].isAcceptable(s);
    console.log(`'${s}' ${isMatch ? "matches" : "does not match"} '${name}'.`);
  }
}
```

上面示例中，分隔线上方都是工具代码，下方则是应用上方工具的测试代码。由于这些工具代码都是相关的，可以使用 namespace 将它们组合在一起，定义一个叫做 Validation 的命名空间。

```typescript
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}

// 分隔线
// ---------------------

let strings = ["Hello", "98052", "101"];
// Validators to use
let validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
// Show whether each string passed each validator
for (let s of strings) {
  for (let name in validators) {
    console.log(
      `"${s}" - ${
        validators[name].isAcceptable(s) ? "matches" : "does not match"
      } ${name}`
    );
  }
}
```

同一个 namespace 可以跨多个文件，使用三斜杠的语法进行引用合并。

```typescript
// Validation.ts
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}

// LettersOnlyValidator.ts
/// <reference path="Validation.ts" />
namespace Validation {
  const lettersRegexp = /^[A-Za-z]+$/;
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }
}

// ZipCodeValidator.ts
/// <reference path="Validation.ts" />
namespace Validation {
  const numberRegexp = /^[0-9]+$/;
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}

// Test.ts
/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />
// Some samples to try
let strings = ["Hello", "98052", "101"];
// Validators to use
let validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
// Show whether each string passed each validator
for (let s of strings) {
  for (let name in validators) {
    console.log(
      `"${s}" - ${
        validators[name].isAcceptable(s) ? "matches" : "does not match"
      } ${name}`
    );
  }
}
```

使用的时候，可以将这些文件编译成一个大文件。

```bash
$ tsc --outFile sample.js Test.ts
# or
$ tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts
```

另一种方法是逐一加载每一个文件的编译产物。

```html
<script src="Validation.js" type="text/javascript" />
<script src="LettersOnlyValidator.js" type="text/javascript" />
<script src="ZipCodeValidator.js" type="text/javascript" />
<script src="Test.js" type="text/javascript" />
```

## 别名

TypeScript 允许使用`import q = foo.bar`的语法，为 namespace 的属性指定别名。

```typescript
namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Square {}
  }
}
import polygons = Shapes.Polygons;
let sq = new polygons.Square();
```

## 描述外部接口

namespace 可以将不同的接口组合成一个对象，很适合用来描述没有提供官方类型定义的第三方 JS 库，比如下面是 D3.d.ts 的一部分。

```typescript
declare namespace D3 {
  export interface Selectors {
    select: {
      (selector: string): Selection;
      (element: EventTarget): Selection;
    };
  }
  export interface Event {
    x: number;
    y: number;
  }
  export interface Base extends Selectors {
    event: Event;
  }
}
```

## 三斜杠指令

三斜杠指令（`///`）是一个编译器指令，只能用在文件的头部，如果用在其他地方，会被当作普通的注释。

`/// <reference path="..." />`

上面的三斜杠指令表示编译时的依赖文件。编译器会在预处理阶段，就找出所有三斜杠引用指令，并将指定文件添加到编译中，然后再一起编译。

如果打开了编译器的`noResolve`属性，则忽略三斜杠指令。

`/// <reference types="..." />`

上面的三斜杠指令表示编译时依赖某个模块，作用类似于`import`命令。比如，`/// <reference types="node" />`表示会添加`@types/node/index.d.ts`。

仅在需要手动写`d.ts`文件时，才需要写这个指令。

对于编译时生成的文件，编译器会自动添加`/// <reference types="..." />`。

`/// <reference lib="..." />`

该指令允许脚本文件显式包含内置 lib 库。

`/// <reference no-default-lib="true"/>`

该指令将文件标记为默认库。