import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './Views/Home';
import About from './Views/About';
import Login from './Views/Login';
import Signup from './Views/Signup';
import Unitview from './Views/Unitview';
import Temperature from './Views/Temperature';
import Addnew from './Views/Addnew';
import Settings from './Views/Settings';

import Graph from './Views/Graph';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      units: []
    }
  }

  // set the user in the state
  setUser = (user) => {
    this.setState({ user });
  }
  
  render () {
    return (
      <div className="App">
        <div className='container'>

          <Router basename=''>
            <Switch>
              <Route exact path='/' render={(props) => (
                <Login {...props} state={this.state} setUser={this.setUser} />
              )}></Route>
              <Route path='/about' render={(props) => (
                <About {...props} />
              )}></Route>
              <Route path='/home' render={(props) => (
                <Home {...props} user={this.state.user} units={this.state.units} />
              )}></Route>
              <Route path='/signup' render={(props) => (
                <Signup {...props} />
              )}></Route>
              <Route exact path='/unit/:unitid' render={(props) => (
                <Unitview {...props} user={this.state.user} />
              )}></Route>
              <Route path='/unit/data/:id' render={(props) => (
                <Temperature {...props} units={this.state.units} />
              )}></Route>
              <Route path='/addnew' render={(props) => (
                <Addnew {...props} />
              )}></Route>
              <Route path='/graph' render={(props) => (
                <Graph {...props} />
              )}></Route>
              <Route path='/settings' render={(props) => (
                <Settings {...props} />
              )}></Route>
  
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
