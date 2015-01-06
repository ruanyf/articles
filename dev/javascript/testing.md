# JavaScript测试

## 概述

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
