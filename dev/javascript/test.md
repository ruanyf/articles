# JavaScript测试

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

