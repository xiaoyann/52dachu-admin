// application's entry

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reducers from 'reducers/index';
import '../css/reset.css';
import '../css/common.scss';

// pages
import Login            from './login/index';
import Sidenav          from './sidenav/index';
import Dashboard        from './dashboard/index';
import ArticleList      from './article/list';
import CategoryList     from './category/list';


const store = createStore(reducers, {}, applyMiddleware(thunk));


class Application extends Component {
  constructor(props) {
    super(props);
    this.state = { logined: true };
    this.handleLogin = this.handleLogin.bind(this);
  }
  
  handleLogin() {
    this.setState({ logined: true });
  }

  render() {
    if (this.state.logined === false) {
      return <Login onLogined={ this.handleLogin } />;
    } else {
      return (
        <div className="container clearfix">
          <Sidenav />
          <div className="content"> { this.props.children } </div>
        </div>
      );
    }
  }
}

render((
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/admin" component={ Application }>
        <IndexRoute component={Dashboard}/>
        <route path="article/list" component={ ArticleList }></route>
        <route path="category/list" component={ CategoryList }></route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));



