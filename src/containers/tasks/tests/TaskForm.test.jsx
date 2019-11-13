// Test TaskForm
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import MockDate from 'mockdate';
import Immutable from 'seamless-immutable';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { TaskForm } from '../TaskForm';
import * as fixtures from '../../../store/tasks/tests/fixtures';
import * as clientFixtures from '../../../store/clients/tests/fixtures';
import * as formFixtures from '../../../store/forms/tests/fixtures';
import * as locationFixtures from '../../../store/locations/tests/fixtures';

const history = createBrowserHistory();

function emptyFunction() {}

describe('containers/task/TaskForm', () => {
  it('renders without crashing', () => {
    shallow(
      <TaskForm
        formActionDispatch={emptyFunction}
        fetchClients={emptyFunction}
        fetchLocations={emptyFunction}
        fetchForms={emptyFunction}
        fetchForm={emptyFunction}
        fetchContentTypes={emptyFunction}
        locationsById={locationFixtures.locationsById}
        clientsById={clientFixtures.clientsById}
        formsById={formFixtures.formsById}
        clientOptions={Immutable(clientFixtures.selectOptions)}
        formOptions={Immutable(formFixtures.selectOptions)}
        locationOptions={Immutable(locationFixtures.selectOptions)}
        initialData={{}}
      />
    );
  });

  it('renders task form correctly', () => {
    MockDate.set('1/2/1986');

    const forms = {
      1: { attributes: { title: 'name' } }
    };

    const wrapper = mount(
      <Router history={history}>
        <TaskForm
          formActionDispatch={emptyFunction}
          fetchClients={emptyFunction}
          fetchLocations={emptyFunction}
          fetchForms={emptyFunction}
          fetchForm={emptyFunction}
          fetchContentTypes={emptyFunction}
          unusedFormsById={forms}
          clientOptions={Immutable(clientFixtures.selectOptions)}
          formOptions={Immutable(formFixtures.selectOptions)}
          locationOptions={Immutable(locationFixtures.selectOptions)}
          clientsById={clientFixtures.clientsById}
          formsById={formFixtures.formsById}
          locationsById={locationFixtures.locationsById}
          initialData={fixtures.TaskFormInitialData}
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders task form correctly when doing an edit', () => {
    MockDate.set('6/11/1985');

    const initialData = {
      name: 'Coconut Quest'
    };

    const forms = {
      1: { attributes: { title: 'name' } }
    };

    const wrapper = mount(
      <Router history={history}>
        <TaskForm
          formActionDispatch={emptyFunction}
          fetchClients={emptyFunction}
          fetchLocations={emptyFunction}
          fetchForms={emptyFunction}
          fetchForm={emptyFunction}
          fetchContentTypes={emptyFunction}
          unusedFormsById={forms}
          clientOptions={Immutable(clientFixtures.selectOptions)}
          formOptions={Immutable(formFixtures.selectOptions)}
          locationOptions={Immutable(locationFixtures.selectOptions)}
          clientsById={clientFixtures.clientsById}
          locationsById={locationFixtures.locationsById}
          formsById={formFixtures.formsById}
          initialData={initialData}
          targetId="1337"
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
