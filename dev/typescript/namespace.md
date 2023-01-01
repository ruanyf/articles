# TypeScript namespace

namespace（名称空间）是一种将相关代码组织在一起的方式。

它出现在 ES 模块诞生之前，是作为 TypeScript 自己的模块格式而发明的。但是，自从有了 ES 模块，官方已经不推荐使用 namespace 了。

## 基本用法

namespace 用来定一个名称空间，其内部的所有变量和函数，都必须在这个名称空间里面使用。

```typescript
namespace Utils {
    function isString(value: any) {
        return typeof value === 'string';
    }

    // 正确
    isString('yes');
}

Utils.isString('no'); // 报错
```

如果要在命名空间以外使用，就必须用`export`命令在内部指定接口。

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

凡是有`export`前缀的成员，才可以在名称空间外部引用。

它转换后的 JavaScript 代码如下。

```typescript
(function (Utility) {

// Add stuff to Utility

})(Utility || (Utility = {}));
```

也就是说，namespace 其实相当于 JavaScript 的一个对象，内部的变量是对象的属性，内部的方法是对象的方法。

namespace 内部可以使用`import`语句为命名空间的导出声明起一个别名。当命名空间名字比较长时，使用别名能够有效地简化代码。

```typescript
namespace Utils {
    export function isString(value: any) {
        return typeof value === 'string';
    }
}

namespace App {
    import isString = Utils.isString;

    isString('yes');

    Utils.isString('yes');
}
```

注意，namespace 既是一种类型，也是一个指，会保留在编译后的 JavaScript 代码里面。

namespace 可以嵌套，比如`Utility.Messaging`可以表示名称空间 Utility 下面，还有一个子名称空间 Messaging。

namespace 与模块的作用是一致的，区别是一个文件只能有一个模块，但是可以有多个 namespace。完全可以把模块，看成单个的 namespace，所以 namespace 的用处并不是很大。而且，模块是 JavaScript 的合法语法，namespace 是 TypeScript 添加的语法，编译时必须进行转换，所以建议总是使用模块，替代 namespace。

namespace 可以嵌套。

```typescript
namespace tutorialPoint {
  export namespace invoiceApp {
    export class Invoice {
      public calculateDiscount(price: number){
        return price *.40;
      }
    }
  }
}

var invoice = new tutorialPoint.invoiceApp.Invoice();
console.log(invoice.calculateDiscount(500));
```

上面示例中，嵌套名称空间的成员，需要使用双点号引用。

namespace 不仅可以包括实义代码，也可以包括类型代码。

```typescript
namespace SomeNameSpace {
  export interface ISomeInterfaceName{}
  export class SomeClassName{}
}
```

上面代码中，SomeNameSpace 是一个名称空间，里面不仅包括了一个类，还包括一个只用于类型的接口。

如果 namespace 代码放在一个单独的文件里，那么引入这个文件需要使用三斜杠的语法。

```typescript
/// <reference path = "SomeFileName.ts" />
```

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

## 命名空间的合并

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

同名的命名空间声明分布在不同的文件中，TypeScript 最终会将它们合并在一起。

在合并命名空间声明时，命名空间中的非导出成员不会被合并，它们只能在各自的命名空间中使用。

```typescript
namespace NS {
    const a = 0;

    export function foo() {
        a;  // 正确
    }
}

namespace NS {
    export function bar() {
        foo(); // 正确

        a;  // 编译错误：找不到 'a'
    }
}
```

同名的命名空间声明与函数声明可以进行合并，但是要求函数声明必须位于命名空间声明之前，这样做能够确保先创建出一个函数对象。函数与命名空间合并就相当于给函数对象添加额外的属性。

```typescript
function f() {
    return f.version;
}

namespace f {
    export const version = '1.0';
}

f();   // '1.0'
f.version; // '1.0'
```

同名的命名空间声明与类声明可以进行合并，但是要求类声明必须位于命名空间声明之前，这样做能够确保先创建出一个构造函数对象。命名空间与类的合并提供了一种创建内部类的方式。

```typescript
class Outer {
    inner: Outer.Inner = new Outer.Inner();
}

namespace Outer {
    export class Inner {}
}
```

```typescript
class A {
    foo: string = A.bar;
}

namespace A {
    export let bar = 'A';
    export function create() {
        return new A();
    }
}

const a: A = A.create();
a.foo; // 'A'
A.bar; // 'A'
```

同名的命名空间声明与枚举声明可以进行合并。这相当于将枚举成员与命名空间的导出成员进行合并。

```typescript
enum E {
    A,
    B,
    C,
}

namespace E {
    export function foo() {
        E.A;
        E.B;
        E.C;
    }
}

E.A;
E.B;
E.C;
E.foo();
```

注意，枚举成员名与命名空间导出成员名不允许出现同名的情况。

```typescript
enum E {
    A,                     // 编译错误！重复的标识符 A
}

namespace E {
    export function A() {} // 编译错误！重复的标识符 A
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

三斜杠指令（`///`）是一个编译器指令，只能用在文件的头部，如果用在其他地方，会被当作普通的注释。若一个文件中使用了三斜线指令，那么在三斜线指令之前只允许使用单行注释、多行注释和其他三斜线指令。

### `/// <reference path="" />`

该指令用于声明TypeScript源文件之间的依赖关系。在编译一个文件时，编译器会同时将该文件中使用“/// <reference path="" />”三斜线指令引用的文件添加到编译文件列表。

`/// <reference path="..." />`

上面的三斜杠指令表示编译时的依赖文件。编译器会在预处理阶段，就找出所有三斜杠引用指令，并将指定文件添加到编译中，然后再一起编译。

在“/// <reference path="" />”三斜线指令中，“path”属性定义了依赖文件的路径。若指定的路径是一个相对路径，则相对于的是当前文件的路径。

在使用“/// <reference path="" />”三斜线指令时，有以下两个注意事项：

- “path”属性必须指向一个存在的文件，若文件不存在则会报错。
- “path”属性不允许指向当前文件。

```typescript
/// <reference path="lib.ts" />

let count = add(1, 2);
```

上面示例中，编译index.ts，还会同时编译 lib.ts，编译出 index.js 和 lib.js。

使用“--outFile”编译选项能够将编译生成的“.js”文件合并为一个文件。但需要注意的是，该编译选项不支持合并使用了CommonJS模块和ES6模块模式的代码，只有将“--module”编译选项设置为None、System或AMD时才有效。

如果打开了编译器的`noResolve`属性，则忽略三斜杠指令。将其当作一般的注释，原样保留在编译产物中。

### `/// <reference types="" />`

该三斜线指令用来定义对某个DefinitelyTyped声明文件的依赖，或者说是对安装在“node_modules/@types”目录下的某个声明文件的依赖。在“/// <reference types="" />”三斜线指令中，“types”属性的值是声明文件安装包的名称，也就是安装到“node_modules/@types”目录下的文件夹的名字。

`/// <reference types="..." />`

上面的三斜杠指令表示编译时依赖某个模块，作用类似于`import`命令。比如，`/// <reference types="node" />`表示会添加`@types/node/index.d.ts`。

```typescript
/// <reference types="jquery" />

declare var settings: JQuery.AjaxSettings;
```

仅在需要手动写`d.ts`文件时，才需要写这个指令。

注意，我们应该只在声明文件（.d.ts）中使用“/// <reference types="" />”三斜线指令，而不应该在“.ts”文件中使用该指令。在.ts文件中，我们应该使用“--types”编译选项和“--typeRoots”编译选项来设置引用的声明文件。

对于编译时生成的文件，编译器会自动添加`/// <reference types="..." />`。

### `/// <reference lib="" />`

`/// <reference lib="..." />`

该指令允许脚本文件显式包含内置 lib 库。

该三斜线指令用于定义对语言内置的某个声明文件的依赖。在前文介绍过，当我们在计算机中安装TypeScript语言时，也会同时安装一些内置的声明文件。这些声明文件位于TypeScript安装目录下的lib文件夹中，它们描述了JavaScript语言的标准API。

该列表并不是固定的，它会随着TypeScript版本的升级而更新。

在“/// <reference lib="" />”三斜线指令中，“lib”属性的值是内置声明文件的名称。内置声明文件统一使用“lib.[description].d.ts”命名方式，而“/// <reference lib="" />”指令中“lib”属性的值就是文件名中的“description”这部分。

例如，对于内置的“lib.es2015.symbol.wellknown.d.ts”声明文件，应使用如下方式进行引用：

```typescript
/// <reference lib="es2015.symbol.wellknown" />
```

`/// <reference no-default-lib="true"/>`

该指令将文件标记为默认库。