# React 表单校验的基本写法

```javascript
var MyForm = React.createClass({
  render: function(){
    return (
      <ValidationForm ref="form" onSubmit={ this.validates }>
        <Input name="title" validation="required" />
        <Input name="age" validation="required,number" />
        <Input name="email" validation={ value => value.match(/\S+@\S+\.\S+/) } />
      </ValidationForm>
    );
  },
  validates: function(){
    // Use the from API
    if( this.refs.form.validates() ){
      // Handle the form
    }
  }
})
```

https://gist.github.com/arqex/d82335a5fa4d09fa487c#file-formcomponent-js
