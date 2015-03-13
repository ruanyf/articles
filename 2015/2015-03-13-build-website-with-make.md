
# 使用Make构建网站

网站开发正变得越来越专业，涉及到各种各样的工具和流程，迫切需要构建自动化。

所谓“构建自动化”，就是指使用构建工具，自动实现“从源码到网页”的开发流程。这有利于提高开发效率、改善代码质量。

本文介绍如何使用[make命令](www.ruanyifeng.com/blog/2015/02/make.html)，作为网站的构建工具。以下内容既是make语法的详细实例，也是网站构建的实战教程。你完全可以将代码略作修改，拷贝到自己的项目。

![](http://image.beekka.com/blog/2015/bg2015031301.jpg)

（题图：国家考古博物馆，西班牙，摄于2014年8月）

## 一、Make的优点

首先解释一下，为什么要用Make。

目前，网站项目（尤其是Node.js项目）有三种构建方案。

> - 方案一：基于Node.js的专用构建工具（[Grunt](http://gruntjs.com/)、[Gulp](http://gulpjs.com/)、[Brunch](http://brunch.io/)、[Broccoli](https://github.com/broccolijs/broccoli)、[Mimosa](http://mimosa.io/)）
> 
> - 方案二：npm run命令（[教程1](http://substack.net/task_automation_with_npm_run)、[2](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)、[3](http://gon.to/2015/02/26/gulp-is-awesome-but-do-we-really-need-it/)）
> 
> - 方案三：make命令

我觉得，make是大型项目的首选方案。npm run可以认为是make的简化形式，只适用于简单项目，而Grunt、Gulp那样的工具，有很多问题。

**（1）插件问题**

Grunt和Gulp的操作，都由插件完成。即使是文件改名这样简单的任务，都要写插件，相当麻烦。而Make是直接调用命令行，根本不用担心找不到插件。

**（2）兼容性问题**

插件的版本，必须与Grunt和Gulp的版本匹配，还必须与对应的命令行程序匹配。比如，[grunt-contrib-jshint插件](https://github.com/gruntjs/grunt-contrib-jshint)现在是0.11.0版，对应Grunt 0.4.5版和JSHint 2.6.0版。万一Grunt和JSHint升级，而插件没有升级，就有可能出现兼容性问题。Make是直接调用JSHint，不存在这个问题。

**（3）语法问题**

Grunt和Gulp都有自己的语法，并不容易学，尤其是Grunt，语法很罗嗦，很难一眼看出来代码的意图。当然，make也不容易学，但它有复用性，学会了还可以用在其他场合。

**（4）功能问题**

make已经使用了几十年，全世界无数的大项目都用它构建，早就证明非常可靠，各种情况都有办法解决，前人累积的经验和资料也非常丰富。相比之下，Grunt和Gulp的历史都不长，使用范围有限，目前还没有出现它们能做、而make做不到的任务。

基于以上理由，我看好make。

## 二、常见的构建任务

下面是一些常见的网站构建任务。

- 检查语法
- 编译模板
- 转码
- 合并
- 压缩
- 测试
- 删除

这些任务用到 [JSHint](http://jshint.com/)、[handlebars](http://handlebarsjs.com/)、[CoffeeScript](http://coffeescript.org/)、[uglifyjs](http://lisperator.net/uglifyjs/)、[mocha](http://mochajs.org/) 等工具。对应的package.json文件如下。

```javascript
"devDependencies": {
    "coffee-script": "~1.9.1",
    "handlebars": "~3.0.0",
    "jshint": "^2.6.3",
    "mocha": "~2.2.1",
    "uglify-js": "~2.4.17"
}
```

我们来看看，Make 命令怎么完成这些构建任务。

## 三、Makefile的通用配置

开始构建之前，要编写Makefile文件。它是make命令的配置文件。所有任务的构建规则，都写在这个文件（参见[《Make 命令教程》](http://www.ruanyifeng.com/blog/2015/02/make.html)）。

首先，写入两行通用配置。

```bash
PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash
```

上面代码的PATH和SHELL都是BASH变量。它们被重新赋值。

PATH变量重新赋值为，优先在 node_modules/.bin 目录寻找命令。这是因为（当前项目的）node模块，会在 node_modules/.bin 目录设置一个符号链接。PATH变量指向这个目录以后，调用各种命令就不用写路径了。比如，调用JSHint，就不用写 ~/node_modules/.bin/jshint ，只写 jshint 就行了。

SHELL变量指定构建环境使用BASH。

## 四、检查语法错误

第一个任务是，检查源码有没有语法错误。

```bash
js_files = $(shell find ./lib -name '*.js')

lint: $(js_files)
    jshint $?
```

上面代码中，shell函数调用find命令，找出lib目录下所有js文件，保存在变量js_files。然后，就可以用jshint检查这些文件。

使用时调用下面的命令。

```bash
$ make lint
```

##  五、模板编译

第二个任务是编译模板。假定模板都在templates目录，需要编译为build目录下的templates.js文件。

```bash
build/templates.js: templates/*.handlebars
    mkdir -p $(dir $@)
    handlebars templates/*.handlebars > $@

template: build/templates.js
```

上面代码查看build目录是否存在，如果不存在就新建一个。dir函数用于取出构建目标的路径名（build），内置变量$@代表构建目标（build/templates.js）。

使用时调用下面的命令。

```bash
$ make template
```

## 六、Coffee脚本转码

第三个任务是，将CofferScript脚本转为JavaScript脚本。

```bash
source_files := $(wildcard lib/*.coffee)
build_files  := $(source_files:lib/%.coffee=build/%.js)

build/%.js: lib/%.coffee
    coffee -co $(dir $@) $<

coffee:	$(build_files)
```

上面代码中，首先获取所有的Coffee脚本文件，存放在变量source_files，函数wildcard用来扩展通配符。然后，将变量source_files中的coffee文件名，替换成js文件名，即 lib/x.coffee 替换成 build/x.js 。

使用时调用下面的命令。

```bash
$ make coffee
```

## 七、合并文件

使用cat命令，合并多个文件。

```bash

JS_FILES := $(wildcard build/*.js)
OUTPUT := build/bundle.js

concat: $(JS_FILES)
    cat $^ > $(OUTPUT)
```

使用时调用下面的命令。

```bash
$ make concat
```

## 八、压缩JavaScript脚本

将所有JavaScript脚本，压缩为build目录下的app.js。

```bash
app_bundle := build/app.js

$(app_bundle): $(build_files) $(template_js)
    uglifyjs -cmo $@ $^

min: $(app_bundle)
```

使用时调用下面的命令。

```bash
$ make min
```

还有另一种写法，可以另行指定压缩工具。

```bash
UGLIFY ?= uglify

$(app_bundle): $(build_files) $(template_js)
    $(UGLIFY) -cmo $@ $^

```

上面代码将压缩工具uglify放在变量UGLIFY。注意，变量的赋值符是 ?= ，表示这个变量可以被命令行参数覆盖。

调用时这样写。

```bash
$ make UGLIFY=node_modules/.bin/jsmin min
```

上面代码，将jsmin命令给变量UGLIFY，压缩时就会使用jsmin命令。


## 九、删除临时文件

构建结束前，删除所有临时文件。

```bash
clean:
    rm -rf build
```

使用时调用下面的命令。

```bash
$ make clean
```

## 十、测试

假定测试工具是mocha，所有测试用例放在test目录下。

```bash
test: $(app_bundle) $(test_js)
    mocha
```

当脚本和测试用例都存在，上面代码就会执行mocha。

使用时调用下面的命令。

```bash
$ make test
```

## 十一、多任务执行

构建过程需要一次性执行多个任务，可以指定一个多任务目标。

```bash
build: template concat min clean
```

上面代码将build指定为执行模板编译、文件合并、脚本压缩、删除临时文件四个任务。

使用时调用下面的命令。

```bash
$ make build
```

如果这行规则在Makefile的最前面，执行时可以省略目标名。

```bash
$ make
```

通常情况下，make一次执行一个任务。如果任务都是独立的，互相没有依赖关系，可以用参数 -j 指定同时执行多个任务。

```bash
$ make -j build
```

## 十二、声明伪文件

最后，为了防止目标名与现有文件冲突，显式声明哪些目标是伪文件。

```bash
.PHONY: lint template coffee concat min test clean build
```

## 十三、Makefile文件示例

下面是两个简单的Makefile文件，用来补充make命令的其他构建任务。

实例一。

```bash
PROJECT = "My Fancy Node.js project"
 
all: install test server
 
test: ;@echo "Testing ${PROJECT}....."; \
	export NODE_PATH=.; \
	./node_modules/mocha/bin/mocha;
 
install: ;@echo "Installing ${PROJECT}....."; \
	npm install
 
update: ;@echo "Updating ${PROJECT}....."; \
	git pull --rebase; \
	npm install
 
clean : ;
	rm -rf node_modules
  
.PHONY: test server install clean update
```

实例二。

```bash
all: build-js build-css

build-js: 
  browserify -t brfs src/app.js > site/app.js

build-css:
  stylus src/style.styl > site/style.css

.PHONY build-js build-css
```

## 十四、参考链接

- Jess Telford, [Example using Makefile for cloverfield](https://github.com/jesstelford/cloverfield-build-make)
- Oskar Schöldström, [How to use Makefiles in your web projects](http://oxy.fi/2013/02/03/how-to-use-makefiles-in-your-web-projects/)
- James Coglan, [Building JavaScript projects with Make](https://blog.jcoglan.com/2014/02/05/building-javascript-projects-with-make/)
- Rob Ashton, [The joy of make](http://codeofrob.com/entries/the-joy-of-make-at-jsconfeu.html)

（完）