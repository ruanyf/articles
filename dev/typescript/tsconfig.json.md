# tsconfig.json

`tsconfig.json`是 TypeScript 项目的配置文件。

它是一个 JSON 对象，可以只放置一个空对象`{}`。

使用`tsc`命令编译代码时，它会在当前目录和所有父目录里面寻找 tsconfig.json 文件。也可以使用`-p`参数指定`tsconfig.json`所在的目录。

```bash
$ tsc -p ./path-to-project-directory
```

下面是一个简单的 tsconfig.json。

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

## compileOptions

compilerOptions：定制编译器行为。

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

### baseUrl

`baseUrl`参数的值为字符串，指定 TypeScript 源文件目录。

### outDir

`outDir`参数的值为字符串，指定编译产物 JavaScript 文件目录。

### noEmitOnError

`"noEmitOnError`参数的值为布尔值，指定一旦编译报错，就不生成编译产物。

### target

`target`参数的值为字符串，指定编译出来的 JavaScript 代码的版本。

注意，如果编译的目标版本过老，比如`"target": "es3"`，有些语法可能无法编译，`tsc`命令会报错。

### watch

`"watch`参数的值为布尔值，如果设为`true`，就会监听 TypeScript 脚本，一旦有变动，就自动重新编译。

### lib

`lib`参数的值是一个数组，描述项目需要加载的外部类型描述文件。

```javascript
"lib": ["dom", "es2015"]
```

各项解释。

- target：为了支持旧版浏览器，我们希望将 ES5 定位为语言级别。"es2015"如果您不需要支持旧版浏览器，您可以将此设置提高到（或更高）。
- moduleResolution:我们希望 TypeScript 编译器模仿 Node 本身使用的模块解析机制，例如让它自动从 npm 包中获取类型。查看TypeScript 文档中的模块解析章节以获取更多信息。
- module：我们希望编译器发出所有import/export声明和import()表达式不变。稍后我们将让 webpack 打包和拆分我们的代码。
- strict：我们选择严格的类型检查模式来为我们的应用程序获得最高级别的类型安全。我建议您始终设置strict为true. 如果您tsc --init用于创建tsconfig.json文件，则默认启用此设置。
- importHelpers：由于我们将 ES5 定位为语言级别，因此 TypeScript 编译器会在我们使用/时发出一堆辅助函数，例如__awaiter和。为了每个包只发出一次这些帮助函数而不是每次使用一次，我们将指示编译器从包中导入它们。查看TypeScript 2.1：External Helpers Library以获取有关编译器选项的更多信息。__generatorasyncawaittslibimportHelpers

### preserveConstEnums

Enum 命令使用`const`命令修饰时，保留 Enum 结构。

```typescript
{
  "compilerOptions": {

    /* Basic Options */                       
    "target": "es5",                       /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */
    "module": "commonjs",                  /* Specify module code generation: 'commonjs', 'amd', 'system', 'umd' or 'es2015'. */
    "lib": [],                             /* Specify library files to be included in the compilation:  */
    "allowJs": true,                       /* Allow JavaScript files to be compiled. */
    "checkJs": true,                       /* Report errors in .js files. */
    "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    "sourceMap": true,                     /* Generates corresponding '.map' file. */
    "outFile": "./",                       /* Concatenate and emit output to single file. */
    "outDir": "./",                        /* Redirect output structure to the directory. */
    "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    "removeComments": true,                /* Do not emit comments to output. */
    "noEmit": true,                        /* Do not emit outputs. */
    "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */        
    "strict": true,                        /* Enable all strict type-checking options. */
    "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    "strictNullChecks": true,              /* Enable strict null checks. */
    "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */                   
    "noUnusedLocals": true,                /* Report errors on unused locals. */
    "noUnusedParameters": true,            /* Report errors on unused parameters. */
    "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */           
    "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    "typeRoots": [],                       /* List of folders to include type definitions from. */
    "types": [],                           /* Type declaration files to be included in compilation. */
    "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */

    /* Source Map Options */                  
    "sourceRoot": "./",                    /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    "mapRoot": "./",                       /* Specify the location where debugger should locate map files instead of generated locations. */
    "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */                
    "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    "emitDecoratorMetadata": true          /* Enables experimental support for emitting type metadata for decorators. */
  }
}
```

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

### strictPropertyInitialization

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

## extends

`extends`可以指定当前 tsconfig.json 文件，所继承的原始配置文件。

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "target": "es5",
    "module": "es2015"
  },
  "include": ["**/*.ts"]
}
```

## lib

`lib`: TypeScript 应该注意哪些平台特性？可能性包括 ECMAScript 标准库和浏览器的 DOM。

## module

`module`：指定编译输出的格式。

## outDir

`outDir`：字符串，编译结果的存放位置。

## rootDir

`rootDir`：字符串，表示 TypeScript 脚本文件的位置。

## target

`target`: 字符串，编译所针对的 ECMAScript 的目标版本。

## 参考链接

- [Strict Property Initialization in TypeScript](https://mariusschulz.com/blog/strict-property-initialization-in-typescript), Marius Schulz