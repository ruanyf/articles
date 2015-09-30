# React-Router

安装

```bash
$ npm install react-router
```

基本用法

```jsx
import { Router, Route } from 'react-router';

React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.body);
```

完整的例子。

```jsx
// first we import some components
import { Router, Route, Link } from 'react-router';
// the histories are imported separately for smaller builds
import { history } from 'react-router/lib/HashHistory';
var App = React.createClass({
  render () {
    return (
      <div>
        <h1>App</h1>
        {/* change the <a>s to <Links>s */}
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>

        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    )
  }
});

// Finally we render a `Router` component with some `Route`s, it'll do all
// the fancy routing stuff for us.
React.render((
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="inbox" component={Inbox}/>
    </Route>
  </Router>
), document.body);
```


