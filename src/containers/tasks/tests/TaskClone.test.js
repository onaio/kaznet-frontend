import React from 'react';
import { shallow, mount } from 'enzyme';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { TaskClone } from '../TaskClone';
import * as fixtures from '../../../store/tasks/tests/fixtures';

const history = createBrowserHistory();

describe('containers/task/TaskClone', () => {
  it('renders without crashing', () => {
    shallow(
      <TaskClone
        match={{
          params: {
            id: '2'
          }
        }}
        fetchTask={function() {}}
      />
    );
  });

  it('check if cloneTask works', () => {
    const mockCloneTask = jest.fn();
    const payload = {
      data: {
        type: 'Task'
      }
    };
    mount(
      <Router history={history}>
        <TaskClone
          match={{
            params: {
              id: '4'
            }
          }}
          taskData={fixtures.taskData}
          fetchTask={function() {}}
          cloneTask={mockCloneTask}
        />
      </Router>
    );
    expect(mockCloneTask.mock.calls[0][0]).toEqual(payload);

    expect(mockCloneTask.mock.calls.length).toBe(2);
  });
});
