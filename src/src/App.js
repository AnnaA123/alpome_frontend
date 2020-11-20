import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Home from './Views/Home';
import About from './Views/About';
import Login from './Views/Login';
import Signup from './Views/Signup';
import Unitview from './Views/Unitview';
import Temperature from './Views/StatsViews/Temperature';
import Addnew from './Views/Addnew';
import Settings from './Views/Settings';

//test
import TestPage from './components/content/TestPage';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      units: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  // set the user in the state
  setUser = (user) => {
    this.setState({ user });
    console.log('setuser state', this.state.user);
    
  }
  //test
  handleClick(event) {
    event.preventDefault();
    console.log(this.state);
    console.log('users id: ' + this.state.user.user_id);
}
  
  render () {
    return (
      <div className="App">
        <div className='container'>
          
          
          
  
          <Router basename='/alpome'>
  
            <Switch>
              <Route exact path='/' render={(props) => (
                <Home {...props} user={this.state.user} units={this.state.units} />
              )}></Route>
              <Route path='/about' render={(props) => (
                <About {...props} />
              )}></Route>
              <Route path='/login' render={(props) => (
                <Login {...props} state={this.state} setUser={this.setUser} />
              )}></Route>
              <Route path='/signup' render={(props) => (
                <Signup {...props} />
              )}></Route>
              <Route exact path='/unit/:unitid' render={(props) => (
                <Unitview {...props} user={this.state.user} />
              )}></Route>
              <Route path='/unit/temperature/:id' render={(props) => (
                <Temperature {...props} />
              )}></Route>
              <Route path='/addnew' render={(props) => (
                <Addnew {...props} />
              )}></Route>
              <Route path='/settings' render={(props) => (
                <Settings {...props} />
              )}></Route>

              <Route path='/test8437586490743385891029748' render={(props) => (
                <TestPage {...props} />
              )}></Route>
  
            </Switch>
            
          </Router>
  
          
        </div>
      </div>
    );
  }
  
  
  
}

export default App;
