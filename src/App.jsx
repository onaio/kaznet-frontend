/* eslint-disable import/no-named-as-default */
// Renders the main App
import React from 'react';
import { Route, Switch } from 'react-router';
import fontawesome from '@fortawesome/fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faClone from '@fortawesome/fontawesome-free-solid/faClone';
import faExternalLinkAlt from '@fortawesome/fontawesome-free-solid/faExternalLinkAlt';
import faLaptop from '@fortawesome/fontawesome-free-solid/faLaptop';
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown';
import faFolderOpen from '@fortawesome/fontawesome-free-solid/faFolderOpen';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';
import { Container, Row, Col } from 'reactstrap';
import moment from 'moment';

import './App.scss';

import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/page/Header';
import NoMatch from './components/NoMatch';
import TitleSection from './containers/global/TitleSection';

import TasksList from './containers/tasks/TasksList';
import TaskCreateForm from './containers/tasks/TaskCreateForm';
import TaskEditForm from './containers/tasks/TaskEditForm';
import TasksDetail from './containers/tasks/TasksDetail';
import TaskStatusChange from './containers/tasks/TaskStatusChange';
import TaskDeletion from './containers/tasks/TaskDeletion';
import TaskClone from './containers/tasks/TaskClone';

import UsersList from './containers/users/UsersList';
import UserCreateForm from './containers/users/UserCreateForm';
import UserDetail from './containers/users/UserDetail';
import UserDeletion from './containers/users/UserDeletion';
import UserEditForm from './containers/users/UserEditForm';

import LocationsList from './containers/locations/LocationsList';
import LocationCreateForm from './containers/locations/LocationCreateForm';
import LocationEditForm from './containers/locations/LocationEditForm';
import LocationDetail from './containers/locations/LocationDetail';
import LocationDeletion from './containers/locations/LocationDeletion';

import LocationTypesList from './containers/locationTypes/LocationTypesList';
import LocationTypeCreateForm from './containers/locationTypes/LocationTypeCreateForm';
import LocationTypeEditForm from './containers/locationTypes/LocationTypeEditForm';
import LocationTypeDeletion from './containers/locationTypes/LocationTypeDeletion';

import ClientsList from './containers/clients/ClientsList';
import ClientCreateForm from './containers/clients/ClientCreateForm';
import ClientEditForm from './containers/clients/ClientEditForm';
import ClientDeletion from './containers/clients/ClientDeletion';

import FormsList from './containers/forms/FormsList';

moment.updateLocale(moment.locale(), { invalidDate: '' });
fontawesome.library.add(
  faSearch,
  faCaretDown,
  faClone,
  faExternalLinkAlt,
  faLaptop,
  faFolderOpen,
  faExclamationCircle
);

const App = () => (
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
                    <Route exact path="/tasks/new" component={TaskCreateForm} />
                    <Route exact path="/tasks/:id" component={TasksDetail} />
                    <Route exact path="/tasks/:id/edit" component={TaskEditForm} />
                    <Route exact path="/tasks/:id/status_change" component={TaskStatusChange} />
                    <Route exact path="/tasks:page" component={TasksList} />
                    <Route exact path="/tasks/:id" component={TasksDetail} />
                    <Route exact path="/users" component={UsersList} />
                    <Route exact path="/users:page" component={UsersList} />
                    <Route exact path="/users/new" component={UserCreateForm} />
                    <Route exact path="/users/:id" component={UserDetail} />
                    <Route exact path="/users/:id/delete" component={UserDeletion} />
                    <Route exact path="/users/:id/edit" component={UserEditForm} />
                    <Route exact path="/locations" component={LocationsList} />
                    <Route exact path="/locations:page" component={LocationsList} />
                    <Route exact path="/locations/new" component={LocationCreateForm} />
                    <Route exact path="/locations/:id/edit" component={LocationEditForm} />
                    <Route exact path="/locations/:id" component={LocationDetail} />
                    <Route exact path="/locations/:id/delete" component={LocationDeletion} />
                    <Route exact path="/clients" component={ClientsList} />
                    <Route exact path="/clients/new" component={ClientCreateForm} />
                    <Route exact path="/clients/edit/:id" component={ClientEditForm} />
                    <Route exact path="/clients/:id/delete" component={ClientDeletion} />
                    <Route exact path="/clients:page" component={ClientsList} />
                    <Route exact path="/tasks/:id/delete" component={TaskDeletion} />
                    <Route exact path="/tasks/:id/clone" component={TaskClone} />
                    <Route exact path="/locationTypes" component={LocationTypesList} />
                    <Route exact path="/locationTypes/new" component={LocationTypeCreateForm} />
                    <Route exact path="/locationTypes/edit/:id" component={LocationTypeEditForm} />
                    <Route
                      exact
                      path="/locationTypes/:id/delete"
                      component={LocationTypeDeletion}
                    />
                    <Route exact path="/forms" component={FormsList} />
                    <Route exact path="/forms:page" component={FormsList} />
                    <Route exact path="/" component={TasksList} />
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

export default App;
