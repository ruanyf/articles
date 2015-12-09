# JavaScript测试

## 概述

Web应用程序越来越复杂，这意味着有更多的可能出错。测试是帮助我们提高代码质量、降低错误的最好方法和工具之一。

### 单元测试

单元测试（unit testing）指的是以模块为单位，对软件进行测试。通常来说，单元（unit）指的就是一个纯粹的函数，只要输入不变，必定返回同样的输出。

单元测试通常采取断言（assertion）的形式，也就是测试某个功能的返回结果，是否与预期结果一致。如果与预期不一致，就表示测试失败。

单元测试是函数正常工作、不出错的最基本、最有效的方法之一。 每一个单元测试发出一个特定的输入到所要测试的函数，看看函数是否返回预期的输出，或者采取了预期的行动。单元测试证明了所测试的代码行为符合预期。

单元测试有助于代码的模块化，因此有助于长期的重用。因为有了测试，你就知道代码是可靠的，可以按照预期运行。从这个角度说，测试可以节省开发时间。单元测试的另一个好处是，有了测试，就等于就有了代码功能的文档，有助于其他开发者了解代码的意图。

单元测试应该避免依赖性问题，比如不存取数据库、不访问网络等等，而是使用工具虚拟出运行环境。这种虚拟使得测试成本最小化，不用花大力气搭建各种测试环境。

单元测试的步骤

1. 搭建测试环境
1. 触发测试
1. 验证结果是否正确
1. 还原被修改的环境

单元测试需要用到测试框架，常用的有[Mocha](http://mochajs.org/)和[QUnit](http://qunitjs.com/)。其他需要用到的工具还有下面一些。

- 断言库：Expect.js等
- mock库：Sinon.js等
- 覆盖率测试工具：istanbul

### 集成测试（Integration test）

集成测试指的是多个部分在一起测试，比如在一个测试数据库上，测试数据库连接模块。

### 功能测试（Functional test）

功能测试指的是，自动测试整个应用程序的某个功能，比如使用Selenium工具自动打开浏览器运行程序。

### TDD

TDD是测试驱动型开发（Test-Driven Development）的缩写，指的是先写好测试，然后再根据测试完成开发。使用这种开发方式，会有很高的测试覆盖率。

TDD的开发步骤如下。

- 先写一个测试。
- 写出最小数量的代码，使其能够通过测试。
- 优化代码。
- 重复前面三步。

TDD开发的测试覆盖率通常在90%以上，这意味着维护代码和新增特性会非常容易。因为测试保证了你可以信任这些代码，修改它们不会破坏其他代码的运行。

### BDD

BDD是行为驱动开发（Behavior-Driven Development）的缩写，指的是写出优秀测试的最佳实践的总称。它应该与TDD和单元测试一起配合使用。

BDD认为，不应该针对代码的实现细节写测试，而是要针对行为写测试。请看下面测试计数器是否加1的例子。

```javascript

suite('Counter', function() {
  test('tick increases count to 1', function() {
    var counter = new Counter();
    counter.tick();
    assert.equal(counter.count, 1);
  });
});

```

上面代码测试的是Counter的内部实现，即Counter实例的默认值为0，调用tick方法后增加为1。

BDD测试的是行为，即应该怎样运行。

```javascript
describe('Counter', function() {
  it('should increase count by 1 after calling tick', function() {
    var counter = new Counter();
    var expectedCount = counter.count + 1;
      counter.tick();
    assert.equal(counter.count, expectedCount);
  });
});
```

总结一下，就是TDD告诉你何时写测试，何时写代码，BDD告诉你如何写测试，两者应该结合起来。

### QUnit

QUnit的作者就是jQuery的作者，从2008年创立，最早只能在浏览器中运行。

QUint自带断言库（assert对象），所以没有必要使用外部的断言库。

```javascript

QUnit.test("hello test", function(assert) {
  assert.ok(1 == "1", "Passed!");
});

```

## 断言的三种风格

assert、expext、should是断言的三种风格。

```javascript

   // with an assert style
   assert.equal(event.detail.item, '(item).);

   // or an expect style
   expect(event.detail.item).to.equal('(item)');

   // or should style
   event.detail.item.should.equal('(item)');
   done();
```

## Chai.js

### assert风格

```javascript

var assert = require('chai').assert
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

assert.typeOf(foo, 'string', 'foo is a string');
assert.equal(foo, 'bar', 'foo equal `bar`');
assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');

```

上面代码中，assert方法的最后一个参数是错误提示信息，只有测试没有通过时，才会显示。

### expect风格

```javascript

var expect = require('chai').expect
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.length(3);
expect(beverages).to.have.property('tea').with.length(3);

```

显示的错误提示如下。

```javascript

var answer = 43;

// AssertionError: expected 43 to equal 42.
expect(answer).to.equal(42); 

// AssertionError: topic [answer]: expected 43 to equal 42.
expect(answer, 'topic [answer]').to.equal(42);

```

Expect.js的例子。

```javascript

expect({}).to.be.an('object');
expect([1,2,3]).to.contain(2);
expect(['a','b','c']).to.eql(['a', 'b', 'c']);

```

### should风格

```javascript

var should = require('chai').should() //actually call the the function
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.length(3);
beverages.should.have.property('tea').with.length(3);

```

## 参考链接

- Jon Bretman, [Unit Testing JavaScript](http://developers.lyst.com/javascript/testing/2014/03/03/javascript-unit-testing/)
- Jani Hartikainen, [What’s the difference between Unit Testing, TDD and BDD?](http://codeutopia.net/blog/2015/03/01/unit-testing-tdd-and-bdd/)
