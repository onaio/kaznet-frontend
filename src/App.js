// Renders the main App
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import fontawesome from '@fortawesome/fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

import './App.css';
import Home from './components/Home';
import Header from './components/page/Header';
import TitleSection from './containers/global/TitleSection';
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
            <TitleSection />
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
