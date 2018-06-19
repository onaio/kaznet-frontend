import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown';
import {
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


import './App.css';
import Home from './components/Home';
import Header from './components/page/Header';
import NoMatch from './components/NoMatch';
import TasksList from './containers/tasks/TasksList';

fontawesome.library.add(faSearch, faCaretDown);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
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
            <div>
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
            </div>
          </Container>
        </main>
      </div>
    );
  }
}

export default App;
