// Renders the main App
import React, { Component } from "react";
import { Route, Switch } from "react-router";
import fontawesome from "@fortawesome/fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";
import faClone from "@fortawesome/fontawesome-free-solid/faClone";
import faCaretDown from "@fortawesome/fontawesome-free-solid/faCaretDown";
import { Container, Row, Col } from "reactstrap";
import moment from "moment";

import "./App.css";

import Home from "./components/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/page/Header";
import NoMatch from "./components/NoMatch";

import TasksList from "./containers/tasks/TasksList";
<<<<<<< HEAD

import FormView from "./components/FormView";
import TaskForm from "./containers/tasks/TaskForm";
=======
import TasksDetail from "./containers/tasks/TasksDetail";
>>>>>>> Add Route for TasksDetail
import TitleSection from "./containers/global/TitleSection";
import UsersList from "./containers/users/UsersList";
import LocationsList from "./containers/locations/LocationsList";
import ClientsList from "./containers/clients/ClientsList";

moment.updateLocale(moment.locale(), { invalidDate: "" });
fontawesome.library.add(faSearch, faCaretDown, faClone);
moment.updateLocale(moment.locale(), { invalidDate: "" });

class App extends Component {
  render() {
    const TaskFormView = () => <FormView form={TaskForm} />;
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
                          component={TaskFormView}
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
                          path="/tasks/:id"
                          component={TasksDetail}
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
