import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import reducers from 'reducers/index';

class Application extends Component {
  render() {
    return (
      <div>{ this.props.children }</div>
    );
  }
}

const store = createStore(reducers, undefined, applyMiddleware(thunk));

render((
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ Application }>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
