var React = require('react');
var ReactDOM = require('react-dom');
var Acar = require('./Acar');

var App = React.createClass({
  render: function () {
    return (
      <div id='App'>
        App
        <Acar />
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
