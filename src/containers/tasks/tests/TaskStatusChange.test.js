// Test TaskStatusChange
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { TaskStatusChange } from '../TaskStatusChange';
import * as fixtures from '../../../store/tasks/tests/fixtures';

const history = createBrowserHistory();

describe('containers/task/TaskStatusChange', () => {
  it('renders without crashing', () => {
    shallow(
      <TaskStatusChange
        match={{
          params: {
            id: '2'
          }
        }}
        fetchTask={function() {}}
      />
    );
  });

  it('weather editTask Works', () => {
    const mockEditTask = jest.fn();
    const payload = {
      data: {
        type: 'Task',
        id: '4',
        attributes: {
          status: 'b'
        }
      }
    };

    const wrapper = mount(
      <Router history={history}>
        <TaskStatusChange
          match={{
            params: {
              id: '4'
            }
          }}
          taskById={fixtures.taskById}
          location={{
            search: '?status=b'
          }}
          fetchTask={function() {}}
          editTask={mockEditTask}
        />
      </Router>
    );

    expect(mockEditTask.mock.calls[0][0]).toEqual(payload);
    expect(mockEditTask.mock.calls[0][1]).toBe('4');
    expect(mockEditTask.mock.calls.length).toBe(2);
  });
});
