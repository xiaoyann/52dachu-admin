import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div>
        <h2>Please login</h2>
        <button onClick={ () => {
          this.props.onLogined()
        } }>登录</button>
      </div>
    );
  }
}