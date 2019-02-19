import React from 'react';
import { shallow, mount } from 'enzyme';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { TaskDeletion } from '../TaskDeletion';

const history = createBrowserHistory();

describe('containers/task/TaskDeletion', () => {
  it('renders without crashing', () => {
    shallow(
      <TaskDeletion
        match={{
          params: {
            id: '4'
          }
        }}
        deleteTask={function() {}}
      />
    );
  });
  it('check if deleteTask works', () => {
    const mockDeleteTask = jest.fn();

    mount(
      <Router history={history}>
        <TaskDeletion
          match={{
            params: {
              id: '4'
            }
          }}
          fetchTask={function() {}}
          deleteTask={mockDeleteTask}
        />
      </Router>
    );
    expect(mockDeleteTask.mock.calls[0][0]).toEqual('4');
    expect(mockDeleteTask.mock.calls.length).toBe(1);
  });
});
