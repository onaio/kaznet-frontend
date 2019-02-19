// Test TaskDetailTitle
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import ErrorBoundary from '../../ErrorBoundary';
import { singleTask } from '../../../store/tasks/tests/fixtures';
import TaskDetailTitle from '../TaskDetailTitle';

const history = createBrowserHistory();

describe('components/tasks/TaskDetailTitle', () => {
  it('renders without crashing', () => {
    shallow(
      <ErrorBoundary>
        <TaskDetailTitle task={singleTask} />
      </ErrorBoundary>
    );
  });
  it('renders the correct html', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <Router history={history}>
          <TaskDetailTitle task={singleTask} />
        </Router>
      </ErrorBoundary>
    );

    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.unmount();
  });
});
