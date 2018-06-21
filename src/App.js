// Renders the main App
import React, { Component } from "react";
import { Route, Switch } from "react-router";
import fontawesome from "@fortawesome/fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";
import faCaretDown from "@fortawesome/fontawesome-free-solid/faCaretDown";
import { Container, Row, Col } from "reactstrap";
import moment from "moment";

import "./App.css";

import Home from "./components/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/page/Header";
import NoMatch from "./components/NoMatch";

import TasksList from "./containers/tasks/TasksList";
import TitleSection from "./containers/global/TitleSection";
import UsersList from "./containers/users/UsersList";

moment.updateLocale(moment.locale(), { invalidDate: "" });
fontawesome.library.add(faSearch, faCaretDown);
moment.updateLocale(moment.locale(), { invalidDate: "" });

class App extends Component {
  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <Header />
          <main role="main" className="kaznet-main">
            <Container fluid>
              <TitleSection />
              <div>
                <section className="page-section">
                  <Row>
                    <Col>
                      <Switch>
                        <Route exact path="/tasks" component={TasksList} />
                        <Route exact path="/users" component={UsersList} />
                        <Route exact path="/" component={Home} />
                        <Route component={NoMatch} />
                      </Switch>
                    </Col>
                  </Row>
                </section>
              </div>
            </Container>
          </main>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
