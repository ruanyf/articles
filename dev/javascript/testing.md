# JavaScript测试

## 概述

Web应用程序越来越复杂，这意味着有更多的可能出错。测试是帮助我们提高代码质量、降低错误的最好方法和工具之一。

单元测试（unit testing）指的是以模块为单位，对软件进行测试。通常来说，单元（unit）指的就是一个纯粹的函数，只要输入不变，必定返回同样的输出。

单元测试通常采取断言（assertion）的形式，也就是测试某个功能的返回结果，是否与预期结果一致。如果与预期不一致，就表示测试失败。

单元测试是函数正常工作、不出错的最基本、最有效的方法之一。 Typically, each unit test sends a specific input to a method and verifies that the method returns the expected value, or takes the expected action. Unit tests prove that the code you are testing does in fact do what you expect it to do.

单元测试有助于代码的模块化，因此有助于长期的重用。因为有了测试，你就知道代码是可靠的，可以按照预期运行。从这个角度说，测试可以节省开发时间。单元测试的另一个好处是，有了测试，就等于就有了代码功能的文档，有助于其他开发者了解代码的意图。

单元测试的步骤

- Set up all conditions for testing.
- Call the method (or Trigger) being tested.
- Verify that the results are correct.
- Clean up modified records.

常用的测试框架

- [Mocha](http://mochajs.org/)
- [QUnit](http://qunitjs.com/)

组件

- test runner: Mocha
- 断言库：Expect.js
- mock库：Sinon.js
- 覆盖率测试：istanbul

```javascript

test('defines the "author" property', function() {
  assert.equal(myEl.author, 'Dimitri Glazkov');
});

test('says hello', function() {
  assert.equal(myEl.sayHello(), 'seed-element says, Hello World!');
  var greetings = myEl.sayHello('greetings Earthlings');
  assert.equal(greetings, 'seed-element says, greetings Earthlings');
});

test('fires lasers', function(done) {
  myEl.addEventListener('seed-element-lasers-success', function(event) {
    assert.equal(event.detail.sound, 'Pew pew pew!');
    done();
  });
  myEl.fireLasers();
});

```

test函数指定测试名、测试函数。

assert函数指定测试要求，即断言测试要达到的结果。通常，在一个大的test里面，会有很多assert。为了说明assert的目的，每个assert应该包含一个message。

- assert.equal()
- assert.isTrue()
- assert.isFalse()
- assert(!s.children[0].classList.contains('core-selected'))

### Mocha

Mocha是一款2012年创建的测试框架，主要用于Node环境下的测试，但也可以用于浏览器之中。如果业务逻辑可以与用户互动分开，或者不需要用到DOM或document对象，则单单用Mocha测试就可以了，甚至都不用安装无头浏览器。

Mocha并没有自带断言库，所以需要自己安装一个，比较常见的断言库比如[chai](http://chaijs.com/)。

```javascript

describe("My Unit To Test", function () {
  describe("#myMethod()", function () {
    it("should return the thing I expect", function () {
      assert.equal(1, "1", "Passed!");
    });
  });
});

```

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
