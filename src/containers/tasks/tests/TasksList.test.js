// Test TasksList
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { TasksList } from '../TasksList';
import * as fixtures from '../../../store/tasks/tests/fixtures';

const history = createBrowserHistory();

describe('containers/task/TasksList', () => {
  it('renders without crashing', () => {
    shallow(
      <TasksList
        fetchTasks={function() {}}
        changePageTitle={function() {}}
        changePageTitleButton={function() {}}
        changePageTarget={function() {}}
        changePageNumber={function() {}}
        searchVal={function() {}}
        showListTitle={function() {}}
        getStatus={function() {}}
        pageNum={function() {}}
        searchParam={fixtures.searchParam}
        taskStatus={fixtures.getTaskStatus}
        rowsIdArray={fixtures.tasksIdArray}
        location={history.location}
      />
    );
  });

  it('renders task list correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <TasksList
          fetchTasks={function() {}}
          changePageTitle={function() {}}
          changePageTitleButton={function() {}}
          changePageTarget={function() {}}
          changePageNumber={function() {}}
          searchVal={function() {}}
          showListTitle={function() {}}
          getStatus={function() {}}
          pageNum={function() {}}
          searchParam={fixtures.searchParam}
          taskStatus={fixtures.getTaskStatus}
          rowsById={fixtures.tasksById}
          rowsIdArray={fixtures.tasksIdArray}
          endpoint="tasks"
          pageLinks={fixtures.pageLinks}
          totalPages={fixtures.totalPages}
          currentPage={fixtures.currentPage}
          firstPage={fixtures.firstPage}
          lastPage={fixtures.lastPage}
          location={history.location}
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
