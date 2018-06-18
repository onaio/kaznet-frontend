import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import TasksList from './containers/tasks/TasksList';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <nav>
            <NavLink to="/" activeClassName="selected">Home</NavLink>
            <NavLink to="/tasks" activeClassName="selected">Tasks</NavLink>
          </nav>
        </header>
        <Switch>
          <Route path="/tasks" component={TasksList}/>
          <Route exact path="/" component={Home}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default App;
