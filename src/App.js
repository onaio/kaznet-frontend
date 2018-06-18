import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Row,
  Col
} from 'reactstrap';

import profile_image from './images/profile.png'
import './App.css';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import TasksList from './containers/tasks/TasksList';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Container fluid>
            <Navbar dark color="dark" expand="md">
              <NavbarBrand href="/">[Kaznet Logo]</NavbarBrand>
              <NavbarToggler />
              <Collapse navbar>
                <Nav navbar>
                  <NavItem>
                    <NavLink to="/tasks" className="nav-link" activeClassName="active">Tasks</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" className="nav-link" activeClassName="active">Clients</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" className="nav-link" activeClassName="active">Locations</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" className="nav-link" activeClassName="active">Users</NavLink>
                  </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <img src={profile_image} className="img-fluid rounded-circle userprofile-img" alt="profile image" />
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Container>
        </header>
        <main role="main">
          <Container fluid>
            <Row>
              <Col>
                <Switch>
                  <Route exact path="/tasks" component={TasksList}/>
                  <Route exact path="/" component={Home}/>
                  <Route component={NoMatch}/>
                </Switch>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    );
  }
}

export default App;
