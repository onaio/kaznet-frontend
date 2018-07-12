// Renders the main App
import React, { Component } from "react";
import { Route, Switch } from "react-router";
import fontawesome from "@fortawesome/fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";
import faClone from "@fortawesome/fontawesome-free-solid/faClone";
import faExternalLinkAlt from "@fortawesome/fontawesome-free-solid/faExternalLinkAlt";
import faLaptop from "@fortawesome/fontawesome-free-solid/faLaptop";
import faCaretDown from "@fortawesome/fontawesome-free-solid/faCaretDown";
import faFolderOpen from "@fortawesome/fontawesome-free-solid/faFolderOpen";
import { Container, Row, Col } from "reactstrap";
import moment from "moment";

import "./App.css";

import Home from "./components/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/page/Header";
import NoMatch from "./components/NoMatch";
import TitleSection from "./containers/global/TitleSection";

import TasksList from "./containers/tasks/TasksList";
import TaskCreateForm from "./containers/tasks/TaskCreateForm";
import TaskEditForm from "./containers/tasks/TaskEditForm";
import TasksDetail from "./containers/tasks/TasksDetail";
import TaskStatusChange from "./containers/tasks/TaskStatusChange";
import TaskDeletion from "./containers/tasks/TaskDeletion";
import TaskClone from "./containers/tasks/TaskClone";

import UsersList from "./containers/users/UsersList";

import LocationsList from "./containers/locations/LocationsList";

import ClientsList from "./containers/clients/ClientsList";
import ClientCreateForm from "./containers/clients/ClientCreateForm";
import ClientEditForm from "./containers/clients/ClientEditForm";

moment.updateLocale(moment.locale(), { invalidDate: "" });
fontawesome.library.add(
  faSearch,
  faCaretDown,
  faClone,
  faExternalLinkAlt,
  faLaptop,
  faFolderOpen
);

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
                        <Route
                          exact
                          path="/tasks/new"
                          component={TaskCreateForm}
                        />
                        <Route
                          exact
                          path="/tasks/:id"
                          component={TasksDetail}
                        />
                        <Route
                          exact
                          path="/tasks/:id/edit"
                          component={TaskEditForm}
                        />
                        <Route
                          exact
                          path="/tasks/:id/status_change"
                          component={TaskStatusChange}
                        />
                        <Route exact path="/users" component={UsersList} />
                        <Route
                          exact
                          path="/locations"
                          component={LocationsList}
                        />
                        <Route exact path="/clients" component={ClientsList} />
                        <Route
                          exact
                          path="/clients/new"
                          component={ClientCreateForm}
                        />
                        <Route
                          exact
                          path="/clients/edit/:id"
                          component={ClientEditForm}
                        />
                        <Route
                          exact
                          path="/tasks/:id/delete"
                          component={TaskDeletion}
                        />
                        <Route
                          exact
                          path="/tasks/:id/clone"
                          component={TaskClone}
                        />
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
