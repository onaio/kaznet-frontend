// Test TasksDetail
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { TasksDetail } from '../TasksDetail';
import * as fixtures from '../../../store/tasks/tests/fixtures';

const history = createBrowserHistory();

describe('containers/task/TasksDetail', () => {
  it('renders without crashing', () => {
    shallow(
      <TasksDetail
        match={{
          params: {
            id: '1'
          }
        }}
        fetchTask={function() {}}
        taskById={fixtures.taskById}
        noTitle={function() {}}
      />
    );
  });

  it('renders detail list correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <TasksDetail
          match={{
            params: {
              id: '1'
            }
          }}
          fetchTask={function() {}}
          noTitle={function() {}}
          taskById={fixtures.taskById}
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
