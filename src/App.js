import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText
} from 'reactstrap';

import profile_image from './images/profile.png'
import './App.css';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import TasksList from './containers/tasks/TasksList';

fontawesome.library.add(faSearch, faCaretDown);

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
                    <img src={profile_image} className="img-fluid rounded-circle userprofile-img" alt="profile" />
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Container>
        </header>
        <main role="main" className="kaznet-main">
          <Container fluid>
            <section className="page-title">
              <Row>
                <Col sm="12" md={{ size: 8, offset: 2 }}>
                  <div>
                    <h1>Page Title</h1>
                    <Row>
                      <Col md="9">
                        <Form>
                          <InputGroup className="search-group">
                            <InputGroupAddon addonType="prepend" className="search-prepend">
                              <InputGroupText className="bg-white border-right-0">
                                <FontAwesomeIcon icon="search" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" bsSize="lg" className="border-left-0" placeholder="Search" aria-label="Search" />
                          </InputGroup>
                        </Form>
                      </Col>
                      <Col md="3">
                        <Button block size="lg" color="primary">+ Add Task</Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </section>
            <section className="page-actions">
              <Row>
                <Col sm="12" md={{ size: 8, offset: 2 }}>
                  <div className="actions-holder">
                    NAME <FontAwesomeIcon icon="caret-down" />
                  </div>
                </Col>
              </Row>
            </section>
            <section className="page-section">
              <Row>
                <Col>
                  <Switch>
                    <Route exact path="/tasks" component={TasksList}/>
                    <Route exact path="/" component={Home}/>
                    <Route component={NoMatch}/>
                  </Switch>
                </Col>
              </Row>
            </section>
          </Container>
        </main>
      </div>
    );
  }
}

export default App;
