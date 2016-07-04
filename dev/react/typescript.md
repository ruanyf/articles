# TypeScript的用法

## 基本用法

```bash
$ npm install --global typescript
```

使用TypeScript编写的脚本，后缀名为`.ts`。`tsc`命令会将TS脚本，转为正常的JavaScript脚本程序。

```bash
# 在当前目录生成 example.js
$ tsc example.ts
```

## 基本概念

TypeScript 提供9种数据类型。

- Boolean
- Number
- String
- Array
- Tuple
- Enum
- Any
- Void
- Function

定义变量。

```javascript
// 定义基本类型的值
const lie : boolean = false;
const pi : number = 3.14159;
const tree_of_knowledge : string = "Yggdrasil";

// 定义数组有两种写法
const divine_lovers : string[] = ["Zeus", "Aphrodite"];
const digits : Array<number> = [143219876, 112347890];
```

Tuple类似于数组，但是成员数量是已知的，`[(Item Type), . . . , (Item Type)]`。

```javascript
let date_triplet : [number, number, number];
date_triplet = [31, 6, 2016];

let athena : [string, number];
athena = ['Athena', 9386];
var name : string = athena[0];
const age : number = athena[1];
```

Enums是一个常量集合。创建一个Enum，就创建了一个数据的新类型。

```javascript
enum Color { Red, Green, Blue };
const red : Color = Color.Red;
console.log(Color[0]); // 'Red'

// TypeScript允许指定起始序号
enum RomanceLanguages { Spanish = 1, French, Italian, Romanian, Portuguese };
console.log(RomanceLanguages[4]); // 'Romanian'
console.log(RomanceLanguages[0]); // undefined
```

Any类型表示接受任何值。

```javascript
let mystery : any = 4; // number
mystery = "four"; // string -- no error

const not_only_strings : any[] = [];
not_only_strings.push("This Works!")
not_only_strings.push(42); // This does too.
```

Void类型只能接受undefined和null作为值，主要用来标记不返回任何值的函数返回值的类型。

```javascript
let the_void : void = undefined;
the_void = null;

the_void = "nothing"; // Error
```

Function的声明。

```javascript
function capitalizeName (name : string) : string {
  return name.toUpperCase();
}

let multiply : (first : number, second : number) => number;
multiply = function (first, second) {
  return first * second;
}

let multiplyFirst : ( first : number) => ((second : number) => number);
multiplyFirst = function (first) {
  return function (num) {
    return first * num;
  }
}
```

## Class

下面的代码在TypeScript编译时会报错。

```javascript
class ListComponent {
  constructor () {
    this.things = [];
  }
}
```

TypeScript规定，当通过`this`，为实例分配属性时，必须添加属性定义。

```javascript
class ListComponent {
  things : Array<ListItem>; // Or -- things : ListItem[];
  constructor () {
    this.things = [];
  }
}
```

实例的属性还可以用`public`或`private`修饰。

```javascript
class ListComponent {
  public things : Array<ListItem>; // Or -- things : ListItem[];
  constructor () {
    this.things = [];
  }
}

class Person {
    constructor (
      public first_name : string,
      public last_name : last_name
    ) { }
}

// 等同于

class Person {
  public first_name : string;
  public last_name : string;
  constructor (
    first_name : string,
    last_name : last_name
  ) { }
}
```

`private`的例子。

```javascript
class ListComponent {
  private _things : Array<ListItem>;
  constructor () {
    this._things = [];
  }
  get things () : Array<ListItem> { return this._things; }
}
```

TypeScript的继承与ES6的继承是一致的。

```javascript
class CompletedListItem extends ListItem {
    completed : boolean;
    constructor (name : string) {
        super(name);
        this.completed = true;
    }
}
```

Interface用来定义和描述Class。

```javascript
interface User {
    name : string;
    email : string;
}

class RegisteredUser implements User {
  constructor (
    public name : string,
    public email : string
  ) { }
}
```

属性名后面如果有问号，就表示可以不部署。

```javascript
interface User {
    name : string;
    email : string;
    avatar? : Object;
}

// 指定必须部署的方法
interface User {
  // PROPERTIES
    name : string;
    email : string;
    avatar? : Object;

  // API
  print () : void;
}
```

## 参考链接

- Peleke Sengstacke, [From JavaScript to TypeScript, Pt. IIA: Using Classes, Interfaces, & Mixins](https://scotch.io/tutorials/from-javascript-to-typescript-pt-iia-using-classes-interfaces-mixins)
