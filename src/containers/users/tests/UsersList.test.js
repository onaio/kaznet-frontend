import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { UsersList } from '../UsersList';
import * as fixtures from '../../../store/users/tests/fixtures';

const history = createBrowserHistory();

describe('containers/users/UsersList', () => {
  it('renders without crashing', () => {
    shallow(
      <UsersList
        fetchUsers={function() {}}
        changePageTitle={function() {}}
        changePageTitleButton={function() {}}
        changePageTarget={function() {}}
        changePageNumber={function() {}}
        showListTitle={function() {}}
        searchVal={function() {}}
        searchParam=""
        taskStatus=""
        location={history.location}
        rowsIdArray={fixtures.usersIdArray}
        location={history.location}
      />
    );
  });

  it('renders user list correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <UsersList
          fetchUsers={function() {}}
          changePageTitle={function() {}}
          changePageTitleButton={function() {}}
          showListTitle={function() {}}
          searchVal={function() {}}
          searchParam=""
          taskStatus=""
          rowsById={fixtures.usersById}
          rowsIdArray={fixtures.usersIdArray}
          endpoint="userprofiles"
          pageLinks={fixtures.pageLinks}
          totalPages={fixtures.totalPages}
          currentPage={fixtures.currentPage}
          changePageTarget={function() {}}
          changePageNumber={function() {}}
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
