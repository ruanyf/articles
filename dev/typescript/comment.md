# 注释指令

TypeScript 接受一些注释指令。

## `// @ts-nocheck`

“// @ts-nocheck”是一个注释指令，如果为JavaScript文件添加该注释，那么相当于告诉编译器不对该JavaScript文件进行类型检查。此外，该指令也可以在TypeScript文件中使用。

```javascript
// @ts-nocheck

const element = document.getElementById(123); // 错误语句
```

上例中，虽然“index.js”存在类型错误，但是编译器不会报错。因为我们使用“// @ts-nocheck”注释指令禁用了对“index.js”文件的类型检查。

## `// @ts-check`

如果一个JavaScript文件中添加了“// @ts-check”注释指令，那么编译器将对该Java-Script文件进行类型检查，不论是否启用了“--checkJs”编译选项。

## `// @ts-ignore`

“// @ts-ignore”注释指令的作用是忽略对某一行代码进行类型检查。当在代码中使用“// @ts-ignore”注释指令时，编译器不会对与该指令相邻的后面一行代码进行类型检查。此外，该指令也可以在TypeScript文件中使用。

## JSDoc

在使用JSDoc时，有以下两个基本要求：

- 代码注释必须以“/**”开始，其中星号（*）的数量必须为两个。若使用了“/*”“/***”或其他形式的多行注释，则JSDoc会忽略该条注释。
- 代码注释与它描述的代码处于相邻的位置，并且注释在上，代码在下。

下例中，使用JSDoc描述了“sayHello”函数能够接受一个string类型的参数。其中，“@param”是一个JSDoc标签，如下所示：

```javascript
/**
 * @param {string} somebody
 */
function sayHello(somebody) {
    alert('Hello ' + somebody);
}
```

TypeScript编译器既能够自动推断出大部分JavaScript代码的类型信息，也能够从JSDoc中提取类型信息。接下来，我们将介绍TypeScript编译器支持的部分JSDoc标签。

### @typedef

“@typedef”标签能够创建自定义类型。通过“@typedef”标签创建的自定义类型等同于TypeScript中的类型别名。

```javascript
/**
 * @typedef {(number | string)} NumberLike
 */
```

此例中，创建了一个名为NumberLike的类型，它是由number类型和string类型构成的联合类型。该类型等同于如下类型别名定义：

```typescript
type NumberLike = string | number;
```

### @type

“@type”标签能够定义变量的类型。

```javascript
/**
 * @type {string}
 */
let a;
```

此例中，定义了变量a的类型为string。

在“@type”标签中可以使用由“@typedef”标签创建的类型。示例如下：

```javascript
/**
 * @typedef {(number | string)} NumberLike
 */

/**
 * @type {NumberLike}
 */
let a = 0;
```

在“@type”标签中允许使用TypeScript中的类型及其语法。示例如下：

```javascript
/**@type {true | false} */
let a;

/** @type {number[]} */
let b;

/** @type {Array<number>} */
let c;

/** @type {{ readonly x: number, y?: string }} */
let d;

/** @type {(s: string, b: boolean) => number} */
let e;
```

### @param

“@param”标签用于定义函数参数类型。

```javascript
/**
 * @param {string}  x - A string param.
 */
function foo(x) {}
```

若函数参数是可选参数，则需要将参数名置于一对中括号“[]”中。示例如下：

```javascript
/**
 * @param {string}  [x] - An optional param.
 */
function foo(x) {}
```

在定义可选参数时，还可以为它指定一个默认值。

```javascript
/**
 * @param {string} [x="bar"] - An optional param
 */
function foo(x) {}
```

此例中，声明了参数x的默认值为字符串bar。

### @return和@returns

“@return”和“@returns”标签的作用相同，两者都用于定义函数返回值类型。

```javascript
/**
 * @return {boolean}
 */
function foo() {
    return true;
}

/**
 * @returns {number}
 */
function bar() {
    return 0;
}
```

### @extends和修饰符

“@extends”标签用于定义继承的基类。“@public”“@protected”“@private”标签分别用于定义类的公有成员、受保护成员和私有成员。“@readonly”标签用于定义只读成员。

```javascript
class Base {
    /**
     * @public
     * @readonly
     */
    x = 0;

    /**
     *  @protected
     */
    y = 0;
}

/**
 * @extends {Base}
 */
class Derived extends Base {
    /**
     * @private
     */
    z = 0;
}
```
