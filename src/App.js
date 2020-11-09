import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Home from './Views/Home';
import About from './Views/About';
import Login from './Views/Login';
import Signup from './Views/Signup';
import Unitview from './Views/Unitview';
import Temperature from './Views/Temperature';
import Addnew from './Views/Addnew';
import Settings from './Views/Settings';


class App extends React.Component {
  state = {
    units: [
        {
            unit_id: 1,
            nickname: 'Unit 1',
            location: 'Kitchen',
            supragarden: true,
            last_watered: null,
            watering_frequency: 3,
            name: 'what',
            data_source: 'abc123',
            plants: 1,
            owner: 1,
            shared_access: 1,
            stream_url: '123abc',
            images: [
                {
                    image_url: '../Views/flowerspic.jpg',
                    date_uploaded: 2020-11-1,
                },
            ],
        },
        {
           unit_id: 2,
           nickname: 'Unit 2',
           location: 'Kerava',
           supragarden: false,
           last_watered: 2020-7-1,
           watering_frequency: 15,
           name: 'what',
           data_source: 'abc123',
           plants: 1,
           owner: 1,
           shared_access: 1,
           stream_url: '123abc',
           images: [],
       }
    ]
}

  
  render () {
    return (
      <div className="App">
        <div className='container'>
          
          
          
  
          <Router>
  
            <Switch>
              <Route exact path='/' ><Home units={this.state.units} /></Route>
              <Route path='/about'><About /></Route>
              <Route path='/login'><Login /></Route>
              <Route path='/signup'><Signup /></Route>
              <Route exact path='/unit/:unitid'><Unitview units={this.state.units} /></Route>
              <Route path='/unit/temperature/1'><Temperature units={this.state.units} /></Route>
              <Route path='/addnew'><Addnew /></Route>
              <Route path='/settings'><Settings /></Route>
  
            </Switch>
  
            
          </Router>
  
          
        </div>
      </div>
    );
  }
  
  
  
}

export default App;
