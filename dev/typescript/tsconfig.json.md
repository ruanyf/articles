# tsconfig.json

## 简介

`tsconfig.json`是 TypeScript 项目的配置文件，放在项目的根目录。反过来说，如果一个目录里面有`tsconfig.json`，TypeScript 就认为这是项目的根目录。

如果项目源码是 JavaScript，但是想用 TypeScript 处理，那么配置文件的名字是`jsconfig.json`，它跟`tsconfig`的写法是一样的。

`tsconfig.json`文件主要供`tsc`编译器使用，它的命令行参数`--project`或`-p`可以指定`tsconfig.json`的位置（目录或文件皆可）。

```bash
$ tsc -p ./dir
```

如果不指定配置文件的位置，`tsc`就会在当前目录下搜索`tsconfig.json`文件，如果不存在，就到上一级目录搜索，直到找到为止。

`tsconfig.json`文件的格式，是一个 JSON 对象，最简单的情况可以只放置一个空对象`{}`。下面是一个示例。

```json
{
  "compilerOptions": {
    "outDir": "./built",
    "allowJs": true,
    "target": "es5"
  },
  "include": ["./src/**/*"]
}
```

- include：读入`src`目录中的所有文件。
- allowJs：接受 JavaScript 文件作为输入。
- outDir：输出的编译结果放在`built`目录。
- target：编译产物的 JS 版本为 ECMAScript 5。

下面是它的一些基本属性。

- include：指定包含哪些文件夹或文件
- exclude：排除哪些文件夹或文件。

```typescript
{
    "include":[
        "./folder"
    ],
    "exclude":[
        "./folder/**/*.spec.ts",
        "./folder/someSubFolder"
    ]
}
```

- files：指定编译哪些文件

```typescript
{
    "files":[
        "./some/file.ts"
    ]
}
```

在运行tsc命令时，若没有使用“--project”或“-p”编译选项，那么编译器将在tsc命令的运行目录下查找是否存在文件名为“tsconfig.json”的配置文件。若存在“tsconfig.json”配置文件，则使用该配置文件来编译工程；若不存在，则继续在父级目录下查找“tsconfig.json”配置文件，直到搜索到系统根目录为止；如果最终也未能找到一个可用的“tsconfig.json”配置文件，那么就会停止编译工程。

TypeScript提供了一个“--init”编译选项，在命令行上运行tsc命令并使用“--init”编译选项会初始化一个“tsconfig.json”配置文件。

```bash
$ tsc --init
```

tsc命令的运行结果是在当前目录下新生成了一个“tsconfig.json”配置文件，里面有一些默认配置。

你也可以使用其他项目的 tsconfig.json 文件。 @tsconfig/, such as `@tsconfig/recommended` or @tsconfig/node16.

```bash
npm install --save-dev @tsconfig/deno
# or
yarn add --dev @tsconfig/deno
```

安装以后，就可以在`tsconfig.json`里面引用这个设置。

```json
{
"extends": "@tsconfig/deno/tsconfig.json"
}
```

@tsconfig 包含的完整 tsconfig 文件目录可以查看 https://github.com/tsconfig/bases/tree/main/bases。

## compileOptions

`compilerOptions`属性用来定制编译行为。

这个属性可以省略，这时编译器将使用默认设置。

```javascript
{
    "compilerOptions": {
        "rootDir": "./src",
        "outDir": "./build",
        "lib": [ "es2021", "esnext" ],
        "target": "es2021",
        "module": "esnext",
        "esModuleInterop": true,
        "moduleResolution": "Node"
    }
}
```

示例

```json
{
  "compilerOptions": {
    "target": "es5",
    "moduleResolution": "node",
    "module": "esnext",
    "strict": true,
    "importHelpers": true
  }
}
```

### allowJS

allowJs 编译时同时处理 JS 文件，一起拷贝到输出目录。

```json
{
  "compilerOptions": {
    "allowJs": true
  }
}
```

### alwaysStrict

ECMAScript 5引入了一个称为严格模式[1]的新特性。在全局JavaScript代码或函数代码的开始处添加“"use strict"”指令就能够启用JavaScript严格模式。在模块和类中则会始终启用JavaScript严格模式。注意，JavaScript严格模式不是本节所讲的TypeScript严格类型检查模式。

在JavaScript严格模式下，JavaScript有着更加严格的语法要求和一些新的语义。例如，implements、interface、let、package、private、protected、public、static和yield都成了保留关键字；在函数的形式参数列表中，不允许出现同名的形式参数等。

若启用了“--alwaysStrict”编译选项，则编译器总是以JavaScript严格模式的要求来检查代码，并且在编译生成JavaScript代码时会在代码的开始位置添加“"use strict"”指令。

### baseUrl

`baseUrl`参数的值为字符串，指定 TypeScript 源文件目录。

“--baseUrl”编译选项用来设置非相对模块导入的基准路径。在解析相对模块导入时，将不受“--baseUrl”编译选项值的影响。

```typescript
{
    "compilerOptions": {
        "baseUrl": "./"
    }
}
```

此例中，将baseUrl设置为当前目录“./”，参照的是“tsconfig.json”配置文件所在的目录。

### checkJS

checkJS 对 JS 文件进行类型检查。

• Defaulting allowJs to true if it wasn’t already
• Enabling the type checker on .js and .jsx files

```json
{
  "compilerOptions":{
    "checkJs": true
  }
}
```

### declaration

编译时是否生成一个类型声明文件`.d.ts`。

```javascript
tsc --declaration

{
  "compilerOptions": {
    "declaration": true
  }
}
```

### declarationMap

“--declarationMap”是推荐启用的编译选项。如果启用了该选项，那么在生成“.d.ts”声明文件时会同时生成对应的“Source Map”文件。

```javascript
{
    "compilerOptions": {
        "declaration": true,
        "declarationMap": true
    }
}
```

### jsx

`jsx`属性设置如何处理`.tsx`文件。

它可以取以下三个值。

- preserve，保持 jsx 语法不变，输出的文件名为 jsx。
- react，将`<div />`编译成`React.createElement("div")`，输出的文件名为`.js`。
- react-native：保持 jsx 语法不变，输出的文件后缀名为`.js`。

```bash
$ tsc --jsx preserve
```

```javascript
{
  "compilerOptions": {
    "jsx": "preserve"
  }
}
```

### lib

`lib`参数的值是一个数组，描述项目需要加载的外部类型描述文件。

```javascript
{
  "compilerOptions": {
    "lib": ["dom", "es2021"]
  }
}
```

各项解释。

- target：为了支持旧版浏览器，我们希望将 ES5 定位为语言级别。"es2015"如果您不需要支持旧版浏览器，您可以将此设置提高到（或更高）。
- moduleResolution:我们希望 TypeScript 编译器模仿 Node 本身使用的模块解析机制，例如让它自动从 npm 包中获取类型。查看TypeScript 文档中的模块解析章节以获取更多信息。
- module：我们希望编译器发出所有import/export声明和import()表达式不变。稍后我们将让 webpack 打包和拆分我们的代码。
- strict：我们选择严格的类型检查模式来为我们的应用程序获得最高级别的类型安全。我建议您始终设置strict为true. 如果您tsc --init用于创建tsconfig.json文件，则默认启用此设置。
- importHelpers：由于我们将 ES5 定位为语言级别，因此 TypeScript 编译器会在我们使用/时发出一堆辅助函数，例如__awaiter和。为了每个包只发出一次这些帮助函数而不是每次使用一次，我们将指示编译器从包中导入它们。查看TypeScript 2.1：External Helpers Library以获取有关编译器选项的更多信息。__generatorasyncawaittslibimportHelpers

### listFiles

`listFiles`表示在编译工程时，编译器将打印出参与本次编译的文件列表。

```javascript
{
    "compilerOptions": {
        "listFiles": true,
        "strict": true,
        "target": "ES5"
    }
}
```

它会打印出，除了编译的源脚本以外，还会包含 TypeScript 内置的一些声明文件。

### outDir

`outDir`参数的值为字符串，指定编译产物 JavaScript 文件目录。

### module

指定输出文件的模块格式。

```json
{
  "compilerOptions": {
    "module": "commonjs"
  }
}
```

If your target compiler option is "es3" or "es5", module’s default value will be "commonjs". Otherwise, module will default to "es2015" to specify outputting ECMAScript modules.

### moduleResolution

模块解析策略可以使用“--moduleResolution”编译选项来指定。

TypeScript提供了两种模块解析策略，分别是：

- Classic策略。
- Node策略类似于 Node.js。

这个设置不会改变输出代码，只用来描述输出代码的运行时环境。

For backward compatibility reasons, TypeScript keeps the default moduleResolution value to a classic value that was used for projects years ago. You almost certainly do not want the classic strategy in any modern project.

Classic模块解析策略是TypeScript最早提供的模块解析策略，它尝试将模块名视为一个文件进行解析，先查找TypeScript文件，再查找 JavaScript 文件。

Node模块解析策略是TypeScript 1.6版本中引入的，它因模仿了Node.js的模块解析策略[1]而得名。

当没有设置模块的解析策略时，默认的模块解析策略与“--module”编译选项的值有关。若“--module”编译选项的值为CommonJS，则默认的模块解析策略为Node。若“--module”编译选项的值不为CommonJS，则默认的模块解析策略为Classic。

### noEmitOnError

`"noEmitOnError`参数的值为布尔值，指定一旦编译报错，就不生成编译产物。

### noImplicitAny

若一个表达式没有明确的类型注解并且编译器又无法推断出一个具体的类型时，那么它将被视为any类型。编译器不会对any类型进行类型检查，因此可能存在潜在的错误。

`noImpicitAny`禁止了这种行为，如果推断不出类型就会报错。

```javascript
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

### noImplicitThis

与“--noImplicitAny”编译选项类似，在启用了“--noImplicitThis”编译选项时，如果程序中的this值隐式地获得了any类型，那么将产生编译错误。

```typescript
function fancyDate() {
return `${this.getDate()}/${this.getMonth}/${this.getFullYear()}` // 报错
}

// 正确
function fancyDate(this: Date) {
  return `${this.getDate()}/${this.getMonth()}/${this.getFullYear()}`
}
```

注意，`noImplicitThis`不检查类和对象方法。

```typescript
// noImplicitThis 不生效
let x = {
a() {
return this
}
}
x.a()
```

```typescript
01 /**
02  * -- noImplicitThis=true
03  */
04 class Rectangle {
05     width: number;
06     height: number;
07 
08     constructor(width: number, height: number) {
09         this.width = width;
10         this.height = height;
11     }
12 
13     getAreaFunctionWrong() {
14         return function () {
15             return this.width * this.height;
16             //     ~~~~         ~~~~
17             //     编译错误：'this' 隐式地获得了 'any' 类型
18             //     因为不存在类型注解
19         };
20     }
21 
22     getAreaFunctionCorrect() {
23         return function (this: Rectangle) {
24             return this.width * this.height;
25         };
26     }
27 }
```

### paths

paths编译选项用来设置模块名和模块路径的映射，用于设置非相对模块导入的规则。

paths编译选项只能在“tsconfig.json”配置文件中设置，不支持在命令行上使用。由于paths是基于“--baseUrl”进行解析的，所以必须同时设置“--baseUrl”和paths编译选项。

```typescript
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "b": ["bar/b"]
        }
    }
}
```

此例中的paths设置会将对模块b的非相对模块导入映射到“C:\app\bar\b”路径。

在设置paths时，还可以使用通配符“*”，它能够匹配任意路径。

```typescript
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@bar/*": ["bar/*"]
        }
    }
}
```

此例中的paths设置会将对模块“@bar/...”的导入映射到“C:\app\bar\...”路径下。两个星号通配符代表相同的路径。

### preserveConstEnums

开启了这个选项，编译后会对于`const enum`保留 enum 结构，不会用值代替，也不会越界查找。

```javascript
{
  "compilerOptions": {
    "preserveConstEnums": true
  }
}
```

Enum 命令使用`const`命令修饰时，保留 Enum 结构。

- noImplicitAny：如果无法推断出类型，就报错。
- strictNullChecks：打开该设置时，需要显式检查 null 或 undefined。

```typescript
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

- module:commonjs
- moduleResolution: "Node"

- module：编译后代码的模块系统。对于 Node.js，可以采用 CommonJS 模块，对于其他环境，可以采用 ES6 模块，写成 es2020 或者 es2022 或者 esnext。
- esModuleInterop：修复了一些 CommonJS 和 ES6 模块之间的兼容性问题。
- moduleResolution：描述如何查找模块。在 TypeScript 中，使用 ES6 模块格式，这意味着我们使用import语句来检索模块，并使用语句定义导出export。TypeScript 支持多种查找模块的算法，我们使用此参数控制这些算法。使用node值告诉 TypeScript 使用与正常 Node.js 模块解析过程匹配的算法，包括对 ES6 模块的支持。
- target：指定 ECMAScript 版本，即（编译后的）代码所在的语言环境，比如`es2021`。
- rootDir：TypeScript 源文件所在目录。
- outDir：编译后的文件所在目录。

- noImplicitReturns：函数必须有 return 语句。
- noFallthroughCasesInSwitch：switch 的 case 代码块中必须有 break 语句。
- allowUnreachableCode：发现有运行不到的代码时报错。
- allowUnusedLabels：发现没有使用的代码标签时报错。

### rootDirs

rootDirs编译选项能够使用不同的目录创建出一个虚拟目录，在使用时就好像这些目录被合并成了一个目录一样。在解析相对模块导入时，编译器会在rootDirs编译选项构建出来的虚拟目录中进行搜索。

rootDirs编译选项需要在“tsconfig.json”配置文件中设置，它的值是由路径构成的数组。

```typescript
{
    "compilerOptions": {
        "rootDirs": ["bar", "foo"]
    }
}
```

此例中的rootDirs创建了一个虚拟目录，它包含了“C:\app\bar”和“C:\app\foo”目录下的内容。

### skipLibCheck

跳过`.d.ts`类型声明文件的类型检查。一个原因是项目可能安装了同一个依赖的两个版本，两个版本的类型声明文件会造成冲突。

关闭类型声明文件的检查，可以加快编译速度。

```javascript
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

### strict

strict 用来打开严格模式，默认是关闭的。

```javascript
{
    "compilerOptions": {
        "strict": true
    }
}

// 等同于
{
     "compilerOptions": {
         "noImplicitAny": true,
         "strictNullChecks": true,
         "strictFunctionTypes": true,
        "strictBindCallApply": true,
        "strictPropertyInitialization": true,
        "noImplicitThis": true,
        "alwaysStrict": true
    }
}
```

打开 strict 的时候，也可以关闭其中一项。

```json
{
  "strict": true,
  "alwaysStrict": false
}
```

### strictBindCallApply

“Function.prototype.call”“Function.prototype.bind”“Function.prototype.apply”是JavaScript语言中函数对象上的内置方法。这三个方法都能够绑定函数调用时的this值。

如果没有启用“--strictBindCallApply”编译选项，那么编译器不会对以上三个内置方法进行类型检查，它们的类型都是`any`。虽然函数声明f中定义了this的类型以及参数x和y的类型，但是传入任何类型的实际参数都不会产生编译错误。

```typescript
/**
 * --strictBindCallApply=false
 */
function f(this: { name: string }, x: number, y: number) {
    console.log(this.name);
    console.log(x + y);
}

// 下列语句均没有编译错误
f.apply({}, ['param']);
f.call({}, 'param');
f.bind({})('param');
```

如果启用了“--strictBindCallApply”编译选项，那么编译器将对以上三个内置方法的this类型以及参数类型进行严格的类型检查。

```typescript
/**
 * --strictBindCallApply=true
 */
function f(this: Window, str: string) {
    return this.alert(str);
}

f.call(document, 'foo');
//     ~~~~~~~~
//     编译错误！'document' 类型的值不能赋值给 'window' 类型的参数

f.call(window, false);
//             ~~~~~
//             编译错误！'false' 类型的值不能赋值给 'string' 类型的参数
```

### strictFunctionTypes

该编译选项用于配置编译器对函数类型的类型检查规则。

对函数的参数类型进行更严格的检查。如果函数B的参数是函数A参数的子类型，那么函数B不能当作函数A的参数。

```typescript
function checkOnNumber(containsA: (input: number | string) => boolean) {
return containsA(1337);
}

function stringContainsA(input: string) {
return !!input.match(/a/i);
}

// 报错
checkOnNumber(stringContainsA);
```

如果启用了“--strictFunctionTypes”编译选项，那么函数参数类型与函数类型之间是逆变关系。

如果禁用了“--strictFunctionTypes”编译选项，那么函数参数类型与函数类型之间是相对宽松的双变关系。

不论是否启用了“--strictFunctionTypes”编译选项，函数返回值类型与函数类型之间始终是协变关系。

### strictNullChecks

TypeScript 默认允许空值类型赋值给非空值类型。启用“--strictNullChecks”编译选项，将不再允许。。

```bash
let value: string;
value = "abc123"; // Always ok

// 报错
value = null;
```

这个编译选项可以防止 JavaScript 的大部分`undefined is not an object`错误，即避免了调用对象的属性或方法时，该对象可能是`undefined`或`null`。

### strictPropertyInitialization

该编译选项用于配置编译器对类属性的初始化检查。

`--strictPropertyInitialization`选项表示每个实例属性都必须初始化，包括以下几种情况。

- 设为 undefined 类型
- 显式初始化
- 构造函数中赋值

```typescript
class User {
  // 报错，属性 username 没有初始化
  username: string;
}

// 解决方法一
class User {
  username = "n/a";
}

// 解决方法二
class User {
  username: string | undefined;
}

// 解决方法三
class User {
  username: string;

  constructor(username: string) {
    this.username = username;
  }
}
// 或者
class User {
  constructor(public username: string) {}
}

// 解决方法四：赋值断言 
class User {
  username!: string;

  constructor(username: string) {
    this.initialize(username);
  }

  private initialize(username: string) {
    this.username = username;
  }
}
```

如果使用 TypeScript 无法识别的方式，进行初始化，就要使用赋值断言。

```typescript
class Point {
  x!: number; // (A)
  y!: number; // (B)
  constructor() {
    this.initProperties();
  }
  initProperties() {
    this.x = 0;
    this.y = 0;
  }
}
```

它是`--strict`选项的一部分。

注意，使用该属性的前提是，必须设置`--strictNullChecks`。


如果启用了“--strictPropertyInitialization”编译选项，那么当类的属性没有进行初始化时将产生编译错误。类的属性既可以在声明时直接初始化，例如下例中的属性x，也可以在构造函数中初始化，例如下例中的属性y。如果一个属性没有使用这两种方式之一进行初始化，那么会产生编译错误

```typescript
/**
 * -- strictPropertyInitialization=true
 */
class Point {
    x: number = 0;

    y: number;

    z: number;  // 编译错误！属性 'z' 没有初始值，也没有在构造函数中初始化

    constructor() {
        this.y = 0;
    }
}
```

若没有启用“--strictPropertyInitialization”编译选项，那么上例中的代码不会产生编译错误。也就是说，允许未初始化的属性z存在。

使用该编译选项时需要注意一种特殊情况，有时候我们会在构造函数中调用其他方法来初始化类的属性，而不是在构造函数中直接进行初始化。目前，编译器无法识别出这种情况，依旧会认为类的属性没有被初始化，进而产生编译错误。我们可以使用“!”类型断言来解决这个问题。

```typescript
/**
 * -- strictPropertyInitialization=true
 */
class Point {
    x: number;  // 编译错误：属性 'x' 没有初始值，也没有在构造函数中初始化

    y!: number; // 正确

    constructor() {
        this.initX();
        this.initY();
    }

    private initX() {
        this.x = 0;
    }

    private initY() {
        this.y = 0;
    }
}
```

### target

`target`参数的值为字符串，指定编译出来的 JavaScript 代码的版本。

注意，如果编译的目标版本过老，比如`"target": "es3"`，有些语法可能无法编译，`tsc`命令会报错。

### traceResolution

在启用了“--traceResolution”编译选项后，编译器会打印出模块解析的具体步骤。

“tsconfig.json”配置文件中使用traceResolution属性来设置。

```typescript
{
    "compilerOptions": {
        "traceResolution": true
    }
}
```

### useUnknownInCatchVariables

抛出的错误不一定是 Error 对象实例，所以`catch`语句默认的参数类型是 any。

```typescript
try {
  someExternalFunction();
} catch (error) {
  error; // Default type: any
}
```

打开这个选项以后，抛出的错误将是`unknown`类型。

```typescript
try {
  someExternalFunction();
} catch (error: unknown) {
  error; // Type: unknown
}
```

### watch

`"watch`参数的值为布尔值，如果设为`true`，就会监听 TypeScript 脚本，一旦有变动，就自动重新编译。

## allowSyntheticDefaultImports

The allowSyntheticDefaultImports compiler option informs the type system that ECMAScript modules may default import from files that are otherwise incompatible
CommonJS namespace exports.

It defaults to true only if either of the following is true:

• module is "system" (an older, rarely used module format not covered in this
book).
• esModuleInterop is true and module is not an ECMAScript modules format
such as "es2015" or "esnext".

## esModuleInterop

The esModuleInterop configuration option adds a small amount of logic to Java‐
Script code emitted by TypeScript when module is not an ECMAScript module.

## isolatedModules

Enabling the isolatedModules compiler tells TypeScript to report an error on any instance of a syntax that is likely to cause issues in those transpilers（比如 Babel 每次只能转一个文件）:

## composite

这个设置允许大型项目的不同文件，使用不同的 tsconfig.json。

条件是 declaration 设置必须打开。

```json
// core/tsconfig.json
{
"compilerOptions": {
"declaration": true
},
"composite": true
}
```

它必须与`references`配合使用。

```json
{
"files": [],
"references": [
{ "path": "./packages/core" },
{ "path": "./packages/shell" }
]
}
```

`package.json`里面使用`--build`选项。根据文件是否改动，判断是否要重新构建。

```json
{
  "scripts": {
    "build": "tsc -b"
  }
}
```

## exclude

`exclude`属性是一个数组，必须与`include`属性一起使用，用来从编译列表中去除指定的文件。它也支持使用与`include`属性相同的通配符。

```typescript
{
    "include": ["**/*"],
    "exclude": ["**/*.spec.ts"]
}
```

## extends

`tsconfig.json`可以继承另一个`tsconfig.json`文件的配置。

如果一个项目有多个配置，可以把共同的配置写成`tsconfig.base.json`，其他的配置文件继承该文件，这样便于维护和修改。

`extends`属性用来指定所要继承的配置文件。它可以是本地文件。

```json
{
  "extends": "../tsconfig.base.json"
}
```

如果`extends`属性指定的路径不是以`./`或`../`开头，那么编译器将在`node_modules`目录下查找指定的配置文件。

`extends`属性也可以继承已发布的 npm 模块里面的 tsconfig 文件。

```json
{
  "extends": "@tsconfig/node12/tsconfig.json"
}
```

`extends`指定的依赖会先加载，然后加载当前配置。如果当前配置与继承的配置有重名的属性，前者会覆盖后者。

## files

`files`属性指定编译的文件列表。如果有一个文件不存在，就会报错。

一个数组，指定所要编译的文件。数组中排在前面的文件，会先编译。

```javascript
{
  "files": ["a.ts", "b.ts"]
}
```

该属性必须逐一列出文件，不支持文件匹配。如果文件较多，建议使用`include`和`exclude`属性。

## include

`include`属性指定所要编译的文件列表，既支持逐一列出文件，也支持通配符。文件位置相对于当前配置文件而定。

```typescript
{
  "include": ["src/**/*", "tests/**/*"]
}
```

`include`属性支持三种通配符。

- `?`：指代单个字符
- `*`：指代任意字符，不含路径分隔符
- `**`：指定任意目录层级。

如果不指定文件后缀名，默认包括`.ts`、`.tsx`和`.d.ts`文件。如果打开了`allowJs`，那么还包括`.js`和`.jsx`。

## inlineSources

`--inlineSources true`生成的 SourceMap 文件里面包含了 TypeScript 源码，即两者在同一个文件里面。

使用这个参数的前提是打开了 sourceMap 属性。

## lib

`lib`: TypeScript 应该注意哪些平台特性？可能性包括 ECMAScript 标准库和浏览器的 DOM。

“--lib”编译选项与“/// <reference lib="" />”三斜线指令有着相同的作用，都是用来引用语言内置的某个声明文件。

如果将“--target”设置为“ES6”，但是我们想使用ES2017环境中才开始支持的“pad-Start()”函数。那么，我们就需要引用内置的“lib.es2017.string.d.ts”声明文件，否则编译器将产生编译错误。

```javascript
{
    "compilerOptions": {
        "target": "ES6",
        "lib": ["ES6", "ES2017.String"]
    }
}
```

上例中，我们不但要传入“ES2017.String”，还要传入“ES6”，否则编译器将仅包含“ES2017.String”这一个内置声明文件，

使用“/// <reference lib="" />”三斜线指令，示例如下：

```typescript
/// <reference lib="ES2017.String" />
```

需要注意的是，在将“lib.es2017.string.d.ts”内置声明文件添加到编译文件列表后，虽然编译器允许使用“padStart()”方法，但是实际的JavaScript运行环境可能不支持该方法。因为该方法是在ES2017标准中定义的，而JavaScript运行环境可能仍处于一个较旧的版本，因此不支持这个新方法。这样就会导致程序可以成功地编译，但是在运行时出错，因为找不到“padStart()”方法的定义。

## module

`module`：指定编译输出的格式。

## outDir

`outDir`：字符串，编译结果的存放位置。

## references

`references`属性的值是成员为对象的数组，适合某些项目依赖于另一个项目的情况，用来设置需要引用的工程。

```javascript
{
  "references": [
    { "path": "../pkg1" },
    { "path": "../pkg2/tsconfig.json" }
    ]
}
```

其中，`path`既可以指向含有`tsconfig.json`的目录，也可以直接指向另一个配置文件。

同时，引用的项目的`tsconfig.json`必须启用`composite`属性。只要启用这个属性，就会自动启用`declaration`属性。

```javascript
{
    "compilerOptions": {
        "composite": true,
        "declarationMap": true
    }
}
```

## rootDir

`rootDir`：字符串，表示 TypeScript 脚本文件的位置。

## sourceMap

`--sourceMap true`生成 sourcemap 文件。

## target

`target`: 字符串，编译所针对的 ECMAScript 的目标版本。

## typeRoots

“--typeRoots”编译选项用来设置声明文件的根目录。当配置了“--typeRoots”编译选项时，只有该选项指定的目录下的声明文件会被添加到编译文件列表，而“node_modules/@types”目录下的声明文件将不再被默认添加到编译文件列表。

```typescript
{
    "compilerOptions": {
        "listFiles": true,
        "typeRoots": ["./typings"]
    }
}

{
    "compilerOptions": {
        "listFiles": true,
        "typeRoots": [
            "./node_modules/@types",
            "./typings"
        ]
    }
}
```

## types

types”编译选项也能够用来指定使用的声明文件。“--typeRoots”编译选项配置的是含有声明文件的目录，而“--types”编译选项则配置的是具体的声明文件。

```javascript
{
    "compilerOptions": {
        "listFiles": true,
        "types": ["jquery"]
    }
}
```

## 参考链接

- [Strict Property Initialization in TypeScript](https://mariusschulz.com/blog/strict-property-initialization-in-typescript), Marius Schulz