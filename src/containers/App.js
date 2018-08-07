import React, { Component } from 'react';
import '../styles/App.css';

import Home from './Home/Index';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="box">index</div>
        <Route path="/" component={Home} />
      </div>
    );
  }
}

export default App;
